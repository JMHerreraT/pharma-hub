"use client"

import React from 'react'
import MedicationsPageHeader from '../organisms/MedicationsPageHeader'
import MedicationsDataTable from '../organisms/MedicationsDataTable'

const MedicationsPage = () => {
  return (
    <div className="w-full h-full">
      <div className="space-y-4 sm:space-y-6">
        {/* Header con breadcrumb, título y botones */}
        <MedicationsPageHeader />

        {/* Tabla de medicamentos con funcionalidades completas */}
        <div className="w-full">
          <MedicationsDataTable
            enableRowsPerPage={true}
            enablePagination={true}
            defaultItemsToShow={10}
          />
        </div>
      </div>
    </div>
  )
}

export { MedicationsPage }
export default MedicationsPage
