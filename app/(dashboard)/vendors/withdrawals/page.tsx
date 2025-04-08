import { Button } from "@/components/ui/button"
import { WithdrawalsTable } from "@/components/vendors/withdrawals-table"
import { WithdrawalFilters } from "@/components/vendors/withdrawal-filters"

export default function WithdrawalsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Withdrawals</h1>
          <p className="text-muted-foreground">Track vendor withdrawal transactions</p>
        </div>
        <Button variant="outline">Export Withdrawals</Button>
      </div>
      <WithdrawalFilters />
      <WithdrawalsTable />
    </div>
  )
}
