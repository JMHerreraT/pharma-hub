"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"

interface CartButtonProps {
  itemCount: number
  onClick: () => void
  className?: string
}

export function CartButton({ itemCount, onClick, className }: CartButtonProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      className={`relative h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800 ${className}`}
    >
      <ShoppingCart className="h-4 w-4" />
      {itemCount > 0 && (
        <Badge
          variant="destructive"
          className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center min-w-[1.25rem]"
        >
          {itemCount > 99 ? '99+' : itemCount}
        </Badge>
      )}
      <span className="sr-only">
        Carrito de compras - {itemCount} {itemCount === 1 ? 'artículo' : 'artículos'}
      </span>
    </Button>
  )
}
