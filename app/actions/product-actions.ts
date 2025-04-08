"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import type { ProductFormValues, Product } from "@/lib/types/product"

// Helper function to generate a slug from a name
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

// Get all products with pagination
export async function getProducts(page = 1, limit = 10, filters: any = {}) {
  const supabase = createClient()

  // Calculate offset
  const offset = (page - 1) * limit

  // Start building the query
  let query = supabase.from("products").select(
    `
      *,
      images:product_images(*),
      variants:product_variants(*),
      product_categories!inner(category_id)
    `,
    { count: "exact" },
  )

  // Apply filters
  if (filters.search) {
    query = query.ilike("name", `%${filters.search}%`)
  }

  if (filters.status) {
    query = query.eq("status", filters.status)
  }

  if (filters.category) {
    query = query.eq("product_categories.category_id", filters.category)
  }

  if (filters.featured !== undefined) {
    query = query.eq("featured", filters.featured)
  }

  // Apply pagination
  const { data, error, count } = await query.order("created_at", { ascending: false }).range(offset, offset + limit - 1)

  if (error) {
    console.error("Error fetching products:", error)
    throw new Error("Failed to fetch products")
  }

  // Transform the data to match our Product interface
  const products = data.map((product: any) => {
    return {
      ...product,
      categories: product.product_categories.map((pc: any) => pc.category_id),
    }
  })

  return {
    products,
    total: count || 0,
    page,
    limit,
    totalPages: count ? Math.ceil(count / limit) : 0,
  }
}

// Get a single product by ID
export async function getProductById(id: string) {
  const supabase = createClient()

  const { data: product, error } = await supabase
    .from("products")
    .select(`
      *,
      images:product_images(*),
      variants:product_variants(*),
      product_categories(category_id)
    `)
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching product:", error)
    throw new Error("Failed to fetch product")
  }

  if (!product) {
    return null
  }

  // Transform the data to match our Product interface
  return {
    ...product,
    categories: product.product_categories.map((pc: any) => pc.category_id),
  } as Product
}

// Create a new product
export async function createProduct(formData: ProductFormValues) {
  const supabase = createClient()

  // Generate a slug if not provided
  const slug = formData.slug || generateSlug(formData.name)

  // Start a transaction
  const { data: product, error } = await supabase
    .from("products")
    .insert({
      name: formData.name,
      slug,
      description: formData.description,
      short_description: formData.short_description,
      brand: formData.brand,
      status: formData.status,
      featured: formData.featured,

      regular_price: formData.regular_price,
      sale_price: formData.sale_price,
      cost_price: formData.cost_price,
      tax_class: formData.tax_class,

      sku: formData.sku,
      barcode: formData.barcode,
      stock_quantity: formData.stock_quantity ? Number.parseInt(formData.stock_quantity) : null,
      low_stock_threshold: formData.low_stock_threshold ? Number.parseInt(formData.low_stock_threshold) : null,
      track_inventory: formData.track_inventory,
      allow_backorders: formData.allow_backorders,

      has_variants: formData.has_variants,

      meta_title: formData.meta_title,
      meta_description: formData.meta_description,
      meta_keywords: formData.meta_keywords,
    })
    .select()
    .single()

  if (error) {
    console.error("Error creating product:", error)
    throw new Error("Failed to create product")
  }

  // Insert product categories
  if (formData.categories.length > 0) {
    const productCategories = formData.categories.map((categoryId) => ({
      product_id: product.id,
      category_id: categoryId,
    }))

    const { error: categoriesError } = await supabase.from("product_categories").insert(productCategories)

    if (categoriesError) {
      console.error("Error adding product categories:", categoriesError)
      throw new Error("Failed to add product categories")
    }
  }

  // Insert product images
  if (formData.images.length > 0) {
    const productImages = formData.images.map((image, index) => ({
      product_id: product.id,
      url: image.url,
      alt: image.alt,
      featured: image.featured,
      position: index,
    }))

    const { error: imagesError } = await supabase.from("product_images").insert(productImages)

    if (imagesError) {
      console.error("Error adding product images:", imagesError)
      throw new Error("Failed to add product images")
    }
  }

  // Insert product variants if the product has variants
  if (formData.has_variants && formData.variants.length > 0) {
    const productVariants = formData.variants.map((variant) => ({
      product_id: product.id,
      sku: variant.sku,
      regular_price: variant.regular_price,
      sale_price: variant.sale_price,
      stock_quantity: variant.stock_quantity ? Number.parseInt(variant.stock_quantity) : null,
      image_url: variant.image,
      attribute_values: variant.attribute_values,
    }))

    const { error: variantsError } = await supabase.from("product_variants").insert(productVariants)

    if (variantsError) {
      console.error("Error adding product variants:", variantsError)
      throw new Error("Failed to add product variants")
    }
  }

  revalidatePath("/products")
  return product.id
}

