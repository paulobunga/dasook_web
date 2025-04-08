"use client"

import { createContext, useContext, type ReactNode } from "react"
import type { Session, User } from "@supabase/supabase-js"
import { useAuth } from "@/hooks/use-auth"

type UserRole = "admin" | "vendor" | "customer" | null

interface UserData {
  id: string
  email: string
  first_name: string
  last_name: string
  role: UserRole
}

interface AuthContextType {
  session: Session | null
  user: User | null
  userData: UserData | null
  loading: boolean
  signOut: () => Promise<void>
  isAdmin: boolean
  isVendor: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth()

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider")
  }
  return context
}
