"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { ProductBasicInfo } from "./product-form/product-basic-info"
import { ProductPricing } from "./product-form/product-pricing"
import { ProductInventory } from "./product-form/product-inventory"
import { ProductMedia } from "./product-form/product-media"
import { ProductVariants } from "./product-form/product-variants"
import { ProductSeo } from "./product-form/product-seo"
import {
  createProduct,
  updateProduct,
  getProductById,
  getProductAttributes,
  getCategoriesForProductForm,
  getBrandsForProductForm,
} from "@/app/actions/product-actions"
import type { ProductFormValues } from "@/lib/types/product"

// Define the form schema with Zod
const productFormSchema = z.object({
  // Basic Info
  name: z.string().min(1, "Product name is required"),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  categories: z.array(z.string()).min(1, "At least one category is required"),
  brand: z.string().optional(),
  status: z.enum(["active", "draft", "archived"]),
  featured: z.boolean().default(false),

  // Pricing
  regularPrice: z.string().min(1, "Regular price is required"),
  salePrice: z.string().optional(),
  costPrice: z.string().optional(),
  taxClass: z.string().optional(),

  // Inventory
  sku: z.string().optional(),
  barcode: z.string().optional(),
  stockQuantity: z.string().optional(),
  lowStockThreshold: z.string().optional(),
  trackInventory: z.boolean().default(true),
  allowBackorders: z.boolean().default(false),

  // Media
  images: z
    .array(
      z.object({
        id: z.string(),
        url: z.string(),
        alt: z.string().optional(),
        featured: z.boolean().default(false),
      }),
    )
    .default([]),

  // Variants
  hasVariants: z.boolean().default(false),
  attributes: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        values: z.array(z.string()),
      }),
    )
    .default([]),
  variants: z
    .array(
      z.object({
        id: z.string(),
        attributeValues: z.record(z.string()),
        sku: z.string().optional(),
        regularPrice: z.string().optional(),
        salePrice: z.string().optional(),
        stockQuantity: z.string().optional(),
        image: z.string().optional(),
      }),
    )
    .default([]),

  // SEO
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional(),
  slug: z.string().optional(),
})

interface ProductFormProps {
  productId?: string
  mode?: "create" | "edit"
}

