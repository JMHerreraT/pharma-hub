'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { UserRole } from '@/types/auth';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requiredRole?: UserRole;
  fallback?: React.ReactNode;
  redirectTo?: string;
}

export default function AuthGuard({
  children,
  requireAuth = true,
  requiredRole,
  fallback,
  redirectTo,
}: AuthGuardProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      // Si requiere autenticación pero no está autenticado, redirigir a login
      if (requireAuth && !isAuthenticated) {
        const redirect = redirectTo || '/auth/login';
        router.push(redirect);
        return;
      }

      // Si requiere rol específico pero no lo tiene, redirigir a dashboard
      if (requireAuth && isAuthenticated && requiredRole && user?.role !== requiredRole) {
        const redirect = redirectTo || '/dashboard';
        router.push(redirect);
        return;
      }

      // Si no requiere autenticación pero está autenticado, redirigir a dashboard
      if (!requireAuth && isAuthenticated) {
        const redirect = redirectTo || '/dashboard';
        router.push(redirect);
        return;
      }
    }
  }, [user, isAuthenticated, isLoading, requireAuth, requiredRole, redirectTo, router]);

  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  // Si requiere autenticación pero no está autenticado, no mostrar nada (se redirige)
  if (requireAuth && !isAuthenticated) {
    return null;
  }

  // Si requiere rol específico pero no lo tiene, no mostrar nada (se redirige)
  if (requireAuth && isAuthenticated && requiredRole && user?.role !== requiredRole) {
    return null;
  }

  // Si no requiere autenticación pero está autenticado, no mostrar nada (se redirige)
  if (!requireAuth && isAuthenticated) {
    return null;
  }

  // Mostrar contenido si pasa todas las validaciones
  return <>{children}</>;
}

// Componente específico para páginas que requieren autenticación
export function ProtectedRoute({ children, ...props }: Omit<AuthGuardProps, 'requireAuth'>) {
  return (
    <AuthGuard requireAuth={true} {...props}>
      {children}
    </AuthGuard>
  );
}

// Componente específico para páginas públicas (login, register, etc.)
export function PublicRoute({ children, ...props }: Omit<AuthGuardProps, 'requireAuth'>) {
  return (
    <AuthGuard requireAuth={false} {...props}>
      {children}
    </AuthGuard>
  );
}

// Componente para roles específicos
export function AdminRoute({ children, ...props }: Omit<AuthGuardProps, 'requireAuth' | 'requiredRole'>) {
  return (
    <AuthGuard requireAuth={true} requiredRole="admin" {...props}>
      {children}
    </AuthGuard>
  );
}

// Hook para verificar permisos
export function usePermissions() {
  const { user, isAuthenticated } = useAuth();

  const hasRole = (role: UserRole) => {
    return isAuthenticated && user?.role === role;
  };

  const hasAnyRole = (roles: UserRole[]) => {
    return isAuthenticated && user?.role && roles.includes(user.role);
  };

  const isAdmin = () => hasRole('admin');
  const isSuperAdmin = () => hasRole('super_admin');
  const isSystemAdmin = () => hasRole('system_admin');
  const isPharmacist = () => hasRole('pharmacist');
  const isAssistant = () => hasRole('assistant');
  const isCustomerManager = () => hasRole('customer_manager');
  const isSalesOperator = () => hasRole('sales_operator');
  const isBasicUser = () => hasRole('basic_user');

  const canManageUsers = () => hasAnyRole(['super_admin', 'admin', 'system_admin']);
  const canViewReports = () => hasAnyRole(['super_admin', 'admin', 'system_admin', 'pharmacist', 'customer_manager']);
  const canMakeSales = () => hasAnyRole(['super_admin', 'admin', 'sales_operator', 'pharmacist', 'assistant']);

  return {
    user,
    isAuthenticated,
    hasRole,
    hasAnyRole,
    isAdmin,
    isSuperAdmin,
    isSystemAdmin,
    isPharmacist,
    isAssistant,
    isCustomerManager,
    isSalesOperator,
    isBasicUser,
    canManageUsers,
    canViewReports,
    canMakeSales,
  };
}
