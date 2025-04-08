import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDateRangePicker } from "@/components/ui/date-range-picker"
import { AbandonedCartsTable } from "@/components/abandoned-carts/abandoned-carts-table"
import { AbandonedCartFilters } from "@/components/abandoned-carts/abandoned-cart-filters"
import { AbandonedCartStats } from "@/components/abandoned-carts/abandoned-cart-stats"
import { AbandonedCartEmailSettings } from "@/components/abandoned-carts/abandoned-cart-email-settings"

export const metadata: Metadata = {
  title: "Abandoned Carts | E-commerce Admin",
  description: "Manage abandoned carts and recovery emails",
}

export default function AbandonedCartsPage() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Abandoned Carts</h1>
          <p className="text-muted-foreground">Track and recover abandoned shopping carts</p>
        </div>
        <div className="flex items-center gap-2">
          <CalendarDateRangePicker />
          <Button>Export Data</Button>
        </div>
      </div>

      <AbandonedCartStats />

      <Tabs defaultValue="carts">
        <TabsList className="grid w-full md:w-auto grid-cols-2">
          <TabsTrigger value="carts">Abandoned Carts</TabsTrigger>
          <TabsTrigger value="settings">Email Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="carts" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Abandoned Carts</CardTitle>
              <CardDescription>View and manage abandoned shopping carts</CardDescription>
            </CardHeader>
            <CardContent>
              <AbandonedCartFilters />
              <AbandonedCartsTable />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Recovery Email Settings</CardTitle>
              <CardDescription>Configure automated emails for abandoned cart recovery</CardDescription>
            </CardHeader>
            <CardContent>
              <AbandonedCartEmailSettings />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
