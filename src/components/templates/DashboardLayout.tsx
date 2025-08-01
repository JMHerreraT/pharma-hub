// src/components/templates/DashboardLayout.tsx
"use client";

import { ReactNode, useState } from "react";
import { Header } from "@/components/organisms/Header";
import SearchDialog from "../organisms/SearchDialog/SearchDialog";
import { SidebarComponent } from "../organisms/Sidebar";
import { SidebarInset } from "@/components/ui/sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Sidebar - usando el sistema de shadcn/ui */}
      <SidebarComponent />

      {/* Main content area usando SidebarInset */}
      <SidebarInset className="flex flex-col h-screen overflow-hidden">
        {/* Header responsive */}
        <div className="flex-shrink-0 border-b border-sidebar-border/50 bg-background">
          <Header setIsOpen={setIsOpen} />
        </div>

        {/* Main content with responsive padding */}
        <div className="flex-1 overflow-hidden p-2 sm:p-3 md:p-4">
          <main className="h-full overflow-y-auto bg-background rounded-lg shadow-sm md:shadow-lg">
            <div className="p-3 sm:p-4 md:p-6 h-full">
              {children}
            </div>
          </main>
        </div>
      </SidebarInset>

      <SearchDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
