import type { Metadata } from "next"
import { ProductForm } from "@/components/products/product-form"

export const metadata: Metadata = {
  title: "Add New Product",
  description: "Add a new product to your marketplace",
}

export default function NewProductPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add New Product</h1>
        <p className="text-muted-foreground">Create a new product for your marketplace</p>
      </div>
      <ProductForm />
    </div>
  )
}
