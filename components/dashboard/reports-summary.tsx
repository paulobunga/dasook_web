import { ArrowRight, FileBarChart, FileText, PieChart } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function ReportsSummary() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Available Reports</CardTitle>
        <CardDescription>Quick access to your marketplace reports</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="mr-4 mt-1">
              <FileBarChart className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-sm font-medium">Sales Report</h3>
              <p className="text-sm text-muted-foreground">
                Comprehensive analysis of sales performance, revenue trends, and top-selling products.
              </p>
              <Button asChild variant="link" className="px-0 py-0 h-auto mt-1">
                <Link href="/reports/sales">
                  View Report
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="flex items-start">
            <div className="mr-4 mt-1">
              <PieChart className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-sm font-medium">Product Performance</h3>
              <p className="text-sm text-muted-foreground">
                Detailed metrics on product views, conversions, and inventory turnover rates.
              </p>
              <Button asChild variant="link" className="px-0 py-0 h-auto mt-1">
                <Link href="/reports/products">
                  View Report
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="flex items-start">
            <div className="mr-4 mt-1">
              <FileText className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-sm font-medium">Order Analytics</h3>
              <p className="text-sm text-muted-foreground">
                Order processing times, fulfillment rates, and delivery performance metrics.
              </p>
              <Button asChild variant="link" className="px-0 py-0 h-auto mt-1">
                <Link href="/reports/orders">
                  View Report
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="flex items-start">
            <div className="mr-4 mt-1">
              <FileBarChart className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-sm font-medium">Vendor Performance</h3>
              <p className="text-sm text-muted-foreground">
                Vendor sales, customer satisfaction ratings, and commission earnings.
              </p>
              <Button asChild variant="link" className="px-0 py-0 h-auto mt-1">
                <Link href="/reports/vendors">
                  View Report
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <Link href="/reports">
            View All Reports
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
