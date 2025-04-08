import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const recentVendors = [
  {
    id: "VEN-1234",
    name: "Tech Gadgets Store",
    owner: {
      name: "Robert Chen",
      email: "robert@techgadgets.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "RC",
    },
    status: "verified",
    products: 124,
    date: "3 days ago",
  },
  {
    id: "VEN-1235",
    name: "Fashion Trends",
    owner: {
      name: "Jessica Miller",
      email: "jessica@fashiontrends.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JM",
    },
    status: "pending",
    products: 57,
    date: "5 days ago",
  },
  {
    id: "VEN-1236",
    name: "Home Essentials",
    owner: {
      name: "David Wilson",
      email: "david@homeessentials.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "DW",
    },
    status: "verified",
    products: 89,
    date: "1 week ago",
  },
  {
    id: "VEN-1237",
    name: "Outdoor Adventures",
    owner: {
      name: "Lisa Thompson",
      email: "lisa@outdooradventures.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "LT",
    },
    status: "pending",
    products: 32,
    date: "1 week ago",
  },
]

export function RecentVendorsTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Vendor</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Products</TableHead>
          <TableHead className="text-right">Joined</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentVendors.map((vendor) => (
          <TableRow key={vendor.id}>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={vendor.owner.avatar} alt={vendor.owner.name} />
                  <AvatarFallback>{vendor.owner.initials}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{vendor.name}</span>
                  <span className="text-xs text-muted-foreground">{vendor.owner.email}</span>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Badge
                variant={
                  vendor.status === "verified" ? "success" : vendor.status === "pending" ? "secondary" : "outline"
                }
              >
                {vendor.status}
              </Badge>
            </TableCell>
            <TableCell>{vendor.products}</TableCell>
            <TableCell className="text-right">{vendor.date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
