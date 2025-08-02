import { ShoppingCart } from "lucide-react"

const OrdersPageTitle = () => {
    return (
        <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
                <ShoppingCart className="h-6 w-6 text-primary" />
            </div>
            <div>
                <h1 className="text-2xl lg:text-3xl font-bold">Mis Pedidos</h1>
                <p className="text-muted-foreground">
                    Gestiona y supervisa todos los pedidos de la farmacia
                </p>
            </div>
        </div>
    )
}

export default OrdersPageTitle
