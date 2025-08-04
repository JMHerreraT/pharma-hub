"use client"

import React, { Suspense } from 'react'
import MedicationsPageHeader from '../organisms/MedicationsPageHeader'
import DataTableSkeleton from '../atoms/DataTableSkeleton'

// Lazy load MedicationsDataTable for page
const LazyMedicationsPageDataTable = React.lazy(() => import('../organisms/LazyMedicationsPageDataTable'))

const MedicationsPage = () => {
  return (
    <div className="w-full h-full">
      <div className="space-y-4 sm:space-y-6">
        {/* Header con breadcrumb, título y botones */}
        <MedicationsPageHeader />

        {/* Tabla de medicamentos con funcionalidades completas */}
        <div className="w-full">
          <Suspense fallback={<DataTableSkeleton rows={10} columns={7} />}>
            <LazyMedicationsPageDataTable
              enableRowsPerPage={true}
              enablePagination={true}
              defaultItemsToShow={10}
            />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export { MedicationsPage }
export default MedicationsPage
