import React from 'react'
import ProductsPageDataTable, { schema } from '@/components/organisms/ProductsPageDataTable'
import { z } from 'zod'

export type ProductsSalesRow = z.infer<typeof schema>

interface ProductsSalesPageDataTableProps {
  data?: ProductsSalesRow[]
  onDataChange?: (newData: ProductsSalesRow[]) => void
}

const ProductsSalesPageDataTable = ({ data, onDataChange }: ProductsSalesPageDataTableProps) => {
  return (
    <div className="w-full h-full">
      <ProductsPageDataTable data={data} onDataChange={onDataChange} />
    </div>
  )
}

export default ProductsSalesPageDataTable
