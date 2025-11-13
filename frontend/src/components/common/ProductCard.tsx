import { Link } from 'react-router-dom';
import type { Product } from '../../types/product';
import { formatCurrency } from '../../utils/formatCurrency';
import { useUIStore } from '../../store/uiStore';

type ProductCardProps = {
  product: Product;
};

const hasStock = (product: Product) => {
  const base = product.stock_quantity ?? 0;
  const variants = product.product_variants ?? [];
  const variantStock = variants.some((variant) => (variant.stock_quantity ?? 0) > 0);
  return base > 0 || variantStock;
};

export function ProductCard({ product }: ProductCardProps) {
  const currency = useUIStore((state) => state.currency);
  const primaryImage = product.product_images?.sort((a, b) => a.display_order - b.display_order)[0];
  const inStock = hasStock(product);

  return (
    <Link to={`/shop/${product.slug}`} className="group flex flex-col overflow-hidden rounded-[28px] bg-white shadow-soft">
      <div className="relative h-60 w-full overflow-hidden bg-surface-muted">
        {primaryImage ? (
          <img
            src={`${primaryImage.image_url}&w=600&auto=format`}
            alt={primaryImage.alt_text ?? product.name}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm uppercase tracking-wide text-surface-dark/50">
            Bild folgt
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

