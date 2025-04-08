"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function BusinessSettingsGeneral() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Settings updated",
        description: "Your business settings have been updated successfully.",
      })
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>General Information</CardTitle>
          <CardDescription>Update your marketplace details and preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="store-name">Marketplace Name</Label>
                <Input id="store-name" defaultValue="Multi-Vendor Marketplace" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="store-url">Marketplace URL</Label>
                <Input id="store-url" defaultValue="https://example.com" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="store-description">Marketplace Description</Label>
              <Textarea
                id="store-description"
                defaultValue="A multi-vendor marketplace for various products and services."
                rows={4}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="admin-email">Admin Email</Label>
                <Input id="admin-email" type="email" defaultValue="admin@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="support-email">Support Email</Label>
                <Input id="support-email" type="email" defaultValue="support@example.com" />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="utc-8">
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc-12">UTC-12:00</SelectItem>
                    <SelectItem value="utc-11">UTC-11:00</SelectItem>
                    <SelectItem value="utc-10">UTC-10:00</SelectItem>
                    <SelectItem value="utc-9">UTC-09:00</SelectItem>
                    <SelectItem value="utc-8">UTC-08:00 (PST)</SelectItem>
                    <SelectItem value="utc-7">UTC-07:00 (MST)</SelectItem>
                    <SelectItem value="utc-6">UTC-06:00 (CST)</SelectItem>
                    <SelectItem value="utc-5">UTC-05:00 (EST)</SelectItem>
                    <SelectItem value="utc-4">UTC-04:00</SelectItem>
                    <SelectItem value="utc-3">UTC-03:00</SelectItem>
                    <SelectItem value="utc-2">UTC-02:00</SelectItem>
                    <SelectItem value="utc-1">UTC-01:00</SelectItem>
                    <SelectItem value="utc">UTC+00:00</SelectItem>
                    <SelectItem value="utc+1">UTC+01:00</SelectItem>
                    <SelectItem value="utc+2">UTC+02:00</SelectItem>
                    <SelectItem value="utc+3">UTC+03:00</SelectItem>
                    <SelectItem value="utc+4">UTC+04:00</SelectItem>
                    <SelectItem value="utc+5">UTC+05:00</SelectItem>
                    <SelectItem value="utc+5:30">UTC+05:30 (IST)</SelectItem>
                    <SelectItem value="utc+6">UTC+06:00</SelectItem>
                    <SelectItem value="utc+7">UTC+07:00</SelectItem>
                    <SelectItem value="utc+8">UTC+08:00</SelectItem>
                    <SelectItem value="utc+9">UTC+09:00</SelectItem>
                    <SelectItem value="utc+10">UTC+10:00</SelectItem>
                    <SelectItem value="utc+11">UTC+11:00</SelectItem>
                    <SelectItem value="utc+12">UTC+12:00</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Marketplace Settings</h3>
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="maintenance-mode" className="flex flex-col space-y-1">
                <span>Maintenance Mode</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Put your marketplace in maintenance mode
                </span>
              </Label>
              <Switch id="maintenance-mode" />
            </div>
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="vendor-registration" className="flex flex-col space-y-1">
                <span>Vendor Registration</span>
                <span className="font-normal text-sm text-muted-foreground">Allow new vendors to register</span>
              </Label>
              <Switch id="vendor-registration" defaultChecked />
            </div>
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="auto-approve-vendors" className="flex flex-col space-y-1">
                <span>Auto-approve Vendors</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Automatically approve new vendor registrations
                </span>
              </Label>
              <Switch id="auto-approve-vendors" />
            </div>
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="auto-approve-products" className="flex flex-col space-y-1">
                <span>Auto-approve Products</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Automatically approve new product listings
                </span>
              </Label>
              <Switch id="auto-approve-products" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline">Cancel</Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
