"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  ChevronDown,
  Star,
  Clock,
  FolderOpen,
  Pill,
  Boxes,
  BarChart3,
  ShoppingBag,
  Truck,
  Package,
  Users,
  CircleDollarSign,
  Megaphone,
  Settings2,
  Heart,
  Tag,
  Wallet,
} from "lucide-react"
import { mapCognitoRoleToRoleId } from "@/lib/roles"
import { useAuthContext } from "@/components/providers/auth-provider"

// Tipo para elementos de navegación
interface NavItem {
  readonly title: string
  readonly url: string
  readonly isActive?: boolean
  readonly badge?: string | number
}

// Union types for the new sidebar model
// type SectionEntry = BasicItem | CollapsibleItem

// (Legacy type removed)

const ACTIVE_ITEM_CLASS = `bg-sidebar-accent text-sidebar-accent-foreground font-medium`
const INACTIVE_ITEM_CLASS = `text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground`
const ITEM_BASE_CLASS = `flex items-center gap-3 px-2 py-2 text-sm transition-all duration-200 group relative w-full rounded-md cursor-pointer select-none`
// Icon mapping per section title (small icons to avoid shifting text)
const sectionIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'Farmacia': Pill,
  'Bodegas': Boxes,
  'Inicio / Panel General': BarChart3,
  'Gestión de Ventas': ShoppingBag,
  'Pedidos y Delivery': Truck,
  'Inventario': Package,
  'Compras y Proveedores': Package,
  'Clientes y Pacientes': Users,
  'Repartidores': Truck,
  'Finanzas y Caja': CircleDollarSign,
  'Marketing y Fidelización': Megaphone,
  'Reportes y Análisis': BarChart3,
  'Configuraciones y Seguridad': Settings2,
  'Clientes Frecuentes / Fidelización': Heart,
  'Inicio / KPIs': BarChart3,
  'Punto de Venta (POS)': ShoppingBag,
  'Precios y Promos': Tag,
  'Caja y Arqueos': CircleDollarSign,
  'Fiado (Cuentas por Cobrar)': Wallet,
  'Reportes': BarChart3,
  'Usuarios y Seguridad': Settings2,
}

