"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { Download, Upload, Plus } from 'lucide-react'

const ProductsPageActions = () => {
  const handleExport = () => {
    console.log('Exportar productos')
    // Aquí iría la lógica de exportación
  }

  const handleImport = () => {
    console.log('Importar productos')
    // Aquí iría la lógica de importación
  }

  const handleAddProduct = () => {
    console.log('Agregar nuevo producto')
    // Aquí iría la navegación al formulario de creación
  }

  return (
    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
      {/* Botón Import */}
      <Button
        variant="outline"
        size="sm"
        onClick={handleImport}
        className="w-full sm:w-auto"
      >
        <Upload className="h-4 w-4 mr-2" />
        Importar
      </Button>

      {/* Botón Export */}
      <Button
        variant="outline"
        size="sm"
        onClick={handleExport}
        className="w-full sm:w-auto"
      >
        <Download className="h-4 w-4 mr-2" />
        Exportar
      </Button>

      {/* Botón Add Product (Primary) */}
      <Button
        size="sm"
        onClick={handleAddProduct}
        className="w-full sm:w-auto"
      >
        <Plus className="h-4 w-4 mr-2" />
        Agregar Producto
      </Button>
    </div>
  )
}

export default ProductsPageActions
