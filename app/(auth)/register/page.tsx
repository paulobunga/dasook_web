"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Apple, ArrowLeft, CheckCircle, Eye, EyeOff } from "lucide-react"
import { FcGoogle } from "react-icons/fc"
import { getSupabaseClient } from "@/lib/supabase"

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [socialLoading, setSocialLoading] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [debugInfo, setDebugInfo] = useState<string | null>(null)
  const router = useRouter()
  const supabase = getSupabaseClient()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setDebugInfo(null)

    // Form validation
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long")
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
          emailRedirectTo: `${window.location.origin}/auth/verify`,
        },
      })

      if (authError) {
        console.error("Auth error:", authError)
        setDebugInfo(JSON.stringify(authError, null, 2))
        throw authError
      }

      if (!authData.user) {
        throw new Error("Failed to create user account")
      }

      // Create a record in the public.users table
      const { error: insertError } = await supabase.from("users").insert({
        id: authData.user.id,
        email: email.toLowerCase(),
        first_name: firstName,
        last_name: lastName,
        role: "customer", // Default role for new registrations
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })

      if (insertError) {
        console.error("Database error:", insertError)
        setDebugInfo(JSON.stringify(insertError, null, 2))

        // Try to clean up the auth user if we can't create the DB record
        await supabase.auth.admin.deleteUser(authData.user.id)

        throw new Error(`Failed to create user profile: ${insertError.message}`)
      }

      setSuccess(true)
    } catch (error: any) {
      console.error("Registration error:", error)
      setError(error.message || "Failed to register. Please try again.")

      if (!error.message && error.toString) {
        setError(error.toString())
      }

      // If we have an empty error object, provide a generic message
      if (JSON.stringify(error) === "{}") {
        setError("An unknown error occurred. Please try again or contact support.")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSocialRegister = async (provider: "google" | "apple") => {
    setSocialLoading(provider)
    setError(null)
    setDebugInfo(null)

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        console.error("Social auth error:", error)
        setDebugInfo(JSON.stringify(error, null, 2))
        throw error
      }

      // If no URL is returned, something went wrong
      if (!data.url) {
        throw new Error("Failed to initiate social login")
      }

      // Redirect to the OAuth provider
      window.location.href = data.url
    } catch (error: any) {
      console.error(`Failed to sign up with ${provider}:`, error)
      setError(error.message || `Failed to sign up with ${provider}`)
      setSocialLoading(null)

      if (!error.message && error.toString) {
        setError(error.toString())
      }

      // If we have an empty error object, provide a generic message
      if (JSON.stringify(error) === "{}") {
        setError(`An unknown error occurred with ${provider} login. Please try again.`)
      }
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="mx-auto max-w-md w-full">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-4">
            <ShoppingCart className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
          <CardDescription>Sign up to start shopping on Dasook</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {debugInfo && (
            <Alert className="mb-4 bg-yellow-50 border-yellow-200">
              <AlertDescription>
                <details>
                  <summary className="cursor-pointer font-medium">Debug Information</summary>
                  <pre className="mt-2 text-xs overflow-auto p-2 bg-black/5 rounded">{debugInfo}</pre>
                </details>
              </AlertDescription>
            </Alert>
          )}

          {success ? (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <CheckCircle className="h-12 w-12 text-green-500" />
              </div>
              <h3 className="text-lg font-medium">Registration Successful</h3>
              <p className="text-muted-foreground">Please check your email to verify your account.</p>
              <Button asChild className="mt-4">
                <Link href="/login">Go to Login</Link>
              </Button>
            </div>
          ) : (
            <>
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pr-10"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or sign up with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  type="button"
                  disabled={!!socialLoading}
                  onClick={() => handleSocialRegister("google")}
                  className="flex items-center justify-center gap-2"
                >
                  <FcGoogle className="h-5 w-5" />
                  <span>Google</span>
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  disabled={!!socialLoading}
                  onClick={() => handleSocialRegister("apple")}
                  className="flex items-center justify-center gap-2"
                >
                  <Apple className="h-5 w-5" />
                  <span>Apple</span>
                </Button>
              </div>
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="link" asChild>
            <Link href="/login" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Already have an account? Sign in
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
