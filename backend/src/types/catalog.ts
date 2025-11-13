export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
}

export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  alt_text: string | null;
  display_order: number;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  length_mm: number | null;
  curl: string | null;
  volume: string | null;
  price_modifier: number;
  stock_quantity: number;
  low_stock_threshold: number;
  sku: string | null;
}

export interface Product {
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
}

export interface Review {
  id: string;
  product_id: string;
  name: string;
  rating: number;
  comment: string | null;
  approved: boolean;
  created_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  author: string | null;
  featured_image: string | null;
  published_at: string | null;
  status: 'draft' | 'scheduled' | 'published' | 'archived';
  seo_title: string | null;
  seo_description: string | null;
}

export interface ServiceOffering {
  id: string;
  name: string;
  description: string | null;
  duration_minutes: number | null;
  price: number | null;
  currency: string;
  image_url: string | null;
  category: string | null;
  highlighted: boolean;
}

