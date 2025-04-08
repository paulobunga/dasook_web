"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ShoppingCart, AlertTriangle, ArrowLeft } from "lucide-react"

export default function AuthErrorPage() {
  const [errorMessage, setErrorMessage] = useState<string>("An authentication error occurred")
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const message = searchParams.get("message")
    if (message) {
      setErrorMessage(decodeURIComponent(message))
    }
  }, [searchParams])

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="mx-auto max-w-md w-full">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-4">
            <ShoppingCart className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Authentication Error</CardTitle>
          <CardDescription>There was a problem with your authentication</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-4 pt-4">
          <AlertTriangle className="h-12 w-12 text-destructive" />
          <Alert variant="destructive" className="mt-4">
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
          <p className="text-center text-sm text-muted-foreground mt-2">
            Please try again or contact support if the problem persists.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button variant="outline" asChild>
            <Link href="/login" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Login
            </Link>
          </Button>
          <Button onClick={() => router.push("/")}>Go to Homepage</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
