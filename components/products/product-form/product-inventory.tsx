"use client"

import type { UseFormReturn } from "react-hook-form"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"

interface ProductInventoryProps {
  form: UseFormReturn<any>
}

export function ProductInventory({ form }: ProductInventoryProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <FormField
          control={form.control}
          name="sku"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SKU (Stock Keeping Unit)</FormLabel>
              <FormControl>
                <Input placeholder="Enter SKU" {...field} />
              </FormControl>
              <FormDescription>A unique identifier for your product.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="barcode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Barcode (ISBN, UPC, GTIN, etc.)</FormLabel>
              <FormControl>
                <Input placeholder="Enter barcode" {...field} />
              </FormControl>
              <FormDescription>The product barcode or other standard identifier.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <FormField
          control={form.control}
          name="stockQuantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock Quantity</FormLabel>
              <FormControl>
                <Input type="number" placeholder="0" {...field} />
              </FormControl>
              <FormDescription>The current quantity in stock.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lowStockThreshold"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Low Stock Threshold</FormLabel>
              <FormControl>
                <Input type="number" placeholder="5" {...field} />
              </FormControl>
              <FormDescription>You'll be notified when stock reaches this level.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <FormField
          control={form.control}
          name="trackInventory"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Track Inventory</FormLabel>
                <FormDescription>Enable stock management for this product.</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="allowBackorders"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Allow Backorders</FormLabel>
                <FormDescription>Allow customers to purchase products that are out of stock.</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}
