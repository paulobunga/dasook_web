import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BusinessSettingsGeneral } from "@/components/settings/business-settings-general"
import { BusinessSettingsPayment } from "@/components/settings/business-settings-payment"
import { BusinessSettingsShipping } from "@/components/settings/business-settings-shipping"
import { BusinessSettingsEmail } from "@/components/settings/business-settings-email"

export default function BusinessSettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Business Settings</h1>
        <p className="text-muted-foreground">Manage your marketplace settings and configurations</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <BusinessSettingsGeneral />
        </TabsContent>
        <TabsContent value="payment">
          <BusinessSettingsPayment />
        </TabsContent>
        <TabsContent value="shipping">
          <BusinessSettingsShipping />
        </TabsContent>
        <TabsContent value="email">
          <BusinessSettingsEmail />
        </TabsContent>
      </Tabs>
    </div>
  )
}
