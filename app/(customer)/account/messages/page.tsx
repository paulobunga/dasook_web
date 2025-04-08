"use client"

import { useEffect, useState } from "react"
import { getSupabaseClient } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function MessagesPage() {
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = getSupabaseClient()

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

        // Fetch messages for the current user
        const { data, error } = await supabase
          .from("messages")
          .select("*")
          .eq("customer_id", session.user.id)
          .order("created_at", { ascending: false })

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
  }, [supabase, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading your messages...</span>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>My Messages</CardTitle>
          <CardDescription>View your conversations with vendors</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTriangle className="h-4 w-4 mr-2" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {messages.length > 0 ? (
            <div className="space-y-4">
              {messages.map((message) => (
                <Card key={message.id} className="border">
                  <CardContent className="flex items-center justify-between p-4">
                    <div>
                      <h3 className="font-medium">Message from Vendor</h3>
                      <p className="text-sm text-muted-foreground">Subject: {message.subject}</p>
                    </div>
                    <div>
                      <Button asChild variant="link" size="sm">
                        <Link href={`/account/messages/${message.id}`}>View Conversation</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p>You have no messages yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
