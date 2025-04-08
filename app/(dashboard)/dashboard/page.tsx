import Link from "next/link"
import { ArrowDownIcon, ArrowRightIcon, ArrowUpIcon, DollarSign, ShoppingCart, Store, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RecentOrdersTable } from "@/components/dashboard/recent-orders-table"
import { RecentVendorsTable } from "@/components/dashboard/recent-vendors-table"
import { SalesChart } from "@/components/dashboard/sales-chart"
import { AnalyticsOverview } from "@/components/dashboard/analytics-overview"
import { AnalyticsCharts } from "@/components/dashboard/analytics-charts"
import { AnalyticsMetrics } from "@/components/dashboard/analytics-metrics"
import { ReportsSummary } from "@/components/dashboard/reports-summary"
import { ReportsScheduled } from "@/components/dashboard/reports-scheduled"
import { NotificationsRecent } from "@/components/dashboard/notifications-recent"
import { NotificationsAlerts } from "@/components/dashboard/notifications-alerts"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your marketplace performance</p>
        </div>
        <div className="flex items-center gap-2">
          <Button>
            Download Reports
            <ArrowDownIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-emerald-500">+20.1%</span> from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2350</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-emerald-500">+12.2%</span> from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Vendors</CardTitle>
                <Store className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+573</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-emerald-500">+7.4%</span> from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12,234</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-emerald-500">+3.1%</span> from last month
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <SalesChart />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>You have received 32 orders this month</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentOrdersTable />
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" className="w-full">
                  <Link href="/orders">
                    View all orders
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Vendors</CardTitle>
                <CardDescription>12 vendors joined in the last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentVendorsTable />
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" className="w-full">
                  <Link href="/vendors">
                    View all vendors
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Top Selling Products</CardTitle>
                <CardDescription>Your top selling products this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="flex items-center">
                    <div className="mr-4 shrink-0">
                      <img
                        src="/placeholder.svg?height=48&width=48"
                        width={48}
                        height={48}
                        alt="Product"
                        className="rounded-md object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">Wireless Headphones</p>
                      <p className="text-sm text-muted-foreground">Electronics</p>
                    </div>
                    <div className="text-sm font-medium">$299.99</div>
                    <div className="ml-4 text-sm text-emerald-500">
                      <ArrowUpIcon className="mr-1 inline h-3 w-3" />
                      142 sold
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-4 shrink-0">
                      <img
                        src="/placeholder.svg?height=48&width=48"
                        width={48}
                        height={48}
                        alt="Product"
                        className="rounded-md object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">Smart Watch</p>
                      <p className="text-sm text-muted-foreground">Electronics</p>
                    </div>
                    <div className="text-sm font-medium">$199.99</div>
                    <div className="ml-4 text-sm text-emerald-500">
                      <ArrowUpIcon className="mr-1 inline h-3 w-3" />
                      98 sold
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-4 shrink-0">
                      <img
                        src="/placeholder.svg?height=48&width=48"
                        width={48}
                        height={48}
                        alt="Product"
                        className="rounded-md object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">Leather Backpack</p>
                      <p className="text-sm text-muted-foreground">Fashion</p>
                    </div>
                    <div className="text-sm font-medium">$89.99</div>
                    <div className="ml-4 text-sm text-emerald-500">
                      <ArrowUpIcon className="mr-1 inline h-3 w-3" />
                      76 sold
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-4 shrink-0">
                      <img
                        src="/placeholder.svg?height=48&width=48"
                        width={48}
                        height={48}
                        alt="Product"
                        className="rounded-md object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">Fitness Tracker</p>
                      <p className="text-sm text-muted-foreground">Electronics</p>
                    </div>
                    <div className="text-sm font-medium">$49.99</div>
                    <div className="ml-4 text-sm text-emerald-500">
                      <ArrowUpIcon className="mr-1 inline h-3 w-3" />
                      65 sold
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" className="w-full">
                  <Link href="/products">
                    View all products
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <AnalyticsOverview />
          <AnalyticsCharts />
          <AnalyticsMetrics />
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <ReportsSummary />
            <ReportsScheduled />
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <NotificationsRecent />
            <NotificationsAlerts />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
