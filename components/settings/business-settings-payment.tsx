"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function BusinessSettingsPayment() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Payment settings updated",
        description: "Your payment settings have been updated successfully.",
      })
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Payment Settings</CardTitle>
          <CardDescription>Configure payment methods and commission settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Commission Settings</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="commission-type">Commission Type</Label>
                <Select defaultValue="percentage">
                  <SelectTrigger id="commission-type">
                    <SelectValue placeholder="Select commission type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage</SelectItem>
                    <SelectItem value="fixed">Fixed Amount</SelectItem>
                    <SelectItem value="combined">Combined</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="commission-rate">Commission Rate (%)</Label>
                <Input id="commission-rate" type="number" defaultValue="10" min="0" max="100" />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="min-withdrawal">Minimum Withdrawal Amount</Label>
                <Input id="min-withdrawal" type="number" defaultValue="50" min="0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="payout-schedule">Payout Schedule</Label>
                <Select defaultValue="monthly">
                  <SelectTrigger id="payout-schedule">
                    <SelectValue placeholder="Select payout schedule" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="biweekly">Bi-weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="manual">Manual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Payment Gateways</h3>
            <Tabs defaultValue="stripe">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="stripe">Stripe</TabsTrigger>
                <TabsTrigger value="paypal">PayPal</TabsTrigger>
                <TabsTrigger value="bank">Bank Transfer</TabsTrigger>
              </TabsList>
              <TabsContent value="stripe" className="space-y-4 pt-4">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="stripe-enabled" className="flex flex-col space-y-1">
                    <span>Enable Stripe</span>
                    <span className="font-normal text-sm text-muted-foreground">Accept payments via Stripe</span>
                  </Label>
                  <Switch id="stripe-enabled" defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stripe-public-key">Stripe Public Key</Label>
                  <Input id="stripe-public-key" defaultValue="pk_test_..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stripe-secret-key">Stripe Secret Key</Label>
                  <Input id="stripe-secret-key" type="password" defaultValue="sk_test_..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stripe-webhook-secret">Webhook Secret</Label>
                  <Input id="stripe-webhook-secret" type="password" defaultValue="whsec_..." />
                </div>
              </TabsContent>
              <TabsContent value="paypal" className="space-y-4 pt-4">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="paypal-enabled" className="flex flex-col space-y-1">
                    <span>Enable PayPal</span>
                    <span className="font-normal text-sm text-muted-foreground">Accept payments via PayPal</span>
                  </Label>
                  <Switch id="paypal-enabled" defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paypal"></Label>
                </div>
              </TabsContent>
              <TabsContent value="bank" className="space-y-4 pt-4">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="bank-enabled" className="flex flex-col space-y-1">
                    <span>Enable Bank Transfer</span>
                    <span className="font-normal text-sm text-muted-foreground">Accept payments via Bank Transfer</span>
                  </Label>
                  <Switch id="bank-enabled" defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bank-name">Bank Name</Label>
                  <Input id="bank-name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bank-account-number">Account Number</Label>
                  <Input id="bank-account-number" type="number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bank-swift-code">Swift Code</Label>
                  <Input id="bank-swift-code" />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                  <path
                    d="M12 2V4M12 20V22M4.92893 4.92893L6.34315 6.34315M17.6569 17.6569L19.0711 19.0711M2 12H4M20 12H22M4.92893 19.0711L6.34315 17.6569M17.6569 6.34315L19.0711 4.92893"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
                Updating...
              </>
            ) : (
              "Update Settings"
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
