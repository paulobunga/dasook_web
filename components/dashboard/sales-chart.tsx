"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    total: 4000,
  },
  {
    name: "Feb",
    total: 4200,
  },
  {
    name: "Mar",
    total: 5800,
  },
  {
    name: "Apr",
    total: 6000,
  },
  {
    name: "May",
    total: 5500,
  },
  {
    name: "Jun",
    total: 7000,
  },
  {
    name: "Jul",
    total: 8900,
  },
  {
    name: "Aug",
    total: 8100,
  },
  {
    name: "Sep",
    total: 9200,
  },
  {
    name: "Oct",
    total: 9900,
  },
  {
    name: "Nov",
    total: 10800,
  },
  {
    name: "Dec",
    total: 12100,
  },
]

export function SalesChart() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} cursor={{ fill: "rgba(0, 0, 0, 0.05)" }} />
        <Bar dataKey="total" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
