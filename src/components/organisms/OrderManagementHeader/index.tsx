"use client"

import { ArrowLeft, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import OrderManagementBreadcrumb from "@/components/molecules/OrderManagementBreadcrumb"

interface OrderManagementHeaderProps {
    orderNumber: string
}

const OrderManagementHeader = ({ orderNumber }: OrderManagementHeaderProps) => {
    const router = useRouter()

    return (
        <div className="space-y-4 lg:space-y-6">
            <OrderManagementBreadcrumb orderNumber={orderNumber} />

            <div className="flex items-center gap-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push('/dashboard/orders')}
                    className="flex items-center gap-2"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Volver a Pedidos
                </Button>

                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <Settings className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold">
                            Gestionar Pedido
                        </h1>
                        <p className="text-muted-foreground">
                            Pedido #{orderNumber} - Administrar estado y procesar entrega
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderManagementHeader
