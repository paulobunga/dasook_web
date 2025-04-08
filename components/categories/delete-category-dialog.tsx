"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { deleteCategory } from "@/app/actions/category-actions"
import { useToast } from "@/components/ui/use-toast"
import type { Category } from "@/lib/types/category"

interface DeleteCategoryDialogProps {
  category: Category
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DeleteCategoryDialog({ category, open, onOpenChange }: DeleteCategoryDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const { toast } = useToast()

  async function handleDelete() {
    setIsDeleting(true)
    try {
      const result = await deleteCategory(category.id)

      if (result.success) {
        toast({
          title: "Category deleted",
          description: `Category ${category.name} has been deleted successfully.`,
        })
        onOpenChange(false)
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to delete category",
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
      setIsDeleting(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the category "{category.name}" and cannot be undone.
            {category.products_count > 0 && (
              <span className="block mt-2 font-medium text-destructive">
                Warning: This category contains {category.products_count} products. Deleting it may affect these
                products.
              </span>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault()
              handleDelete()
            }}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
