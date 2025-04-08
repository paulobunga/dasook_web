"use client"

import { useState } from "react"
import { ArrowUpRight, ArrowDownRight, DollarSign, ShoppingBag, Users, ShoppingCart, RefreshCw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AnalyticsOverview() {
  const [timeRange, setTimeRange] = useState("30")

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Analytics Overview</h2>
          <p className="text-muted-foreground">Detailed performance metrics for your marketplace</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$48,735.62</div>
            <div className="flex items-center pt-1">
              <span className="text-xs text-emerald-500 flex items-center mr-2">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +12.5%
              </span>
              <span className="text-xs text-muted-foreground">vs previous period</span>
            </div>
            <div className="mt-4 h-1 w-full bg-muted overflow-hidden rounded-full">
              <div className="bg-emerald-500 h-1 w-[75%] rounded-full" />
            </div>
            <div className="mt-1 flex justify-between text-xs text-muted-foreground">
              <span>Target: $65,000</span>
              <span>75% achieved</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,845</div>
            <div className="flex items-center pt-1">
              <span className="text-xs text-emerald-500 flex items-center mr-2">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +8.2%
              </span>
              <span className="text-xs text-muted-foreground">vs previous period</span>
            </div>
            <div className="mt-4 h-1 w-full bg-muted overflow-hidden rounded-full">
              <div className="bg-emerald-500 h-1 w-[82%] rounded-full" />
            </div>
            <div className="mt-1 flex justify-between text-xs text-muted-foreground">
              <span>Target: 3,500</span>
              <span>82% achieved</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.42%</div>
            <div className="flex items-center pt-1">
              <span className="text-xs text-emerald-500 flex items-center mr-2">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +0.8%
              </span>
              <span className="text-xs text-muted-foreground">vs previous period</span>
            </div>
            <div className="mt-4 h-1 w-full bg-muted overflow-hidden rounded-full">
              <div className="bg-emerald-500 h-1 w-[68%] rounded-full" />
            </div>
            <div className="mt-1 flex justify-between text-xs text-muted-foreground">
              <span>Target: 5%</span>
              <span>68% achieved</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,482</div>
            <div className="flex items-center pt-1">
              <span className="text-xs text-destructive flex items-center mr-2">
                <ArrowDownRight className="h-3 w-3 mr-1" />
                -2.3%
              </span>
              <span className="text-xs text-muted-foreground">vs previous period</span>
            </div>
            <div className="mt-4 h-1 w-full bg-muted overflow-hidden rounded-full">
              <div className="bg-destructive h-1 w-[45%] rounded-full" />
            </div>
            <div className="mt-1 flex justify-between text-xs text-muted-foreground">
              <span>Target: 3,000</span>
              <span>45% achieved</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
