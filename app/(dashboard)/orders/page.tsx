import { Button } from "@/components/ui/button"
import { OrdersTable } from "@/components/orders/orders-table"
import { OrderFilters } from "@/components/orders/order-filters"

export default function OrdersPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">Manage your marketplace orders</p>
        </div>
        <Button variant="outline">Export Orders</Button>
      </div>
      <OrderFilters />
      <OrdersTable />
    </div>
  )
}
