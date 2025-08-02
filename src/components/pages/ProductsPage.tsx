"use client"

import React from 'react'
import ProductsPageHeader from '../organisms/ProductsPageHeader'
import ProductsPageDataTable from '../organisms/ProductsPageDataTable'

const ProductsPage = () => {
  return (
    <div className="w-full h-full">
      <div className="space-y-4 sm:space-y-6">
        {/* Header con breadcrumb, título y botones */}
        <ProductsPageHeader />

        {/* Tabla de productos con funcionalidades completas */}
        <div className="w-full">
          <ProductsPageDataTable
            enableRowsPerPage={true}
            enablePagination={true}
            defaultItemsToShow={10}
          />
        </div>
      </div>
    </div>
  )
}

export default ProductsPage
