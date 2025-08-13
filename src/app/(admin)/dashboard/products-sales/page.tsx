"use client"

import React, { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import ProductsSalesPage from '@/components/pages/ProductsSalesPage'
import CreateProductPage from '@/components/pages/CreateProductPage'

function ProductsSalesContent() {
  const searchParams = useSearchParams()
  const action = searchParams.get('action')

  if (action === 'create') {
    return <CreateProductPage />
  }

  return <ProductsSalesPage />
}

export default function ProductsSalesPageRoute() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Cargando venta de productos...</p>
        </div>
      </div>
    }>
      <ProductsSalesContent />
    </Suspense>
  )
}
