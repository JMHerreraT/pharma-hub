"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Package } from "lucide-react"

interface MedicationSearchProps {
  searchTerm: string
  onSearchChange: (term: string) => void
}

export function MedicationSearch({ searchTerm, onSearchChange }: MedicationSearchProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Package className="h-5 w-5" />
          Buscar Medicamentos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar por nombre, principio activo, categoría..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 h-10"
          />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
          💡 Tip: Haz click en el nombre del medicamento para agregarlo al carrito
        </p>
      </CardContent>
    </Card>
  )
}
