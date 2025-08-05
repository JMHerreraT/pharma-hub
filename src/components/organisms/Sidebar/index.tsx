"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"
import { BranchSelectorPopover } from "@/components/molecules/BranchSelector"
import { UserProfile } from "@/components/molecules/UserProfile"
import { Progress } from "@/components/ui/progress"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  ChevronDown,
  Package,
  Users,
  Settings2,
  UserPlus,
  HeadphonesIcon,
  BarChart3,
  ShoppingBag,
  ShoppingCart,
  Pill,
  Heart,
  Activity,
  Calendar,
  Stethoscope,
  Zap
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { PermissionManager, getCurrentUser, PERMISSIONS, Permission } from "@/lib/roles"

// Tipo para elementos de navegación
interface NavItem {
  readonly title: string
  readonly url: string
  readonly icon?: React.ComponentType<{ className?: string }>
  readonly isActive?: boolean
  readonly requiredPermission?: Permission
}

interface NavSection {
  readonly title: string
  readonly items: readonly NavItem[]
  readonly icon: React.ComponentType<{ className?: string }>
  readonly collapsible: boolean
  readonly requiredPermission?: Permission
}

const data = {
  navMain: [
    {
      title: "Menú Principal",
      icon: Package,
      collapsible: false,
      items: [
        {
          title: "Panel de Control",
          url: "/dashboard",
          icon: BarChart3,
          requiredPermission: PERMISSIONS.DASHBOARD_VIEW,
        },
        {
          title: "Ventas",
          url: "/dashboard/sales",
          icon: ShoppingBag,
          requiredPermission: PERMISSIONS.SALES_VIEW,
        },
      ],
    },
    {
      title: "Inventario",
      icon: Package,
      collapsible: true,
      requiredPermission: PERMISSIONS.PRODUCTS_VIEW,
      items: [
        {
          title: "Productos",
          url: "/dashboard/products",
          icon: Package,
          requiredPermission: PERMISSIONS.PRODUCTS_VIEW,
        },
        {
          title: "Medicamentos",
          url: "/dashboard/medications",
          icon: Pill,
          requiredPermission: PERMISSIONS.MEDICATIONS_VIEW,
        },
        {
          title: "Pedidos",
          url: "/dashboard/orders",
          icon: ShoppingCart,
          requiredPermission: PERMISSIONS.ORDERS_VIEW,
        },
      ],
    },
    {
      title: "Clientes",
      icon: Users,
      collapsible: true,
      requiredPermission: PERMISSIONS.CUSTOMERS_VIEW,
      items: [
        {
          title: "Todos los Clientes",
          url: "/dashboard/customers",
          icon: Users,
          requiredPermission: PERMISSIONS.CUSTOMERS_VIEW,
        },
        {
          title: "Clientes Frecuentes",
          url: "/dashboard/frequent-customers",
          icon: Heart,
          requiredPermission: PERMISSIONS.CUSTOMERS_FREQUENT_VIEW,
        },
        {
          title: "Reportes Rápidos",
          url: "/dashboard/quick-reports",
          icon: Zap,
          requiredPermission: PERMISSIONS.REPORTS_VIEW,
        },
      ],
    },
    {
      title: "Sistema",
      icon: Settings2,
      collapsible: true,
      requiredPermission: PERMISSIONS.SYSTEM_VIEW,
      items: [
        {
          title: "Actividad",
          url: "/dashboard/activity",
          icon: Activity,
          requiredPermission: PERMISSIONS.SYSTEM_ACTIVITY,
        },
        {
          title: "Calendario",
          url: "/dashboard/calendar",
          icon: Calendar,
          requiredPermission: PERMISSIONS.SYSTEM_CALENDAR,
        },
        {
          title: "Asistente IA",
          url: "/dashboard/ai-assistant",
          icon: Stethoscope,
          requiredPermission: PERMISSIONS.SYSTEM_AI_ASSISTANT,
        },
        {
          title: "Invitar Usuario",
          url: "/dashboard/invite",
          icon: UserPlus,
          requiredPermission: PERMISSIONS.USER_MANAGEMENT,
        },
        {
          title: "Feature Flags",
          url: "/dashboard/feature-flags",
          icon: Settings2,
          requiredPermission: PERMISSIONS.FEATURE_MANAGEMENT,
        },
      ],
    },
  ] as readonly NavSection[],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = getCurrentUser()
  const pathname = usePathname()

  // Función para determinar si un item está activo
  const isItemActive = (itemUrl: string) => {
    // Siempre priorizar coincidencias exactas
    if (pathname === itemUrl) return true

    // Para /dashboard, solo activar si es exactamente esa ruta
    if (itemUrl === "/dashboard") {
      return pathname === "/dashboard"
    }

    // Para otras rutas, no activar rutas padre
    // Solo activar si es la ruta exacta
    return false
  }

  // Filtrar secciones y elementos según permisos del usuario
  const filteredNavMain = data.navMain.filter(section => {
    // Si la sección requiere permiso, verificarlo
    if (section.requiredPermission) {
      if (!PermissionManager.hasPermission(user.roleId, section.requiredPermission)) {
        return false
      }
    }

    // Filtrar elementos dentro de la sección
    const visibleItems = section.items.filter(item => {
      if (item.requiredPermission) {
        return PermissionManager.hasPermission(user.roleId, item.requiredPermission)
      }
      return true
    })

    // Solo mostrar la sección si tiene elementos visibles
    return visibleItems.length > 0
  }).map(section => ({
    ...section,
    items: section.items.filter(item => {
      if (item.requiredPermission) {
        return PermissionManager.hasPermission(user.roleId, item.requiredPermission)
      }
      return true
    })
  }))

  return (
    <Sidebar {...props} className="w-60 h-full border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 overflow-visible" collapsible="offcanvas" variant="sidebar">
      <SidebarHeader className="px-4 py-6 border-b border-gray-200 dark:border-gray-700 overflow-visible">
        <div className="flex items-center justify-between w-full overflow-visible">
          {/* Logo lado izquierdo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-teal-600 dark:bg-teal-500 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <div className="text-xl font-semibold text-gray-900 dark:text-white">Pharmacy</div>
          </div>

          {/* Selector compacto lado derecho */}
          <div className="flex-shrink-0 relative z-[10000]">
            <BranchSelectorPopover />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 py-4">
        {filteredNavMain.map((section, index) => {
          if (section.collapsible) {
            return (
              <div key={index} className="mb-4">
                <Collapsible defaultOpen className="group/collapsible">
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200">
                      <div className="flex items-center gap-2">
                        <section.icon className="h-4 w-4" />
                        <span>{section.title}</span>
                      </div>
                      <ChevronDown className="h-4 w-4 text-gray-400 dark:text-gray-500 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-1">
                    <SidebarGroup>
                      <SidebarGroupContent>
                        <SidebarMenu className="space-y-1 ml-6">
                          {section.items.map((item) => {
                            const IconComponent = item.icon
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
          } else {
            return (
              <div key={index} className="mb-6">
                <SidebarGroupLabel className="text-xs font-medium text-gray-400 dark:text-gray-500 mb-3 px-0">
                  {section.title}
                </SidebarGroupLabel>
                <SidebarGroup>
                  <SidebarGroupContent>
                    <SidebarMenu className="space-y-1">
                      {section.items.map((item) => {
                        const IconComponent = item.icon
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
        })}
      </SidebarContent>

      <SidebarRail />

      <SidebarFooter className="px-4 py-4 border-t border-gray-200 dark:border-gray-700">
        <div className="space-y-4">
          {/* Botones de acción - solo para admins */}
          {PermissionManager.hasPermission(user.roleId, PERMISSIONS.ADMIN_FULL_ACCESS) && (
            <div className="space-y-1 mb-4">
              <Link
                href="/invite"
                className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
              >
                <UserPlus className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span>Invitar compañeros</span>
              </Link>
              <Link
                href="/support"
                className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
              >
                <HeadphonesIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span>Soporte</span>
              </Link>
            </div>
          )}

          {/* Progreso de prueba gratuita */}
          <div className="mb-4 px-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Prueba gratuita</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">8/15 Días</span>
            </div>
            <Progress value={53} className="h-2" />
          </div>

          {/* Perfil de usuario */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <UserProfile user={user} />
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
