"use client"

import React from 'react'
import MedicationsBreadcrumb from '@/components/molecules/MedicationsBreadcrumb'
import MedicationsPageTitle from '@/components/molecules/MedicationsPageTitle'
import MedicationsPageActions from '@/components/molecules/MedicationsPageActions'

const MedicationsPageHeader = () => {
  return (
    <div className="space-y-4">
      {/* Breadcrumb */}
      <MedicationsBreadcrumb />

      {/* Título y Botones */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <MedicationsPageTitle />
        <MedicationsPageActions />
      </div>
    </div>
  )
}

export default MedicationsPageHeader
