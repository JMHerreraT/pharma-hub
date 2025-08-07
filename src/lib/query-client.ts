import { ProductsQueryRequest } from '@/types/product';
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutos
      gcTime: 10 * 60 * 1000, // 10 minutos (antes cacheTime)
      retry: false,
      // retry: (failureCount, error: unknown) => {
      //   // No retry en errores de auth
      //   const err = error as { status?: number };
      //   if (err?.status === 401 || err?.status === 403) {
      //     return false;
      //   }
      //   return failureCount < 3;
      // },
      refetchOnWindowFocus: false,

    },
    mutations: {
      retry: 1,
      onError: (error: unknown) => {
        console.error('Mutation error:', error);
      },
    },
  },
});

// Query Keys Factory
export const queryKeys = {
  // Auth
  auth: ['auth'] as const,
  user: () => [...queryKeys.auth, 'user'] as const,

  // Products
  products: ['products'] as const,
  productsList: (filters?: ProductsQueryRequest) =>
    [...queryKeys.products, 'list', filters] as const,
  product: (id: string) => [...queryKeys.products, 'detail', id] as const,

  // Sales
  sales: ['sales'] as const,
  salesList: (filters?: Record<string, unknown>) =>
    [...queryKeys.sales, 'list', filters] as const,
  sale: (id: string) => [...queryKeys.sales, 'detail', id] as const,
  salesReports: (filters: Record<string, unknown>) =>
    [...queryKeys.sales, 'reports', filters] as const,

  // Medications
  medications: ['medications'] as const,
  medicationsList: (filters?: Record<string, unknown>) =>
    [...queryKeys.medications, 'list', filters] as const,
  compounds: () => [...queryKeys.medications, 'compounds'] as const,
  expiring: (filters: Record<string, unknown>) =>
    [...queryKeys.medications, 'expiring', filters] as const,

  // Customers
  customers: ['customers'] as const,
  customersList: (filters?: Record<string, unknown>) =>
    [...queryKeys.customers, 'list', filters] as const,
  customer: (id: string) => [...queryKeys.customers, 'detail', id] as const,

  // Orders
  orders: ['orders'] as const,
  ordersList: (filters?: Record<string, unknown>) =>
    [...queryKeys.orders, 'list', filters] as const,
  order: (id: string) => [...queryKeys.orders, 'detail', id] as const,
} as const;
