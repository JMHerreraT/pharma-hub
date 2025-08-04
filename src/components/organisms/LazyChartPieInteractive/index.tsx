import React from 'react'
import { useSimulateLoading } from '@/hooks/useSimulateLoading'
import ChartPieInteractive from '../ChartPieInteractive'
import ChartSkeleton from '@/components/atoms/ChartSkeleton'

const LazyChartPieInteractive = () => {
  const { isLoading } = useSimulateLoading({ delay: 1000 })

  if (isLoading) {
    return <ChartSkeleton type="pie" showHeader={false} showLegend={true} />
  }

  return <ChartPieInteractive />
}

export default LazyChartPieInteractive
