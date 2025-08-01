import * as React from "react"
import { BarChart, Boxes, ChevronRight, Clipboard, Home, Package, Settings, Users } from "lucide-react"
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

// Definir el tipo para los items
interface NavItem {
  title: string;
  url: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface NavSection {
  title: string;
  url: string;
  items: NavItem[];
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
      items: [
        {
          title: "Dashboard",
          icon: Home,
          url: "/dashboard",
        },
        {
          title: "Products",
          icon: Boxes,
          url: "/products",
        },
      ],
    },
    {
      title: "Leads",
      url: "#",
      items: [
        {
          title: "Products",
          icon: Package,
          url: "/dashboard/products",
        },
        {
          title: "Orders",
          icon: Clipboard,
          url: "/dashboard/orders",
        },
        {
          title: "Sales",
          icon: BarChart,
          url: "/dashboard/sales",
        }
      ],
    },
    {
      title: "Comms",
      url: "#",
      items: [
        {
          title: "Customers",
          icon: Users,
          url: "#",
        },
        {
          title: "Settings",
          icon: Settings,
          url: "#",
        },
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
  const isSectionActive = (section: typeof data.navMain[0]) => {
    console.log(section.items.some(item => isItemActive(item.url)))
    console.log(section);
    return section.items.some(item => isItemActive(item.url))
  }

  return (
    <Sidebar {...props} className="w-56 md:w-60 lg:w-64 h-full" collapsible="offcanvas" variant="sidebar">
      <SidebarHeader className="px-3 md:px-4 py-3 md:py-4">
        <div className="text-lg md:text-xl lg:text-2xl font-bold">Pharmacy</div>
        <div className="mt-2">
          <BranchSelectorPopover />
        </div>
      </SidebarHeader>
      <SidebarContent className="px-3 md:px-4">
        {data.navMain.map((item) => {
          const sectionIsActive = isSectionActive(item)

          return (
          <Collapsible
            key={item.title}
            title={item.title}
            defaultOpen={sectionIsActive}
            className="group/collapsible mb-3 md:mb-4 lg:mb-6"
          >
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className={`group/label text-sm text-sidebar-foreground cursor-pointer`}
              >
                <CollapsibleTrigger className={`w-full justify-between text-xs font-normal text-gray-500 uppercase tracking-wide px-2 md:px-3`}>
                  {item.title}{" "}
                  <ChevronRight className="ml-auto h-3 w-3 md:h-4 md:w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu className="space-y-1 md:space-y-2">
                    {item.items.map((item) => {
                      const IconComponent = item.icon; // Extraer el componente del icono
                      const isActive = isItemActive(item.url)

                      return (
                        <SidebarMenuItem key={item.title}>
                          <div key={item.title} className={`
                            flex items-center gap-2 md:gap-3 px-2 md:px-3 lg:px-4 rounded-lg text-sm font-medium transition-all duration-200
                            hover:shadow-sm hover:ring-1 hover:ring-gray-200 hover:bg-background hover:text-primary-foreground
                            ${isActive && 'text-primary shadow-sm bg-background'}
                          `}>
                            <Link
                              href={item.url}
                              className={`
                                flex items-center gap-2 md:gap-3 px-2 py-2 md:py-3 text-sm font-medium transition-all duration-200 w-full
                                ${isActive && 'text-primary-foreground'}
                              `}
                            >
                              {IconComponent && (
                                <IconComponent
                                  className={`
                                    h-4 w-4 md:h-5 md:w-5 flex-shrink-0 transition-colors duration-200
                                    ${isActive
                                      ? 'text-primary-foreground'
                                      : 'text-gray-500 hover:text-primary-foreground'
                                    }
                                  `}
                                  fill="currentColor"
                                />
                              )}
                              <span className="truncate text-xs md:text-sm">{item.title}</span>
                            </Link>
                          </div>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        )})}
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter className="p-2 md:p-3 lg:p-4">
        <UserProfile user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
