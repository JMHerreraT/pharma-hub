import React from 'react'
import { useSimulateLoading } from '@/hooks/useSimulateLoading'
import OrdersPageDataTable from '../OrdersPageDataTable'
import DataTableSkeleton from '@/components/atoms/DataTableSkeleton'

const LazyOrdersPageDataTable = () => {
  const { isLoading } = useSimulateLoading({ delay: 1400 })

  if (isLoading) {
    return <DataTableSkeleton rows={10} columns={7} showHeader={false} />
  }

  return <OrdersPageDataTable />
}

export default LazyOrdersPageDataTable
