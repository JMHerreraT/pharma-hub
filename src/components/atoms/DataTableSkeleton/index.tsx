import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface DataTableSkeletonProps {
  rows?: number
  columns?: number
  showHeader?: boolean
  showPagination?: boolean
}

const DataTableSkeleton = ({
  rows = 8,
  columns = 6,
  showHeader = true,
  showPagination = true
}: DataTableSkeletonProps) => {
  return (
    <Card>
      {showHeader && (
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-56" />
            </div>
            <Skeleton className="h-9 w-24" />
          </div>

          {/* Toolbar skeleton */}
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-8 w-[250px]" /> {/* Search input */}
              <Skeleton className="h-8 w-20" /> {/* Filter button */}
              <Skeleton className="h-8 w-20" /> {/* View button */}
            </div>
            <div className="flex items-center space-x-2">
              <Skeleton className="h-8 w-20" /> {/* Export button */}
              <Skeleton className="h-8 w-8" /> {/* More button */}
            </div>
          </div>
        </CardHeader>
      )}

      <CardContent className="p-0">
        {/* Table header */}
        <div className="border-b px-4 py-3">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-4 w-4" /> {/* Checkbox */}
            <Skeleton className="h-2 w-2" /> {/* Drag handle */}
            {Array.from({ length: columns - 2 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-24" />
            ))}
            <Skeleton className="h-4 w-8 ml-auto" /> {/* Actions */}
          </div>
        </div>

        {/* Table rows */}
        <div className="px-4">
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <div key={rowIndex} className="flex items-center space-x-4 py-3 border-b last:border-b-0">
              <Skeleton className="h-4 w-4" /> {/* Checkbox */}
              <Skeleton className="h-2 w-2" /> {/* Drag handle */}
              {Array.from({ length: columns - 2 }).map((_, colIndex) => (
                <Skeleton
                  key={colIndex}
                  className={`h-4 ${
                    colIndex === 0 ? 'w-32' : // Name column
                    colIndex === 1 ? 'w-20' : // Category/Status
                    colIndex === 2 ? 'w-16' : // Price/Number
                    'w-24'
                  }`}
                />
              ))}
              <Skeleton className="h-8 w-8 rounded ml-auto" /> {/* Actions dropdown */}
            </div>
          ))}
        </div>

        {/* Pagination */}
        {showPagination && (
          <div className="flex items-center justify-between px-4 py-4 border-t">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="flex items-center space-x-2">
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default DataTableSkeleton
