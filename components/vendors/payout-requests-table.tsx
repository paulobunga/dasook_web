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

const payoutRequests = [
  {
    id: "PAY-1001",
    vendor: {
      name: "Tech Gadgets Store",
      email: "finance@techgadgets.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "TG",
    },
    amount: "$4,523.45",
    method: "Bank Transfer",
    status: "pending",
    requestDate: "2023-09-01",
    lastUpdated: "2023-09-01",
  },
  {
    id: "PAY-1002",
    vendor: {
      name: "Fashion Trends",
      email: "accounts@fashiontrends.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "FT",
    },
    amount: "$2,156.78",
    method: "PayPal",
    status: "approved",
    requestDate: "2023-08-30",
    lastUpdated: "2023-08-31",
  },
  {
    id: "PAY-1003",
    vendor: {
      name: "Home Essentials",
      email: "finance@homeessentials.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "HE",
    },
    amount: "$1,875.32",
    method: "Bank Transfer",
    status: "processing",
    requestDate: "2023-08-29",
    lastUpdated: "2023-08-30",
  },
  {
    id: "PAY-1004",
    vendor: {
      name: "Outdoor Adventures",
      email: "payments@outdooradventures.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "OA",
    },
    amount: "$987.65",
    method: "PayPal",
    status: "completed",
    requestDate: "2023-08-25",
    lastUpdated: "2023-08-28",
  },
  {
    id: "PAY-1005",
    vendor: {
      name: "Gourmet Delights",
      email: "finance@gourmetdelights.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "GD",
    },
    amount: "$1,245.89",
    method: "Bank Transfer",
    status: "rejected",
    requestDate: "2023-08-24",
    lastUpdated: "2023-08-25",
  },
  {
    id: "PAY-1006",
    vendor: {
      name: "Beauty Essentials",
      email: "accounts@beautyessentials.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "BE",
    },
    amount: "$2,345.67",
    method: "Bank Transfer",
    status: "pending",
    requestDate: "2023-08-23",
    lastUpdated: "2023-08-23",
  },
]

export function PayoutRequestsTable() {
  const [selectedRequests, setSelectedRequests] = useState<string[]>([])
  const { toast } = useToast()

  const toggleRequestSelection = (requestId: string) => {
    setSelectedRequests((current) =>
      current.includes(requestId) ? current.filter((id) => id !== requestId) : [...current, requestId],
    )
  }

  const toggleAllRequests = () => {
    if (selectedRequests.length === payoutRequests.length) {
      setSelectedRequests([])
    } else {
      setSelectedRequests(payoutRequests.map((request) => request.id))
    }
  }

  const handleApprove = (requestId: string) => {
    toast({
      title: "Payout request approved",
      description: `Payout request ${requestId} has been approved.`,
    })
  }

  const handleReject = (requestId: string) => {
    toast({
      title: "Payout request rejected",
      description: `Payout request ${requestId} has been rejected.`,
    })
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={selectedRequests.length === payoutRequests.length && payoutRequests.length > 0}
                onCheckedChange={toggleAllRequests}
                aria-label="Select all payout requests"
              />
            </TableHead>
            <TableHead>Request ID</TableHead>
            <TableHead>Vendor</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Request Date</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payoutRequests.map((request) => (
            <TableRow key={request.id}>
              <TableCell>
                <Checkbox
                  checked={selectedRequests.includes(request.id)}
                  onCheckedChange={() => toggleRequestSelection(request.id)}
                  aria-label={`Select ${request.id}`}
                />
              </TableCell>
              <TableCell className="font-medium">{request.id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={request.vendor.avatar} alt={request.vendor.name} />
                    <AvatarFallback>{request.vendor.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{request.vendor.name}</span>
                    <span className="text-xs text-muted-foreground">{request.vendor.email}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>{request.amount}</TableCell>
              <TableCell>{request.method}</TableCell>
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
              <TableCell>{request.requestDate}</TableCell>
              <TableCell>{request.lastUpdated}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  {request.status === "pending" && (
                    <>
                      <Button variant="outline" size="icon" onClick={() => handleApprove(request.id)}>
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="sr-only">Approve</span>
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleReject(request.id)}>
                        <X className="h-4 w-4 text-red-500" />
                        <span className="sr-only">Reject</span>
                      </Button>
                    </>
                  )}
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
                        <Link href={`/vendors/payout-requests/${request.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      {request.status === "pending" && (
                        <>
                          <DropdownMenuItem onClick={() => handleApprove(request.id)}>
                            <Check className="mr-2 h-4 w-4" />
                            Approve
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleReject(request.id)}>
                            <X className="mr-2 h-4 w-4" />
                            Reject
                          </DropdownMenuItem>
                        </>
                      )}
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
