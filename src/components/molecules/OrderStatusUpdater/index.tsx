"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RefreshCw, Save, MessageSquare } from "lucide-react"
import OrderStatusBadge from "@/components/molecules/OrderStatusBadge"
import { toast } from "sonner"

interface OrderStatusUpdaterProps {
    currentStatus: string
    orderNumber: string
    onStatusUpdate?: (newStatus: string, note: string) => void
}

const orderStatuses = [
    { value: "pendiente", label: "Pendiente" },
    { value: "confirmado", label: "Confirmado" },
    { value: "preparando", label: "Preparando" },
    { value: "enviando", label: "Enviando" },
    { value: "entregado", label: "Entregado" },
    { value: "cancelado", label: "Cancelado" },
]

const OrderStatusUpdater = ({
    currentStatus,
    orderNumber,
    onStatusUpdate
}: OrderStatusUpdaterProps) => {
    const [selectedStatus, setSelectedStatus] = useState(currentStatus)
    const [note, setNote] = useState("")
    const [isUpdating, setIsUpdating] = useState(false)

    const handleStatusUpdate = async () => {
        if (selectedStatus === currentStatus && !note.trim()) {
            toast.info("No hay cambios para guardar")
            return
        }

        setIsUpdating(true)

        try {
            // Simular llamada a API
            await new Promise(resolve => setTimeout(resolve, 1000))

            onStatusUpdate?.(selectedStatus, note)

            toast.success(
                `Estado del pedido ${orderNumber} actualizado a: ${
                    orderStatuses.find(s => s.value === selectedStatus)?.label
                }`
            )

            setNote("")
        } catch (error) {
            console.error("Error updating order status:", error)
            toast.error("Error al actualizar el estado del pedido")
        } finally {
            setIsUpdating(false)
        }
    }

    const hasChanges = selectedStatus !== currentStatus || note.trim().length > 0

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <RefreshCw className="h-5 w-5 text-primary" />
                        Actualizar Estado
                    </CardTitle>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Estado actual:</span>
                        <OrderStatusBadge status={currentStatus} />
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Selector de nuevo estado */}
                <div className="space-y-2">
                    <Label htmlFor="status-select">Nuevo Estado</Label>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                        <SelectTrigger id="status-select">
                            <SelectValue placeholder="Seleccionar estado" />
                        </SelectTrigger>
                        <SelectContent>
                            {orderStatuses.map((status) => (
                                <SelectItem key={status.value} value={status.value}>
                                    <div className="flex items-center gap-2">
                                        <OrderStatusBadge status={status.value} className="scale-75" />
                                        {status.label}
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Nota adicional */}
                <div className="space-y-2">
                    <Label htmlFor="note">
                        <MessageSquare className="h-4 w-4 inline mr-1" />
                        Nota adicional (opcional)
                    </Label>
                    <Input
                        id="note"
                        placeholder="Agregar comentarios sobre el cambio de estado..."
                        value={note}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNote(e.target.value)}
                    />
                </div>

                {/* Vista previa del cambio */}
                {hasChanges && (
                    <div className="p-3 bg-muted/50 rounded-lg border">
                        <h4 className="text-sm font-medium mb-2">Vista previa del cambio:</h4>
                        <div className="flex items-center gap-2 text-sm">
                            <OrderStatusBadge status={currentStatus} />
                            <span className="text-muted-foreground">→</span>
                            <OrderStatusBadge status={selectedStatus} />
                        </div>
                        {note.trim() && (
                            <p className="text-sm text-muted-foreground mt-2">
                                <strong>Nota:</strong> {note}
                            </p>
                        )}
                    </div>
                )}

                {/* Botones de acción */}
                <div className="flex gap-2 pt-2">
                    <Button
                        onClick={handleStatusUpdate}
                        disabled={!hasChanges || isUpdating}
                        className="flex-1"
                    >
                        <Save className="h-4 w-4 mr-2" />
                        {isUpdating ? "Actualizando..." : "Guardar Cambios"}
                    </Button>

                    {hasChanges && (
                        <Button
                            variant="outline"
                            onClick={() => {
                                setSelectedStatus(currentStatus)
                                setNote("")
                            }}
                            disabled={isUpdating}
                        >
                            Cancelar
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

export default OrderStatusUpdater
