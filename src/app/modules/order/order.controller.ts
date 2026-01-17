// src/modules/order/order.controller.ts

import { Request, Response } from 'express';
import * as orderService from './order.service';
import { catchAsync, sendResponse } from '../../shared';
import { CreateOrderInput, UpdateOrderInput } from './order.types';

// CREATE
export const createOrder = catchAsync(async (req: Request, res: Response) => {
  const order = await orderService.createOrder(req.body as CreateOrderInput);
  
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Order created successfully',
    data: order,
  });
});

// GET ALL
export const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const { status, customerEmail, startDate, endDate, page, limit } = req.query;
  
  const result = await orderService.getAllOrders({
    status: status as string,
    customerEmail: customerEmail as string,
    startDate: startDate ? new Date(startDate as string) : undefined,
    endDate: endDate ? new Date(endDate as string) : undefined,
    page: page ? Number(page) : 1,
    limit: limit ? Number(limit) : 10,
  });
  
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Orders fetched successfully',
    data: result.orders,
    meta: {
      page: result.page,
      limit: result.limit,
      total: result.total,
    },
  });
});

// GET BY ID
export const getOrderById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const order = await orderService.getOrderById(id);
  
  if (!order) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'Order not found',
    });
  }
  
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Order fetched successfully',
    data: order,
  });
});

// GET BY ORDER NUMBER
export const getOrderByNumber = catchAsync(async (req: Request, res: Response) => {
  const { orderNumber } = req.params;
  const order = await orderService.getOrderByNumber(orderNumber);
  
  if (!order) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'Order not found',
    });
  }
  
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Order fetched successfully',
    data: order,
  });
});

// UPDATE
export const updateOrder = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const order = await orderService.updateOrder(id, req.body as UpdateOrderInput);
  
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Order updated successfully',
    data: order,
  });
});

// DELETE
export const deleteOrder = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await orderService.deleteOrder(id);
  
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Order deleted successfully',
  });
});