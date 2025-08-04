import React from 'react'
import { useSimulateLoading } from '@/hooks/useSimulateLoading'
import ProductsPageDataTable from '../ProductsPageDataTable'
import DataTableSkeleton from '@/components/atoms/DataTableSkeleton'

const LazyProductsPageDataTable = () => {
  const { isLoading } = useSimulateLoading({ delay: 1500 })

  if (isLoading) {
    return <DataTableSkeleton rows={10} columns={8} showHeader={false} />
  }

  return <ProductsPageDataTable />
}

export default LazyProductsPageDataTable
