"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  User,
  UserPlus,
  CheckCircle,
  AlertCircle
} from "lucide-react"
import { toast } from "sonner"

// Datos mock de clientes (mismo que CustomerLookup)
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
  id?: string
  name?: string
  phone?: string
  email?: string
  address?: string
}

interface FoundCustomer {
  id: string
  name?: string
  phone?: string
  email?: string
  address?: string
  registeredDate?: string
  pendingRegistration?: boolean
}

interface CartCustomerLookupProps {
  onCustomerInfoChange: (info: CustomerInfo) => void
}

export function CartCustomerLookup({ onCustomerInfoChange }: CartCustomerLookupProps) {
  const [dniQuery, setDniQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [foundCustomer, setFoundCustomer] = useState<FoundCustomer | null>(null)

  // Buscar cliente por DNI
  const searchCustomerByDni = async () => {
    if (!dniQuery.trim()) {
      toast.error("Ingresa un DNI válido")
      return
    }

    setIsSearching(true)

    // Simular búsqueda
    setTimeout(() => {
      const found = mockCustomers.find(customer =>
        customer.id === dniQuery.trim()
      )

      if (found) {
        setFoundCustomer(found)
        onCustomerInfoChange({
          id: found.id,
          name: found.name || "",
          phone: found.phone || "",
          email: found.email,
          address: found.address
        })
        toast.success(`Cliente encontrado: ${found.name}`)
      } else {
        setFoundCustomer(null)
        onCustomerInfoChange({
          id: dniQuery.trim(),
          name: "",
          phone: "",
          email: "",
          address: ""
        })
        toast.warning("Cliente no encontrado")
      }
      setIsSearching(false)
    }, 600)
  }

  // Manejar Enter en búsqueda
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      searchCustomerByDni()
    }
  }

  // Limpiar búsqueda
  const clearCustomer = () => {
    setDniQuery("")
    setFoundCustomer(null)
    onCustomerInfoChange({ id: "", name: "", phone: "", email: "", address: "" })
  }

  // Marcar para registro posterior
  const markForLaterRegistration = () => {
    toast.info("Cliente marcado para registro posterior")
    // Mantener el DNI pero limpiar el estado de búsqueda
    setFoundCustomer({ pendingRegistration: true, id: dniQuery })
  }

  return (
    <div className="space-y-3 border-b pb-4 mb-4">
      <div className="flex items-center gap-2 mb-2">
        <User className="h-4 w-4 text-gray-500" />
        <span className="text-sm font-medium">Cliente para Factura</span>
        {foundCustomer && !foundCustomer.pendingRegistration && (
          <Badge variant="secondary" className="text-xs">
            <CheckCircle className="h-2 w-2 mr-1" />
            Encontrado
          </Badge>
        )}
        {foundCustomer?.pendingRegistration && (
          <Badge variant="outline" className="text-xs">
            <AlertCircle className="h-2 w-2 mr-1" />
            Para registrar
          </Badge>
        )}
      </div>

      {/* Búsqueda de DNI */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
          <Input
            placeholder="DNI del cliente..."
            value={dniQuery}
            onChange={(e) => setDniQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-7 h-8 text-sm"
            disabled={!!foundCustomer}
          />
        </div>
        {!foundCustomer ? (
          <Button
            onClick={searchCustomerByDni}
            disabled={isSearching || !dniQuery.trim()}
            size="sm"
            className="h-8 px-3"
          >
            {isSearching ? "..." : "Buscar"}
          </Button>
        ) : (
          <Button
            onClick={clearCustomer}
            variant="outline"
            size="sm"
            className="h-8 px-3"
          >
            Limpiar
          </Button>
        )}
      </div>

      {/* Cliente encontrado */}
      {foundCustomer && !foundCustomer.pendingRegistration && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md p-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center">
              <User className="h-3 w-3 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-green-900 dark:text-green-100 text-sm">
                {foundCustomer.name}
              </p>
              <p className="text-xs text-green-700 dark:text-green-300">
                DNI: {foundCustomer.id} • {foundCustomer.phone}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Cliente no encontrado */}
      {dniQuery && !foundCustomer && !isSearching && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
              <div>
                <p className="text-sm font-medium text-yellow-900 dark:text-yellow-100">
                  Cliente no encontrado
                </p>
                <p className="text-xs text-yellow-700 dark:text-yellow-300">
                  DNI: {dniQuery}
                </p>
              </div>
            </div>
            <Button
              onClick={markForLaterRegistration}
              size="sm"
              variant="outline"
              className="h-7 text-xs"
            >
              <UserPlus className="h-3 w-3 mr-1" />
              Registrar después
            </Button>
          </div>
        </div>
      )}

      {/* Facturación info */}
      <div className="text-xs text-gray-500 dark:text-gray-400">
        {foundCustomer && !foundCustomer.pendingRegistration ? (
          <span>✓ Factura será emitida a: <strong>{foundCustomer.name}</strong></span>
        ) : foundCustomer?.pendingRegistration ? (
          <span>⚠ Venta sin datos de cliente completos</span>
        ) : (
          <span>💡 Busca cliente por DNI para facturación</span>
        )}
      </div>
    </div>
  )
}
