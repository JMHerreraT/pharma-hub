"use client"

import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import z from 'zod'
import { ColumnDef } from '@tanstack/react-table'
import { DragHandle } from '@/components/atoms/DragHandle'
import { Checkbox } from '@/components/ui/checkbox'
import { MoreVerticalIcon, Eye, Heart, Phone, Mail, Star, ShoppingBag, TrendingUp, Gift } from 'lucide-react'
import { toast } from 'sonner'
import { DraggableDataTable } from '@/components/organisms/DraggableDataTable'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export const frequentCustomerSchema = z.object({
  id: z.number(),
  customerId: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  address: z.string(),
  totalPurchases: z.number(),
  totalSpent: z.number(),
  lastPurchase: z.string(),
  loyaltyPoints: z.number(),
  tier: z.string(),
  joinDate: z.string(),
  favoriteCategory: z.string(),
  birthDate: z.string(),
})

interface FrequentCustomersDataTableProps {
  customers: z.infer<typeof frequentCustomerSchema>[]
  enableRowsPerPage?: boolean
  enablePagination?: boolean
  defaultItemsToShow?: number
}

const FrequentCustomersDataTable = ({
  customers,
  enableRowsPerPage = true,
  enablePagination = true,
  defaultItemsToShow = 10
}: FrequentCustomersDataTableProps) => {

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Diamond":
        return "bg-purple-100 text-purple-700 border-purple-200"
      case "Platinum":
        return "bg-gray-100 text-gray-700 border-gray-200"
      case "Gold":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "Silver":
        return "bg-blue-100 text-blue-700 border-blue-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case "Diamond":
        return "💎"
      case "Platinum":
        return "⭐"
      case "Gold":
        return "🥇"
      case "Silver":
        return "🥈"
      default:
        return "🏅"
    }
  }

  const columns: ColumnDef<z.infer<typeof frequentCustomerSchema>>[] = [
    {
      id: "drag",
      header: () => null,
      cell: ({ row }) => <DragHandle id={row.original.id} />,
    },
    {
      id: "select",
      header: ({ table }) => (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "Cliente VIP",
      cell: ({ row }) => {
        const customer = row.original

        return (
          <div className="flex items-center gap-3 min-w-0">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                {customer.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-gray-900 dark:text-white">
                  {customer.name}
                </span>
                <Badge className={`text-xs ${getTierColor(customer.tier)}`}>
                  {getTierIcon(customer.tier)} {customer.tier}
                </Badge>
              </div>
              <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Phone className="h-2 w-2" />
                  <span>{customer.phone}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Mail className="h-2 w-2" />
                  <span className="truncate max-w-[150px]">{customer.email}</span>
                </div>
              </div>
            </div>
          </div>
        )
      },
      enableHiding: false,
    },
    {
      accessorKey: "totalSpent",
      header: () => <div className="text-center">Total Gastado</div>,
      cell: ({ row }) => (
        <div className="text-center">
          <div className="font-bold text-green-600 dark:text-green-400">
            ${row.original.totalSpent.toFixed(2)}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {row.original.totalPurchases} compras
          </div>
        </div>
      ),
    },
    {
      accessorKey: "loyaltyPoints",
      header: () => <div className="text-center">Puntos</div>,
      cell: ({ row }) => (
        <div className="text-center">
          <div className="flex items-center justify-center gap-1">
            <Star className="h-3 w-3 text-yellow-500" />
            <span className="font-medium text-yellow-600 dark:text-yellow-400">
              {row.original.loyaltyPoints}
            </span>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            pts lealtad
          </div>
        </div>
      ),
    },
    {
      accessorKey: "favoriteCategory",
      header: "Categoría Favorita",
      cell: ({ row }) => (
        <div className="text-sm">
          <Badge variant="outline" className="text-xs">
            {row.original.favoriteCategory}
          </Badge>
        </div>
      ),
    },
    {
      accessorKey: "lastPurchase",
      header: () => <div className="text-center">Última Compra</div>,
      cell: ({ row }) => (
        <div className="text-center text-sm">
          <div>{new Date(row.original.lastPurchase).toLocaleDateString()}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Miembro desde {new Date(row.original.joinDate).getFullYear()}
          </div>
        </div>
      ),
    },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => {
        const customer = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
                size="icon"
              >
                <MoreVerticalIcon />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem
                onClick={() => {
                  console.log('Ver perfil VIP:', customer.name)
                  toast.info(`Viendo perfil VIP de ${customer.name}`)
                }}
              >
                <Eye className="mr-2 h-4 w-4" />
                Ver perfil VIP
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  console.log('Ver historial:', customer.name)
                  toast.info(`Historial de compras de ${customer.name}`)
                }}
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                Ver historial
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  console.log('Nueva venta:', customer.name)
                  toast.success(`Iniciando nueva venta para ${customer.name}`)
                }}
              >
                <TrendingUp className="mr-2 h-4 w-4" />
                Nueva venta
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  console.log('Enviar regalo:', customer.name)
                  toast.info(`Enviando regalo especial a ${customer.name}`)
                }}
              >
                <Gift className="mr-2 h-4 w-4" />
                Enviar regalo
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  console.log('Gestionar lealtad:', customer.name)
                  toast.info(`Gestionando programa de lealtad para ${customer.name}`)
                }}
              >
                <Heart className="mr-2 h-4 w-4" />
                Gestionar lealtad
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const handleDataChange = (newData: z.infer<typeof frequentCustomerSchema>[]) => {
    console.log('Datos de clientes frecuentes cambiados:', newData)
    toast.success('Orden de clientes VIP actualizado exitosamente')
  }

  return (
    <div className="w-full h-full">
      <div className="overflow-x-auto">
        <DraggableDataTable
          data={customers}
          columns={columns}
          enableRowsPerPage={enableRowsPerPage}
          enablePagination={enablePagination}
          defaultItemsToShow={defaultItemsToShow}
          onDataChange={handleDataChange}
        />
      </div>
    </div>
  )
}

export default FrequentCustomersDataTable
