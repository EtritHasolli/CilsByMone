-- Sample categories
insert into public.categories (id, name, slug, description)
values
  (gen_random_uuid(), 'Classic Lashes', 'classic-lashes', 'Timeless lash extensions designed for everyday elegance.'),
  (gen_random_uuid(), 'Volume Lashes', 'volume-lashes', 'Feather-light volume fans for dramatic impact.'),
  (gen_random_uuid(), 'Tools & Accessories', 'tools-accessories', 'Professional-grade tools for lash artists and enthusiasts.'),
  (gen_random_uuid(), 'Aftercare & Prep', 'aftercare-prep', 'Gentle cleansers and primers to maintain lash health.')
on conflict (slug) do nothing;

-- Fetch category ids for reuse
with cat as (
  select slug, id from public.categories where slug in ('classic-lashes','volume-lashes','tools-accessories','aftercare-prep')
)
insert into public.products (
  id, name, sku, slug, description, ingredients, care_instructions,
  base_price, currency, stock_quantity, category_id, category, featured, is_active, seo_title, seo_description
)
values
  (
    gen_random_uuid(),
    'Classic Silk Lash Extensions',
    'CLS-001',
    'classic-silk-lash-extensions',
    'Lightweight silk extensions for a natural enhancement with a soft, seamless finish.',
    'Korean PBT fiber.',
    'Clean lashes prior to application; avoid oil-based products; brush daily.',
    24.00, 'USD', 320,
    (select id from cat where slug = 'classic-lashes'),
    'Classic Lashes',
    true, true,
    'Classic Silk Lash Extensions | Cils by Mone',
    'Natural-looking silk lashes with luxurious softness and flexible wear.'
  ),
  (
    gen_random_uuid(),
    'Volume Fan Lash Trays',
    'VOL-002',
    'volume-fan-lash-trays',
    'Pre-fanned volume trays crafted for ultra-light application and dramatic dimension.',
    'Korean PBT fiber.',
    'Store in cool, dry place; keep tray closed between uses.',
    32.00, 'USD', 210,
    (select id from cat where slug = 'volume-lashes'),
    'Volume Lashes',
    true, true,
    'Volume Fan Lash Trays | Cils by Mone',
    'Create high-impact volume sets quickly with consistent, hand-crafted fans.'
  ),
  (
    gen_random_uuid(),
    'Hybrid Lash Extensions Mix',
    'HYB-003',
    'hybrid-lash-extensions-mix',
    'Blend of classic and volume lashes ideal for textured, customized sets.',
    'Korean PBT fiber.',
    'Avoid humidity exposure; keep lash palette sanitized.',
    28.00, 'USD', 185,
    (select id from cat where slug = 'classic-lashes'),
    'Hybrid Lashes',
    false, true,
    'Hybrid Lash Extensions Mix | Cils by Mone',
    'Versatile hybrid trays combining classic and volume fibers for custom looks.'
  ),
  (
    gen_random_uuid(),
    'Mega Volume Lash Collection',
    'MEG-004',
    'mega-volume-lash-collection',
    'Ultra-fine lashes for bold mega volume styling with featherweight comfort.',
    'Korean PBT fiber.',
    'Allow adhesive to fully dry; replace trays every 6 months.',
    34.00, 'USD', 160,
    (select id from cat where slug = 'volume-lashes'),
    'Volume Lashes',
    true, true,
    'Mega Volume Lash Collection | Cils by Mone',
    'Deliver dramatic mega volume results with ultra-thin fiber bundles.'
  ),
  (
    gen_random_uuid(),
    'Professional Lash Adhesive - ProHold',
    'ADH-005',
    'professional-lash-adhesive-prohold',
    'Fast-curing adhesive formulated for sensitive eyes with exceptional retention.',
    'Cyanoacrylate, carbon black.',
    'Shake for 60 seconds; replace drop every 20 minutes; store upright.',
    29.00, 'USD', 95,
    (select id from cat where slug = 'tools-accessories'),
    'Adhesives',
    true, true,
    'ProHold Lash Adhesive | Cils by Mone',
    'Professional-grade lash adhesive with 1-second dry time and 7-week retention.'
  ),
  (
    gen_random_uuid(),
    'Precision Volume Tweezers',
    'TWZ-006',
    'precision-volume-tweezers',
    'Curved stainless steel tweezers engineered for effortless volume fan pickup.',
    'Surgical stainless steel.',
    'Clean after each use; store in protective case.',
    18.00, 'USD', 150,
    (select id from cat where slug = 'tools-accessories'),
    'Tools',
    false, true,
    'Precision Volume Tweezers | Cils by Mone',
    'Lightweight, perfectly calibrated tweezers for advanced lash artistry.'
  ),
  (
    gen_random_uuid(),
    'Lash Cleanse Foaming Bath',
    'CLN-007',
    'lash-cleanse-foaming-bath',
    'Gentle foaming cleanser that removes debris while protecting retention.',
    'Tea tree oil, aloe, chamomile.',
    'Use daily with lash cleansing brush; rinse thoroughly and pat dry.',
    16.00, 'USD', 240,
    (select id from cat where slug = 'aftercare-prep'),
    'Aftercare',
    true, true,
    'Lash Cleanse Foaming Bath | Cils by Mone',
    'Maintain lash health and longevity with a soothing, oil-free cleanser.'
  ),
  (
    gen_random_uuid(),
    'Prime & Prep Lash Elixir',
    'PRM-008',
    'prime-and-prep-lash-elixir',
    'Balances natural lash pH for superior adhesive bonding and retention.',
    'Witch hazel, chamomile extract.',
    'Apply sparingly before application; allow 30 seconds to dry.',
    15.00, 'USD', 180,
    (select id from cat where slug = 'aftercare-prep'),
    'Prep',
    false, true,
    'Prime & Prep Lash Elixir | Cils by Mone',
    'Boost retention with a lightweight primer that removes residue and balances pH.'
  )
