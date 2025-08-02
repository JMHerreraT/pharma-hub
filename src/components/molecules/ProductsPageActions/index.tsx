"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Download, Upload, Plus } from 'lucide-react'
import AddProductDialog from '@/components/organisms/AddProductDialog'

const ProductsPageActions = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const handleExport = () => {
    console.log('Exportar productos')
    // Aquí iría la lógica de exportación
  }

  const handleImport = () => {
    console.log('Importar productos')
    // Aquí iría la lógica de importación
  }

  const handleAddProduct = () => {
    setIsAddDialogOpen(true)
  }

  const handleProductAdded = () => {
    // Aquí podrías refrescar la tabla o hacer otras acciones
    console.log('Producto agregado exitosamente')
  }

  return (
    <>
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

      {/* Dialog para agregar producto */}
      <AddProductDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSuccess={handleProductAdded}
      />
    </>
  )
}

export default ProductsPageActions
