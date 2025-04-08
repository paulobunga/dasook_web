"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Search, Heart, ShoppingCart, AlertTriangle, X } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

// Mock data for wishlist items
const mockWishlistItems = [
  {
    id: "item-1",
    productId: "PROD-1234",
    name: "Wireless Headphones",
    price: "$299.99",
    image: "/placeholder.svg?height=200&width=200",
    vendor: "Tech Gadgets Store",
    inStock: true,
    addedAt: "2023-08-15T14:30:00Z",
  },
  {
    id: "item-2",
    productId: "PROD-1235",
    name: "Smart Watch",
    price: "$199.99",
    image: "/placeholder.svg?height=200&width=200",
    vendor: "Tech Gadgets Store",
    inStock: true,
    addedAt: "2023-08-20T10:15:00Z",
  },
  {
    id: "item-3",
    productId: "PROD-1236",
    name: "Leather Backpack",
    price: "$89.99",
    image: "/placeholder.svg?height=200&width=200",
    vendor: "Fashion Trends",
    inStock: false,
    addedAt: "2023-08-25T16:45:00Z",
  },
]

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    // In a real app, you would fetch wishlist items from your API
    // For now, we'll use mock data
    const loadWishlist = async () => {
      setLoading(true)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))
        setWishlistItems(mockWishlistItems)
      } catch (err: any) {
        console.error("Error loading wishlist:", err)
        setError(err.message || "Failed to load wishlist")
      } finally {
        setLoading(false)
      }
    }

    loadWishlist()
  }, [])

  const filteredItems = wishlistItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.vendor.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleRemoveItem = (itemId: string) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== itemId))
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString([], { year: "numeric", month: "short", day: "numeric" })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading your wishlist...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Wishlist</h1>
        <p className="text-muted-foreground">Save items you're interested in for later</p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4 mr-2" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Saved Items</CardTitle>
          <CardDescription>Items you've added to your wishlist</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative mb-6">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search wishlist..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {filteredItems.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredItems.map((item) => (
                <div key={item.id} className="group relative rounded-lg border p-4 hover:border-primary/50">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove from wishlist</span>
                  </Button>

                  <div className="aspect-square mb-4 overflow-hidden rounded-lg">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">Sold by {item.vendor}</p>

                    <div className="flex items-center justify-between">
                      <span className="font-medium">{item.price}</span>
                      {!item.inStock && (
                        <Badge variant="outline" className="text-destructive border-destructive">
                          Out of stock
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-muted-foreground">Added on {formatDate(item.addedAt)}</span>
                      <Button size="sm" disabled={!item.inStock} className="h-8">
                        <ShoppingCart className="mr-2 h-3 w-3" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Heart className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Your wishlist is empty</h3>
              <p className="text-muted-foreground mt-1">
                {searchTerm ? "No items match your search" : "Save items you're interested in for later"}
              </p>
              {searchTerm && (
                <Button variant="outline" className="mt-4" onClick={() => setSearchTerm("")}>
                  Clear Search
                </Button>
              )}
              {!searchTerm && (
                <Button variant="outline" className="mt-4" asChild>
                  <Link href="/">Browse Products</Link>
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
