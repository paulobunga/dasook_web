"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Edit, ExternalLink, Eye, Package, ShoppingCart, Tag, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { DeleteProductDialog } from "./delete-product-dialog"

// Mock product data
const getProductData = (productId: string) => {
  return {
    id: productId,
    name: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation.",
    shortDescription: "Premium wireless headphones",
    categories: [
      { id: "electronics", name: "Electronics" },
      { id: "audio", name: "Audio Equipment" },
    ],
    brand: { id: "audiotech", name: "AudioTech" },
    status: "active",
    featured: true,

    regularPrice: "$299.99",
    salePrice: "$249.99",
    costPrice: "$150.00",
    taxClass: "Standard Rate",

    sku: "WH-1234",
    barcode: "123456789012",
    stockQuantity: 45,
    lowStockThreshold: 10,
    trackInventory: true,
    allowBackorders: false,

    images: [
      {
        id: "img1",
        url: "/placeholder.svg?height=300&width=300",
        alt: "Wireless Headphones - Black",
        featured: true,
      },
      {
        id: "img2",
        url: "/placeholder.svg?height=300&width=300",
        alt: "Wireless Headphones - Side View",
        featured: false,
      },
    ],

    hasVariants: true,
    attributes: [
      {
        id: "attr1",
        name: "Color",
        values: ["Black", "White", "Blue"],
      },
      {
        id: "attr2",
        name: "Size",
        values: ["Small", "Medium", "Large"],
      },
    ],
    variants: [
      {
        id: "var1",
        attributeValues: { Color: "Black", Size: "Small" },
        sku: "WH-1234-BLK-S",
        regularPrice: "$299.99",
        salePrice: "$249.99",
        stockQuantity: 15,
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: "var2",
        attributeValues: { Color: "Black", Size: "Medium" },
        sku: "WH-1234-BLK-M",
        regularPrice: "$299.99",
        salePrice: "$249.99",
        stockQuantity: 10,
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: "var3",
        attributeValues: { Color: "White", Size: "Small" },
        sku: "WH-1234-WHT-S",
        regularPrice: "$299.99",
        salePrice: "$249.99",
        stockQuantity: 8,
        image: "/placeholder.svg?height=100&width=100",
      },
    ],

    metaTitle: "Wireless Headphones | AudioTech",
    metaDescription: "High-quality wireless headphones with noise cancellation technology.",
    metaKeywords: "headphones, wireless, audio, noise cancellation",
    slug: "audiotech-wireless-headphones",

    stats: {
      totalSales: 128,
      revenue: "$31,872.00",
      views: 2450,
      conversionRate: "5.22%",
    },

    createdAt: "2023-04-23",
    updatedAt: "2023-08-15",
  }
}

interface ProductDetailsProps {
  productId: string
}

