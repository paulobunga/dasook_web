import Link from "next/link"
import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ForbiddenPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="flex flex-col items-center max-w-md text-center">
        <div className="bg-yellow-100 p-3 rounded-full mb-4">
          <AlertTriangle className="h-12 w-12 text-yellow-600" />
        </div>
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Access Denied</h1>
        <p className="text-muted-foreground mb-8">
          You don't have permission to access this page. Please contact your administrator if you believe this is an
          error.
        </p>
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/">Go to Homepage</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/login">Login with Different Account</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
