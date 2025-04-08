"use client"

import { useState } from "react"
import { Package, Truck, CheckCircle2, Clock, ShoppingBag, CreditCard } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface OrderTrackingProps {
  orderId: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  estimatedDelivery?: string
  trackingNumber?: string
  carrier?: string
}

export function OrderTracking({ orderId, status, estimatedDelivery, trackingNumber, carrier }: OrderTrackingProps) {
  const [showDetails, setShowDetails] = useState(false)

  // Define the steps based on the current status
  const steps = [
    { id: "order_placed", label: "Order Placed", icon: <ShoppingBag className="h-5 w-5" />, completed: true },
    { id: "payment_confirmed", label: "Payment Confirmed", icon: <CreditCard className="h-5 w-5" />, completed: true },
    {
      id: "processing",
      label: "Processing",
      icon: <Package className="h-5 w-5" />,
      completed: ["processing", "shipped", "delivered"].includes(status),
    },
    {
      id: "shipped",
      label: "Shipped",
      icon: <Truck className="h-5 w-5" />,
      completed: ["shipped", "delivered"].includes(status),
      active: status === "shipped",
    },
    {
      id: "delivered",
      label: "Delivered",
      icon: <CheckCircle2 className="h-5 w-5" />,
      completed: status === "delivered",
    },
  ]

  // If order is cancelled, show a different view
  if (status === "cancelled") {
    return (
      <Card className="border-destructive/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-destructive flex items-center">
            <Clock className="mr-2 h-5 w-5" />
            Order Cancelled
          </CardTitle>
          <CardDescription>
            This order has been cancelled. If you have any questions, please contact customer support.
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Order Tracking</CardTitle>
          <Badge
            variant={
              status === "delivered"
                ? "success"
                : status === "shipped"
                  ? "default"
                  : status === "processing"
                    ? "secondary"
                    : "outline"
            }
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
        <CardDescription>
          Track the status of your order #{orderId}
          {estimatedDelivery && status !== "delivered" && (
            <span className="block mt-1">
              Estimated delivery: <span className="font-medium">{estimatedDelivery}</span>
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Progress Tracker */}
        <div className="relative mb-6">
          <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-muted">
            <div
              className="h-full bg-primary transition-all"
              style={{
                width: `${
                  status === "pending"
                    ? "10%"
                    : status === "processing"
                      ? "35%"
                      : status === "shipped"
                        ? "70%"
                        : status === "delivered"
                          ? "100%"
                          : "0%"
                }`,
              }}
            />
          </div>
          <div className="relative flex justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={`z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                    step.completed
                      ? "border-primary bg-primary text-primary-foreground"
                      : step.active
                        ? "border-primary bg-background text-primary animate-pulse"
                        : "border-muted bg-background"
                  }`}
                >
                  {step.icon}
                </div>
                <span className="mt-2 text-center text-xs font-medium">{step.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tracking Details */}
        {(trackingNumber || carrier) && (
          <>
            <Separator className="my-4" />
            <div className="space-y-2">
              <Button variant="outline" size="sm" onClick={() => setShowDetails(!showDetails)} className="w-full">
                {showDetails ? "Hide Tracking Details" : "Show Tracking Details"}
              </Button>

              {showDetails && (
                <div className="mt-4 rounded-md border p-4">
                  {trackingNumber && (
                    <div className="mb-2">
                      <span className="text-sm font-medium">Tracking Number:</span>
                      <span className="ml-2 text-sm">{trackingNumber}</span>
                    </div>
                  )}
                  {carrier && (
                    <div>
                      <span className="text-sm font-medium">Carrier:</span>
                      <span className="ml-2 text-sm">{carrier}</span>
                    </div>
                  )}
                  {trackingNumber && carrier && (
                    <Button
                      variant="link"
                      size="sm"
                      className="mt-2 h-auto p-0 text-primary"
                      onClick={() => window.open(`https://example.com/track?number=${trackingNumber}`, "_blank")}
                    >
                      Track on {carrier} website
                    </Button>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
