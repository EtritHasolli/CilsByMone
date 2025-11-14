import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../../types/product';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatImageUrl } from '../../utils/imageUrl';
import { useUIStore } from '../../store/uiStore';
import { getLocalProductImage } from '../../utils/productImages';

type ProductCardProps = {
  product: Product;
  priority?: boolean; // For above-the-fold images
};

const hasStock = (product: Product) => {
  const base = product.stock_quantity ?? 0;
  const variants = product.product_variants ?? [];
  const variantStock = variants.some((variant) => (variant.stock_quantity ?? 0) > 0);
  return base > 0 || variantStock;
};

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const currency = useUIStore((state) => state.currency);
  const primaryImage = product.product_images?.sort((a, b) => a.display_order - b.display_order)[0];
  const inStock = hasStock(product);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Prefer local brand imagery from src/images based on product slug (thumbnail usage on list pages).
  // If there's no mapped local image, fall back to a lower-width remote image URL from the database.
  const localImageSrc = getLocalProductImage(product.slug);
  const dbImageSrc =
    primaryImage && formatImageUrl(primaryImage.image_url, 400, { auto: 'format' });
  const imageSrc = localImageSrc ?? dbImageSrc;

  return (
    <Link to={`/shop/${product.slug}`} className="group flex flex-col overflow-hidden rounded-[28px] bg-white shadow-soft">
      <div className="relative h-60 w-full overflow-hidden bg-surface-muted">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 animate-pulse bg-surface-dark/10" />
        )}
        {imageSrc && !imageError ? (
          <img
            src={imageSrc}
            alt={primaryImage?.alt_text ?? product.name}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            decoding="async"
            className={`h-full w-full object-cover transition duration-700 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageError(true);
              setImageLoaded(false);
            }}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm uppercase tracking-wide text-surface-dark/50">
            {imageError ? 'Bild nicht verfügbar' : 'Bild folgt'}
          </div>
        )}
        {!inStock && (
          <span className="absolute left-3 top-3 rounded-full bg-surface-dark px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
            Ausverkauft
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-4 px-5 pb-6 pt-4">
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.3em] text-surface-dark/50">
          <span>{product.category ?? 'Kollektion'}</span>
          {product.featured && <span className="text-brand-dark">Neu</span>}
        </div>
        <div className="space-y-1">
          <h3 className="font-display text-lg text-surface-dark">{product.name}</h3>
          <p className="text-sm text-surface-dark/60 line-clamp-2">{product.description}</p>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-base font-semibold text-surface-dark">{formatCurrency(product.base_price, currency)}</span>
          <span className="rounded-full border border-surface-dark/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-surface-dark/70 transition group-hover:border-surface-dark group-hover:text-surface-dark">
            Details
          </span>
        </div>
      </div>
    </Link>
  );
}

