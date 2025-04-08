"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { User, ShoppingBag, Heart, CreditCard, LogOut, Mail, Ticket, Home } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useAuthContext } from "@/providers/auth-provider"

interface CustomerSidebarProps {
  className?: string
}

export function CustomerSidebar({ className }: CustomerSidebarProps) {
  const pathname = usePathname()
  const { userData, signOut } = useAuthContext()

  const getInitials = () => {
    if (!userData) return "U"
    return `${userData.first_name.charAt(0)}${userData.last_name.charAt(0)}`
  }

  const navItems = [
    { href: "/account", label: "Dashboard", icon: <Home className="h-4 w-4" /> },
    { href: "/account/orders", label: "Orders", icon: <ShoppingBag className="h-4 w-4" /> },
    { href: "/account/wishlist", label: "Wishlist", icon: <Heart className="h-4 w-4" /> },
    { href: "/account/messages", label: "Messages", icon: <Mail className="h-4 w-4" /> },
    { href: "/account/support", label: "Support Tickets", icon: <Ticket className="h-4 w-4" /> },
    { href: "/account/addresses", label: "Addresses", icon: <User className="h-4 w-4" /> },
    { href: "/account/payment", label: "Payment Methods", icon: <CreditCard className="h-4 w-4" /> },
    { href: "/account/profile", label: "Profile Settings", icon: <User className="h-4 w-4" /> },
  ]

  return (
    <div className={cn("w-64 flex-shrink-0 border-r", className)}>
      <div className="flex flex-col h-full p-4">
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback>{getInitials()}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-semibold">
              {userData?.first_name} {userData?.last_name}
            </span>
            <span className="text-xs text-muted-foreground">{userData?.email}</span>
          </div>
        </div>
        <nav className="flex-1 mt-6">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                  )}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Button variant="outline" className="mt-auto" onClick={signOut}>
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </Button>
      </div>
    </div>
  )
}
