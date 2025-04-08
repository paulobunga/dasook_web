import { Button } from "@/components/ui/button"
import { CustomersTable } from "@/components/customers/customers-table"
import { CustomerFilters } from "@/components/customers/customer-filters"

export default function CustomersPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground">Manage your marketplace customers</p>
        </div>
        <Button variant="outline">Export Customers</Button>
      </div>
      <CustomerFilters />
      <CustomersTable />
    </div>
  )
}
