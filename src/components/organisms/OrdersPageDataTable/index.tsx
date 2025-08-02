"use client"

import React, { useMemo } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Eye, Edit, Trash2, Phone, MapPin } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DraggableDataTable } from "@/components/organisms/DraggableDataTable"
import OrderStatusBadge from "@/components/molecules/OrderStatusBadge"
import ProductsDetailDialog from "@/components/molecules/ProductsDetailDialog"
import { toast } from "sonner"
import ordersData from "@/lib/orders-data.json"

// Schema para validación de pedidos
type Order = {
    id: number,
    orderNumber: string,
    customer: string,
    products: string,
    total: number,
    status: string,
    orderDate: string,
    expectedDelivery: string,
    customerPhone: string,
    customerAddress: string,
    items: number,
}

const OrdersPageDataTable = () => {
    const router = useRouter()

    // Adaptar los datos para que coincidan con el tipo Order
    const adaptedOrdersData: Order[] = useMemo(() => {
        return ordersData.map((order, index) => ({
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
    }, [])

    // Definir columnas específicas para pedidos
    const columns: ColumnDef<Order>[] = useMemo(() => [
        {
            accessorKey: "orderNumber",
            header: "Número de Pedido",
            cell: ({ row }) => (
                <button
                    onClick={() => router.push(`/dashboard/orders/${row.getValue("orderNumber")}`)}
                    className="font-medium text-primary hover:text-primary/80 hover:underline transition-colors cursor-pointer"
                >
                    {row.getValue("orderNumber")}
                </button>
            ),
        },
        {
            accessorKey: "customer",
            header: "Cliente",
            cell: ({ row }) => (
                <div className="flex flex-col gap-1">
                    <div className="font-medium">
                        {row.getValue("customer")}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        {row.original.customerPhone}
                    </div>
                </div>
            ),
        },
        {
            accessorKey: "products",
            header: "Productos",
            cell: ({ row }) => (
                <ProductsDetailDialog
                    orderNumber={row.original.orderNumber}
                    productsString={row.getValue("products")}
                    totalItems={row.original.items}
                />
            ),
        },
        {
            accessorKey: "total",
            header: "Total",
            cell: ({ row }) => (
                <div className="font-medium">
                    ${(row.getValue("total") as number).toFixed(2)} USD
                </div>
            ),
        },
        {
            accessorKey: "status",
            header: "Estado",
            cell: ({ row }) => (
                <OrderStatusBadge status={row.getValue("status")} />
            ),
        },
        {
            accessorKey: "orderDate",
            header: "Fecha del Pedido",
            cell: ({ row }) => (
                <div className="text-sm">
                    {new Date(row.getValue("orderDate")).toLocaleDateString('es-ES')}
                </div>
            ),
        },
        {
            accessorKey: "expectedDelivery",
            header: "Entrega Esperada",
            cell: ({ row }) => (
                <div className="text-sm">
                    {new Date(row.getValue("expectedDelivery")).toLocaleDateString('es-ES')}
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
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Abrir menú</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => {
                                    console.log('Ver pedido:', order.orderNumber)
                                    toast.info(`Viendo detalles del pedido ${order.orderNumber}`)
                                }}
                            >
                                <Eye className="mr-2 h-4 w-4" />
                                Ver detalles
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => {
                                    console.log('Editar pedido:', order.orderNumber)
                                    toast.info(`Editando pedido ${order.orderNumber}`)
                                }}
                            >
                                <Edit className="mr-2 h-4 w-4" />
                                Editar pedido
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => {
                                    console.log('Ver dirección:', order.customerAddress)
                                    toast.info(`Dirección: ${order.customerAddress}`)
                                }}
                            >
                                <MapPin className="mr-2 h-4 w-4" />
                                Ver dirección
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => {
                                    console.log('Eliminar pedido:', order.orderNumber)
                                    toast.error(`Eliminando pedido ${order.orderNumber}`)
                                }}
                                className="text-destructive"
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Eliminar pedido
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ], [])

    const handleDataChange = (newData: Order[]) => {
        console.log('Datos de pedidos actualizados:', newData)
        toast.success('Orden de pedidos actualizada')
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Lista de Pedidos</CardTitle>
            </CardHeader>
            <CardContent>
                <DraggableDataTable<Order>
                    data={adaptedOrdersData}
                    columns={columns}
                    enableRowsPerPage={true}
                    enablePagination={true}
                    defaultItemsToShow={10}
                    onDataChange={handleDataChange}
                />
            </CardContent>
        </Card>
    )
}

export default OrdersPageDataTable
