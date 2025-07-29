interface ChartDataItem {
  name: string
  value: number
  percentage: number
  color: string
  pattern?: string
}

interface CustomLegendProps {
  data: ChartDataItem[]
  selectedIndex: number | null
  onClick: (index: number) => void
}

export default function CustomLegend({ data, selectedIndex, onClick }: CustomLegendProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-6">
      {data.map((entry, index) => (
        <div
          key={index}
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity duration-200"
          onClick={() => onClick(index)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") onClick(index)
          }}
          aria-label={`Toggle ${entry.name} segment`}
        >
          <div
            className={`w-3 h-3 rounded-sm transition-all duration-200 ${
              selectedIndex === index ? "scale-110 shadow-md" : ""
            }`}
            style={{
              backgroundColor: entry.color,
              backgroundImage:
                entry.pattern === "diagonal-stripes"
                  ? "repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)"
                  : "none",
            }}
          />
          <span
            className={`text-sm font-medium transition-colors duration-200 ${
              selectedIndex === index ? "text-gray-900" : "text-gray-600"
            }`}
          >
            {entry.name}
          </span>
        </div>
      ))}
    </div>
  )
}
