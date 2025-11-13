export type ProductImage = {
  id: string;
  product_id: string;
  image_url: string;
  alt_text: string | null;
  display_order: number;
};

export type ProductVariant = {
  id: string;
  product_id: string;
  length_mm: number | null;
  curl: string | null;
  volume: string | null;
  price_modifier: number;
  stock_quantity: number;
  low_stock_threshold: number;
  sku: string | null;
};

export type Product = {
  id: string;
  name: string;
  sku: string;
  slug: string;
  description: string | null;
  ingredients: string | null;
  care_instructions: string | null;
  base_price: number;
  currency: string;
  stock_quantity: number;
  category_id: string | null;
  category: string | null;
  featured: boolean;
  is_active: boolean;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
  product_images?: ProductImage[];
  product_variants?: ProductVariant[];
};

