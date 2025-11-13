import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import type { Product } from '../../types/product';
import { ProductCard } from '../../components/common/ProductCard';

type ProductListResponse = {
  data: Product[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
};

export function HomePage() {
  const { data: featured } = useQuery({
    queryKey: ['products', 'featured'],
    queryFn: async () => {
      const response = await api.get<ProductListResponse>('/products', {
        params: { featured: true, pageSize: 8 },
      });
      return response.data.data;
    },
  });

  return (
    <div className="space-y-16 pb-16">
      <section className="relative overflow-hidden bg-surface-dark text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1600&q=80"
            alt="Lash artist working"
            className="h-full w-full object-cover opacity-60"
          />
        </div>
        <div className="relative container flex flex-col gap-6 py-32">
          <span className="text-sm uppercase tracking-[0.4em] text-brand-light">Boutique Lash Atelier</span>
          <h1 className="max-w-2xl font-display text-4xl leading-tight md:text-5xl">
            Crafted for lash artists and beauty lovers who demand elevated essentials.
          </h1>
          <p className="max-w-lg text-lg text-white/80">
            Discover professional lash trays, premium adhesives, bespoke services, and master certification trainings
            designed by Moné Dupont.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/shop"
              className="rounded-full bg-brand px-6 py-3 font-semibold text-surface-dark shadow-glow transition hover:bg-brand-dark"
            >
              Shop Collection
            </Link>
            <Link
              to="/services"
              className="rounded-full border border-white/30 px-6 py-3 font-semibold text-white transition hover:border-white hover:bg-white hover:text-surface-dark"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm uppercase tracking-[0.3em] text-brand-dark">New & Noteworthy</span>
            <h2 className="mt-2 font-display text-3xl text-surface-dark">Featured Best Sellers</h2>
          </div>
          <Link to="/shop" className="text-sm font-semibold uppercase tracking-wide text-brand-dark">
            View All
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured?.map((product) => <ProductCard key={product.id} product={product} />) ?? (
            <p className="text-sm text-surface-dark/60">Loading featured products…</p>
          )}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container grid gap-10 md:grid-cols-2">
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80"
            alt="Luxury lash tools"
            className="h-80 w-full rounded-3xl object-cover shadow-soft md:h-full"
          />
          <div className="space-y-6">
            <span className="text-sm uppercase tracking-[0.3em] text-brand-dark">Our Promise</span>
            <h2 className="font-display text-3xl text-surface-dark">
              Premium lash artistry rooted in technique, care, and community.
            </h2>
            <p className="text-surface-dark/70">
              From ethically sourced fibres to lab-tested adhesives, every product is obsessively crafted to help artists
              deliver unforgettable sets—while protecting natural lash health.
            </p>
            <ul className="grid gap-3 text-sm text-surface-dark/70 sm:grid-cols-2">
              <li className="rounded-xl bg-surface-muted p-4 shadow-soft">
                <span className="font-semibold text-surface-dark">Cruelty-Free Materials</span>
                <p className="mt-2 text-xs text-surface-dark/60">100% vegan Korean PBT and hypoallergenic formulas.</p>
              </li>
              <li className="rounded-xl bg-surface-muted p-4 shadow-soft">
                <span className="font-semibold text-surface-dark">Artist-Approved Testing</span>
                <p className="mt-2 text-xs text-surface-dark/60">Refined by master lash artists in real salons.</p>
              </li>
              <li className="rounded-xl bg-surface-muted p-4 shadow-soft">
                <span className="font-semibold text-surface-dark">Salon Training</span>
                <p className="mt-2 text-xs text-surface-dark/60">Certification programs for every level of artist.</p>
              </li>
              <li className="rounded-xl bg-surface-muted p-4 shadow-soft">
                <span className="font-semibold text-surface-dark">Care Rituals</span>
                <p className="mt-2 text-xs text-surface-dark/60">Retail-friendly aftercare to preserve retention.</p>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

