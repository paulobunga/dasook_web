"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Upload } from "lucide-react"
import { uploadProductImage } from "@/app/actions/product-actions"

interface ProductImageUploadProps {
  onImageUploaded: (url: string) => void
  className?: string
}

export function ProductImageUpload({ onImageUploaded, className }: ProductImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return

      setIsUploading(true)
      setUploadProgress(0)
      setError(null)

      try {
        // Simulate upload progress
        const progressInterval = setInterval(() => {
          setUploadProgress((prev) => {
            if (prev >= 90) {
              clearInterval(progressInterval)
              return prev
            }
            return prev + 10
          })
        }, 300)

        const file = acceptedFiles[0]
        const url = await uploadProductImage(file)

        clearInterval(progressInterval)
        setUploadProgress(100)
        onImageUploaded(url)
      } catch (err) {
        setError("Failed to upload image. Please try again.")
        console.error("Upload error:", err)
      } finally {
        setIsUploading(false)
      }
    },
    [onImageUploaded],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: false,
  })

  return (
    <div className={className}>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-2">
          <Upload className="h-8 w-8 text-muted-foreground" />
          <div className="text-sm font-medium">
            {isDragActive ? "Drop the image here" : "Drag & drop an image here, or click to select"}
          </div>
          <p className="text-xs text-muted-foreground">PNG, JPG, GIF or WEBP (max. 5MB)</p>
          {isUploading && (
            <div className="w-full mt-2">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Uploading... {uploadProgress}%</p>
            </div>
          )}
          {error && <p className="text-xs text-destructive mt-1">{error}</p>}
        </div>
      </div>
    </div>
  )
}
