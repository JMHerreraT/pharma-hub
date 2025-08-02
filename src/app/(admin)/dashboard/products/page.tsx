"use client"

import React from 'react'
import { useSearchParams } from 'next/navigation'
import ProductsPage from '@/components/pages/ProductsPage'
import CreateProductPage from '@/components/pages/CreateProductPage'

export default function ProductsPageRoute() {
  const searchParams = useSearchParams()
  const action = searchParams.get('action')

  // Si el query parameter es 'create', mostrar la página de creación
  if (action === 'create') {
    return <CreateProductPage />
  }

  // Por defecto, mostrar la lista de productos
  return <ProductsPage />
}
