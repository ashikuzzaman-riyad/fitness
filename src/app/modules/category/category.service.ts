// src/modules/category/category.service.ts

import { prisma } from '../../shared/prisma';
import { CreateCategoryInput, UpdateCategoryInput, CategoryFilters } from './category.types';

const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// CREATE
export const createCategory = async (data: CreateCategoryInput) => {
  const slug = data.slug || generateSlug(data.name);
  
  return await prisma.category.create({
    data: {
      ...data,
      slug,
    },
  });
};

// GET ALL
export const getAllCategories = async (filters: CategoryFilters) => {
  const { search, isActive, parentId, page = 1, limit = 10 } = filters;
  const skip = (page - 1) * limit;

  const where: any = {};
  
  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
    ];
  }
  
  if (isActive !== undefined) {
    where.isActive = isActive;
  }
  
  if (parentId) {
    where.parentId = parentId;
  }

  const [categories, total] = await Promise.all([
    prisma.category.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        parent: true,
        children: true,
      },
    }),
    prisma.category.count({ where }),
  ]);

  return { categories, total, page, limit };
};

// GET BY ID
export const getCategoryById = async (id: string) => {
  return await prisma.category.findUnique({
    where: { id },
    include: {
      parent: true,
      children: true,
    },
  });
};

// GET BY SLUG
export const getCategoryBySlug = async (slug: string) => {
  return await prisma.category.findUnique({
    where: { slug },
    include: {
      parent: true,
      children: true,
    },
  });
};

// UPDATE
export const updateCategory = async (id: string, data: UpdateCategoryInput) => {
  if (data.name && !data.slug) {
    data.slug = generateSlug(data.name);
  }
  
  return await prisma.category.update({
    where: { id },
    data,
  });
};

// DELETE
export const deleteCategory = async (id: string) => {
  return await prisma.category.delete({
    where: { id },
  });
};