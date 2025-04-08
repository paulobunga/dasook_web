"use server"

import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import { createId } from "@paralleldrive/cuid2"
import type { CategoryFormValues } from "@/lib/types/category"

// Helper function to generate a slug from a name
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export async function getCategories() {
  const supabase = createServerActionClient({ cookies })

  const { data, error } = await supabase.from("categories").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching categories:", error)
    throw new Error("Failed to fetch categories")
  }

  return data
}

export async function getCategoryById(id: string) {
  const supabase = createServerActionClient({ cookies })

  const { data, error } = await supabase.from("categories").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching category:", error)
    throw new Error("Failed to fetch category")
  }

  return data
}

export async function createCategory(formData: CategoryFormValues) {
  const supabase = createServerActionClient({ cookies })

  try {
    const categoryId = createId()
    const slug = formData.slug || generateSlug(formData.name)

    // Upload image if provided
    let image_url = null
    if (formData.image) {
      const fileExt = formData.image.name.split(".").pop()
      const fileName = `${categoryId}.${fileExt}`

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("category-images")
        .upload(fileName, formData.image, {
          cacheControl: "3600",
          upsert: true,
        })

      if (uploadError) {
        throw new Error(`Failed to upload image: ${uploadError.message}`)
      }

      // Get public URL
      const { data: urlData } = await supabase.storage.from("category-images").getPublicUrl(fileName)

      image_url = urlData.publicUrl
    }

    // Insert category
    const { error } = await supabase.from("categories").insert({
      id: categoryId,
      name: formData.name,
      slug,
      description: formData.description,
      parent_id: formData.parent_id || null,
      image_url,
      is_active: formData.is_active,
      products_count: 0,
    })

    if (error) {
      throw new Error(`Failed to create category: ${error.message}`)
    }

    revalidatePath("/categories")
    return { success: true, id: categoryId }
  } catch (error) {
    console.error("Error creating category:", error)
    return { success: false, error: (error as Error).message }
  }
}

export async function updateCategory(id: string, formData: CategoryFormValues) {
  const supabase = createServerActionClient({ cookies })

  try {
    // Get current category data
    const { data: currentCategory, error: fetchError } = await supabase
      .from("categories")
      .select("image_url")
      .eq("id", id)
      .single()

    if (fetchError) {
      throw new Error(`Failed to fetch current category: ${fetchError.message}`)
    }

    // Upload image if provided
    let image_url = currentCategory.image_url
    if (formData.image) {
      const fileExt = formData.image.name.split(".").pop()
      const fileName = `${id}.${fileExt}`

      const { error: uploadError } = await supabase.storage.from("category-images").upload(fileName, formData.image, {
        cacheControl: "3600",
        upsert: true,
      })

      if (uploadError) {
        throw new Error(`Failed to upload image: ${uploadError.message}`)
      }

      // Get public URL
      const { data: urlData } = await supabase.storage.from("category-images").getPublicUrl(fileName)

      image_url = urlData.publicUrl
    }

    // Update category
    const { error } = await supabase
      .from("categories")
      .update({
        name: formData.name,
        slug: formData.slug || generateSlug(formData.name),
        description: formData.description,
        parent_id: formData.parent_id || null,
        image_url,
        is_active: formData.is_active,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)

    if (error) {
      throw new Error(`Failed to update category: ${error.message}`)
    }

    revalidatePath("/categories")
    return { success: true }
  } catch (error) {
    console.error("Error updating category:", error)
    return { success: false, error: (error as Error).message }
  }
}

export async function deleteCategory(id: string) {
  const supabase = createServerActionClient({ cookies })

  try {
    // Get category to check if it has an image
    const { data: category, error: fetchError } = await supabase
      .from("categories")
      .select("image_url")
      .eq("id", id)
      .single()

    if (fetchError) {
      throw new Error(`Failed to fetch category: ${fetchError.message}`)
    }

    // Delete the category
    const { error } = await supabase.from("categories").delete().eq("id", id)

    if (error) {
      throw new Error(`Failed to delete category: ${error.message}`)
    }

    // Delete image if exists
    if (category.image_url) {
      const fileName = category.image_url.split("/").pop()
      if (fileName) {
        await supabase.storage.from("category-images").remove([fileName])
      }
    }

    revalidatePath("/categories")
    return { success: true }
  } catch (error) {
    console.error("Error deleting category:", error)
    return { success: false, error: (error as Error).message }
  }
}

export async function getParentCategories() {
  const supabase = createServerActionClient({ cookies })

  const { data, error } = await supabase.from("categories").select("id, name").is("parent_id", null).order("name")

  if (error) {
    console.error("Error fetching parent categories:", error)
    throw new Error("Failed to fetch parent categories")
  }

  return data
}
