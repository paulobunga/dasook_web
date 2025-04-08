"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import { updateProductAttribute } from "@/app/actions/product-attribute-actions"
import type { ProductAttribute } from "@/lib/types/product"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Attribute name must be at least 2 characters.",
  }),
  type: z.enum(["select", "text", "number"]),
  status: z.enum(["active", "inactive"]),
  values: z.array(z.string()).default([]),
})

interface EditProductAttributeModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  attribute: ProductAttribute | null
}

export function EditProductAttributeModal({ open, onOpenChange, attribute }: EditProductAttributeModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: attribute
      ? {
          name: attribute.name,
          type: attribute.type,
          status: attribute.status,
          values: attribute.values,
        }
      : {
          name: "",
          type: "select",
          status: "active",
          values: [],
        },
  })

  useEffect(() => {
    if (attribute) {
      form.reset({
        name: attribute.name,
        type: attribute.type,
        status: attribute.status,
        values: attribute.values,
      })
    }
  }, [attribute, form])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      if (!attribute) {
        throw new Error("Attribute not found")
      }

      await updateProductAttribute(attribute.id, {
        name: values.name,
        type: values.type,
        status: values.status,
        values: values.values,
      })

      toast({
        title: "Attribute updated",
        description: `Attribute ${values.name} has been updated successfully.`,
      })
      onOpenChange(false)
    } catch (error) {
      console.error("Error updating attribute:", error)
      toast({
        title: "Error",
        description: "Failed to update attribute. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Product Attribute</DialogTitle>
          <DialogDescription>Update the details for this product attribute.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Attribute Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Color" {...field} />
                  </FormControl>
                  <FormDescription>This is the name that will be displayed to customers.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Attribute Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="select">Select</SelectItem>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="number">Number</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>The type of attribute.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Active Status</FormLabel>
                    <FormDescription>Make this attribute available for products</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
