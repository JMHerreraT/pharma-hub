import { OrderByFilter, WhereFilter } from "./filter";

export interface Product {
  id: string;
  name: string;
  description: string;
  category: 'medication' | 'supplies' | 'equipment' | 'other';
  sku: string;
  price: number;
  stock: number;
  minStock: number;
  maxStock: number;
  supplier?: string;
  createdAt: string;
  updatedAt: string;
  organizationId: string;
  branchId: string;
  expirationDate?: string;
  requiresPrescription?: boolean;
  compounds?: string[];
  type?: string;
}

export interface ProductsQueryRequest {
  where?: WhereFilter[];
  orderBy?: OrderByFilter[];
  limit?: number;
  offset?: number;
  page?: number;
  lastKey?: string;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  itemsPerPage: number;
}

export interface ProductsResponse {
  products: Product[];
  pagination: PaginationInfo;
}
