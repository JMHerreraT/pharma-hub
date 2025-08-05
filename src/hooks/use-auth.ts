'use client';

import { useEffect, useState } from 'react';
import { fetchAuthSession, getCurrentUser, signOut } from 'aws-amplify/auth';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-client';
import { User } from '@/types/auth';
import apiClient from '@/lib/api-client';
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

        // Extraer claims del token
        const claims = session.tokens.accessToken.payload;

        // Obtener datos adicionales del backend si es necesario
        try {
          const { data: backendData } = await apiClient.get('/auth/me');
          if (backendData.success) {
            return backendData.data.user;
          }
        } catch (backendError) {
          console.warn('Backend user data fetch failed, using token claims:', backendError);
        }

        // Fallback a claims del token
        return {
          id: claims.sub as string,
          email: claims.email as string,
          name: claims.name as string,
          role: claims['custom:role'] as 'admin' | 'pharmacist' | 'assistant',
          organizationId: claims['custom:organizationId'] as string,
          businessId: claims['custom:businessId'] as string,
          branchId: claims['custom:branchId'] as string,
          isActive: true,
          phone: claims.phone_number as string,
        };
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
        window.location.href = '/login';
      }, 100);
    },
    onError: (error) => {
      console.error('Logout error:', error);
      toast.error('Error al cerrar sesión');

      // Force redirect even on error
      setTimeout(() => {
        window.location.href = '/login';
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
