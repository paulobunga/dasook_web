"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"

export function SalesReportFilters() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <DatePickerWithRange className="w-full sm:w-[300px]" />
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
      <Select defaultValue="daily">
        <SelectTrigger className="w-full sm:w-[150px]">
          <SelectValue placeholder="Interval" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="daily">Daily</SelectItem>
          <SelectItem value="weekly">Weekly</SelectItem>
          <SelectItem value="monthly">Monthly</SelectItem>
          <SelectItem value="yearly">Yearly</SelectItem>
        </SelectContent>
      </Select>
      <Button variant="outline" className="shrink-0">
        Apply Filters
      </Button>
    </div>
  )
}
