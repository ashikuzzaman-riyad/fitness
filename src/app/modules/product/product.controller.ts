import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import * as ProductService from "./product.service";

// CREATE PRODUCT
export const createProduct = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ProductService.createProduct(req.body);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Product created successfully",
      data: result,
    });
  }
);



export const getProducts = catchAsync(async (req: Request, res: Response) => {
  const filters = {
    search: req.query.search as string,
    brandId: req.query.brandId as string,
    categoryId: req.query.categoryId as string,
    minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
    maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
    isActive: req.query.isActive ? req.query.isActive === "true" : undefined,
    page: req.query.page ? Number(req.query.page) : 1,
    limit: req.query.limit ? Number(req.query.limit) : 10,
    sortBy: req.query.sortBy as any,
    sortOrder: req.query.sortOrder as any,
  };

  const result = await ProductService.getAllProducts(filters);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Products fetched successfully",
    data: result.products,
    meta: {
      total: result.total,
      page: result.page,
      limit: result.limit,
    },
  });
});



export const getProductBySlug = catchAsync(async (req: Request, res: Response) => {
  const { slug } = req.params;
  const product = await ProductService.getProductBySlug(slug);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product fetched successfully",
    data: product
  });
});


// Update Product
export const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  const product = await ProductService.updateProduct(id, data);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: product ? "Product updated successfully" : "Product not found",
    data: product || null,
  });
});


export const getInventoryLogs = catchAsync(async (req: Request, res: Response) => {
  const filters = {
    productId: req.query.productId as string,
    variantId: req.query.variantId as string,
    action: req.query.action as string,
    source: req.query.source as string,
    page: req.query.page ? Number(req.query.page) : undefined,
    limit: req.query.limit ? Number(req.query.limit) : undefined,
    sortBy: req.query.sortBy as string,
    sortOrder: req.query.sortOrder as "asc" | "desc",
  };

  const result = await ProductService.getInventoryLogs(filters);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Inventory logs fetched successfully",
    data: result.data,
    meta: result.meta,
  });
});

// Delete Product
export const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const product = await ProductService.deleteProduct(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: product ? "Product deleted successfully" : "Product not found",
    data: product || null,
  });
});


// // GET ALL PRODUCTS
// export const getAllProducts = catchAsync(
//   async (req: Request, res: Response) => {
//     const result = await ProductService.getAllProducts({
//       search: req.query.search as string | undefined,
//       brandId: req.query.brandId as string | undefined,
//       categoryId: req.query.categoryId as string | undefined,
//       minPrice: req.query.minPrice
//         ? Number(req.query.minPrice)
//         : undefined,
//       maxPrice: req.query.maxPrice
//         ? Number(req.query.maxPrice)
//         : undefined,
//       isActive:
//         req.query.isActive !== undefined
//           ? req.query.isActive === "true"
//           : undefined,
//       page: req.query.page ? Number(req.query.page) : undefined,
//       limit: req.query.limit ? Number(req.query.limit) : undefined,
//       sortBy: req.query.sortBy as string | undefined,
//       sortOrder: req.query.sortOrder as "asc" | "desc" | undefined,
//     });

//     sendResponse(res, {
//       statusCode: 200,
//       success: true,
//       message: "Products retrieved successfully",
//       meta: {
//         page: result.page,
//         limit: result.limit,
//         total: result.total,
//       },
//       data: result.products,
//     });
//   }
// );

// // GET PRODUCT BY ID
// export const getProductById = catchAsync(
//   async (req: Request, res: Response) => {
//     const { id } = req.params;

//     const result = await ProductService.getProductById(id);

//     sendResponse(res, {
//       statusCode: 200,
//       success: true,
//       message: "Product retrieved successfully",
//       data: result,
//     });
//   }
// );

// // GET PRODUCT BY SLUG
// export const getProductBySlug = catchAsync(
//   async (req: Request, res: Response) => {
//     const { slug } = req.params;

//     const result = await ProductService.getProductBySlug(slug);

//     sendResponse(res, {
//       statusCode: 200,
//       success: true,
//       message: "Product retrieved successfully",
//       data: result,
//     });
//   }
// );

// // UPDATE PRODUCT
// export const updateProduct = catchAsync(
//   async (req: Request, res: Response) => {
//     const { id } = req.params;

//     const result = await ProductService.updateProduct(id, req.body);

//     sendResponse(res, {
//       statusCode: 200,
//       success: true,
//       message: "Product updated successfully",
//       data: result,
//     });
//   }
// );

// // DELETE PRODUCT
// export const deleteProduct = catchAsync(
//   async (req: Request, res: Response) => {
//     const { id } = req.params;

//     const result = await ProductService.deleteProduct(id);

//     sendResponse(res, {
//       statusCode: 200,
//       success: true,
//       message: "Product deleted successfully",
//       data: result,
//     });
//   }
// );
