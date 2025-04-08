"use client"

import { useState } from "react"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ProductFilters() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search products..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-[150px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="electronics">Electronics</SelectItem>
            <SelectItem value="fashion">Fashion</SelectItem>
            <SelectItem value="home">Home & Kitchen</SelectItem>
            <SelectItem value="sports">Sports & Outdoors</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-[150px]">
            <SelectValue placeholder="Vendor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Vendors</SelectItem>
            <SelectItem value="tech-gadgets">Tech Gadgets Store</SelectItem>
            <SelectItem value="fashion-trends">Fashion Trends</SelectItem>
            <SelectItem value="home-essentials">Home Essentials</SelectItem>
            <SelectItem value="outdoor-adventures">Outdoor Adventures</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="out_of_stock">Out of Stock</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-[150px]">
            <SelectValue placeholder="Variants" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Products</SelectItem>
            <SelectItem value="with-variants">With Variants</SelectItem>
            <SelectItem value="without-variants">Without Variants</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="shrink-0">
          Filter
        </Button>
        <Button variant="ghost" className="shrink-0">
          Reset
        </Button>
      </div>
    </div>
  )
}
