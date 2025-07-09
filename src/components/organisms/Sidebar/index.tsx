"use client";
import BranchSelector from "@/components/molecules/BranchSelector";
import {
  LayoutDashboard,
  Package,
  BarChart,
  Users,
  ClipboardList,
  Settings,
  Boxes,
  Home,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const navItems = [
  {
    label: "Main Menu",
    children: [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: Home
      },
      {
        label: "Products",
        href: "/dashboard/products",
        icon: Boxes
      },
      {
        label: "Categories",
        href: "/dashboard/categories",
        icon: LayoutDashboard
      }
    ]
  },
  {
    label: "Leads",
    children: [
      { label: "Products", href: "/dashboard/products", icon: Package },
      { label: "Orders", href: "/dashboard/orders", icon: ClipboardList },
      { label: "Sales", href: "/dashboard/sales", icon: BarChart },
    ]
  },
  {
    label: "comms",
    children: [
      { label: "Customers", href: "/dashboard/customers", icon: Users },
      { label: "Settings", href: "/dashboard/settings", icon: Settings },
    ]
  }
];

export function Sidebar() {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "Main Menu"
  ]);

  const toggleSection = (sectionLabel: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionLabel)
        ? prev.filter(label => label !== sectionLabel)
        : [...prev, sectionLabel]
    );
  };

  // Función para verificar si una ruta está activa
  const isActiveRoute = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-64 h-full dark:bg-muted p-4 space-y-6">
      <div className="text-2xl font-bold px-4">Pharmacy</div>
      <BranchSelector />
      <nav className="space-y-2">
        {navItems.map(({ label, children }) => (
          <div key={label} className="space-y-1">
            <button
              onClick={() => toggleSection(label)}
              className="w-full flex items-center justify-between px-4 py-2 text-xs font-bold text-primary uppercase hover:bg-muted/20 rounded-lg transition-colors"
            >
              <span>{label}</span>
              {expandedSections.includes(label) ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
            {expandedSections.includes(label) && children && children.length > 0 && (
              <div className="ml-2 space-y-1">
                {children.map(({ label: childLabel, href, icon: Icon }) => {
                  const isActive = isActiveRoute(href);

                  return (
                    <Link
                      key={childLabel}
                      href={href}
                      className={`group flex items-center gap-3 px-4 py-2 rounded-full transition-colors ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-primary hover:text-primary-foreground"
                      }`}
                    >
                      <div className={`w-8 h-8 flex items-center justify-center rounded-full p-2 transition-colors ${
                        isActive
                          ? "bg-primary-foreground/20"
                          : "bg-primary/10 group-hover:bg-primary-foreground/20"
                      }`}>
                        <Icon className={`h-3 w-3 transition-colors ${
                          isActive
                            ? "text-primary-foreground"
                            : "text-primary group-hover:text-primary-foreground"
                        }`} fill="currentColor"/>
                      </div>
                      <span className="text-sm font-normal">{childLabel}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
