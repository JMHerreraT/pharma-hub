"use client"

import React, { useState, Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Heart,
  Search,
  TrendingUp,
  ShoppingBag,
  Star,
  Gift
} from "lucide-react"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import DataTableSkeleton from "@/components/atoms/DataTableSkeleton"

// Lazy load FrequentCustomersDataTable
const LazyFrequentCustomersDataTable = React.lazy(() => import('@/components/organisms/LazyFrequentCustomersDataTable'))

// Mock data de clientes frecuentes
const clientesFrecuentes = [
  {
    id: "12345678",
    name: "María González Pérez",
    email: "maria.gonzalez@email.com",
    phone: "555-0123",
    address: "Av. Principal 123, Col. Centro",
    totalPurchases: 15,
    totalSpent: 2450.75,
    lastPurchase: "2024-01-10",
    loyaltyPoints: 245,
    tier: "Gold",
    joinDate: "2023-06-15",
    favoriteCategory: "Analgésicos",
    birthDate: "1985-03-22"
  },
  {
    id: "87654321",
    name: "Carlos Rodríguez López",
    email: "carlos.rodriguez@email.com",
    phone: "555-0456",
    address: "Calle 5 de Mayo 456, Col. Reforma",
    totalPurchases: 22,
    totalSpent: 3890.50,
    lastPurchase: "2024-01-08",
    loyaltyPoints: 389,
    tier: "Platinum",
    joinDate: "2023-02-10",
    favoriteCategory: "Gastroenterología",
    birthDate: "1978-11-15"
  },
  {
    id: "11223344",
    name: "Ana Silva Martínez",
    email: "ana.silva@email.com",
    phone: "555-0789",
    address: "Blvd. Insurgentes 789, Col. Roma",
    totalPurchases: 8,
    totalSpent: 1250.25,
    lastPurchase: "2024-01-12",
    loyaltyPoints: 125,
    tier: "Silver",
    joinDate: "2023-09-20",
    favoriteCategory: "Antihistamínicos",
    birthDate: "1992-07-08"
  },
  {
    id: "44332211",
    name: "Pedro Morales Castro",
    email: "pedro.morales@email.com",
    phone: "555-0321",
    address: "Calle Juárez 321, Col. Centro",
    totalPurchases: 30,
    totalSpent: 5670.80,
    lastPurchase: "2024-01-09",
    loyaltyPoints: 567,
    tier: "Diamond",
    joinDate: "2022-11-05",
    favoriteCategory: "Antibióticos",
    birthDate: "1965-12-03"
  }
]

export function FrequentCustomersPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // const filteredCustomers = clientesFrecuentes.filter(customer =>
  //   customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   customer.phone.includes(searchTerm)
  // )

  const stats = {
    totalCustomers: clientesFrecuentes.length,
    totalRevenue: clientesFrecuentes.reduce((sum, customer) => sum + customer.totalSpent, 0),
    avgPurchases: clientesFrecuentes.reduce((sum, customer) => sum + customer.totalPurchases, 0) / clientesFrecuentes.length,
    totalPoints: clientesFrecuentes.reduce((sum, customer) => sum + customer.loyaltyPoints, 0)
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
            <BreadcrumbPage>Clientes Frecuentes</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            Clientes Frecuentes
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Gestiona tu programa de lealtad y clientes VIP
          </p>
        </div>
        <Button>
          <Gift className="h-4 w-4 mr-2" />
          Programas de Lealtad
        </Button>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-pink-100 dark:bg-pink-900/20 rounded-lg">
                <Heart className="h-5 w-5 text-pink-600 dark:text-pink-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Clientes VIP</p>
                <p className="text-2xl font-bold">{stats.totalCustomers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Ingresos Totales</p>
                <p className="text-2xl font-bold">${stats.totalRevenue.toFixed(0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <ShoppingBag className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Compras Promedio</p>
                <p className="text-2xl font-bold">{stats.avgPurchases.toFixed(1)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                <Star className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Puntos Totales</p>
                <p className="text-2xl font-bold">{stats.totalPoints.toLocaleString()}</p>
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
              placeholder="Buscar por nombre, email o teléfono..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tabla de Clientes VIP */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Clientes VIP
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<DataTableSkeleton rows={8} columns={9} showHeader={false} />}>
            <LazyFrequentCustomersDataTable />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}
