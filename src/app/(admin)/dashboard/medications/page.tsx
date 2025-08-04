"use client"

import React from 'react'
import { useSearchParams } from 'next/navigation'
import { MedicationsPage } from '@/components/pages/MedicationsPage'
import CreateMedicationPage from '@/components/pages/CreateMedicationPage'

export default function Page() {
  const searchParams = useSearchParams()
  const action = searchParams.get('action')

  // Si el query parameter es 'create', mostrar la página de creación
  if (action === 'create') {
    return <CreateMedicationPage />
  }

  // Por defecto, mostrar la lista de medicamentos
  return <MedicationsPage />
}
