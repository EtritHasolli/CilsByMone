import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { api } from '../../lib/api';
import type { Product } from '../../types/product';
import { formatCurrency } from '../../utils/formatCurrency';
import { useUIStore } from '../../store/uiStore';
import { ProductCard } from '../../components/common/ProductCard';
import { useCartStore } from '../../store/cartStore';
import { QuantitySelector } from '../../components/ui/QuantitySelector';

type RelatedProduct = Product;

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const currency = useUIStore((state) => state.currency);
  const addToCart = useCartStore((state) => state.addItem);

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', slug],
    enabled: Boolean(slug),
    queryFn: async () => {
      const response = await api.get<Product>(`/products/${slug}`);
      return response.data;
    },
  });

  const { data: related } = useQuery({
    queryKey: ['product', slug, 'related'],
    enabled: Boolean(product?.id),
    queryFn: async () => {
      if (!product) return [];
      const response = await api.get<RelatedProduct[]>(`/products/${product.id}/related`);
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="container py-16">
        <p className="text-sm text-surface-dark/60">Loading product details…</p>
      </div>
    );
  }

  const [selectedLength, setSelectedLength] = useState<number | null>(null);
  const [selectedCurl, setSelectedCurl] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product?.product_variants?.length) {
      const firstVariant = product.product_variants[0];
      setSelectedLength(firstVariant.length_mm ?? null);
      setSelectedCurl(firstVariant.curl ?? null);
    } else {
      setSelectedLength(null);
      setSelectedCurl(null);
    }
    setQuantity(1);
  }, [product?.id]);

  const lengths = useMemo(
    () =>
      Array.from(
        new Set(
          (product?.product_variants ?? [])
            .map((variant) => variant.length_mm)
            .filter((value): value is number => value !== null && value !== undefined)
        )
      ),
    [product?.product_variants]
  );

  const curls = useMemo(
    () =>
      Array.from(
        new Set(
          (product?.product_variants ?? [])
            .map((variant) => variant.curl)
            .filter((value): value is string => Boolean(value))
        )
      ),
    [product?.product_variants]
  );

  const selectedVariant = useMemo(() => {
    if (!product?.product_variants?.length) return null;

    const match = product.product_variants.find((variant) => {
      const lengthMatches =
        selectedLength === null || selectedLength === undefined || variant.length_mm === selectedLength;
      const curlMatches = !selectedCurl || variant.curl === selectedCurl;
      return lengthMatches && curlMatches;
    });

    return match ?? product.product_variants[0];
  }, [product?.product_variants, selectedLength, selectedCurl]);

  const displayPrice = useMemo(() => {
    if (!product) return 0;
    const modifier = selectedVariant?.price_modifier ?? 0;
    return product.base_price + modifier;
  }, [product, selectedVariant]);

  const handleSelectLength = (length: number) => {
    setSelectedLength(length);
    if (!product?.product_variants) return;
    const withLength = product.product_variants.filter((variant) => variant.length_mm === length);
    if (withLength.length) {
      const match = withLength.find((variant) => !selectedCurl || variant.curl === selectedCurl);
      if (!match) {
        setSelectedCurl(withLength[0].curl ?? null);
      }
    }
  };

  const handleSelectCurl = (curl: string) => {
    setSelectedCurl(curl);
    if (!product?.product_variants) return;
    const withCurl = product.product_variants.filter((variant) => variant.curl === curl);
    if (withCurl.length) {
      const match = withCurl.find(
        (variant) => selectedLength === null || selectedLength === undefined || variant.length_mm === selectedLength
      );
      if (!match) {
        setSelectedLength(withCurl[0].length_mm ?? null);
      }
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      productId: product.id,
      variantId: selectedVariant?.id,
      name: product.name,
      price: displayPrice,
      currency: product.currency,
      quantity,
      image: product.product_images?.[0]?.image_url ?? null,
      options: {
        length_mm: selectedVariant?.length_mm ?? null,
        curl: selectedVariant?.curl ?? null,
        volume: selectedVariant?.volume ?? null,
      },
    });
  };

  if (!product) {
    return (
      <div className="container py-16">
        <p className="text-sm text-surface-dark/80">Product unavailable. Try browsing the <Link to="/shop" className="text-brand-dark underline">shop</Link>.</p>
      </div>
    );
  }

  const primaryImage = product.product_images?.sort((a, b) => a.display_order - b.display_order)[0];

  return (
    <div className="pb-16">
      <nav className="container flex items-center gap-2 py-6 text-xs uppercase tracking-wide text-surface-dark/60">
        <Link to="/" className="hover:text-brand-dark">
          Home
        </Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-brand-dark">
          Shop
        </Link>
        <span>/</span>
        <span className="text-surface-dark">{product.name}</span>
      </nav>

      <section className="container grid gap-12 lg:grid-cols-[1.1fr,1fr]">
        <div className="grid gap-4 lg:grid-cols-[100px,1fr]">
          <div className="flex gap-3 lg:flex-col">
            {product.product_images?.map((image) => (
              <img
                key={image.id}
                src={`${image.image_url}&w=200&auto=format`}
                alt={image.alt_text ?? product.name}
                className="h-20 w-20 rounded-xl object-cover shadow-soft lg:w-full"
              />
            ))}
          </div>
          <div className="overflow-hidden rounded-3xl bg-white shadow-soft">
            {primaryImage ? (
              <img
                src={`${primaryImage.image_url}&w=900&auto=format`}
                alt={primaryImage.alt_text ?? product.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center p-10 text-sm text-surface-dark/60">
                Image coming soon.
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-brand-dark">{product.category ?? 'Lashes'}</p>
            <h1 className="mt-3 font-display text-3xl text-surface-dark">{product.name}</h1>
            <p className="mt-2 text-sm text-surface-dark/60">SKU: {product.sku}</p>
          </div>

          <p className="text-2xl font-semibold text-surface-dark">
            {formatCurrency(displayPrice, currency)}
          </p>

          <div className="space-y-4 rounded-3xl bg-white p-6 shadow-soft">
            <p className="font-semibold text-surface-dark">Available Options</p>
            <div className="grid gap-4">
              {!!lengths.length && (
                <div>
                  <p className="text-xs uppercase tracking-wide text-surface-dark/60">Lengths</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {lengths.map((length) => (
                      <button
                        key={length}
                        className={`rounded-full border px-3 py-1 text-xs transition ${
                          selectedLength === length
                            ? 'border-brand-dark bg-brand-light/60 text-surface-dark'
                            : 'border-surface-dark/10 text-surface-dark/80 hover:border-brand-dark hover:text-brand-dark'
                        }`}
                        type="button"
                        onClick={() => handleSelectLength(length)}
                      >
                        {length} mm
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {!!curls.length && (
                <div>
                  <p className="text-xs uppercase tracking-wide text-surface-dark/60">Curl</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {curls.map((curl) => (
                      <button
                        key={curl}
                        className={`rounded-full border px-3 py-1 text-xs transition ${
                          selectedCurl === curl
                            ? 'border-brand-dark bg-brand-light/60 text-surface-dark'
                            : 'border-surface-dark/10 text-surface-dark/80 hover:border-brand-dark hover:text-brand-dark'
                        }`}
                        type="button"
                        onClick={() => handleSelectCurl(curl)}
                      >
                        {curl}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <QuantitySelector value={quantity} onChange={setQuantity} />
              <span className="text-sm font-semibold text-surface-dark/70">
                In stock:{' '}
                {selectedVariant?.stock_quantity ?? product.stock_quantity ?? 0}
              </span>
            </div>

            <button
              className="w-full rounded-full bg-surface-dark px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-surface-dark/90"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>

          <div className="space-y-4">
            <details className="rounded-2xl bg-white p-6 shadow-soft" open>
              <summary className="text-sm font-semibold text-surface-dark">Product Description</summary>
              <p className="mt-3 text-sm leading-relaxed text-surface-dark/70">{product.description}</p>
            </details>
            {product.ingredients && (
              <details className="rounded-2xl bg-white p-6 shadow-soft">
                <summary className="text-sm font-semibold text-surface-dark">Ingredients</summary>
                <p className="mt-3 text-sm leading-relaxed text-surface-dark/70">{product.ingredients}</p>
              </details>
            )}
            {product.care_instructions && (
              <details className="rounded-2xl bg-white p-6 shadow-soft">
                <summary className="text-sm font-semibold text-surface-dark">Care Instructions</summary>
                <p className="mt-3 text-sm leading-relaxed text-surface-dark/70">{product.care_instructions}</p>
              </details>
            )}
          </div>
        </div>
      </section>

      {related && related.length > 0 && (
        <section className="container mt-16">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl text-surface-dark">Clients also love</h2>
            <Link to="/shop" className="text-sm font-semibold uppercase tracking-wide text-brand-dark">
              View all products
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

