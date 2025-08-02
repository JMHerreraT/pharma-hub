import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Package, DollarSign, User, Phone, MapPin } from "lucide-react"
import OrderStatusBadge from "@/components/molecules/OrderStatusBadge"

interface OrderInfoCardProps {
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

const OrderInfoCard = ({
    customer,
    customerPhone,
    customerAddress,
    total,
    items,
    orderDate,
    expectedDelivery,
    status,
    products
}: OrderInfoCardProps) => {
    return (
        <Card className="h-full flex flex-col">
            <CardHeader className="flex-shrink-0">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Información del Pedido</CardTitle>
                    <OrderStatusBadge status={status} />
                </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-6 p-4 lg:p-6">
                {/* Información del cliente */}
                <div className="space-y-3">
                    <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                        Cliente
                    </h3>

                    <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <span className="font-medium">{customer}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <span className="text-muted-foreground">{customerPhone}</span>
                    </div>
                </div>

                {/* Información del pedido */}
                <div className="space-y-3">
                    <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                        Detalles del Pedido
                    </h3>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-2">
                            <Package className="h-4 w-4 text-muted-foreground" />
                            <div>
                                <p className="text-xs text-muted-foreground">Artículos</p>
                                <Badge variant="secondary" className="text-xs">
                                    {items} producto{items !== 1 ? 's' : ''}
                                </Badge>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                            <div>
                                <p className="text-xs text-muted-foreground">Total</p>
                                <span className="font-semibold">${total.toFixed(2)} USD</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-2">
                            <CalendarDays className="h-4 w-4 text-muted-foreground" />
                            <div>
                                <p className="text-xs text-muted-foreground">Fecha de pedido</p>
                                <span className="text-sm">{new Date(orderDate).toLocaleDateString('es-ES')}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <CalendarDays className="h-4 w-4 text-muted-foreground" />
                            <div>
                                <p className="text-xs text-muted-foreground">Entrega esperada</p>
                                <span className="text-sm">{new Date(expectedDelivery).toLocaleDateString('es-ES')}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dirección de Entrega */}
                <div className="space-y-3">
                    <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                        Dirección de Entrega
                    </h3>

                    <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div className="min-w-0">
                            <p className="text-sm font-medium break-words">{customerAddress}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                                Usa el botón &quot;Ver Dirección&quot; para visualizar en el mapa
                            </p>
                        </div>
                    </div>
                </div>

                {/* Productos - Versión compacta */}
                <div className="border-t pt-4 flex-shrink-0">
                    <div className="flex items-start gap-2">
                        <Package className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div className="min-w-0">
                            <h4 className="font-medium text-sm">Productos:</h4>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                {products}
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default OrderInfoCard
