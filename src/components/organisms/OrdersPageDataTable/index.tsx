"use client"

import React from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import z from "zod"
import { ColumnDef } from "@tanstack/react-table"
import { DragHandle } from "@/components/atoms/DragHandle"
import { Checkbox } from "@/components/ui/checkbox"
import { MoreVerticalIcon, Eye, Edit, Trash2, Phone, MapPin } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DraggableDataTable } from "@/components/organisms/DraggableDataTable"
import OrderStatusBadge from "@/components/molecules/OrderStatusBadge"
import ProductsDetailDialog from "@/components/molecules/ProductsDetailDialog"
import { toast } from "sonner"
import ordersData from "@/lib/orders-data.json"

export const orderSchema = z.object({
  id: z.number(),
  orderNumber: z.string(),
  customer: z.string(),
  products: z.string(),
  total: z.number(),
  status: z.string(),
  orderDate: z.string(),
  expectedDelivery: z.string(),
  customerPhone: z.string(),
  customerAddress: z.string(),
  items: z.number(),
})

interface OrdersPageDataTableProps {
  enableRowsPerPage?: boolean
  enablePagination?: boolean
  defaultItemsToShow?: number
}

const OrdersPageDataTable = ({
  enableRowsPerPage = true,
  enablePagination = true,
  defaultItemsToShow = 10
}: OrdersPageDataTableProps) => {
  const router = useRouter()

  // Adaptar los datos para que coincidan con el esquema
  const adaptedOrdersData: z.infer<typeof orderSchema>[] = ordersData.map((order, index) => ({
    id: index + 1, // Convertir a número usando index
    orderNumber: order.id, // Usar el id original como número de pedido
    customer: order.customer,
    products: order.products,
    total: order.total,
    status: order.status,
    orderDate: order.orderDate,
    expectedDelivery: order.expectedDelivery,
    customerPhone: order.customerPhone,
    customerAddress: order.customerAddress,
    items: order.items,
  }))

  const columns: ColumnDef<z.infer<typeof orderSchema>>[] = [
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
      accessorKey: "orderNumber",
      header: "Número de Pedido",
      cell: ({ row }) => {
        const order = row.original
        return (
          <button
            onClick={() => router.push(`/dashboard/orders/${order.orderNumber}`)}
            className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            #{order.orderNumber}
          </button>
        )
      },
      enableHiding: false,
    },
    {
      accessorKey: "customer",
      header: "Cliente",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium">{row.original.customer}</span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {row.original.customerPhone}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "products",
      header: "Productos",
      cell: ({ row }) => (
        <ProductsDetailDialog
          orderNumber={row.original.orderNumber}
          productsString={row.original.products}
          totalItems={row.original.items}
        />
      ),
    },
    {
      accessorKey: "total",
      header: () => <div className="text-right">Total</div>,
      cell: ({ row }) => (
        <div className="text-right font-medium">
          ${row.original.total.toFixed(2)}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Estado",
      cell: ({ row }) => (
        <OrderStatusBadge status={row.original.status} />
      ),
    },
    {
      accessorKey: "orderDate",
      header: "Fecha",
      cell: ({ row }) => (
        <div className="text-sm">
          {new Date(row.original.orderDate).toLocaleDateString()}
        </div>
      ),
    },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => {
        const order = row.original

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
                onClick={() => router.push(`/dashboard/orders/${order.orderNumber}`)}
              >
                <Eye className="mr-2 h-4 w-4" />
                Ver detalles
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Editar pedido
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Phone className="mr-2 h-4 w-4" />
                Llamar cliente
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MapPin className="mr-2 h-4 w-4" />
                Ver dirección
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Eliminar pedido
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const handleDataChange = (newData: z.infer<typeof orderSchema>[]) => {
    console.log('Datos de pedidos cambiados:', newData)
    toast.success('Orden de pedidos actualizado exitosamente')
  }

  return (
    <div className="w-full h-full">
      <div className="overflow-x-auto">
        <DraggableDataTable
          data={adaptedOrdersData}
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

export default OrdersPageDataTable
