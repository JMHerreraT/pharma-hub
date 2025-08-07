import apiClient from '@/lib/api-client';
import { Product, ProductsQueryRequest, ProductsResponse } from '@/types/product';

export const productsApi = {
  /**
   * Get products with pagination and filtering
   */
  getProducts: async (queryRequest: ProductsQueryRequest = {}): Promise<ProductsResponse> => {
    const response = await apiClient.post('/products/list', queryRequest);
    return response.data.data; // Extract the inner data object
  },

  /**
   * Get a single product by ID
   *
   */
  getProduct: async (id: string) => {
    const response = await apiClient.get(`/products/${id}`);
    return response.data.data; // Extract the inner data object
  },

  /**
   * Create a new product
   */
  createProduct: async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const response = await apiClient.post('/products/create', product);
    return response.data.data; // Extract the inner data object
  },

  /**
   * Update an existing product
   */
  updateProduct: async (id: string, product: Partial<Product>) => {
    const response = await apiClient.put(`/products/${id}`, product);
    return response.data.data; // Extract the inner data object
  },

  /**
   * Delete a product
   */
  deleteProduct: async (id: string) => {
    const response = await apiClient.delete(`/products/${id}`);
    return response.data.data; // Extract the inner data object
  },
};
