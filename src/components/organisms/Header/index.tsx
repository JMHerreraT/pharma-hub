"use client";
import { SearchTrigger } from "@/components/molecules/SearchTrigger";
import UserDropdown from "@/components/molecules/UserDropdown";
import NotificationsDropdown from "@/components/molecules/Notifications/NotificationsDropdown";

export function Header({ setIsOpen }: { setIsOpen: (isOpen: boolean) => void }) {
  return (
    <header className="flex items-center justify-between px-6 py-4">
      <div className="w-md max-w-2xl p-4">
        <SearchTrigger onOpen={() => setIsOpen(true)} />
      </div>

      <div className="flex items-center gap-4">
        <NotificationsDropdown />

        <UserDropdown />
      </div>
    </header>
  );
}
