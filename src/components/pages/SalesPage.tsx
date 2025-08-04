"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Package,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  CreditCard
} from "lucide-react"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import MedicationsDataTable from "@/components/organisms/MedicationsDataTable"
import { MedicationSearch } from "@/components/molecules/MedicationSearch"
import { CartCustomerLookup } from "@/components/organisms/CartCustomerLookup"
import ProductAvatar from "@/components/molecules/ProductAvatar"

// Mock data de medicamentos con stock
const medicamentosStock = [
  {
    id: "med-001",
    name: "Paracetamol 500mg",
    generic: "Acetaminofén",
    category: "Analgésicos",
    price: 15.50,
    stock: 120,
    compound: "Acetaminofén",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100&h=100&fit=crop&crop=center",
    prescription: false,
    indications: ["dolor", "fiebre", "cefalea"]
  },
  {
    id: "med-002",
    name: "Ibuprofeno 400mg",
    generic: "Ibuprofeno",
    category: "Antiinflamatorios",
    price: 22.00,
    stock: 85,
    compound: "Ibuprofeno",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=100&fit=crop&crop=center",
    prescription: false,
    indications: ["inflamación", "dolor", "fiebre"]
  },
  {
    id: "med-003",
    name: "Loratadina 10mg",
    generic: "Loratadina",
    category: "Antihistamínicos",
    price: 28.75,
    stock: 45,
    compound: "Loratadina",
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=100&h=100&fit=crop&crop=center",
    prescription: false,
    indications: ["alergia", "rinitis", "urticaria"]
  },
  {
    id: "med-004",
    name: "Amoxicilina 500mg",
    generic: "Amoxicilina",
    category: "Antibióticos",
    price: 35.25,
    stock: 30,
    compound: "Amoxicilina",
    image: "https://images.unsplash.com/photo-1576671081837-49000212a370?w=100&h=100&fit=crop&crop=center",
    prescription: true,
    indications: ["infección", "bacteria", "garganta"]
  },
  {
    id: "med-005",
    name: "Omeprazol 20mg",
    generic: "Omeprazol",
    category: "Gastroenterología",
    price: 42.90,
    stock: 95,
    compound: "Omeprazol",
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=100&h=100&fit=crop&crop=center",
    prescription: false,
    indications: ["acidez", "gastritis", "úlcera"]
  }
]

interface CartItem {
  medication: typeof medicamentosStock[0]
  quantity: number
}

interface CustomerInfo {
  id?: string
  name: string
  phone: string
  email?: string
  address?: string
}

// Contexto para la IA global
export const SalesPageContext = {
  medicamentosStock,
  addToCart: null as ((medication: typeof medicamentosStock[0]) => void) | null
}

// Declarar tipo global para window
declare global {
  interface Window {
    SalesPageContext?: typeof SalesPageContext
  }
}

