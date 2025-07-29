// src/components/templates/DashboardLayout.tsx
"use client";

import { ReactNode, useState } from "react";
import { Header } from "@/components/organisms/Header";
import SearchDialog from "../organisms/SearchDialog/SearchDialog";
import { SidebarComponent } from "../organisms/Sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-full w-full bg-sidebar">
      <SidebarComponent />

      {/* Contenedor principal con el efecto card */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header que mantiene el background del sidebar */}
        <div className="bg-sidebar">
          <Header setIsOpen={setIsOpen} />
        </div>

        <div className="p-2 h-full overflow-y-auto">
        <main className="flex-1 overflow-y-auto bg-background rounded-lg shadow-lg">
          <div className="p-6 h-full">
            {children}
          </div>
        </main>
        </div>
        {/* Contenido principal como card */}

      </div>

      <SearchDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
