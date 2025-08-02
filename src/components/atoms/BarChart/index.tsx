"use client"
import { Bar } from "recharts"

type Props = {
  dataKey: string
  color: string
  radius?: [number, number, number, number]
  stackId?: string
}

export const BarChart = ({ dataKey, color, radius, stackId = "a" }: Props) => (
  <Bar
    dataKey={dataKey}
    stackId={stackId}
    fill={color}
    radius={radius}
  />
)
