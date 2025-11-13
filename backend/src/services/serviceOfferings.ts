import { supabaseAdmin } from '../config/supabase';
import { ServiceOffering } from '../types/catalog';

export const serviceOfferingsService = {
  async list() {
    const { data, error } = await supabaseAdmin
      .from('services')
      .select('*')
      .order('highlighted', { ascending: false })
      .order('name', { ascending: true });

    if (error) {
      throw Object.assign(new Error(error.message), { details: error.details, hint: error.hint });
    }

    return (data ?? []) as ServiceOffering[];
  },
};

