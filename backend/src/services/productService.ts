import { PostgrestError } from '@supabase/supabase-js';
import { supabaseAdmin } from '../config/supabase';
import { Product } from '../types/catalog';

export interface ProductQueryParams {
  page?: number;
  pageSize?: number;
  categorySlug?: string;
  search?: string;
  featured?: boolean;
  sort?: 'featured' | 'price_asc' | 'price_desc' | 'newest' | 'name_asc' | 'name_desc';
  length?: number[];
  curl?: string[];
  volume?: string[];
  priceMin?: number;
  priceMax?: number;
}

const PRODUCT_SELECT = `
  *,
  product_images (*),
  product_variants (*)
`;

const mapSupabaseError = (error: PostgrestError | null) => {
  if (!error) return null;
  return Object.assign(new Error(error.message), { details: error.details, hint: error.hint });
};

export const productService = {
  async list(params: ProductQueryParams) {
    const {
      page = 1,
      pageSize = 12,
      categorySlug,
      search,
      featured,
      sort = 'featured',
      length,
      curl,
      volume,
      priceMin,
      priceMax,
    } = params;

    let categoryId: string | null = null;

    if (categorySlug) {
      const { data: categoryRecord, error: categoryError } = await supabaseAdmin
        .from('categories')
        .select('id')
        .eq('slug', categorySlug)
        .maybeSingle();

      if (categoryError) {
        throw Object.assign(new Error(categoryError.message), {
          details: categoryError.details,
          hint: categoryError.hint,
        });
      }

      categoryId = categoryRecord?.id ?? null;
    }

    let query = supabaseAdmin
      .from('products')
      .select(PRODUCT_SELECT, { count: 'exact' })
      .eq('is_active', true);

    if (categoryId) {
      query = query.eq('category_id', categoryId);
    }

    if (typeof featured === 'boolean') {
      query = query.eq('featured', featured);
    }

    if (search) {
      const like = `%${search}%`;
      query = query.or(`name.ilike.${like},description.ilike.${like},ingredients.ilike.${like}`);
    }

    if (priceMin !== undefined) {
      query = query.gte('base_price', priceMin);
    }

    if (priceMax !== undefined) {
      query = query.lte('base_price', priceMax);
    }

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    switch (sort) {
      case 'price_asc':
        query = query.order('base_price', { ascending: true });
        break;
      case 'price_desc':
        query = query.order('base_price', { ascending: false });
        break;
      case 'newest':
        query = query.order('created_at', { ascending: false });
        break;
      case 'name_asc':
        query = query.order('name', { ascending: true });
        break;
      case 'name_desc':
        query = query.order('name', { ascending: false });
        break;
      default:
        query = query.order('featured', { ascending: false }).order('updated_at', { ascending: false });
        break;
    }

    const { data, error, count } = await query.range(from, to);
    const mappedError = mapSupabaseError(error);
    if (mappedError) throw mappedError;

    let items = (data ?? []) as Product[];

    if (length?.length) {
      items = items.filter((product) =>
        product.product_variants?.some((variant) =>
          variant.length_mm !== null && length.includes(variant.length_mm)
        )
      );
    }

    if (curl?.length) {
      items = items.filter((product) =>
        product.product_variants?.some((variant) => variant.curl && curl.includes(variant.curl))
      );
    }

    if (volume?.length) {
      items = items.filter((product) =>
        product.product_variants?.some((variant) => variant.volume && volume.includes(variant.volume))
      );
    }

    const totalRecords = count ?? items.length;
    const totalPages = totalRecords ? Math.ceil(totalRecords / pageSize) : 0;

    return {
      data: items,
      pagination: {
        page,
        pageSize,
        total: totalRecords,
        totalPages,
      },
    };
  },

  async getBySlug(slug: string) {
    const { data, error } = await supabaseAdmin
      .from('products')
      .select(PRODUCT_SELECT)
      .eq('slug', slug)
      .maybeSingle();

    const mappedError = mapSupabaseError(error);
    if (mappedError) throw mappedError;
    if (!data) {
      const err = new Error('Product not found');
      Object.assign(err, { status: 404 });
      throw err;
    }
    return data as Product;
  },

  async getRelated(productId: string, limit = 6) {
    const { data, error } = await supabaseAdmin.rpc('fn_related_products', {
      p_product_id: productId,
      p_limit: limit,
    });
    const mappedError = mapSupabaseError(error);
    if (mappedError) throw mappedError;

    return (data ?? []) as Product[];
  },
};

