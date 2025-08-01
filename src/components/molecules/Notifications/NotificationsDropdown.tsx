import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Bell, MessageSquare, Receipt, Users } from 'lucide-react'
import React from 'react'

const NotificationsDropdown = () => {
    const notifications = [
        {
          id: 1,
          icon: Receipt,
          iconColor: "text-blue-500",
          iconBg: "bg-blue-50",
          title: "Invoice #92DD97C4 was paid",
          timestamp: "15 hours ago",
          isNew: true,
        },
        {
          id: 2,
          icon: MessageSquare,
          iconColor: "text-gray-500",
          iconBg: "bg-gray-50",
          title: "Deian Test posted a team note in ticket #PL2REN",
          timestamp: "18 hours ago",
          isNew: false,
        },
        {
          id: 3,
          icon: MessageSquare,
          iconColor: "text-gray-500",
          iconBg: "bg-gray-50",
          title: "Chris Client posted a message in Custom pricing inquiry",
          timestamp: "Nov 25, 2024",
          isNew: false,
        },
        {
          id: 4,
          icon: Users,
          iconColor: "text-gray-500",
          iconBg: "bg-gray-50",
          title: "Deian Test replied to client in ticket #PL2REN",
          timestamp: "Nov 20, 2024",
          isNew: false,
        },
      ]

      return (
        <div className="flex items-center justify-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="relative h-9 w-9 p-0 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                <Bell className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                {/* Notification badge */}
                <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500"></span>
                <span className="sr-only">Notifications</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-96 p-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600" align="end">
                <div className="flex flex-row items-center justify-between py-4 px-6 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h3>
                  <Button variant="link" className="p-0 h-auto font-medium text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 cursor-pointer">
                    Mark all as read
                  </Button>
                </div>
                <div className="p-0">
                  <div className="divide-y divide-gray-100 dark:divide-gray-700">
                    {notifications.map((notification) => {
                      const IconComponent = notification.icon
                      return (
                        <div
                          key={notification.id}
                          className="flex items-start gap-3 p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                        >
                          <div
                            className={`flex-shrink-0 w-10 h-10 rounded-lg ${notification.iconBg} dark:bg-gray-700 flex items-center justify-center`}
                          >
                            <IconComponent className={`w-5 h-5 ${notification.iconColor} dark:text-gray-300`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white leading-5">{notification.title}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{notification.timestamp}</p>
                          </div>
                          {notification.isNew && (
                            <div className="flex-shrink-0 w-2 h-2 rounded-full mt-2"></div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                  <div className="p-4 border-t">
                    <Button variant="outline" className="w-full text-gray-700 hover:text-gray-900">
                      Show all
                    </Button>
                  </div>
                </div>
            </PopoverContent>
          </Popover>
        </div>
      )
}

export default NotificationsDropdown
