export interface OrderItemInput {
  productId: string;
  variantId?: string;
  quantity: number;
}

export interface CreateOrderPayload {
  items: OrderItemInput[];
  customerEmail: string;
  customerName?: string;
  currency?: string;
  shippingAddress?: Record<string, unknown>;
  billingAddress?: Record<string, unknown>;
  notes?: string;
}

