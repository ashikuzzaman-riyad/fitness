// src/modules/order/order.types.ts
export interface IOrderItemInput {
  productId: string;
  variantId?: string;
  quantity: number;
  unitPrice: number;
   variants?: string[];
}

export interface IOrderInput {
  userId: string;
  orderNumber: string;
  totalAmount: number;
  discountAmount?: number;
  finalAmount: number;
  orderItems: IOrderItemInput[];
 


 
}
