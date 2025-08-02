"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Printer,
    MessageCircle,
    Phone,
    MapPin,
    Package,
    Calculator,
    Receipt,
    Truck,
    X
} from "lucide-react"
import { toast } from "sonner"
import OrderLocationMap from "@/components/molecules/OrderLocationMap"

// Función para obtener coordenadas de la dirección (igual que en OrderLocationMap)
const getCoordinatesFromAddress = (address: string): [number, number] => {
  const mockCoordinates: Record<string, [number, number]> = {
    'Av. Principal 123, Ciudad': [-11.97569437451346, -76.796298230348], // NYC-like
    'Calle Luna 456, Ciudad': [-74.0059, 40.7589], // Manhattan
    'Plaza Central 789, Ciudad': [-74.0445, 40.6892], // Brooklyn
    'Calle Sol 321, Ciudad': [-11.97569437451346, -76.796298230348], // Queens
    'Av. Norte 654, Ciudad': [-73.9442, 40.8176], // Bronx
    'Calle Este 987, Ciudad': [-74.1502, 40.6334], // Staten Island
    'Plaza Sur 147, Ciudad': [-74.0060, 40.7055], // Lower Manhattan
    'Av. Oeste 258, Ciudad': [-74.0014, 40.7505], // Midtown
    'Calle Central 369, Ciudad': [-73.9665, 40.7812], // Upper Manhattan
    'Plaza Norte 741, Ciudad': [-73.9781, 40.7488], // Midtown East
  }

  return mockCoordinates[address] || [-74.006, 40.7128] // Default to NYC
}

interface OrderActionsProps {
    orderNumber: string
    customerPhone: string
    customerAddress: string
    status: string
}

