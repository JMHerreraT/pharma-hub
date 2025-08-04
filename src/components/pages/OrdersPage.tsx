"use client"

import React, { Suspense } from "react"
import OrdersPageHeader from "@/components/organisms/OrdersPageHeader"
import DataTableSkeleton from "@/components/atoms/DataTableSkeleton"

// Lazy load OrdersPageDataTable
const LazyOrdersPageDataTable = React.lazy(() => import('@/components/organisms/LazyOrdersPageDataTable'))

const OrdersPage = () => {
    return (
        <div className="container mx-auto p-4 lg:p-6 space-y-6 lg:space-y-8">
            <OrdersPageHeader />
            <Suspense fallback={<DataTableSkeleton rows={10} columns={7} />}>
                <LazyOrdersPageDataTable />
            </Suspense>
        </div>
    )
}

export default OrdersPage