export function ProductForm({ productId, mode = "create" }: ProductFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(mode === "edit")
  const [availableAttributes, setAvailableAttributes] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [brands, setBrands] = useState<any[]>([])

  // Default values for the form
  const defaultValues: z.infer<typeof productFormSchema> = {
    name: "",
    description: "",
    shortDescription: "",
    categories: [],
    brand: "",
    status: "draft",
    featured: false,

    regularPrice: "",
    salePrice: "",
    costPrice: "",
    taxClass: "",

    sku: "",
    barcode: "",
    stockQuantity: "",
    lowStockThreshold: "",
    trackInventory: true,
    allowBackorders: false,

    images: [],

    hasVariants: false,
    attributes: [],
    variants: [],

    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    slug: "",
  }

  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues,
    mode: "onChange",
  })

  // Fetch product data if in edit mode
  useEffect(() => {
    async function loadData() {
      try {
        // Fetch available attributes
        const attributes = await getProductAttributes()
        setAvailableAttributes(attributes)

        // Fetch categories
        const categoriesData = await getCategoriesForProductForm()
        setCategories(categoriesData)

        // Fetch brands
        const brandsData = await getBrandsForProductForm()
        setBrands(brandsData)

        // If in edit mode, fetch the product data
        if (mode === "edit" && productId) {
          const product = await getProductById(productId)

          if (product) {
            // Transform the product data to match the form structure
            form.reset({
              name: product.name,
              description: product.description || "",
              shortDescription: product.short_description || "",
              categories: product.categories,
              brand: product.brand || "",
              status: product.status,
              featured: product.featured,

              regularPrice: product.regular_price,
              salePrice: product.sale_price || "",
              costPrice: product.cost_price || "",
              taxClass: product.tax_class || "",

              sku: product.sku || "",
              barcode: product.barcode || "",
              stockQuantity: product.stock_quantity?.toString() || "",
              lowStockThreshold: product.low_stock_threshold?.toString() || "",
              trackInventory: product.track_inventory,
              allowBackorders: product.allow_backorders,

              images: product.images.map((image) => ({
                id: image.id,
                url: image.url,
                alt: image.alt || "",
                featured: image.featured,
              })),

              hasVariants: product.has_variants,
              attributes: product.attributes.map((attr) => ({
                id: attr.id,
                name: attr.name,
                values: attr.values,
              })),
              variants: product.variants.map((variant) => ({
                id: variant.id,
                attributeValues: variant.attribute_values,
                sku: variant.sku || "",
                regularPrice: variant.regular_price || "",
                salePrice: variant.sale_price || "",
                stockQuantity: variant.stock_quantity?.toString() || "",
                image: variant.image_url || "",
              })),

              metaTitle: product.meta_title || "",
              metaDescription: product.meta_description || "",
              metaKeywords: product.meta_keywords || "",
              slug: product.slug,
            })
          }
        }
      } catch (error) {
        console.error("Error loading data:", error)
        toast({
          title: "Error",
          description: "Failed to load data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [form, mode, productId, toast])

  const onSubmit = async (data: z.infer<typeof productFormSchema>) => {
    setIsSubmitting(true)

    try {
      // Transform form data to match the API structure
      const formData: ProductFormValues = {
        name: data.name,
        description: data.description,
        short_description: data.shortDescription,
        categories: data.categories,
        brand: data.brand,
        status: data.status,
        featured: data.featured,

        regular_price: data.regularPrice,
        sale_price: data.salePrice,
        cost_price: data.costPrice,
        tax_class: data.taxClass,

        sku: data.sku,
        barcode: data.barcode,
        stock_quantity: data.stockQuantity,
        low_stock_threshold: data.lowStockThreshold,
        track_inventory: data.trackInventory,
        allow_backorders: data.allowBackorders,

        has_variants: data.hasVariants,
        attributes: data.attributes,
        variants: data.variants,
        images: data.images,

        meta_title: data.metaTitle,
        meta_description: data.metaDescription,
        meta_keywords: data.metaKeywords,
        slug: data.slug,
      }

      if (mode === "create") {
        await createProduct(formData)
        toast({
          title: "Product created",
          description: `${data.name} has been created successfully.`,
        })
      } else {
        await updateProduct(productId!, formData)
        toast({
          title: "Product updated",
          description: `${data.name} has been updated successfully.`,
        })
      }

      // Redirect to products list
      router.push("/products")
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Error",
        description: "There was a problem saving the product. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Tabs defaultValue="basic-info" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-6">
            <TabsTrigger value="basic-info">Basic Info</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="variants">Variants</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
          </TabsList>

          <TabsContent value="basic-info" className="space-y-4 pt-4">
            <ProductBasicInfo form={form} categories={categories} brands={brands} />
          </TabsContent>

          <TabsContent value="pricing" className="space-y-4 pt-4">
            <ProductPricing form={form} />
          </TabsContent>

          <TabsContent value="inventory" className="space-y-4 pt-4">
            <ProductInventory form={form} />
          </TabsContent>

          <TabsContent value="media" className="space-y-4 pt-4">
            <ProductMedia form={form} />
          </TabsContent>

          <TabsContent value="variants" className="space-y-4 pt-4">
            <ProductVariants form={form} availableAttributes={availableAttributes} />
          </TabsContent>

          <TabsContent value="seo" className="space-y-4 pt-4">
            <ProductSeo form={form} />
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => router.push("/products")} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <Save className="mr-2 h-4 w-4" />
            {mode === "create" ? "Create Product" : "Update Product"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
