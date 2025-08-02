"use client";
import { SearchTrigger } from "@/components/molecules/SearchTrigger";
import Notifications from "@/components/molecules/Notifications";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/molecules/ThemeToggle";
import { LanguageSelector } from "@/components/molecules/LanguageSelector";

export function Header({ setIsOpen }: { setIsOpen: (isOpen: boolean) => void }) {
  return (
    <header className="flex items-center justify-between px-4 sm:px-6 py-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      {/* Left section with sidebar trigger */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <SidebarTrigger className="-ml-1" />
      </div>

      {/* Center search - prominent and wide */}
      <div className="flex-1 max-w-2xl mx-4 sm:mx-8">
        <SearchTrigger onOpen={() => setIsOpen(true)} />
      </div>

      {/* Right section - clean icons */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <ThemeToggle />
        <Notifications />
        <LanguageSelector />
      </div>
    </header>
  );
}
