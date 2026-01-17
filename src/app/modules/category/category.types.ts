// src/modules/category/category.types.ts

export interface CreateCategoryInput {
  name: string;
  slug?: string;
  description?: string;
  parentId?: string;
  isActive?: boolean;
}

export interface UpdateCategoryInput {
  name?: string;
  slug?: string;
  description?: string;
  parentId?: string;
  isActive?: boolean;
}

export interface CategoryFilters {
  search?: string;
  isActive?: boolean;
  parentId?: string;
  page?: number;
  limit?: number;
}