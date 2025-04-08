"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, MoreHorizontal } from "lucide-react"

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

const withdrawals = [
  {
    id: "WTH-1001",
    vendor: {
      name: "Tech Gadgets Store",
      email: "finance@techgadgets.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "TG",
    },
    amount: "$4,523.45",
    method: "Bank Transfer",
    status: "completed",
    transactionId: "TRX-98765432",
    date: "2023-09-01",
  },
  {
    id: "WTH-1002",
    vendor: {
      name: "Fashion Trends",
      email: "accounts@fashiontrends.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "FT",
    },
    amount: "$2,156.78",
    method: "PayPal",
    status: "processing",
    transactionId: "TRX-87654321",
    date: "2023-08-30",
  },
  {
    id: "WTH-1003",
    vendor: {
      name: "Home Essentials",
      email: "finance@homeessentials.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "HE",
    },
    amount: "$1,875.32",
    method: "Bank Transfer",
    status: "completed",
    transactionId: "TRX-76543210",
    date: "2023-08-28",
  },
  {
    id: "WTH-1004",
    vendor: {
      name: "Outdoor Adventures",
      email: "payments@outdooradventures.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "OA",
    },
    amount: "$987.65",
    method: "PayPal",
    status: "completed",
    transactionId: "TRX-65432109",
    date: "2023-08-25",
  },
  {
    id: "WTH-1005",
    vendor: {
      name: "Gourmet Delights",
      email: "finance@gourmetdelights.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "GD",
    },
    amount: "$1,245.89",
    method: "Bank Transfer",
    status: "failed",
    transactionId: "TRX-54321098",
    date: "2023-08-22",
  },
  {
    id: "WTH-1006",
    vendor: {
      name: "Beauty Essentials",
      email: "accounts@beautyessentials.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "BE",
    },
    amount: "$2,345.67",
    method: "Bank Transfer",
    status: "processing",
    transactionId: "TRX-43210987",
    date: "2023-08-20",
  },
]

export function WithdrawalsTable() {
  const [selectedWithdrawals, setSelectedWithdrawals] = useState<string[]>([])
  const { toast } = useToast()

  const toggleWithdrawalSelection = (withdrawalId: string) => {
    setSelectedWithdrawals((current) =>
      current.includes(withdrawalId) ? current.filter((id) => id !== withdrawalId) : [...current, withdrawalId],
    )
  }

  const toggleAllWithdrawals = () => {
    if (selectedWithdrawals.length === withdrawals.length) {
      setSelectedWithdrawals([])
    } else {
      setSelectedWithdrawals(withdrawals.map((withdrawal) => withdrawal.id))
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={selectedWithdrawals.length === withdrawals.length && withdrawals.length > 0}
                onCheckedChange={toggleAllWithdrawals}
                aria-label="Select all withdrawals"
              />
            </TableHead>
            <TableHead>Withdrawal ID</TableHead>
            <TableHead>Vendor</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Transaction ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {withdrawals.map((withdrawal) => (
            <TableRow key={withdrawal.id}>
              <TableCell>
                <Checkbox
                  checked={selectedWithdrawals.includes(withdrawal.id)}
                  onCheckedChange={() => toggleWithdrawalSelection(withdrawal.id)}
                  aria-label={`Select ${withdrawal.id}`}
                />
              </TableCell>
              <TableCell className="font-medium">{withdrawal.id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={withdrawal.vendor.avatar} alt={withdrawal.vendor.name} />
                    <AvatarFallback>{withdrawal.vendor.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{withdrawal.vendor.name}</span>
                    <span className="text-xs text-muted-foreground">{withdrawal.vendor.email}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>{withdrawal.amount}</TableCell>
              <TableCell>{withdrawal.method}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    withdrawal.status === "completed"
                      ? "success"
                      : withdrawal.status === "processing"
                        ? "secondary"
                        : "destructive"
                  }
                >
                  {withdrawal.status}
                </Badge>
              </TableCell>
              <TableCell>{withdrawal.transactionId}</TableCell>
              <TableCell>{withdrawal.date}</TableCell>
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
                      <Link href={`/vendors/withdrawals/${withdrawal.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Link>
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
