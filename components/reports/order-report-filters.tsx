"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"

export function OrderReportFilters() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <DatePickerWithRange className="w-full sm:w-[300px]" />
      <Select defaultValue="all">
        <SelectTrigger className="w-full sm:w-[150px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="processing">Processing</SelectItem>
          <SelectItem value="shipped">Shipped</SelectItem>
          <SelectItem value="delivered">Delivered</SelectItem>
          <SelectItem value="cancelled">Cancelled</SelectItem>
        </SelectContent>
      </Select>
      <Select defaultValue="all">
        <SelectTrigger className="w-full sm:w-[150px]">
          <SelectValue placeholder="Payment" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Payments</SelectItem>
          <SelectItem value="paid">Paid</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="refunded">Refunded</SelectItem>
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
      <Button variant="outline" className="shrink-0">
        Apply Filters
      </Button>
    </div>
  )
}
