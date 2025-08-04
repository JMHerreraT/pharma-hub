"use client"

import React, { Suspense } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, AlertTriangle } from 'lucide-react'
import DataTableSkeleton from '@/components/atoms/DataTableSkeleton'

// Lazy load FeatureFlagsDataTable
const LazyFeatureFlagsDataTable = React.lazy(() => import('@/components/organisms/LazyFeatureFlagsDataTable'))

const FeatureFlagsPage = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Feature Flags
          </h1>
          <div className="flex items-center gap-2 mt-2 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Importante:</strong> Habilitar un feature flag de manera global puede ocasionar cambios para todos los usuarios.
              Procede con precaución al activar funcionalidades en producción.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Feature Flag
        </Button>
      </div>

      {/* Content */}
      <Card>
        <CardHeader>
          <CardTitle>Gestión de Feature Flags</CardTitle>
          <CardDescription>
            Administra las funcionalidades que están disponibles en el sistema.
            Los feature flags locales afectan solo a tu sesión, mientras que los globales afectan a todos los usuarios.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto px-4">
            <Suspense fallback={<DataTableSkeleton rows={8} columns={6} showHeader={false} />}>
              <LazyFeatureFlagsDataTable />
            </Suspense>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default FeatureFlagsPage
