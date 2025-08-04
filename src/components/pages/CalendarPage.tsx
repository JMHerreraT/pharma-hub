"use client"

import React, { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import TimelineCalendar from "@/components/organisms/TimelineCalendar"
import EventDetailsPanel from "@/components/organisms/EventDetailsPanel"

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

// Mock data for employees
const mockEmployees = [
  {
    id: "1",
    name: "Nicholas Amazon",
    hours: "4 hours",
    avatar: undefined
  },
  {
    id: "2",
    name: "Logan Harrington",
    hours: "6.5 hours",
    avatar: undefined
  },
  {
    id: "3",
    name: "Leonard Campbell",
    hours: "5 hours",
    avatar: undefined
  }
]

// Mock data for events matching the design
const mockEvents = [
  {
    id: "1",
    title: "Remodeling",
    timeRange: "9:30 - 10:00",
    type: "internal" as const,
    number: "#327",
    startTime: "9:30",
    duration: 30,
    employeeId: "1",
    description: "Building renovation and structural improvements",
    assignee: {
      name: "Nicholas Amazon"
    }
  },
  {
    id: "2",
    title: "Generate Report",
    timeRange: "10:00 - 10:30",
    type: "personal" as const,
    number: "#312",
    startTime: "10:00",
    duration: 30,
    employeeId: "1",
    description: "Monthly performance and analytics report",
    assignee: {
      name: "Nicholas Amazon"
    }
  },
  {
    id: "3",
    title: "Bathrom Remodeling",
    timeRange: "10:00 - 10:30",
    type: "maintenance" as const,
    number: "#296",
    startTime: "10:00",
    duration: 30,
    employeeId: "2",
    description: "Complete bathroom renovation with new fixtures",
    location: "225 Cherry Street #24 Brooklyn, NY",
    assignee: {
      name: "Logan Harrington"
    }
  },
  {
    id: "4",
    title: "Garbage Disposals",
    timeRange: "10:30 - 11:20",
    type: "internal" as const,
    number: "#318",
    startTime: "10:30",
    duration: 50,
    employeeId: "2",
    description: "Installation and maintenance of waste disposal units",
    assignee: {
      name: "Logan Harrington"
    }
  },
  {
    id: "5",
    title: "Landscaping Services",
    timeRange: "10:30 - 11:00",
    type: "internal" as const,
    number: "#332",
    startTime: "10:30",
    duration: 30,
    employeeId: "3",
    description: "Garden design and maintenance services",
    assignee: {
      name: "Leonard Campbell"
    }
  },
  {
    id: "6",
    title: "Chimney Repair",
    timeRange: "11:00 - 11:30",
    type: "maintenance" as const,
    number: "#308",
    startTime: "11:00",
    duration: 30,
    employeeId: "1",
    description: "Structural repair and cleaning of chimney system",
    assignee: {
      name: "Nicholas Amazon"
    }
  },
  {
    id: "7",
    title: "Energy Audits",
    timeRange: "11:30 - 12:00",
    type: "personal" as const,
    number: "#294",
    startTime: "11:30",
    duration: 30,
    employeeId: "2",
    description: "Comprehensive energy efficiency assessment",
    assignee: {
      name: "Logan Harrington"
    }
  },
  {
    id: "8",
    title: "Electrical Services",
    timeRange: "11:30 - 12:20",
    type: "maintenance" as const,
    number: "#309",
    startTime: "11:30",
    duration: 50,
    employeeId: "3",
    description: "Electrical wiring and fixture installation",
    assignee: {
      name: "Leonard Campbell"
    }
  },
  {
    id: "9",
    title: "Garbage Disposals",
    timeRange: "12:00 - 12:30",
    type: "internal" as const,
    number: "#293",
    startTime: "12:00",
    duration: 30,
    employeeId: "1",
    description: "Installation and maintenance of waste disposal units",
    assignee: {
      name: "Nicholas Amazon"
    }
  },
  {
    id: "10",
    title: "Painting Services",
    timeRange: "12:30 - 1:00",
    type: "internal" as const,
    number: "#299",
    startTime: "12:30",
    duration: 30,
    employeeId: "1",
    description: "Interior and exterior painting services",
    assignee: {
      name: "Nicholas Amazon"
    }
  },
  {
    id: "11",
    title: "Plumbing Services",
    timeRange: "1:00 - 1:30",
    type: "internal" as const,
    number: "#297",
    startTime: "13:00",
    duration: 30,
    employeeId: "2",
    description: "Pipe installation and repair services",
    assignee: {
      name: "Logan Harrington"
    }
  },
  {
    id: "12",
    title: "Generate Report",
    timeRange: "1:00 - 1:30",
    type: "personal" as const,
    number: "#324",
    startTime: "13:00",
    duration: 30,
    employeeId: "3",
    description: "Monthly performance and analytics report",
    assignee: {
      name: "Leonard Campbell"
    }
  }
]

export function CalendarPage() {
  // Initialize with null to avoid hydration issues
  const [currentDate, setCurrentDate] = useState<Date | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isPanelOpen, setIsPanelOpen] = useState(false)

  // Initialize date after hydration
  useEffect(() => {
    setCurrentDate(new Date())
  }, [])

  // Show loading skeleton during hydration
  if (!currentDate) {
    return (
      <div className="h-screen bg-gray-50 dark:bg-gray-900">
        <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-8 w-8" />
          </div>
          <div className="flex gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-9 w-16" />
            ))}
          </div>
          <Skeleton className="h-9 w-28" />
        </div>
        <div className="flex h-full">
          <div className="w-24 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800">
            <div className="h-16 border-b border-gray-200 dark:border-gray-800" />
            <div className="space-y-4 p-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          </div>
          <div className="flex-1 flex">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex-1 border-r border-gray-200 dark:border-gray-800">
                <div className="h-16 p-4 border-b border-gray-200 dark:border-gray-800">
                  <Skeleton className="h-8 w-full" />
                </div>
                <div className="p-4 space-y-4">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <Skeleton key={j} className="h-16 w-full" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event)
    setIsPanelOpen(true)
  }

  const handleClosePanel = () => {
    setIsPanelOpen(false)
    setSelectedEvent(null)
  }

  const handleAddWork = () => {
    console.log("Add work order clicked")
  }

  const handleAddEmployee = () => {
    console.log("Add employee clicked")
  }

  return (
    <div className="relative">
      <TimelineCalendar
        employees={mockEmployees}
        events={mockEvents}
        currentDate={currentDate}
        onDateChange={setCurrentDate}
        onEventClick={handleEventClick}
        onAddWork={handleAddWork}
        onAddEmployee={handleAddEmployee}
      />

      <EventDetailsPanel
        event={selectedEvent}
        isOpen={isPanelOpen}
        onClose={handleClosePanel}
      />
    </div>
  )
}
