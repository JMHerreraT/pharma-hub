"use client"

import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import z from 'zod'
import { ColumnDef } from '@tanstack/react-table'
import { DragHandle } from '@/components/atoms/DragHandle'
import { Checkbox } from '@/components/ui/checkbox'
import { MoreVerticalIcon, Edit, Trash2, Phone, Mail, MapPin, Calendar, Eye } from 'lucide-react'
import { toast } from 'sonner'
import { DraggableDataTable } from '@/components/organisms/DraggableDataTable'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export const customerSchema = z.object({
  id: z.number(),
  customerId: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  address: z.string(),
  registeredDate: z.string(),
  status: z.string(),
  type: z.string(),
  totalPurchases: z.number(),
  lastPurchase: z.string(),
})

interface CustomersDataTableProps {
  customers: z.infer<typeof customerSchema>[]
  enableRowsPerPage?: boolean
  enablePagination?: boolean
  defaultItemsToShow?: number
}

const CustomersDataTable = ({
  customers,
  enableRowsPerPage = true,
  enablePagination = true,
  defaultItemsToShow = 10
}: CustomersDataTableProps) => {

  const getStatusBadge = (status: string) => {
    return status === "active" ? (
      <Badge variant="default" className="bg-green-100 text-green-700 border-green-200">
        Activo
      </Badge>
    ) : (
      <Badge variant="secondary" className="bg-gray-100 text-gray-700 border-gray-200">
        Inactivo
      </Badge>
    )
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "frequent":
        return <Badge className="bg-purple-100 text-purple-700 border-purple-200">VIP</Badge>
      case "regular":
        return <Badge variant="outline">Regular</Badge>
      case "new":
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">Nuevo</Badge>
      default:
        return null
    }
  }

  const columns: ColumnDef<z.infer<typeof customerSchema>>[] = [
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
      header: "Cliente",
      cell: ({ row }) => {
        const customer = row.original

        return (
          <div className="flex items-center gap-3 min-w-0">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                {customer.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-gray-900 dark:text-white">
                  {customer.name}
                </span>
                {getTypeBadge(customer.type)}
                {getStatusBadge(customer.status)}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                DNI: {customer.customerId}
              </p>
            </div>
          </div>
        )
      },
      enableHiding: false,
    },
    {
      accessorKey: "email",
      header: "Contacto",
      cell: ({ row }) => (
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-sm">
            <Mail className="h-3 w-3 text-gray-400" />
            <span className="truncate max-w-[200px]">{row.original.email}</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Phone className="h-3 w-3 text-gray-400" />
            <span>{row.original.phone}</span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "address",
      header: "Dirección",
      cell: ({ row }) => (
        <div className="flex items-center gap-1 text-sm max-w-[200px]">
          <MapPin className="h-3 w-3 text-gray-400 flex-shrink-0" />
          <span className="truncate">{row.original.address}</span>
        </div>
      ),
    },
    {
      accessorKey: "totalPurchases",
      header: () => <div className="text-center">Compras</div>,
      cell: ({ row }) => (
        <div className="text-center">
          <div className="font-medium text-blue-600 dark:text-blue-400">
            {row.original.totalPurchases}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            total
          </div>
        </div>
      ),
    },
    {
      accessorKey: "lastPurchase",
      header: () => <div className="text-center">Última Compra</div>,
      cell: ({ row }) => (
        <div className="text-center text-sm">
          <div className="flex items-center justify-center gap-1">
            <Calendar className="h-3 w-3 text-gray-400" />
            <span>{new Date(row.original.lastPurchase).toLocaleDateString()}</span>
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
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem
                onClick={() => {
                  console.log('Ver perfil:', customer.name)
                  toast.info(`Viendo perfil de ${customer.name}`)
                }}
              >
                <Eye className="mr-2 h-4 w-4" />
                Ver perfil
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  console.log('Editar cliente:', customer.name)
                  toast.info(`Editando ${customer.name}`)
                }}
              >
                <Edit className="mr-2 h-4 w-4" />
                Editar cliente
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  console.log('Llamar cliente:', customer.phone)
                  toast.info(`Llamando a ${customer.phone}`)
                }}
              >
                <Phone className="mr-2 h-4 w-4" />
                Llamar
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => {
                  console.log('Eliminar cliente:', customer.name)
                  toast.error(`Eliminando ${customer.name}`)
                }}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const handleDataChange = (newData: z.infer<typeof customerSchema>[]) => {
    console.log('Datos de clientes cambiados:', newData)
    toast.success('Orden de clientes actualizado exitosamente')
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

export default CustomersDataTable
