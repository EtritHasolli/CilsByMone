import { useMemo, useState } from 'react';
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

const heroCategories = [
  {
    slug: 'classic-lashes',
    label: 'Lashes',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=70',
  },
  {
    slug: 'aftercare-prep',
    label: 'Liquids',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=70',
  },
  {
    slug: 'tools-accessories',
    label: 'Pinzetten',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=70',
  },
  {
    slug: 'accessories',
    label: 'Zubehör',
    image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=900&q=70',
  },
];

const sortOptions = [
  { value: 'featured', label: 'Alphabetisch, A–Z' },
  { value: 'price_asc', label: 'Preis: Niedrig → Hoch' },
  { value: 'price_desc', label: 'Preis: Hoch → Niedrig' },
  { value: 'newest', label: 'Neuheiten' },
];

const DEFAULT_PRICE_RANGE: [number, number] = [0, 60];

const formatEuros = (value: number) =>
  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);

export function ShopPage() {
  const [filters, setFilters] = useState({
    categorySlug: '',
    sort: 'featured',
    priceRange: DEFAULT_PRICE_RANGE as [number, number],
    showOutOfStock: true,
  });

  const { data, isLoading } = useQuery({
    queryKey: ['products', filters],
    queryFn: async () => {
      const response = await api.get<ProductListResponse>('/products', {
        params: {
          category: filters.categorySlug || undefined,
          sort: filters.sort,
          priceMin: filters.priceRange[0],
          priceMax: filters.priceRange[1],
        },
      });
      return response.data;
    },
  });

  const products = useMemo(() => {
    if (!data?.data) return [];
    if (filters.showOutOfStock) return data.data;

    return data.data.filter((product) => {
      const baseStock = product.stock_quantity ?? 0;
      const variantStock = product.product_variants?.some((variant) => (variant.stock_quantity ?? 0) > 0) ?? false;
      return baseStock > 0 || variantStock;
    });
  }, [data?.data, filters.showOutOfStock]);

  const onPriceChange = (index: 0 | 1, value: number) => {
    setFilters((prev) => {
      const next: [number, number] = [...prev.priceRange];
      next[index] = value;
      if (next[0] > next[1]) {
        if (index === 0) next[1] = value;
        else next[0] = value;
      }
      return { ...prev, priceRange: next };
    });
  };

  return (
    <div className="pb-20">
      <section className="bg-[#f5efe7] py-16">
        <div className="container space-y-6">
          <div className="flex flex-col gap-3 text-center">
            <span className="text-xs uppercase tracking-[0.4em] text-surface-dark/80">Kollektionen</span>
            <h1 className="font-display text-4xl tracking-wide text-surface-dark">Shop</h1>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {heroCategories.map((category) => (
              <button
                key={category.slug}
                onClick={() => setFilters((prev) => ({ ...prev, categorySlug: category.slug }))}
                className="group relative overflow-hidden rounded-3xl bg-surface-dark shadow-soft transition hover:-translate-y-1"
              >
                <img
                  src={`${category.image}&sat=-25`}
                  alt={category.label}
                  className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-dark/70 via-surface-dark/10 to-transparent" />
                <span className="absolute inset-0 flex items-center justify-center font-display text-xl uppercase tracking-[0.5em] text-white">
                  {category.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="container mt-12 grid gap-10 lg:grid-cols-[260px,1fr]">
        <aside className="hidden space-y-8 rounded-3xl border border-surface-dark/5 bg-white p-6 shadow-soft lg:block">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-surface-dark/70">
            <span>Verfeinern</span>
            <button
              type="button"
              className="text-brand-dark"
              onClick={() =>
                setFilters({
                  categorySlug: '',
                  sort: 'featured',
                  priceRange: DEFAULT_PRICE_RANGE,
                  showOutOfStock: true,
                })
              }
            >
              Zurücksetzen
            </button>
          </div>

          <div className="space-y-3">
            <p className="text-xs uppercase tracking-wide text-surface-dark/60">Nicht vorrätig</p>
            <div className="flex gap-2 text-xs uppercase tracking-wide">
              <button
                className={`rounded-full border px-3 py-1 ${
                  filters.showOutOfStock ? 'border-surface-dark text-surface-dark' : 'border-surface-dark/10 text-surface-dark/50'
                }`}
                type="button"
                onClick={() => setFilters((prev) => ({ ...prev, showOutOfStock: true }))}
              >
                Anzeigen
              </button>
              <button
                className={`rounded-full border px-3 py-1 ${
                  !filters.showOutOfStock ? 'border-surface-dark text-surface-dark' : 'border-surface-dark/10 text-surface-dark/50'
                }`}
                type="button"
                onClick={() => setFilters((prev) => ({ ...prev, showOutOfStock: false }))}
              >
                Ausblenden
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs uppercase tracking-wide text-surface-dark/60">Preis</p>
            <div className="flex items-center gap-2 text-sm text-surface-dark/70">
              <input
                type="number"
                min={0}
                max={filters.priceRange[1]}
                value={filters.priceRange[0]}
                onChange={(event) => onPriceChange(0, Number(event.target.value))}
                className="w-20 rounded-md border border-surface-dark/10 px-2 py-1"
              />
              <span>-</span>
              <input
                type="number"
                min={filters.priceRange[0]}
                max={200}
                value={filters.priceRange[1]}
                onChange={(event) => onPriceChange(1, Number(event.target.value))}
                className="w-20 rounded-md border border-surface-dark/10 px-2 py-1"
              />
            </div>
            <div className="space-y-2">
              <input
                type="range"
                min={0}
                max={200}
                value={filters.priceRange[0]}
                onChange={(event) => onPriceChange(0, Number(event.target.value))}
                className="w-full accent-brand-dark"
              />
              <input
                type="range"
                min={0}
                max={200}
                value={filters.priceRange[1]}
                onChange={(event) => onPriceChange(1, Number(event.target.value))}
                className="w-full accent-brand-dark"
              />
              <p className="text-xs text-surface-dark/60">
                {formatEuros(filters.priceRange[0])} – {formatEuros(filters.priceRange[1])}
              </p>
            </div>
          </div>
        </aside>

        <section className="space-y-8">
          <div className="flex flex-col gap-4 border-b border-surface-dark/10 pb-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.4em] text-brand-dark">Produkte</p>
              <h2 className="font-display text-2xl text-surface-dark">
                {products.length} Produkte
              </h2>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-surface-dark/50">Sortieren</span>
              <select
                className="rounded-full border border-surface-dark/10 px-4 py-2 text-xs uppercase tracking-wide text-surface-dark/80"
                value={filters.sort}
                onChange={(event) => setFilters((prev) => ({ ...prev, sort: event.target.value }))}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {isLoading && <p className="text-sm text-surface-dark/60">Produkte werden geladen…</p>}
            {!isLoading && products.length === 0 && (
              <p className="col-span-full text-sm text-surface-dark/60">
                Keine Produkte gefunden. Passen Sie Ihre Filter an.
              </p>
            )}
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

