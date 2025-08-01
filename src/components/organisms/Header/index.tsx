"use client";
import { SearchTrigger } from "@/components/molecules/SearchTrigger";
import Notifications from "@/components/molecules/Notifications";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function Header({ setIsOpen }: { setIsOpen: (isOpen: boolean) => void }) {
  return (
    <header className="flex items-center justify-between px-3 sm:px-4 lg:px-6 py-3 lg:py-4">
      {/* Left section with sidebar trigger */}
      <div className="flex items-center gap-2 lg:gap-4">
        <SidebarTrigger className="-ml-1" />
        <div className="hidden sm:block lg:hidden">
          <h1 className="text-lg font-semibold text-foreground">Pharmacy</h1>
        </div>
      </div>

      {/* Center search - responsive width */}
      <div className="flex-1 max-w-lg mx-4 lg:mx-8">
        <div className="w-full">
          <SearchTrigger onOpen={() => setIsOpen(true)} />
        </div>
      </div>

      {/* Right section - responsive spacing */}
      <div className="flex items-center gap-1 sm:gap-2 lg:gap-4">
        <Notifications />
        <div className="hidden sm:block">
          {/* UserProfile podría estar aquí si es necesario */}
        </div>
      </div>
    </header>
  );
}
