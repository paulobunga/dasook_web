"use client"

import { useEffect, useState } from "react"
import { getSupabaseClient } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertTriangle } from "lucide-react"

export default function AccountPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = getSupabaseClient()

  useEffect(() => {
    async function loadUser() {
      setLoading(true)
      setError(null)

      if (!supabase) {
        setError("Unable to connect to the database. Please try again later.")
        setLoading(false)
        return
      }

      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession()

        if (sessionError) {
          throw new Error("Failed to get session: " + sessionError.message)
        }

        if (!session?.user) {
          router.push("/login")
          return
        }

        // Check if user exists in public.users table
        const { data, error } = await supabase.from("users").select("*").eq("email", session.user.email).single()

        if (error) {
          // Create user in public.users table if they don't exist
          const { error: insertError } = await supabase.from("users").insert({
            id: session.user.id,
            email: session.user.email,
            first_name:
              session.user.user_metadata.first_name || session.user.user_metadata.full_name?.split(" ")[0] || "User",
            last_name:
              session.user.user_metadata.last_name ||
              session.user.user_metadata.full_name?.split(" ").slice(1).join(" ") ||
              "",
            role: "customer", // Default role
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })

          if (insertError) {
            throw new Error("Failed to create user profile: " + insertError.message)
          }

          // Fetch the newly created user
          const { data: newUser, error: fetchError } = await supabase
            .from("users")
            .select("*")
            .eq("email", session.user.email)
            .single()

          if (fetchError) {
            throw new Error("Failed to fetch user after creation: " + fetchError.message)
          }

          setUser(newUser)
        } else {
          setUser(data)
        }
      } catch (err: any) {
        console.error("Error loading user:", err)
        setError(err.message || "Failed to load user data")
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [supabase, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading your account...</span>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Customer Account</CardTitle>
          <CardDescription>Welcome to your Dasook account dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTriangle className="h-4 w-4 mr-2" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {user ? (
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Account Information</h3>
                <p>
                  Name: {user.first_name} {user.last_name}
                </p>
                <p>Email: {user.email}</p>
                <p>Role: {user.role}</p>
              </div>
            </div>
          ) : (
            <p>No user information available. Please try signing in again.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
