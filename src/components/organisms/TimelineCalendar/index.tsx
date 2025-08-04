import { useState, useRef, useEffect } from "react"
import TimeSlot from "@/components/atoms/TimeSlot"
import EmployeeColumn from "@/components/molecules/EmployeeColumn"
import CalendarNavigation from "@/components/molecules/CalendarNavigation"

interface Event {
  id: string;
  title: string;
  timeRange: string;
  type: 'internal' | 'personal' | 'maintenance';
  number?: string;
  startTime: string;
  duration: number;
  employeeId: string;
}

interface Employee {
  id: string;
  name: string;
  hours: string;
  avatar?: string;
}

interface TimelineCalendarProps {
  employees: Employee[];
  events: Event[];
  currentDate: Date;
  onDateChange: (date: Date) => void;
  onEventClick?: (event: Event) => void;
  onAddWork?: () => void;
  onAddEmployee?: () => void;
}

// Generate time slots from 9:00 AM to 6:00 PM
const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 9; hour <= 17; hour++) {
    const period = hour >= 12 ? 'pm' : 'am';
    const displayHour = hour > 12 ? hour - 12 : hour;

    if (hour < 17) {
      slots.push(`${displayHour}:00 ${period}`);
      slots.push(`${displayHour}:30 ${period}`);
    } else {
      slots.push(`${displayHour}:00 ${period}`);
    }
  }
  return slots;
}

// Get current time indicator position
const getCurrentTimePosition = () => {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  // Only show if within working hours (9 AM - 6 PM)
  if (currentHour < 9 || currentHour >= 18) {
    return null;
  }

  const startHour = 9;
  const totalMinutes = (currentHour - startHour) * 60 + currentMinute;
  const totalWorkingMinutes = 9 * 60; // 9 hours
  const percentage = (totalMinutes / totalWorkingMinutes) * 100;

  return Math.min(100, Math.max(0, percentage));
}

export default function TimelineCalendar({
  employees,
  events,
  currentDate,
  onDateChange,
  onEventClick,
  onAddWork,
  onAddEmployee
}: TimelineCalendarProps) {
  const [activeView, setActiveView] = useState('day')
  const [currentTimePosition, setCurrentTimePosition] = useState<number | null>(getCurrentTimePosition())
  const timelineRef = useRef<HTMLDivElement>(null)

  // Update current time position every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimePosition(getCurrentTimePosition())
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  // Check if it's today to show current time indicator
  const isToday = currentDate.toDateString() === new Date().toDateString()

  const timeSlots = generateTimeSlots()

  // Handle view changes and auto-navigation
  useEffect(() => {
    if (activeView === 'today') {
      const today = new Date()
      const currentDay = currentDate.toDateString()
      const todayString = today.toDateString()
      if (currentDay !== todayString) {
        onDateChange(today) // Auto-navigate to today
      }
    }
  }, [activeView, currentDate, onDateChange])

  // Filter events based on active view
  const getFilteredEmployees = () => {
    return employees
  }

    const getFilteredEvents = () => {
    switch (activeView) {
      case 'today':
      case 'day':
        // Show events only for the selected day
        return events.filter(() => {
          // For now, we'll show all events as they represent the selected day
          return true
        })
      case 'week':
        // For week view, we could show multiple days, but for now show current day
        return events
      case 'month':
        // For month view, we could show a different layout, but for now show current day
        return events
      default:
        return events
    }
  }

  const filteredEmployees = getFilteredEmployees()
  const filteredEvents = getFilteredEvents()

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation */}
      <CalendarNavigation
        currentDate={currentDate}
        onDateChange={onDateChange}
        onViewChange={setActiveView}
        activeView={activeView}
        onAddWork={onAddWork}
      />

      {/* Timeline Container - Force full height */}
      <div className="flex flex-1 overflow-hidden min-h-0">
        {/* Time Labels Column */}
        <div className="flex flex-col bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 min-w-[100px]">
          {/* Empty header space to align with employee headers */}
          <div className="h-[73px] border-b border-gray-200 dark:border-gray-800 flex items-center justify-center">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">All Day</span>
          </div>

          {/* Time slots */}
          <div className="flex-1 relative">
            {timeSlots.map((time, index) => (
              <TimeSlot
                key={time}
                time={time}
                isCurrentTime={isToday && index === Math.floor((getCurrentTimePosition() || 0) / (100 / timeSlots.length))}
              />
            ))}
          </div>
        </div>

        {/* Scrollable Employees Area */}
        <div className="flex-1 overflow-x-auto">
          <div className="flex min-w-full h-full" ref={timelineRef}>
            {/* Employee Columns */}
            {filteredEmployees.map((employee) => (
              <EmployeeColumn
                key={employee.id}
                employee={employee}
                events={filteredEvents.filter(event => event.employeeId === employee.id)}
                onEventClick={onEventClick}
              />
            ))}

            {/* Add Employee Column */}
            <EmployeeColumn
              employee={{ id: '', name: '', hours: '' }}
              events={[]}
              isAddButton={true}
              onAddClick={onAddEmployee}
            />
          </div>

          {/* Current Time Indicator */}
          {isToday && currentTimePosition !== null && (
            <div
              className="absolute left-[100px] right-0 h-0.5 bg-red-500 z-20 pointer-events-none"
              style={{
                top: `${73 + (currentTimePosition / 100) * (timeSlots.length * 56)}px` // 73px header + calculated position
              }}
            >
              <div className="absolute left-0 w-3 h-3 bg-red-500 rounded-full -translate-y-1/2 -translate-x-1/2"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
