import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface ChartSkeletonProps {
  showHeader?: boolean
  showLegend?: boolean
  type?: 'bar' | 'pie' | 'area'
}

const ChartSkeleton = ({
  showHeader = true,
  showLegend = false,
  type = 'bar'
}: ChartSkeletonProps) => {
  return (
    <Card className="h-full flex flex-col">
      {showHeader && (
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-3 w-56" />
          </div>
          <Skeleton className="h-6 w-6 rounded" />
        </CardHeader>
      )}
      <CardContent className="flex-1 flex flex-col items-center justify-center p-6">
        {type === 'pie' ? (
          <div className="flex flex-col items-center space-y-4">
            <Skeleton className="h-48 w-48 rounded-full" />
            {showLegend && (
              <div className="grid grid-cols-2 gap-3 w-full max-w-md">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Skeleton className="h-3 w-3 rounded-full" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                ))}
              </div>
            )}
          </div>
                ) : type === 'area' ? (
          <div className="w-full space-y-4">
            <div className="flex justify-between items-end h-32">
              {[72, 95, 58, 110, 87, 76].map((height, i) => (
                <Skeleton
                  key={i}
                  className={`w-8 bg-muted`}
                  style={{ height: `${height}px` }}
                />
              ))}
            </div>
            <div className="flex justify-between">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-3 w-8" />
              ))}
            </div>
          </div>
        ) : (
          // Bar chart
          <div className="w-full space-y-4">
            <div className="flex justify-between items-end h-40">
              {[85, 120, 95, 140, 110, 75, 100].map((height, i) => (
                <Skeleton
                  key={i}
                  className={`w-8 bg-muted`}
                  style={{ height: `${height}px` }}
                />
              ))}
            </div>
            <div className="flex justify-between">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <Skeleton key={i} className="h-3 w-8" />
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default ChartSkeleton
