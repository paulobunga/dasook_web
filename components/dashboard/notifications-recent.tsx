import { Check, ShoppingBag, Store, User, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export function NotificationsRecent() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Recent Notifications</CardTitle>
        <CardDescription>Latest updates from your marketplace</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="mr-4 mt-1 bg-primary/10 p-2 rounded-full">
              <ShoppingBag className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">New Order Received</h3>
                <Badge variant="secondary">New</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Order #ORD-7352 has been placed by John Smith for $245.99
              </p>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <span>2 hours ago</span>
              </div>
              <div className="flex justify-end mt-2">
                <Button variant="outline" size="sm" className="h-7 px-2">
                  <Check className="h-3 w-3 mr-1" />
                  Mark as Read
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-start">
            <div className="mr-4 mt-1 bg-primary/10 p-2 rounded-full">
              <Store className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">New Vendor Registration</h3>
                <Badge variant="secondary">New</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Tech Gadgets Store has registered as a new vendor</p>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <span>5 hours ago</span>
              </div>
              <div className="flex justify-end mt-2">
                <Button variant="outline" size="sm" className="h-7 px-2">
                  <Check className="h-3 w-3 mr-1" />
                  Mark as Read
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-start">
            <div className="mr-4 mt-1 bg-destructive/10 p-2 rounded-full">
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Low Stock Alert</h3>
                <Badge variant="outline">Read</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Product 'Wireless Headphones' is running low on stock (5 remaining)
              </p>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <span>1 day ago</span>
              </div>
            </div>
          </div>

          <div className="flex items-start">
            <div className="mr-4 mt-1 bg-muted p-2 rounded-full">
              <User className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">New Support Ticket</h3>
                <Badge variant="outline">Read</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Customer Emily Davis has opened a new support ticket</p>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <span>2 days ago</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <Link href="/notifications">View All Notifications</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
