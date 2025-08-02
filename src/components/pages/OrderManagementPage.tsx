"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import OrderManagementHeader from "@/components/organisms/OrderManagementHeader"
import OrderManagementContent from "@/components/organisms/OrderManagementContent"
import { toast } from "sonner"
import ordersData from "@/lib/orders-data.json"

interface OrderData {
    id: string
    customer: string
    products: string
    total: number
    status: string
    orderDate: string
    expectedDelivery: string
    customerPhone: string
    customerAddress: string
    items: number
}

interface OrderManagementPageProps {
    orderNumber: string
}

const OrderManagementPage = ({ orderNumber }: OrderManagementPageProps) => {
    const router = useRouter()
    const [orderData, setOrderData] = useState<OrderData | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Buscar el pedido en los datos
        const order = ordersData.find(o => o.id === orderNumber) as OrderData | undefined

        if (!order) {
            toast.error('Pedido no encontrado')
            router.push('/dashboard/orders')
            return
        }

        setOrderData(order)
        setIsLoading(false)
    }, [orderNumber, router])

    const handleStatusUpdate = (newStatus: string, note: string) => {
        if (!orderData) return

        // Simular actualización en el estado local
        setOrderData(prev => prev ? { ...prev, status: newStatus } : null)

        console.log('Order status updated:', {
            orderNumber,
            oldStatus: orderData.status,
            newStatus,
            note,
            timestamp: new Date().toISOString()
        })

        // Aquí se haría la llamada real a la API
        // updateOrderStatus(orderNumber, newStatus, note)
    }

    if (isLoading) {
        return (
            <div className="container mx-auto p-4 lg:p-6">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                        <p className="text-muted-foreground">Cargando información del pedido...</p>
                    </div>
                </div>
            </div>
        )
    }

    if (!orderData) {
        return (
            <div className="container mx-auto p-4 lg:p-6">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-center">
                        <p className="text-muted-foreground">No se pudo cargar la información del pedido</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto p-4 lg:p-6 space-y-6 lg:space-y-8">
            <OrderManagementHeader orderNumber={orderNumber} />
            <OrderManagementContent
                orderData={orderData}
                orderNumber={orderNumber}
                onStatusUpdate={handleStatusUpdate}
            />
        </div>
    )
}

export default OrderManagementPage
