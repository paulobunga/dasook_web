import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")

  if (code) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    try {
      // Exchange the code for a session
      await supabase.auth.exchangeCodeForSession(code)

      // Get the user from the newly created session
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (session?.user) {
        // Check if user exists in public.users table
        const { data: existingUser, error: userError } = await supabase
          .from("users")
          .select("id, role")
          .eq("email", session.user.email)
          .single()

        if (userError) {
          console.log("User not found in database, creating new user record")

          // Get user metadata
          const firstName =
            session.user.user_metadata.first_name || session.user.user_metadata.full_name?.split(" ")[0] || "User"

          const lastName =
            session.user.user_metadata.last_name ||
            session.user.user_metadata.full_name?.split(" ").slice(1).join(" ") ||
            ""

          // Create a new user in the public.users table
          const { error: insertError } = await supabase.from("users").insert({
            id: session.user.id,
            email: session.user.email?.toLowerCase(),
            first_name: firstName,
            last_name: lastName,
            role: "customer", // Default role for social login users
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })

          if (insertError) {
            console.error("Error creating user record:", insertError)
            // Redirect to error page if user creation fails
            return NextResponse.redirect(
              new URL(`/auth/error?message=${encodeURIComponent("Failed to create user profile")}`, request.url),
            )
          }

          // Redirect new users to account page
          return NextResponse.redirect(new URL("/account", request.url))
        }

        // Redirect based on user role
        if (existingUser.role === "admin" || existingUser.role === "vendor") {
          return NextResponse.redirect(new URL("/dashboard", request.url))
        } else {
          return NextResponse.redirect(new URL("/account", request.url))
        }
      }
    } catch (error) {
      console.error("Auth callback error:", error)
      return NextResponse.redirect(
        new URL(`/auth/error?message=${encodeURIComponent("Authentication failed")}`, request.url),
      )
    }
  }

  // Fallback redirect
  return NextResponse.redirect(new URL("/", request.url))
}
