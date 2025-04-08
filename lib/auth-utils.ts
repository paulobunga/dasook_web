/**
 * Utility functions for authentication
 */

import { getSupabaseClient } from "./supabase"
import type { SocialProvider } from "./types"

export async function signInWithSocialProvider(provider: SocialProvider) {
  const supabase = getSupabaseClient()

  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      console.error(`Social auth error with ${provider}:`, error)
      throw error
    }

    return { data, error: null }
  } catch (error) {
    console.error(`Error in signInWithSocialProvider (${provider}):`, error)
    return { data: null, error }
  }
}

export async function signInWithEmail(email: string, password: string) {
  const supabase = getSupabaseClient()

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error("Email sign in error:", error)
      throw error
    }

    return { data, error: null }
  } catch (error) {
    console.error("Error in signInWithEmail:", error)
    return { data: null, error }
  }
}

export async function signUpWithEmail(
  email: string,
  password: string,
  userData: {
    first_name: string
    last_name: string
  },
) {
  const supabase = getSupabaseClient()

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: userData.first_name,
          last_name: userData.last_name,
        },
        emailRedirectTo: `${window.location.origin}/auth/verify`,
      },
    })

    if (error) {
      console.error("Email sign up error:", error)
      throw error
    }

    // Create a record in the public.users table
    if (data.user) {
      const { error: insertError } = await supabase.from("users").insert({
        id: data.user.id,
        email: email.toLowerCase(),
        first_name: userData.first_name,
        last_name: userData.last_name,
        role: "customer", // Default role for new registrations
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })

      if (insertError) {
        console.error("Error creating user record:", insertError)
        throw insertError
      }
    }

    return { data, error: null }
  } catch (error) {
    console.error("Error in signUpWithEmail:", error)
    return { data: null, error }
  }
}

export async function resetPassword(email: string) {
  const supabase = getSupabaseClient()

  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })

    if (error) {
      console.error("Password reset error:", error)
      throw error
    }

    return { data, error: null }
  } catch (error) {
    console.error("Error in resetPassword:", error)
    return { data: null, error }
  }
}

export async function updatePassword(newPassword: string) {
  const supabase = getSupabaseClient()

  try {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (error) {
      console.error("Password update error:", error)
      throw error
    }

    return { data, error: null }
  } catch (error) {
    console.error("Error in updatePassword:", error)
    return { data: null, error }
  }
}

export async function signOut() {
  const supabase = getSupabaseClient()

  try {
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error("Sign out error:", error)
      throw error
    }

    return { error: null }
  } catch (error) {
    console.error("Error in signOut:", error)
    return { error }
  }
}

export { getSupabaseClient }
