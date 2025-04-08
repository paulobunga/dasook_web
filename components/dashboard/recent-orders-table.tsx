import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const recentOrders = [
  {
    id: "ORD-7352",
    customer: {
      name: "John Smith",
      email: "john.smith@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JS",
    },
    status: "processing",
    total: "$245.99",
    date: "2 hours ago",
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
    total: "$124.99",
    date: "5 hours ago",
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
    total: "$89.99",
    date: "1 day ago",
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
    total: "$349.99",
    date: "2 days ago",
  },
]

export function RecentOrdersTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Total</TableHead>
          <TableHead className="text-right">Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentOrders.map((order) => (
          <TableRow key={order.id}>
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
                        : "outline"
                }
              >
                {order.status}
              </Badge>
            </TableCell>
            <TableCell>{order.total}</TableCell>
            <TableCell className="text-right">{order.date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
