"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AbandonedCartEmailSettings() {
  const [enabled, setEnabled] = useState(true)
  const [delay, setDelay] = useState("60")
  const [sendSecondEmail, setSendSecondEmail] = useState(true)
  const [secondDelay, setSecondDelay] = useState("24")
  const [sendThirdEmail, setSendThirdEmail] = useState(false)
  const [thirdDelay, setThirdDelay] = useState("48")

  // Mock cart data for demonstration purposes
  const cart = {
    items: "Item 1, Item 2",
    total: 100,
    discounted_total: 90,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <h2 className="text-lg font-medium">Abandoned Cart Recovery</h2>
          <p className="text-sm text-muted-foreground">
            Configure automated emails to recover abandoned shopping carts
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="enable-recovery" checked={enabled} onCheckedChange={setEnabled} />
          <Label htmlFor="enable-recovery">Enable Recovery Emails</Label>
        </div>
      </div>

      <Tabs defaultValue="first" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="first">First Email</TabsTrigger>
          <TabsTrigger value="second">Second Email</TabsTrigger>
          <TabsTrigger value="third">Third Email</TabsTrigger>
        </TabsList>

        <TabsContent value="first">
          <Card>
            <CardHeader>
              <CardTitle>First Recovery Email</CardTitle>
              <CardDescription>This email will be sent after the cart is abandoned</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="delay" className="text-right">
                  Send After
                </Label>
                <div className="col-span-3 flex items-center gap-2">
                  <Input
                    id="delay"
                    type="number"
                    value={delay}
                    onChange={(e) => setDelay(e.target.value)}
                    className="w-20"
                  />
                  <span>minutes of inactivity</span>
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="subject" className="text-right">
                  Email Subject
                </Label>
                <Input id="subject" defaultValue="Did you forget something in your cart?" className="col-span-3" />
              </div>

              <div className="grid grid-cols-4 gap-4">
                <Label htmlFor="template" className="text-right pt-2">
                  Email Template
                </Label>
                <div className="col-span-3 space-y-2">
                  <Select defaultValue="template1">
                    <SelectTrigger>
                      <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="template1">Basic Reminder</SelectItem>
                      <SelectItem value="template2">With Discount</SelectItem>
                      <SelectItem value="template3">Personalized</SelectItem>
                      <SelectItem value="custom">Custom Template</SelectItem>
                    </SelectContent>
                  </Select>

                  <Textarea
                    id="template"
                    placeholder="Email content..."
                    className="min-h-[200px]"
                    defaultValue={`Hi {{customer.name}},

We noticed you left some items in your shopping cart. 

Your cart is saved and you can complete your purchase anytime.

${cart.items}

Total: $${cart.total}

[Complete Your Purchase]

Thank you,
The Store Team`}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <Button variant="outline">Preview Email</Button>
              <Button>Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="second">
          <Card>
            <CardHeader>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle>Second Recovery Email</CardTitle>
                  <CardDescription>Follow-up email for persistent cart abandonment</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="enable-second" checked={sendSecondEmail} onCheckedChange={setSendSecondEmail} />
                  <Label htmlFor="enable-second">Enable</Label>
                </div>
              </CardHeader>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="second-delay" className="text-right">
                  Send After
                </Label>
                <div className="col-span-3 flex items-center gap-2">
                  <Input
                    id="second-delay"
                    type="number"
                    value={secondDelay}
                    onChange={(e) => setSecondDelay(e.target.value)}
                    className="w-20"
                    disabled={!sendSecondEmail}
                  />
                  <span>hours after first email</span>
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="second-subject" className="text-right">
                  Email Subject
                </Label>
                <Input
                  id="second-subject"
                  defaultValue="Still thinking about your cart? Here's 10% off!"
                  className="col-span-3"
                  disabled={!sendSecondEmail}
                />
              </div>

              <div className="grid grid-cols-4 gap-4">
                <Label htmlFor="second-template" className="text-right pt-2">
                  Email Template
                </Label>
                <div className="col-span-3 space-y-2">
                  <Select defaultValue="template2" disabled={!sendSecondEmail}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="template1">Basic Reminder</SelectItem>
                      <SelectItem value="template2">With Discount</SelectItem>
                      <SelectItem value="template3">Personalized</SelectItem>
                      <SelectItem value="custom">Custom Template</SelectItem>
                    </SelectContent>
                  </Select>

                  <Textarea
                    id="second-template"
                    placeholder="Email content..."
                    className="min-h-[200px]"
                    defaultValue={`Hi {{customer.name}},

We noticed you still haven't completed your purchase.

To make it easier, we're offering you a 10% discount on your order!

Use code: COMEBACK10

${cart.items}

Total: $${cart.total}
With discount: $${cart.discounted_total}

[Complete Your Purchase]

Thank you,
The Store Team`}
                    disabled={!sendSecondEmail}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <Button variant="outline" disabled={!sendSecondEmail}>
                Preview Email
              </Button>
              <Button disabled={!sendSecondEmail}>Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="third">
          <Card>
            <CardHeader>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle>Third Recovery Email</CardTitle>
                  <CardDescription>Final attempt to recover the abandoned cart</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="enable-third" checked={sendThirdEmail} onCheckedChange={setSendThirdEmail} />
                  <Label htmlFor="enable-third">Enable</Label>
                </div>
              </CardHeader>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="third-delay" className="text-right">
                  Send After
                </Label>
                <div className="col-span-3 flex items-center gap-2">
                  <Input
                    id="third-delay"
                    type="number"
                    value={thirdDelay}
                    onChange={(e) => setThirdDelay(e.target.value)}
                    className="w-20"
                    disabled={!sendThirdEmail}
                  />
                  <span>hours after second email</span>
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="third-subject" className="text-right">
                  Email Subject
                </Label>
                <Input
                  id="third-subject"
                  defaultValue="Last chance: Your cart is about to expire"
                  className="col-span-3"
                  disabled={!sendThirdEmail}
                />
              </div>

              <div className="grid grid-cols-4 gap-4">
                <Label htmlFor="third-template" className="text-right pt-2">
                  Email Template
                </Label>
                <div className="col-span-3 space-y-2">
                  <Select defaultValue="template3" disabled={!sendThirdEmail}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="template1">Basic Reminder</SelectItem>
                      <SelectItem value="template2">With Discount</SelectItem>
                      <SelectItem value="template3">Personalized</SelectItem>
                      <SelectItem value="custom">Custom Template</SelectItem>
                    </SelectContent>
                  </Select>

                  <Textarea
                    id="third-template"
                    placeholder="Email content..."
                    className="min-h-[200px]"
                    defaultValue={`Hi {{customer.name}},

This is your last chance to complete your purchase before your cart expires.

We're offering you a 15% discount on your order!

Use code: LASTCHANCE15

${cart.items}

Total: $${cart.total}
With discount: $${cart.discounted_total}

[Complete Your Purchase]

Thank you,
The Store Team`}
                    disabled={!sendThirdEmail}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <Button variant="outline" disabled={!sendThirdEmail}>
                Preview Email
              </Button>
              <Button disabled={!sendThirdEmail}>Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
