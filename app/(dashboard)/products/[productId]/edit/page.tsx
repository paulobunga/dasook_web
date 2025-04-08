import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ProductForm } from "@/components/products/product-form"

export const metadata: Metadata = {
  title: "Edit Product",
  description: "Edit product details",
}

interface EditProductPageProps {
  params: {
    productId: string
  }
}

export default function EditProductPage({ params }: EditProductPageProps) {
  const productId = params.productId

  // In a real application, you would fetch the product data here
  // For demo purposes, we'll assume the product exists
  const productExists = true

  if (!productExists) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Product</h1>
        <p className="text-muted-foreground">Update product information</p>
      </div>
      <ProductForm productId={productId} mode="edit" />
    </div>
  )
}
