import React from 'react'
import ProductsSalesPageDataTable from '@/components/organisms/ProductsSalesPageDataTable'
import DataTableSkeleton from '@/components/atoms/DataTableSkeleton'

const LazyProductsSalesPageDataTable = () => {
  const [isLoading] = React.useState(false)

  if (isLoading) {
    return <DataTableSkeleton rows={10} columns={8} showHeader={false} />
  }

  return (
    <ProductsSalesPageDataTable />
  )
}

export default LazyProductsSalesPageDataTable
