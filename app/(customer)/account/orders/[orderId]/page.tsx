"use client"

import { useEffect, useState } from "react"
import { getSupabaseClient } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertTriangle } from "lucide-react"
import { OrderTracking } from "@/components/customer/order-tracking"

interface OrderDetailsPageProps {
  params: {
    orderId: string
  }
}

export default function OrderDetailsPage({ params }: OrderDetailsPageProps) {
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = getSupabaseClient()
  const { orderId } = params

  useEffect(() => {
    async function loadOrder() {
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

        // Fetch order details for the current user
        const { data, error } = await supabase
          .from("orders")
          .select("*")
          .eq("id", orderId)
          .eq("customer_id", session.user.id)
          .single()

        if (error) {
          throw new Error("Failed to load order details: " + error.message)
        }

        setOrder(data)
      } catch (err: any) {
        console.error("Error loading order details:", err)
        setError(err.message || "Failed to load order details")
      } finally {
        setLoading(false)
      }
    }

    loadOrder()
  }, [supabase, router, orderId])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading order details...</span>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardContent>
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4 mr-2" />
              <AlertDescription>Order not found or you do not have permission to view it.</AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Order Details</CardTitle>
          <CardDescription>View details for order #{order.id}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTriangle className="h-4 w-4 mr-2" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div>
            <h3 className="font-medium">Order Information</h3>
            <p>Order ID: {order.id}</p>
            <p>Placed on: {new Date(order.created_at).toLocaleDateString()}</p>
            <p>Total Amount: ${order.total_amount}</p>
            <p>Status: {order.status}</p>
          </div>

          <div>
            <h3 className="font-medium">Shipping Address</h3>
            <p>{order.shipping_address}</p>
          </div>

          <div>
            <h3 className="font-medium">Order Items</h3>
            {/* Display order items here */}
          </div>

          <OrderTracking orderId={orderId} />

          <Button onClick={() => router.back()} variant="outline">
            Back to Orders
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
