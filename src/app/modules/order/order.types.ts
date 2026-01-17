// src/modules/order/order.types.ts

export interface CreateOrderInput {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  totalAmount: number;
  items: OrderItemInput[];
}

export interface OrderItemInput {
  productId: string;
  quantity: number;
  unitPrice: number;
}

export interface UpdateOrderInput {
  status?: 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  trackingNumber?: string;
}

export interface OrderFilters {
  status?: string;
  customerEmail?: string;
  startDate?: Date;
  endDate?: Date;
  page?: number;
  limit?: number;
}