"use client"

import { Button } from "@/components/ui/button"
import { Download, Upload, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const OrdersPageActions = () => {
    const router = useRouter()

    const handleImport = () => {
        console.log('Importando pedidos...')
        toast.info('Función de importación en desarrollo')
    }

    const handleExport = () => {
        console.log('Exportando pedidos...')
        toast.success('Exportando pedidos a CSV...')
    }

    const handleAddOrder = () => {
        router.push('/dashboard/orders?action=create')
    }

    return (
        <div className="flex flex-col sm:flex-row gap-2">
            <Button
                variant="outline"
                size="sm"
                onClick={handleImport}
                className="flex items-center gap-2"
            >
                <Upload className="h-4 w-4" />
                Importar
            </Button>
            <Button
                variant="outline"
                size="sm"
                onClick={handleExport}
                className="flex items-center gap-2"
            >
                <Download className="h-4 w-4" />
                Exportar
            </Button>
            <Button
                size="sm"
                onClick={handleAddOrder}
                className="flex items-center gap-2"
            >
                <Plus className="h-4 w-4" />
                Nuevo Pedido
            </Button>
        </div>
    )
}

export default OrdersPageActions
