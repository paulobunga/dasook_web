"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Loader2, ArrowLeft, Send, AlertTriangle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Mock data for orders
const mockOrders = [
  { id: "ORD-7352", date: "2023-09-01" },
  { id: "ORD-7351", date: "2023-08-28" },
  { id: "ORD-7350", date: "2023-08-15" },
]

export default function NewTicketPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [orderId, setOrderId] = useState("")
  const [priority, setPriority] = useState("medium")
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // In a real app, you would fetch orders from your API
    // For now, we'll use mock data
    const loadOrders = async () => {
      setLoading(true)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))
        setOrders(mockOrders)

        // Check if order ID is provided in URL
        const orderIdParam = searchParams.get("order")
        if (orderIdParam) {
          setOrderId(orderIdParam)
        }
      } catch (err: any) {
        console.error("Error loading orders:", err)
        setError(err.message || "Failed to load orders")
      } finally {
        setLoading(false)
      }
    }

    loadOrders()
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!subject.trim() || !message.trim()) {
      setError("Please fill in all required fields")
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      // In a real app, you would submit the ticket to your API
      // For now, we'll just simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirect to support tickets page
      router.push("/account/support")
    } catch (err: any) {
      console.error("Error submitting ticket:", err)
      setError(err.message || "Failed to submit support ticket")
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Support Tickets
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Create New Support Ticket</CardTitle>
          <CardDescription>Submit a new support request for assistance</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4 mr-2" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="subject">
                Subject <span className="text-destructive">*</span>
              </Label>
              <Input
                id="subject"
                placeholder="Brief description of your issue"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="order">Related Order (Optional)</Label>
              <Select value={orderId} onValueChange={setOrderId}>
                <SelectTrigger id="order">
                  <SelectValue placeholder="Select an order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No specific order</SelectItem>
                  {orders.map((order) => (
                    <SelectItem key={order.id} value={order.id}>
                      {order.id} ({order.date})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">
                Message <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="message"
                placeholder="Please describe your issue in detail"
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={submitting} className="w-full">
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Submit Ticket
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
