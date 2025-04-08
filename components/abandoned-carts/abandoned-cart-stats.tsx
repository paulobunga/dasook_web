"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart, Mail, MousePointerClick, ArrowUpRight } from "lucide-react"

export function AbandonedCartStats() {
  // Mock data for statistics
  const stats = [
    {
      title: "Total Abandoned Carts",
      value: "247",
      change: "+12.5%",
      icon: <ShoppingCart className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Recovery Emails Sent",
      value: "183",
      change: "+8.2%",
      icon: <Mail className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Email Open Rate",
      value: "42.3%",
      change: "+5.1%",
      icon: <MousePointerClick className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Recovery Rate",
      value: "23.8%",
      change: "+3.7%",
      icon: <ArrowUpRight className="h-4 w-4 text-muted-foreground" />,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <span className={`mr-1 ${stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                {stat.change}
              </span>
              from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
