import { Button } from "@/components/ui/button"
import { TicketsTable } from "@/components/support/tickets-table"
import { TicketFilters } from "@/components/support/ticket-filters"

export default function SupportTicketsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Support Tickets</h1>
          <p className="text-muted-foreground">Manage customer support tickets</p>
        </div>
        <Button variant="outline">Export Tickets</Button>
      </div>
      <TicketFilters />
      <TicketsTable />
    </div>
  )
}
