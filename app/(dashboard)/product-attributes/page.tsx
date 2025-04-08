"use client"

import { useState } from "react"

import { Suspense } from "react"
import { ProductAttributesTable } from "@/components/product-attributes/product-attributes-table"
import { ProductAttributeFilters } from "@/components/product-attributes/product-attribute-filters"
import { CreateProductAttributeModal } from "@/components/product-attributes/create-product-attribute-modal"
import { getProductAttributes } from "@/app/actions/product-attribute-actions"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

export default async function ProductAttributesPage() {
  const attributes = await getProductAttributes()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Product Attributes</h1>
          <p className="text-muted-foreground">Manage product attributes and variations</p>
        </div>
        <ProductAttributeOperations />
      </div>
      <ProductAttributeFilters />
      <Suspense fallback={<ProductAttributesTableSkeleton />}>
        <ProductAttributesTable attributes={attributes} />
      </Suspense>
    </div>
  )
}

function ProductAttributeOperations() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsCreateModalOpen(true)}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Attribute
      </Button>
      <CreateProductAttributeModal open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen} />
    </>
  )
}

function ProductAttributesTableSkeleton() {
  return (
    <div className="rounded-md border">
      <div className="h-12 border-b px-6 py-3">
        <Skeleton className="h-6 w-full" />
      </div>
      <div className="p-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="mb-4 flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-md" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>
    </div>
  )
}
