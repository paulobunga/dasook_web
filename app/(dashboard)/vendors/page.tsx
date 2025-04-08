import Link from "next/link"
import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { VendorsTable } from "@/components/vendors/vendors-table"
import { VendorFilters } from "@/components/vendors/vendor-filters"

export default function VendorsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Vendors</h1>
          <p className="text-muted-foreground">Manage your marketplace vendors</p>
        </div>
        <Button asChild>
          <Link href="/vendors/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Vendor
          </Link>
        </Button>
      </div>
      <VendorFilters />
      <VendorsTable />
    </div>
  )
}
