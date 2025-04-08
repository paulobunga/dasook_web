"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { deleteBanner } from "@/app/actions/banner-actions"
import { useToast } from "@/components/ui/use-toast"

interface DeleteBannerDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  bannerId: string | null
  bannerTitle?: string
}

export function DeleteBannerDialog({ open, onOpenChange, bannerId, bannerTitle }: DeleteBannerDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleDelete = async () => {
    if (!bannerId) return

    try {
      setIsDeleting(true)
      await deleteBanner(bannerId)
      toast({
        title: "Banner deleted",
        description: "The banner has been deleted successfully.",
      })
      onOpenChange(false)
      router.refresh()
    } catch (error) {
      console.error("Error deleting banner:", error)
      toast({
        title: "Error",
        description: "Failed to delete banner. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the banner <span className="font-medium">{bannerTitle || ""}</span>. This
            action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault()
              handleDelete()
            }}
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
