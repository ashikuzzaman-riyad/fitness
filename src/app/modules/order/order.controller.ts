// src/modules/order/order.controller.ts
import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import * as OrderService from "./order.service";

export const createOrder = catchAsync(async (req: Request, res: Response) => {
  const order = await OrderService.createOrder(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Order created successfully",
    data: order,
  });
});

export const getOrders = catchAsync(async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const result = await OrderService.getOrders(page, limit);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Orders fetched successfully",
    data: result.orders,
    meta: result.meta,
  });
});

export const getOrderById = catchAsync(async (req: Request, res: Response) => {
  const order = await OrderService.getOrderById(req.params.id);

  if (!order) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "Order not found",
    });
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Order fetched successfully",
    data: order,
  });
});

export const deleteOrder = catchAsync(async (req: Request, res: Response) => {
  try {
    const order = await OrderService.deleteOrder(req.params.id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Order deleted successfully",
      data: order,
    });
  } catch (error: any) {
    if (error.code === "P2025") {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "Order not found",
      });
    }
    throw error;
  }
});
