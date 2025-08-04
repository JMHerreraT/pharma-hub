"use client"

import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import z from 'zod'
import { ColumnDef } from '@tanstack/react-table'
import { DragHandle } from '@/components/atoms/DragHandle'
import { Checkbox } from '@/components/ui/checkbox'
import { MoreVerticalIcon, Eye, Download, Clock, User, ShoppingCart, Package, Settings, AlertTriangle, CheckCircle, Zap, Activity } from 'lucide-react'
import { toast } from 'sonner'
import { DraggableDataTable } from '@/components/organisms/DraggableDataTable'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export const activitySchema = z.object({
  id: z.number(),
  activityId: z.number(),
  type: z.string(),
  user: z.string(),
  action: z.string(),
  timestamp: z.string(),
  details: z.string(),
  status: z.string(),
})

interface ActivityDataTableProps {
  activities: z.infer<typeof activitySchema>[]
  enableRowsPerPage?: boolean
  enablePagination?: boolean
  defaultItemsToShow?: number
}

const ActivityDataTable = ({
  activities,
  enableRowsPerPage = true,
  enablePagination = true,
  defaultItemsToShow = 10
}: ActivityDataTableProps) => {

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "sale":
        return ShoppingCart
      case "inventory":
        return Package
      case "customer":
        return User
      case "settings":
        return Settings
      case "system":
        return Zap
      default:
        return Activity
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-green-600 dark:text-green-400"
      case "warning":
        return "text-yellow-600 dark:text-yellow-400"
      case "error":
        return "text-red-600 dark:text-red-400"
      default:
        return "text-blue-600 dark:text-blue-400"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return CheckCircle
      case "warning":
        return AlertTriangle
      case "error":
        return AlertTriangle
      default:
        return Activity
    }
  }

  const getTypeBadge = (type: string) => {
    const colors = {
      sale: "bg-green-100 text-green-700 border-green-200",
      inventory: "bg-blue-100 text-blue-700 border-blue-200",
      customer: "bg-purple-100 text-purple-700 border-purple-200",
      settings: "bg-gray-100 text-gray-700 border-gray-200",
      system: "bg-yellow-100 text-yellow-700 border-yellow-200"
    }

    return colors[type as keyof typeof colors] || colors.system
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
      return `Hace ${diffInMinutes} min`
    } else if (diffInHours < 24) {
      return `Hace ${diffInHours}h`
    } else {
      return date.toLocaleDateString()
    }
  }

  const columns: ColumnDef<z.infer<typeof activitySchema>>[] = [
    {
      id: "drag",
      header: () => null,
      cell: ({ row }) => <DragHandle id={row.original.id} />,
    },
    {
      id: "select",
      header: ({ table }) => (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "user",
      header: "Usuario",
      cell: ({ row }) => {
        const activity = row.original
        const ActivityIcon = getActivityIcon(activity.type)

        return (
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                  {activity.user.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 p-1 bg-white dark:bg-gray-950 rounded-full">
                <ActivityIcon className="h-3 w-3 text-gray-600 dark:text-gray-400" />
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-gray-900 dark:text-white">
                  {activity.user}
                </span>
                <Badge variant="outline" className={`text-xs ${getTypeBadge(activity.type)}`}>
                  {activity.type}
                </Badge>
              </div>
            </div>
          </div>
        )
      },
      enableHiding: false,
    },
    {
      accessorKey: "action",
      header: "Acción",
      cell: ({ row }) => (
        <div className="max-w-[300px]">
          <p className="font-medium text-gray-900 dark:text-white text-sm">
            {row.original.action}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
            {row.original.details}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "timestamp",
      header: () => <div className="text-center">Tiempo</div>,
      cell: ({ row }) => (
        <div className="text-center text-sm">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Clock className="h-3 w-3 text-gray-400" />
            <span>{formatTime(row.original.timestamp)}</span>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(row.original.timestamp).toLocaleTimeString()}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: () => <div className="text-center">Estado</div>,
      cell: ({ row }) => {
        const StatusIcon = getStatusIcon(row.original.status)
        const statusColor = getStatusColor(row.original.status)

        return (
          <div className="flex items-center justify-center">
            <StatusIcon className={`h-4 w-4 ${statusColor}`} />
          </div>
        )
      },
    },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => {
        const activity = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
                size="icon"
              >
                <MoreVerticalIcon />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem
                onClick={() => {
                  console.log('Ver detalles:', activity.action)
                  toast.info(`Detalles: ${activity.details}`)
                }}
              >
                <Eye className="mr-2 h-4 w-4" />
                Ver detalles
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  console.log('Exportar log:', activity.activityId)
                  toast.info(`Exportando actividad ${activity.activityId}`)
                }}
              >
                <Download className="mr-2 h-4 w-4" />
                Exportar log
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  console.log('Ver usuario:', activity.user)
                  toast.info(`Actividades de ${activity.user}`)
                }}
              >
                <User className="mr-2 h-4 w-4" />
                Ver usuario
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const handleDataChange = (newData: z.infer<typeof activitySchema>[]) => {
    console.log('Datos de actividad cambiados:', newData)
    toast.success('Orden de actividades actualizado exitosamente')
  }

  return (
    <div className="w-full h-full">
      <div className="overflow-x-auto">
        <DraggableDataTable
          data={activities}
          columns={columns}
          enableRowsPerPage={enableRowsPerPage}
          enablePagination={enablePagination}
          defaultItemsToShow={defaultItemsToShow}
          onDataChange={handleDataChange}
        />
      </div>
    </div>
  )
}

export default ActivityDataTable
