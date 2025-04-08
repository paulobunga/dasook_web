import Link from "next/link"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background px-4 md:px-6">
      <div className="mx-auto flex max-w-[600px] flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">404</h1>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Page Not Found</h2>
          <p className="mx-auto max-w-[500px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        <div className="w-full max-w-sm space-y-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for pages..."
              className="w-full appearance-none bg-background pl-8 shadow-none"
            />
          </div>
          <Button asChild className="w-full">
            <Link href="/dashboard">Return to Dashboard</Link>
          </Button>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button variant="link" asChild>
            <Link href="/products">Products</Link>
          </Button>
          <Button variant="link" asChild>
            <Link href="/orders">Orders</Link>
          </Button>
          <Button variant="link" asChild>
            <Link href="/customers">Customers</Link>
          </Button>
          <Button variant="link" asChild>
            <Link href="/vendors">Vendors</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
