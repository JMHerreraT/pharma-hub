'use client';

import React, { createContext, useContext } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@/lib/query-client';
import { useAuth } from '@/hooks/use-auth';
import { User } from '@/types/auth';
// Importar configuración de Amplify INMEDIATAMENTE
import '@/lib/amplify-config';

// Context para estado de autenticación
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => void;
  refreshAuth: () => Promise<void>;
  isLoggingOut: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Hook para usar el contexto de auth
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return context;
}

// Componente interno que provee el contexto de auth
function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={{
      ...auth,
      user: auth.user ?? null, // Convertir undefined a null
    }}>
      {children}
    </AuthContext.Provider>
  );
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Authenticator.Provider>
        <AuthContextProvider>
          {children}
          {process.env.NODE_ENV === 'development' && (
            <ReactQueryDevtools initialIsOpen={false} />
          )}
        </AuthContextProvider>
      </Authenticator.Provider>
    </QueryClientProvider>
  );
}
