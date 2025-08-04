import React from 'react'
import { useSimulateLoading } from '@/hooks/useSimulateLoading'
import MedicationsDataTable from '../MedicationsDataTable'
import DataTableSkeleton from '@/components/atoms/DataTableSkeleton'

interface LazyMedicationsPageDataTableProps {
  enableRowsPerPage?: boolean
  enablePagination?: boolean
  defaultItemsToShow?: number
}

const LazyMedicationsPageDataTable = ({
  enableRowsPerPage = true,
  enablePagination = true,
  defaultItemsToShow = 10
}: LazyMedicationsPageDataTableProps) => {
  const { isLoading } = useSimulateLoading({ delay: 1350 })

  if (isLoading) {
    return <DataTableSkeleton rows={10} columns={7} showHeader={false} />
  }

  return (
    <MedicationsDataTable
      enableRowsPerPage={enableRowsPerPage}
      enablePagination={enablePagination}
      defaultItemsToShow={defaultItemsToShow}
    />
  )
}

export default LazyMedicationsPageDataTable
