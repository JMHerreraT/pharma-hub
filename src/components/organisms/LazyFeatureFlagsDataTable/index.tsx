import React from 'react'
import { useSimulateLoading } from '@/hooks/useSimulateLoading'
import FeatureFlagsDataTable from '../FeatureFlagsDataTable'
import DataTableSkeleton from '@/components/atoms/DataTableSkeleton'

const LazyFeatureFlagsDataTable = () => {
  const { isLoading } = useSimulateLoading({ delay: 1100 })

  if (isLoading) {
    return <DataTableSkeleton rows={8} columns={6} showHeader={false} />
  }

  return <FeatureFlagsDataTable />
}

export default LazyFeatureFlagsDataTable
