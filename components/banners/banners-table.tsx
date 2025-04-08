"use client"

import { useState } from "react"
import { Edit, Eye, MoreHorizontal, Trash } from "lucide-react"
import Image from "next/image"
import { format } from "date-fns"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import type { Banner } from "@/lib/types/banner"
import { ViewBannerModal } from "./view-banner-modal"
import { EditBannerModal } from "./edit-banner-modal"
import { DeleteBannerDialog } from "./delete-banner-dialog"

interface BannersTableProps {
  banners: Banner[]
}

export function BannersTable({ banners }: BannersTableProps) {
  const [selectedBanners, setSelectedBanners] = useState<string[]>([])
  const [viewBannerId, setViewBannerId] = useState<string | null>(null)
  const [editBannerId, setEditBannerId] = useState<string | null>(null)
  const [deleteBannerId, setDeleteBannerId] = useState<string | null>(null)
  const [deleteBannerTitle, setDeleteBannerTitle] = useState<string>("")
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const { toast } = useToast()

  const toggleBannerSelection = (bannerId: string) => {
    setSelectedBanners((current) =>
      current.includes(bannerId) ? current.filter((id) => id !== bannerId) : [...current, bannerId],
    )
  }

  const toggleAllBanners = () => {
    if (selectedBanners.length === banners.length) {
      setSelectedBanners([])
    } else {
      setSelectedBanners(banners.map((banner) => banner.id))
    }
  }

  const handleView = (banner: Banner) => {
    setViewBannerId(banner.id)
    setIsViewModalOpen(true)
  }

  const handleEdit = (banner: Banner) => {
    setEditBannerId(banner.id)
    setIsEditModalOpen(true)
  }

  const handleDelete = (banner: Banner) => {
    setDeleteBannerId(banner.id)
    setDeleteBannerTitle(banner.title)
    setIsDeleteDialogOpen(true)
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedBanners.length === banners.length && banners.length > 0}
                  onCheckedChange={toggleAllBanners}
                  aria-label="Select all banners"
                />
              </TableHead>
              <TableHead>Banner</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Clicks</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {banners.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No banners found.
                </TableCell>
              </TableRow>
            ) : (
              banners.map((banner) => (
                <TableRow key={banner.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedBanners.includes(banner.id)}
                      onCheckedChange={() => toggleBannerSelection(banner.id)}
                      aria-label={`Select ${banner.title}`}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-24 overflow-hidden rounded-md">
                        <Image
                          src={banner.image_url || "/placeholder.svg"}
                          alt={banner.title}
                          className="object-cover"
                          fill
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium">{banner.title}</span>
                        <span className="text-xs text-muted-foreground">{banner.id}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{banner.position}</TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-xs">Start: {format(new Date(banner.start_date), "MMM d, yyyy")}</span>
                      <span className="text-xs">End: {format(new Date(banner.end_date), "MMM d, yyyy")}</span>
                    </div>
                  </TableCell>
                  <TableCell>{banner.clicks}</TableCell>
                  <TableCell>{format(new Date(banner.created_at), "MMM d, yyyy")}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleView(banner)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(banner)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(banner)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <ViewBannerModal open={isViewModalOpen} onOpenChange={setIsViewModalOpen} bannerId={viewBannerId} />

      <EditBannerModal open={isEditModalOpen} onOpenChange={setIsEditModalOpen} bannerId={editBannerId} />

      <DeleteBannerDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        bannerId={deleteBannerId}
        bannerTitle={deleteBannerTitle}
      />
    </>
  )
}
