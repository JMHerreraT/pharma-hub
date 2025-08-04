import EmployeeHeader from "@/components/atoms/EmployeeHeader"
import EventCard from "@/components/atoms/EventCard"

interface Event {
  id: string;
  title: string;
  timeRange: string;
  type: 'internal' | 'personal' | 'maintenance';
  number?: string;
  startTime: string;
  duration: number; // in minutes
  employeeId: string;
}

interface EmployeeColumnProps {
  employee: {
    id: string;
    name: string;
    hours: string;
    avatar?: string;
  };
  events: Event[];
  onEventClick?: (event: Event) => void;
  isAddButton?: boolean;
  onAddClick?: () => void;
}

// Helper function to convert time to position percentage
const getEventPosition = (startTime: string, duration: number) => {
  const [hours, minutes] = startTime.split(':').map(Number);
  const startMinutes = hours * 60 + minutes;

  // Calendar starts at 9:00 AM (540 minutes from midnight)
  const calendarStart = 9 * 60; // 9:00 AM
  const calendarEnd = 18 * 60; // 6:00 PM
  const calendarDuration = calendarEnd - calendarStart; // 9 hours = 540 minutes

  const relativeStart = startMinutes - calendarStart;
  const top = (relativeStart / calendarDuration) * 100;
  const height = (duration / calendarDuration) * 100;

  return { top: `${Math.max(0, top)}%`, height: `${height}%` };
}

export default function EmployeeColumn({ employee, events, onEventClick, isAddButton = false, onAddClick }: EmployeeColumnProps) {
    if (isAddButton) {
    return (
      <div className="flex flex-col flex-1 min-w-[250px] border-r border-gray-200 dark:border-gray-800 h-full">
        <EmployeeHeader
          name=""
          hours=""
          isAddButton={true}
          onClick={onAddClick}
        />
        <div className="relative flex-1 bg-gray-50/50 dark:bg-gray-900/50"></div>
      </div>
    )
  }

    return (
    <div className="flex flex-col flex-1 min-w-[250px] border-r border-gray-200 dark:border-gray-800 last:border-r-0 h-full">
      <EmployeeHeader
        name={employee.name}
        hours={employee.hours}
        avatar={employee.avatar}
      />
      <div className="relative flex-1 min-h-[500px] bg-white dark:bg-gray-950">
        {events.map((event) => {
          const position = getEventPosition(event.startTime, event.duration);
          return (
            <div
              key={event.id}
              className="absolute left-2 right-2 z-10"
              style={{
                top: position.top,
                height: position.height,
                minHeight: '60px'
              }}
            >
              <EventCard
                title={event.title}
                timeRange={event.timeRange}
                type={event.type}
                number={event.number}
                onClick={() => onEventClick?.(event)}
              />
            </div>
          );
        })}

        {/* Time grid lines */}
        {Array.from({ length: 10 }, (_, i) => (
          <div
            key={i}
            className="absolute left-0 right-0 border-t border-gray-100 dark:border-gray-800"
            style={{ top: `${(i / 9) * 100}%` }}
          />
        ))}
      </div>
    </div>
  )
}
