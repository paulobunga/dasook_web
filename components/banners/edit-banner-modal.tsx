"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { BannerForm } from "./banner-form"
import type { Banner, BannerFormData } from "@/lib/types/banner"
import { getBannerById, updateBanner } from "@/app/actions/banner-actions"
import { useToast } from "@/components/ui/use-toast"

interface EditBannerModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  bannerId: string | null
}

export function EditBannerModal({ open, onOpenChange, bannerId }: EditBannerModalProps) {
  const [banner, setBanner] = useState<Banner | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
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

  const handleSubmit = async (data: BannerFormData) => {
    if (!bannerId) return

    try {
      setIsSubmitting(true)
      await updateBanner(bannerId, data)
      toast({
        title: "Banner updated",
        description: "The banner has been updated successfully.",
      })
      onOpenChange(false)
      router.refresh()
    } catch (error) {
      console.error("Error updating banner:", error)
      toast({
        title: "Error",
        description: "Failed to update banner. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Banner</DialogTitle>
        </DialogHeader>
        {isLoading ? (
          <div className="flex h-[400px] items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        ) : banner ? (
          <BannerForm banner={banner} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        ) : null}
      </DialogContent>
    </Dialog>
  )
}
