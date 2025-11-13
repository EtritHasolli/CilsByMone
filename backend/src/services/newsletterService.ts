import { z } from 'zod';
import { supabaseAdmin } from '../config/supabase';

const newsletterSchema = z.object({
  email: z.string().email(),
  source: z.string().optional(),
});

export const newsletterService = {
  async subscribe(payload: unknown) {
    const data = newsletterSchema.parse(payload);

    const { error } = await supabaseAdmin
      .from('newsletter_subscribers')
      .upsert(
        {
          email: data.email.toLowerCase(),
          source: data.source ?? 'website',
          subscribed_at: new Date().toISOString(),
        },
        {
          onConflict: 'email',
          ignoreDuplicates: false,
        }
      );

    if (error) {
      if (error.code === '23505') {
        const err = new Error('Email already subscribed');
        Object.assign(err, { status: 409 });
        throw err;
      }
      throw Object.assign(new Error(error.message), { details: error.details, hint: error.hint });
    }

    return { success: true };
  },
};

