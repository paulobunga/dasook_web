"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createClient } from "@supabase/supabase-js"

// Create a Supabase client configured to use cookies
export const createServerClient = () => {
  const cookieStore = cookies()

  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      flowType: "pkce",
    },
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: { path: string; maxAge: number; domain?: string }) {
        cookieStore.set({ name, value, ...options })
      },
      remove(name: string, options: { path: string; domain?: string }) {
        cookieStore.set({ name, value: "", ...options, maxAge: 0 })
      },
    },
  })
}

export async function signIn(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const supabase = createServerClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  // Check if user exists in the public.users table
  const { data: userData, error: userError } = await supabase.from("users").select("role").eq("email", email).single()

  if (userError) {
    // User doesn't exist in public.users table, create them
    const { data: authUser } = await supabase.auth.getUser()

    if (authUser?.user) {
      // Create user in public.users table with default role
      const { error: insertError } = await supabase.from("users").insert({
        id: authUser.user.id,
        email: authUser.user.email,
        first_name: authUser.user.user_metadata.first_name || "User",
        last_name: authUser.user.user_metadata.last_name || "",
        role: "customer", // Default role
        password_hash: "auth_user",
      })

      if (insertError) {
        // Sign out if we can't create the user record
        await supabase.auth.signOut()
        return { error: "Failed to create user profile. Please try again." }
      }

      return { success: true, user: data.user, role: "customer" }
    }

    // Sign out if user doesn't exist in public.users table
    await supabase.auth.signOut()
    return { error: "User profile not found" }
  }

  // Check if user has appropriate role
  if (userData.role !== "admin" && userData.role !== "vendor" && userData.role !== "customer") {
    // Sign out if user doesn't have a valid role
    await supabase.auth.signOut()
    return { error: "You do not have permission to access the platform" }
  }

  return { success: true, user: data.user, role: userData.role }
}

export async function signOut() {
  const supabase = createServerClient()
  await supabase.auth.signOut()
  redirect("/login")
}

export async function getSession() {
  const supabase = createServerClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return session
}

export async function getUserRole() {
  const supabase = createServerClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session?.user) {
    return null
  }

  const { data: userData } = await supabase.from("users").select("role").eq("email", session.user.email).single()

  return userData?.role || null
}
