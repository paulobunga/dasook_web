"use client"

import { useState } from "react"
import Link from "next/link"
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

const attributes = [
  {
    id: "ATTR-1001",
    name: "Color",
    values: ["Red", "Blue", "Green", "Black", "White"],
    type: "select",
    status: "active",
    products: 156,
    created: "2023-01-15",
  },
  {
    id: "ATTR-1002",
    name: "Size",
    values: ["S", "M", "L", "XL", "XXL"],
    type: "select",
    status: "active",
    products: 142,
    created: "2023-01-15",
  },
  {
    id: "ATTR-1003",
    name: "Material",
    values: ["Cotton", "Polyester", "Leather", "Wool", "Silk"],
    type: "select",
    status: "active",
    products: 89,
    created: "2023-01-16",
  },
  {
    id: "ATTR-1004",
    name: "Storage",
    values: ["64GB", "128GB", "256GB", "512GB", "1TB"],
    type: "select",
    status: "active",
    products: 45,
    created: "2023-01-18",
  },
  {
    id: "ATTR-1005",
    name: "RAM",
    values: ["4GB", "8GB", "16GB", "32GB"],
    type: "select",
    status: "active",
    products: 42,
    created: "2023-01-18",
  },
  {
    id: "ATTR-1006",
    name: "Weight",
    values: [],
    type: "number",
    status: "active",
    products: 67,
    created: "2023-01-20",
  },
  {
    id: "ATTR-1007",
    name: "Dimensions",
    values: [],
    type: "text",
    status: "active",
    products: 58,
    created: "2023-01-22",
  },
  {
    id: "ATTR-1008",
    name: "Season",
    values: ["Spring", "Summer", "Fall", "Winter"],
    type: "select",
    status: "inactive",
    products: 23,
    created: "2023-01-25",
  },
]

export function AttributesTable() {
  const [selectedAttributes, setSelectedAttributes] = useState<string[]>([])
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

  const handleDelete = (attributeId: string) => {
    toast({
      title: "Attribute deleted",
      description: `Attribute ${attributeId} has been deleted.`,
    })
  }

  return (
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
            <TableHead>Products</TableHead>
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
              <TableCell>{attribute.products}</TableCell>
              <TableCell>{attribute.created}</TableCell>
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
                    <DropdownMenuItem asChild>
                      <Link href={`/product-attributes/${attribute.id}`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDelete(attribute.id)}
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
  )
}
