"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Banner } from "@/lib/types/banner"
import { getBannerById } from "@/app/actions/banner-actions"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { format } from "date-fns"

interface ViewBannerModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  bannerId: string | null
}

export function ViewBannerModal({ open, onOpenChange, bannerId }: ViewBannerModalProps) {
  const [banner, setBanner] = useState<Banner | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (open && bannerId) {
      const fetchBanner = async () => {
        try {
          setIsLoading(true)
          const data = await getBannerById(bannerId)
          setBanner(data)
        } catch (error) {
          console.error("Error fetching banner:", error)
          toast({
            title: "Error",
            description: "Failed to load banner details.",
            variant: "destructive",
          })
          onOpenChange(false)
        } finally {
          setIsLoading(false)
        }
      }

      fetchBanner()
    }
  }, [open, bannerId, toast, onOpenChange])

  if (isLoading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <div className="flex h-[400px] items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  if (!banner) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Banner Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative h-[200px] w-full overflow-hidden rounded-lg">
              <Image src={banner.image_url || "/placeholder.svg"} alt={banner.title} className="object-cover" fill />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Title</h3>
              <p className="text-base font-medium">{banner.title}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">ID</h3>
              <p className="text-base font-medium">{banner.id}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Position</h3>
              <p className="text-base font-medium">{banner.position}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
              <Badge
                variant={
                  banner.status === "active"
                    ? "success"
                    : banner.status === "scheduled"
                      ? "default"
                      : banner.status === "draft"
                        ? "secondary"
                        : "outline"
                }
              >
                {banner.status}
              </Badge>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Start Date</h3>
              <p className="text-base font-medium">{format(new Date(banner.start_date), "PPP")}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">End Date</h3>
              <p className="text-base font-medium">{format(new Date(banner.end_date), "PPP")}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Clicks</h3>
              <p className="text-base font-medium">{banner.clicks}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Created</h3>
              <p className="text-base font-medium">{format(new Date(banner.created_at), "PPP")}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
