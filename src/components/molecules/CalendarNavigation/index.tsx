import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import ViewButton from "@/components/atoms/ViewButton"

interface CalendarNavigationProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  onViewChange: (view: string) => void;
  activeView: string;
  onAddWork?: () => void;
}

const formatDate = (date: Date, view: string) => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  switch (view) {
    case 'today':
    case 'day':
      return `${month} ${day}, ${year}`;
    case 'week':
      // Show week range
      const startOfWeek = new Date(date);
      startOfWeek.setDate(date.getDate() - date.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);

      const startMonth = months[startOfWeek.getMonth()];
      const endMonth = months[endOfWeek.getMonth()];

      if (startOfWeek.getMonth() === endOfWeek.getMonth()) {
        return `${startMonth} ${startOfWeek.getDate()} - ${endOfWeek.getDate()}, ${year}`;
      } else {
        return `${startMonth} ${startOfWeek.getDate()} - ${endMonth} ${endOfWeek.getDate()}, ${year}`;
      }
    case 'month':
      return `${month} ${year}`;
    default:
      return `${month} ${day}, ${year}`;
  }
}

const navigateDate = (currentDate: Date, direction: 'prev' | 'next', view: string) => {
  const newDate = new Date(currentDate);

  switch (view) {
    case 'day':
    case 'today':
      if (direction === 'prev') {
        newDate.setDate(newDate.getDate() - 1);
      } else {
        newDate.setDate(newDate.getDate() + 1);
      }
      break;
    case 'week':
      if (direction === 'prev') {
        newDate.setDate(newDate.getDate() - 7);
      } else {
        newDate.setDate(newDate.getDate() + 7);
      }
      break;
    case 'month':
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      break;
    default:
      if (direction === 'prev') {
        newDate.setDate(newDate.getDate() - 1);
      } else {
        newDate.setDate(newDate.getDate() + 1);
      }
  }

  return newDate;
}

const isToday = (date: Date) => {
  const today = new Date();
  return date.toDateString() === today.toDateString();
}

export default function CalendarNavigation({ currentDate, onDateChange, onViewChange, activeView, onAddWork }: CalendarNavigationProps) {
  const handlePrevious = () => {
    onDateChange(navigateDate(currentDate, 'prev', activeView));
  };

  const handleNext = () => {
    onDateChange(navigateDate(currentDate, 'next', activeView));
  };

  const handleToday = () => {
    onDateChange(new Date());
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
      {/* Left side - Date navigation */}
      <div className="flex items-center gap-4">
        <button
          onClick={handlePrevious}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        </button>

        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
            {formatDate(currentDate, activeView)}
          </h1>
          {isToday(currentDate) && activeView !== 'today' && (
            <span className="text-sm text-gray-500 dark:text-gray-400">Today</span>
          )}
          {activeView === 'today' && (
            <span className="text-sm text-teal-600 dark:text-teal-400 font-medium">Today</span>
          )}
        </div>

        <button
          onClick={handleNext}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      {/* Center - View buttons */}
      <div className="flex items-center gap-2">
        <ViewButton
          isActive={activeView === 'today'}
          onClick={() => {
            handleToday();
            onViewChange('today');
          }}
        >
          Today
        </ViewButton>
        <ViewButton
          isActive={activeView === 'day'}
          onClick={() => onViewChange('day')}
        >
          Day
        </ViewButton>
        <ViewButton
          isActive={activeView === 'week'}
          onClick={() => onViewChange('week')}
        >
          Week
        </ViewButton>
        <ViewButton
          isActive={activeView === 'month'}
          onClick={() => onViewChange('month')}
        >
          Month
        </ViewButton>
      </div>

      {/* Right side - Add work button */}
      <ViewButton variant="primary" onClick={onAddWork}>
        <Plus className="h-4 w-4 mr-2" />
        Work Order
      </ViewButton>
    </div>
  )
}
