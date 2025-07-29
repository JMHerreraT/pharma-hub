// src/components/organisms/DonutChart/index.tsx
"use client"

import { useState, useMemo } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import CustomTooltip from "./"
import CustomLabel from "./"
import CustomLegend from "./"
import { ChartDataItem, DonutChartProps } from "./types"

const defaultData: ChartDataItem[] = [
  { name: "Purchases", value: 317100, percentage: 42, color: "#C7E9B4" },
  { name: "Suppliers", value: 211400, percentage: 28, color: "#7FCDCD" },
  { name: "Sales", value: 135900, percentage: 18, color: "#FFB3BA" },
  { name: "No Sales", value: 90600, percentage: 12, color: "#E5E5E5", pattern: "diagonal-stripes" },
]

export default function DonutChart({
  data = defaultData,
  total = 755000,
  title = "Business Metrics",
  className = "",
  size = "md",
}: DonutChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const chartDimensions = useMemo(() => {
    const sizes = {
      sm: { width: 300, height: 300, innerRadius: 60, outerRadius: 100 },
      md: { width: 400, height: 400, innerRadius: 80, outerRadius: 130 },
      lg: { width: 500, height: 500, innerRadius: 100, outerRadius: 160 },
    }
    return sizes[size]
  }, [size])

  const formatTotal = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
    if (value >= 1000) return `${Math.round(value / 1000)}K`
    return value.toString()
  }

  const onPieEnter = (_: any, index: number) => setActiveIndex(index)
  const onPieLeave = () => setActiveIndex(null)
  const handleLegendClick = (index: number) => setSelectedIndex(selectedIndex === index ? null : index)

  return (
    <Card className={`w-full max-w-2xl mx-auto ${className}`}>
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-semibold text-gray-900">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <ResponsiveContainer width="100%" height={chartDimensions.height}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={CustomLabel}
                outerRadius={chartDimensions.outerRadius}
                innerRadius={chartDimensions.innerRadius}
                dataKey="value"
                cornerRadius={8}
                paddingAngle={2}
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
                role="img"
                aria-label={`Donut chart showing ${title} breakdown`}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke={activeIndex === index ? "#374151" : "white"}
                    strokeWidth={activeIndex === index ? 2 : 1}
                    style={{
                      filter: activeIndex === index ? "brightness(1.1)" : "none",
                      transition: "all 0.3s ease-in-out",
                      transform: selectedIndex === index ? "scale(1.1)" : "scale(1)",
                    }}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          <CustomLegend data={data} selectedIndex={selectedIndex} onClick={handleLegendClick} />

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <p className="text-gray-500 text-sm font-medium mb-1">Total</p>
              <p className="text-3xl md:text-4xl font-bold text-gray-900">{formatTotal(total)}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
