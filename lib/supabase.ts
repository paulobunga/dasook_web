import { createClient } from "@supabase/supabase-js"

// Create a single supabase client for interacting with your database
const createSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Supabase URL or Anon Key is missing")
    throw new Error("Supabase configuration is incomplete")
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      flowType: "pkce",
    },
  })
}

// Client-side singleton to avoid multiple instances
let supabaseClient: ReturnType<typeof createClient> | null = null

export const getSupabaseClient = () => {
  if (typeof window === "undefined") {
    // Server-side - create a new instance
    try {
      return createSupabaseClient()
    } catch (error) {
      console.error("Failed to create Supabase client on server:", error)
      return null
    }
  }

  // Client-side - use singleton
  if (!supabaseClient) {
    try {
      supabaseClient = createSupabaseClient()
    } catch (error) {
      console.error("Failed to create Supabase client:", error)
      return null
    }
  }
  return supabaseClient
}

// Server-side client (always create a new instance to avoid sharing between requests)
export const getSupabaseServerClient = () => {
  try {
    return createSupabaseClient()
  } catch (error) {
    console.error("Failed to create Supabase server client:", error)
    return null
  }
}
