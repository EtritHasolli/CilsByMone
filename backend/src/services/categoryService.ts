import { supabaseAdmin } from '../config/supabase';
import { Category } from '../types/catalog';

export const categoryService = {
  async list() {
    const { data, error } = await supabaseAdmin
      .from('categories')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      throw Object.assign(new Error(error.message), { details: error.details, hint: error.hint });
    }

    return (data ?? []) as Category[];
  },
};

