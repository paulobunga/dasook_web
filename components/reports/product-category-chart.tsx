"use client"

import { useEffect, useState } from "react"
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { name: "Electronics", value: 45, color: "#0ea5e9" },
  { name: "Fashion", value: 25, color: "#f43f5e" },
  { name: "Home & Kitchen", value: 15, color: "#10b981" },
  { name: "Sports & Outdoors", value: 10, color: "#8b5cf6" },
  { name: "Beauty & Health", value: 5, color: "#f59e0b" },
]

export function ProductCategoryChart() {
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
        <CardTitle>Sales by Category</CardTitle>
        <CardDescription>Distribution of sales across product categories</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, "Sales Percentage"]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
