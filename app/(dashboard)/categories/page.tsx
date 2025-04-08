import { Suspense } from "react"
import { CategoriesTable } from "@/components/categories/categories-table"
import { CategoryFilters } from "@/components/categories/category-filters"
import { CategoryOperations } from "@/components/categories/category-operations"
import { Skeleton } from "@/components/ui/skeleton"

export default function CategoriesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">Manage your product categories and subcategories</p>
        </div>
        <CategoryOperations />
      </div>
      <CategoryFilters />
      <Suspense fallback={<CategoriesTableSkeleton />}>
        <CategoriesTable />
      </Suspense>
    </div>
  )
}

function CategoriesTableSkeleton() {
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