// Update an existing product
export async function updateProduct(id: string, formData: ProductFormValues) {
  const supabase = createClient()

  // Generate a slug if not provided
  const slug = formData.slug || generateSlug(formData.name)

  // Update the product
  const { error } = await supabase
    .from("products")
    .update({
      name: formData.name,
      slug,
      description: formData.description,
      short_description: formData.short_description,
      brand: formData.brand,
      status: formData.status,
      featured: formData.featured,

      regular_price: formData.regular_price,
      sale_price: formData.sale_price,
      cost_price: formData.cost_price,
      tax_class: formData.tax_class,

      sku: formData.sku,
      barcode: formData.barcode,
      stock_quantity: formData.stock_quantity ? Number.parseInt(formData.stock_quantity) : null,
      low_stock_threshold: formData.low_stock_threshold ? Number.parseInt(formData.low_stock_threshold) : null,
      track_inventory: formData.track_inventory,
      allow_backorders: formData.allow_backorders,

      has_variants: formData.has_variants,

      meta_title: formData.meta_title,
      meta_description: formData.meta_description,
      meta_keywords: formData.meta_keywords,

      updated_at: new Date().toISOString(),
    })
    .eq("id", id)

  if (error) {
    console.error("Error updating product:", error)
    throw new Error("Failed to update product")
  }

  // Delete existing product categories and insert new ones
  const { error: deleteCategoriesError } = await supabase.from("product_categories").delete().eq("product_id", id)

  if (deleteCategoriesError) {
    console.error("Error deleting product categories:", deleteCategoriesError)
    throw new Error("Failed to update product categories")
  }

  if (formData.categories.length > 0) {
    const productCategories = formData.categories.map((categoryId) => ({
      product_id: id,
      category_id: categoryId,
    }))

    const { error: categoriesError } = await supabase.from("product_categories").insert(productCategories)

    if (categoriesError) {
      console.error("Error adding product categories:", categoriesError)
      throw new Error("Failed to add product categories")
    }
  }

  // Handle images: delete removed images and add new ones
  const { data: existingImages } = await supabase.from("product_images").select("id, url").eq("product_id", id)

  // Find images to delete (images that exist in DB but not in formData)
  const formImageIds = formData.images.map((img) => img.id)
  const imagesToDelete = existingImages?.filter((img) => !formImageIds.includes(img.id)) || []

  // Delete images from storage and database
  for (const image of imagesToDelete) {
    // Extract the file path from the URL
    const path = new URL(image.url).pathname.split("/").pop()
    if (path) {
      const { error: storageError } = await supabase.storage.from("product-images").remove([path])

      if (storageError) {
        console.error("Error deleting image from storage:", storageError)
      }
    }
  }

  if (imagesToDelete.length > 0) {
    const { error: deleteImagesError } = await supabase
      .from("product_images")
      .delete()
      .in(
        "id",
        imagesToDelete.map((img) => img.id),
      )

    if (deleteImagesError) {
      console.error("Error deleting product images:", deleteImagesError)
      throw new Error("Failed to update product images")
    }
  }

  // Update existing images and add new ones
  for (let i = 0; i < formData.images.length; i++) {
    const image = formData.images[i]

    if (image.id.startsWith("new-")) {
      // This is a new image, insert it
      const { error: newImageError } = await supabase.from("product_images").insert({
        product_id: id,
        url: image.url,
        alt: image.alt,
        featured: image.featured,
        position: i,
      })

      if (newImageError) {
        console.error("Error adding new product image:", newImageError)
        throw new Error("Failed to add new product image")
      }
    } else {
      // This is an existing image, update it
      const { error: updateImageError } = await supabase
        .from("product_images")
        .update({
          alt: image.alt,
          featured: image.featured,
          position: i,
        })
        .eq("id", image.id)

      if (updateImageError) {
        console.error("Error updating product image:", updateImageError)
        throw new Error("Failed to update product image")
      }
    }
  }

  // Handle variants: delete all existing variants and insert new ones if the product has variants
  const { error: deleteVariantsError } = await supabase.from("product_variants").delete().eq("product_id", id)

  if (deleteVariantsError) {
    console.error("Error deleting product variants:", deleteVariantsError)
    throw new Error("Failed to update product variants")
  }

  if (formData.has_variants && formData.variants.length > 0) {
    const productVariants = formData.variants.map((variant) => ({
      product_id: id,
      sku: variant.sku,
      regular_price: variant.regular_price,
      sale_price: variant.sale_price,
      stock_quantity: variant.stock_quantity ? Number.parseInt(variant.stock_quantity) : null,
      image_url: variant.image,
      attribute_values: variant.attribute_values,
    }))

    const { error: variantsError } = await supabase.from("product_variants").insert(productVariants)

    if (variantsError) {
      console.error("Error adding product variants:", variantsError)
      throw new Error("Failed to add product variants")
    }
  }

  revalidatePath("/products")
  revalidatePath(`/products/${id}`)
  return id
}

