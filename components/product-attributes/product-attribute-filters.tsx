"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProductAttributeFiltersProps {
  onFilterChange?: (filters: {
    search: string
    type: string
    status: string
  }) => void
}

export function ProductAttributeFilters({ onFilterChange }: ProductAttributeFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [type, setType] = useState("all")
  const [status, setStatus] = useState("all")

  useEffect(() => {
    if (onFilterChange) {
      onFilterChange({
        search: searchTerm,
        type,
        status,
      })
    }
  }, [searchTerm, type, status, onFilterChange])

  const handleReset = () => {
    setSearchTerm("")
    setType("all")
    setStatus("all")
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search attributes..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="w-full sm:w-[150px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="select">Select</SelectItem>
            <SelectItem value="text">Text</SelectItem>
            <SelectItem value="number">Number</SelectItem>
          </SelectContent>
        </Select>
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
