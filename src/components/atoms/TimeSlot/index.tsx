interface TimeSlotProps {
  time: string;
  isCurrentTime?: boolean;
}

export default function TimeSlot({ time, isCurrentTime = false }: TimeSlotProps) {
  return (
    <div className={`flex items-center justify-start text-sm text-gray-600 dark:text-gray-400 font-medium py-6 pr-4 min-w-[80px] flex-1 min-h-[56px] ${isCurrentTime ? 'font-bold text-primary' : ''}`}>
      {time}
    </div>
  )
}
