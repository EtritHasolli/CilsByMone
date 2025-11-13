drop index if exists public.uq_product_variants_combination;

alter table public.product_variants
  add constraint product_variants_unique_combination unique (product_id, length_mm, curl, volume);

