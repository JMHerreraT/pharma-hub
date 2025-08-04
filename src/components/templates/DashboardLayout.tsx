// src/components/templates/DashboardLayout.tsx
"use client";

import React, { useState } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { Header } from "@/components/organisms/Header"
import { FloatingChatButton } from "@/components/atoms/FloatingChatButton"
import { GlobalAIChat } from "@/components/organisms/GlobalAIChat"
import SearchDialog from "@/components/organisms/SearchDialog/SearchDialog"
import { AppSidebar } from "../organisms/Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <SidebarInset className="flex flex-col h-screen overflow-hidden">
          <div className="flex-shrink-0 border-b border-sidebar-border/50 bg-background">
            <Header setIsOpen={setIsSearchOpen} />
          </div>
          <div className="flex-1 overflow-hidden p-2 sm:p-3 md:p-4">
            <main className="h-full overflow-y-auto bg-background rounded-lg shadow-sm md:shadow-lg">
              <div className="p-3 sm:p-4 md:p-6 h-full">
                {children}
              </div>
            </main>
          </div>
        </SidebarInset>

        {/* Global Floating Chatbot */}
        <FloatingChatButton
          onClick={() => setIsChatOpen(true)}
          isOpen={isChatOpen}
        />

        <GlobalAIChat
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
        />

        <SearchDialog isOpen={isSearchOpen} setIsOpen={setIsSearchOpen} />
      </div>
    </SidebarProvider>
  )
}
