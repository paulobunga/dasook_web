"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { BannerForm } from "./banner-form"
import type { BannerFormData } from "@/lib/types/banner"
import { createBanner } from "@/app/actions/banner-actions"
import { useToast } from "@/components/ui/use-toast"

interface CreateBannerModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateBannerModal({ open, onOpenChange }: CreateBannerModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (data: BannerFormData) => {
    try {
      setIsSubmitting(true)
      await createBanner(data)
      toast({
        title: "Banner created",
        description: "The banner has been created successfully.",
      })
      onOpenChange(false)
      router.refresh()
    } catch (error) {
      console.error("Error creating banner:", error)
      toast({
        title: "Error",
        description: "Failed to create banner. Please try again.",
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
          <DialogTitle>Create New Banner</DialogTitle>
        </DialogHeader>
        <BannerForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </DialogContent>
    </Dialog>
  )
}
