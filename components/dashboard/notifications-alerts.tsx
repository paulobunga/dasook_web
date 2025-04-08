import { AlertTriangle, CheckCircle, Clock, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export function NotificationsAlerts() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>System Alerts</CardTitle>
        <CardDescription>Important alerts requiring your attention</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-5">
          <div className="rounded-lg border p-4">
            <div className="flex items-start">
              <div className="mr-4">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium">Inventory Alert</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  8 products are out of stock and 15 are running low on inventory.
                </p>
                <div className="flex justify-end mt-2">
                  <Button variant="outline" size="sm">
                    View Inventory
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <div className="flex items-start">
              <div className="mr-4">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium">Pending Vendor Approvals</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  3 vendor applications are awaiting your review and approval.
                </p>
                <div className="flex justify-end mt-2">
                  <Button variant="outline" size="sm">
                    Review Applications
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <div className="flex items-start">
              <div className="mr-4">
                <Info className="h-5 w-5 text-sky-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium">System Update Available</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  A new system update (v2.4.0) is available with security improvements.
                </p>
                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Current version: v2.3.8</span>
                    <span>Update size: 24MB</span>
                  </div>
                  <Progress value={0} className="h-2" />
                </div>
                <div className="flex justify-end mt-2">
                  <Button variant="outline" size="sm">
                    Install Update
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <div className="flex items-start">
              <div className="mr-4">
                <CheckCircle className="h-5 w-5 text-emerald-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium">Backup Completed</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Daily database backup completed successfully at 03:00 AM.
                </p>
                <div className="flex items-center text-xs text-muted-foreground mt-2">
                  <span>Backup size: 1.2GB</span>
                  <span className="mx-2">•</span>
                  <span>Retention: 30 days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