// Delete a product
export async function deleteProduct(id: string) {
  const supabase = createClient()

  // Get product images to delete from storage
  const { data: images } = await supabase.from("product_images").select("url").eq("product_id", id)

  // Delete images from storage
  if (images && images.length > 0) {
    for (const image of images) {
      // Extract the file path from the URL
      const path = new URL(image.url).pathname.split("/").pop()
      if (path) {
        const { error: storageError } = await supabase.storage.from("product-images").remove([path])

        if (storageError) {
          console.error("Error deleting image from storage:", storageError)
        }
      }
    }
  }

  // Delete the product (cascade will delete related records)
  const { error } = await supabase.from("products").delete().eq("id", id)

  if (error) {
    console.error("Error deleting product:", error)
    throw new Error("Failed to delete product")
  }

  revalidatePath("/products")
}

// Upload a product image
export async function uploadProductImage(file: File) {
  const supabase = createClient()

  // Generate a unique filename
  const fileExt = file.name.split(".").pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`

  // Upload the file to Supabase Storage
  const { data, error } = await supabase.storage.from("product-images").upload(fileName, file)

  if (error) {
    console.error("Error uploading image:", error)
    throw new Error("Failed to upload image")
  }

  // Get the public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from("product-images").getPublicUrl(data.path)

  return publicUrl
}

// Get all product attributes
export async function getProductAttributes() {
  const supabase = createClient()

  const { data, error } = await supabase.from("product_attributes").select("*").eq("status", "active").order("name")

  if (error) {
    console.error("Error fetching product attributes:", error)
    throw new Error("Failed to fetch product attributes")
  }

  return data
}

// Get all categories for product form
export async function getCategoriesForProductForm() {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("categories")
    .select("id, name, parent_id")
    .eq("is_active", true)
    .order("name")

  if (error) {
    console.error("Error fetching categories:", error)
    throw new Error("Failed to fetch categories")
  }

  return data
}

// Get all brands for product form
export async function getBrandsForProductForm() {
  const supabase = createClient()

  const { data, error } = await supabase.from("brands").select("id, name").eq("is_active", true).order("name")

  if (error) {
    console.error("Error fetching brands:", error)
    throw new Error("Failed to fetch brands")
  }

  return data
}
