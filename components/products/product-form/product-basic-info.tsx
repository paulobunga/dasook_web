"use client"

import type { UseFormReturn } from "react-hook-form"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Command, CommandList, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Check, ChevronsUpDown, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProductBasicInfoProps {
  form: UseFormReturn<any>
  categories: any[]
  brands: any[]
}

export function ProductBasicInfo({ form, categories, brands }: ProductBasicInfoProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter product name" {...field} />
              </FormControl>
              <FormDescription>The name of your product as it will appear to customers.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="brand"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brand</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a brand" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="no-brand">No brand</SelectItem>
                  {brands.map((brand) => (
                    <SelectItem key={brand.id} value={brand.id}>
                      {brand.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>The manufacturer or brand of the product.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="shortDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Short Description</FormLabel>
            <FormControl>
              <Textarea placeholder="Enter a brief description" {...field} rows={2} />
            </FormControl>
            <FormDescription>A brief summary of the product (1-2 sentences).</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full Description</FormLabel>
            <FormControl>
              <Textarea placeholder="Enter detailed product description" {...field} rows={5} />
            </FormControl>
            <FormDescription>Detailed description of the product including features and benefits.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="categories"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Categories</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <div className="relative flex min-h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                    <div className="flex flex-wrap gap-1">
                      {field.value.length > 0 ? (
                        field.value.map((categoryId: string) => {
                          const categoryData = categories.find((c) => c.id === categoryId)
                          return (
                            <Badge key={categoryId} variant="secondary" className="mr-1">
                              {categoryData?.name || categoryId}
                              <button
                                type="button"
                                className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  const newValue = field.value.filter((v: string) => v !== categoryId)
                                  field.onChange(newValue)
                                }}
                              >
                                <X className="h-3 w-3" />
                                <span className="sr-only">Remove {categoryData?.name || categoryId}</span>
                              </button>
                            </Badge>
                          )
                        })
                      ) : (
                        <span className="text-muted-foreground">Select categories</span>
                      )}
                    </div>
                    <ChevronsUpDown className="h-4 w-4 opacity-50" />
                  </div>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <Command>
                  <CommandInput placeholder="Search categories..." />
                  <CommandList>
                    <CommandEmpty>No category found.</CommandEmpty>
                    <CommandGroup className="max-h-64 overflow-auto">
                      {categories.map((category) => (
                        <CommandItem
                          key={category.id}
                          value={category.name}
                          onSelect={() => {
                            const current = new Set(field.value)
                            if (current.has(category.id)) {
                              current.delete(category.id)
                            } else {
                              current.add(category.id)
                            }
                            field.onChange(Array.from(current))
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              field.value.includes(category.id) ? "opacity-100" : "opacity-0",
                            )}
                          />
                          {category.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <FormDescription>Select one or more categories for this product.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>The current status of this product.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="featured"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Featured Product</FormLabel>
                <FormDescription>Featured products appear in special sections of your store.</FormDescription>
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
