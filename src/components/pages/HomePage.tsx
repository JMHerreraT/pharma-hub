"use client"

import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import ProductsDataTable from '../organisms/ProductsDataTable';
import ChartTest from '../organisms/ChartTest';
import DonutChart from '../organisms/DonutChart';
import MetricCard from '../organisms/MetricCard';
import { DollarSign, Grid3X3, AlertCircle, Users } from 'lucide-react';

export type User = {
    id: string;
    name: string;
    email: string;
    role: "admin" | "user" | "moderator";
    avatar?: string;
    createdAt: Date;
};

const HomePage = () => {
    // Datos de prueba para el gráfico
    const mockChartData = [
        {
            total_students: 120,
            month: 1,
            year: 2024,
            on_time: 95,
            delinquents: 25
        },
        {
            total_students: 135,
            month: 2,
            year: 2024,
            on_time: 110,
            delinquents: 25
        },
        {
            total_students: 98,
            month: 3,
            year: 2024,
            on_time: 78,
            delinquents: 20
        },
        {
            total_students: 156,
            month: 4,
            year: 2024,
            on_time: 125,
            delinquents: 31
        },
        {
            total_students: 142,
            month: 5,
            year: 2024,
            on_time: 118,
            delinquents: 24
        },
        {
            total_students: 167,
            month: 6,
            year: 2024,
            on_time: 145,
            delinquents: 22
        },
        {
            total_students: 134,
            month: 7,
            year: 2024,
            on_time: 101,
            delinquents: 33
        },
        {
            total_students: 189,
            month: 8,
            year: 2024,
            on_time: 152,
            delinquents: 37
        }
    ];

    // Data para el DonutChart con colores exactos de la imagen
    const donutData = [
        {
            name: "Purchases",
            value: 317100,
            color: "#C6F279" // Verde claro/lima
        },
        {
            name: "Suppliers",
            value: 211400,
            color: "#8DD3C7" // Verde agua/mint
        },
        {
            name: "Sales",
            value: 135900,
            color: "#FFB3BA" // Rosa suave
        },
        {
            name: "No Sales",
            value: 90600,
            color: "#D1D5DB" // Gris para el patrón rayado
        },
    ];

    return (
        <div className="flex flex-col gap-4 sm:gap-6 h-full">
            {/* Pharmacy metrics cards - Responsive grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
                <MetricCard
                    title="Today's Sales"
                    value="$95.00"
                    change="2.5%"
                    changeType="positive"
                    period="This Month"
                    icon={<DollarSign size={20} />}
                    color="green"
                    className="min-h-[140px] sm:min-h-[160px]"
                />

                <MetricCard
                    title="Available Categories"
                    value="1.457%"
                    change="2.5%"
                    changeType="positive"
                    period="This Month"
                    icon={<Grid3X3 size={20} />}
                    color="teal"
                    className="min-h-[140px] sm:min-h-[160px]"
                />

                <MetricCard
                    title="Expired Medicines"
                    value="0.00%"
                    change="2.5%"
                    changeType="positive"
                    period="This Month"
                    icon={<AlertCircle size={20} />}
                    color="red"
                    className="min-h-[140px] sm:min-h-[160px]"
                />

                <MetricCard
                    title="System Users"
                    value="255K"
                    change="2.5%"
                    changeType="positive"
                    period="This Month"
                    icon={<Users size={20} />}
                    color="purple"
                    className="min-h-[140px] sm:min-h-[160px]"
                />
            </div>

            {/* Main charts section - Responsive layout */}
            <div className="flex gap-3 sm:gap-4 flex-1 min-h-[350px] sm:min-h-[400px] flex-col xl:flex-row">
                {/* Left chart - Student Statistics */}
                <Card className="flex-1 min-h-[350px] sm:min-h-[400px]">
                    <CardHeader className="pb-2 sm:pb-3 px-3 sm:px-6 pt-3 sm:pt-6">
                        <CardTitle className="text-base sm:text-lg">Estadísticas de Estudiantes</CardTitle>
                        <CardDescription className="text-xs sm:text-sm">
                            Análisis mensual de pagos y morosidad
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 p-2 sm:p-4">
                        <div className="w-full h-full min-h-[280px] sm:min-h-[320px] flex items-stretch">
                            <ChartTest
                                data={mockChartData}
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="pt-0 px-3 sm:px-6 pb-3 sm:pb-6">
                        <p className="text-xs sm:text-sm text-muted-foreground">
                            Distribución de estudiantes con pagos completos vs pendientes
                        </p>
                    </CardFooter>
                </Card>

                {/* Right chart - Vendor Breakdown */}
                <Card className="flex-1 min-h-[350px] sm:min-h-[400px]">
                    <CardHeader className="pb-2 sm:pb-3 px-3 sm:px-6 pt-3 sm:pt-6">
                        <CardTitle className="text-base sm:text-lg">Graph Report</CardTitle>
                        <CardDescription className="text-xs sm:text-sm">
                            Distribución de métricas de negocio
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="h-full flex items-center justify-center p-2 sm:p-4">
                        <div className="w-full h-full min-h-[280px] sm:min-h-[320px]">
                            <DonutChart
                                data={donutData}
                                title="Graph Report"
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="pt-0 px-3 sm:px-6 pb-3 sm:pb-6">
                        <p className="text-xs sm:text-sm text-muted-foreground">
                            Análisis detallado de categorías de rendimiento
                        </p>
                    </CardFooter>
                </Card>
            </div>

            {/* Data table section - Responsive */}
            <div className="flex-shrink-0 min-h-0">
                <div className="overflow-x-auto">
                    <ProductsDataTable />
                </div>
            </div>
        </div>
    )
}

export default HomePage
