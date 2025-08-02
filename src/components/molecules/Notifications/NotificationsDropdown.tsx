import { PopoverContent, PopoverTrigger, Popover } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Bell } from 'lucide-react'

const NotificationsDropdown = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="relative h-9 w-9 rounded-lg">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4 mr-4" align="end">
        <div className="space-y-3">
          <h3 className="font-semibold text-sm text-foreground">Notificaciones</h3>
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground p-2 bg-muted rounded-md">
              <p className="font-medium">Nuevo pedido recibido</p>
              <p className="text-xs">Hace 2 minutos</p>
            </div>
            <div className="text-sm text-muted-foreground p-2 bg-muted rounded-md">
              <p className="font-medium">Stock bajo en medicamento XYZ</p>
              <p className="text-xs">Hace 15 minutos</p>
            </div>
            <div className="text-sm text-muted-foreground p-2 bg-muted rounded-md">
              <p className="font-medium">Reporte semanal disponible</p>
              <p className="text-xs">Hace 1 hora</p>
            </div>
          </div>
          <Button variant="outline" className="w-full text-xs" size="sm">
            Ver todas las notificaciones
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default NotificationsDropdown
