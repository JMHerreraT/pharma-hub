"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Zap,
  TrendingUp,
  DollarSign,
  Users,
  Package,
  Download,
  Calendar,
  BarChart3,
  Clock,
  AlertTriangle
} from "lucide-react"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"


export function QuickReportsPage() {
  const reports = [
    {
      title: "Ventas del Día",
      description: "Resumen de ventas de hoy",
      value: "$2,450.75",
      change: "+12.5%",
      changeType: "positive",
      icon: DollarSign,
      color: "green",
      lastUpdate: "Hace 5 min"
    },
    {
      title: "Productos Vendidos",
      description: "Medicamentos vendidos hoy",
      value: "145",
      change: "+8.2%",
      changeType: "positive",
      icon: Package,
      color: "blue",
      lastUpdate: "Hace 10 min"
    },
    {
      title: "Clientes Atendidos",
      description: "Clientes únicos hoy",
      value: "89",
      change: "+15.3%",
      changeType: "positive",
      icon: Users,
      color: "purple",
      lastUpdate: "Hace 15 min"
    },
    {
      title: "Stock Bajo",
      description: "Medicamentos con stock crítico",
      value: "12",
      change: "+2",
      changeType: "negative",
      icon: AlertTriangle,
      color: "red",
      lastUpdate: "Hace 1 min"
    }
  ]

  const quickActions = [
    {
      title: "Reporte de Ventas Semanal",
      description: "Descargar reporte de ventas de los últimos 7 días",
      icon: TrendingUp,
      action: "Descargar PDF"
    },
    {
      title: "Inventario Completo",
      description: "Reporte detallado de todo el inventario actual",
      icon: Package,
      action: "Generar Excel"
    },
    {
      title: "Análisis de Clientes",
      description: "Estadísticas de clientes frecuentes y nuevos",
      icon: Users,
      action: "Ver Análisis"
    },
    {
      title: "Productos Más Vendidos",
      description: "Top 10 de medicamentos más vendidos este mes",
      icon: BarChart3,
      action: "Ver Ranking"
    }
  ]

  return (
    <div className="container mx-auto p-4 lg:p-6 space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Panel de Control</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Reportes Rápidos</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            Reportes Rápidos
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Accede a métricas en tiempo real y genera reportes instantáneos
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Personalizar Período
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Exportar Todo
          </Button>
        </div>
      </div>

      {/* Métricas en Tiempo Real */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {reports.map((report, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg ${
                  report.color === 'green' ? 'bg-green-100 dark:bg-green-900/20' :
                  report.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/20' :
                  report.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900/20' :
                  'bg-red-100 dark:bg-red-900/20'
                }`}>
                  <report.icon className={`h-6 w-6 ${
                    report.color === 'green' ? 'text-green-600 dark:text-green-400' :
                    report.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                    report.color === 'purple' ? 'text-purple-600 dark:text-purple-400' :
                    'text-red-600 dark:text-red-400'
                  }`} />
                </div>
                <Badge variant={report.changeType === 'positive' ? 'default' : 'destructive'} className="text-xs">
                  {report.change}
                </Badge>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {report.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {report.description}
                </p>
                <div className="mt-3">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {report.value}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock className="h-3 w-3 text-gray-400" />
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {report.lastUpdate}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Acciones Rápidas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Acciones Rápidas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <Card key={index} className="border-2 border-dashed border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex-shrink-0">
                      <action.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {action.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {action.description}
                      </p>
                      <Button size="sm" className="mt-3">
                        {action.action}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Reportes Programados */}
      <Card>
        <CardHeader>
          <CardTitle>Reportes Programados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <Calendar className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="font-medium">Reporte Semanal de Ventas</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Cada lunes a las 9:00 AM</p>
                </div>
              </div>
              <Badge variant="secondary">Activo</Badge>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <Package className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-medium">Inventario Mensual</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Primer día de cada mes</p>
                </div>
              </div>
              <Badge variant="secondary">Activo</Badge>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <p className="font-medium">Alertas de Stock Bajo</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Diario a las 8:00 AM</p>
                </div>
              </div>
              <Badge variant="secondary">Activo</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