export function SalesPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({ id: "", name: "", phone: "", email: "", address: "" })
  const [searchTerm, setSearchTerm] = useState("")

  // Filtrar medicamentos por búsqueda
  const filteredMedicamentos = medicamentosStock.filter(med =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    med.generic.toLowerCase().includes(searchTerm.toLowerCase()) ||
    med.compound.toLowerCase().includes(searchTerm.toLowerCase()) ||
    med.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Agregar al carrito
  const addToCart = (medication: typeof medicamentosStock[0]) => {
    const existingItem = cart.find(item => item.medication.id === medication.id)

    if (existingItem) {
      if (existingItem.quantity < medication.stock) {
        setCart(cart.map(item =>
          item.medication.id === medication.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ))
      }
    } else {
      setCart([...cart, { medication, quantity: 1 }])
    }
  }

  // Exponer addToCart para el contexto global
  useEffect(() => {
    SalesPageContext.addToCart = addToCart
    // Exponer globalmente para el chatbot
    if (typeof window !== 'undefined') {
      window.SalesPageContext = SalesPageContext
    }
    return () => {
      SalesPageContext.addToCart = null
      if (typeof window !== 'undefined') {
        window.SalesPageContext = undefined
      }
    }
  }, [])

  // Actualizar cantidad en carrito
  const updateQuantity = (medicationId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(medicationId)
      return
    }

    setCart(cart.map(item =>
      item.medication.id === medicationId
        ? { ...item, quantity: newQuantity }
        : item
    ))
  }

  // Remover del carrito
  const removeFromCart = (medicationId: string) => {
    setCart(cart.filter(item => item.medication.id !== medicationId))
  }

  // Calcular total
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.medication.price * item.quantity), 0)
  }

  // Verificar si hay stock disponible
  const hasAvailableStock = (medication: typeof medicamentosStock[0]) => {
    const cartItem = cart.find(item => item.medication.id === medication.id)
    const cartQuantity = cartItem ? cartItem.quantity : 0
    return cartQuantity < medication.stock
  }

  // Manejar procesamiento de venta
  const handleProcessSale = () => {
    // Aquí iría la lógica de procesamiento de venta
    console.log("Procesando venta...", { cart, customerInfo })
    // Por ahora solo un toast de ejemplo
    // toast.success("Venta procesada exitosamente")
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
            <BreadcrumbPage>Ventas</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            Punto de Venta
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Gestión de ventas y atención al cliente - Busca medicamentos en la tabla o usa el asistente IA para consultas médicas
          </p>
        </div>
      </div>

      {/* Layout Principal: 2 filas, 2 columnas */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 h-[calc(100vh-240px)]">
        {/* Columna Izquierda: Buscador + Medicamentos */}
        <div className="xl:col-span-6 space-y-4">
          {/* Buscador de Medicamentos */}
          <MedicationSearch
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />

          {/* Lista de Medicamentos */}
          <Card className="flex-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Medicamentos Disponibles
                {filteredMedicamentos.length !== medicamentosStock.length && (
                  <Badge variant="outline" className="text-xs">
                    {filteredMedicamentos.length} de {medicamentosStock.length}
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <MedicationsDataTable
                medications={filteredMedicamentos.map((med, index) => ({
                  id: index + 1,
                  name: med.name,
                  generic: med.generic,
                  category: med.category,
                  price: med.price,
                  stock: med.stock,
                  compound: med.compound,
                  image: med.image,
                  prescription: med.prescription,
                  indications: med.indications
                }))}
                onAddToCart={(medication: { name: string; generic: string; category: string; price: number; stock: number; compound: string; image?: string; prescription: boolean; indications?: string[] }) => {
                  // Encontrar el medicamento original por nombre
                  const originalMed = filteredMedicamentos.find(med => med.name === medication.name)
                  if (originalMed) {
                    addToCart(originalMed)
                  }
                }}
                hasAvailableStock={(medication: { name: string; generic: string; category: string; price: number; stock: number; compound: string; image?: string; prescription: boolean; indications?: string[] }) => {
                  const originalMed = filteredMedicamentos.find(med => med.name === medication.name)
                  return originalMed ? hasAvailableStock(originalMed) : false
                }}
                enableRowsPerPage={true}
                enablePagination={true}
                defaultItemsToShow={8}
              />
            </CardContent>
          </Card>
        </div>

        {/* Columna Derecha: Carrito de Compra */}
        <div className="xl:col-span-6">
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Carrito de Compra
                {cart.length > 0 && (
                  <Badge variant="secondary">{cart.length}</Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              {/* Lookup de Cliente en el Carrito */}
              <CartCustomerLookup
                onCustomerInfoChange={(info) => setCustomerInfo({
                  id: info.id || "",
                  name: info.name || "",
                  phone: info.phone || "",
                  email: info.email,
                  address: info.address
                })}
              />

              {cart.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
                  <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Carrito vacío
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Agrega medicamentos para continuar
                  </p>
                </div>
              ) : (
                <>
                  {/* Items del carrito */}
                  <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                    {cart.map((item) => (
                      <div key={item.medication.id} className="flex items-center gap-3 p-3 border rounded-lg bg-white dark:bg-gray-950">
                        <ProductAvatar
                          src={item.medication.image}
                          alt={item.medication.name}
                          size="sm"
                        />

                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm">{item.medication.name}</h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            ${item.medication.price.toFixed(2)} c/u
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.medication.id, item.quantity - 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>

                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>

                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.medication.id, item.quantity + 1)}
                            disabled={item.quantity >= item.medication.stock}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>

                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeFromCart(item.medication.id)}
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Resumen del carrito */}
                  <div className="space-y-4 border-t pt-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal:</span>
                        <span>${calculateTotal().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>IVA (16%):</span>
                        <span>${(calculateTotal() * 0.16).toFixed(2)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total:</span>
                        <span className="text-green-600 dark:text-green-400">
                          ${(calculateTotal() * 1.16).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <Button
                      onClick={handleProcessSale}
                      disabled={!customerInfo.name || !customerInfo.phone}
                      className="w-full"
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      Procesar Venta
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
