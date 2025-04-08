"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getSupabaseClient } from "@/lib/supabase"
import type { Session, User } from "@supabase/supabase-js"

export type UserRole = "admin" | "vendor" | "customer" | "guest"

interface UserData {
  id: string
  email: string
  first_name: string
  last_name: string
  role: UserRole
}

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [role, setRole] = useState<UserRole>("guest")
  const router = useRouter()

  // Initialize Supabase client inside the hook to ensure it's available
  const supabase = getSupabaseClient()

  useEffect(() => {
    // Get the current session
    const getSession = async () => {
      setLoading(true)
      try {
        // Check if supabase client is available
        if (!supabase) {
          console.error("Supabase client is not available")
          setRole("guest")
          setLoading(false)
          return
        }

        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession()

        if (sessionError) {
          console.error("Session error:", sessionError)
          setRole("guest")
          setLoading(false)
          return
        }

        setSession(session)
        setUser(session?.user ?? null)

        if (session?.user) {
          try {
            // Fetch user data from public.users table
            const { data, error } = await supabase
              .from("users")
              .select("id, email, first_name, last_name, role")
              .eq("email", session.user.email)
              .single()

            if (data && !error) {
              setUserData(data as UserData)
              setRole(data.role as UserRole)
            } else {
              // If user exists in auth but not in public.users, create them
              if (error && error.code === "PGRST116") {
                // Record not found
                try {
                  // Create user in public.users table
                  const { error: insertError } = await supabase.from("users").insert({
                    id: session.user.id,
                    email: session.user.email,
                    first_name:
                      session.user.user_metadata.first_name ||
                      session.user.user_metadata.full_name?.split(" ")[0] ||
                      "User",
                    last_name:
                      session.user.user_metadata.last_name ||
                      session.user.user_metadata.full_name?.split(" ").slice(1).join(" ") ||
                      "",
                    role: "customer", // Default role
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                  })

                  if (!insertError) {
                    // Fetch the newly created user
                    const { data: newUserData } = await supabase
                      .from("users")
                      .select("id, email, first_name, last_name, role")
                      .eq("email", session.user.email)
                      .single()

                    if (newUserData) {
                      setUserData(newUserData as UserData)
                      setRole(newUserData.role as UserRole)
                    } else {
                      setRole("guest")
                    }
                  } else {
                    console.error("Error creating user:", insertError)
                    setRole("guest")
                  }
                } catch (err) {
                  console.error("Error in user creation:", err)
                  setRole("guest")
                }
              } else {
                console.error("Error fetching user data:", error)
                setRole("guest")
              }
            }
          } catch (userError) {
            console.error("Error processing user data:", userError)
            setRole("guest")
          }
        } else {
          // No session means guest
          setRole("guest")
        }
      } catch (error) {
        console.error("Error in getSession:", error)
        setRole("guest")
      } finally {
        setLoading(false)
      }
    }

    getSession()

    // Set up auth state change listener
    let subscription: { unsubscribe: () => void } | null = null

    try {
      const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
        console.log("Auth state changed:", event, session?.user?.email)
        setSession(session)
        setUser(session?.user ?? null)

        if (session?.user) {
          try {
            // Fetch user data from public.users table
            const { data, error } = await supabase
              .from("users")
              .select("id, email, first_name, last_name, role")
              .eq("email", session.user.email)
              .single()

            if (data && !error) {
              setUserData(data as UserData)
              setRole(data.role as UserRole)
            } else {
              // If user exists in auth but not in public.users, create them
              if (error && error.code === "PGRST116") {
                // Record not found
                try {
                  // Create user in public.users table
                  const { error: insertError } = await supabase.from("users").insert({
                    id: session.user.id,
                    email: session.user.email,
                    first_name:
                      session.user.user_metadata.first_name ||
                      session.user.user_metadata.full_name?.split(" ")[0] ||
                      "User",
                    last_name:
                      session.user.user_metadata.last_name ||
                      session.user.user_metadata.full_name?.split(" ").slice(1).join(" ") ||
                      "",
                    role: "customer", // Default role
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                  })

                  if (!insertError) {
                    // Fetch the newly created user
                    const { data: newUserData } = await supabase
                      .from("users")
                      .select("id, email, first_name, last_name, role")
                      .eq("email", session.user.email)
                      .single()

                    if (newUserData) {
                      setUserData(newUserData as UserData)
                      setRole(newUserData.role as UserRole)
                    } else {
                      setRole("guest")
                    }
                  } else {
                    console.error("Error creating user:", insertError)
                    setRole("guest")
                  }
                } catch (err) {
                  console.error("Error in user creation:", err)
                  setRole("guest")
                }
              } else {
                console.error("Error fetching user data:", error)
                setUserData(null)
                setRole("guest")
              }
            }
          } catch (userError) {
            console.error("Error processing user data:", userError)
            setUserData(null)
            setRole("guest")
          }
        } else {
          setUserData(null)
          setRole("guest")
        }

        // Force a router refresh to update server components
        router.refresh()
      })

      subscription = data.subscription
    } catch (error) {
      console.error("Error setting up auth state change listener:", error)
    }

    // Cleanup subscription
    return () => {
      if (subscription) {
        subscription.unsubscribe()
      }
    }
  }, [router])

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      setRole("guest")
      router.push("/login")
    } catch (error) {
      console.error("Error signing out:", error)
      // Still redirect to login even if there's an error
      router.push("/login")
    }
  }

  return {
    session,
    user,
    userData,
    loading,
    role,
    signOut,
    isAdmin: role === "admin",
    isVendor: role === "vendor",
    isCustomer: role === "customer",
    isGuest: role === "guest",
    isAuthenticated: role !== "guest",
    hasAdminAccess: role === "admin" || role === "vendor",
  }
}
