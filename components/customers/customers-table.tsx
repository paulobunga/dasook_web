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

const customers = [
  {
    id: "CUST-1001",
    name: "John Smith",
    email: "john.smith@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "JS",
    status: "active",
    orders: 12,
    spent: "$1,245.89",
    location: "New York, USA",
    joined: "2023-01-15",
  },
  {
    id: "CUST-1002",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "SJ",
    status: "active",
    orders: 8,
    spent: "$879.50",
    location: "Los Angeles, USA",
    joined: "2023-02-22",
  },
  {
    id: "CUST-1003",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "MB",
    status: "inactive",
    orders: 3,
    spent: "$245.00",
    location: "Chicago, USA",
    joined: "2023-03-10",
  },
  {
    id: "CUST-1004",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "ED",
    status: "active",
    orders: 15,
    spent: "$1,890.25",
    location: "Houston, USA",
    joined: "2023-01-05",
  },
  {
    id: "CUST-1005",
    name: "David Wilson",
    email: "david.wilson@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "DW",
    status: "blocked",
    orders: 0,
    spent: "$0.00",
    location: "Miami, USA",
    joined: "2023-04-18",
  },
  {
    id: "CUST-1006",
    name: "Jessica Miller",
    email: "jessica.miller@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "JM",
    status: "active",
    orders: 7,
    spent: "$567.75",
    location: "Seattle, USA",
    joined: "2023-02-28",
  },
]

export function CustomersTable() {
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([])
  const { toast } = useToast()

  const toggleCustomerSelection = (customerId: string) => {
    setSelectedCustomers((current) =>
      current.includes(customerId) ? current.filter((id) => id !== customerId) : [...current, customerId],
    )
  }

  const toggleAllCustomers = () => {
    if (selectedCustomers.length === customers.length) {
      setSelectedCustomers([])
    } else {
      setSelectedCustomers(customers.map((customer) => customer.id))
    }
  }

  const handleDelete = (customerId: string) => {
    toast({
      title: "Customer deleted",
      description: `Customer ${customerId} has been deleted.`,
    })
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={selectedCustomers.length === customers.length && customers.length > 0}
                onCheckedChange={toggleAllCustomers}
                aria-label="Select all customers"
              />
            </TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Orders</TableHead>
            <TableHead>Spent</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>
                <Checkbox
                  checked={selectedCustomers.includes(customer.id)}
                  onCheckedChange={() => toggleCustomerSelection(customer.id)}
                  aria-label={`Select ${customer.name}`}
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={customer.avatar} alt={customer.name} />
                    <AvatarFallback>{customer.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{customer.name}</span>
                    <span className="text-xs text-muted-foreground">{customer.email}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    customer.status === "active"
                      ? "success"
                      : customer.status === "inactive"
                        ? "secondary"
                        : "destructive"
                  }
                >
                  {customer.status}
                </Badge>
              </TableCell>
              <TableCell>{customer.orders}</TableCell>
              <TableCell>{customer.spent}</TableCell>
              <TableCell>{customer.location}</TableCell>
              <TableCell>{customer.joined}</TableCell>
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
                      <Link href={`/customers/${customer.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/customers/${customer.id}/edit`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDelete(customer.id)}
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
