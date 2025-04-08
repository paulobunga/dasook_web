import { Button } from "@/components/ui/button"
import { RefundRequestsTable } from "@/components/refunds/refund-requests-table"
import { RefundFilters } from "@/components/refunds/refund-filters"

export default function RefundRequestsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Refund Requests</h1>
          <p className="text-muted-foreground">Manage customer refund requests</p>
        </div>
        <Button variant="outline">Export Requests</Button>
      </div>
      <RefundFilters />
      <RefundRequestsTable />
    </div>
  )
}
