"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ShoppingCart, CheckCircle, XCircle, Loader2 } from "lucide-react"
import { getSupabaseClient } from "@/lib/supabase"

export default function VerifyEmailPage() {
  const [verificationStatus, setVerificationStatus] = useState<"loading" | "success" | "error">("loading")
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = getSupabaseClient()

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Check if we have a session
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session) {
          // User is authenticated, verification was successful
          setVerificationStatus("success")

          // Redirect after 3 seconds
          setTimeout(() => {
            router.push("/account")
          }, 3000)
        } else {
          // No session, check if we have a token in the URL
          const token = searchParams.get("token")
          const type = searchParams.get("type")

          if (token && type === "signup") {
            // Try to exchange the token for a session
            const { error } = await supabase.auth.verifyOtp({
              token_hash: token,
              type: "signup",
            })

            if (error) {
              throw error
            }

            setVerificationStatus("success")

            // Redirect after 3 seconds
            setTimeout(() => {
              router.push("/login")
            }, 3000)
          } else {
            setVerificationStatus("error")
            setError("Invalid verification link")
          }
        }
      } catch (error: any) {
        setVerificationStatus("error")
        setError(error.message || "Failed to verify email")
      }
    }

    verifyEmail()
  }, [router, searchParams, supabase.auth])

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="mx-auto max-w-md w-full">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-4">
            <ShoppingCart className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Email Verification</CardTitle>
          <CardDescription>
            {verificationStatus === "loading"
              ? "Verifying your email address..."
              : verificationStatus === "success"
                ? "Your email has been verified"
                : "Email verification failed"}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-4 pt-4">
          {verificationStatus === "loading" && <Loader2 className="h-12 w-12 animate-spin text-primary" />}

          {verificationStatus === "success" && (
            <>
              <CheckCircle className="h-12 w-12 text-green-500" />
              <div className="text-center">
                <h3 className="text-lg font-medium">Verification Successful</h3>
                <p className="text-muted-foreground mt-1">
                  Your email has been verified. You will be redirected shortly.
                </p>
              </div>
            </>
          )}

          {verificationStatus === "error" && (
            <>
              <XCircle className="h-12 w-12 text-destructive" />
              <div className="text-center">
                <h3 className="text-lg font-medium">Verification Failed</h3>
                {error && (
                  <Alert variant="destructive" className="mt-4">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              </div>
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="link" asChild>
            <Link href="/login">Go to Login</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
