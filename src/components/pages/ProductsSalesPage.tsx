"use client"

import React, { Suspense } from 'react'
import ProductsSalesPageHeader from '@/components/organisms/ProductsSalesPageHeader'
import DataTableSkeleton from '@/components/atoms/DataTableSkeleton'

const LazyProductsSalesPageDataTable = React.lazy(() => import('@/components/organisms/LazyProductsSalesPageDataTable'))

const ProductsSalesPage = () => {
  return (
    <div className="w-full h-full">
      <div className="space-y-4 sm:space-y-6">
        <ProductsSalesPageHeader />
        <div className="w-full">
          <Suspense fallback={<DataTableSkeleton rows={10} columns={8} />}>
            <LazyProductsSalesPageDataTable />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default ProductsSalesPage
