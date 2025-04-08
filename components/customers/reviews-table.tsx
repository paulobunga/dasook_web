"use client"

import { useState } from "react"
import Link from "next/link"
import { Check, Eye, MoreHorizontal, Star, Trash, X } from "lucide-react"

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

const reviews = [
  {
    id: "REV-1001",
    product: {
      name: "Wireless Headphones",
      image: "/placeholder.svg?height=40&width=40",
      id: "PROD-1234",
    },
    customer: {
      name: "John Smith",
      email: "john.smith@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JS",
    },
    rating: 5,
    title: "Amazing sound quality!",
    comment:
      "These headphones have incredible sound quality and the noise cancellation is top-notch. Battery life is also impressive.",
    status: "published",
    date: "2023-09-01",
  },
  {
    id: "REV-1002",
    product: {
      name: "Smart Watch",
      image: "/placeholder.svg?height=40&width=40",
      id: "PROD-1235",
    },
    customer: {
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SJ",
    },
    rating: 4,
    title: "Great features, but battery could be better",
    comment:
      "I love all the features this watch offers. The fitness tracking is accurate and the notifications are useful. My only complaint is that the battery doesn't last as long as advertised.",
    status: "published",
    date: "2023-08-30",
  },
  {
    id: "REV-1003",
    product: {
      name: "Leather Backpack",
      image: "/placeholder.svg?height=40&width=40",
      id: "PROD-1236",
    },
    customer: {
      name: "Michael Brown",
      email: "michael.brown@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MB",
    },
    rating: 2,
    title: "Poor quality stitching",
    comment:
      "The design looks nice, but the stitching started coming apart after just a week of use. Very disappointed with the quality.",
    status: "pending",
    date: "2023-08-29",
  },
  {
    id: "REV-1004",
    product: {
      name: "Fitness Tracker",
      image: "/placeholder.svg?height=40&width=40",
      id: "PROD-1237",
    },
    customer: {
      name: "Emily Davis",
      email: "emily.davis@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "ED",
    },
    rating: 5,
    title: "Perfect for my workouts!",
    comment:
      "This fitness tracker has been a game-changer for my workouts. It's accurate, comfortable to wear, and the app is very user-friendly.",
    status: "published",
    date: "2023-08-28",
  },
  {
    id: "REV-1005",
    product: {
      name: "Bluetooth Speaker",
      image: "/placeholder.svg?height=40&width=40",
      id: "PROD-1238",
    },
    customer: {
      name: "David Wilson",
      email: "david.wilson@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "DW",
    },
    rating: 1,
    title: "Doesn't work at all",
    comment: "Received a defective unit that wouldn't turn on. Waste of money and time.",
    status: "rejected",
    date: "2023-08-25",
  },
  {
    id: "REV-1006",
    product: {
      name: "Stainless Steel Water Bottle",
      image: "/placeholder.svg?height=40&width=40",
      id: "PROD-1239",
    },
    customer: {
      name: "Jessica Miller",
      email: "jessica.miller@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JM",
    },
    rating: 4,
    title: "Great bottle, keeps drinks cold for hours",
    comment:
      "This water bottle is excellent at keeping my drinks cold all day. The only reason I'm not giving 5 stars is because it's a bit heavy.",
    status: "pending",
    date: "2023-08-24",
  },
]

export function ReviewsTable() {
  const [selectedReviews, setSelectedReviews] = useState<string[]>([])
  const { toast } = useToast()

  const toggleReviewSelection = (reviewId: string) => {
    setSelectedReviews((current) =>
      current.includes(reviewId) ? current.filter((id) => id !== reviewId) : [...current, reviewId],
    )
  }

  const toggleAllReviews = () => {
    if (selectedReviews.length === reviews.length) {
      setSelectedReviews([])
    } else {
      setSelectedReviews(reviews.map((review) => review.id))
    }
  }

  const handleApprove = (reviewId: string) => {
    toast({
      title: "Review approved",
      description: `Review ${reviewId} has been approved and published.`,
    })
  }

  const handleReject = (reviewId: string) => {
    toast({
      title: "Review rejected",
      description: `Review ${reviewId} has been rejected.`,
    })
  }

  const handleDelete = (reviewId: string) => {
    toast({
      title: "Review deleted",
      description: `Review ${reviewId} has been deleted.`,
    })
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
        ))}
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={selectedReviews.length === reviews.length && reviews.length > 0}
                onCheckedChange={toggleAllReviews}
                aria-label="Select all reviews"
              />
            </TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Review</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviews.map((review) => (
            <TableRow key={review.id}>
              <TableCell>
                <Checkbox
                  checked={selectedReviews.includes(review.id)}
                  onCheckedChange={() => toggleReviewSelection(review.id)}
                  aria-label={`Select ${review.id}`}
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <img
                    src={review.product.image || "/placeholder.svg"}
                    alt={review.product.name}
                    className="h-10 w-10 rounded-md object-cover"
                  />
                  <div className="flex flex-col">
                    <span className="font-medium">{review.product.name}</span>
                    <span className="text-xs text-muted-foreground">{review.product.id}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={review.customer.avatar} alt={review.customer.name} />
                    <AvatarFallback>{review.customer.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{review.customer.name}</span>
                    <span className="text-xs text-muted-foreground">{review.customer.email}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>{renderStars(review.rating)}</TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium">{review.title}</span>
                  <span className="truncate text-xs text-muted-foreground max-w-[200px]">{review.comment}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    review.status === "published"
                      ? "success"
                      : review.status === "pending"
                        ? "secondary"
                        : "destructive"
                  }
                >
                  {review.status}
                </Badge>
              </TableCell>
              <TableCell>{review.date}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  {review.status === "pending" && (
                    <>
                      <Button variant="outline" size="icon" onClick={() => handleApprove(review.id)}>
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="sr-only">Approve</span>
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleReject(review.id)}>
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
                        <Link href={`/customers/reviews/${review.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      {review.status === "pending" && (
                        <>
                          <DropdownMenuItem onClick={() => handleApprove(review.id)}>
                            <Check className="mr-2 h-4 w-4" />
                            Approve
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleReject(review.id)}>
                            <X className="mr-2 h-4 w-4" />
                            Reject
                          </DropdownMenuItem>
                        </>
                      )}
                      <DropdownMenuItem
                        onClick={() => handleDelete(review.id)}
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
