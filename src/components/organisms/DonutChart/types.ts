export interface ChartDataItem {
    name: string
    value: number
    percentage: number
    color: string
    pattern?: string
  }

  export interface DonutChartProps {
    data?: ChartDataItem[]
    total?: number
    title?: string
    className?: string
    size?: "sm" | "md" | "lg"
  }
