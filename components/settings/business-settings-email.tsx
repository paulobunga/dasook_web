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

const emailFormSchema = z.object({
  senderName: z.string().min(2, {
    message: "Sender name must be at least 2 characters.",
  }),
  senderEmail: z.string().email({
    message: "Please enter a valid email address.",
  }),
  smtpHost: z.string().min(1, {
    message: "SMTP host is required.",
  }),
  smtpPort: z.string().min(1, {
    message: "SMTP port is required.",
  }),
  smtpUsername: z.string().min(1, {
    message: "SMTP username is required.",
  }),
  smtpPassword: z.string().min(1, {
    message: "SMTP password is required.",
  }),
  smtpEncryption: z.string(),
  enableOrderConfirmation: z.boolean().default(true),
  orderConfirmationTemplate: z.string().min(10, {
    message: "Template must be at least 10 characters.",
  }),
  enableShippingNotification: z.boolean().default(true),
  shippingNotificationTemplate: z.string().min(10, {
    message: "Template must be at least 10 characters.",
  }),
  enableAbandonedCart: z.boolean().default(false),
  abandonedCartTemplate: z.string().optional(),
  abandonedCartDelay: z.string().optional(),
  emailFooter: z.string().min(10, {
    message: "Email footer must be at least 10 characters.",
  }),
})

type EmailFormValues = z.infer<typeof emailFormSchema>

const defaultValues: Partial<EmailFormValues> = {
  senderName: "E-Commerce Admin",
  senderEmail: "noreply@ecommerceadmin.com",
  smtpHost: "smtp.example.com",
  smtpPort: "587",
  smtpUsername: "smtp_user",
  smtpPassword: "••••••••••••",
  smtpEncryption: "tls",
  enableOrderConfirmation: true,
  orderConfirmationTemplate:
    "Thank you for your order! Your order #{{order_number}} has been received and is being processed.",
  enableShippingNotification: true,
  shippingNotificationTemplate: "Good news! Your order #{{order_number}} has been shipped and is on its way to you.",
  enableAbandonedCart: false,
  emailFooter:
    "© 2023 E-Commerce Admin. All rights reserved.\nYou are receiving this email because you made a purchase on our website.",
}

export function BusinessSettingsEmail() {
  const form = useForm<EmailFormValues>({
    resolver: zodResolver(emailFormSchema),
    defaultValues,
  })

  function onSubmit(data: EmailFormValues) {
    console.log("Email settings updated:", data)
    // In a real application, you would save this data to your backend
  }

  // Dummy variables for template placeholders
  const order_number = "12345"
  const customer_name = "John Doe"
  const tracking_number = "TRACK123"
  const cart_items = "Product A, Product B"

  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Settings</CardTitle>
        <CardDescription>Configure email notifications and templates for your store</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="templates">Email Templates</TabsTrigger>
                <TabsTrigger value="smtp">SMTP Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="senderName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sender Name</FormLabel>
                        <FormControl>
                          <Input placeholder="E-Commerce Admin" {...field} />
                        </FormControl>
                        <FormDescription>Name that appears in the "From" field of emails</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="senderEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sender Email</FormLabel>
                        <FormControl>
                          <Input placeholder="noreply@ecommerceadmin.com" {...field} />
                        </FormControl>
                        <FormDescription>Email address that appears in the "From" field</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="emailFooter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Footer</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Footer text to appear at the bottom of all emails"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>This text will appear at the bottom of all emails</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value="templates" className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="enableOrderConfirmation"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Order Confirmation Emails</FormLabel>
                        <FormDescription>Send an email when a customer places an order</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {form.watch("enableOrderConfirmation") && (
                  <FormField
                    control={form.control}
                    name="orderConfirmationTemplate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Order Confirmation Template</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter the template for order confirmation emails"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Use {{ order_number }}, {{ customer_name }}, and other placeholders
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="enableShippingNotification"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Shipping Notification Emails</FormLabel>
                        <FormDescription>Send an email when an order ships</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {form.watch("enableShippingNotification") && (
                  <FormField
                    control={form.control}
                    name="shippingNotificationTemplate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Shipping Notification Template</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter the template for shipping notification emails"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Use {{ order_number }}, {{ tracking_number }}, and other placeholders
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="enableAbandonedCart"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Abandoned Cart Emails</FormLabel>
                        <FormDescription>Send an email when a customer abandons their cart</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {form.watch("enableAbandonedCart") && (
                  <>
                    <FormField
                      control={form.control}
                      name="abandonedCartTemplate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Abandoned Cart Template</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter the template for abandoned cart emails"
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Use {{ customer_name }}, {{ cart_items }}, and other placeholders
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="abandonedCartDelay"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Abandoned Cart Delay (hours)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="24" {...field} />
                          </FormControl>
                          <FormDescription>How long to wait before sending abandoned cart emails</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
              </TabsContent>

              <TabsContent value="smtp" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="smtpHost"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SMTP Host</FormLabel>
                        <FormControl>
                          <Input placeholder="smtp.example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="smtpPort"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SMTP Port</FormLabel>
                        <FormControl>
                          <Input placeholder="587" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="smtpUsername"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SMTP Username</FormLabel>
                        <FormControl>
                          <Input placeholder="username" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="smtpPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SMTP Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="smtpEncryption"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Encryption Method</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select encryption method" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="ssl">SSL</SelectItem>
                          <SelectItem value="tls">TLS</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>The encryption method used by your SMTP server</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-4">
                  <Button type="button" variant="outline" className="mr-2">
                    Test Connection
                  </Button>
                  <Button type="button" variant="outline">
                    Send Test Email
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              Save Email Settings
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
