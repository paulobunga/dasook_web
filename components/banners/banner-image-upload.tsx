"use client"

import type React from "react"

import { useState, useRef, type ChangeEvent } from "react"
import { Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface BannerImageUploadProps {
  defaultImage?: string
  onImageChange: (file: File | null) => void
}

export function BannerImageUpload({ defaultImage, onImageChange }: BannerImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(defaultImage || null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      onImageChange(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files?.length) {
      const file = e.dataTransfer.files[0]
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      onImageChange(file)
    }
  }

  const clearImage = () => {
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    onImageChange(null)
  }

  return (
    <div className="space-y-2">
      <div
        className={`relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-4 transition-colors ${
          isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        {preview ? (
          <div className="relative h-full w-full">
            <Image
              src={preview || "/placeholder.svg"}
              alt="Banner preview"
              className="mx-auto max-h-[180px] w-auto object-contain"
              width={300}
              height={150}
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute right-2 top-2 h-6 w-6"
              onClick={(e) => {
                e.stopPropagation()
                clearImage()
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <>
            <Upload className="mb-2 h-10 w-10 text-muted-foreground" />
            <p className="mb-1 text-sm font-medium">Drag and drop or click to upload</p>
            <p className="text-xs text-muted-foreground">Recommended size: 1200 x 400px. Max 5MB.</p>
          </>
        )}
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
      </div>
    </div>
  )
}
