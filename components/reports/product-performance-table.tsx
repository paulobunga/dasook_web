"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"

const productData = [
  {
    id: "PROD-1234",
    name: "Wireless Headphones",
    image: "/placeholder.svg?height=40&width=40",
    category: "Electronics",
    vendor: "Tech Gadgets Store",
    price: "$299.99",
    sales: 142,
    revenue: "$42,598.58",
    stock: 45,
    trend: "up",
    trendValue: "+12%",
  },
  {
    id: "PROD-1235",
    name: "Smart Watch",
    image: "/placeholder.svg?height=40&width=40",
    category: "Electronics",
    vendor: "Tech Gadgets Store",
    price: "$199.99",
    sales: 98,
    revenue: "$19,599.02",
    stock: 28,
    trend: "up",
    trendValue: "+8%",
  },
  {
    id: "PROD-1236",
    name: "Leather Backpack",
    image: "/placeholder.svg?height=40&width=40",
    category: "Fashion",
    vendor: "Fashion Trends",
    price: "$89.99",
    sales: 76,
    revenue: "$6,839.24",
    stock: 15,
    trend: "down",
    trendValue: "-3%",
  },
  {
    id: "PROD-1237",
    name: "Fitness Tracker",
    image: "/placeholder.svg?height=40&width=40",
    category: "Electronics",
    vendor: "Tech Gadgets Store",
    price: "$49.99",
    sales: 65,
    revenue: "$3,249.35",
    stock: 32,
    trend: "up",
    trendValue: "+5%",
  },
  {
    id: "PROD-1238",
    name: "Bluetooth Speaker",
    image: "/placeholder.svg?height=40&width=40",
    category: "Electronics",
    vendor: "Tech Gadgets Store",
    price: "$79.99",
    sales: 54,
    revenue: "$4,319.46",
    stock: 0,
    trend: "down",
    trendValue: "-7%",
  },
  {
    id: "PROD-1239",
    name: "Stainless Steel Water Bottle",
    image: "/placeholder.svg?height=40&width=40",
    category: "Home & Kitchen",
    vendor: "Home Essentials",
    price: "$24.99",
    sales: 48,
    revenue: "$1,199.52",
    stock: 67,
    trend: "up",
    trendValue: "+2%",
  },
  {
    id: "PROD-1240",
    name: "Yoga Mat",
    image: "/placeholder.svg?height=40&width=40",
    category: "Sports & Outdoors",
    vendor: "Outdoor Adventures",
    price: "$29.99",
    sales: 42,
    revenue: "$1,259.58",
    stock: 23,
    trend: "up",
    trendValue: "+4%",
  },
]

export function ProductPerformanceTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Performing Products</CardTitle>
        <CardDescription>Products with the highest sales and revenue</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Sales</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Trend</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productData.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="h-10 w-10 rounded-md object-cover"
                    />
                    <div className="flex flex-col">
                      <span className="font-medium">{product.name}</span>
                      <span className="text-xs text-muted-foreground">{product.id}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.vendor}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.sales}</TableCell>
                <TableCell>{product.revenue}</TableCell>
                <TableCell>
                  {product.stock === 0 ? (
                    <Badge variant="destructive">Out of Stock</Badge>
                  ) : product.stock < 20 ? (
                    <Badge variant="secondary">Low Stock</Badge>
                  ) : (
                    product.stock
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {product.trend === "up" ? (
                      <ArrowUpIcon className="mr-1 h-4 w-4 text-emerald-500" />
                    ) : (
                      <ArrowDownIcon className="mr-1 h-4 w-4 text-red-500" />
                    )}
                    <span className={product.trend === "up" ? "text-emerald-500" : "text-red-500"}>
                      {product.trendValue}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
