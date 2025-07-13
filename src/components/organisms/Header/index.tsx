"use client";
import { SearchTrigger } from "@/components/molecules/SearchTrigger";
import Notifications from "@/components/molecules/Notifications";
import { UserProfile } from "@/components/molecules/UserProfile";

const user = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
}

export function Header({ setIsOpen }: { setIsOpen: (isOpen: boolean) => void }) {
  return (
    <header className="flex items-center justify-between px-6 py-4">
      <div className="w-md max-w-2xl p-4">
        <SearchTrigger onOpen={() => setIsOpen(true)} />
      </div>

      <div className="flex items-center gap-4">
        <Notifications />

        <UserProfile user={user} />
      </div>
    </header>
  );
}
