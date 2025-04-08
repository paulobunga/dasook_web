"use client"

import { ArrowUpRight, ArrowDownRight, UserPlus, Store } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function AnalyticsMetrics() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">Key Performance Metrics</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">$87.42</div>
              <div className="flex items-center text-xs text-emerald-500">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +5.2%
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Compared to $83.10 last period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Cart Abandonment Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">68.7%</div>
              <div className="flex items-center text-xs text-destructive">
                <ArrowDownRight className="h-3 w-3 mr-1" />
                -2.1%
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Improved from 70.8% last period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Customer Lifetime Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">$328.14</div>
              <div className="flex items-center text-xs text-emerald-500">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +12.3%
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Compared to $292.20 last period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Fulfillment Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">1.8 days</div>
              <div className="flex items-center text-xs text-emerald-500">
                <ArrowDownRight className="h-3 w-3 mr-1" />
                -0.3 days
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Improved from 2.1 days last period</p>
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1">
                <span>Target: 1.5 days</span>
                <span>83% achieved</span>
              </div>
              <Progress value={83} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Return Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">4.2%</div>
              <div className="flex items-center text-xs text-emerald-500">
                <ArrowDownRight className="h-3 w-3 mr-1" />
                -0.8%
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Improved from 5.0% last period</p>
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1">
                <span>Target: &lt; 5%</span>
                <span>100% achieved</span>
              </div>
              <Progress value={100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Vendor Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">4.6/5.0</div>
              <div className="flex items-center text-xs text-emerald-500">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +0.2
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Improved from 4.4/5.0 last period</p>
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1">
                <span>Target: 4.8/5.0</span>
                <span>92% achieved</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Customer Acquisition</CardTitle>
            <CardDescription>New customer sources and conversion rates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="mr-4">
                  <UserPlus className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Organic Search</p>
                  <div className="flex items-center text-xs">
                    <span className="font-medium">542 customers</span>
                    <span className="mx-2 text-muted-foreground">•</span>
                    <span className="text-emerald-500 flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      12.4%
                    </span>
                  </div>
                </div>
                <div className="ml-auto text-sm font-medium">36.5%</div>
              </div>

              <div className="flex items-center">
                <div className="mr-4">
                  <UserPlus className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Social Media</p>
                  <div className="flex items-center text-xs">
                    <span className="font-medium">387 customers</span>
                    <span className="mx-2 text-muted-foreground">•</span>
                    <span className="text-emerald-500 flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      18.7%
                    </span>
                  </div>
                </div>
                <div className="ml-auto text-sm font-medium">26.1%</div>
              </div>

              <div className="flex items-center">
                <div className="mr-4">
                  <UserPlus className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Referrals</p>
                  <div className="flex items-center text-xs">
                    <span className="font-medium">298 customers</span>
                    <span className="mx-2 text-muted-foreground">•</span>
                    <span className="text-emerald-500 flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      8.3%
                    </span>
                  </div>
                </div>
                <div className="ml-auto text-sm font-medium">20.1%</div>
              </div>

              <div className="flex items-center">
                <div className="mr-4">
                  <UserPlus className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Paid Advertising</p>
                  <div className="flex items-center text-xs">
                    <span className="font-medium">255 customers</span>
                    <span className="mx-2 text-muted-foreground">•</span>
                    <span className="text-destructive flex items-center">
                      <ArrowDownRight className="h-3 w-3 mr-1" />
                      3.2%
                    </span>
                  </div>
                </div>
                <div className="ml-auto text-sm font-medium">17.3%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vendor Performance</CardTitle>
            <CardDescription>Top performing vendors by revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="mr-4">
                  <Store className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Tech Gadgets Store</p>
                  <div className="flex items-center text-xs">
                    <span className="font-medium">$12,845 revenue</span>
                    <span className="mx-2 text-muted-foreground">•</span>
                    <span className="text-emerald-500 flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      15.2%
                    </span>
                  </div>
                </div>
                <div className="ml-auto text-sm font-medium">124 products</div>
              </div>

              <div className="flex items-center">
                <div className="mr-4">
                  <Store className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Fashion Trends</p>
                  <div className="flex items-center text-xs">
                    <span className="font-medium">$9,372 revenue</span>
                    <span className="mx-2 text-muted-foreground">•</span>
                    <span className="text-emerald-500 flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      8.7%
                    </span>
                  </div>
                </div>
                <div className="ml-auto text-sm font-medium">57 products</div>
              </div>

              <div className="flex items-center">
                <div className="mr-4">
                  <Store className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Home Essentials</p>
                  <div className="flex items-center text-xs">
                    <span className="font-medium">$7,845 revenue</span>
                    <span className="mx-2 text-muted-foreground">•</span>
                    <span className="text-emerald-500 flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      12.1%
                    </span>
                  </div>
                </div>
                <div className="ml-auto text-sm font-medium">89 products</div>
              </div>

              <div className="flex items-center">
                <div className="mr-4">
                  <Store className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Outdoor Adventures</p>
                  <div className="flex items-center text-xs">
                    <span className="font-medium">$5,234 revenue</span>
                    <span className="mx-2 text-muted-foreground">•</span>
                    <span className="text-destructive flex items-center">
                      <ArrowDownRight className="h-3 w-3 mr-1" />
                      2.8%
                    </span>
                  </div>
                </div>
                <div className="ml-auto text-sm font-medium">32 products</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
