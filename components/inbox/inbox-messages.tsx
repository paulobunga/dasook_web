"use client"

import { useState } from "react"
import Link from "next/link"
import { Check, MoreHorizontal, Star, Trash } from "lucide-react"

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

const messages = [
  {
    id: "MSG-1001",
    subject: "Question about my order",
    sender: {
      name: "John Smith",
      email: "john.smith@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JS",
      type: "customer",
    },
    preview: "I ordered the Wireless Headphones last week and was wondering when they will be shipped...",
    status: "unread",
    starred: false,
    date: "2023-09-01 14:32",
  },
  {
    id: "MSG-1002",
    subject: "Product listing issue",
    sender: {
      name: "Tech Gadgets Store",
      email: "support@techgadgets.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "TG",
      type: "vendor",
    },
    preview: "We're having trouble updating the product listings for our new smartphone models...",
    status: "unread",
    starred: true,
    date: "2023-09-01 10:15",
  },
  {
    id: "MSG-1003",
    subject: "Return request",
    sender: {
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SJ",
      type: "customer",
    },
    preview: "I received my order yesterday but the item is damaged. I would like to request a return...",
    status: "unread",
    starred: false,
    date: "2023-08-31 16:45",
  },
  {
    id: "MSG-1004",
    subject: "Commission rate inquiry",
    sender: {
      name: "Fashion Trends",
      email: "info@fashiontrends.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "FT",
      type: "vendor",
    },
    preview: "We've been selling on your platform for 6 months now and would like to discuss our commission rate...",
    status: "read",
    starred: true,
    date: "2023-08-30 09:22",
  },
  {
    id: "MSG-1005",
    subject: "Payment issue",
    sender: {
      name: "Michael Brown",
      email: "michael.brown@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MB",
      type: "customer",
    },
    preview: "I was charged twice for my recent purchase. Order number is ORD-7345...",
    status: "read",
    starred: false,
    date: "2023-08-30 08:17",
  },
  {
    id: "MSG-1006",
    subject: "Product availability",
    sender: {
      name: "Emily Davis",
      email: "emily.davis@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "ED",
      type: "customer",
    },
    preview: "I'm interested in the Smart Watch but it's been out of stock for weeks. When will it be available?",
    status: "read",
    starred: false,
    date: "2023-08-29 14:05",
  },
]

export function InboxMessages() {
  const [selectedMessages, setSelectedMessages] = useState<string[]>([])
  const { toast } = useToast()

  const toggleMessageSelection = (messageId: string) => {
    setSelectedMessages((current) =>
      current.includes(messageId) ? current.filter((id) => id !== messageId) : [...current, messageId],
    )
  }

  const toggleAllMessages = () => {
    if (selectedMessages.length === messages.length) {
      setSelectedMessages([])
    } else {
      setSelectedMessages(messages.map((message) => message.id))
    }
  }

  const handleMarkAsRead = (messageId: string) => {
    toast({
      title: "Message marked as read",
      description: `Message ${messageId} has been marked as read.`,
    })
  }

  const handleToggleStar = (messageId: string) => {
    toast({
      title: "Message starred",
      description: `Message ${messageId} has been starred.`,
    })
  }

  const handleDelete = (messageId: string) => {
    toast({
      title: "Message deleted",
      description: `Message ${messageId} has been deleted.`,
    })
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={selectedMessages.length === messages.length && messages.length > 0}
                onCheckedChange={toggleAllMessages}
                aria-label="Select all messages"
              />
            </TableHead>
            <TableHead className="w-12"></TableHead>
            <TableHead>Sender</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {messages.map((message) => (
            <TableRow key={message.id} className={message.status === "unread" ? "bg-muted/30 font-medium" : ""}>
              <TableCell>
                <Checkbox
                  checked={selectedMessages.includes(message.id)}
                  onCheckedChange={() => toggleMessageSelection(message.id)}
                  aria-label={`Select ${message.id}`}
                />
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleToggleStar(message.id)}
                  className={message.starred ? "text-yellow-500" : "text-muted-foreground"}
                >
                  <Star className="h-4 w-4" fill={message.starred ? "currentColor" : "none"} />
                  <span className="sr-only">{message.starred ? "Unstar" : "Star"}</span>
                </Button>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
                    <AvatarFallback>{message.sender.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{message.sender.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{message.sender.email}</span>
                      <Badge variant={message.sender.type === "vendor" ? "secondary" : "outline"} className="text-xs">
                        {message.sender.type}
                      </Badge>
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Link href={`/inbox/${message.id}`} className="block">
                  <div className="flex flex-col">
                    <span className="font-medium">{message.subject}</span>
                    <span className="truncate text-sm text-muted-foreground">{message.preview}</span>
                  </div>
                </Link>
              </TableCell>
              <TableCell>{message.date}</TableCell>
              <TableCell>
                <div className="flex justify-end gap-2">
                  {message.status === "unread" && (
                    <Button variant="outline" size="icon" onClick={() => handleMarkAsRead(message.id)}>
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
                      {message.status === "unread" && (
                        <DropdownMenuItem onClick={() => handleMarkAsRead(message.id)}>
                          <Check className="mr-2 h-4 w-4" />
                          Mark as read
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={() => handleToggleStar(message.id)}>
                        <Star className="mr-2 h-4 w-4" />
                        {message.starred ? "Remove star" : "Star message"}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(message.id)}
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
