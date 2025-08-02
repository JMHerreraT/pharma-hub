"use client"

import { Bar } from "recharts"

export const BarChartGroup = () => (
  <>
    <Bar
      dataKey="running"
      color="var(--color-running)"
      radius={[0, 0, 4, 4]}
    />
    <Bar
      dataKey="swimming"
      color="var(--color-swimming)"
      radius={[4, 4, 0, 0]}
    />
  </>
)
