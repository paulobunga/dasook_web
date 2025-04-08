import { Button } from "@/components/ui/button"
import { OrderReportFilters } from "@/components/reports/order-report-filters"
import { OrderStatusChart } from "@/components/reports/order-status-chart"
import { OrderTimelineChart } from "@/components/reports/order-timeline-chart"
import { OrderDetailsTable } from "@/components/reports/order-details-table"
import { Download, Printer } from "lucide-react"

export default function OrderReportPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Order Report</h1>
          <p className="text-muted-foreground">Analyze order processing and fulfillment</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      <OrderReportFilters />
      <div className="grid gap-6 md:grid-cols-2">
        <OrderStatusChart />
        <OrderTimelineChart />
      </div>
      <OrderDetailsTable />
    </div>
  )
}
