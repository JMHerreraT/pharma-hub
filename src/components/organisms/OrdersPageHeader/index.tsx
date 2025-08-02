import OrdersBreadcrumb from "@/components/molecules/OrdersBreadcrumb"
import OrdersPageTitle from "@/components/molecules/OrdersPageTitle"
import OrdersPageActions from "@/components/molecules/OrdersPageActions"

const OrdersPageHeader = () => {
    return (
        <div className="space-y-4 lg:space-y-6">
            <OrdersBreadcrumb />

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <OrdersPageTitle />
                <OrdersPageActions />
            </div>
        </div>
    )
}

export default OrdersPageHeader
