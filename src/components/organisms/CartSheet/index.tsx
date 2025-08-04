"use client"

import React from "react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Plus,
  Minus,
  Trash2,
  CreditCard,
  Package,
  Heart,
  AlertTriangle
} from "lucide-react"
import ProductAvatar from "@/components/molecules/ProductAvatar"

interface CartItem {
  medication: {
    id: string
    name: string
    generic: string
    category: string
    price: number
    stock: number
    image: string
    prescription: boolean
  }
  quantity: number
}

interface CustomerInfo {
  name: string
  phone: string
  email?: string
  address?: string
}

interface CartSheetProps {
  isOpen: boolean
  onClose: () => void
  cart: CartItem[]
  customerInfo: CustomerInfo
  onUpdateQuantity: (medicationId: string, newQuantity: number) => void
  onRemoveFromCart: (medicationId: string) => void
  calculateTotal: () => number
  onProcessSale: () => void
}

export function CartSheet({
  isOpen,
  onClose,
  cart,
  customerInfo,
  onUpdateQuantity,
  onRemoveFromCart,
  calculateTotal,
  onProcessSale
}: CartSheetProps) {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="flex flex-col h-full w-full sm:max-w-lg bg-gray-50 dark:bg-gray-900">
        <SheetHeader className="flex-shrink-0 px-6 pt-6 pb-4">
          <SheetTitle className="text-2xl font-bold text-gray-900 dark:text-white">
            TU CARRITO DE COMPRA: {totalItems}
          </SheetTitle>
          <SheetDescription className="text-gray-600 dark:text-gray-400">
            Revisa y gestiona los medicamentos seleccionados
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 flex flex-col min-h-0 px-6">
          {cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
              <div className="w-20 h-20 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center mb-6 shadow-lg">
                <Package className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Carrito vacío
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm">
                Agrega medicamentos desde la tabla para continuar con tu compra
              </p>
              <Button onClick={onClose} variant="outline" size="lg" className="rounded-full px-8">
                Continuar Comprando
              </Button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto -mx-6 px-6">
                <div className="space-y-3 py-4">
                  {cart.map((item) => (
                    <div key={item.medication.id} className="relative">
                      {/* Modern Card Design */}
                      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                        {/* Action Icons - Top Right */}
                        <div className="absolute top-3 right-3 flex gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => onRemoveFromCart(item.medication.id)}
                            className="h-7 w-7 p-0 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 w-7 p-0 rounded-full hover:bg-pink-50 dark:hover:bg-pink-900/20 text-gray-400 hover:text-pink-500"
                          >
                            <Heart className="h-3.5 w-3.5" />
                          </Button>
                        </div>

                        <div className="flex gap-3">
                          {/* Product Image */}
                          <div className="flex-shrink-0">
                            <ProductAvatar
                              src={item.medication.image}
                              alt={item.medication.name}
                              size="md"
                              className="rounded-lg"
                            />
                          </div>

                          {/* Product Info */}
                          <div className="flex-1 min-w-0 pr-12">
                            <h3 className="font-bold text-gray-900 dark:text-white leading-tight mb-1">
                              {item.medication.name}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                              {item.medication.generic}
                            </p>

                            {/* Badges */}
                            <div className="flex items-center gap-2 mb-3">
                              <Badge variant="secondary" className="text-xs rounded-full px-2 py-0.5">
                                {item.medication.category}
                              </Badge>
                              {item.medication.prescription && (
                                <Badge variant="destructive" className="text-xs rounded-full px-2 py-0.5">
                                  <AlertTriangle className="h-2 w-2 mr-1" />
                                  Receta
                                </Badge>
                              )}
                            </div>

                            {/* Price */}
                            <div className="mb-3">
                              <div className="text-xl font-bold text-gray-900 dark:text-white">
                                ${item.medication.price.toFixed(2)}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                por unidad
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Bottom Row - Quantity Controls and Subtotal */}
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                          {/* Subtotal */}
                          <div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                              Subtotal ({item.quantity} {item.quantity === 1 ? 'unidad' : 'unidades'}):
                            </div>
                            <div className="text-lg font-bold text-green-600 dark:text-green-400">
                              ${(item.medication.price * item.quantity).toFixed(2)}
                            </div>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex flex-col items-end gap-1">
                            <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-full p-0.5">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => onUpdateQuantity(item.medication.id, item.quantity - 1)}
                                className="h-7 w-7 p-0 rounded-full hover:bg-white dark:hover:bg-gray-600"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>

                              <span className="w-10 text-center text-sm font-bold text-gray-900 dark:text-white">
                                {item.quantity}
                              </span>

                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => onUpdateQuantity(item.medication.id, item.quantity + 1)}
                                disabled={item.quantity >= item.medication.stock}
                                className="h-7 w-7 p-0 rounded-full hover:bg-white dark:hover:bg-gray-600 disabled:opacity-50"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>

                            {/* Stock indicator */}
                            <div className="text-xs text-gray-400">
                              Stock: {item.medication.stock}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cart Summary - Fixed Bottom */}
              <div className="flex-shrink-0 bg-white dark:bg-gray-800 rounded-t-3xl p-6 -mx-6 mt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="space-y-4">
                  {/* Summary */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-base">
                      <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                      <span className="font-medium">${calculateTotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-base">
                      <span className="text-gray-600 dark:text-gray-400">IVA (16%):</span>
                      <span className="font-medium">${(calculateTotal() * 0.16).toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total:</span>
                      <span className="text-green-600 dark:text-green-400">
                        ${(calculateTotal() * 1.16).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3 pt-2">
                    <Button
                      onClick={onProcessSale}
                      disabled={!customerInfo.name || !customerInfo.phone}
                      className="w-full h-12 text-base font-semibold rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                      size="lg"
                    >
                      <CreditCard className="h-5 w-5 mr-2" />
                      Procesar Venta
                    </Button>

                    <Button
                      onClick={onClose}
                      variant="outline"
                      className="w-full h-12 text-base rounded-xl border-2"
                      size="lg"
                    >
                      Continuar Comprando
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
