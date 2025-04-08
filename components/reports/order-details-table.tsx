"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const orderData = [
  {
    id: "ORD-7352",
    customer: "John Smith",
    date: "2023-09-05",
    items: 3,
    total: "$245.99",
    status: "processing",
    payment: "paid",
    vendor: "Tech Gadgets Store",
    shipping: "Standard",
  },
  {
    id: "ORD-7351",
    customer: "Sarah Johnson",
    date: "2023-09-05",
    items: 2,
    total: "$124.99",
    status: "shipped",
    payment: "paid",
    vendor: "Fashion Trends",
    shipping: "Express",
  },
  {
    id: "ORD-7350",
    customer: "Michael Brown",
    date: "2023-09-04",
    items: 1,
    total: "$89.99",
    status: "delivered",
    payment: "paid",
    vendor: "Home Essentials",
    shipping: "Standard",
  },
  {
    id: "ORD-7349",
    customer: "Emily Davis",
    date: "2023-09-04",
    items: 4,
    total: "$349.99",
    status: "pending",
    payment: "pending",
    vendor: "Tech Gadgets Store",
    shipping: "Express",
  },
  {
    id: "ORD-7348",
    customer: "David Wilson",
    date: "2023-09-03",
    items: 2,
    total: "$129.99",
    status: "cancelled",
    payment: "refunded",
    vendor: "Outdoor Adventures",
    shipping: "Standard",
  },
  {
    id: "ORD-7347",
    customer: "Jessica Miller",
    date: "2023-09-03",
    items: 3,
    total: "$159.99",
    status: "delivered",
    payment: "paid",
    vendor: "Fashion Trends",
    shipping: "Standard",
  },
  {
    id: "ORD-7346",
    customer: "Robert Chen",
    date: "2023-09-02",
    items: 5,
    total: "$275.45",
    status: "delivered",
    payment: "paid",
    vendor: "Tech Gadgets Store",
    shipping: "Express",
  },
]

export function OrderDetailsTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
        <CardDescription>Detailed view of recent orders</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead>Shipping</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderData.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.items}</TableCell>
                <TableCell>{order.total}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      order.status === "delivered"
                        ? "success"
                        : order.status === "shipped"
                          ? "default"
                          : order.status === "processing"
                            ? "secondary"
                            : order.status === "cancelled"
                              ? "destructive"
                              : "outline"
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      order.payment === "paid" ? "success" : order.payment === "refunded" ? "destructive" : "outline"
                    }
                  >
                    {order.payment}
                  </Badge>
                </TableCell>
                <TableCell>{order.vendor}</TableCell>
                <TableCell>{order.shipping}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
