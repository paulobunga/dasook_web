"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const salesData = [
  {
    date: "Sep 05, 2023",
    revenue: "$1,245.89",
    orders: 52,
    avgOrderValue: "$23.96",
    topCategory: "Electronics",
    topProduct: "Wireless Headphones",
  },
  {
    date: "Sep 04, 2023",
    revenue: "$1,189.45",
    orders: 48,
    avgOrderValue: "$24.78",
    topCategory: "Electronics",
    topProduct: "Smart Watch",
  },
  {
    date: "Sep 03, 2023",
    revenue: "$978.32",
    orders: 43,
    avgOrderValue: "$22.75",
    topCategory: "Fashion",
    topProduct: "Leather Backpack",
  },
  {
    date: "Sep 02, 2023",
    revenue: "$1,056.78",
    orders: 47,
    avgOrderValue: "$22.48",
    topCategory: "Home & Kitchen",
    topProduct: "Stainless Steel Water Bottle",
  },
  {
    date: "Sep 01, 2023",
    revenue: "$1,123.56",
    orders: 51,
    avgOrderValue: "$22.03",
    topCategory: "Electronics",
    topProduct: "Bluetooth Speaker",
  },
  {
    date: "Aug 31, 2023",
    revenue: "$967.21",
    orders: 45,
    avgOrderValue: "$21.49",
    topCategory: "Sports & Outdoors",
    topProduct: "Yoga Mat",
  },
  {
    date: "Aug 30, 2023",
    revenue: "$1,089.67",
    orders: 49,
    avgOrderValue: "$22.24",
    topCategory: "Electronics",
    topProduct: "Wireless Earbuds",
  },
]

export function SalesReportTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Sales Breakdown</CardTitle>
        <CardDescription>Detailed daily sales performance</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Avg. Order Value</TableHead>
              <TableHead>Top Category</TableHead>
              <TableHead>Top Product</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {salesData.map((day, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{day.date}</TableCell>
                <TableCell>{day.revenue}</TableCell>
                <TableCell>{day.orders}</TableCell>
                <TableCell>{day.avgOrderValue}</TableCell>
                <TableCell>{day.topCategory}</TableCell>
                <TableCell>{day.topProduct}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