export function ProductDetails({ productId }: ProductDetailsProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  // In a real application, you would fetch this data from an API
  const product = getProductData(productId)

  const handleDelete = () => {
    // In a real application, you would call an API to delete the product
    toast({
      title: "Product deleted",
      description: `${product.name} has been deleted.`,
    })

    router.push("/products")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button variant="outline" size="sm" asChild>
          <Link href="/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </Button>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/products/${productId}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Product
            </Link>
          </Button>
          <Button variant="outline" size="sm">
            <ExternalLink className="mr-2 h-4 w-4" />
            View on Store
          </Button>
          <Button variant="destructive" size="sm" onClick={() => setDeleteDialogOpen(true)}>
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">{product.name}</CardTitle>
                <CardDescription>{product.shortDescription}</CardDescription>
              </div>
              <Badge variant={product.status === "active" ? "success" : "secondary"}>
                {product.status === "active" ? "Active" : "Draft"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="details">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="variants">Variants</TabsTrigger>
                <TabsTrigger value="images">Images</TabsTrigger>
                <TabsTrigger value="seo">SEO</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-6 pt-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Basic Information</h3>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between border-b pb-1">
                        <span className="text-sm">Brand</span>
                        <span className="text-sm font-medium">{product.brand.name}</span>
                      </div>
                      <div className="flex justify-between border-b pb-1">
                        <span className="text-sm">Categories</span>
                        <div className="flex flex-wrap justify-end gap-1">
                          {product.categories.map((category) => (
                            <Badge key={category.id} variant="outline">
                              {category.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-between border-b pb-1">
                        <span className="text-sm">Featured</span>
                        <span className="text-sm font-medium">{product.featured ? "Yes" : "No"}</span>
                      </div>
                      <div className="flex justify-between border-b pb-1">
                        <span className="text-sm">Created</span>
                        <span className="text-sm font-medium">{product.createdAt}</span>
                      </div>
                      <div className="flex justify-between border-b pb-1">
                        <span className="text-sm">Last Updated</span>
                        <span className="text-sm font-medium">{product.updatedAt}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Pricing & Inventory</h3>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between border-b pb-1">
                        <span className="text-sm">Regular Price</span>
                        <span className="text-sm font-medium">{product.regularPrice}</span>
                      </div>
                      <div className="flex justify-between border-b pb-1">
                        <span className="text-sm">Sale Price</span>
                        <span className="text-sm font-medium">{product.salePrice}</span>
                      </div>
                      <div className="flex justify-between border-b pb-1">
                        <span className="text-sm">Cost Price</span>
                        <span className="text-sm font-medium">{product.costPrice}</span>
                      </div>
                      <div className="flex justify-between border-b pb-1">
                        <span className="text-sm">Tax Class</span>
                        <span className="text-sm font-medium">{product.taxClass}</span>
                      </div>
                      <div className="flex justify-between border-b pb-1">
                        <span className="text-sm">SKU</span>
                        <span className="text-sm font-medium">{product.sku}</span>
                      </div>
                      <div className="flex justify-between border-b pb-1">
                        <span className="text-sm">Stock</span>
                        <span className="text-sm font-medium">{product.stockQuantity}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                  <p className="mt-2 text-sm">{product.description}</p>
                </div>
              </TabsContent>

              <TabsContent value="variants" className="pt-4">
                {product.hasVariants ? (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Variant</TableHead>
                          <TableHead>SKU</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Sale Price</TableHead>
                          <TableHead>Stock</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {product.variants.map((variant) => (
                          <TableRow key={variant.id}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {variant.image && (
                                  <img
                                    src={variant.image || "/placeholder.svg"}
                                    alt=""
                                    className="h-8 w-8 rounded-md object-cover"
                                  />
                                )}
                                <span>
                                  {Object.entries(variant.attributeValues)
                                    .map(([attr, value]) => `${attr}: ${value}`)
                                    .join(" / ")}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>{variant.sku}</TableCell>
                            <TableCell>{variant.regularPrice}</TableCell>
                            <TableCell>{variant.salePrice}</TableCell>
                            <TableCell>{variant.stockQuantity}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="rounded-lg border border-dashed p-8 text-center">
                    <h3 className="text-lg font-medium">No variants</h3>
                    <p className="mt-1 text-sm text-muted-foreground">This product does not have any variants.</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="images" className="pt-4">
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {product.images.map((image) => (
                    <div key={image.id} className="relative rounded-md border overflow-hidden">
                      <img
                        src={image.url || "/placeholder.svg"}
                        alt={image.alt}
                        className="aspect-square w-full object-cover"
                      />
                      {image.featured && (
                        <Badge className="absolute top-2 right-2" variant="secondary">
                          Main Image
                        </Badge>
                      )}
                      <div className="p-2">
                        <p className="text-xs text-muted-foreground truncate">{image.alt}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="seo" className="space-y-4 pt-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">URL Slug</h3>
                  <p className="mt-1 text-sm">{product.slug}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Meta Title</h3>
                  <p className="mt-1 text-sm">{product.metaTitle}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Meta Description</h3>
                  <p className="mt-1 text-sm">{product.metaDescription}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Meta Keywords</h3>
                  <p className="mt-1 text-sm">{product.metaKeywords}</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance</CardTitle>
              <CardDescription>Product sales and performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <ShoppingCart className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Total Sales</span>
                  </div>
                  <span className="font-medium">{product.stats.totalSales}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Tag className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Revenue</span>
                  </div>
                  <span className="font-medium">{product.stats.revenue}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Eye className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Views</span>
                  </div>
                  <span className="font-medium">{product.stats.views}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Package className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Conversion Rate</span>
                  </div>
                  <span className="font-medium">{product.stats.conversionRate}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Main Image</CardTitle>
            </CardHeader>
            <CardContent>
              {product.images.find((img) => img.featured) ? (
                <img
                  src={product.images.find((img) => img.featured)?.url || "/placeholder.svg"}
                  alt={product.images.find((img) => img.featured)?.alt || product.name}
                  className="aspect-square w-full rounded-md object-cover"
                />
              ) : (
                <div className="flex aspect-square w-full items-center justify-center rounded-md border">
                  <p className="text-sm text-muted-foreground">No main image</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <DeleteProductDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        productId={productId}
      />
    </div>
  )
}
