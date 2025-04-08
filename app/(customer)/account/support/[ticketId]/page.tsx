"use client"

import Link from "next/link"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Loader2, ArrowLeft, Send, AlertTriangle, Package } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Mock data for ticket
const mockTicket = {
  id: "TKT-1001",
  subject: "Order not received",
  status: "in_progress",
  priority: "high",
  createdAt: "2023-09-01T14:32:00Z",
  lastUpdated: "2023-09-02T10:15:00Z",
  orderId: "ORD-7352",
  messages: [
    {
      id: "msg-1",
      content:
        "I placed an order 5 days ago (ORD-7352) but I haven't received it yet. The tracking information says it was delivered, but I didn't receive anything. Can you help?",
      timestamp: "2023-09-01T14:32:00Z",
      sender: {
        type: "customer",
        name: "John Smith",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "JS",
      },
    },
    {
      id: "msg-2",
      content:
        "Hello John, I'm sorry to hear about this issue. I'll look into this right away. Could you please confirm your delivery address?",
      timestamp: "2023-09-01T15:45:00Z",
      sender: {
        type: "support",
        name: "Support Agent",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "SA",
      },
    },
    {
      id: "msg-3",
      content: "My address is 123 Main St, Apt 4B, New York, NY 10001. That's the address I used for the order.",
      timestamp: "2023-09-01T16:20:00Z",
      sender: {
        type: "customer",
        name: "John Smith",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "JS",
      },
    },
    {
      id: "msg-4",
      content:
        "Thank you for confirming. I've checked with the shipping carrier, and they've confirmed there might have been a delivery error. We're working with them to locate your package. I'll update you as soon as I have more information.",
      timestamp: "2023-09-02T10:15:00Z",
      sender: {
        type: "support",
        name: "Support Agent",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "SA",
      },
    },
  ],
}

export default function TicketDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [ticket, setTicket] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [sending, setSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const ticketId = params.ticketId as string

  useEffect(() => {
    // In a real app, you would fetch ticket from your API
    // For now, we'll use mock data
    const loadTicket = async () => {
      setLoading(true)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Check if ticket exists in our mock data
        if (ticketId === "TKT-1001") {
          setTicket(mockTicket)
        } else {
          throw new Error("Ticket not found")
        }
      } catch (err: any) {
        console.error("Error loading ticket:", err)
        setError(err.message || "Failed to load ticket")
      } finally {
        setLoading(false)
      }
    }

    loadTicket()
  }, [ticketId])

  useEffect(() => {
    // Scroll to bottom when messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [ticket?.messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || sending) return

    setSending(true)
    try {
      // In a real app, you would send the message to your API
      // For now, we'll just update the local state
      const newMsg = {
        id: `msg-${ticket.messages.length + 1}`,
        content: newMessage,
        timestamp: new Date().toISOString(),
        sender: {
          type: "customer",
          name: "John Smith",
          avatar: "/placeholder.svg?height=40&width=40",
          initials: "JS",
        },
      }

      setTicket({
        ...ticket,
        messages: [...ticket.messages, newMsg],
        lastUpdated: new Date().toISOString(),
      })
      setNewMessage("")
    } catch (err: any) {
      console.error("Error sending message:", err)
      setError("Failed to send message. Please try again.")
    } finally {
      setSending(false)
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleString([], {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading ticket details...</span>
      </div>
    )
  }

  if (error || !ticket) {
    return (
      <div className="space-y-6">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Support Tickets
        </Button>

        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4 mr-2" />
          <AlertDescription>{error || "Ticket not found"}</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Support Tickets
      </Button>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2 flex flex-col h-[calc(100vh-12rem)]">
          <CardHeader className="border-b">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Ticket {ticket.id}</CardTitle>
                <CardDescription>{ticket.subject}</CardDescription>
              </div>
              <Badge
                variant={
                  ticket.status === "resolved"
                    ? "success"
                    : ticket.status === "in_progress"
                      ? "default"
                      : ticket.status === "open"
                        ? "secondary"
                        : "outline"
                }
                className="text-sm px-3 py-1"
              >
                {ticket.status === "in_progress"
                  ? "In Progress"
                  : ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {ticket.messages.map((message: any) => {
                const isCustomer = message.sender.type === "customer"
                return (
                  <div key={message.id} className={`flex ${isCustomer ? "justify-end" : "justify-start"}`}>
                    <div className={`flex gap-2 max-w-[80%] ${isCustomer ? "flex-row-reverse" : "flex-row"}`}>
                      <Avatar className="h-8 w-8 mt-1">
                        <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
                        <AvatarFallback>{message.sender.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div
                          className={`rounded-lg p-3 ${isCustomer ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                        >
                          <p className="text-sm">{message.content}</p>
                        </div>
                        <div className="flex items-center gap-2 mt-1 px-1">
                          <p className="text-xs text-muted-foreground">{formatTimestamp(message.timestamp)}</p>
                          <p className="text-xs text-muted-foreground">{message.sender.name}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>

          <CardFooter className="border-t p-4">
            <form onSubmit={handleSendMessage} className="flex w-full gap-2">
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                disabled={sending || ticket.status === "resolved" || ticket.status === "closed"}
                className="flex-1"
              />
              <Button
                type="submit"
                disabled={!newMessage.trim() || sending || ticket.status === "resolved" || ticket.status === "closed"}
              >
                {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                <span className="ml-2 sr-only">Send</span>
              </Button>
            </form>
          </CardFooter>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ticket Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium">Status</p>
                <Badge
                  variant={
                    ticket.status === "resolved"
                      ? "success"
                      : ticket.status === "in_progress"
                        ? "default"
                        : ticket.status === "open"
                          ? "secondary"
                          : "outline"
                  }
                  className="mt-1"
                >
                  {ticket.status === "in_progress"
                    ? "In Progress"
                    : ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                </Badge>
              </div>

              <div>
                <p className="text-sm font-medium">Priority</p>
                <Badge
                  variant={
                    ticket.priority === "high" ? "destructive" : ticket.priority === "medium" ? "default" : "outline"
                  }
                  className="mt-1"
                >
                  {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                </Badge>
              </div>

              {ticket.orderId && (
                <div>
                  <p className="text-sm font-medium">Related Order</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <Button variant="link" className="h-auto p-0" asChild>
                      <Link href={`/account/orders/${ticket.orderId}`}>{ticket.orderId}</Link>
                    </Button>
                  </div>
                </div>
              )}

              <div>
                <p className="text-sm font-medium">Created</p>
                <p className="text-sm text-muted-foreground mt-1">{formatTimestamp(ticket.createdAt)}</p>
              </div>

              <div>
                <p className="text-sm font-medium">Last Updated</p>
                <p className="text-sm text-muted-foreground mt-1">{formatTimestamp(ticket.lastUpdated)}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Support Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Support Agent" />
                  <AvatarFallback>SA</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Support Agent</p>
                  <p className="text-sm text-muted-foreground">Available 24/7</p>
                </div>
              </div>

              <Separator />

              <div className="text-sm text-muted-foreground">
                <p>Our support team typically responds within 24 hours.</p>
                <p className="mt-2">For urgent issues, please call our customer service at 1-800-123-4567.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
