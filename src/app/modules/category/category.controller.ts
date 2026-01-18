// src/modules/category/category.controller.ts

import { Request, Response } from 'express';
import * as categoryService from './category.service';
import { catchAsync, sendResponse } from '../../shared';
import { CreateCategoryInput, UpdateCategoryInput } from './category.types';


// CREATE
export const createCategory = catchAsync(async (req: Request, res: Response) => {
  const category = await categoryService.createCategory(req.body as CreateCategoryInput);
  
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Category created successfully',
    data: category,
  });
});

// GET ALL
export const getAllCategories = catchAsync(async (req: Request, res: Response) => {
  const { search, isActive, parentId, page, limit } = req.query;
  
  const result = await categoryService.getAllCategories({
    search: search as string,
    isActive: isActive === 'true' ? true : isActive === 'false' ? false : undefined,
    parentId: parentId as string,
    page: page ? Number(page) : 1,
    limit: limit ? Number(limit) : 10,
  });
  
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Categories fetched successfully',
    data: result.categories,
    meta: {
      page: result.page,
      limit: result.limit,
      total: result.total,
    },
  });
});

// GET BY ID
// export const getCategoryById = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const category = await categoryService.getCategoryById(id);
  
//   if (!category) {
//     return sendResponse(res, {
//       statusCode: 404,
//       success: false,
//       message: 'Category not found',
//     });
//   }
  
//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: 'Category fetched successfully',
//     data: category,
//   });
// });

// GET BY SLUG
export const getCategoryBySlug = catchAsync(async (req: Request, res: Response) => {
  const { slug } = req.params;
  const category = await categoryService.getCategoryBySlug(slug);
  
  if (!category) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'Category not found',
    });
  }
  
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Category fetched successfully',
    data: category,
  });
});


export const getProductsByCategorySlug = catchAsync(
  async (req: Request, res: Response) => {
    const { slug } = req.params;

    const products = await categoryService.getProductsByCategorySlug(slug);

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
    });
  }
);

// UPDATE
export const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const category = await categoryService.updateCategory(id, req.body as UpdateCategoryInput);
  
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Category updated successfully',
    data: category,
  });
});

// DELETE
export const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await categoryService.deleteCategory(id);
  
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Category deleted successfully',
  });
});