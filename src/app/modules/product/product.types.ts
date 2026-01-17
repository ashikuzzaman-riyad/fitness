// src/modules/product/product.types.ts

export interface CreateProductInput {
  url: string;
  name: string;
  title: string;
  slug?: string;
  description?: string;
  price: number;
  comparePrice?: number;
  stock: number;
  sku?: string;
  brandId?: string;
  categoryId?: string;
  images?: string[];
  isActive?: boolean;
}

export interface UpdateProductInput {
  title?: string;
  slug?: string;
  description?: string;
  price?: number;
  comparePrice?: number;
  stock?: number;
  sku?: string;
  brandId?: string;
  categoryId?: string;
  images?: string[];
  isActive?: boolean;
}

export interface ProductFilters {
  search?: string;
  brandId?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  isActive?: boolean;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}


