import { supabaseAdmin } from '../config/supabase';
import { BlogPost } from '../types/catalog';

export const blogService = {
  async list(limit?: number) {
    let query = supabaseAdmin
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;
    if (error) {
      throw Object.assign(new Error(error.message), { details: error.details, hint: error.hint });
    }

    return (data ?? []) as BlogPost[];
  },

  async getBySlug(slug: string) {
    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .maybeSingle();

    if (error) {
      throw Object.assign(new Error(error.message), { details: error.details, hint: error.hint });
    }

    if (!data) {
      const err = new Error('Blog post not found');
      Object.assign(err, { status: 404 });
      throw err;
    }

    return data as BlogPost;
  },
};

