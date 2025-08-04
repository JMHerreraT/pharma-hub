"use client"

import React, { Suspense } from 'react'
import ProductsPageHeader from '../organisms/ProductsPageHeader'
import DataTableSkeleton from '../atoms/DataTableSkeleton'

// Lazy load ProductsPageDataTable
const LazyProductsPageDataTable = React.lazy(() => import('../organisms/LazyProductsPageDataTable'))

const ProductsPage = () => {
  return (
    <div className="w-full h-full">
      <div className="space-y-4 sm:space-y-6">
        {/* Header con breadcrumb, título y botones */}
        <ProductsPageHeader />

        {/* Tabla de productos con funcionalidades completas */}
        <div className="w-full">
          <Suspense fallback={<DataTableSkeleton rows={10} columns={8} />}>
            <LazyProductsPageDataTable />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default ProductsPage
