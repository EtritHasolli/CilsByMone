import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { useCartStore, selectCartSubtotal } from '../../store/cartStore';
import { useUIStore } from '../../store/uiStore';
import { formatCurrency } from '../../utils/formatCurrency';

type OrderResponse = {
  orderId: string;
  orderNumber: string;
  subtotal: number;
  currency: string;
  checkoutUrl?: string | null;
};

export function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore(selectCartSubtotal);
  const clearCart = useCartStore((state) => state.clear);
  const currency = useUIStore((state) => state.currency);
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    email: '',
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'US',
  });

  const orderMutation = useMutation({
    mutationFn: async () => {
      const response = await api.post<OrderResponse>('/orders', {
        customerEmail: formState.email,
        customerName: formState.name,
        currency,
        items: items.map((item) => ({
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.quantity,
        })),
        shippingAddress: {
          line1: formState.address,
          city: formState.city,
          state: formState.state,
          postal_code: formState.postalCode,
          country: formState.country,
          phone: formState.phone,
        },
      });
      return response.data;
    },
    onSuccess: (data) => {
      if (data.checkoutUrl) {
        clearCart();
        window.location.href = data.checkoutUrl;
      } else {
        navigate(`/checkout/success?order=${data.orderNumber}`);
      }
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!items.length) return;
    orderMutation.mutate();
  };

  if (!items.length) {
    return (
      <div className="container flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
        <p className="text-sm text-surface-dark/70">
          Your cart is empty. Add products to begin checkout.
        </p>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="grid gap-12 lg:grid-cols-[1.2fr,0.8fr]">
        <form className="space-y-6 rounded-3xl bg-white p-8 shadow-soft" onSubmit={handleSubmit}>
          <div>
            <span className="text-xs uppercase tracking-[0.4em] text-brand-dark">Checkout</span>
            <h1 className="mt-3 font-display text-3xl text-surface-dark">Secure your order</h1>
            <p className="mt-2 text-sm text-surface-dark/60">
              Enter contact and shipping details to receive your Stripe payment link.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm text-surface-dark">
              Email
              <input
                type="email"
                required
                value={formState.email}
                onChange={(event) => setFormState((prev) => ({ ...prev, email: event.target.value }))}
                className="rounded-md border border-surface-dark/10 px-3 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                placeholder="you@example.com"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-surface-dark">
              Full Name
              <input
                type="text"
                required
                value={formState.name}
                onChange={(event) => setFormState((prev) => ({ ...prev, name: event.target.value }))}
                className="rounded-md border border-surface-dark/10 px-3 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                placeholder="Client or studio name"
              />
            </label>
          </div>

          <label className="flex flex-col gap-2 text-sm text-surface-dark">
            Phone (optional)
            <input
              type="tel"
              value={formState.phone}
              onChange={(event) => setFormState((prev) => ({ ...prev, phone: event.target.value }))}
              className="rounded-md border border-surface-dark/10 px-3 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
              placeholder="+1 (555) 123-4567"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm text-surface-dark">
            Address
            <input
              type="text"
              required
              value={formState.address}
              onChange={(event) => setFormState((prev) => ({ ...prev, address: event.target.value }))}
              className="rounded-md border border-surface-dark/10 px-3 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
              placeholder="Street and number"
            />
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm text-surface-dark">
              City
              <input
                type="text"
                required
                value={formState.city}
                onChange={(event) => setFormState((prev) => ({ ...prev, city: event.target.value }))}
                className="rounded-md border border-surface-dark/10 px-3 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-surface-dark">
              State / Province
              <input
                type="text"
                required
                value={formState.state}
                onChange={(event) => setFormState((prev) => ({ ...prev, state: event.target.value }))}
                className="rounded-md border border-surface-dark/10 px-3 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-surface-dark">
              Postal Code
              <input
                type="text"
                required
                value={formState.postalCode}
                onChange={(event) => setFormState((prev) => ({ ...prev, postalCode: event.target.value }))}
                className="rounded-md border border-surface-dark/10 px-3 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-surface-dark">
              Country
              <input
                type="text"
                required
                value={formState.country}
                onChange={(event) => setFormState((prev) => ({ ...prev, country: event.target.value }))}
                className="rounded-md border border-surface-dark/10 px-3 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
              />
            </label>
          </div>

          {orderMutation.isError && (
            <p className="text-sm text-red-600">
              Unable to create order. Please verify your details and try again.
            </p>
          )}

          <button
            type="submit"
            disabled={orderMutation.isPending}
            className="w-full rounded-full bg-surface-dark px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-surface-dark/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {orderMutation.isPending ? 'Processing…' : 'Continue to payment'}
          </button>
        </form>

        <aside className="h-max space-y-6 rounded-3xl bg-white p-6 shadow-soft">
          <h2 className="text-lg font-semibold text-surface-dark">Order Summary</h2>
          <div className="space-y-4 text-sm text-surface-dark/70">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-surface-dark">{item.name}</p>
                  <p className="text-xs uppercase tracking-wide text-surface-dark/50">
                    Qty {item.quantity}
                    {item.options?.length_mm ? ` • ${item.options.length_mm}mm` : ''}
                    {item.options?.curl ? ` • ${item.options.curl}` : ''}
                  </p>
                </div>
                <span className="text-sm font-semibold text-surface-dark">
                  {formatCurrency(item.price * item.quantity, currency)}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between border-t border-surface-dark/10 pt-4 text-base font-semibold text-surface-dark">
            <span>Total</span>
            <span>{formatCurrency(subtotal, currency)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}

