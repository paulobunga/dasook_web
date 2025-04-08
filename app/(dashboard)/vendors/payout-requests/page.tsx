import { Button } from "@/components/ui/button"
import { PayoutRequestsTable } from "@/components/vendors/payout-requests-table"
import { PayoutRequestFilters } from "@/components/vendors/payout-request-filters"

export default function PayoutRequestsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payout Requests</h1>
          <p className="text-muted-foreground">Manage vendor payout requests</p>
        </div>
        <Button variant="outline">Export Requests</Button>
      </div>
      <PayoutRequestFilters />
      <PayoutRequestsTable />
    </div>
  )
}
