// src/modules/product/product.service.ts
import makeSlug from "../../helper/makeSlug";
import { prisma } from "../../shared/prisma";
import { ProductFilters } from "./product.types";

// CREATE PRODUCT WITH NESTED RELATIONS AND INVENTORY LOG
export const createProduct = async (data: any) => {
  const slug = makeSlug(data.name);

  return prisma.$transaction(async (tx) => {
    // 1️⃣ Create Product
    const product = await tx.product.create({
      data: {
        name: data.name,
        slug,
        basePrice: data.basePrice,
        salePrice: data.salePrice,
        description: data.description,
        ingredients: data.ingredients,
        expiryDays: data.expiryDays,

        // Category (required)
        category: { connect: { id: data.categoryId } },

        // Brand (optional)
        brand: data.brandId ? { connect: { id: data.brandId } } : undefined,

        // Nutrition (optional 1:1)
        nutrition: data.nutrition ? { create: data.nutrition } : undefined,

        // Images (1:N)
        images: data.images?.length
          ? {
              create: data.images.map((img: any) => ({
                url: img.url,
                isMain: img.isMain ?? false,
              })),
            }
          : undefined,
      },
      include: {
        category: true,
        brand: true,
        nutrition: true,
        images: true,
      },
    });

    // 2️⃣ Create Variants + Attributes + VariantAttributes + InventoryLogs
    for (const variant of data.variants ?? []) {
      // Create variant
      const createdVariant = await tx.productVariant.create({
        data: {
          sku: variant.sku,
          price: variant.price,
          stock: variant.stock,
          isDefault: variant.isDefault ?? false,
          productId: product.id,
        },
      });

      // Create attributes + values + variantAttributes
      for (const attr of variant.attributes ?? []) {
        // Upsert Attribute
        const attribute = await tx.attribute.upsert({
          where: { name: attr.attribute },
          update: {},
          create: { name: attr.attribute },
        });

        // Upsert AttributeValue
        const attributeValue = await tx.attributeValue.upsert({
          where: {
            attributeId_value: {
              attributeId: attribute.id,
              value: attr.value,
            },
          },
          update: {},
          create: {
            attributeId: attribute.id,
            value: attr.value,
          },
        });

        // Create VariantAttribute
        await tx.variantAttribute.create({
          data: {
            productVariantId: createdVariant.id,
            attributeValueId: attributeValue.id,
          },
        });
      }

      // InventoryLog (initial stock)
      if (variant.stock && variant.stock > 0) {
        await tx.inventoryLog.create({
          data: {
            productId: product.id,
            variantId: createdVariant.id,
            action: "STOCK_IN",
            source: "ADMIN",
            quantity: variant.stock,
            previousStock: 0,
            currentStock: variant.stock,
            note: "Initial stock",
          },
        });
      }
    }

    return product;
  });
};

export const getAllProducts = async (filters: ProductFilters) => {
  const {
    search,
    brandId,
    categoryId,
    minPrice,
    maxPrice,
    isActive,
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = filters;

  const skip = (page - 1) * limit;

  const where: any = {};

  // Search
  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  // Filters
  if (brandId) where.brandId = brandId;
  if (categoryId) where.categoryId = categoryId;
  if (isActive !== undefined) where.isActive = isActive;

  if (minPrice || maxPrice) {
    where.salePrice = {};
    if (minPrice) where.salePrice.gte = minPrice;
    if (maxPrice) where.salePrice.lte = maxPrice;
  }

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
      select: {
        id: true,
        name: true,
        slug: true,
        salePrice: true,
        basePrice: true,
        isActive: true,
        images: {
          select: {
            url: true,
            isMain: true,
          },
        },
        brand: {
          select: {
            name: true,
            logoUrl: true,
          },
        },
      },
    }),
    prisma.product.count({ where }),
  ]);

  return {
    products,
    total,
    page,
    limit,
  };
};

// Get product by slug
export const getProductBySlug = async (slug: string) => {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
      brand: true,
      nutrition: true,
      images: true,
      variants: {
        include: {
          attributes: {
            include: {
              attributeValue: {
                include: {
                  attribute: true,
                },
              },
            },
          },
          inventoryLogs: true,
        },
      },
      inventoryLogs: true,
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

// src/modules/product/product.service.ts
export const updateProduct = async (id: string, data: any) => {
  return prisma.product.update({
    where: { id },
    data: {
      name: data.name,
      basePrice: data.basePrice,
      salePrice: data.salePrice,
      description: data.description,
      ingredients: data.ingredients,
      expiryDays: data.expiryDays,

      // Update nutrition if provided
      nutrition: data.nutrition
        ? {
            upsert: {
              update: data.nutrition,
              create: data.nutrition,
            },
          }
        : undefined,

      // Update brand if provided
      brand: data.brandId ? { connect: { id: data.brandId } } : undefined,

      // Update category if provided
      category: data.categoryId ? { connect: { id: data.categoryId } } : undefined,

      // Update images: remove old and add new
      images: data.images
        ? {
            deleteMany: {}, // remove old images
            create: data.images.map((img: any) => ({
              url: img.url,
              isMain: img.isMain ?? false,
            })),
          }
        : undefined,
    },
    include: {
      category: true,
      brand: true,
      nutrition: true,
      images: true,
      variants: {
        include: {
          attributes: {
            include: {
              attributeValue: {
                include: { attribute: true },
              },
            },
          },
          inventoryLogs: true,
        },
      },
      inventoryLogs: true,
    },
  });
};


// src/modules/product/product.service.ts
export const deleteProduct = async (id: string) => {
  return prisma.product.delete({
    where: { id },
    include: {
      category: true,
      brand: true,
      nutrition: true,
      images: true,
      variants: true,
      inventoryLogs: true,
    },
  });
};

