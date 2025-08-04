"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Download, Upload, Plus } from 'lucide-react'

const MedicationsPageActions = () => {
  const router = useRouter()

  const handleExport = () => {
    console.log('Exportar medicamentos')
    // Aquí iría la lógica de exportación
  }

  const handleImport = () => {
    console.log('Importar medicamentos')
    // Aquí iría la lógica de importación
  }

  const handleAddMedication = () => {
    router.push('/dashboard/medications?action=create')
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

      {/* Botón Add Medication (Primary) */}
      <Button
        size="sm"
        onClick={handleAddMedication}
        className="w-full sm:w-auto"
      >
        <Plus className="h-4 w-4 mr-2" />
        Agregar Medicamento
      </Button>
    </div>
  )
}

export default MedicationsPageActions
