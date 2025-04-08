"use client"

import { useState } from "react"
import { Edit, MoreHorizontal, Trash } from "lucide-react"

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
import { EditProductAttributeModal } from "./edit-product-attribute-modal"
import type { ProductAttribute } from "@/lib/types/product"
import { deleteProductAttribute } from "@/app/actions/product-attribute-actions"

interface ProductAttributesTableProps {
  attributes: ProductAttribute[]
}

export function ProductAttributesTable({ attributes }: ProductAttributesTableProps) {
  const [selectedAttributes, setSelectedAttributes] = useState<string[]>([])
  const [deleteAttributeId, setDeleteAttributeId] = useState<string | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [editAttribute, setEditAttribute] = useState<ProductAttribute | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const { toast } = useToast()

  const toggleAttributeSelection = (attributeId: string) => {
    setSelectedAttributes((current) =>
      current.includes(attributeId) ? current.filter((id) => id !== attributeId) : [...current, attributeId],
    )
  }

  const toggleAllAttributes = () => {
    if (selectedAttributes.length === attributes.length) {
      setSelectedAttributes([])
    } else {
      setSelectedAttributes(attributes.map((attribute) => attribute.id))
    }
  }

  const handleDeleteClick = (attributeId: string) => {
    setDeleteAttributeId(attributeId)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (deleteAttributeId) {
      try {
        await deleteProductAttribute(deleteAttributeId)
        toast({
          title: "Attribute deleted",
          description: `Attribute has been deleted successfully.`,
        })
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Failed to delete attribute",
          variant: "destructive",
        })
      } finally {
        setIsDeleteDialogOpen(false)
        setDeleteAttributeId(null)
      }
    }
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedAttributes.length === attributes.length && attributes.length > 0}
                  onCheckedChange={toggleAllAttributes}
                  aria-label="Select all attributes"
                />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Values</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attributes.map((attribute) => (
              <TableRow key={attribute.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedAttributes.includes(attribute.id)}
                    onCheckedChange={() => toggleAttributeSelection(attribute.id)}
                    aria-label={`Select ${attribute.name}`}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{attribute.name}</span>
                    <span className="text-xs text-muted-foreground">{attribute.id}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {attribute.values.length > 0 ? (
                      attribute.values.map((value, index) => (
                        <Badge key={index} variant="outline">
                          {value}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-muted-foreground">
                        {attribute.type === "number" ? "Numeric value" : "Text value"}
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{attribute.type}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={attribute.status === "active" ? "success" : "secondary"}>{attribute.status}</Badge>
                </TableCell>
                <TableCell>{attribute.created_at}</TableCell>
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
                      <DropdownMenuItem onClick={() => setEditAttribute(attribute)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteClick(attribute.id)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the attribute.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <EditProductAttributeModal open={isEditModalOpen} onOpenChange={setIsEditModalOpen} attribute={editAttribute} />
    </>
  )
}
