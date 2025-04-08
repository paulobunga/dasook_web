import { Button } from "@/components/ui/button"
import { ReviewsTable } from "@/components/customers/reviews-table"
import { ReviewFilters } from "@/components/customers/review-filters"

export default function CustomerReviewsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customer Reviews</h1>
          <p className="text-muted-foreground">Manage product reviews from customers</p>
        </div>
        <Button variant="outline">Export Reviews</Button>
      </div>
      <ReviewFilters />
      <ReviewsTable />
    </div>
  )
}