on conflict (slug) do nothing;

-- Product variants (sample set)
insert into public.product_variants (
  product_id, length_mm, curl, volume, price_modifier, stock_quantity, low_stock_threshold, sku
)
select p.id, v.length_mm, v.curl, v.volume, v.price_modifier, v.stock_quantity, v.low_stock_threshold, v.sku
from (
  values
    ('classic-silk-lash-extensions', 8.0, 'J', 'Classic', 0, 60, 10, 'CLS-001-J8'),
    ('classic-silk-lash-extensions', 10.0, 'C', 'Classic', 2, 70, 10, 'CLS-001-C10'),
    ('classic-silk-lash-extensions', 12.0, 'D', 'Classic', 3, 60, 8, 'CLS-001-D12'),
    ('volume-fan-lash-trays', 10.0, 'C', 'Light Volume', 4, 50, 12, 'VOL-002-C10'),
    ('volume-fan-lash-trays', 12.0, 'D', 'Medium Volume', 5, 45, 12, 'VOL-002-D12'),
    ('mega-volume-lash-collection', 12.0, 'D', 'Mega Volume', 6, 40, 10, 'MEG-004-D12'),
    ('mega-volume-lash-collection', 14.0, 'L', 'Mega Volume', 7, 30, 10, 'MEG-004-L14'),
    ('hybrid-lash-extensions-mix', 11.0, 'C', 'Hybrid', 2, 55, 10, 'HYB-003-C11'),
    ('hybrid-lash-extensions-mix', 13.0, 'D', 'Hybrid', 3, 50, 10, 'HYB-003-D13')
) as v(slug, length_mm, curl, volume, price_modifier, stock_quantity, low_stock_threshold, sku)
join public.products p on p.slug = v.slug
on conflict (product_id, length_mm, curl, volume)
do update set
  price_modifier = excluded.price_modifier,
  stock_quantity = excluded.stock_quantity,
  low_stock_threshold = excluded.low_stock_threshold,
  sku = excluded.sku,
  updated_at = now();

