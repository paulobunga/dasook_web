"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { getSupabaseClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Apple } from "lucide-react"
import { FcGoogle } from "react-icons/fc"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [socialLoading, setSocialLoading] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const nextPath = searchParams.get("next") || ""
  const supabase = getSupabaseClient()

  useEffect(() => {
    // Check if user is already logged in
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (session) {
        // Get user role
        const { data } = await supabase.from("users").select("role").eq("email", session.user.email).single()

        if (data) {
          // Redirect based on role
          if (data.role === "admin" || data.role === "vendor") {
            router.push("/dashboard")
          } else if (data.role === "customer") {
            router.push("/account")
          }
        }
      }
    }

    checkSession()
  }, [supabase, router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        throw error
      }

      if (data.user) {
        // Fetch user role from public.users table
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("role")
          .eq("email", data.user.email)
          .single()

        if (userError) {
          // Create user in public.users table if they don't exist
          const { error: insertError } = await supabase.from("users").insert({
            id: data.user.id,
            email: data.user.email,
            first_name: data.user.user_metadata.first_name || "User",
            last_name: data.user.user_metadata.last_name || "",
            role: "customer", // Default role
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })

          if (insertError) {
            throw new Error("Failed to create user profile")
          }

          // Redirect to account page for new users
          router.push(nextPath || "/account")
          return
        }

        // Redirect based on role
        if (userData.role === "admin" || userData.role === "vendor") {
          router.push(nextPath || "/dashboard")
        } else if (userData.role === "customer") {
          router.push(nextPath || "/account") // Customer dashboard
        } else {
          router.push(nextPath || "/") // Default redirect
        }
      }
    } catch (error: any) {
      setError(error.message || "Failed to sign in")
    } finally {
      setLoading(false)
    }
  }

  const handleSocialLogin = async (provider: "google" | "apple") => {
    setSocialLoading(provider)
    setError(null)

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback${nextPath ? `?next=${encodeURIComponent(nextPath)}` : ""}`,
        },
      })

      if (error) {
        throw error
      }
    } catch (error: any) {
      setError(error.message || `Failed to sign in with ${provider}`)
      setSocialLoading(null)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="mx-auto max-w-md w-full">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-4">
            <ShoppingCart className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Login to Dasook</CardTitle>
          <CardDescription>Enter your email and password to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
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
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign in with Email"}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              type="button"
              disabled={!!socialLoading}
              onClick={() => handleSocialLogin("google")}
              className="flex items-center justify-center gap-2"
            >
              <FcGoogle className="h-5 w-5" />
              <span>Google</span>
            </Button>
            <Button
              variant="outline"
              type="button"
              disabled={!!socialLoading}
              onClick={() => handleSocialLogin("apple")}
              className="flex items-center justify-center gap-2"
            >
              <Apple className="h-5 w-5" />
              <span>Apple</span>
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
          <div className="text-center text-xs text-muted-foreground">
            <p>Demo Accounts:</p>
            <p>Admin: admin@dasook.com / 7foldQibei</p>
            <p>Vendor: vendor@dasook.com / 7foldQibei</p>
            <p>Customer: customer@dasook.com / 7foldQibei</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
