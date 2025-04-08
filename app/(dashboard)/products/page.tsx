import Link from "next/link"
import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ProductsTable } from "@/components/products/products-table"
import { ProductFilters } from "@/components/products/product-filters"

export default function ProductsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">Manage your marketplace products</p>
        </div>
        <Button asChild>
          <Link href="/products/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>
      <ProductFilters />
      <ProductsTable />
    </div>
  )
}
