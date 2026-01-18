import makeSlug from "../../helper/makeSlug";
import { prisma } from "../../shared/prisma";

import { CreateBrandInput, UpdateBrandInput, BrandFilters } from './brand.types';

// Helper to generate slug

// CREATE
export const createBrand = async (data: CreateBrandInput) => {
  const slug = data.slug || makeSlug(data.name);
  
  return await prisma.brand.create({
    data: {
      ...data,
      slug,
    },
  });
};

// GET ALL
export const getAllBrands = async (filters: BrandFilters) => {
  const { search, isActive, page = 1, limit = 10 } = filters;
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

  const [brands, total] = await Promise.all([
    prisma.brand.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.brand.count({ where }),
  ]);

  return { brands, total, page, limit };
};

// GET BY ID
// export const getBrandById = async (id: string) => {
//   return await prisma.brand.findUnique({
//     where: { id },
//   });
// };

// GET BY SLUG
export const getBrandBySlug = async (slug: string) => {
  return await prisma.brand.findUnique({
    where: { slug },
  });
};

// UPDATE
export const updateBrand = async (id: string, data: UpdateBrandInput) => {
  if (data.name && !data.slug) {
    data.slug = makeSlug(data.name);
  }
  
  return await prisma.brand.update({
    where: { id },
    data,
  });
};

// DELETE
export const deleteBrand = async (id: string) => {
  return await prisma.brand.delete({
    where: { id },
  });
};