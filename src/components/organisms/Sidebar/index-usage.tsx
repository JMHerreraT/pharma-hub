import * as React from "react"
import { BarChart, Boxes, CalendarCheck2Icon, ChevronRight, Clipboard, DatabaseIcon, Home, Package, RouteIcon, Settings, TramFront, Users } from "lucide-react"

// import { SearchForm } from '@/components/search-form'
// import { VersionSwitcher } from '@/components/version-switcher'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { BranchSelectorPopover } from "@/components/molecules/BranchSelector"

// Definir el tipo para los items
interface NavItem {
  title: string;
  url: string;
  icon?: React.ComponentType<any>; // Hacer el icono opcional y tiparlo correctamente
  isActive?: boolean;
}

interface NavSection {
  title: string;
  url: string;
  items: NavItem[];
}

// This is sample data.
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
          isActive: true,
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
  ],
} as const;

export function SidebarComponent({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props} className="w-64 h-full space-y-6">
      <SidebarHeader>
        <div className="text-2xl font-bold px-4">Pharmacy</div>
        <BranchSelectorPopover
          versions={data.versions as unknown as string[]}
          defaultVersion={data.versions[0] as string}
        />
        {/* <SearchForm /> */}
      </SidebarHeader>
      <SidebarContent className="space-y-2 gap-0">
        {/* We create a collapsible SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <Collapsible
            key={item.title}
            title={item.title}
            defaultOpen
            className="group/collapsible"
          >
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <CollapsibleTrigger className="w-full flex items-center justify-between py-2 text-xs font-bold uppercase rounded-lg transition-colors">
                  {item.title}{" "}
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu className="space-y-2">
                    {item.items.map((item) => {
                      const IconComponent = item.icon; // Extraer el componente del icono

                      return (
                        <SidebarMenuItem key={item.title} className={`group flex items-center gap-3 px-4 py-2 rounded-full transition-colors`}>
                          <SidebarMenuButton asChild>
                            <a href={item.url} className="flex items-center gap-3">
                              {IconComponent && (
                                <IconComponent className="h-3 w-3 transition-colors" fill="currentColor" />
                              )}
                              {item.title}
                            </a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
