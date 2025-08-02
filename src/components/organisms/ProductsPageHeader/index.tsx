"use client"

import React from 'react'
import ProductsBreadcrumb from '@/components/molecules/ProductsBreadcrumb'
import ProductsPageTitle from '@/components/molecules/ProductsPageTitle'
import ProductsPageActions from '@/components/molecules/ProductsPageActions'

const ProductsPageHeader = () => {
  return (
    <div className="space-y-4">
      {/* Breadcrumb */}
      <ProductsBreadcrumb />

      {/* Título y Botones */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <ProductsPageTitle />
        <ProductsPageActions />
      </div>
    </div>
  )
}

export default ProductsPageHeader
