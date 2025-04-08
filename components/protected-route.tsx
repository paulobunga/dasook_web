"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthContext } from "@/providers/auth-provider"
import type { UserRole } from "@/hooks/use-auth"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRoles?: UserRole | UserRole[]
  redirectTo?: string
}

export function ProtectedRoute({
  children,
  requiredRoles = ["admin", "vendor", "customer"],
  redirectTo = "/login",
}: ProtectedRouteProps) {
  const { user, role, loading } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    if (loading) return

    // If no user and we require authentication
    if (!user && requiredRoles !== "guest") {
      router.push(redirectTo)
      return
    }

    // Check if user has required role
    const roles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles]

    if (!roles.includes(role)) {
      if (role === "guest") {
        router.push("/login")
      } else {
        router.push("/forbidden")
      }
      return
    }
  }, [user, role, loading, router, requiredRoles, redirectTo])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  // If we're checking for guest access, or the user is authenticated with the right role
  if (
    requiredRoles === "guest" ||
    (user && Array.isArray(requiredRoles) ? requiredRoles.includes(role) : role === requiredRoles)
  ) {
    return <>{children}</>
  }

  return null
}
