"use client"

import { useState } from "react"
import Link from "next/link"
import { Edit, MoreHorizontal, Trash } from "lucide-react"

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

const vendors = [
  {
    id: "VEN-1234",
    name: "Tech Gadgets Store",
    logo: "/placeholder.svg?height=40&width=40",
    owner: {
      name: "Robert Chen",
      email: "robert@techgadgets.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "RC",
    },
    status: "verified",
    products: 124,
    revenue: "$45,231",
    commission: "10%",
    joined: "2023-01-15",
  },
  {
    id: "VEN-1235",
    name: "Fashion Trends",
    logo: "/placeholder.svg?height=40&width=40",
    owner: {
      name: "Jessica Miller",
      email: "jessica@fashiontrends.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JM",
    },
    status: "pending",
    products: 57,
    revenue: "$12,450",
    commission: "12%",
    joined: "2023-03-22",
  },
  {
    id: "VEN-1236",
    name: "Home Essentials",
    logo: "/placeholder.svg?height=40&width=40",
    owner: {
      name: "David Wilson",
      email: "david@homeessentials.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "DW",
    },
    status: "verified",
    products: 89,
    revenue: "$28,750",
    commission: "10%",
    joined: "2023-02-10",
  },
  {
    id: "VEN-1237",
    name: "Outdoor Adventures",
    logo: "/placeholder.svg?height=40&width=40",
    owner: {
      name: "Lisa Thompson",
      email: "lisa@outdooradventures.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "LT",
    },
    status: "pending",
    products: 32,
    revenue: "$8,920",
    commission: "15%",
    joined: "2023-04-05",
  },
  {
    id: "VEN-1238",
    name: "Gourmet Delights",
    logo: "/placeholder.svg?height=40&width=40",
    owner: {
      name: "Michael Johnson",
      email: "michael@gourmetdelights.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MJ",
    },
    status: "verified",
    products: 45,
    revenue: "$15,680",
    commission: "12%",
    joined: "2023-03-18",
  },
  {
    id: "VEN-1239",
    name: "Beauty Essentials",
    logo: "/placeholder.svg?height=40&width=40",
    owner: {
      name: "Sarah Williams",
      email: "sarah@beautyessentials.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SW",
    },
    status: "suspended",
    products: 67,
    revenue: "$21,340",
    commission: "10%",
    joined: "2023-02-25",
  },
]

export function VendorsTable() {
  const [selectedVendors, setSelectedVendors] = useState<string[]>([])
  const { toast } = useToast()

  const toggleVendorSelection = (vendorId: string) => {
    setSelectedVendors((current) =>
      current.includes(vendorId) ? current.filter((id) => id !== vendorId) : [...current, vendorId],
    )
  }

  const toggleAllVendors = () => {
    if (selectedVendors.length === vendors.length) {
      setSelectedVendors([])
    } else {
      setSelectedVendors(vendors.map((vendor) => vendor.id))
    }
  }

  const handleDelete = (vendorId: string) => {
    toast({
      title: "Vendor deleted",
      description: `Vendor ${vendorId} has been deleted.`,
    })
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={selectedVendors.length === vendors.length && vendors.length > 0}
                onCheckedChange={toggleAllVendors}
                aria-label="Select all vendors"
              />
            </TableHead>
            <TableHead>Vendor</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Products</TableHead>
            <TableHead>Revenue</TableHead>
            <TableHead>Commission</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vendors.map((vendor) => (
            <TableRow key={vendor.id}>
              <TableCell>
                <Checkbox
                  checked={selectedVendors.includes(vendor.id)}
                  onCheckedChange={() => toggleVendorSelection(vendor.id)}
                  aria-label={`Select ${vendor.name}`}
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <img
                    src={vendor.logo || "/placeholder.svg"}
                    alt={vendor.name}
                    className="h-10 w-10 rounded-md object-cover"
                  />
                  <div className="flex flex-col">
                    <span className="font-medium">{vendor.name}</span>
                    <span className="text-xs text-muted-foreground">{vendor.id}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={vendor.owner.avatar} alt={vendor.owner.name} />
                    <AvatarFallback>{vendor.owner.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{vendor.owner.name}</span>
                    <span className="text-xs text-muted-foreground">{vendor.owner.email}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    vendor.status === "verified" ? "success" : vendor.status === "pending" ? "secondary" : "destructive"
                  }
                >
                  {vendor.status === "verified" ? "Verified" : vendor.status === "pending" ? "Pending" : "Suspended"}
                </Badge>
              </TableCell>
              <TableCell>{vendor.products}</TableCell>
              <TableCell>{vendor.revenue}</TableCell>
              <TableCell>{vendor.commission}</TableCell>
              <TableCell>{vendor.joined}</TableCell>
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
                      <Link href={`/vendors/${vendor.id}`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDelete(vendor.id)}
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
