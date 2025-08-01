// src/components/organisms/DonutChart/index.tsx
"use client"

import { useState, useMemo } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { ChartDataItem, DonutChartProps } from "./types"

const defaultData: ChartDataItem[] = [
  { name: "Purchases", value: 317100, percentage: 42, color: "#C7E9B4" },
  { name: "Suppliers", value: 211400, percentage: 28, color: "#7FCDCD" },
  { name: "Sales", value: 135900, percentage: 18, color: "#FFB3BA" },
  { name: "No Sales", value: 90600, percentage: 12, color: "#E5E5E5", pattern: "diagonal-stripes" },
]

// Componente para etiquetas de porcentaje flotantes - Responsive
const FloatingLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percentage }: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percentage: number;
}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 1.3;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  // Responsive circle size
  const circleRadius = typeof window !== 'undefined' && window.innerWidth < 640 ? 14 : 18;

  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r={circleRadius}
        fill="white"
        stroke="#E5E7EB"
        strokeWidth={1}
        filter="drop-shadow(0 2px 8px rgba(0,0,0,0.15))"
        className="dark:fill-gray-800 dark:stroke-gray-600"
      />
      <text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="central"
        className="text-xs sm:text-sm font-semibold fill-gray-900 dark:fill-white"
      >
        {`${percentage}%`}
      </text>
    </g>
  );
};

// Componente para la leyenda minimalista - Responsive
const MinimalLegend = ({ data }: { data: ChartDataItem[] }) => (
  <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mt-4 sm:mt-6 md:mt-8 px-2">
    {data.map((entry, index) => (
      <div key={index} className="flex items-center gap-1.5 sm:gap-2">
        <div
          className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full flex-shrink-0"
          style={{ backgroundColor: entry.color }}
        />
        <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium truncate">
          {entry.name}
        </span>
      </div>
    ))}
  </div>
);

export default function DonutChart({
  data = defaultData,
  total = 755000,
  title = "Business Metrics",
  className = "",
  size = "md",
}: DonutChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const chartDimensions = useMemo(() => {
    // Responsive dimensions based on screen size
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    const isTablet = typeof window !== 'undefined' && window.innerWidth < 768;

    const sizes = {
      sm: {
        width: isMobile ? 250 : 300,
        height: isMobile ? 250 : 300,
        innerRadius: isMobile ? 60 : 80,
        outerRadius: isMobile ? 100 : 120
      },
      md: {
        width: isMobile ? 280 : isTablet ? 320 : 350,
        height: isMobile ? 280 : isTablet ? 320 : 350,
        innerRadius: isMobile ? 70 : isTablet ? 80 : 90,
        outerRadius: isMobile ? 110 : isTablet ? 125 : 140
      },
      lg: {
        width: isMobile ? 300 : isTablet ? 350 : 400,
        height: isMobile ? 300 : isTablet ? 350 : 400,
        innerRadius: isMobile ? 80 : isTablet ? 90 : 100,
        outerRadius: isMobile ? 120 : isTablet ? 140 : 160
      },
    }
    return sizes[size]
  }, [size])

  const formatTotal = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
    if (value >= 1000) return `${Math.round(value / 1000)}K`
    return value.toString()
  }

  const onPieEnter = (_: unknown, index: number) => setActiveIndex(index)
  const onPieLeave = () => setActiveIndex(null)

  return (
    <div className={`w-full h-full flex flex-col ${className}`}>
      {title && (
        <div className="text-center mb-3 sm:mb-4 md:mb-6 px-2">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white line-clamp-2">{title}</h3>
        </div>
      )}

      <div className="flex-1 flex items-center justify-center px-2">
        <div className="relative">
          <ResponsiveContainer width={chartDimensions.width} height={chartDimensions.height}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={FloatingLabel}
                outerRadius={chartDimensions.outerRadius}
                innerRadius={chartDimensions.innerRadius}
                dataKey="value"
                cornerRadius={0}
                paddingAngle={4}
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
                role="img"
                aria-label={`Donut chart showing ${title} breakdown`}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke="white"
                    strokeWidth={3}
                    style={{
                      filter: activeIndex === index ? "brightness(1.05)" : "none",
                      transition: "all 0.2s ease-in-out",
                    }}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          {/* Total en el centro - Responsive */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center px-2">
              <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm font-medium mb-0.5 sm:mb-1">Total</p>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">{formatTotal(total)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Leyenda minimalista */}
      <MinimalLegend data={data} />
    </div>
  )
}


