import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownIcon, ArrowUpIcon, DollarSign, ShoppingCart, TrendingUp, Users } from "lucide-react"

export function SalesReportSummary() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$45,231.89</div>
          <div className="flex items-center pt-1 text-xs text-muted-foreground">
            <span className="text-emerald-500">
              <ArrowUpIcon className="mr-1 inline h-3 w-3" />
              +20.1%
            </span>
            <span className="ml-1">from previous period</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          <ShoppingCart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2,350</div>
          <div className="flex items-center pt-1 text-xs text-muted-foreground">
            <span className="text-emerald-500">
              <ArrowUpIcon className="mr-1 inline h-3 w-3" />
              +12.2%
            </span>
            <span className="ml-1">from previous period</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$19.25</div>
          <div className="flex items-center pt-1 text-xs text-muted-foreground">
            <span className="text-emerald-500">
              <ArrowUpIcon className="mr-1 inline h-3 w-3" />
              +5.4%
            </span>
            <span className="ml-1">from previous period</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">New Customers</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+573</div>
          <div className="flex items-center pt-1 text-xs text-muted-foreground">
            <span className="text-red-500">
              <ArrowDownIcon className="mr-1 inline h-3 w-3" />
              -2.5%
            </span>
            <span className="ml-1">from previous period</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