const data = {
  // Elementos principales del sidebar
  mainItems: [
    { title: "Starred", url: "/starred", icon: Star },
    { title: "Recent", url: "/recent", icon: Clock },
  ],

  // Secciones principales
  sections: [
    {
      title: "Farmacia",
      collapsible: true,
      defaultOpen: true,
      items: [
        {
          title: "Inicio / Panel General",
          collapsible: true,
          defaultOpen: true,
          items: [
            { title: "Panel General", url: "/dashboard" },
          ],
        },
        {
          title: "Gestión de Ventas",
          collapsible: true,
          items: [
            { title: "Registro y Consulta", url: "/dashboard/sales-management" },
            { title: "Devoluciones y Notas de Crédito", url: "/dashboard/sales-returns" },
            { title: "Promociones y Cupones", url: "/dashboard/promotions" },
          ],
        },
        {
          title: "Pedidos y Delivery",
          collapsible: true,
          items: [
            { title: "Pedidos Pendientes", url: "/dashboard/orders/pending" },
            { title: "Seguimiento de Repartidores", url: "/dashboard/delivery/track" },
            { title: "Asignación y Rutas", url: "/dashboard/delivery/assignment" },
            { title: "Estado de Pedidos", url: "/dashboard/orders/status" },
            { title: "Pagos Online y Confirmación", url: "/dashboard/delivery/payments" },
          ],
        },
        {
          title: "Inventario",
          collapsible: true,
          items: [
            { title: "Stock en Tiempo Real", url: "/dashboard/inventory/stock" },
            { title: "Control de Caducidad", url: "/dashboard/inventory/expiry" },
            { title: "Entradas y Salidas", url: "/dashboard/inventory/movements" },
            { title: "Transferencias", url: "/dashboard/inventory/transfers" },
          ],
        },
        {
          title: "Compras y Proveedores",
          collapsible: true,
          items: [
            { title: "Órdenes de Compra", url: "/dashboard/purchasing/purchase-orders" },
            { title: "Proveedores", url: "/dashboard/purchasing/suppliers" },
            { title: "Historial de Compras", url: "/dashboard/purchasing/history" },
          ],
        },
        {
          title: "Clientes y Pacientes",
          collapsible: true,
          items: [
            { title: "Ficha de Clientes/Pacientes", url: "/dashboard/customers/patients" },
            { title: "Historial de Compras y Pedidos", url: "/dashboard/customers/history" },
            { title: "Recetas", url: "/dashboard/prescriptions" },
            { title: "Alertas de Interacciones", url: "/dashboard/alerts/interactions" },
          ],
        },
        {
          title: "Repartidores",
          collapsible: true,
          items: [
            { title: "Gestión de Repartidores", url: "/dashboard/delivery/couriers" },
            { title: "Rutas Asignadas", url: "/dashboard/delivery/routes" },
            { title: "Historial de Entregas", url: "/dashboard/delivery/history" },
          ],
        },
        {
          title: "Finanzas y Caja",
          collapsible: true,
          items: [
            { title: "Apertura y Cierre de Caja", url: "/dashboard/finance/cash-register" },
            { title: "Ingresos y Egresos", url: "/dashboard/finance/entries" },
            { title: "Conciliación de Pagos", url: "/dashboard/finance/reconciliation" },
            { title: "Reportes de Flujo de Caja", url: "/dashboard/finance/cashflow-reports" },
          ],
        },
        {
          title: "Marketing y Fidelización",
          collapsible: true,
          items: [
            { title: "Campañas de Descuentos", url: "/dashboard/marketing/campaigns" },
            { title: "Programa de Puntos", url: "/dashboard/marketing/loyalty" },
            { title: "Mensajería (SMS/Email)", url: "/dashboard/marketing/messaging" },
          ],
        },
        {
          title: "Reportes y Análisis",
          collapsible: true,
          items: [
            { title: "Análisis de Ventas", url: "/dashboard/reports/sales" },
            { title: "Pedidos", url: "/dashboard/reports/orders" },
            { title: "Productos más Vendidos", url: "/dashboard/reports/top-products" },
            { title: "Demanda por Hora/Día", url: "/dashboard/reports/demand" },
          ],
        },
        {
          title: "Configuraciones y Seguridad",
          collapsible: true,
          items: [
            { title: "Roles y Permisos", url: "/dashboard/settings/roles" },
            { title: "Logs de Auditoría", url: "/dashboard/settings/audit-logs" },
            { title: "Parámetros de Negocio", url: "/dashboard/settings/business" },
            { title: "Integraciones", url: "/dashboard/settings/integrations" },
          ],
        },
        {
          title: "Clientes Frecuentes / Fidelización",
          collapsible: true,
          items: [
            { title: "Clientes Frecuentes", url: "/dashboard/loyalty/frequent-customers" },
            { title: "Segmentación", url: "/dashboard/loyalty/segmentation" },
            { title: "Beneficios y Descuentos", url: "/dashboard/loyalty/benefits" },
            { title: "Programa de Puntos", url: "/dashboard/loyalty/points" },
            { title: "Historial de Participación", url: "/dashboard/loyalty/history" },
            { title: "Alertas y Promos Automatizadas", url: "/dashboard/loyalty/alerts" },
          ],
        },
      ],
    },
    {
      title: "Bodegas",
      collapsible: true,
      defaultOpen: false,
      items: [
        {
          title: "Inicio / KPIs",
          collapsible: true,
          items: [
            { title: "Panel KPIs", url: "/dashboard/warehouse" },
          ],
        },
        {
          title: "Punto de Venta (POS)",
          collapsible: true,
          items: [
            { title: "POS", url: "/dashboard/warehouse/pos" },
          ],
        },
        {
          title: "Inventario",
          collapsible: true,
          items: [
            { title: "Entradas/Salidas/Ajustes", url: "/dashboard/warehouse/inventory/movements" },
            { title: "Mermas y Caducidad", url: "/dashboard/warehouse/inventory/waste" },
            { title: "Valorización", url: "/dashboard/warehouse/inventory/valuation" },
            { title: "Alertas de Vencimiento", url: "/dashboard/warehouse/inventory/alerts" },
          ],
        },
        {
          title: "Precios y Promos",
          collapsible: true,
          items: [
            { title: "Listas y Reglas de Promo", url: "/dashboard/warehouse/pricing" },
          ],
        },
        {
          title: "Caja y Arqueos",
          collapsible: true,
          items: [
            { title: "Apertura/Cierre y Corte X/Z", url: "/dashboard/warehouse/cash" },
            { title: "Cuadratura y Diferencias", url: "/dashboard/warehouse/cash/reconciliation" },
          ],
        },
        {
          title: "Fiado (Cuentas por Cobrar)",
          collapsible: true,
          items: [
            { title: "Clientes y Tope Crédito", url: "/dashboard/warehouse/credit" },
            { title: "Vencidos y Pagos Parciales", url: "/dashboard/warehouse/credit/overdue" },
          ],
        },
        {
          title: "Compras y Proveedores",
          collapsible: true,
          items: [
            { title: "Órdenes y Recepción", url: "/dashboard/warehouse/purchasing" },
            { title: "Cuentas por Pagar", url: "/dashboard/warehouse/purchasing/payables" },
            { title: "Historial de Precios", url: "/dashboard/warehouse/purchasing/history" },
          ],
        },
        {
          title: "Reportes",
          collapsible: true,
          items: [
            { title: "Ventas y Márgenes", url: "/dashboard/warehouse/reports/sales" },
            { title: "Rotación y Top Productos", url: "/dashboard/warehouse/reports/rotation" },
          ],
        },
        {
          title: "Usuarios y Seguridad",
          collapsible: true,
          items: [
            { title: "Roles (Cajero/Supervisor/Admin)", url: "/dashboard/warehouse/security/roles" },
            { title: "Auditoría", url: "/dashboard/warehouse/security/audit" },
          ],
        },
      ],
    },

  ]
}

