import { Bell, Globe } from 'lucide-react'
import React from 'react'
import NotificationsDropdown from './NotificationsDropdown'
import { ThemeToggle } from '../ThemeToggle'

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
    <div className="flex items-center gap-3 px-4 py-3 bg-primary/10 rounded-full border border-primary/10 hover:bg-primary/20 transition-colors">
      {/* Bell notification - clickeable area */}
     <NotificationsDropdown />

      {/* Language selector - clickeable area */}
      {/* <div
        className="cursor-pointer flex items-center gap-2 p-1 -m-1 rounded-full hover:bg-primary/20 transition-colors"
        onClick={handleLanguageClick}
      >
        <span className="text-primary-foreground font-medium">EN</span>
        <Globe className="w-5 h-5 text-primary-foreground" />
      </div> */}

      <ThemeToggle />
    </div>
  )
}

export default Notifications
