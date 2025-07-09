import { Bell, Globe } from 'lucide-react'
import React from 'react'

const Notifications = () => {
  const handleBellClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    console.log('Bell clicked - opening notifications')
  }

  const handleLanguageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    console.log('Language clicked - opening language selector')
  }

  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors">
      {/* Bell notification - clickeable area */}
      <div
        className="cursor-pointer relative p-1 -m-1 rounded-full hover:bg-gray-200 transition-colors"
        onClick={handleBellClick}
      >
        <Bell className="w-5 h-5 text-gray-500" fill="currentColor" />
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"/>
      </div>

      {/* Language selector - clickeable area */}
      <div
        className="cursor-pointer flex items-center gap-2 p-1 -m-1 rounded-full hover:bg-gray-200 transition-colors"
        onClick={handleLanguageClick}
      >
        <span className="text-gray-500 font-medium">EN</span>
        <Globe className="w-5 h-5 text-gray-500" />
      </div>
    </div>
  )
}

export default Notifications
