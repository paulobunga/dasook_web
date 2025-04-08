"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import type { Category } from "@/lib/types/category"

interface ViewCategoryModalProps {
  category: Category
  parentCategory?: Category | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ViewCategoryModal({ category, parentCategory, open, onOpenChange }: ViewCategoryModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Category Details</DialogTitle>
          <DialogDescription>Detailed information about this category.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <img
              src={category.image_url || "/placeholder.svg?height=64&width=64"}
              alt={category.name}
              className="h-16 w-16 rounded-md object-cover"
            />
            <div>
              <h3 className="text-lg font-medium">{category.name}</h3>
              <p className="text-sm text-muted-foreground">
                {category.is_active ? (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Active
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                    Inactive
                  </Badge>
                )}
              </p>
            </div>
          </div>

          <div className="space-y-1">
            <h4 className="text-sm font-medium">Description</h4>
            <p className="text-sm text-muted-foreground">{category.description || "No description provided."}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <h4 className="text-sm font-medium">Slug</h4>
              <p className="text-sm text-muted-foreground">{category.slug}</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-medium">Products</h4>
              <p className="text-sm text-muted-foreground">{category.products_count} products</p>
            </div>
          </div>

          {parentCategory && (
            <div className="space-y-1">
              <h4 className="text-sm font-medium">Parent Category</h4>
              <p className="text-sm text-muted-foreground">{parentCategory.name}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <h4 className="text-sm font-medium">Created</h4>
              <p className="text-sm text-muted-foreground">{new Date(category.created_at).toLocaleDateString()}</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-medium">Last Updated</h4>
              <p className="text-sm text-muted-foreground">{new Date(category.updated_at).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
