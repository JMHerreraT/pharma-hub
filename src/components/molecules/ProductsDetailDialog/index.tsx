"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Package, Eye, X } from "lucide-react"

interface ProductsDetailDialogProps {
    orderNumber: string
    productsString: string
    totalItems: number
}

interface ParsedProduct {
    name: string
    quantity: number
}

const ProductsDetailDialog = ({
    orderNumber,
    productsString,
    totalItems
}: ProductsDetailDialogProps) => {
    const [isOpen, setIsOpen] = useState(false)

    // Parsear la string de productos para extraer nombre y cantidad
    const parseProducts = (productsStr: string): ParsedProduct[] => {
        try {
            // Ejemplo: "Paracetamol 500mg (2), Ibuprofeno 400mg (1)"
            const productParts = productsStr.split(', ')

            return productParts.map(part => {
                // Buscar el patrón: "Nombre del producto (cantidad)"
                const match = part.match(/^(.+)\s\((\d+)\)$/)
                if (match) {
                    return {
                        name: match[1].trim(),
                        quantity: parseInt(match[2])
                    }
                }
                // Fallback si no encuentra el patrón
                return {
                    name: part.trim(),
                    quantity: 1
                }
            })
        } catch (error) {
            console.error("Error parsing products:", error)
            return [{ name: productsStr, quantity: totalItems }]
        }
    }

    const products = parseProducts(productsString)

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen} >
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="h-8 px-3 text-xs"
                >
                    <Eye className="h-3 w-3 mr-1" />
                    Ver detalle
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md" showCloseButton={false}>
                <DialogHeader>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Package className="h-5 w-5 text-primary" />
                            <DialogTitle>Productos del Pedido</DialogTitle>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsOpen(false)}
                            className="h-6 w-6 p-0"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                    <DialogDescription>
                        Pedido #{orderNumber} - {totalItems} artículo{totalItems !== 1 ? 's' : ''}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-3 py-4">
                    {products.map((product, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border"
                        >
                            <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-sm leading-tight">
                                    {product.name}
                                </h4>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Producto farmacéutico
                                </p>
                            </div>
                            <div className="flex items-center gap-2 ml-3">
                                <Badge variant="secondary" className="text-xs">
                                    x{product.quantity}
                                </Badge>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Resumen */}
                <div className="border-t pt-4">
                    <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">Total de productos:</span>
                        <Badge variant="default">
                            {products.length} tipo{products.length !== 1 ? 's' : ''} diferentes
                        </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-2">
                        <span className="font-medium">Total de artículos:</span>
                        <Badge variant="outline">
                            {totalItems} unidad{totalItems !== 1 ? 'es' : ''}
                        </Badge>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ProductsDetailDialog
