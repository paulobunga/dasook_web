import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ProductDetails } from "@/components/products/product-details"

export const metadata: Metadata = {
  title: "Product Details",
  description: "View and manage product details",
}

interface ProductPageProps {
  params: {
    productId: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  // In a real application, you would fetch the product data here
  // For demo purposes, we'll use mock data
  const productId = params.productId

  // This would be a server-side fetch in a real application
  const product = {
    id: productId,
    name: "Sample Product",
    // Other product details would be fetched here
  }

  if (!product) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Product Details</h1>
        <p className="text-muted-foreground">View and manage product information</p>
      </div>
      <ProductDetails productId={productId} />
    </div>
  )
}
