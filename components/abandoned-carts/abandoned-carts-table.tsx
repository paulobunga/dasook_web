"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Mail, Eye, Trash2 } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

// Mock data for abandoned carts
const abandonedCarts = [
  {
    id: "AC-1001",
    customer: {
      name: "John Smith",
      email: "john.smith@example.com",
    },
    items: 3,
    total: 129.99,
    lastActive: new Date(2023, 3, 15, 14, 30),
    emailSent: true,
    emailStatus: "Sent",
  },
  {
    id: "AC-1002",
    customer: {
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
    },
    items: 2,
    total: 89.95,
    lastActive: new Date(2023, 3, 15, 10, 15),
    emailSent: true,
    emailStatus: "Opened",
  },
  {
    id: "AC-1003",
    customer: {
      name: "Michael Brown",
      email: "m.brown@example.com",
    },
    items: 5,
    total: 245.5,
    lastActive: new Date(2023, 3, 14, 18, 45),
    emailSent: false,
    emailStatus: null,
  },
  {
    id: "AC-1004",
    customer: {
      name: "Emily Davis",
      email: "emily.davis@example.com",
    },
    items: 1,
    total: 59.99,
    lastActive: new Date(2023, 3, 14, 16, 20),
    emailSent: true,
    emailStatus: "Clicked",
  },
  {
    id: "AC-1005",
    customer: {
      name: "Guest User",
      email: "guest123@example.com",
    },
    items: 4,
    total: 178.75,
    lastActive: new Date(2023, 3, 14, 12, 10),
    emailSent: true,
    emailStatus: "Sent",
  },
]

export function AbandonedCartsTable() {
  const [carts, setCarts] = useState(abandonedCarts)

  const getStatusBadge = (status: string | null) => {
    if (!status) return null

    switch (status) {
      case "Sent":
        return <Badge variant="outline">Sent</Badge>
      case "Opened":
        return <Badge variant="secondary">Opened</Badge>
      case "Clicked":
        return (
          <Badge variant="success" className="bg-green-100 text-green-800 hover:bg-green-100">
            Clicked
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cart ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Total Value</TableHead>
            <TableHead>Abandoned</TableHead>
            <TableHead>Email Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {carts.map((cart) => (
            <TableRow key={cart.id}>
              <TableCell className="font-medium">{cart.id}</TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{cart.customer.name}</div>
                  <div className="text-sm text-muted-foreground">{cart.customer.email}</div>
                </div>
              </TableCell>
              <TableCell>{cart.items}</TableCell>
              <TableCell>${cart.total.toFixed(2)}</TableCell>
              <TableCell>{formatDistanceToNow(cart.lastActive, { addSuffix: true })}</TableCell>
              <TableCell>
                {cart.emailSent ? (
                  getStatusBadge(cart.emailStatus)
                ) : (
                  <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                    Not Sent
                  </Badge>
                )}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      View Cart Details
                    </DropdownMenuItem>
                    {!cart.emailSent && (
                      <DropdownMenuItem>
                        <Mail className="mr-2 h-4 w-4" />
                        Send Recovery Email
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Record
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
