import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productsApi } from '@/lib/api-services/products';
import { ProductsQueryRequest, Product, ProductsResponse } from '@/types/product';
import { queryKeys } from '@/lib/query-client';
import toast from 'react-hot-toast';

export function useProducts(queryRequest: ProductsQueryRequest = {}) {
  return useQuery<ProductsResponse>({
    queryKey: queryKeys.productsList(queryRequest),
    queryFn: () => productsApi.getProducts(queryRequest), // POST
    enabled: true,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

export function useProduct(id: string) {
  return useQuery<Product>({
    queryKey: queryKeys.product(id),
    queryFn: () => productsApi.getProduct(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) =>
      productsApi.createProduct(product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.productsList() });
      toast.success('Producto creado exitosamente');
    },
    onError: (error: Error) => {
      toast.error((error as { userMessage?: string }).userMessage || 'Error al crear el producto');
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, product }: { id: string; product: Partial<Product> }) =>
      productsApi.updateProduct(id, product),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.productsList() });
      queryClient.invalidateQueries({ queryKey: queryKeys.product(id) });
      toast.success('Producto actualizado exitosamente');
    },
    onError: (error: Error) => {
      toast.error((error as { userMessage?: string }).userMessage || 'Error al actualizar el producto');
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => productsApi.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.productsList() });
      toast.success('Producto eliminado exitosamente');
    },
    onError: (error: Error) => {
      toast.error((error as { userMessage?: string }).userMessage || 'Error al eliminar el producto');
    },
  });
}
