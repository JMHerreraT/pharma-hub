import OrdersPageHeader from "@/components/organisms/OrdersPageHeader"
import OrdersPageDataTable from "@/components/organisms/OrdersPageDataTable"

const OrdersPage = () => {
    return (
        <div className="container mx-auto p-4 lg:p-6 space-y-6 lg:space-y-8">
            <OrdersPageHeader />
            <OrdersPageDataTable />
        </div>
    )
}

export default OrdersPage
