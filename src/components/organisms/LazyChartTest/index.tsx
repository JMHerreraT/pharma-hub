import React from 'react'
import { useSimulateLoading } from '@/hooks/useSimulateLoading'
import ChartTest from '../ChartTest'
import ChartSkeleton from '@/components/atoms/ChartSkeleton'

const LazyChartTest = () => {
  const { isLoading } = useSimulateLoading({ delay: 1200 })

  if (isLoading) {
    return <ChartSkeleton type="bar" showHeader={true} />
  }

  return <ChartTest />
}

export default LazyChartTest
