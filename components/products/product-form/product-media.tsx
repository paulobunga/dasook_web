"use client"

import { useState } from "react"
import type { UseFormReturn } from "react-hook-form"
import { FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical, Trash } from "lucide-react"
import { cn } from "@/lib/utils"
import { ProductImageUpload } from "../product-image-upload"

interface ProductMediaProps {
  form: UseFormReturn<any>
}

interface SortableImageProps {
  id: string
  url: string
  alt: string
  featured: boolean
  onRemove: (id: string) => void
  onFeatured: (id: string) => void
  onAltChange: (id: string, alt: string) => void
}

function SortableImage({ id, url, alt, featured, onRemove, onFeatured, onAltChange }: SortableImageProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-4 rounded-md border p-3 bg-background">
      <div {...attributes} {...listeners} className="cursor-grab">
        <GripVertical className="h-5 w-5 text-muted-foreground" />
      </div>

      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
        <img src={url || "/placeholder.svg"} alt={alt} className="h-full w-full object-cover" />
      </div>

      <div className="flex-1 space-y-1">
        <Input
          placeholder="Image alt text"
          value={alt}
          onChange={(e) => onAltChange(id, e.target.value)}
          className="h-8"
        />
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Switch id={`featured-${id}`} checked={featured} onCheckedChange={() => onFeatured(id)} />
            <label
              htmlFor={`featured-${id}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Featured
            </label>
          </div>
        </div>
      </div>

      <Button variant="ghost" size="icon" onClick={() => onRemove(id)} className="h-8 w-8 flex-shrink-0">
        <Trash className="h-4 w-4" />
        <span className="sr-only">Remove</span>
      </Button>
    </div>
  )
}

export function ProductMedia({ form }: ProductMediaProps) {
  const [isDragging, setIsDragging] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const images = form.watch("images") || []

  const handleDragStart = () => {
    setIsDragging(true)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    setIsDragging(false)

    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = images.findIndex((image: any) => image.id === active.id)
      const newIndex = images.findIndex((image: any) => image.id === over.id)

      const newImages = arrayMove(images, oldIndex, newIndex)
      form.setValue("images", newImages)
    }
  }

  const handleDragCancel = () => {
    setIsDragging(false)
  }

  const handleImageUploaded = (url: string) => {
    const id = `new-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const newImage = {
      id,
      url,
      alt: "",
      featured: images.length === 0, // First image is featured by default
    }

    form.setValue("images", [...images, newImage])
  }

  const handleRemoveImage = (id: string) => {
    const newImages = images.filter((image: any) => image.id !== id)

    // If we removed the featured image, make the first image featured
    if (images.find((image: any) => image.id === id)?.featured && newImages.length > 0) {
      newImages[0].featured = true
    }

    form.setValue("images", newImages)
  }

  const handleSetFeatured = (id: string) => {
    const newImages = images.map((image: any) => ({
      ...image,
      featured: image.id === id,
    }))

    form.setValue("images", newImages)
  }

  const handleAltChange = (id: string, alt: string) => {
    const newImages = images.map((image: any) => (image.id === id ? { ...image, alt } : image))

    form.setValue("images", newImages)
  }

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="images"
        render={() => (
          <FormItem>
            <FormLabel>Product Images</FormLabel>
            <FormDescription>
              Upload images for this product. Drag to reorder. The first image will be the main product image.
            </FormDescription>

            <div className="mt-2">
              <ProductImageUpload onImageUploaded={handleImageUploaded} />

              {images.length > 0 && (
                <div className={cn("mt-4 space-y-2", isDragging && "opacity-75")}>
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    onDragCancel={handleDragCancel}
                  >
                    <SortableContext
                      items={images.map((image: any) => image.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      {images.map((image: any) => (
                        <SortableImage
                          key={image.id}
                          id={image.id}
                          url={image.url}
                          alt={image.alt}
                          featured={image.featured}
                          onRemove={handleRemoveImage}
                          onFeatured={handleSetFeatured}
                          onAltChange={handleAltChange}
                        />
                      ))}
                    </SortableContext>
                  </DndContext>
                </div>
              )}
            </div>

            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
