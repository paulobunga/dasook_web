"use client"

import { useState } from "react"
import { Check, MoreHorizontal, Trash } from "lucide-react"

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

const notifications = [
  {
    id: "NOTIF-1001",
    title: "New Order Received",
    message: "Order #ORD-7352 has been placed by John Smith",
    type: "order",
    status: "unread",
    date: "2023-09-01 14:32",
  },
  {
    id: "NOTIF-1002",
    title: "New Vendor Registration",
    message: "Tech Gadgets Store has registered as a new vendor",
    type: "vendor",
    status: "unread",
    date: "2023-09-01 10:15",
  },
  {
    id: "NOTIF-1003",
    title: "Low Stock Alert",
    message: "Product 'Wireless Headphones' is running low on stock (5 remaining)",
    type: "inventory",
    status: "unread",
    date: "2023-08-31 16:45",
  },
  {
    id: "NOTIF-1004",
    title: "New Support Ticket",
    message: "Customer Emily Davis has opened a new support ticket",
    type: "support",
    status: "read",
    date: "2023-08-30 09:22",
  },
  {
    id: "NOTIF-1005",
    title: "Payment Received",
    message: "Payment of $349.99 received for order #ORD-7349",
    type: "payment",
    status: "read",
    date: "2023-08-30 08:17",
  },
  {
    id: "NOTIF-1006",
    title: "New Review",
    message: "Product 'Smart Watch' has received a new 5-star review",
    type: "review",
    status: "read",
    date: "2023-08-29 14:05",
  },
]

export function NotificationsTable() {
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([])
  const { toast } = useToast()

  const toggleNotificationSelection = (notificationId: string) => {
    setSelectedNotifications((current) =>
      current.includes(notificationId) ? current.filter((id) => id !== notificationId) : [...current, notificationId],
    )
  }

  const toggleAllNotifications = () => {
    if (selectedNotifications.length === notifications.length) {
      setSelectedNotifications([])
    } else {
      setSelectedNotifications(notifications.map((notification) => notification.id))
    }
  }

  const handleMarkAsRead = (notificationId: string) => {
    toast({
      title: "Notification marked as read",
      description: `Notification ${notificationId} has been marked as read.`,
    })
  }

  const handleDelete = (notificationId: string) => {
    toast({
      title: "Notification deleted",
      description: `Notification ${notificationId} has been deleted.`,
    })
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={selectedNotifications.length === notifications.length && notifications.length > 0}
                onCheckedChange={toggleAllNotifications}
                aria-label="Select all notifications"
              />
            </TableHead>
            <TableHead>Notification</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {notifications.map((notification) => (
            <TableRow key={notification.id} className={notification.status === "unread" ? "bg-muted/30" : ""}>
              <TableCell>
                <Checkbox
                  checked={selectedNotifications.includes(notification.id)}
                  onCheckedChange={() => toggleNotificationSelection(notification.id)}
                  aria-label={`Select ${notification.id}`}
                />
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium">{notification.title}</span>
                  <span className="text-sm text-muted-foreground">{notification.message}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    notification.type === "order"
                      ? "default"
                      : notification.type === "vendor"
                        ? "secondary"
                        : notification.type === "inventory"
                          ? "destructive"
                          : notification.type === "payment"
                            ? "success"
                            : "outline"
                  }
                >
                  {notification.type}
                </Badge>
              </TableCell>
              <TableCell>
                {notification.status === "unread" ? (
                  <Badge variant="secondary">Unread</Badge>
                ) : (
                  <span className="text-muted-foreground">Read</span>
                )}
              </TableCell>
              <TableCell>{notification.date}</TableCell>
              <TableCell>
                <div className="flex justify-end gap-2">
                  {notification.status === "unread" && (
                    <Button variant="outline" size="icon" onClick={() => handleMarkAsRead(notification.id)}>
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="sr-only">Mark as read</span>
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
                      {notification.status === "unread" && (
                        <DropdownMenuItem onClick={() => handleMarkAsRead(notification.id)}>
                          <Check className="mr-2 h-4 w-4" />
                          Mark as read
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        onClick={() => handleDelete(notification.id)}
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
