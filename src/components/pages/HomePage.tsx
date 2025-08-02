"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
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

            {/* Sección de Gráficos principales */}
            <div className="flex flex-col xl:flex-row gap-4 sm:gap-6">
                {/* Gráfico de estudiantes - Lado izquierdo */}
                <Card className="flex-1 min-h-[300px] sm:min-h-[400px] md:min-h-[500px]">
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
                        <div className="w-full h-full min-h-[250px] sm:min-h-[300px] md:min-h-[400px]">
                            <ChartTest
                                data={mockChartData}
                                isLoading={false}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* DonutChart - Lado derecho */}
                <Card className="flex-1 min-h-[300px] sm:min-h-[400px] md:min-h-[500px]">
                    <CardHeader>
                        <CardTitle className="text-base sm:text-lg md:text-xl font-semibold">
                            Distribución de Métricas
                        </CardTitle>
                        <CardDescription className="text-xs sm:text-sm text-muted-foreground">
                            Resumen de categorías principales
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4 sm:pt-6 flex-1">
                        <div className="w-full h-full min-h-[280px] sm:min-h-[320px]">
                            <DonutChart
                                data={donutData}
                                title="Reporte Gráfico"
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Data table section - Responsive */}
            <div className="flex-shrink-0 min-h-0 mb-2">
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
                            <ProductsDataTable />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default HomePage