const OrderActions = ({
    orderNumber,
    customerPhone,
    customerAddress,
    status
}: OrderActionsProps) => {
    const [isMapDialogOpen, setIsMapDialogOpen] = useState(false)

    const handlePrintOrder = () => {
        toast.info(`Imprimiendo pedido ${orderNumber}...`)
        console.log("Print order:", orderNumber)
    }

    const handleCallCustomer = () => {
        toast.info(`Llamando a ${customerPhone}...`)
        console.log("Call customer:", customerPhone)
    }

    const handleSendMessage = () => {
        toast.info("Abriendo mensajes...")
        console.log("Send message to:", customerPhone)
    }

    const handleViewAddress = () => {
        setIsMapDialogOpen(true)
    }

    const handleGenerateLabel = () => {
        toast.info(`Generando etiqueta de envío para ${orderNumber}...`)
        console.log("Generate shipping label for:", orderNumber)
    }

    const handleCalculateShipping = () => {
        toast.info("Calculando costo de envío...")
        console.log("Calculate shipping for:", customerAddress)
    }

    const handleGenerateInvoice = () => {
        toast.info(`Generando factura para ${orderNumber}...`)
        console.log("Generate invoice for:", orderNumber)
    }

    const handleScheduleDelivery = () => {
        toast.info("Programando entrega...")
        console.log("Schedule delivery for:", orderNumber)
    }

    const isCompleted = status === "entregado"
    const isCancelled = status === "cancelado"
    const canShip = status === "confirmado" || status === "preparando"

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Package className="h-5 w-5 text-primary" />
                        Acciones del Pedido
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {/* Comunicación con cliente */}
                        <Button
                            variant="outline"
                            onClick={handleCallCustomer}
                            className="justify-start"
                            disabled={isCancelled}
                        >
                            <Phone className="h-4 w-4 mr-2" />
                            Llamar Cliente
                        </Button>

                        <Button
                            variant="outline"
                            onClick={handleSendMessage}
                            className="justify-start"
                            disabled={isCancelled}
                        >
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Enviar Mensaje
                        </Button>

                        {/* Ubicación y logística */}
                        <Button
                            variant="outline"
                            onClick={handleViewAddress}
                            className="justify-start"
                        >
                            <MapPin className="h-4 w-4 mr-2" />
                            Ver Dirección
                        </Button>

                        <Button
                            variant="outline"
                            onClick={handleCalculateShipping}
                            className="justify-start"
                            disabled={isCompleted || isCancelled}
                        >
                            <Calculator className="h-4 w-4 mr-2" />
                            Calcular Envío
                        </Button>

                        {/* Documentos */}
                        <Button
                            variant="outline"
                            onClick={handlePrintOrder}
                            className="justify-start"
                        >
                            <Printer className="h-4 w-4 mr-2" />
                            Imprimir Pedido
                        </Button>

                        <Button
                            variant="outline"
                            onClick={handleGenerateInvoice}
                            className="justify-start"
                            disabled={isCancelled}
                        >
                            <Receipt className="h-4 w-4 mr-2" />
                            Generar Factura
                        </Button>

                        {/* Envío */}
                        {canShip && (
                            <>
                                <Button
                                    variant="outline"
                                    onClick={handleGenerateLabel}
                                    className="justify-start"
                                >
                                    <Package className="h-4 w-4 mr-2" />
                                    Etiqueta de Envío
                                </Button>

                                <Button
                                    variant="outline"
                                    onClick={handleScheduleDelivery}
                                    className="justify-start"
                                >
                                    <Truck className="h-4 w-4 mr-2" />
                                    Programar Entrega
                                </Button>
                            </>
                        )}
                    </div>

                    {/* Estado específico mensaje */}
                    <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                        <p className="text-sm text-muted-foreground">
                            {isCompleted && "✅ Pedido completado. Todas las acciones están disponibles para consulta."}
                            {isCancelled && "❌ Pedido cancelado. Solo acciones de consulta disponibles."}
                            {status === "pendiente" && "⏳ Pedido pendiente. Confirma el pedido para habilitar opciones de envío."}
                            {canShip && "📦 Pedido listo para envío. Puedes generar etiquetas y programar entrega."}
                            {status === "enviando" && "🚛 Pedido en camino. El cliente ha sido notificado."}
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Dialog con Mapa */}
            <Dialog open={isMapDialogOpen} onOpenChange={setIsMapDialogOpen}>
                <DialogContent className="max-w-2xl" showCloseButton={false}>
                    <DialogHeader>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <MapPin className="h-5 w-5 text-primary" />
                                <DialogTitle>Ubicación de Entrega</DialogTitle>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsMapDialogOpen(false)}
                                className="h-6 w-6 p-0"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                        <DialogDescription>
                            Pedido #{orderNumber} - {customerAddress}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        {/* Información de dirección */}
                        <div className="p-4 bg-muted/30 rounded-lg">
                            <div className="flex items-start gap-3">
                                <MapPin className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
                                <div>
                                    <h4 className="font-medium text-sm mb-1">Dirección de entrega</h4>
                                    <p className="text-sm text-muted-foreground">{customerAddress}</p>
                                    <p className="text-xs text-muted-foreground mt-2">
                                        Haz clic en el marcador para más detalles o usa los controles para navegar
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Mapa */}
                        <div className="h-96 w-full">
                            <OrderLocationMap
                                address={customerAddress}
                                className="h-full"
                            />
                        </div>

                        {/* Acciones del mapa */}
                        <div className="flex items-center justify-between pt-4 border-t">
                            <div className="text-xs text-muted-foreground">
                                💡 Tip: Usa los controles del mapa para hacer zoom y explorar el área
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        const [lat, lng] = getCoordinatesFromAddress(customerAddress)
                                        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
                                        window.open(googleMapsUrl, '_blank')
                                        toast.success("Abriendo Google Maps...")
                                    }}
                                >
                                    <MapPin className="h-3 w-3 mr-1" />
                                    Abrir en Maps
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setIsMapDialogOpen(false)}
                                >
                                    Cerrar
                                </Button>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default OrderActions
