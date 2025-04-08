"use client"

import { useState, useEffect } from "react"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CreateCategoryModal } from "./create-category-modal"
import { getParentCategories } from "@/app/actions/category-actions"

export function CategoryOperations() {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [parentCategories, setParentCategories] = useState<{ id: string; name: string }[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadParentCategories() {
      try {
        const data = await getParentCategories()
        setParentCategories(data)
      } catch (error) {
        console.error("Failed to load parent categories:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadParentCategories()
  }, [])

  return (
    <>
      <Button onClick={() => setShowCreateModal(true)} disabled={isLoading}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Category
      </Button>

      <CreateCategoryModal
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        parentCategories={parentCategories}
      />
    </>
  )
}
