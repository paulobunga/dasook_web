import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

export async function middleware(request: NextRequest) {
  // Create a Supabase client configured to use cookies
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req: request, res })

  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Skip auth check for auth callback route and error pages
  if (path.startsWith("/auth/callback") || path.startsWith("/auth/error")) {
    return res
  }

  // Define public paths that don't require authentication
  const isPublicPath =
    path === "/login" ||
    path === "/register" ||
    path === "/forgot-password" ||
    path === "/" ||
    path.startsWith("/auth/")

  // Define path patterns for different roles
  const isAdminPath =
    path.startsWith("/dashboard") ||
    path.startsWith("/products") ||
    path.startsWith("/orders") ||
    path.startsWith("/categories") ||
    path.startsWith("/vendors") ||
    path.startsWith("/customers") ||
    path.startsWith("/reports") ||
    path.startsWith("/settings") ||
    path.startsWith("/banner-setup") ||
    path.startsWith("/product-attributes") ||
    path.startsWith("/refund-requests") ||
    path.startsWith("/notifications") ||
    path.startsWith("/inbox") ||
    path.startsWith("/support-tickets")

  const isCustomerPath = path.startsWith("/account")

  try {
    // Refresh session if it exists
    const {
      data: { session },
    } = await supabase.auth.getSession()

    // If no session and trying to access protected route
    if (!session && !isPublicPath) {
      const redirectUrl = new URL("/login", request.url)
      redirectUrl.searchParams.set("next", path)
      return NextResponse.redirect(redirectUrl)
    }

    // If session exists, check user role for proper access
    if (session) {
      // Get user data from the public.users table
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("role")
        .eq("email", session.user.email)
        .single()

      // If user doesn't exist in public.users table, create them
      if (userError) {
        // For middleware, we can't create the user here (would need a server action)
        // Instead, we'll allow access to the account page where we can handle user creation
        if (isCustomerPath) {
          return res
        }

        // For other paths, redirect to login
        return NextResponse.redirect(new URL("/login", request.url))
      }

      const userRole = userData?.role || "guest"

      // Redirect based on role and path
      if (isAdminPath && !["admin", "vendor"].includes(userRole)) {
        return NextResponse.redirect(new URL("/forbidden", request.url))
      }

      // Vendors can only access certain admin paths
      if (userRole === "vendor" && isAdminPath) {
        // Check if the path is one that vendors are not allowed to access
        const vendorRestrictedPaths = [
          "/categories",
          "/product-attributes",
          "/banner-setup",
          "/support-tickets",
          "/vendors",
          "/customers",
          "/settings/business",
          "/settings/integrations",
          "/subscription-plans",
        ]

        if (vendorRestrictedPaths.some((restrictedPath) => path.startsWith(restrictedPath))) {
          return NextResponse.redirect(new URL("/forbidden", request.url))
        }
      }

      // Customer can only access customer paths
      if (userRole === "customer" && isAdminPath) {
        return NextResponse.redirect(new URL("/account", request.url))
      }

      // Admin and vendor should not access customer paths
      if (["admin", "vendor"].includes(userRole) && isCustomerPath) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
      }

      // If on login page but already authenticated, redirect to appropriate dashboard
      if (isPublicPath && path !== "/" && !path.startsWith("/auth/")) {
        if (["admin", "vendor"].includes(userRole)) {
          return NextResponse.redirect(new URL("/dashboard", request.url))
        } else if (userRole === "customer") {
          return NextResponse.redirect(new URL("/account", request.url))
        }
      }
    }
  } catch (error) {
    console.error("Middleware error:", error)
    // On error, allow the request to continue
    // This prevents authentication errors from blocking the entire site
  }

  return res
}

// Configure the paths that should trigger this middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public assets)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)",
  ],
}
