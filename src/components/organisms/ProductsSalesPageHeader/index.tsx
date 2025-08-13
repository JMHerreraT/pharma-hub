"use client"

import React from 'react'
import ProductsSalesBreadcrumb from '@/components/molecules/ProductsSalesBreadcrumb'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

const ProductsSalesPageHeader = () => {
  const router = useRouter()

  const handleCreateSaleProduct = () => {
    router.push('/dashboard/products-sales?action=create')
  }

  return (
    <div className="space-y-4">
      <ProductsSalesBreadcrumb />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Venta de Productos</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Gestiona la venta de productos del inventario</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" onClick={handleCreateSaleProduct}>
            <Plus className="h-4 w-4 mr-2" /> Agregar Producto a Venta
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProductsSalesPageHeader
