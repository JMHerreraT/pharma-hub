import React, { useState } from 'react'
import ProductsPageDataTable, { schema } from '../ProductsPageDataTable'
import DataTableSkeleton from '@/components/atoms/DataTableSkeleton'
import { useProducts } from '@/hooks/use-products'
import { ProductsQueryRequest } from '@/types/product'
import { z } from 'zod'

type TableData = z.infer<typeof schema>;

const LazyProductsPageDataTable = () => {

  // State for pagination and filtering
  const [queryRequest] = useState<ProductsQueryRequest>({
    limit: 10,
    offset: 0,
    page: 1,
    where: [],
    orderBy: [],
  })

  // Fetch products using the API
  const {
    data: productsResponse ,
    isLoading: isLoadingProducts,
    error: productsError,
    refetch
  } = useProducts(queryRequest)

  // Show skeleton while simulating loading or fetching products
  if (isLoadingProducts) {
    return <DataTableSkeleton rows={10} columns={8} showHeader={false} />
  }

  // Handle error
  if (productsError) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center space-y-4">
          <div className="text-red-500 text-lg font-semibold">
            Error al cargar productos
          </div>
          <div className="text-muted-foreground">
            {productsError instanceof Error ? productsError.message : 'Error desconocido'}
          </div>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  // Transform products data to match the expected format
  const transformedData: TableData[] = productsResponse?.products?.map((product, index) => ({
    id: index + 1, // Use index for drag functionality
    header: product.name,
    category: product.category,
    status: product.stock > 0 ? 'Disponible' : 'agotado',
    target: product.sku,
    limit: product.stock.toString(),
    reviewer: product.supplier || 'Sin proveedor',
    image: undefined, // Add image if available
    stock: product.stock,
    minStock: product.minStock,
    maxStock: product.maxStock,
    expirationDate: product.expirationDate,
    requiresPrescription: product.requiresPrescription,
    compounds: product.compounds,
    price: product.price.toString(),
  })) || []

  return (
    <ProductsPageDataTable
      data={transformedData}
      onDataChange={(newData: TableData[]) => {
        console.log('Datos de productos cambiados:', newData)
        // Here you could implement the logic to save changes
      }}
    />
  )
}

export default LazyProductsPageDataTable
