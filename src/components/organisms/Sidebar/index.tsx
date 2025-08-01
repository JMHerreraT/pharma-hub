import * as React from "react"
import { BarChart, Boxes, Home, Package, Users, ChevronDown, FileText, Mail, UserPlus, HeadphonesIcon } from "lucide-react"
import { usePathname } from "next/navigation"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { BranchSelectorPopover } from "@/components/molecules/BranchSelector"
import Link from "next/link"
import { UserProfile } from "@/components/molecules/UserProfile"
import { Progress } from "@/components/ui/progress"

// Definir el tipo para los items
interface NavItem {
  title: string;
  url: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  badge?: string;
}

interface NavSection {
  title: string;
  url: string;
  items: NavItem[];
  collapsible?: boolean;
  defaultOpen?: boolean;
}

// This is sample data.

const user = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
}

const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Main Menu",
      url: "#",
      collapsible: false,
      items: [
        {
          title: "Dashboard",
          icon: Home,
          url: "/dashboard",
        },
        {
          title: "Products",
          icon: Package,
          url: "/dashboard/products",
        },
        {
          title: "Orders",
          icon: Boxes,
          url: "/dashboard/orders",
        },
        {
          title: "Notes",
          icon: FileText,
          url: "/dashboard/notes",
        },
        {
          title: "Emails",
          icon: Mail,
          url: "/dashboard/emails",
        },
        {
          title: "Reports",
          icon: BarChart,
          url: "/dashboard/reports",
        },
      ],
    },
    {
      title: "Favorites",
      url: "#",
      collapsible: true,
      defaultOpen: false,
      items: [
        {
          title: "Analytics Dashboard",
          icon: BarChart,
          url: "/dashboard/analytics",
        },
        {
          title: "Customer Portal",
          icon: Users,
          url: "/dashboard/customers",
        },
        {
          title: "Inventory System",
          icon: Package,
          url: "/dashboard/inventory",
        }
      ],
    },
    {
      title: "Records",
      url: "#",
      collapsible: true,
      defaultOpen: false,
      items: [
        {
          title: "Sales Records",
          icon: BarChart,
          url: "/dashboard/sales-records",
        },
        {
          title: "Customer Data",
          icon: Users,
          url: "/dashboard/customer-data",
        }
      ],
    },
  ] as NavSection[],
} as const;

export function SidebarComponent({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  // Función para determinar si un item está activo
  const isItemActive = (itemUrl: string) => {
    if (itemUrl === "/" && pathname === "/") return true
    if (itemUrl !== "/" && pathname.startsWith(itemUrl)) return true
    return false
  }

  // Función para determinar si una sección tiene algún item activo
  const isSectionActive = (section: NavSection) => {
    return section.items.some(item => isItemActive(item.url))
  }

  return (
    <Sidebar {...props} className="w-60 h-full border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900" collapsible="offcanvas" variant="sidebar">
      <SidebarHeader className="px-4 py-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between w-full">
          {/* Logo lado izquierdo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-teal-600 dark:bg-teal-500 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <div className="text-xl font-semibold text-gray-900 dark:text-white">Pharmacy</div>
          </div>

          {/* Selector compacto lado derecho */}
          <div className="flex-shrink-0">
            <BranchSelectorPopover />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 py-4">
        {data.navMain.map((section) => {
          const sectionIsActive = isSectionActive(section)

          if (!section.collapsible) {
            // Sección no colapsable (Main Menu)
            return (
              <div key={section.title} className="mb-6">
                <SidebarGroupLabel className="text-xs font-medium text-gray-400 dark:text-gray-500 mb-3 px-0">
                  {section.title}
                </SidebarGroupLabel>
                <SidebarGroup>
                  <SidebarGroupContent>
                    <SidebarMenu className="space-y-1">
                      {section.items.map((item) => {
                        const IconComponent = item.icon;
                        const isActive = isItemActive(item.url)

                        return (
                          <SidebarMenuItem key={item.title}>
                            <Link
                              href={item.url}
                              className={`
                                flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group relative
                                ${isActive
                                  ? 'bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 shadow-sm'
                                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                                }
                              `}
                            >
                              {IconComponent && (
                                <IconComponent
                                  className={`
                                    h-5 w-5 flex-shrink-0 transition-colors duration-200
                                    ${isActive
                                      ? 'text-teal-600 dark:text-teal-400'
                                      : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'
                                    }
                                  `}
                                />
                              )}
                              <span className="flex-1">{item.title}</span>
                              {item.badge && (
                                <span className="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-xs font-medium px-2 py-0.5 rounded-full">
                                  {item.badge}
                                </span>
                              )}
                            </Link>
                          </SidebarMenuItem>
                        );
                      })}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </div>
            )
          }

          // Sección colapsable (Favorites, Records)
          return (
            <div key={section.title} className="mb-4">
              <Collapsible defaultOpen={section.defaultOpen || sectionIsActive}>
                <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200">
                  <div className="flex items-center gap-2">
                    <ChevronDown className="h-4 w-4 text-gray-400 dark:text-gray-500 transition-transform duration-200 ui-open:rotate-180" />
                    <span>{section.title}</span>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-1">
                  <SidebarGroup>
                    <SidebarGroupContent>
                      <SidebarMenu className="space-y-1 ml-6">
                        {section.items.map((item) => {
                          const IconComponent = item.icon;
                          const isActive = isItemActive(item.url)

                          return (
                            <SidebarMenuItem key={item.title}>
                              <Link
                                href={item.url}
                                className={`
                                  flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 group relative
                                  ${isActive
                                    ? 'bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 shadow-sm'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                                  }
                                `}
                              >
                                {IconComponent && (
                                  <IconComponent
                                    className={`
                                      h-4 w-4 flex-shrink-0 transition-colors duration-200
                                      ${isActive
                                        ? 'text-teal-600 dark:text-teal-400'
                                        : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'
                                      }
                                    `}
                                  />
                                )}
                                <span className="flex-1">{item.title}</span>
                              </Link>
                            </SidebarMenuItem>
                          );
                        })}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                </CollapsibleContent>
              </Collapsible>
            </div>
          )
        })}
      </SidebarContent>

      <SidebarRail />

      <SidebarFooter className="px-4 py-4 border-t border-gray-200 dark:border-gray-700">
        {/* Invite teammates y Support */}
        <div className="space-y-1 mb-4">
          <Link
            href="/invite"
            className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
          >
            <UserPlus className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <span>Invite teammates</span>
          </Link>
          <Link
            href="/support"
            className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
          >
            <HeadphonesIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <span>Support</span>
          </Link>
        </div>

        {/* Free trial progress */}
        <div className="mb-4 px-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Free trial</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">8/15 Days</span>
          </div>
          <Progress value={53} className="h-2" />
        </div>

        {/* User Profile en lugar del upgrade button */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <UserProfile user={user} />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
