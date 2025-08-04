import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus } from "lucide-react"

interface EmployeeHeaderProps {
  name: string;
  hours: string;
  avatar?: string;
  isAddButton?: boolean;
  onClick?: () => void;
}

export default function EmployeeHeader({ name, hours, avatar, isAddButton = false, onClick }: EmployeeHeaderProps) {
  if (isAddButton) {
    return (
      <div className="flex items-center justify-center p-4 border-b cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors" onClick={onClick}>
        <Plus className="h-5 w-5 text-gray-400" />
      </div>
    )
  }

  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase()

  return (
    <div className="flex items-center gap-3 p-4 border-b bg-white dark:bg-gray-950">
      <Avatar className="h-10 w-10">
        {avatar ? (
          <AvatarImage src={avatar} alt={name} />
        ) : (
          <AvatarFallback className="bg-primary/10 text-primary font-medium">
            {initials}
          </AvatarFallback>
        )}
      </Avatar>
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-sm text-gray-900 dark:text-white truncate">
          {name}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {hours}
        </p>
      </div>
    </div>
  )
}
