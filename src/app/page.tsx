'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        // Si está autenticado, redirigir al dashboard
        router.push('/dashboard');
      } else {
        // Si no está autenticado, redirigir al login
        router.push('/login');
      }
    }
  }, [isAuthenticated, isLoading, router]);

  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/5 to-primary/10">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <h1 className="text-2xl font-bold text-foreground">PharmaHub</h1>
          <p className="text-muted-foreground">Iniciando aplicación...</p>
        </div>
      </div>
    );
  }

  // No mostrar nada mientras se redirige
  return null;
}
