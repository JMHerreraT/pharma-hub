import React from 'react'
import { useSimulateLoading } from '@/hooks/useSimulateLoading'
import MedicationsDataTable, { medicationSchema } from '../MedicationsDataTable'
import DataTableSkeleton from '@/components/atoms/DataTableSkeleton'
import { z } from 'zod'

type Medication = z.infer<typeof medicationSchema>

interface LazyMedicationsDataTableProps {
  medications: Medication[]
  onAddToCart: (medication: Medication) => void
  hasAvailableStock: (medication: Medication) => boolean
  enableRowsPerPage?: boolean
  enablePagination?: boolean
  defaultItemsToShow?: number
}

const LazyMedicationsDataTable = (props: LazyMedicationsDataTableProps) => {
  const { isLoading } = useSimulateLoading({ delay: 1300 })

  if (isLoading) {
    return <DataTableSkeleton rows={8} columns={6} showHeader={false} />
  }

  return <MedicationsDataTable {...props} />
}

export default LazyMedicationsDataTable
