import MetricCardSkeleton from "../MetricCardSkeleton"
import ChartSkeleton from "../ChartSkeleton"
import DataTableSkeleton from "../DataTableSkeleton"

const DashboardSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 sm:gap-6 h-full">
      {/* Pharmacy metrics cards - Responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
        <MetricCardSkeleton />
        <MetricCardSkeleton />
        <MetricCardSkeleton />
        <MetricCardSkeleton />
      </div>

      {/* Charts section */}
      <div className="flex flex-col xl:flex-row gap-4 sm:gap-6">
        {/* Gráfico de estudiantes - Lado izquierdo */}
        <ChartSkeleton type="bar" showHeader={true} />

        {/* Pie Chart - Lado derecho */}
        <ChartSkeleton type="pie" showHeader={false} showLegend={true} />
      </div>

      {/* Data table section */}
      <div className="flex-shrink-0 min-h-0 mb-2">
        <DataTableSkeleton rows={6} columns={8} />
      </div>
    </div>
  )
}

export default DashboardSkeleton
