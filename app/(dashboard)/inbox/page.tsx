import { Button } from "@/components/ui/button"
import { InboxMessages } from "@/components/inbox/inbox-messages"
import { InboxFilters } from "@/components/inbox/inbox-filters"

export default function InboxPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inbox</h1>
          <p className="text-muted-foreground">Manage customer and vendor messages</p>
        </div>
        <Button variant="outline">Mark All as Read</Button>
      </div>
      <InboxFilters />
      <InboxMessages />
    </div>
  )
}
