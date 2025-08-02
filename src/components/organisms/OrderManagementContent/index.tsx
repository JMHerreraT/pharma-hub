import OrderInfoCard from "@/components/molecules/OrderInfoCard"
import OrderStatusUpdater from "@/components/molecules/OrderStatusUpdater"
import OrderActions from "@/components/molecules/OrderActions"

interface OrderData {
    customer: string
    customerPhone: string
    customerAddress: string
    total: number
    items: number
    orderDate: string
    expectedDelivery: string
    status: string
    products: string
}

interface OrderManagementContentProps {
    orderData: OrderData
    orderNumber: string
    onStatusUpdate?: (newStatus: string, note: string) => void
}

const OrderManagementContent = ({
    orderData,
    orderNumber,
    onStatusUpdate
}: OrderManagementContentProps) => {
    return (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8 min-h-[calc(100vh-300px)]">
            {/* Información del pedido */}
            <div className="xl:col-span-1 h-full">
                <OrderInfoCard
                    customer={orderData.customer}
                    customerPhone={orderData.customerPhone}
                    customerAddress={orderData.customerAddress}
                    total={orderData.total}
                    items={orderData.items}
                    orderDate={orderData.orderDate}
                    expectedDelivery={orderData.expectedDelivery}
                    status={orderData.status}
                    products={orderData.products}
                />
            </div>

            {/* Herramientas de gestión */}
            <div className="xl:col-span-2 space-y-6 flex flex-col">
                {/* Actualizador de estado */}
                <div className="flex-shrink-0">
                    <OrderStatusUpdater
                        currentStatus={orderData.status}
                        orderNumber={orderNumber}
                        onStatusUpdate={onStatusUpdate}
                    />
                </div>

                {/* Acciones del pedido */}
                <div className="flex-1">
                    <OrderActions
                        orderNumber={orderNumber}
                        customerPhone={orderData.customerPhone}
                        customerAddress={orderData.customerAddress}
                        status={orderData.status}
                    />
                </div>
            </div>
        </div>
    )
}

export default OrderManagementContent
