import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center bg-white text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-brand-dark">404</p>
      <h1 className="mt-3 font-display text-4xl text-surface-dark">This page got lost in the lash trays</h1>
      <p className="mt-4 max-w-xl text-sm text-surface-dark/70">
        The content you’re seeking has been moved or never existed. Explore our curated shop or book a signature
        service.
      </p>
      <div className="mt-6 flex gap-3">
        <Link
          to="/"
          className="rounded-full bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wide text-surface-dark transition hover:bg-brand-dark"
        >
          Back to Home
        </Link>
        <Link
          to="/shop"
          className="rounded-full border border-surface-dark/20 px-6 py-3 text-sm font-semibold uppercase tracking-wide transition hover:border-brand-dark hover:text-brand-dark"
        >
          Browse Shop
        </Link>
      </div>
    </div>
  );
}

