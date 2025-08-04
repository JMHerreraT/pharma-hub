import { Calendar, FileText, Settings, User } from "lucide-react"

interface EventCardProps {
  title: string;
  timeRange: string;
  type: 'internal' | 'personal' | 'maintenance';
  number?: string;
  onClick?: () => void;
}

const getEventIcon = (type: string) => {
  switch (type) {
    case 'internal':
      return <Calendar className="h-4 w-4" />
    case 'personal':
      return <User className="h-4 w-4" />
    case 'maintenance':
      return <Settings className="h-4 w-4" />
    default:
      return <FileText className="h-4 w-4" />
  }
}

const getEventColors = (type: string) => {
  switch (type) {
    case 'internal':
      return {
        bg: 'bg-blue-50 dark:bg-blue-950/20',
        border: 'border-blue-200 dark:border-blue-800',
        text: 'text-blue-900 dark:text-blue-100',
        badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
      }
    case 'personal':
      return {
        bg: 'bg-indigo-50 dark:bg-indigo-950/20',
        border: 'border-indigo-200 dark:border-indigo-800',
        text: 'text-indigo-900 dark:text-indigo-100',
        badge: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200'
      }
    case 'maintenance':
      return {
        bg: 'bg-orange-50 dark:bg-orange-950/20',
        border: 'border-orange-200 dark:border-orange-800',
        text: 'text-orange-900 dark:text-orange-100',
        badge: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-200'
      }
    default:
      return {
        bg: 'bg-gray-50 dark:bg-gray-950/20',
        border: 'border-gray-200 dark:border-gray-800',
        text: 'text-gray-900 dark:text-gray-100',
        badge: 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-200'
      }
  }
}

const getTypeLabel = (type: string) => {
  switch (type) {
    case 'internal':
      return 'Internal Task'
    case 'personal':
      return 'Personal Task'
    case 'maintenance':
      return 'Maintenance Request'
    default:
      return 'Task'
  }
}

export default function EventCard({ title, timeRange, type, number, onClick }: EventCardProps) {
  const colors = getEventColors(type)
  const icon = getEventIcon(type)
  const typeLabel = getTypeLabel(type)

  return (
    <div
      className={`p-3 rounded-lg border cursor-pointer hover:shadow-sm transition-all duration-200 ${colors.bg} ${colors.border} ${colors.text}`}
      onClick={onClick}
    >
      <div className="flex items-start gap-2 mb-2">
        <div className="mt-0.5">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-medium text-sm truncate">
              {title}
            </h4>
            {number && (
              <span className="text-xs text-muted-foreground font-mono">
                {number}
              </span>
            )}
          </div>
          <p className="text-xs mb-2">
            {timeRange} • {typeLabel}
          </p>
        </div>
      </div>
    </div>
  )
}
