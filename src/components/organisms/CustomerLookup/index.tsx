"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  User,
  Search,
  UserPlus,
  CheckCircle,
  AlertCircle,
  Phone,
  IdCard,
  Mail,
  MapPin
} from "lucide-react"
import { toast } from "sonner"

// Datos mock de clientes existentes
const mockCustomers = [
  {
    id: "12345678",
    phone: "555-0123",
    name: "María González Pérez",
    email: "maria.gonzalez@email.com",
    address: "Av. Principal 123, Col. Centro",
    registeredDate: "2024-01-15"
  },
  {
    id: "87654321",
    phone: "555-0456",
    name: "Carlos Rodríguez López",
    email: "carlos.rodriguez@email.com",
    address: "Calle 5 de Mayo 456, Col. Reforma",
    registeredDate: "2024-02-20"
  },
  {
    id: "11223344",
    phone: "555-0789",
    name: "Ana Silva Martínez",
    email: "ana.silva@email.com",
    address: "Blvd. Insurgentes 789, Col. Roma",
    registeredDate: "2024-03-10"
  },
  {
    id: "44332211",
    phone: "555-0321",
    name: "Pedro Morales Castro",
    email: "pedro.morales@email.com",
    address: "Calle Juárez 321, Col. Centro",
    registeredDate: "2024-01-28"
  }
]

interface CustomerInfo {
  name: string
  phone: string
  email?: string
  address?: string
  id?: string
}

interface CustomerRecord extends CustomerInfo {
  registeredDate: string
}

interface CustomerLookupProps {
  customerInfo: CustomerInfo
  onCustomerInfoChange: (info: CustomerInfo) => void
}

