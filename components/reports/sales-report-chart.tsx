"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const dailyData = [
  { name: "Aug 25", revenue: 4000, orders: 240 },
  { name: "Aug 26", revenue: 4200, orders: 255 },
  { name: "Aug 27", revenue: 5800, orders: 310 },
  { name: "Aug 28", revenue: 6000, orders: 325 },
  { name: "Aug 29", revenue: 5500, orders: 290 },
  { name: "Aug 30", revenue: 7000, orders: 350 },
  { name: "Aug 31", revenue: 8900, orders: 410 },
  { name: "Sep 01", revenue: 8100, orders: 380 },
  { name: "Sep 02", revenue: 9200, orders: 420 },
  { name: "Sep 03", revenue: 9900, orders: 435 },
  { name: "Sep 04", revenue: 10800, orders: 470 },
  { name: "Sep 05", revenue: 12100, orders: 510 },
]

const weeklyData = [
  { name: "Week 30", revenue: 28000, orders: 1680 },
  { name: "Week 31", revenue: 32000, orders: 1850 },
  { name: "Week 32", revenue: 35500, orders: 1950 },
  { name: "Week 33", revenue: 39000, orders: 2100 },
  { name: "Week 34", revenue: 42500, orders: 2250 },
  { name: "Week 35", revenue: 45000, orders: 2350 },
]

const monthlyData = [
  { name: "Mar", revenue: 120000, orders: 6800 },
  { name: "Apr", revenue: 135000, orders: 7200 },
  { name: "May", revenue: 150000, orders: 7900 },
  { name: "Jun", revenue: 175000, orders: 8500 },
  { name: "Jul", revenue: 190000, orders: 9100 },
  { name: "Aug", revenue: 210000, orders: 9800 },
]

export function SalesReportChart() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Overview</CardTitle>
        <CardDescription>View your sales performance over time</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="revenue">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
            </TabsList>
            <TabsList>
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="revenue" className="pt-4">
            <TabsContent value="daily" className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyData}>
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                  <Bar dataKey="revenue" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
            <TabsContent value="weekly" className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                  <Bar dataKey="revenue" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
            <TabsContent value="monthly" className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                  <Bar dataKey="revenue" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
          </TabsContent>
          <TabsContent value="orders" className="pt-4">
            <TabsContent value="daily" className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyData}>
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <Tooltip formatter={(value) => [value, "Orders"]} />
                  <Bar dataKey="orders" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
            <TabsContent value="weekly" className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <Tooltip formatter={(value) => [value, "Orders"]} />
                  <Bar dataKey="orders" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
            <TabsContent value="monthly" className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <Tooltip formatter={(value) => [value, "Orders"]} />
                  <Bar dataKey="orders" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
