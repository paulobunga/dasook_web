"use client"

import { useEffect, useState } from "react"
import { getSupabaseClient } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertTriangle } from "lucide-react"
import { Input } from "@/components/ui/input"

interface ConversationPageProps {
  params: {
    conversationId: string
  }
}

export default function ConversationPage({ params }: ConversationPageProps) {
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const router = useRouter()
  const supabase = getSupabaseClient()
  const { conversationId } = params

  useEffect(() => {
    async function loadMessages() {
      setLoading(true)
      setError(null)

      if (!supabase) {
        setError("Unable to connect to the database. Please try again later.")
        setLoading(false)
        return
      }

      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession()

        if (sessionError) {
          throw new Error("Failed to get session: " + sessionError.message)
        }

        if (!session?.user) {
          router.push("/login")
          return
        }

        // Fetch messages for the current conversation
        const { data, error } = await supabase
          .from("messages")
          .select("*")
          .eq("conversation_id", conversationId)
          .order("created_at", { ascending: true })

        if (error) {
          throw new Error("Failed to load messages: " + error.message)
        }

        setMessages(data || [])
      } catch (err: any) {
        console.error("Error loading messages:", err)
        setError(err.message || "Failed to load messages")
      } finally {
        setLoading(false)
      }
    }

    loadMessages()
  }, [supabase, router, conversationId])

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session?.user) {
        router.push("/login")
        return
      }

      // Send new message
      const { data, error } = await supabase.from("messages").insert([
        {
          conversation_id: conversationId,
          sender_id: session.user.id,
          content: newMessage,
          created_at: new Date().toISOString(),
        },
      ])

      if (error) {
        throw new Error("Failed to send message: " + error.message)
      }

      setMessages([...messages, data])
      setNewMessage("")
    } catch (err: any) {
      console.error("Error sending message:", err)
      setError(err.message || "Failed to send message")
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading conversation...</span>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Conversation</CardTitle>
          <CardDescription>View and reply to messages</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTriangle className="h-4 w-4 mr-2" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`p-3 rounded-md ${
                  message.sender_id === supabase.auth.user()?.id ? "bg-blue-100" : "bg-gray-100"
                }`}
              >
                <p>{message.content}</p>
                <p className="text-xs text-muted-foreground">
                  Sent on {new Date(message.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter your message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <Button onClick={handleSendMessage}>Send</Button>
          </div>

          <Button onClick={() => router.back()} variant="outline">
            Back to Messages
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
