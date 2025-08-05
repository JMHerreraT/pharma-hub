"use client"

import React, { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { MedicationsPage } from '@/components/pages/MedicationsPage'
import CreateMedicationPage from '@/components/pages/CreateMedicationPage'

function MedicationsContent() {
  const searchParams = useSearchParams()
  const action = searchParams.get('action')

  // Si el query parameter es 'create', mostrar la página de creación
  if (action === 'create') {
    return <CreateMedicationPage />
  }

  // Por defecto, mostrar la lista de medicamentos
  return <MedicationsPage />
}

export default function Page() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Cargando medicamentos...</p>
        </div>
      </div>
    }>
      <MedicationsContent />
    </Suspense>
  )
}
