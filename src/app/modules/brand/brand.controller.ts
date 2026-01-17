// src/modules/brand/brand.controller.ts

import { Request, Response } from 'express';
import * as brandService from './brand.service';
import { catchAsync, sendResponse } from '../../shared';
import { CreateBrandInput, UpdateBrandInput } from './brand.types';

// CREATE
export const createBrand = catchAsync(async (req: Request, res: Response) => {
  const brand = await brandService.createBrand(req.body as CreateBrandInput);
  
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Brand created successfully',
    data: brand,
  });
});

// GET ALL
export const getAllBrands = catchAsync(async (req: Request, res: Response) => {
  const { search, isActive, page, limit } = req.query;
  
  const result = await brandService.getAllBrands({
    search: search as string,
    isActive: isActive === 'true' ? true : isActive === 'false' ? false : undefined,
    page: page ? Number(page) : 1,
    limit: limit ? Number(limit) : 10,
  });
  
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Brands fetched successfully',
    data: result.brands,
    meta: {
      page: result.page,
      limit: result.limit,
      total: result.total,
    },
  });
});

// GET BY ID
export const getBrandById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const brand = await brandService.getBrandById(id);
  
  if (!brand) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'Brand not found',
    });
  }
  
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Brand fetched successfully',
    data: brand,
  });
});

// GET BY SLUG
export const getBrandBySlug = catchAsync(async (req: Request, res: Response) => {
  const { slug } = req.params;
  const brand = await brandService.getBrandBySlug(slug);
  
  if (!brand) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'Brand not found',
    });
  }
  
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Brand fetched successfully',
    data: brand,
  });
});

// UPDATE
export const updateBrand = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const brand = await brandService.updateBrand(id, req.body as UpdateBrandInput);
  
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Brand updated successfully',
    data: brand,
  });
});

// DELETE
export const deleteBrand = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await brandService.deleteBrand(id);
  
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Brand deleted successfully',
  });
});