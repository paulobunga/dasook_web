"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const salesData = [
  { name: "Jan", revenue: 4000, orders: 240, profit: 2400 },
  { name: "Feb", revenue: 3000, orders: 198, profit: 1800 },
  { name: "Mar", revenue: 5000, orders: 320, profit: 3100 },
  { name: "Apr", revenue: 2780, orders: 190, profit: 1500 },
  { name: "May", revenue: 1890, orders: 130, profit: 1100 },
  { name: "Jun", revenue: 2390, orders: 150, profit: 1300 },
  { name: "Jul", revenue: 3490, orders: 220, profit: 2100 },
  { name: "Aug", revenue: 4000, orders: 250, profit: 2400 },
  { name: "Sep", revenue: 3000, orders: 210, profit: 1800 },
  { name: "Oct", revenue: 2000, orders: 160, profit: 1200 },
  { name: "Nov", revenue: 2780, orders: 190, profit: 1500 },
  { name: "Dec", revenue: 3890, orders: 240, profit: 2300 },
]

const trafficSourceData = [
  { name: "Direct", value: 35 },
  { name: "Organic Search", value: 25 },
  { name: "Paid Search", value: 15 },
  { name: "Social Media", value: 15 },
  { name: "Referral", value: 10 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

export function AnalyticsCharts() {
  const [salesMetric, setSalesMetric] = useState("revenue")

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="col-span-2 md:col-span-1">
        <CardHeader>
          <CardTitle>Sales Performance</CardTitle>
          <CardDescription>Monthly sales metrics over the past year</CardDescription>
          <Tabs defaultValue="revenue" className="mt-2" onValueChange={setSalesMetric}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="profit">Profit</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={salesData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  formatter={(value) =>
                    salesMetric === "revenue" || salesMetric === "profit"
                      ? [`$${value}`, salesMetric.charAt(0).toUpperCase() + salesMetric.slice(1)]
                      : [value, salesMetric.charAt(0).toUpperCase() + salesMetric.slice(1)]
                  }
                />
                <Bar
                  dataKey={salesMetric}
                  fill={salesMetric === "revenue" ? "#0ea5e9" : salesMetric === "orders" ? "#8884d8" : "#82ca9d"}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-2 md:col-span-1">
        <CardHeader>
          <CardTitle>Traffic Sources</CardTitle>
          <CardDescription>Where your customers are coming from</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={trafficSourceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {trafficSourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Revenue vs Orders Trend</CardTitle>
          <CardDescription>Correlation between revenue and order volume</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={salesData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" stroke="#0ea5e9" />
                <YAxis yAxisId="right" orientation="right" stroke="#8884d8" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#0ea5e9"
                  activeDot={{ r: 8 }}
                  name="Revenue ($)"
                />
                <Line yAxisId="right" type="monotone" dataKey="orders" stroke="#8884d8" name="Orders" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
