import { Button } from "@/components/ui/button"
import { ProductReportFilters } from "@/components/reports/product-report-filters"
import { ProductPerformanceTable } from "@/components/reports/product-performance-table"
import { ProductCategoryChart } from "@/components/reports/product-category-chart"
import { Download, Printer } from "lucide-react"

export default function ProductReportPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Product Report</h1>
          <p className="text-muted-foreground">Analyze product performance and inventory</p>
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
      <ProductReportFilters />
      <div className="grid gap-6 md:grid-cols-2">
        <ProductCategoryChart />
      </div>
      <ProductPerformanceTable />
    </div>
  )
}
