"use client"

import React, { useState } from "react"
import { CartButton } from "@/components/molecules/CartButton"
import { CartSheet } from "@/components/organisms/CartSheet"

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

interface CartManagerProps {
  cart: CartItem[]
  customerInfo: CustomerInfo
  onUpdateQuantity: (medicationId: string, newQuantity: number) => void
  onRemoveFromCart: (medicationId: string) => void
  calculateTotal: () => number
  onProcessSale: () => void
  className?: string
}

export function CartManager({
  cart,
  customerInfo,
  onUpdateQuantity,
  onRemoveFromCart,
  calculateTotal,
  onProcessSale,
  className
}: CartManagerProps) {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <>
      <CartButton
        itemCount={totalItems}
        onClick={() => setIsCartOpen(true)}
        className={className}
      />

      <CartSheet
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        customerInfo={customerInfo}
        onUpdateQuantity={onUpdateQuantity}
        onRemoveFromCart={onRemoveFromCart}
        calculateTotal={calculateTotal}
        onProcessSale={onProcessSale}
      />
    </>
  )
}
