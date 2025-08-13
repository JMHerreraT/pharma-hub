"use client"

import React, { Suspense } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { PermissionManager, PERMISSIONS, mapCognitoRoleToRoleId } from '@/lib/roles'
import InviteUserPage from '@/components/pages/InviteUserPage'

function InviteContent() {
  const { user } = useAuth()
  const canInviteUsers = user && PermissionManager.hasPermission(mapCognitoRoleToRoleId(user?.role || ''), PERMISSIONS.USER_MANAGEMENT)

  const organization = user ? {
    id: user.organizationId,
    organizationName: 'Farmacia Demo Central',
    branches: [
      { id: 'branch-1', name: 'Sucursal Centro', businessId: 'farmacia-demo-centro', city: 'Lima' },
      { id: 'branch-2', name: 'Sucursal Norte', businessId: 'farmacia-demo-norte', city: 'Lima' }
    ]
  } : undefined

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Acceso Denegado</h1>
          <p className="text-muted-foreground">Debes estar autenticado para acceder a esta página</p>
        </div>
      </div>
    )
  }

  if (!canInviteUsers) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Acceso Denegado</h1>
          <p className="text-muted-foreground">No tienes permisos para invitar usuarios</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen h-screen w-full bg-gradient-to-br from-background via-secondary/5 to-primary/10 p-4">
      <div className="w-full h-full">
        <InviteUserPage organization={organization} />
      </div>
    </div>
  )
}

export default function InvitePageRoute() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </div>
    }>
      <InviteContent />
    </Suspense>
  )
}
