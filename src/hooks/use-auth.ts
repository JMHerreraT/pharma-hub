'use client';

import { useEffect, useState } from 'react';
import { fetchAuthSession, getCurrentUser, signOut } from 'aws-amplify/auth';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-client';
import { User, UserRole } from '@/types/auth';
import toast from 'react-hot-toast';

export function useAuth() {
  const [isInitialized, setIsInitialized] = useState(false);
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: queryKeys.user(),
    queryFn: async (): Promise<User | null> => {
      try {
        const [, session] = await Promise.all([
          getCurrentUser(),
          fetchAuthSession()
        ]);

        if (!session.tokens?.accessToken) {
          return null;
        }

        // Extract user info from token claims
        const claims = session.tokens.accessToken.payload;

        // Create user object from token claims
        const user: User = {
          id: claims.sub as string,
          email: claims.email as string,
          name: claims.name as string || claims['cognito:username'] as string,
          role: claims['custom:role'] as UserRole || 'basic_user',
          organizationId: claims['custom:organizationId'] as string || '',
          businessId: claims['custom:businessId'] as string || '',
          branchId: claims['custom:branchId'] as string || '',
          isActive: true,
          phone: claims.phone_number as string || '',
        };

        return user;
      } catch (error) {
        console.warn('Auth check failed:', error);
        return null;
      }
    },
    enabled: isInitialized,
    retry: (failureCount, error: unknown) => {
      // No retry en errores de auth
      const err = error as { status?: number };
      if (err?.status === 401 || err?.status === 403) {
        return false;
      }
      return failureCount < 2;
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
  });

  // Mutation para logout con invalidación de cache
  const logoutMutation = useMutation({
    mutationFn: async () => {
      await signOut({ global: true });
    },
    onSuccess: () => {
      // Limpiar todo el cache de React Query
      queryClient.clear();
      toast.success('Sesión cerrada exitosamente');

      // Redireccionar después de limpiar cache
      setTimeout(() => {
        window.location.href = '/auth/login';
      }, 100);
    },
    onError: (error) => {
      console.error('Logout error:', error);
      toast.error('Error al cerrar sesión');

      // Force redirect even on error
      setTimeout(() => {
        window.location.href = '/auth/login';
      }, 1000);
    },
  });

  // Inicializar después del primer render
  useEffect(() => {
    setIsInitialized(true);
  }, []);

  // Listener para cambios de autenticación
  useEffect(() => {
    if (isInitialized) {
      const handleStorageChange = (event: StorageEvent) => {
        if (event.key?.includes('amplify') || event.key?.includes('auth')) {
          refetch();
        }
      };

      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
    }
  }, [isInitialized, refetch]);

  const logout = () => {
    logoutMutation.mutate();
  };

  const refreshAuth = async () => {
    await refetch();
  };

  return {
    user,
    isAuthenticated: !!user,
    isLoading: isLoading || !isInitialized || logoutMutation.isPending,
    error,
    logout,
    refreshAuth,
    isLoggingOut: logoutMutation.isPending,
  };
}
