"use client"

import type { UseFormReturn } from "react-hook-form"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock tax classes
const taxClasses = [
  { value: "standard", label: "Standard Rate" },
  { value: "reduced", label: "Reduced Rate" },
  { value: "zero", label: "Zero Rate" },
  { value: "exempt", label: "Tax Exempt" },
]

interface ProductPricingProps {
  form: UseFormReturn<any>
}

export function ProductPricing({ form }: ProductPricingProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <FormField
          control={form.control}
          name="regularPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Regular Price</FormLabel>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <FormControl>
                  <Input type="text" placeholder="0.00" className="pl-7" {...field} />
                </FormControl>
              </div>
              <FormDescription>The regular price of the product.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="salePrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sale Price (Optional)</FormLabel>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <FormControl>
                  <Input type="text" placeholder="0.00" className="pl-7" {...field} />
                </FormControl>
              </div>
              <FormDescription>Sale price will be displayed as the current price.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <FormField
          control={form.control}
          name="costPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cost Price (Optional)</FormLabel>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <FormControl>
                  <Input type="text" placeholder="0.00" className="pl-7" {...field} />
                </FormControl>
              </div>
              <FormDescription>Your cost for this product (not visible to customers).</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="taxClass"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tax Class</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select tax class" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {taxClasses.map((taxClass) => (
                    <SelectItem key={taxClass.value} value={taxClass.value}>
                      {taxClass.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>The tax class applied to this product.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}