-- Product images (placeholder Unsplash)
insert into public.product_images (product_id, image_url, alt_text, display_order)
select p.id, img.image_url, img.alt_text, img.display_order
from (
  values
    ('classic-silk-lash-extensions', 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9', 'Classic silk lashes styled on model', 1),
    ('volume-fan-lash-trays', 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9', 'Volume fan lash tray detail', 1),
    ('volume-fan-lash-trays', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1', 'Volume lash application close-up', 2),
    ('hybrid-lash-extensions-mix', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1', 'Hybrid lash mix textures', 1),
    ('mega-volume-lash-collection', 'https://images.unsplash.com/photo-1542838132-92c53300491e', 'Mega volume lash fans', 1),
    ('professional-lash-adhesive-prohold', 'https://images.unsplash.com/photo-1580844602444-1339cf0b5d7a', 'ProHold adhesive bottle', 1),
    ('precision-volume-tweezers', 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9', 'Precision tweezers detail', 1),
    ('lash-cleanse-foaming-bath', 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9', 'Lash cleanser foam pump', 1),
    ('prime-and-prep-lash-elixir', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1', 'Primer bottle with lashes', 1)
) as img(slug, image_url, alt_text, display_order)
join public.products p on p.slug = img.slug
on conflict do nothing;

-- Sample services
insert into public.services (name, description, duration_minutes, price, currency, image_url, category, highlighted)
values
  ('Signature Lash Application', 'Personalized lash extension application tailored to eye shape and style preferences.', 120, 180, 'USD', 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9', 'Application', true),
  ('Advanced Volume Mastery Training', 'Hands-on professional training covering mega volume techniques and retention best practices.', 240, 450, 'USD', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1', 'Training', true),
  ('Gentle Lash Removal & Rehab', 'Safe removal service paired with nourishing treatment to restore natural lash health.', 60, 75, 'USD', 'https://images.unsplash.com/photo-1542838132-92c53300491e', 'Treatment', false)
on conflict (name) do nothing;

-- Sample blog posts (markdown content)
insert into public.blog_posts (title, slug, excerpt, content, author, featured_image, published_at, status, seo_title, seo_description)
values
  (
    'Lash Aftercare: 7 Essentials for Long-Lasting Wear',
    'lash-aftercare-essentials',
    'Keep your extensions flawless with these stylist-approved aftercare rituals.',
    '# Lash Aftercare Essentials

Maintaining your extensions is easier than you think. Follow our daily routine, product recommendations, and pro tips for lashes that stay plush between fills.',
    'Moné Dupont',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1',
    now() - interval '21 days',
    'published',
    'Lash Aftercare Tips | Cils by Mone',
    'Top tips and stylist insights for extending the life of your lash extensions.'
  ),
  (
    'Choosing the Perfect Curl for Every Eye Shape',
    'choosing-perfect-lash-curl',
    'C, D, L? Decode lash curl types and discover your clients’ best match.',
    '# Curl Selector Guide

From subtle J curls to dramatic L lifts, learn how to create balance and open the eye using curl theory.',
    'Moné Dupont',
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9',
    now() - interval '14 days',
    'published',
    'Lash Curl Guide | Cils by Mone',
    'Understand lash curl types and how to tailor them to different eye shapes.'
  ),
  (
    'Prep Rituals That Boost Lash Retention',
    'prep-rituals-for-retention',
    'Prime and cleanse like a pro to secure flawless adhesion and happy clients.',
    '# Prep Rituals

Proper cleansing and priming are non-negotiable. We break down our pre-application checklist for consistent retention.',
    'Moné Dupont',
    'https://images.unsplash.com/photo-1542838132-92c53300491e',
    now() - interval '7 days',
    'published',
    'Lash Prep Rituals | Cils by Mone',
    'Everything you need to know to prep natural lashes for long-lasting extensions.'
  ),
  (
    'Trending Lash Maps for 2025',
    'trending-lash-maps-2025',
    'From angel sets to wispy siren styles, see the lash maps dominating this season.',
    '# Trending Lash Maps

Peek into our design notebook and explore 2025''s most requested lash maps, complete with layer breakdowns.',
    'Moné Dupont',
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9',
    now() - interval '3 days',
    'published',
    '2025 Lash Map Trends | Cils by Mone',
    'Discover the lash styling maps trending this season and how to recreate them.'
  ),
  (
    'How to Sanitize Lash Tools Like a Pro',
    'sanitize-lash-tools',
    'Keep every appointment safe with a streamlined sanitation workflow.',
    '# Sanitation Guide

Sanitation is safety. Follow our checklist for disinfecting tweezers, palettes, and more between clients.',
    'Moné Dupont',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1',
    now() - interval '1 day',
    'published',
    'Sanitize Lash Tools | Cils by Mone',
    'Professional lash tool sanitation checklist to protect clients and your business.'
  )
on conflict (slug) do nothing;

-- Newsletter subscribers
insert into public.newsletter_subscribers (email, subscribed_at, source, double_opt_in)
values
  ('lauren.browne@example.com', now() - interval '15 days', 'homepage', true),
  ('studio@lashesbyvera.com', now() - interval '10 days', 'checkout', false),
  ('beautypress@example.com', now() - interval '5 days', 'blog', true)
on conflict (email) do nothing;

-- Sample customers
insert into public.customers (email, name, phone, addresses, marketing_opt_in)
values
  ('lauren.browne@example.com', 'Lauren Browne', '+1-310-555-2481',
   '[{"label":"Studio","line1":"2456 Sunset Blvd","city":"Los Angeles","state":"CA","postal_code":"90026","country":"US"}]'::jsonb, true),
  ('studio@lashesbyvera.com', 'Vera Lashes Studio', '+1-917-555-1098',
   '[{"label":"Salon","line1":"88 Orchard St","city":"New York","state":"NY","postal_code":"10002","country":"US"}]'::jsonb, true)
on conflict (email) do nothing;

-- Sample reviews
insert into public.reviews (product_id, name, rating, comment, approved, created_at)
select p.id, r.name, r.rating, r.comment, r.approved, now() - r.days_ago
from (
  values
    ('classic-silk-lash-extensions', 'Elise G.', 5, 'Featherlight and natural—my clients are obsessed.', interval '12 days'),
    ('volume-fan-lash-trays', 'Dana P.', 5, 'Fans are consistent and easy to apply. Volume sets take half the time now.', interval '9 days'),
    ('lash-cleanse-foaming-bath', 'Maya R.', 4, 'Gentle cleanser that keeps retention strong. Smells fresh too!', interval '6 days')
) as r(slug, name, rating, comment, days_ago)
join public.products p on p.slug = r.slug
on conflict do nothing;

-- Acknowledge initial stock to avoid duplicate alerts
delete from public.inventory_alerts;

