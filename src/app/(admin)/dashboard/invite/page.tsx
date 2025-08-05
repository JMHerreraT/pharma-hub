'use client'

import React from 'react'
import InviteUserForm from '@/components/organisms/InviteUserForm'
import { useAuth } from '@/hooks/use-auth'
import { PermissionManager, PERMISSIONS, mapCognitoRoleToRoleId } from '@/lib/roles'

export default function InvitePage() {
  const { user } = useAuth()

  // Verificar permisos usando el mapeo correcto de Cognito
  const canInviteUsers = user && PermissionManager.hasPermission(mapCognitoRoleToRoleId(user?.role || ''), PERMISSIONS.USER_MANAGEMENT)

  // Mock organization data - en producción vendría del contexto o API
  const organization = user ? {
    id: user.organizationId,
    organizationName: 'Farmacia Demo Central', // Esto debería venir del contexto
    branches: [
      {
        id: 'branch-1',
        name: 'Sucursal Centro',
        businessId: 'farmacia-demo-centro',
        city: 'Lima'
      },
      {
        id: 'branch-2',
        name: 'Sucursal Norte',
        businessId: 'farmacia-demo-norte',
        city: 'Lima'
      }
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
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-primary/10 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Invitar Usuario</h1>
          <p className="text-muted-foreground">
            Invita nuevos usuarios a tu organización
          </p>
        </div>

        <InviteUserForm organization={organization} />
      </div>
    </div>
  )
}
