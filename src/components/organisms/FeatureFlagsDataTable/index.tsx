"use client"

import React, { useState, useMemo, useCallback } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { DraggableDataTable } from '@/components/organisms/DraggableDataTable'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Edit, MoreHorizontal, Calendar } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import FeatureFlagEditDialog from '@/components/molecules/FeatureFlagEditDialog'

// Feature flag data type
type FeatureFlagData = {
  id: number
  name: string
  description: string
  updatedBy: string
  updatedByEmail: string
  updatedAt: string
  isEnabled: boolean
  scope: 'local' | 'global'
  key: string
}

// Mock data for feature flags
const mockFeatureFlags: FeatureFlagData[] = [
  {
    id: 1,
    name: "Nuevo Dashboard",
    description: "Habilita la nueva interfaz del dashboard con métricas mejoradas",
    updatedBy: "Jorge Herrera",
    updatedByEmail: "jorge@pharmacy.com",
    updatedAt: "15/01/2024 14:30",
    isEnabled: true,
    scope: "global",
    key: "new_dashboard_ui",
  },
  {
    id: 2,
    name: "Chat AI Mejorado",
    description: "Activa las nuevas funcionalidades del asistente de IA con mejor contexto",
    updatedBy: "Ana García",
    updatedByEmail: "ana@pharmacy.com",
    updatedAt: "14/01/2024 09:15",
    isEnabled: false,
    scope: "local",
    key: "enhanced_ai_chat",
  },
  {
    id: 3,
    name: "Reportes Avanzados",
    description: "Permite acceso a reportes con filtros avanzados y exportación mejorada",
    updatedBy: "Carlos López",
    updatedByEmail: "carlos@pharmacy.com",
    updatedAt: "13/01/2024 16:45",
    isEnabled: true,
    scope: "global",
    key: "advanced_reports",
  },
  {
    id: 4,
    name: "Notificaciones Push",
    description: "Habilita notificaciones push para eventos importantes del sistema",
    updatedBy: "María Fernández",
    updatedByEmail: "maria@pharmacy.com",
    updatedAt: "12/01/2024 11:20",
    isEnabled: false,
    scope: "local",
    key: "push_notifications",
  },
  {
    id: 5,
    name: "Modo Oscuro Auto",
    description: "Activa el cambio automático entre modo claro y oscuro según la hora",
    updatedBy: "Jorge Herrera",
    updatedByEmail: "jorge@pharmacy.com",
    updatedAt: "11/01/2024 13:50",
    isEnabled: true,
    scope: "local",
    key: "auto_dark_mode",
  },
]

// Helper function to get scope badge color
const getScopeBadge = (scope: 'local' | 'global') => {
  const variants = {
    local: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    global: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  }

  return (
    <Badge variant="secondary" className={variants[scope]}>
      {scope === 'local' ? 'Local' : 'Global'}
    </Badge>
  )
}

// Helper function to get initials from name
const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

interface FeatureFlagsDataTableProps {
  enableRowsPerPage?: boolean
  enablePagination?: boolean
  defaultItemsToShow?: number
}

const FeatureFlagsDataTable: React.FC<FeatureFlagsDataTableProps> = ({
  enableRowsPerPage = true,
  enablePagination = true,
  defaultItemsToShow = 10,
}) => {
  const [data, setData] = useState<FeatureFlagData[]>(mockFeatureFlags)
  const [editingFeatureFlag, setEditingFeatureFlag] = useState<FeatureFlagData | null>(null)
  const [forceRender, setForceRender] = useState(0)

  // Handle data changes from table operations (drag & drop, etc)
  const handleDataChange = useCallback((newData: FeatureFlagData[]) => {
    console.log('Table data change:', newData)
    setData(newData)
  }, [])

            // Handle toggle switch
  const handleToggle = useCallback((id: number, newValue: boolean) => {
    console.log('🔄 Toggle:', id, '→', newValue)

    setData(prevData => {
      return prevData.map(item => {
        if (item.id === id) {
          const updatedItem = {
            ...item,
            isEnabled: newValue,
            scope: item.scope === 'global' ? ('local' as const) : item.scope,
            updatedAt: new Date().toLocaleString('es-ES', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            }).replace(',', '')
          }

          // Guardar en localStorage
          const localFlags = JSON.parse(localStorage.getItem('featureFlags') || '{}')
          localFlags[updatedItem.key] = newValue
          localStorage.setItem('featureFlags', JSON.stringify(localFlags))

          console.log('✅ Updated:', updatedItem.name, '→', newValue)
          return updatedItem
        }
        return item
      })
    })

    // Forzar re-render de la tabla
    setForceRender(prev => prev + 1)
  }, [])

  const columns: ColumnDef<FeatureFlagData>[] = useMemo(() => [
    {
      id: 'drag',
      header: '',
      cell: () => null,
      size: 40,
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: 'select',
      header: () => null,
      cell: () => null,
      size: 40,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'name',
      header: 'Título',
      cell: ({ row }) => (
        <div className="flex flex-col gap-1">
          <span className="font-medium text-gray-900 dark:text-white">
            {row.original.name}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {row.original.description}
          </span>
        </div>
      ),
      size: 300,
    },
    {
      accessorKey: 'updatedBy',
      header: 'Actualizado por',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="" alt={row.original.updatedBy} />
            <AvatarFallback className="text-xs">
              {getInitials(row.original.updatedBy)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {row.original.updatedBy}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {row.original.updatedByEmail}
            </span>
          </div>
        </div>
      ),
      size: 200,
    },
    {
      accessorKey: 'updatedAt',
      header: 'Fecha de actualización',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {row.original.updatedAt}
          </span>
        </div>
      ),
      size: 180,
    },
    {
      accessorKey: 'isEnabled',
      header: 'Estado',
      cell: ({ row }) => {
        const isChecked = row.original.isEnabled
        console.log('🔘 Switch render:', row.original.name, '→', isChecked)

        return (
          <div className="flex items-center justify-center">
            <Switch
              checked={isChecked}
              onCheckedChange={(checked) => {
                console.log('🎯 Switch clicked:', row.original.name, checked)
                handleToggle(row.original.id, checked)
              }}
              className="data-[state=checked]:bg-green-600"
            />
          </div>
        )
      },
      size: 100,
    },
    {
      id: 'scope',
      header: 'Ámbito',
      cell: ({ row }) => getScopeBadge(row.original.scope),
      size: 100,
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menú</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setEditingFeatureFlag(row.original)}>
              <Edit className="mr-2 h-4 w-4" />
              Editar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      size: 60,
      enableSorting: false,
      enableHiding: false,
    },
  ], [data])

  return (
    <>
      <DraggableDataTable
        key={`feature-flags-table-${forceRender}`}
        columns={columns}
        data={data}
        onDataChange={handleDataChange}
        enableRowsPerPage={enableRowsPerPage}
        enablePagination={enablePagination}
        defaultItemsToShow={defaultItemsToShow}
      />

      {editingFeatureFlag && (
        <FeatureFlagEditDialog
          featureFlag={editingFeatureFlag}
          open={!!editingFeatureFlag}
          onOpenChange={(open) => !open && setEditingFeatureFlag(null)}
          onSave={(updatedFlag) => {
            setData(prev => prev.map(item =>
              item.id === updatedFlag.id ? updatedFlag : item
            ))
            setEditingFeatureFlag(null)
          }}
        />
      )}
    </>
  )
}

export default FeatureFlagsDataTable
