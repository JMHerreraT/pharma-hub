import React from 'react'
import { useSimulateLoading } from '@/hooks/useSimulateLoading'
import CustomersDataTable, { customerSchema } from '../CustomersDataTable'
import DataTableSkeleton from '@/components/atoms/DataTableSkeleton'
import { z } from 'zod'

type Customer = z.infer<typeof customerSchema>

interface LazyCustomersDataTableProps {
  customers?: Customer[]
  enableRowsPerPage?: boolean
  enablePagination?: boolean
  defaultItemsToShow?: number
}

const LazyCustomersDataTable = ({
  customers = [],
  enableRowsPerPage = true,
  enablePagination = true,
  defaultItemsToShow = 10
}: LazyCustomersDataTableProps) => {
  const { isLoading } = useSimulateLoading({ delay: 1350 })

  if (isLoading) {
    return <DataTableSkeleton rows={10} columns={8} showHeader={false} />
  }

  return (
    <CustomersDataTable
      customers={customers}
      enableRowsPerPage={enableRowsPerPage}
      enablePagination={enablePagination}
      defaultItemsToShow={defaultItemsToShow}
    />
  )
}

export default LazyCustomersDataTable
