"use client"

import { useState } from "react"
import Link from "next/link"
import { CheckCircle, Edit, Eye, MoreHorizontal, Trash } from "lucide-react"

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

const tickets = [
  {
    id: "TKT-1001",
    subject: "Order not received",
    customer: {
      name: "John Smith",
      email: "john.smith@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JS",
    },
    category: "Order Issue",
    priority: "high",
    status: "open",
    assignedTo: "Sarah Wilson",
    lastUpdate: "2023-09-01 14:32",
    created: "2023-09-01 10:15",
  },
  {
    id: "TKT-1002",
    subject: "Wrong item received",
    customer: {
      name: "Emily Davis",
      email: "emily.davis@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "ED",
    },
    category: "Order Issue",
    priority: "medium",
    status: "in_progress",
    assignedTo: "Michael Johnson",
    lastUpdate: "2023-09-01 09:45",
    created: "2023-08-31 16:22",
  },
  {
    id: "TKT-1003",
    subject: "Refund not processed",
    customer: {
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SJ",
    },
    category: "Refund",
    priority: "high",
    status: "open",
    assignedTo: "Unassigned",
    lastUpdate: "2023-08-31 15:10",
    created: "2023-08-31 15:10",
  },
  {
    id: "TKT-1004",
    subject: "Account login issues",
    customer: {
      name: "Michael Brown",
      email: "michael.brown@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MB",
    },
    category: "Technical",
    priority: "low",
    status: "in_progress",
    assignedTo: "David Wilson",
    lastUpdate: "2023-08-30 11:25",
    created: "2023-08-30 09:17",
  },
  {
    id: "TKT-1005",
    subject: "Product information inquiry",
    customer: {
      name: "Jessica Miller",
      email: "jessica.miller@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JM",
    },
    category: "Product",
    priority: "low",
    status: "closed",
    assignedTo: "Sarah Wilson",
    lastUpdate: "2023-08-29 16:40",
    created: "2023-08-28 14:05",
  },
  {
    id: "TKT-1006",
    subject: "Damaged product received",
    customer: {
      name: "David Wilson",
      email: "david.wilson@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "DW",
    },
    category: "Order Issue",
    priority: "medium",
    status: "resolved",
    assignedTo: "Michael Johnson",
    lastUpdate: "2023-08-27 10:30",
    created: "2023-08-25 09:45",
  },
]

export function TicketsTable() {
  const [selectedTickets, setSelectedTickets] = useState<string[]>([])
  const { toast } = useToast()

  const toggleTicketSelection = (ticketId: string) => {
    setSelectedTickets((current) =>
      current.includes(ticketId) ? current.filter((id) => id !== ticketId) : [...current, ticketId],
    )
  }

  const toggleAllTickets = () => {
    if (selectedTickets.length === tickets.length) {
      setSelectedTickets([])
    } else {
      setSelectedTickets(tickets.map((ticket) => ticket.id))
    }
  }

  const handleResolve = (ticketId: string) => {
    toast({
      title: "Ticket resolved",
      description: `Ticket ${ticketId} has been marked as resolved.`,
    })
  }

  const handleDelete = (ticketId: string) => {
    toast({
      title: "Ticket deleted",
      description: `Ticket ${ticketId} has been deleted.`,
    })
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={selectedTickets.length === tickets.length && tickets.length > 0}
                onCheckedChange={toggleAllTickets}
                aria-label="Select all tickets"
              />
            </TableHead>
            <TableHead>Ticket</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead>Last Update</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets.map((ticket) => (
            <TableRow key={ticket.id}>
              <TableCell>
                <Checkbox
                  checked={selectedTickets.includes(ticket.id)}
                  onCheckedChange={() => toggleTicketSelection(ticket.id)}
                  aria-label={`Select ${ticket.id}`}
                />
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium">{ticket.subject}</span>
                  <span className="text-xs text-muted-foreground">{ticket.id}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={ticket.customer.avatar} alt={ticket.customer.name} />
                    <AvatarFallback>{ticket.customer.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{ticket.customer.name}</span>
                    <span className="text-xs text-muted-foreground">{ticket.customer.email}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>{ticket.category}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    ticket.priority === "high" ? "destructive" : ticket.priority === "medium" ? "default" : "secondary"
                  }
                >
                  {ticket.priority}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    ticket.status === "open"
                      ? "outline"
                      : ticket.status === "in_progress"
                        ? "default"
                        : ticket.status === "resolved"
                          ? "success"
                          : "secondary"
                  }
                >
                  {ticket.status === "in_progress"
                    ? "In Progress"
                    : ticket.status === "open"
                      ? "Open"
                      : ticket.status === "resolved"
                        ? "Resolved"
                        : "Closed"}
                </Badge>
              </TableCell>
              <TableCell>{ticket.assignedTo}</TableCell>
              <TableCell>{ticket.lastUpdate}</TableCell>
              <TableCell>
                <div className="flex justify-end gap-2">
                  {(ticket.status === "open" || ticket.status === "in_progress") && (
                    <Button variant="outline" size="icon" onClick={() => handleResolve(ticket.id)}>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="sr-only">Resolve</span>
                    </Button>
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
                        <Link href={`/support-tickets/${ticket.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/support-tickets/${ticket.id}/edit`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      {(ticket.status === "open" || ticket.status === "in_progress") && (
                        <DropdownMenuItem onClick={() => handleResolve(ticket.id)}>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Resolve
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        onClick={() => handleDelete(ticket.id)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
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