// Componente para items de navegación simples
type BasicItem = { title: string; url: string; badge?: string | number }
type CollapsibleItem = { title: string; collapsible: boolean; defaultOpen?: boolean; items: Array<BasicItem | CollapsibleItem> }

const NavItem = ({ item, isActive, level = 0 }: {
  item: BasicItem,
  isActive: boolean,
  level?: number
}) => {
  const baseIndent = level * 4;
  const paddingLeft = Math.max(0, baseIndent - 4);

  return (
    <Link
      href={item.url}
      className={`${ITEM_BASE_CLASS} ${isActive ? ACTIVE_ITEM_CLASS : INACTIVE_ITEM_CLASS}`}
      style={{ paddingLeft: `${paddingLeft}px` }}
    >
      <span className="flex-1 truncate">{item.title}</span>
      {item.badge && (
        <span className="bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[18px] h-[18px] flex items-center justify-center">
          {item.badge}
        </span>
      )}
    </Link>
  );
};

// Componente para secciones colapsables
const CollapsibleSection = ({
  section,
  level = 0,
  pathname
}: {
  section: CollapsibleItem,
  level?: number,
  pathname: string
}) => {
  const paddingLeft = level * 4;
  const hasActiveChild = section.items?.some((item) =>
    'url' in item ? pathname === item.url : item.items?.some((subItem) => 'url' in subItem && pathname === subItem.url)
  );

  return (
    <Collapsible defaultOpen={section.defaultOpen || hasActiveChild}>
      <CollapsibleTrigger asChild>
        <div
          className="flex items-center justify-between w-full py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent/50 rounded-md cursor-pointer group"
          style={{ paddingLeft: `${paddingLeft}px` }}
        >
          <div className="flex items-center gap-2 min-w-0">
            {sectionIconMap[section.title] && (
              React.createElement(sectionIconMap[section.title], { className: 'h-3.5 w-3.5 text-sidebar-foreground/70' })
            )}
            <span className="font-medium truncate">{section.title}</span>
          </div>
          <ChevronDown className="h-4 w-4 text-sidebar-foreground/60 transition-transform group-data-[state=open]:rotate-180" />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div
          className="mt-1 border-l border-sidebar-border pl-2"
          style={{ marginLeft: `${paddingLeft + 6}px` }}
        >
          {section.items?.map((item, index: number) => {
            if (!('url' in item)) {
              return (
                <div key={index} className="relative before:absolute before:-left-2 before:top-1/2 before:-translate-y-1/2 before:w-2 before:border-t before:border-sidebar-border">
                  <CollapsibleSection
                    section={item as CollapsibleItem}
                    level={level + 1}
                    pathname={pathname}
                  />
                </div>
              );
            } else {
              const basic = item as BasicItem
              const isActive = pathname === basic.url;
              return (
                <div key={index} className="relative before:absolute before:-left-2 before:top-1/2 before:-translate-y-1/2 before:w-2 before:border-t before:border-sidebar-border">
                  <NavItem
                    item={basic}
                    isActive={isActive}
                    level={level + 1}
                  />
                </div>
              );
            }
          })}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuthContext()
  const pathname = usePathname()

  // Si no hay usuario, no mostrar el sidebar
  if (!user) return null

  mapCognitoRoleToRoleId(user.role)

  return (
    <Sidebar {...props} className="w-64 h-full border-r border-sidebar-border bg-sidebar" collapsible="offcanvas" variant="sidebar">
      <SidebarHeader className="px-4 py-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between w-full">
          {/* Logo/Title */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-sidebar-foreground">Codename.com</span>
            <ChevronDown className="h-4 w-4 text-sidebar-foreground/50" />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        <div className="space-y-1">
          {/* Items principales */}
          {data.mainItems.map((item, index) => {
            const isActive = pathname === item.url;
            return (
              <NavItem
                key={index}
                item={item}
                isActive={isActive}
                level={0}
              />
            );
          })}

          {/* Divisor */}
          <div className="my-4" />

          {/* Secciones principales */}
          {data.sections.map((section, index) => (
            'collapsible' in section
              ? (
                <CollapsibleSection
                  key={index}
                  section={section as CollapsibleItem}
                  level={0}
                  pathname={pathname}
                />
              )
              : (
                <NavItem
                  key={index}
                  item={section as BasicItem}
                  isActive={pathname === (section as BasicItem).url}
                  level={0}
                />
              )
          ))}

          {/* Footer section */}
          <div className="mt-8 pt-4 border-t border-sidebar-border">
            <div className="flex items-center gap-3 px-3 py-2 text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent/50 rounded-md cursor-pointer">
              <FolderOpen className="h-4 w-4" />
              <span>Manage folders</span>
            </div>
          </div>
        </div>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  )
}
