"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const shippingFormSchema = z.object({
  enableShipping: z.boolean().default(true),
  defaultShippingMethod: z.string(),
  freeShippingThreshold: z.string(),
  flatRateShipping: z.string(),
  shippingOriginAddress: z.string(),
  shippingOriginCity: z.string(),
  shippingOriginState: z.string(),
  shippingOriginZip: z.string(),
  shippingOriginCountry: z.string(),
  shippingCalculationMethod: z.string(),
  shippingPolicyText: z.string().min(10, {
    message: "Shipping policy must be at least 10 characters.",
  }),
  enableLocalPickup: z.boolean().default(false),
  localPickupAddress: z.string().optional(),
  localPickupInstructions: z.string().optional(),
})

type ShippingFormValues = z.infer<typeof shippingFormSchema>

const defaultValues: Partial<ShippingFormValues> = {
  enableShipping: true,
  defaultShippingMethod: "flat_rate",
  freeShippingThreshold: "100",
  flatRateShipping: "5.99",
  shippingOriginAddress: "123 Commerce St",
  shippingOriginCity: "Ecommerce City",
  shippingOriginState: "EC",
  shippingOriginZip: "12345",
  shippingOriginCountry: "United States",
  shippingCalculationMethod: "weight_based",
  shippingPolicyText:
    "Standard shipping takes 3-5 business days. Express shipping is available for an additional fee and takes 1-2 business days.",
  enableLocalPickup: false,
}

export function BusinessSettingsShipping() {
  const form = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingFormSchema),
    defaultValues,
  })

  function onSubmit(data: ShippingFormValues) {
    console.log("Shipping settings updated:", data)
    // In a real application, you would save this data to your backend
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Settings</CardTitle>
        <CardDescription>Configure how shipping is calculated and displayed to customers</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="methods">Shipping Methods</TabsTrigger>
                <TabsTrigger value="pickup">Local Pickup</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="enableShipping"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Enable Shipping</FormLabel>
                        <FormDescription>Allow customers to have products shipped to them</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="shippingOriginAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Shipping Origin Address</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Commerce St" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="shippingOriginCity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="Ecommerce City" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="shippingOriginState"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State/Province</FormLabel>
                        <FormControl>
                          <Input placeholder="EC" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="shippingOriginZip"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ZIP/Postal Code</FormLabel>
                        <FormControl>
                          <Input placeholder="12345" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="shippingOriginCountry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="United States">United States</SelectItem>
                            <SelectItem value="Canada">Canada</SelectItem>
                            <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                            <SelectItem value="Australia">Australia</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="shippingPolicyText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Shipping Policy</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your shipping policy here..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>This will be displayed to customers during checkout</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value="methods" className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="defaultShippingMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Default Shipping Method</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a shipping method" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="flat_rate">Flat Rate</SelectItem>
                          <SelectItem value="free_shipping">Free Shipping</SelectItem>
                          <SelectItem value="weight_based">Weight Based</SelectItem>
                          <SelectItem value="distance_based">Distance Based</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>This will be the default method selected at checkout</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="shippingCalculationMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Shipping Calculation Method</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select calculation method" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="weight_based">Weight Based</SelectItem>
                          <SelectItem value="price_based">Price Based</SelectItem>
                          <SelectItem value="item_based">Item Based</SelectItem>
                          <SelectItem value="distance_based">Distance Based</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>How shipping costs are calculated</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="flatRateShipping"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Flat Rate Shipping ($)</FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="5.99" {...field} />
                        </FormControl>
                        <FormDescription>Amount to charge for flat rate shipping</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="freeShippingThreshold"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Free Shipping Threshold ($)</FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="100" {...field} />
                        </FormControl>
                        <FormDescription>Order amount to qualify for free shipping</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              <TabsContent value="pickup" className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="enableLocalPickup"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Enable Local Pickup</FormLabel>
                        <FormDescription>Allow customers to pick up orders from your location</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {form.watch("enableLocalPickup") && (
                  <>
                    <FormField
                      control={form.control}
                      name="localPickupAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pickup Location Address</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter the full address where customers can pick up their orders"
                              className="min-h-[80px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="localPickupInstructions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pickup Instructions</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Provide instructions for customers picking up orders (e.g., business hours, where to park, etc.)"
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
              </TabsContent>
            </Tabs>

            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              Save Shipping Settings
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
