import React from 'react'
import { useSimulateLoading } from '@/hooks/useSimulateLoading'
import DataTableSkeleton from '@/components/atoms/DataTableSkeleton'

interface LazyReportsDataTableProps {
  children: React.ReactNode
  delay?: number
}

const LazyReportsDataTable = ({ children, delay = 1400 }: LazyReportsDataTableProps) => {
  const { isLoading } = useSimulateLoading({ delay })

  if (isLoading) {
    return <DataTableSkeleton rows={10} columns={6} showHeader={false} />
  }

  return <>{children}</>
}

export default LazyReportsDataTable
