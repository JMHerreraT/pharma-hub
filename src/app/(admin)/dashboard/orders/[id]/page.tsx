import OrderManagementPage from "@/components/pages/OrderManagementPage"

interface OrderManagementRouteProps {
    params: Promise<{ id: string }>
}

export default async function OrderManagementRoute({ params }: OrderManagementRouteProps) {
    const { id } = await params
    return <OrderManagementPage orderNumber={id} />
}
