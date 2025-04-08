import { Button } from "@/components/ui/button"
import { SalesReportFilters } from "@/components/reports/sales-report-filters"
import { SalesReportChart } from "@/components/reports/sales-report-chart"
import { SalesReportTable } from "@/components/reports/sales-report-table"
import { SalesReportSummary } from "@/components/reports/sales-report-summary"
import { Download, Printer } from "lucide-react"

export default function SalesReportPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sales Report</h1>
          <p className="text-muted-foreground">Analyze your marketplace sales performance</p>
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
      <SalesReportFilters />
      <SalesReportSummary />
      <SalesReportChart />
      <SalesReportTable />
    </div>
  )
}
