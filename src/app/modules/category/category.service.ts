// src/modules/category/category.service.ts

import makeSlug from '../../helper/makeSlug';
import { prisma } from '../../shared/prisma';
import { CreateCategoryInput, UpdateCategoryInput, CategoryFilters } from './category.types';

// CREATE
export const createCategory = async (data: CreateCategoryInput) => {
  const slug = data.slug || makeSlug(data.name);
  
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
// export const getCategoryById = async (id: string) => {
//   return await prisma.category.findUnique({
//     where: { id },
//     include: {
//       parent: true,
//       children: true,
//     },
//   });
// };

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
    data.slug = makeSlug(data.name);
  }
  
  return await prisma.category.update({
    where: { id },
    data,
  });
};

// helper function to all category IDs recursively
const getAllCategoryIds = async (categoryId: string): Promise<string[]> => {
  const children = await prisma.category.findMany({
    where: { parentId: categoryId },
  });

  let ids = [categoryId];

  for (const child of children) {
    ids = ids.concat(await getAllCategoryIds(child.id));
  }

  return ids;
};

// category Products

export const getProductsByCategorySlug = async (slug: string) => {
  const Category = await prisma.category.findUnique({
    where: {slug},
  })
  if (!Category) return [];

  const ids = await getAllCategoryIds(Category.id);
  return prisma.product.findMany({
    where: {
      categoryId: {in: ids},
    },
    include: {
      category: true
    }
  })
};


// DELETE
export const deleteCategory = async (id: string) => {
  return await prisma.category.delete({
    where: { id },
  });
};