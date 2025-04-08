"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LogOut } from "lucide-react"
import { ShoppingCart } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useAuthContext } from "@/providers/auth-provider"
import { ProtectedRoute } from "@/components/protected-route"
import { getNavItemsByRole, type NavItem } from "@/config/navigation"
import { Bell, Menu } from "lucide-react"
import { WelcomeMessage } from "@/components/welcome-message"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [openCollapsibles, setOpenCollapsibles] = useState<string[]>([])
  const [navItems, setNavItems] = useState<NavItem[]>([])
  const pathname = usePathname()
  const { userData, role, signOut, loading } = useAuthContext()

  useEffect(() => {
    if (!loading) {
      setNavItems(getNavItemsByRole(role))
    }
  }, [role, loading])

  const toggleCollapsible = (title: string) => {
    setOpenCollapsibles((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]))
  }

  const isActive = (href: string) => {
    if (href === "#") return false
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  const getInitials = () => {
    if (!userData) return "U"
    return `${userData.first_name.charAt(0)}${userData.last_name.charAt(0)}`
  }

  const renderNavItems = (items: NavItem[]) => {
    return items.map((item, index) => {
      if (item.children && item.children.length > 0) {
        const isOpen = openCollapsibles.includes(item.title)
        const hasActiveChild = item.children.some((child) => isActive(child.href))

        return (
          <Collapsible key={index} open={isOpen} onOpenChange={() => toggleCollapsible(item.title)} className="w-full">
            <CollapsibleTrigger asChild>
              <button
                className={cn(
                  "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  isOpen || hasActiveChild ? "bg-accent" : "transparent",
                )}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  {item.title}
                </div>
                <div className={cn("transition-transform", isOpen ? "rotate-180" : "")}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-6 pt-1">
              {item.children.map((child, childIndex) => (
                <Link
                  key={childIndex}
                  href={child.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    isActive(child.href) ? "bg-accent" : "transparent",
                  )}
                >
                  {child.icon}
                  {child.title}
                </Link>
              ))}
            </CollapsibleContent>
          </Collapsible>
        )
      }

      return (
        <Link
          key={index}
          href={item.href}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
            isActive(item.href) ? "bg-accent" : "transparent",
          )}
        >
          {item.icon}
          {item.title}
        </Link>
      )
    })
  }

  return (
    <ProtectedRoute requiredRoles={["admin", "vendor"]}>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
          <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 sm:max-w-xs">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-lg font-semibold"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <ShoppingCart className="h-6 w-6" />
                  <span className="sr-only">Admin Panel</span>
                </Link>
                {renderNavItems(navItems)}
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
            <ShoppingCart className="h-6 w-6" />
            <span>Admin Panel</span>
          </Link>
          <div className="ml-auto flex items-center gap-4">
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                5
              </span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full" aria-label="User menu">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback>{getInitials()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  {userData ? `${userData.first_name} ${userData.last_name}` : "My Account"}
                  {role && <span className="block text-xs text-muted-foreground mt-1 capitalize">{role}</span>}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <div className="flex flex-1">
          <aside className="hidden w-64 shrink-0 border-r md:block">
            <div className="flex h-full flex-col gap-2 p-4">
              <nav className="grid gap-1">{renderNavItems(navItems)}</nav>
            </div>
          </aside>
          <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
        </div>
        <WelcomeMessage />
      </div>
    </ProtectedRoute>
  )
}
