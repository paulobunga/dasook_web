"use client"

import { useState, useEffect } from "react"
import type { UseFormReturn } from "react-hook-form"
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Plus, Trash, X } from "lucide-react"
import type { ProductAttribute } from "@/lib/types/product"

interface ProductVariantsProps {
  form: UseFormReturn<any>
  availableAttributes: ProductAttribute[]
}

export function ProductVariants({ form, availableAttributes }: ProductVariantsProps) {
  const [attributeDialogOpen, setAttributeDialogOpen] = useState(false)
  const [newAttributeName, setNewAttributeName] = useState("")
  const [newAttributeValues, setNewAttributeValues] = useState("")
  const [editingAttributeId, setEditingAttributeId] = useState<string | null>(null)
  const [generateDialogOpen, setGenerateDialogOpen] = useState(false)
  const [selectedAttributeId, setSelectedAttributeId] = useState<string>("")

  const hasVariants = form.watch("hasVariants")
  const attributes = form.watch("attributes") || []
  const variants = form.watch("variants") || []

  // Generate variants when attributes change
  useEffect(() => {
    if (!hasVariants || attributes.length === 0) return

    // Only auto-generate if there are no variants yet
    if (variants.length === 0 && attributes.length > 0) {
      handleGenerateVariants()
    }
  }, [hasVariants, attributes])

  const handleAddAttribute = () => {
    if (selectedAttributeId) {
      // Add from available attributes
      const selectedAttribute = availableAttributes.find((attr) => attr.id === selectedAttributeId)
      if (!selectedAttribute) return

      // Check if this attribute is already added
      if (attributes.some((attr) => attr.id === selectedAttribute.id)) {
        setSelectedAttributeId("")
        setAttributeDialogOpen(false)
        return
      }

      const newAttribute = {
        id: selectedAttribute.id,
        name: selectedAttribute.name,
        values: selectedAttribute.values,
      }

      form.setValue("attributes", [...attributes, newAttribute])
      setSelectedAttributeId("")
    } else if (newAttributeName && newAttributeValues) {
      // Add custom attribute
      const values = newAttributeValues
        .split(",")
        .map((value) => value.trim())
        .filter((value) => value)

      if (values.length === 0) return

      const newAttribute = {
        id: editingAttributeId || `attr-${Date.now()}`,
        name: newAttributeName.trim(),
        values,
      }

      if (editingAttributeId) {
        // Update existing attribute
        const newAttributes = attributes.map((attr) => (attr.id === editingAttributeId ? newAttribute : attr))
        form.setValue("attributes", newAttributes)
      } else {
        // Add new attribute
        form.setValue("attributes", [...attributes, newAttribute])
      }

      // Reset form
      setNewAttributeName("")
      setNewAttributeValues("")
    }

    setEditingAttributeId(null)
    setAttributeDialogOpen(false)
  }

  const handleEditAttribute = (attributeId: string) => {
    const attribute = attributes.find((attr) => attr.id === attributeId)
    if (!attribute) return

    setEditingAttributeId(attributeId)
    setNewAttributeName(attribute.name)
    setNewAttributeValues(attribute.values.join(", "))
    setAttributeDialogOpen(true)
  }

  const handleDeleteAttribute = (attributeId: string) => {
    const newAttributes = attributes.filter((attr) => attr.id !== attributeId)
    form.setValue("attributes", newAttributes)

    // If we delete an attribute, we need to regenerate variants
    if (hasVariants && newAttributes.length > 0) {
      handleGenerateVariants(newAttributes)
    } else if (newAttributes.length === 0) {
      form.setValue("variants", [])
    }
  }

  // Generate all possible combinations of attribute values
  const generateCombinations = (attrs: any[]) => {
    if (attrs.length === 0) return []

    const combinations: Record<string, string>[] = []

    function generate(index: number, current: Record<string, string>) {
      if (index === attrs.length) {
        combinations.push({ ...current })
        return
      }

      const attributeData = attrs[index]

      for (const value of attributeData.values) {
        current[attributeData.id] = value
        generate(index + 1, current)
      }
    }

    generate(0, {})
    return combinations
  }

  const handleGenerateVariants = (customAttributes?: any[]) => {
    const attrsToUse = customAttributes || attributes
    if (!hasVariants || attrsToUse.length === 0) return

    const combinations = generateCombinations(attrsToUse)

    // Create variants from combinations
    const newVariants = combinations.map((combination) => {
      // Check if this variant already exists
      const existingVariant = variants.find((v) => {
        return Object.keys(combination).every((attrId) => v.attributeValues[attrId] === combination[attrId])
      })

      if (existingVariant) {
        return existingVariant
      }

      // Create a new variant
      const variantId = `var-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      return {
        id: variantId,
        attributeValues: combination,
        sku: "",
        regularPrice: form.watch("regularPrice") || "",
        salePrice: form.watch("salePrice") || "",
        stockQuantity: form.watch("stockQuantity") || "",
        image: "",
      }
    })

    form.setValue("variants", newVariants)
    setGenerateDialogOpen(false)
  }

  const handleDeleteVariant = (variantId: string) => {
    const newVariants = variants.filter((v) => v.id !== variantId)
    form.setValue("variants", newVariants)
  }

  const getAttributeNameById = (attributeId: string) => {
    const attribute = attributes.find((attr) => attr.id === attributeId)
    return attribute ? attribute.name : attributeId
  }

  const renderVariantName = (variant: any) => {
    return Object.entries(variant.attributeValues)
      .map(([attrId, value]) => `${getAttributeNameById(attrId)}: ${value}`)
      .join(" / ")
  }

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="hasVariants"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">This product has multiple variants</FormLabel>
              <FormDescription>
                Enable this if the product comes in different options, like size or color.
              </FormDescription>
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />

      {hasVariants && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Product Attributes</CardTitle>
              <CardDescription>
                Define attributes like color, size, material, etc. that will be used to create variants.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {attributes.length > 0 ? (
                <div className="space-y-4">
                  {attributes.map((attribute) => (
                    <div key={attribute.id} className="flex items-center justify-between rounded-lg border p-3">
                      <div>
                        <h4 className="font-medium">{attribute.name}</h4>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {attribute.values.map((value: string) => (
                            <Badge key={value} variant="secondary">
                              {value}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditAttribute(attribute.id)}
                        >
                          Edit
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button type="button" variant="ghost" size="sm" className="text-destructive">
                              <Trash className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Attribute</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this attribute? This will also update all variants.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteAttribute(attribute.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border border-dashed p-8 text-center">
                  <h3 className="text-lg font-medium">No attributes defined</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Add attributes like color, size, or material to create product variants.
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Dialog open={attributeDialogOpen} onOpenChange={setAttributeDialogOpen}>
                <DialogTrigger asChild>
                  <Button type="button" variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Attribute
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingAttributeId ? "Edit Attribute" : "Add Attribute"}</DialogTitle>
                    <DialogDescription>Define an attribute and its possible values.</DialogDescription>
                  </DialogHeader>

                  <div className="grid gap-4 py-4">
                    {!editingAttributeId && availableAttributes.length > 0 && (
                      <div className="grid gap-2">
                        <label htmlFor="attribute-select" className="text-sm font-medium">
                          Select Existing Attribute
                        </label>
                        <select
                          id="attribute-select"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          value={selectedAttributeId}
                          onChange={(e) => setSelectedAttributeId(e.target.value)}
                        >
                          <option value="">-- Create custom attribute --</option>
                          {availableAttributes
                            .filter((attr) => !attributes.some((a) => a.id === attr.id))
                            .map((attr) => (
                              <option key={attr.id} value={attr.id}>
                                {attr.name} ({attr.values.join(", ")})
                              </option>
                            ))}
                        </select>
                      </div>
                    )}

                    {(!selectedAttributeId || editingAttributeId) && (
                      <>
                        <div className="grid gap-2">
                          <label htmlFor="attribute-name" className="text-sm font-medium">
                            Attribute Name
                          </label>
                          <Input
                            id="attribute-name"
                            placeholder="e.g., Color, Size, Material"
                            value={newAttributeName}
                            onChange={(e) => setNewAttributeName(e.target.value)}
                          />
                        </div>

                        <div className="grid gap-2">
                          <label htmlFor="attribute-values" className="text-sm font-medium">
                            Attribute Values
                          </label>
                          <Input
                            id="attribute-values"
                            placeholder="e.g., Red, Blue, Green (comma separated)"
                            value={newAttributeValues}
                            onChange={(e) => setNewAttributeValues(e.target.value)}
                          />
                          <p className="text-xs text-muted-foreground">Enter values separated by commas.</p>
                        </div>
                      </>
                    )}
                  </div>

                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setAttributeDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="button" onClick={handleAddAttribute}>
                      {editingAttributeId ? "Update" : "Add"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {attributes.length > 0 && (
                <Dialog open={generateDialogOpen} onOpenChange={setGenerateDialogOpen}>
                  <DialogTrigger asChild>
                    <Button type="button">Generate Variants</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Generate Variants</DialogTitle>
                      <DialogDescription>
                        This will create all possible combinations of your attributes.
                        {variants.length > 0 && " Existing variants will be preserved."}
                      </DialogDescription>
                    </DialogHeader>

                    <div className="py-4">
                      <p className="text-sm">Based on your attributes, the following variants will be generated:</p>
                      <ul className="mt-2 list-disc pl-5 text-sm">
                        {generateCombinations(attributes).map((combination, index) => (
                          <li key={index} className="text-muted-foreground">
                            {Object.entries(combination)
                              .map(([attrId, value]) => `${getAttributeNameById(attrId)}: ${value}`)
                              .join(" / ")}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setGenerateDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="button" onClick={() => handleGenerateVariants()}>
                        Generate
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </CardFooter>
          </Card>

          {variants.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Product Variants</CardTitle>
                <CardDescription>Manage the variants of this product.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Variant</TableHead>
                        <TableHead>SKU</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Sale Price</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead className="w-12"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {variants.map((variant) => (
                        <TableRow key={variant.id}>
                          <TableCell>{renderVariantName(variant)}</TableCell>
                          <TableCell>
                            <Input
                              value={variant.sku}
                              onChange={(e) => {
                                const newVariants = variants.map((v) =>
                                  v.id === variant.id ? { ...v, sku: e.target.value } : v,
                                )
                                form.setValue("variants", newVariants)
                              }}
                              className="h-8 w-full"
                              placeholder="SKU"
                            />
                          </TableCell>
                          <TableCell>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                                <span className="text-gray-500 text-xs">$</span>
                              </div>
                              <Input
                                value={variant.regularPrice}
                                onChange={(e) => {
                                  const newVariants = variants.map((v) =>
                                    v.id === variant.id ? { ...v, regularPrice: e.target.value } : v,
                                  )
                                  form.setValue("variants", newVariants)
                                }}
                                className="h-8 w-full pl-5"
                                placeholder="0.00"
                              />
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                                <span className="text-gray-500 text-xs">$</span>
                              </div>
                              <Input
                                value={variant.salePrice}
                                onChange={(e) => {
                                  const newVariants = variants.map((v) =>
                                    v.id === variant.id ? { ...v, salePrice: e.target.value } : v,
                                  )
                                  form.setValue("variants", newVariants)
                                }}
                                className="h-8 w-full pl-5"
                                placeholder="0.00"
                              />
                            </div>
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              value={variant.stockQuantity}
                              onChange={(e) => {
                                const newVariants = variants.map((v) =>
                                  v.id === variant.id ? { ...v, stockQuantity: e.target.value } : v,
                                )
                                form.setValue("variants", newVariants)
                              }}
                              className="h-8 w-full"
                              placeholder="0"
                            />
                          </TableCell>
                          <TableCell>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteVariant(variant.id)}
                              className="h-8 w-8"
                            >
                              <X className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  )
}
