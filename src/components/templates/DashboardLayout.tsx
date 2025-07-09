// src/components/templates/DashboardLayout.tsx
"use client";

import { ReactNode, useState } from "react";
import { Sidebar } from "@/components/organisms/Sidebar";
import { Header } from "@/components/organisms/Header";
import SearchDialog from "../organisms/SearchDialog/SearchDialog";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen w-full text-secondary-foreground bg-gradient-to-b from-[#eff5f5] to-[#e3fcfd]">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header setIsOpen={setIsOpen} />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
      <SearchDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
