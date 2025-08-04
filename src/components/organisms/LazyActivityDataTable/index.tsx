import React from 'react'
import { useSimulateLoading } from '@/hooks/useSimulateLoading'
import ActivityDataTable, { activitySchema } from '../ActivityDataTable'
import DataTableSkeleton from '@/components/atoms/DataTableSkeleton'
import { z } from 'zod'

type Activity = z.infer<typeof activitySchema>

interface LazyActivityDataTableProps {
  activities?: Activity[]
  enableRowsPerPage?: boolean
  enablePagination?: boolean
  defaultItemsToShow?: number
}

const LazyActivityDataTable = ({
  activities = [],
  enableRowsPerPage = true,
  enablePagination = true,
  defaultItemsToShow = 10
}: LazyActivityDataTableProps) => {
  const { isLoading } = useSimulateLoading({ delay: 1200 })

  if (isLoading) {
    return <DataTableSkeleton rows={10} columns={6} showHeader={false} />
  }

  return (
    <ActivityDataTable
      activities={activities}
      enableRowsPerPage={enableRowsPerPage}
      enablePagination={enablePagination}
      defaultItemsToShow={defaultItemsToShow}
    />
  )
}

export default LazyActivityDataTable
