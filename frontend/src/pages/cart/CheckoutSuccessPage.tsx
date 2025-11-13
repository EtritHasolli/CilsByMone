import { Link, useSearchParams } from 'react-router-dom';

export function CheckoutSuccessPage() {
  const [params] = useSearchParams();
  const orderNumber = params.get('order');

  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
      <span className="text-xs uppercase tracking-[0.4em] text-brand-dark">Order Confirmed</span>
      <h1 className="font-display text-4xl text-surface-dark">Thank you for booking with Cils by Moné</h1>
      <p className="max-w-xl text-sm text-surface-dark/70">
        Your order will begin processing shortly. A confirmation email with your receipt and next steps has been sent to{' '}
        you. {orderNumber ? `Order number: ${orderNumber}.` : ''}
      </p>
      <div className="flex gap-3">
        <Link
          to="/shop"
          className="rounded-full bg-surface-dark px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-surface-dark/90"
        >
          Continue Shopping
        </Link>
        <Link
          to="/services"
          className="rounded-full border border-surface-dark/20 px-6 py-3 text-sm font-semibold uppercase tracking-wide transition hover:border-brand-dark hover:text-brand-dark"
        >
          Explore Services
        </Link>
      </div>
    </div>
  );
}

