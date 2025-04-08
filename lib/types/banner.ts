export type BannerStatus = "active" | "scheduled" | "draft" | "expired"

export type BannerPosition = "Home Hero" | "Home Middle" | "Home Bottom" | "Category Top" | "Category Bottom"

export interface Banner {
  id: string
  title: string
  image_url: string
  position: BannerPosition
  status: BannerStatus
  start_date: string
  end_date: string
  clicks: number
  created_at: string
}

export interface BannerFormData {
  title: string
  position: BannerPosition
  status: BannerStatus
  start_date: string
  end_date: string
  image_file?: File | null
  image_url?: string
}
