import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ChevronDown, ChevronUp } from 'lucide-react'
import React from 'react'

const UserDropdown = () => {
  return (
    <div className="flex items-center gap-3">
          <Avatar className="w-11 h-11">
            <AvatarImage src="https://i.pravatar.cc/300" alt="User Avatar" />
            <AvatarFallback>BS</AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <span className="font-semibold text-gray-900 text-sm">
              Budiono Siregar
            </span>
            <span className="text-gray-500 text-xs">
              budiononsiregar@gmail.com
            </span>
          </div>

          <div className="flex flex-col gap-0.5 ml-2">
            <ChevronUp className="w-4 h-4 text-gray-400" />
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>
  )
}

export default UserDropdown
