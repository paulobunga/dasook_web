import type React from "react"
import {
  BarChart3,
  Bell,
  Box,
  CreditCard,
  Image,
  LayoutDashboard,
  Mail,
  Package,
  Percent,
  Settings,
  ShoppingCart,
  Star,
  Store,
  Tag,
  Ticket,
  Users,
  Wallet,
} from "lucide-react"
import type { UserRole } from "@/hooks/use-auth"

export interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
  children?: NavItem[]
  roles?: UserRole[]
}

// Admin has access to everything
export const adminNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
    roles: ["admin", "vendor"],
  },
  {
    title: "Orders",
    href: "/orders",
    icon: <ShoppingCart className="h-5 w-5" />,
    roles: ["admin", "vendor"],
  },
  {
    title: "Refund Requests",
    href: "/refund-requests",
    icon: <CreditCard className="h-5 w-5" />,
    roles: ["admin", "vendor"],
  },
  {
    title: "Categories",
    href: "/categories",
    icon: <Box className="h-5 w-5" />,
    roles: ["admin"],
  },
  {
    title: "Product Attributes",
    href: "/product-attributes",
    icon: <Tag className="h-5 w-5" />,
    roles: ["admin"],
  },
  {
    title: "Products",
    href: "/products",
    icon: <Package className="h-5 w-5" />,
    roles: ["admin", "vendor"],
  },
  {
    title: "Banner Setup",
    href: "/banner-setup",
    icon: <Image className="h-5 w-5" />,
    roles: ["admin"],
  },
  {
    title: "Notifications",
    href: "/notifications",
    icon: <Bell className="h-5 w-5" />,
    roles: ["admin", "vendor"],
  },
  {
    title: "Inbox",
    href: "/inbox",
    icon: <Mail className="h-5 w-5" />,
    roles: ["admin", "vendor"],
  },
  {
    title: "Support Tickets",
    href: "/support-tickets",
    icon: <Ticket className="h-5 w-5" />,
    roles: ["admin"],
  },
  {
    title: "Reports",
    icon: <BarChart3 className="h-5 w-5" />,
    href: "#",
    roles: ["admin", "vendor"],
    children: [
      {
        title: "Sales Report",
        href: "/reports/sales",
        icon: <CreditCard className="h-5 w-5" />,
        roles: ["admin", "vendor"],
      },
      {
        title: "Product Report",
        href: "/reports/products",
        icon: <Package className="h-5 w-5" />,
        roles: ["admin", "vendor"],
      },
      {
        title: "Order Report",
        href: "/reports/orders",
        icon: <ShoppingCart className="h-5 w-5" />,
        roles: ["admin", "vendor"],
      },
    ],
  },
  {
    title: "Vendors",
    icon: <Store className="h-5 w-5" />,
    href: "#",
    roles: ["admin"],
    children: [
      {
        title: "All Vendors",
        href: "/vendors",
        icon: <Store className="h-5 w-5" />,
        roles: ["admin"],
      },
      {
        title: "Payout Requests",
        href: "/vendors/payout-requests",
        icon: <Wallet className="h-5 w-5" />,
        roles: ["admin"],
      },
      {
        title: "Withdrawals",
        href: "/vendors/withdrawals",
        icon: <CreditCard className="h-5 w-5" />,
        roles: ["admin"],
      },
    ],
  },
  {
    title: "Customers",
    icon: <Users className="h-5 w-5" />,
    href: "#",
    roles: ["admin"],
    children: [
      {
        title: "All Customers",
        href: "/customers",
        icon: <Users className="h-5 w-5" />,
        roles: ["admin"],
      },
      {
        title: "Customer Reviews",
        href: "/customers/reviews",
        icon: <Star className="h-5 w-5" />,
        roles: ["admin", "vendor"],
      },
    ],
  },
  {
    title: "Business Settings",
    href: "/settings/business",
    icon: <Settings className="h-5 w-5" />,
    roles: ["admin"],
  },
  {
    title: "Apps & Integrations",
    href: "/settings/integrations",
    icon: <Box className="h-5 w-5" />,
    roles: ["admin"],
  },
  {
    title: "Subscription Plans",
    href: "/subscription-plans",
    icon: <Percent className="h-5 w-5" />,
    roles: ["admin"],
  },
]

// Function to filter navigation items based on user role
export function getNavItemsByRole(role: UserRole): NavItem[] {
  if (role === "guest") return []

  return adminNavItems.filter((item) => {
    // Check if this item is accessible to the current role
    const isAccessible = item.roles?.includes(role) || false

    if (isAccessible && item.children) {
      // Filter children based on role as well
      const filteredChildren = item.children.filter((child) => child.roles?.includes(role) || false)

      // Only include this parent if it has accessible children
      return filteredChildren.length > 0 ? { ...item, children: filteredChildren } : false
    }

    return isAccessible
  })
}
