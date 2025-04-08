"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingCart } from "lucide-react"
import { Toaster } from "@/components/ui/toaster"
import { ProtectedRoute } from "@/components/protected-route"
import { WelcomeMessage } from "@/components/welcome-message"
import { CustomerSidebar } from "@/components/customer/customer-sidebar"

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <ProtectedRoute requiredRoles="customer">
      <div className="flex min-h-screen">
        <CustomerSidebar />
        <div className="flex-1">
          <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
              <ShoppingCart className="h-6 w-6" />
              <span>Dasook</span>
            </Link>
          </header>
          <main className="flex-1 p-4 md:p-6">{children}</main>
          <WelcomeMessage />
          <Toaster />
        </div>
      </div>
    </ProtectedRoute>
  )
}
