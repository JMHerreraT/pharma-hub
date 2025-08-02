"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { BarChart as ReachartBarChart, XAxis } from "recharts"
import { chartData } from "@/lib/chart-mock-data"
import { chartConfig } from "@/lib/chart-mock-data"
import { BarChartGroup } from "@/components/molecules/BarChartGroup"

// Defensive: Ensure chartData is a valid array before rendering BarChart
export const ActivityChartCard = () => {
  // If chartData is not an array or is empty, don't render the chart
  const isValidData = Array.isArray(chartData) && chartData?.length > 0

  // If chartData is undefined or not an array, show fallback UI
  if (!isValidData) {
    return (
    
          <div style={{ padding: "2rem", textAlign: "center", color: "#888" }}>
            No chart data available.
          </div>
    )
  }

  return (
    <ChartContainer config={chartConfig}>
          <ReachartBarChart accessibilityLayer data={chartData}>
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  weekday: "short",
                })
              }
            />
            <BarChartGroup />
            <ChartTooltip
              content={
                <ChartTooltipContent labelKey="activities" indicator="line" />
              }
              cursor={false}
              defaultIndex={1}
            />
          </ReachartBarChart>
        </ChartContainer>
  )
}
