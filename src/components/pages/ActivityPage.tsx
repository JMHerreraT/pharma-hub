"use client"

import React, { useState, Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
  Activity,
  Search,
  Filter,
  Download,
  Users,
  ShoppingCart,
  Package,
  Zap
} from "lucide-react"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import DataTableSkeleton from "@/components/atoms/DataTableSkeleton"

// Lazy load ActivityDataTable
const LazyActivityDataTable = React.lazy(() => import('@/components/organisms/LazyActivityDataTable'))

// Mock data de actividades
const activitiesData = [
  {
    activityId: 1,
    type: "sale",
    user: "María González",
    action: "Venta completada",
    timestamp: "2024-01-15T14:30:00Z",
    details: "Venta de Paracetamol 500mg x2, Ibuprofeno 400mg x1 - Total: $45.50",
    status: "success"
  },
  {
    activityId: 2,
    type: "inventory",
    user: "Carlos Admin",
    action: "Stock actualizado",
    timestamp: "2024-01-15T13:45:00Z",
    details: "Actualizado inventario de Amoxicilina 500mg - Stock: 25 unidades",
    status: "success"
  },
  {
    activityId: 3,
    type: "customer",
    user: "Ana Silva",
    action: "Cliente registrado",
    timestamp: "2024-01-15T12:20:00Z",
    details: "Nuevo cliente VIP: Pedro Morales - DNI: 44332211",
    status: "success"
  },
  {
    activityId: 4,
    type: "system",
    user: "Sistema",
    action: "Backup automático",
    timestamp: "2024-01-15T06:00:00Z",
    details: "Backup diario de base de datos completado exitosamente",
    status: "success"
  },
  {
    activityId: 5,
    type: "settings",
    user: "Admin Principal",
    action: "Configuración modificada",
    timestamp: "2024-01-14T16:15:00Z",
    details: "Actualizada configuración de alertas de stock bajo",
    status: "warning"
  },
  {
    activityId: 6,
    type: "sale",
    user: "Luis Fernández",
    action: "Venta fallida",
    timestamp: "2024-01-14T11:30:00Z",
    details: "Error en procesamiento de pago - Orden #ORD-001",
    status: "error"
  },
  {
    activityId: 7,
    type: "inventory",
    user: "Carmen López",
    action: "Producto agregado",
    timestamp: "2024-01-14T09:45:00Z",
    details: "Nuevo medicamento: Loratadina 10mg - Stock inicial: 50 unidades",
    status: "success"
  },
  {
    activityId: 8,
    type: "customer",
    user: "María González",
    action: "Perfil actualizado",
    timestamp: "2024-01-13T15:20:00Z",
    details: "Actualizada información de contacto - Cliente: Ana Silva",
    status: "success"
  }
]

export function ActivityPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab] = useState("all")

  const filteredActivities = activitiesData.filter(activity => {
    const matchesSearch = activity.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.details.toLowerCase().includes(searchTerm.toLowerCase())

    switch (activeTab) {
      case "sale":
        return matchesSearch && activity.type === "sale"
      case "inventory":
        return matchesSearch && activity.type === "inventory"
      case "customer":
        return matchesSearch && activity.type === "customer"
      case "system":
        return matchesSearch && activity.type === "system"
      default:
        return matchesSearch
    }
  })

  const stats = {
    total: activitiesData.length,
    sales: activitiesData.filter(a => a.type === "sale").length,
    inventory: activitiesData.filter(a => a.type === "inventory").length,
    customers: activitiesData.filter(a => a.type === "customer").length,
    system: activitiesData.filter(a => a.type === "system").length
  }

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
            <BreadcrumbPage>Actividad</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            Registro de Actividad
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Monitorea todas las actividades y eventos del sistema
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <ShoppingCart className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Ventas</p>
                <p className="text-2xl font-bold">{stats.sales}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <Package className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Inventario</p>
                <p className="text-2xl font-bold">{stats.inventory}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                <Users className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Clientes</p>
                <p className="text-2xl font-bold">{stats.customers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                <Zap className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Sistema</p>
                <p className="text-2xl font-bold">{stats.system}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Búsqueda */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar por usuario, acción o detalles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tabla con Tabs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Registro de Actividades
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<DataTableSkeleton rows={10} columns={6} showHeader={false} />}>
            <LazyActivityDataTable
              activities={filteredActivities.map((activity, index) => ({
                id: index + 1,
                activityId: activity.activityId,
                type: activity.type,
                user: activity.user,
                action: activity.action,
                timestamp: activity.timestamp,
                details: activity.details,
                status: activity.status,
              }))}
              enableRowsPerPage={true}
              enablePagination={true}
              defaultItemsToShow={10}
            />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}
