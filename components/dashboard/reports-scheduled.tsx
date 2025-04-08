import { Calendar, Clock, Download, FileBarChart, FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function ReportsScheduled() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Scheduled Reports</CardTitle>
        <CardDescription>Upcoming and recently generated reports</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-5">
          <div className="flex items-start">
            <div className="mr-4 mt-1">
              <FileBarChart className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Monthly Sales Summary</h3>
                <Badge variant="outline">Scheduled</Badge>
              </div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <Calendar className="h-3 w-3 mr-1" />
                <span>Generates on 01/10/2023</span>
              </div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <Clock className="h-3 w-3 mr-1" />
                <span>Sent to 3 recipients</span>
              </div>
            </div>
          </div>

          <div className="flex items-start">
            <div className="mr-4 mt-1">
              <FileText className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Weekly Inventory Report</h3>
                <Badge variant="secondary">Generated</Badge>
              </div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <Calendar className="h-3 w-3 mr-1" />
                <span>Generated on 09/25/2023</span>
              </div>
              <div className="flex justify-end mt-2">
                <Button variant="outline" size="sm" className="h-7 px-2">
                  <Download className="h-3 w-3 mr-1" />
                  Download
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-start">
            <div className="mr-4 mt-1">
              <FileBarChart className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Vendor Performance Q3</h3>
                <Badge variant="secondary">Generated</Badge>
              </div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <Calendar className="h-3 w-3 mr-1" />
                <span>Generated on 09/20/2023</span>
              </div>
              <div className="flex justify-end mt-2">
                <Button variant="outline" size="sm" className="h-7 px-2">
                  <Download className="h-3 w-3 mr-1" />
                  Download
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-start">
            <div className="mr-4 mt-1">
              <FileText className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Customer Acquisition Report</h3>
                <Badge variant="secondary">Generated</Badge>
              </div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <Calendar className="h-3 w-3 mr-1" />
                <span>Generated on 09/15/2023</span>
              </div>
              <div className="flex justify-end mt-2">
                <Button variant="outline" size="sm" className="h-7 px-2">
                  <Download className="h-3 w-3 mr-1" />
                  Download
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
