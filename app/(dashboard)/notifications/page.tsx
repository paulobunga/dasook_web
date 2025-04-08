import { Button } from "@/components/ui/button"
import { NotificationsTable } from "@/components/notifications/notifications-table"
import { NotificationFilters } from "@/components/notifications/notification-filters"

export default function NotificationsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">Manage system and user notifications</p>
        </div>
        <Button variant="outline">Mark All as Read</Button>
      </div>
      <NotificationFilters />
      <NotificationsTable />
    </div>
  )
}
