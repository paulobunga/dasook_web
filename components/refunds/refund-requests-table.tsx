"use client"

import { useState } from "react"
import Link from "next/link"
import { Check, Eye, MoreHorizontal, X } from "lucide-react"

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

const refundRequests = [
  {
    id: "REF-1001",
    order: "ORD-7352",
    customer: {
      name: "John Smith",
      email: "john.smith@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JS",
    },
    amount: "$89.99",
    reason: "Damaged product",
    status: "pending",
    date: "2023-09-01",
  },
  {
    id: "REF-1002",
    order: "ORD-7348",
    customer: {
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SJ",
    },
    amount: "$124.99",
    reason: "Wrong item received",
    status: "approved",
    date: "2023-08-30",
  },
  {
    id: "REF-1003",
    order: "ORD-7345",
    customer: {
      name: "Michael Brown",
      email: "michael.brown@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MB",
    },
    amount: "$45.50",
    reason: "Item not as described",
    status: "processing",
    date: "2023-08-28",
  },
  {
    id: "REF-1004",
    order: "ORD-7340",
    customer: {
      name: "Emily Davis",
      email: "emily.davis@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "ED",
    },
    amount: "$199.99",
    reason: "Changed mind",
    status: "rejected",
    date: "2023-08-25",
  },
  {
    id: "REF-1005",
    order: "ORD-7338",
    customer: {
      name: "David Wilson",
      email: "david.wilson@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "DW",
    },
    amount: "$67.50",
    reason: "Better price found elsewhere",
    status: "completed",
    date: "2023-08-22",
  },
  {
    id: "REF-1006",
    order: "ORD-7335",
    customer: {
      name: "Jessica Miller",
      email: "jessica.miller@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JM",
    },
    amount: "$129.99",
    reason: "Defective product",
    status: "pending",
    date: "2023-08-20",
  },
]

export function RefundRequestsTable() {
  const [selectedRequests, setSelectedRequests] = useState<string[]>([])
  const { toast } = useToast()

  const toggleRequestSelection = (requestId: string) => {
    setSelectedRequests((current) =>
      current.includes(requestId) ? current.filter((id) => id !== requestId) : [...current, requestId],
    )
  }

  const toggleAllRequests = () => {
    if (selectedRequests.length === refundRequests.length) {
      setSelectedRequests([])
    } else {
      setSelectedRequests(refundRequests.map((request) => request.id))
    }
  }

  const handleApprove = (requestId: string) => {
    toast({
      title: "Refund approved",
      description: `Refund request ${requestId} has been approved.`,
    })
  }

  const handleReject = (requestId: string) => {
    toast({
      title: "Refund rejected",
      description: `Refund request ${requestId} has been rejected.`,
    })
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={selectedRequests.length === refundRequests.length && refundRequests.length > 0}
                onCheckedChange={toggleAllRequests}
                aria-label="Select all refund requests"
              />
            </TableHead>
            <TableHead>Request ID</TableHead>
            <TableHead>Order</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {refundRequests.map((request) => (
            <TableRow key={request.id}>
              <TableCell>
                <Checkbox
                  checked={selectedRequests.includes(request.id)}
                  onCheckedChange={() => toggleRequestSelection(request.id)}
                  aria-label={`Select ${request.id}`}
                />
              </TableCell>
              <TableCell className="font-medium">{request.id}</TableCell>
              <TableCell>{request.order}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={request.customer.avatar} alt={request.customer.name} />
                    <AvatarFallback>{request.customer.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{request.customer.name}</span>
                    <span className="text-xs text-muted-foreground">{request.customer.email}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>{request.amount}</TableCell>
              <TableCell>{request.reason}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    request.status === "completed"
                      ? "success"
                      : request.status === "approved"
                        ? "default"
                        : request.status === "processing"
                          ? "secondary"
                          : request.status === "rejected"
                            ? "destructive"
                            : "outline"
                  }
                >
                  {request.status}
                </Badge>
              </TableCell>
              <TableCell>{request.date}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleApprove(request.id)}
                    disabled={request.status !== "pending"}
                  >
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="sr-only">Approve</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleReject(request.id)}
                    disabled={request.status !== "pending"}
                  >
                    <X className="h-4 w-4 text-red-500" />
                    <span className="sr-only">Reject</span>
                  </Button>
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
                        <Link href={`/refund-requests/${request.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
