// src/modules/order/order.service.ts
import { prisma } from "../../shared/prisma";
import { IOrderInput } from "./order.types";

export const createOrder = async (data: IOrderInput) => {
  return prisma.$transaction(async (tx) => {
    // 1️⃣ Create the order
    const order = await tx.order.create({
      data: {
        userId: data.userId,
        orderNumber: data.orderNumber,
        totalAmount: data.totalAmount,
        discountAmount: data.discountAmount || 0,
        finalAmount: data.finalAmount,

        // Nested creation of order items
        orderItems: {
          create: data.orderItems.map((item) => ({
            productId: item.productId,
            variantId: item.variantId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            totalPrice: item.unitPrice * item.quantity,
          })),
        },
      },
      include: {
        orderItems: {
          include: {
            product: true,
            variant: true,
          },
        },
        user: true,
      },
    });

    // 2️⃣ Update inventory logs
    for (const item of order.orderItems) {
      const productVariantId = item.variantId;
      const previousStock = productVariantId
        ? (await tx.productVariant.findUnique({ where: { id: productVariantId }  }))?.stock || 0
        : (await tx.product.findUnique({ where: { id: item.productId }, include: { variants: true } }))?.variants.reduce((a:any, v:any) => a + (v.stock || 0), 0) || 0;

      await tx.inventoryLog.create({
        data: {
          productId: item.productId,
          variantId: item.variantId,
          action: "STOCK_OUT",
          source: "ORDER",
          quantity: item.quantity,
          previousStock: previousStock,
          currentStock: previousStock - item.quantity,
          referenceId: order.id,
          note: "Order placed",
        },
      });

      // 3️⃣ Update stock in productVariant if exists
      if (productVariantId) {
        await tx.productVariant.update({
          where: { id: productVariantId },
          data: {
            stock: { decrement: item.quantity },
          },
        });
      }
    }

    return order;
  });
};

export const getOrders = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const [orders, total] = await prisma.$transaction([
    prisma.order.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: { orderItems: { include: { product: true, variant: true } }, user: true },
    }),
    prisma.order.count(),
  ]);

  return {
    orders,
    meta: { page, limit, total },
  };
};

export const getOrderById = async (id: string) => {
  return prisma.order.findUnique({
    where: { id },
    include: { orderItems: { include: { product: true, variant: true } }, user: true },
  });
};

export const deleteOrder = async (id: string) => {
  return prisma.order.delete({ where: { id } });
};