export function CustomerLookup({ customerInfo, onCustomerInfoChange }: CustomerLookupProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [customerFound, setCustomerFound] = useState<CustomerRecord | null>(null)
  const [isNewCustomer, setIsNewCustomer] = useState(false)
  const [showRegistrationForm, setShowRegistrationForm] = useState(false)

  // Buscar cliente por documento o teléfono
  const searchCustomer = async () => {
    if (!searchQuery.trim()) {
      toast.error("Ingresa un documento de identidad o teléfono")
      return
    }

    setIsSearching(true)

    // Simular búsqueda con delay
    setTimeout(() => {
      const found = mockCustomers.find(customer =>
        customer.id === searchQuery.trim() ||
        customer.phone === searchQuery.trim() ||
        customer.phone.replace(/[-\s]/g, '') === searchQuery.replace(/[-\s]/g, '')
      )

      if (found) {
        setCustomerFound(found)
        setIsNewCustomer(false)
        setShowRegistrationForm(false)
        // Auto-completar campos
        onCustomerInfoChange({
          name: found.name,
          phone: found.phone,
          email: found.email,
          address: found.address,
          id: found.id
        })
        toast.success(`Cliente encontrado: ${found.name}`)
      } else {
        setCustomerFound(null)
        setIsNewCustomer(true)
        setShowRegistrationForm(true)
        // Limpiar campos excepto el teléfono si se buscó por teléfono
        const isPhoneSearch = /^\d{3}[-\s]?\d{4}$/.test(searchQuery)
        onCustomerInfoChange({
          name: "",
          phone: isPhoneSearch ? searchQuery : "",
          email: "",
          address: "",
          id: isPhoneSearch ? "" : searchQuery
        })
        toast.warning("Cliente no encontrado. Puedes registrarlo como nuevo cliente.")
      }
      setIsSearching(false)
    }, 800)
  }

  // Manejar Enter en el campo de búsqueda
  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      searchCustomer()
    }
  }

  // Registrar nuevo cliente
  const registerNewCustomer = () => {
    if (!customerInfo.name.trim() || !customerInfo.phone.trim()) {
      toast.error("Nombre y teléfono son obligatorios")
      return
    }

    // Simular registro
    toast.success(`Cliente ${customerInfo.name} registrado exitosamente`)
    setIsNewCustomer(false)
    setShowRegistrationForm(false)
    setCustomerFound({
      ...customerInfo,
      registeredDate: new Date().toISOString().split('T')[0]
    })
  }

  // Limpiar búsqueda
  const clearSearch = () => {
    setSearchQuery("")
    setCustomerFound(null)
    setIsNewCustomer(false)
    setShowRegistrationForm(false)
    onCustomerInfoChange({ name: "", phone: "", email: "", address: "", id: "" })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Información del Cliente
          {customerFound && (
            <Badge variant="secondary" className="ml-2">
              <CheckCircle className="h-3 w-3 mr-1" />
              Cliente encontrado
            </Badge>
          )}
          {isNewCustomer && (
            <Badge variant="outline" className="ml-2">
              <UserPlus className="h-3 w-3 mr-1" />
              Nuevo cliente
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Búsqueda de Cliente */}
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Buscar Cliente
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Documento de identidad o teléfono..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleSearchKeyPress}
                  className="pl-10"
                />
              </div>
              <Button
                onClick={searchCustomer}
                disabled={isSearching || !searchQuery.trim()}
                className="px-6"
              >
                {isSearching ? "Buscando..." : "Buscar"}
              </Button>
              {(customerFound || isNewCustomer) && (
                <Button variant="outline" onClick={clearSearch}>
                  Limpiar
                </Button>
              )}
            </div>
          </div>

          {/* Información del cliente encontrado */}
          {customerFound && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-green-900 dark:text-green-100">
                    {customerFound.name}
                  </h4>
                  <div className="space-y-1 mt-2 text-sm text-green-700 dark:text-green-300">
                    <div className="flex items-center gap-2">
                      <IdCard className="h-3 w-3" />
                      <span>ID: {customerFound.id}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-3 w-3" />
                      <span>{customerFound.phone}</span>
                    </div>
                    {customerFound.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="h-3 w-3" />
                        <span>{customerFound.email}</span>
                      </div>
                    )}
                    {customerFound.address && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3 w-3" />
                        <span>{customerFound.address}</span>
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-green-600 dark:text-green-400 mt-2">
                    Cliente desde: {new Date(customerFound.registeredDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Formulario de información del cliente */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">
              Documento de Identidad
              {isNewCustomer && <span className="text-red-500">*</span>}
            </label>
            <Input
              placeholder="Número de documento"
              value={customerInfo.id || ""}
              onChange={(e) => onCustomerInfoChange({...customerInfo, id: e.target.value})}
              disabled={!!customerFound}
            />
          </div>
          <div>
            <label className="text-sm font-medium">
              Teléfono
              {isNewCustomer && <span className="text-red-500">*</span>}
            </label>
            <Input
              placeholder="Número de teléfono"
              value={customerInfo.phone}
              onChange={(e) => onCustomerInfoChange({...customerInfo, phone: e.target.value})}
              disabled={!!customerFound}
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-medium">
              Nombre Completo
              {isNewCustomer && <span className="text-red-500">*</span>}
            </label>
            <Input
              placeholder="Nombre completo del cliente"
              value={customerInfo.name}
              onChange={(e) => onCustomerInfoChange({...customerInfo, name: e.target.value})}
              disabled={!!customerFound}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Correo Electrónico</label>
            <Input
              placeholder="email@ejemplo.com"
              type="email"
              value={customerInfo.email || ""}
              onChange={(e) => onCustomerInfoChange({...customerInfo, email: e.target.value})}
              disabled={!!customerFound}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Dirección</label>
            <Input
              placeholder="Dirección del cliente"
              value={customerInfo.address || ""}
              onChange={(e) => onCustomerInfoChange({...customerInfo, address: e.target.value})}
              disabled={!!customerFound}
            />
          </div>
        </div>

        {/* Botón de registro para nuevos clientes */}
        {showRegistrationForm && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                Registrar Nuevo Cliente
              </span>
            </div>
            <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
              Complete los campos marcados con * para registrar este cliente en la base de datos.
            </p>
            <Button
              onClick={registerNewCustomer}
              className="w-full"
              disabled={!customerInfo.name.trim() || !customerInfo.phone.trim()}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Registrar Cliente
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
