"use server"

import { revalidatePath } from "next/cache"
import { getSupabaseServerClient } from "@/lib/supabase"
import type { Banner, BannerFormData } from "@/lib/types/banner"

export async function getBanners() {
  const supabase = getSupabaseServerClient()
  if (!supabase) throw new Error("Could not connect to database")

  const { data, error } = await supabase.from("banners").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching banners:", error)
    throw new Error("Failed to fetch banners")
  }

  return data as Banner[]
}

export async function getBannerById(id: string) {
  const supabase = getSupabaseServerClient()
  if (!supabase) throw new Error("Could not connect to database")

  const { data, error } = await supabase.from("banners").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching banner:", error)
    throw new Error("Failed to fetch banner")
  }

  return data as Banner
}

export async function createBanner(formData: BannerFormData) {
  const supabase = getSupabaseServerClient()
  if (!supabase) throw new Error("Could not connect to database")

  let image_url = formData.image_url || ""

  // Upload image if provided
  if (formData.image_file) {
    const file = formData.image_file
    const fileExt = file.name.split(".").pop()
    const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`
    const filePath = `banners/${fileName}`

    const { error: uploadError, data } = await supabase.storage.from("banner-images").upload(filePath, file)

    if (uploadError) {
      console.error("Error uploading image:", uploadError)
      throw new Error("Failed to upload banner image")
    }

    // Get public URL
    const { data: urlData } = supabase.storage.from("banner-images").getPublicUrl(filePath)

    image_url = urlData.publicUrl
  }

  // Create banner record
  const { error } = await supabase.from("banners").insert({
    title: formData.title,
    image_url,
    position: formData.position,
    status: formData.status,
    start_date: formData.start_date,
    end_date: formData.end_date,
    clicks: 0,
    created_at: new Date().toISOString(),
  })

  if (error) {
    console.error("Error creating banner:", error)
    throw new Error("Failed to create banner")
  }

  revalidatePath("/banner-setup")
  return { success: true }
}

export async function updateBanner(id: string, formData: BannerFormData) {
  const supabase = getSupabaseServerClient()
  if (!supabase) throw new Error("Could not connect to database")

  let image_url = formData.image_url || ""

  // Upload new image if provided
  if (formData.image_file) {
    const file = formData.image_file
    const fileExt = file.name.split(".").pop()
    const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`
    const filePath = `banners/${fileName}`

    const { error: uploadError } = await supabase.storage.from("banner-images").upload(filePath, file)

    if (uploadError) {
      console.error("Error uploading image:", uploadError)
      throw new Error("Failed to upload banner image")
    }

    // Get public URL
    const { data: urlData } = supabase.storage.from("banner-images").getPublicUrl(filePath)

    image_url = urlData.publicUrl
  }

  // Update banner record
  const updateData: any = {
    title: formData.title,
    position: formData.position,
    status: formData.status,
    start_date: formData.start_date,
    end_date: formData.end_date,
  }

  // Only update image_url if a new image was uploaded
  if (image_url) {
    updateData.image_url = image_url
  }

  const { error } = await supabase.from("banners").update(updateData).eq("id", id)

  if (error) {
    console.error("Error updating banner:", error)
    throw new Error("Failed to update banner")
  }

  revalidatePath("/banner-setup")
  return { success: true }
}

export async function deleteBanner(id: string) {
  const supabase = getSupabaseServerClient()
  if (!supabase) throw new Error("Could not connect to database")

  // Get the banner to find the image URL
  const { data: banner, error: fetchError } = await supabase.from("banners").select("image_url").eq("id", id).single()

  if (fetchError) {
    console.error("Error fetching banner for deletion:", fetchError)
    throw new Error("Failed to fetch banner for deletion")
  }

  // Delete the banner record
  const { error } = await supabase.from("banners").delete().eq("id", id)

  if (error) {
    console.error("Error deleting banner:", error)
    throw new Error("Failed to delete banner")
  }

  // Try to delete the image from storage if it exists
  if (banner?.image_url) {
    try {
      // Extract the path from the URL
      const url = new URL(banner.image_url)
      const pathParts = url.pathname.split("/")
      const filePath = pathParts.slice(pathParts.indexOf("banner-images") + 1).join("/")

      if (filePath) {
        await supabase.storage.from("banner-images").remove([filePath])
      }
    } catch (e) {
      console.error("Error deleting banner image:", e)
      // Continue even if image deletion fails
    }
  }

  revalidatePath("/banner-setup")
  return { success: true }
}

export async function incrementBannerClicks(id: string) {
  const supabase = getSupabaseServerClient()
  if (!supabase) throw new Error("Could not connect to database")

  const { error } = await supabase.rpc("increment_banner_clicks", { banner_id: id })

  if (error) {
    console.error("Error incrementing banner clicks:", error)
    throw new Error("Failed to increment banner clicks")
  }

  return { success: true }
}
