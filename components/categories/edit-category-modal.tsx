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
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CategoryImageUpload } from "./category-image-upload"
import { updateCategory } from "@/app/actions/category-actions"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import type { Category, CategoryFormValues } from "@/lib/types/category"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Category name must be at least 2 characters.",
  }),
  slug: z.string().min(2, {
    message: "Slug must be at least 2 characters.",
  }),
  description: z.string().optional().nullable(),
  parent_id: z.string().optional().nullable(),
  is_active: z.boolean().default(true),
  image: z.instanceof(File).optional().nullable(),
})

interface EditCategoryModalProps {
  category: Category
  parentCategories: { id: string; name: string }[]
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditCategoryModal({ category, parentCategories, open, onOpenChange }: EditCategoryModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: category.name,
      slug: category.slug,
      description: category.description,
      parent_id: category.parent_id,
      is_active: category.is_active,
      image: null,
    },
  })

  // Update form when category changes
  useEffect(() => {
    form.reset({
      name: category.name,
      slug: category.slug,
      description: category.description,
      parent_id: category.parent_id,
      is_active: category.is_active,
      image: null,
    })
  }, [category, form])

  async function onSubmit(values: CategoryFormValues) {
    setIsSubmitting(true)
    try {
      const result = await updateCategory(category.id, values)

      if (result.success) {
        toast({
          title: "Category updated",
          description: `Category ${values.name} has been updated successfully.`,
        })
        onOpenChange(false)
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to update category",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Filter out the current category from parent options to prevent circular references
  const filteredParentCategories = parentCategories.filter((parent) => parent.id !== category.id)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>Update the details for this category.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Electronics" {...field} />
                  </FormControl>
                  <FormDescription>This is the name that will be displayed to customers.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., electronics" {...field} />
                  </FormControl>
                  <FormDescription>The URL-friendly version of the name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe this category..." {...field} value={field.value || ""} />
                  </FormControl>
                  <FormDescription>A brief description of the category.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="parent_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parent Category</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value || ""}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a parent category (optional)" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="">None (Top Level)</SelectItem>
                      {filteredParentCategories.map((parent) => (
                        <SelectItem key={parent.id} value={parent.id}>
                          {parent.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>Select a parent category if this is a subcategory.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <CategoryImageUpload
                    initialImage={category.image_url}
                    onImageChange={(file) => field.onChange(file)}
                  />
                  <FormDescription>Leave empty to keep the current image.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="is_active"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Active Status</FormLabel>
                    <FormDescription>Make this category visible to customers</FormDescription>
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
