"use client"

import { useEffect, useState } from "react"
import { getSupabaseClient } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = getSupabaseClient()

  useEffect(() => {
    async function loadOrders() {
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

        // Fetch orders for the current user
        const { data, error } = await supabase
          .from("orders")
          .select("*")
          .eq("customer_id", session.user.id)
          .order("created_at", { ascending: false })

        if (error) {
          throw new Error("Failed to load orders: " + error.message)
        }

        setOrders(data || [])
      } catch (err: any) {
        console.error("Error loading orders:", err)
        setError(err.message || "Failed to load orders")
      } finally {
        setLoading(false)
      }
    }

    loadOrders()
  }, [supabase, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading your orders...</span>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>My Orders</CardTitle>
          <CardDescription>View your order history and track your purchases</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTriangle className="h-4 w-4 mr-2" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id} className="border">
                  <CardContent className="flex items-center justify-between p-4">
                    <div>
                      <h3 className="font-medium">Order #{order.id}</h3>
                      <p className="text-sm text-muted-foreground">
                        Placed on {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium">Total: ${order.total_amount}</span>
                      <Button asChild variant="link" size="sm">
                        <Link href={`/account/orders/${order.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p>You haven't placed any orders yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
