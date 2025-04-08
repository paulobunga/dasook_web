"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CategoryFiltersProps {
  onFilterChange?: (filters: {
    search: string
    status: string
    featured: string
  }) => void
}

export function CategoryFilters({ onFilterChange }: CategoryFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [status, setStatus] = useState("all")
  const [featured, setFeatured] = useState("all")

  useEffect(() => {
    if (onFilterChange) {
      onFilterChange({
        search: searchTerm,
        status,
        featured,
      })
    }
  }, [searchTerm, status, featured, onFilterChange])

  const handleReset = () => {
    setSearchTerm("")
    setStatus("all")
    setFeatured("all")
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search categories..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-full sm:w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
        <Select value={featured} onValueChange={setFeatured}>
          <SelectTrigger className="w-full sm:w-[150px]">
            <SelectValue placeholder="Featured" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="not-featured">Not Featured</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="shrink-0">
          Filter
        </Button>
        <Button variant="ghost" className="shrink-0" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </div>
  )
}
