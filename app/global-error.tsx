"use client"

import { useEffect } from "react"
import Link from "next/link"
import { AlertTriangle, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <html lang="en">
      <body>
        <div className="flex h-screen w-full flex-col items-center justify-center bg-background px-4 md:px-6">
          <div className="mx-auto flex max-w-[600px] flex-col items-center justify-center space-y-4 text-center">
            <div className="rounded-full bg-red-100 p-3 dark:bg-red-900/20">
              <AlertTriangle className="h-10 w-10 text-red-600 dark:text-red-400" />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Critical Error</h1>
              <p className="mx-auto max-w-[500px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                We've encountered a critical error. Our team has been automatically notified.
              </p>
              <p className="text-sm text-muted-foreground">Error ID: {error.digest || "unknown"}</p>
            </div>
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
              <Button onClick={() => reset()} className="inline-flex items-center gap-1">
                <RefreshCw className="h-4 w-4" />
                Reload Application
              </Button>
              <Button variant="outline" asChild>
                <Link href="/">Return to Home</Link>
              </Button>
            </div>
            <div className="mt-6 text-center text-sm">
              <p>
                Please contact{" "}
                <a href="mailto:support@example.com" className="font-medium text-primary hover:underline">
                  support@example.com
                </a>{" "}
                with the Error ID above for immediate assistance.
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
