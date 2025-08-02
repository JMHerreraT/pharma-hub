import { Badge } from "@/components/ui/badge"
import {
    Clock,
    CheckCircle2,
    XCircle,
    Truck,
    Package,
    AlertCircle
} from "lucide-react"

interface OrderStatusBadgeProps {
    status: string
    className?: string
}

const getStatusConfig = (status: string) => {
    switch (status) {
        case "pendiente":
            return {
                variant: "secondary" as const,
                icon: Clock,
                label: "Pendiente"
            }
        case "confirmado":
            return {
                variant: "default" as const,
                icon: CheckCircle2,
                label: "Confirmado"
            }
        case "preparando":
            return {
                variant: "secondary" as const,
                icon: Package,
                label: "Preparando"
            }
        case "enviando":
            return {
                variant: "default" as const,
                icon: Truck,
                label: "Enviando"
            }
        case "entregado":
            return {
                variant: "default" as const,
                icon: CheckCircle2,
                label: "Entregado"
            }
        case "cancelado":
            return {
                variant: "destructive" as const,
                icon: XCircle,
                label: "Cancelado"
            }
        default:
            return {
                variant: "outline" as const,
                icon: AlertCircle,
                label: "Desconocido"
            }
    }
}

const OrderStatusBadge = ({ status, className }: OrderStatusBadgeProps) => {
    const config = getStatusConfig(status)
    const Icon = config.icon

    return (
        <Badge variant={config.variant} className={className}>
            <Icon className="w-3 h-3 mr-1" />
            {config.label}
        </Badge>
    )
}

export default OrderStatusBadge
