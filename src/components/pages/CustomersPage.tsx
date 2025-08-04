"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Search,
  Filter,
  UserPlus,
} from "lucide-react"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import CustomersDataTable from "@/components/organisms/CustomersDataTable"

// Mock data de todos los clientes
const allCustomers = [
  {
    id: "12345678",
    name: "María González Pérez",
    email: "maria.gonzalez@email.com",
    phone: "555-0123",
    address: "Av. Principal 123, Col. Centro",
    registeredDate: "2023-06-15",
    status: "active",
    type: "frequent",
    totalPurchases: 15,
    lastPurchase: "2024-01-10"
  },
  {
    id: "87654321",
    name: "Carlos Rodríguez López",
    email: "carlos.rodriguez@email.com",
    phone: "555-0456",
    address: "Calle 5 de Mayo 456, Col. Reforma",
    registeredDate: "2023-02-10",
    status: "active",
    type: "frequent",
    totalPurchases: 22,
    lastPurchase: "2024-01-08"
  },
  {
    id: "11223344",
    name: "Ana Silva Martínez",
    email: "ana.silva@email.com",
    phone: "555-0789",
    address: "Blvd. Insurgentes 789, Col. Roma",
    registeredDate: "2023-09-20",
    status: "active",
    type: "regular",
    totalPurchases: 8,
    lastPurchase: "2024-01-12"
  },
  {
    id: "55667788",
    name: "Luis Fernández García",
    email: "luis.fernandez@email.com",
    phone: "555-0234",
    address: "Calle Morelos 234, Col. Centro",
    registeredDate: "2023-11-05",
    status: "active",
    type: "new",
    totalPurchases: 3,
    lastPurchase: "2024-01-11"
  },
  {
    id: "99887766",
    name: "Carmen López Ruiz",
    email: "carmen.lopez@email.com",
    phone: "555-0567",
    address: "Av. Libertad 567, Col. Moderna",
    registeredDate: "2022-08-20",
    status: "inactive",
    type: "regular",
    totalPurchases: 12,
    lastPurchase: "2023-09-15"
  }
]

export function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const filteredCustomers = allCustomers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.phone.includes(searchTerm) ||
                         customer.id.includes(searchTerm)

    switch (activeTab) {
      case "frequent":
        return matchesSearch && customer.type === "frequent"
      case "regular":
        return matchesSearch && customer.type === "regular"
      case "new":
        return matchesSearch && customer.type === "new"
      case "inactive":
        return matchesSearch && customer.status === "inactive"
      default:
        return matchesSearch
    }
  })

  const stats = {
    total: allCustomers.length,
    frequent: allCustomers.filter(c => c.type === "frequent").length,
    regular: allCustomers.filter(c => c.type === "regular").length,
    new: allCustomers.filter(c => c.type === "new").length,
    inactive: allCustomers.filter(c => c.status === "inactive").length
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
            <BreadcrumbPage>Clientes</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            Gestión de Clientes
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Administra la base de datos completa de clientes
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filtros Avanzados
          </Button>
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Agregar Cliente
          </Button>
        </div>
      </div>

      {/* Búsqueda */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar por nombre, email, teléfono o DNI..."
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
            <Users className="h-5 w-5" />
            Base de Datos de Clientes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">
                Todos ({stats.total})
              </TabsTrigger>
              <TabsTrigger value="frequent">
                VIP ({stats.frequent})
              </TabsTrigger>
              <TabsTrigger value="regular">
                Regular ({stats.regular})
              </TabsTrigger>
              <TabsTrigger value="new">
                Nuevos ({stats.new})
              </TabsTrigger>
              <TabsTrigger value="inactive">
                Inactivos ({stats.inactive})
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              <CustomersDataTable
                customers={filteredCustomers.map((customer, index) => ({
                  id: index + 1,
                  customerId: customer.id,
                  name: customer.name,
                  email: customer.email,
                  phone: customer.phone,
                  address: customer.address,
                  registeredDate: customer.registeredDate,
                  status: customer.status,
                  type: customer.type,
                  totalPurchases: customer.totalPurchases,
                  lastPurchase: customer.lastPurchase,
                }))}
                enableRowsPerPage={true}
                enablePagination={true}
                defaultItemsToShow={10}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
