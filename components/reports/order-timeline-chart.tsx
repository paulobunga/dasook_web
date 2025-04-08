"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  {
    name: "Aug 30",
    pending: 5,
    processing: 4,
    shipped: 6,
    delivered: 8,
  },
  {
    name: "Aug 31",
    pending: 6,
    processing: 5,
    shipped: 8,
    delivered: 10,
  },
  {
    name: "Sep 01",
    pending: 8,
    processing: 7,
    shipped: 10,
    delivered: 12,
  },
  {
    name: "Sep 02",
    pending: 7,
    processing: 6,
    shipped: 9,
    delivered: 11,
  },
  {
    name: "Sep 03",
    pending: 9,
    processing: 8,
    shipped: 11,
    delivered: 13,
  },
  {
    name: "Sep 04",
    pending: 8,
    processing: 7,
    shipped: 10,
    delivered: 12,
  },
  {
    name: "Sep 05",
    pending: 10,
    processing: 9,
    shipped: 12,
    delivered: 14,
  },
]

export function OrderTimelineChart() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Order Timeline</CardTitle>
        <CardDescription>Daily order status progression</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pending" name="Pending" fill="#f59e0b" stackId="a" />
              <Bar dataKey="processing" name="Processing" fill="#8b5cf6" stackId="a" />
              <Bar dataKey="shipped" name="Shipped" fill="#0ea5e9" stackId="a" />
              <Bar dataKey="delivered" name="Delivered" fill="#10b981" stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
