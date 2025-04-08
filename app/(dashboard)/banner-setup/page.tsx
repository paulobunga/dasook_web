import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { BannersTable } from "@/components/banners/banners-table"
import { BannerFilters } from "@/components/banners/banner-filters"
import { getBanners } from "@/app/actions/banner-actions"
import { CreateBannerModal } from "@/components/banners/create-banner-modal"

export default async function BannerSetupPage() {
  const banners = await getBanners()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Banner Setup</h1>
          <p className="text-muted-foreground">Manage promotional banners for your store</p>
        </div>
        <BannerOperations />
      </div>
      <BannerFilters />
      <BannersTable banners={banners} />
    </div>
  )
}
;("use client")

import { useState } from "react"

function BannerOperations() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsCreateModalOpen(true)}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Banner
      </Button>
      <CreateBannerModal open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen} />
    </>
  )
}
