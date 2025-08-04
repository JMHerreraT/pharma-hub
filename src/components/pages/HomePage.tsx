"use client"

import React, { Suspense } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import MetricCard from '../organisms/MetricCard'
import { DollarSign, Grid3X3, AlertCircle, Users } from 'lucide-react';
import { useSimulateLoading } from '@/hooks/useSimulateLoading'
import MetricCardSkeleton from '../atoms/MetricCardSkeleton'
import ChartSkeleton from '../atoms/ChartSkeleton'
import DataTableSkeleton from '../atoms/DataTableSkeleton'

// Lazy load heavy components with simulation
const LazyChartTest = React.lazy(() => import('../organisms/LazyChartTest'))
const LazyChartPieInteractive = React.lazy(() => import('../organisms/LazyChartPieInteractive'))
const LazyProductsPageDataTable = React.lazy(() => import('../organisms/LazyProductsPageDataTable'))

export type User = {
    id: string;
    name: string;
    email: string;
    role: "admin" | "user" | "moderator";
    avatar?: string;
    createdAt: Date;
};

// Component for metrics with loading simulation
const MetricsSection = () => {
    const { isLoading } = useSimulateLoading({ delay: 800 })

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
                <MetricCardSkeleton />
                <MetricCardSkeleton />
                <MetricCardSkeleton />
                <MetricCardSkeleton />
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
            <MetricCard
                title="Ventas de Hoy"
                value="$95.00"
                change="+2.5%"
                changeType="positive"
                period="Este Mes"
                icon={<DollarSign size={20} />}
                color="green"
                className="min-h-[140px] sm:min-h-[160px]"
            />

            <MetricCard
                title="Categorías Disponibles"
                value="1,457%"
                change="+12.5%"
                changeType="positive"
                period="Este Mes"
                icon={<Grid3X3 size={20} />}
                color="teal"
                className="min-h-[140px] sm:min-h-[160px]"
            />

            <MetricCard
                title="Medicinas en Stock"
                value="967"
                change="-2.1%"
                changeType="negative"
                period="Este Mes"
                icon={<AlertCircle size={20} />}
                color="red"
                className="min-h-[140px] sm:min-h-[160px]"
            />

            <MetricCard
                title="Usuarios del Sistema"
                value="255K"
                change="+2.5%"
                changeType="positive"
                period="Este Mes"
                icon={<Users size={20} />}
                color="purple"
                className="min-h-[140px] sm:min-h-[160px]"
            />
        </div>
    )
}

const HomePage = () => {

    return (
        <div className="flex flex-col gap-4 sm:gap-6 h-full">
            {/* Pharmacy metrics cards - Responsive grid */}
            <MetricsSection />

            {/* Sección de Gráficos principales */}
            <div className="flex flex-col xl:flex-row gap-4 sm:gap-6">
                {/* Gráfico de estudiantes - Lado izquierdo */}
                <Suspense fallback={<ChartSkeleton type="bar" showHeader={true} />}>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <div>
                                <CardTitle className="text-base sm:text-lg md:text-xl font-semibold">
                                    Estadísticas de Estudiantes
                                </CardTitle>
                                <CardDescription className="text-xs sm:text-sm text-muted-foreground">
                                    Análisis mensual de pagos y morosidad
                                </CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-4 sm:pt-6 flex-1">
                            <LazyChartTest />
                        </CardContent>
                    </Card>
                </Suspense>

                {/* DonutChart - Lado derecho */}
                <Suspense fallback={<ChartSkeleton type="pie" showHeader={false} showLegend={true} />}>
                    <Card className="flex-1 h-[350px] sm:h-[400px] md:h-[450px]">
                        <CardContent className="p-0 h-full">
                            <LazyChartPieInteractive />
                        </CardContent>
                    </Card>
                </Suspense>
            </div>

            {/* Data table section - Responsive */}
            <div className="flex-shrink-0 min-h-0 mb-2">
                <Suspense fallback={<DataTableSkeleton rows={6} columns={8} />}>
                    {/* Tabla de Productos */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base sm:text-lg md:text-xl font-semibold">
                                Lista de Productos
                            </CardTitle>
                            <CardDescription className="text-xs sm:text-sm text-muted-foreground">
                                Gestión y seguimiento del inventario
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto px-4">
                                <LazyProductsPageDataTable />
                            </div>
                        </CardContent>
                    </Card>
                </Suspense>
            </div>
        </div>
    )
}

export default HomePage
