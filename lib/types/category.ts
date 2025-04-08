export type Category = {
  id: string
  name: string
  slug: string
  description: string | null
  parent_id: string | null
  image_url: string | null
  is_active: boolean
  products_count: number
  created_at: string
  updated_at: string
}

export type CategoryFormValues = {
  name: string
  slug: string
  description: string | null
  parent_id: string | null
  is_active: boolean
  image: File | null
}
