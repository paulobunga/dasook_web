"use server"

import { revalidatePath } from "next/cache"
import { createServerActionClient } from "@/lib/supabase/server"
import type { ProductAttribute } from "@/lib/types/product"
import { cookies } from "next/headers"

export async function getProductAttributes() {
  const supabase = createServerActionClient({ cookies })

  const { data, error } = await supabase
    .from("product_attributes")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching product attributes:", error)
    throw new Error("Failed to fetch product attributes")
  }

  return data as ProductAttribute[]
}

export async function getProductAttributeById(id: string) {
  const supabase = createServerActionClient({ cookies })

  const { data, error } = await supabase.from("product_attributes").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching product attribute:", error)
    throw new Error("Failed to fetch product attribute")
  }

  return data as ProductAttribute
}

export async function createProductAttribute(attribute: Omit<ProductAttribute, "id" | "created_at" | "updated_at">) {
  const supabase = createServerActionClient({ cookies })

  const { data, error } = await supabase
    .from("product_attributes")
    .insert({
      name: attribute.name,
      values: attribute.values,
      type: attribute.type,
      status: attribute.status,
    })
    .select()
    .single()

  if (error) {
    console.error("Error creating product attribute:", error)
    throw new Error("Failed to create product attribute")
  }

  revalidatePath("/product-attributes")
  return data
}

export async function updateProductAttribute(
  id: string,
  attribute: Omit<ProductAttribute, "id" | "created_at" | "updated_at">,
) {
  const supabase = createServerActionClient({ cookies })

  const { data, error } = await supabase
    .from("product_attributes")
    .update({
      name: attribute.name,
      values: attribute.values,
      type: attribute.type,
      status: attribute.status,
    })
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error("Error updating product attribute:", error)
    throw new Error("Failed to update product attribute")
  }

  revalidatePath("/product-attributes")
  return data
}

export async function deleteProductAttribute(id: string) {
  const supabase = createServerActionClient({ cookies })

  const { error } = await supabase.from("product_attributes").delete().eq("id", id)

  if (error) {
    console.error("Error deleting product attribute:", error)
    throw new Error("Failed to delete product attribute")
  }

  revalidatePath("/product-attributes")
}
