"use client"

import type { UseFormReturn } from "react-hook-form"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface ProductSeoProps {
  form: UseFormReturn<any>
}

export function ProductSeo({ form }: ProductSeoProps) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="slug"
        render={({ field }) => (
          <FormItem>
            <FormLabel>URL Slug</FormLabel>
            <FormControl>
              <Input placeholder="product-url-slug" {...field} />
            </FormControl>
            <FormDescription>The last part of the URL. Leave empty to auto-generate from product name.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="metaTitle"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Meta Title</FormLabel>
            <FormControl>
              <Input placeholder="Product meta title" {...field} />
            </FormControl>
            <FormDescription>
              The title that appears in search engine results. Leave empty to use product name.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="metaDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Meta Description</FormLabel>
            <FormControl>
              <Textarea placeholder="Brief description for search engines" {...field} rows={3} />
            </FormControl>
            <FormDescription>A short description that appears in search engine results.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="metaKeywords"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Meta Keywords</FormLabel>
            <FormControl>
              <Input placeholder="keyword1, keyword2, keyword3" {...field} />
            </FormControl>
            <FormDescription>Comma-separated keywords related to the product.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
