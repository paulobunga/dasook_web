"use client"

import { useState } from "react"
import Link from "next/link"
import { Edit, Eye, MoreHorizontal, Trash } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const orders = [
  {
    id: "ORD-7352",
    customer: {
      name: "John Smith",
      email: "john.smith@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JS",
    },
    status: "processing",
    payment: "paid",
    total: "$245.99",
    items: 3,
    date: "2023-09-01",
  },
  {
    id: "ORD-7351",
    customer: {
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SJ",
    },
    status: "shipped",
    payment: "paid",
    total: "$124.99",
    items: 2,
    date: "2023-09-01",
  },
  {
    id: "ORD-7350",
    customer: {
      name: "Michael Brown",
      email: "michael.brown@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MB",
    },
    status: "delivered",
    payment: "paid",
    total: "$89.99",
    items: 1,
    date: "2023-08-31",
  },
  {
    id: "ORD-7349",
    customer: {
      name: "Emily Davis",
      email: "emily.davis@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "ED",
    },
    status: "pending",
    payment: "pending",
    total: "$349.99",
    items: 4,
    date: "2023-08-30",
  },
  {
    id: "ORD-7348",
    customer: {
      name: "David Wilson",
      email: "david.wilson@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "DW",
    },
    status: "cancelled",
    payment: "refunded",
    total: "$129.99",
    items: 2,
    date: "2023-08-30",
  },
  {
    id: "ORD-7347",
    customer: {
      name: "Jessica Miller",
      email: "jessica.miller@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JM",
    },
    status: "delivered",
    payment: "paid",
    total: "$159.99",
    items: 3,
    date: "2023-08-29",
  },
]

export function OrdersTable() {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])
  const { toast } = useToast()

  const toggleOrderSelection = (orderId: string) => {
    setSelectedOrders((current) =>
      current.includes(orderId) ? current.filter((id) => id !== orderId) : [...current, orderId],
    )
  }

  const toggleAllOrders = () => {
    if (selectedOrders.length === orders.length) {
      setSelectedOrders([])
    } else {
      setSelectedOrders(orders.map((order) => order.id))
    }
  }

  const handleDelete = (orderId: string) => {
    toast({
      title: "Order deleted",
      description: `Order ${orderId} has been deleted.`,
    })
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={selectedOrders.length === orders.length && orders.length > 0}
                onCheckedChange={toggleAllOrders}
                aria-label="Select all orders"
              />
            </TableHead>
            <TableHead>Order</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>
                <Checkbox
                  checked={selectedOrders.includes(order.id)}
                  onCheckedChange={() => toggleOrderSelection(order.id)}
                  aria-label={`Select ${order.id}`}
                />
              </TableCell>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={order.customer.avatar} alt={order.customer.name} />
                    <AvatarFallback>{order.customer.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{order.customer.name}</span>
                    <span className="text-xs text-muted-foreground">{order.customer.email}</span>
                  </div>
                </div>
              </TableCell>
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
              <TableCell>{order.items}</TableCell>
              <TableCell>{order.total}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href={`/orders/${order.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/orders/${order.id}/edit`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDelete(order.id)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
