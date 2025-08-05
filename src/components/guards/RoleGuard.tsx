'use client';

import React from 'react';
import { usePermissions } from './AuthGuard';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield } from 'lucide-react';

interface RoleGuardProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'pharmacist' | 'assistant';
  requiredRoles?: ('admin' | 'pharmacist' | 'assistant')[];
  fallback?: React.ReactNode;
  showFallback?: boolean;
}

export default function RoleGuard({
  children,
  requiredRole,
  requiredRoles,
  fallback,
  showFallback = true,
}: RoleGuardProps) {
  const { user, isAuthenticated, hasRole, hasAnyRole } = usePermissions();

  // Si no está autenticado, no mostrar nada
  if (!isAuthenticated || !user) {
    return null;
  }

  // Verificar rol específico
  if (requiredRole && !hasRole(requiredRole)) {
    return showFallback ? (
      fallback || (
        <Alert className="border-amber-200 bg-amber-50">
          <Shield className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            No tienes permisos para acceder a esta funcionalidad.
            <br />
            <span className="text-sm">Rol requerido: {requiredRole}</span>
          </AlertDescription>
        </Alert>
      )
    ) : null;
  }

  // Verificar múltiples roles
  if (requiredRoles && !hasAnyRole(requiredRoles)) {
    return showFallback ? (
      fallback || (
        <Alert className="border-amber-200 bg-amber-50">
          <Shield className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            No tienes permisos para acceder a esta funcionalidad.
            <br />
            <span className="text-sm">Roles requeridos: {requiredRoles.join(', ')}</span>
          </AlertDescription>
        </Alert>
      )
    ) : null;
  }

  return <>{children}</>;
}

// Componentes específicos para roles
export function AdminOnly({ children, ...props }: Omit<RoleGuardProps, 'requiredRole'>) {
  return (
    <RoleGuard requiredRole="admin" {...props}>
      {children}
    </RoleGuard>
  );
}

export function PharmacistOrAdmin({ children, ...props }: Omit<RoleGuardProps, 'requiredRoles'>) {
  return (
    <RoleGuard requiredRoles={['admin', 'pharmacist']} {...props}>
      {children}
    </RoleGuard>
  );
}

export function AnyRole({ children, ...props }: Omit<RoleGuardProps, 'requiredRoles'>) {
  return (
    <RoleGuard requiredRoles={['admin', 'pharmacist', 'assistant']} {...props}>
      {children}
    </RoleGuard>
  );
}
