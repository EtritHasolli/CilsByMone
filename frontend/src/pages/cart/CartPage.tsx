import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { useCartStore, selectCartSubtotal } from '../../store/cartStore';
import { QuantitySelector } from '../../components/ui/QuantitySelector';
import { formatCurrency } from '../../utils/formatCurrency';
import { useUIStore } from '../../store/uiStore';

export function CartPage() {
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore(selectCartSubtotal);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const currency = useUIStore((state) => state.currency);

  const totalItems = useMemo(() => items.reduce((acc, item) => acc + item.quantity, 0), [items]);

  if (items.length === 0) {
    return (
      <div className="container flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-brand-dark">Your Cart</p>
        <h1 className="font-display text-3xl text-surface-dark">The cart is feeling a little light</h1>
        <p className="max-w-md text-sm text-surface-dark/70">
          Start building your kit with premium lash trays, adhesives, tools, and aftercare essentials selected by Moné.
        </p>
        <Link
          to="/shop"
          className="rounded-full bg-surface-dark px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-surface-dark/90"
        >
          Shop Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="flex flex-col gap-2">
        <span className="text-xs uppercase tracking-[0.4em] text-brand-dark">Your Cart</span>
        <h1 className="font-display text-4xl text-surface-dark">Review & refine your order</h1>
        <p className="text-sm text-surface-dark/60">{totalItems} items curated for your next appointment.</p>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.3fr,1fr]">
        <section className="space-y-4">
          {items.map((item) => (
            <article
              key={item.id}
              className="flex flex-col gap-4 rounded-3xl bg-white p-5 shadow-soft sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex flex-1 gap-4">
                {item.image ? (
                  <img
                    src={`${item.image}?auto=format&fit=crop&w=200&q=80`}
                    alt={item.name}
                    className="h-24 w-24 rounded-2xl object-cover"
                  />
                ) : (
                  <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-surface-muted text-xs text-surface-dark/50">
                    No image
                  </div>
                )}
                <div className="space-y-2">
                  <h2 className="font-semibold text-surface-dark">{item.name}</h2>
                  <dl className="text-xs uppercase tracking-wide text-surface-dark/50">
                    {item.options?.length_mm && (
                      <div className="flex gap-2">
                        <dt>Length</dt>
                        <dd>{item.options.length_mm}mm</dd>
                      </div>
                    )}
                    {item.options?.curl && (
                      <div className="flex gap-2">
                        <dt>Curl</dt>
                        <dd>{item.options.curl}</dd>
                      </div>
                    )}
                    {item.options?.volume && (
                      <div className="flex gap-2">
                        <dt>Volume</dt>
                        <dd>{item.options.volume}</dd>
                      </div>
                    )}
                  </dl>
                  <button
                    type="button"
                    className="text-xs font-semibold uppercase tracking-wide text-brand-dark"
                    onClick={() => removeItem(item.productId, item.variantId)}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-end gap-3">
                <QuantitySelector
                  value={item.quantity}
                  onChange={(value) => updateQuantity(item.productId, item.variantId, value)}
                />
                <p className="text-sm font-semibold text-surface-dark">
                  {formatCurrency(item.price * item.quantity, currency)}
                </p>
              </div>
            </article>
          ))}
        </section>

        <aside className="h-max rounded-3xl bg-white p-6 shadow-soft">
          <h2 className="text-lg font-semibold text-surface-dark">Order Summary</h2>
          <div className="mt-6 space-y-4 text-sm text-surface-dark/70">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-surface-dark">{formatCurrency(subtotal, currency)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Shipping</span>
              <span className="text-surface-dark/50">Calculated at checkout</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Taxes</span>
              <span className="text-surface-dark/50">Calculated at checkout</span>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between text-base font-semibold text-surface-dark">
            <span>Total</span>
            <span>{formatCurrency(subtotal, currency)}</span>
          </div>
          <Link
            to="/checkout"
            className="mt-6 block rounded-full bg-surface-dark px-6 py-3 text-center text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-surface-dark/90"
          >
            Proceed to Checkout
          </Link>
          <Link
            to="/shop"
            className="mt-3 block text-center text-xs font-semibold uppercase tracking-wide text-brand-dark"
          >
            Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}

