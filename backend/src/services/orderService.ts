import { z } from 'zod';
import { supabaseAdmin } from '../config/supabase';
import { stripe } from '../config/stripe';
import { env } from '../config/env';
import { Product } from '../types/catalog';

const orderSchema = z.object({
  customerEmail: z.string().email(),
  customerName: z.string().min(1).optional(),
  currency: z.string().min(1).default('USD'),
  items: z.array(
    z.object({
      productId: z.string().uuid(),
      variantId: z.string().uuid().optional(),
      quantity: z.number().int().min(1),
    })
  ),
  shippingAddress: z.record(z.string(), z.any()).optional(),
  billingAddress: z.record(z.string(), z.any()).optional(),
  notes: z.string().optional(),
});

const generateOrderNumber = () => {
  const random = Math.floor(Math.random() * 9000) + 1000;
  return `CBM-${Date.now()}-${random}`;
};

export const orderService = {
  async create(payload: unknown) {
    const data = orderSchema.parse(payload);

    const productIds = Array.from(new Set(data.items.map((item) => item.productId)));
    const { data: products, error: productsError } = await supabaseAdmin
      .from('products')
      .select('*, product_variants(*)')
      .in('id', productIds);

    if (productsError) {
      throw Object.assign(new Error(productsError.message), {
        details: productsError.details,
        hint: productsError.hint,
      });
    }

    if (!products || products.length === 0) {
      const err = new Error('Products not found');
      Object.assign(err, { status: 404 });
      throw err;
    }

    let subtotal = 0;
    const lineItems: {
      name: string;
      amount: number;
      quantity: number;
      currency: string;
      description?: string;
      sku?: string | null;
    }[] = [];

    const orderItems = data.items.map((item) => {
      const product = products.find((p) => p.id === item.productId) as Product | undefined;
      if (!product) {
        const err = new Error(`Product ${item.productId} not found`);
        Object.assign(err, { status: 404 });
        throw err;
      }

      const variant = product.product_variants?.find((v) => v.id === item.variantId);
      if (item.variantId && !variant) {
        const err = new Error(`Variant ${item.variantId} not found for product ${product.name}`);
        Object.assign(err, { status: 404 });
        throw err;
      }

      const unitPrice = product.base_price + (variant?.price_modifier ?? 0);
      const lineTotal = unitPrice * item.quantity;
      subtotal += lineTotal;

      const descriptionParts: string[] = [];
      if (variant?.length_mm) descriptionParts.push(`Length: ${variant.length_mm}mm`);
      if (variant?.curl) descriptionParts.push(`Curl: ${variant.curl}`);
      if (variant?.volume) descriptionParts.push(`Volume: ${variant.volume}`);

      lineItems.push({
        name: product.name,
        amount: Math.round(unitPrice * 100),
        quantity: item.quantity,
        currency: product.currency,
        description: descriptionParts.join(' • ') || undefined,
        sku: variant?.sku ?? product.sku,
      });

      return {
        product_id: product.id,
        variant_id: variant?.id ?? null,
        quantity: item.quantity,
        unit_price: unitPrice,
        currency: product.currency,
        total_price: lineTotal,
        product_name: product.name,
        variant_options: variant
          ? {
              length_mm: variant.length_mm,
              curl: variant.curl,
              volume: variant.volume,
              sku: variant.sku,
            }
          : null,
      };
    });

    const orderNumber = generateOrderNumber();
    const { data: orderInsertResult, error: orderError } = await supabaseAdmin
      .from('orders')
      .insert({
        order_number: orderNumber,
        customer_email: data.customerEmail.toLowerCase(),
        currency: data.currency,
        subtotal,
        shipping_total: 0,
        tax_total: 0,
        discount_total: 0,
        total: subtotal,
        status: 'requires_payment',
        shipping_address: data.shippingAddress ?? null,
        billing_address: data.billingAddress ?? null,
        notes: data.notes ?? null,
      })
      .select('id, order_number')
      .single();

    if (orderError || !orderInsertResult) {
      throw Object.assign(new Error(orderError?.message ?? 'Unable to create order record'), {
        details: orderError?.details,
        hint: orderError?.hint,
      });
    }

    const orderId = orderInsertResult.id;

    const { error: itemsError } = await supabaseAdmin.from('order_items').insert(
      orderItems.map((item) => ({
        ...item,
        order_id: orderId,
      }))
    );

    if (itemsError) {
      throw Object.assign(new Error(itemsError.message), {
        details: itemsError.details,
        hint: itemsError.hint,
      });
    }

    const successUrl = new URL('/checkout/success', env.VITE_SITE_URL ?? 'http://localhost:5173');
    successUrl.searchParams.set('order', orderNumber);

    if (stripe) {
      const cancelUrl = new URL('/checkout', env.VITE_SITE_URL ?? 'http://localhost:5173');

      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        customer_email: data.customerEmail,
        line_items: lineItems.map((item) => ({
          quantity: item.quantity,
          price_data: {
            currency: item.currency.toLowerCase(),
            product_data: {
              name: item.name,
              description: item.description,
              metadata: item.sku ? { sku: item.sku } : undefined,
            },
            unit_amount: item.amount,
          },
        })),
        success_url: successUrl.toString(),
        cancel_url: cancelUrl.toString(),
        metadata: {
          order_id: orderId,
          order_number: orderNumber,
        },
      });

      const { error: updateError } = await supabaseAdmin
        .from('orders')
        .update({
          payment_intent_id: session.id,
        })
        .eq('id', orderId);

      if (updateError) {
        throw Object.assign(new Error(updateError.message), {
          details: updateError.details,
          hint: updateError.hint,
        });
      }

      return {
        orderId,
        orderNumber,
        subtotal,
        currency: data.currency,
        checkoutUrl: session.url,
      };
    }

    const { error: markPaidError } = await supabaseAdmin
      .from('orders')
      .update({
        status: 'paid',
        payment_intent_id: 'demo-success',
      })
      .eq('id', orderId);

    if (markPaidError) {
      throw Object.assign(new Error(markPaidError.message), {
        details: markPaidError.details,
        hint: markPaidError.hint,
      });
    }

    return {
      orderId,
      orderNumber,
      subtotal,
      currency: data.currency,
      checkoutUrl: null,
    };
  },
};

