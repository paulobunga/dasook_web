"use client"

import { useState, useEffect } from "react"
import { MoreHorizontal, ArrowUpDown, Edit, Trash2, Eye } from "lucide-react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ViewCategoryModal } from "./view-category-modal"
import { EditCategoryModal } from "./edit-category-modal"
import { DeleteCategoryDialog } from "./delete-category-dialog"
import { getCategories, getParentCategories } from "@/app/actions/category-actions"
import type { Category } from "@/lib/types/category"
import { Skeleton } from "@/components/ui/skeleton"

export function CategoriesTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [viewCategory, setViewCategory] = useState<Category | null>(null)
  const [editCategory, setEditCategory] = useState<Category | null>(null)
  const [deleteCategory, setDeleteCategory] = useState<Category | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [parentCategories, setParentCategories] = useState<{ id: string; name: string }[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [parentCategoryMap, setParentCategoryMap] = useState<Record<string, Category>>({})

  useEffect(() => {
    async function loadData() {
      setIsLoading(true)
      try {
        const [categoriesData, parentCategoriesData] = await Promise.all([getCategories(), getParentCategories()])

        setCategories(categoriesData)
        setParentCategories(parentCategoriesData)

        // Create a map of parent categories for quick lookup
        const parentMap: Record<string, Category> = {}
        categoriesData.forEach((category) => {
          if (!category.parent_id) {
            parentMap[category.id] = category
          }
        })
        setParentCategoryMap(parentMap)
      } catch (error) {
        console.error("Failed to load categories:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  const columns: ColumnDef<Category>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <img
              src={row.original.image_url || "/placeholder.svg?height=40&width=40"}
              alt={row.original.name}
              className="h-8 w-8 rounded-md object-cover"
            />
            <div>
              <div className="font-medium">{row.getValue("name")}</div>
              {row.original.parent_id && (
                <div className="text-xs text-muted-foreground">
                  Subcategory of {categories.find((c) => c.id === row.original.parent_id)?.name}
                </div>
              )}
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: "products_count",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Products
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        return <div className="text-center font-medium">{row.getValue("products_count")}</div>
      },
    },
    {
      accessorKey: "is_active",
      header: "Status",
      cell: ({ row }) => {
        return row.original.is_active ? (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Active
          </Badge>
        ) : (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Inactive
          </Badge>
        )
      },
    },
    {
      accessorKey: "updated_at",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Last Updated
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        return <div>{new Date(row.getValue("updated_at")).toLocaleDateString()}</div>
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const category = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setViewCategory(category)}>
                <Eye className="mr-2 h-4 w-4" />
                View details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setEditCategory(category)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setDeleteCategory(category)} className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const table = useReactTable({
    data: categories,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  if (isLoading) {
    return <CategoriesTableSkeleton />
  }

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No categories found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
          selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>

      {/* View Category Modal */}
      {viewCategory && (
        <ViewCategoryModal
          category={viewCategory}
          parentCategory={
            viewCategory.parent_id ? categories.find((c) => c.id === viewCategory.parent_id) || null : null
          }
          open={!!viewCategory}
          onOpenChange={(open) => !open && setViewCategory(null)}
        />
      )}

      {/* Edit Category Modal */}
      {editCategory && (
        <EditCategoryModal
          category={editCategory}
          open={!!editCategory}
          onOpenChange={(open) => !open && setEditCategory(null)}
          parentCategories={parentCategories}
        />
      )}

      {/* Delete Category Dialog */}
      {deleteCategory && (
        <DeleteCategoryDialog
          category={deleteCategory}
          open={!!deleteCategory}
          onOpenChange={(open) => !open && setDeleteCategory(null)}
        />
      )}
    </div>
  )
}

function CategoriesTableSkeleton() {
  return (
    <div className="rounded-md border">
      <div className="h-12 border-b px-6 py-3">
        <Skeleton className="h-6 w-full" />
      </div>
      <div className="p-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="mb-4 flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-md" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>
    </div>
  )
}
