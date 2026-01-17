// src/modules/order/order.service.ts

import { prisma } from '../../shared/prisma';
import { CreateOrderInput, UpdateOrderInput, OrderFilters } from './order.types';

// Helper to generate order number
const generateOrderNumber = (): string => {
  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `ORD-${timestamp}-${random}`;
};

// CREATE
export const createOrder = async (data: CreateOrderInput) => {
  if (!data.items || data.items.length === 0) {
    throw new Error("Order must contain at least one item");
  }

  const orderNumber = generateOrderNumber();

  const order = await prisma.order.create({
    data: {
      orderNumber,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      shippingAddress: data.shippingAddress,
      totalAmount: data.totalAmount,
      discountAmount: data.discountAmount || 0,
      shippingAmount: data.shippingAmount || 0,
      finalAmount: data.finalAmount,
      paymentMethod: data.paymentMethod,
      paymentStatus: data.paymentStatus || "PENDING",
      notes: data.notes,
      orderitems: {
        create: data.items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          totalPrice: item.quantity * item.unitPrice,
        })),
      },
    },
    include: {
      orderitems: {
        include: { product: true },
      },
    },
  });

  return order;
};


// GET ALL
export const getAllOrders = async (filters: OrderFilters) => {
  const { status, customerEmail, startDate, endDate, page = 1, limit = 10 } = filters;
  const skip = (page - 1) * limit;

  const where: any = {};
  
  if (status) where.status = status;
  if (customerEmail) where.customerEmail = customerEmail;
  
  if (startDate || endDate) {
    where.createdAt = {};
    if (startDate) where.createdAt.gte = startDate;
    if (endDate) where.createdAt.lte = endDate;
  }

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        orderitems: {
          include: {
            product: true,
          },
        },
      },
    }),
    prisma.order.count({ where }),
  ]);

  return { orders, total, page, limit };
};

// GET BY ID
export const getOrderById = async (id: string) => {
  return await prisma.order.findUnique({
    where: { id },
    include: {
      orderitems: {
        include: {
          product: true,
        },
      },
    },
  });
};

// GET BY ORDER NUMBER
export const getOrderByNumber = async (orderNumber: string) => {
  return await prisma.order.findUnique({
    where: { orderNumber },
    include: {
      orderitems: {
        include: {
          product: true,
        },
      },
    },
  });
};

// UPDATE
export const updateOrder = async (id: string, data: UpdateOrderInput) => {
  return await prisma.order.update({
    where: { id },
    data,
    include: {
      orderitems: {
        include: {
          product: true,
        },
      },
    },
  });
};

// DELETE
export const deleteOrder = async (id: string) => {
  return await prisma.order.delete({
    where: { id },
  });
};