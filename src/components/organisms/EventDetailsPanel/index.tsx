import { Calendar, Clock, User, MapPin, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

interface Event {
  id: string;
  title: string;
  timeRange: string;
  type: 'internal' | 'personal' | 'maintenance';
  number?: string;
  startTime: string;
  duration: number;
  employeeId: string;
  description?: string;
  location?: string;
  assignee?: {
    name: string;
    avatar?: string;
  };
}

interface EventDetailsPanelProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}

const getEventIcon = (type: string) => {
  switch (type) {
    case 'internal':
      return <Calendar className="h-5 w-5" />
    case 'personal':
      return <User className="h-5 w-5" />
    case 'maintenance':
      return <Settings className="h-5 w-5" />
    default:
      return <Calendar className="h-5 w-5" />
  }
}

const getEventColors = (type: string) => {
  switch (type) {
    case 'internal':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
    case 'personal':
      return 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200'
    case 'maintenance':
      return 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-200'
    default:
      return 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-200'
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

export default function EventDetailsPanel({ event, isOpen, onClose }: EventDetailsPanelProps) {
  if (!event) return null

  const typeLabel = getTypeLabel(event.type)
  const icon = getEventIcon(event.type)
  const badgeColor = getEventColors(event.type)

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <div className="flex items-center gap-2 mb-2">
            {icon}
            <Badge className={badgeColor}>
              {typeLabel}
            </Badge>
          </div>
          <SheetTitle className="text-left">
            {event.title}
          </SheetTitle>
          {event.number && (
            <SheetDescription className="text-left font-mono">
              {event.number}
            </SheetDescription>
          )}
        </SheetHeader>

        {/* Content */}
        <div className="mt-6 space-y-6">
          {/* Date & Time */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Date & Time
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Saturday, 12 March 2021</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {event.timeRange} ({Math.floor(event.duration / 60)} hour{Math.floor(event.duration / 60) !== 1 ? 's' : ''})
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Assignee Information */}
          {event.assignee && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Assignee Information</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    {event.assignee.avatar ? (
                      <AvatarImage src={event.assignee.avatar} alt={event.assignee.name} />
                    ) : (
                      <AvatarFallback className="bg-primary/10 text-primary font-medium">
                        {event.assignee.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {event.assignee.name}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Unit Information */}
          {event.location && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Unit Information
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Unit 56</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {event.location}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Description */}
          {event.description && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Description</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {event.description}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="space-y-2 pt-4">
            <Button className="w-full">
              Edit Event
            </Button>
            <Button variant="outline" className="w-full">
              Duplicate
            </Button>
            <Button variant="outline" className="w-full text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">
              Delete
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
