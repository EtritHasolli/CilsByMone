-- Additional products using local images
-- These products will use local image paths until uploaded to Supabase

-- Fetch category ids for reuse
with cat as (
  select slug, id from public.categories where slug in ('classic-lashes','volume-lashes','tools-accessories','aftercare-prep')
)
insert into public.products (
  id, name, sku, slug, description, ingredients, care_instructions,
  base_price, currency, stock_quantity, category_id, category, featured, is_active, seo_title, seo_description
)
values
  -- Lash Products
  (
    gen_random_uuid(),
    'Premium Classic Lash Extensions - Natural',
    'LASH-001',
    'premium-classic-lash-extensions-natural',
    'Ultra-fine classic lash extensions designed for a natural, everyday look. These lightweight extensions blend seamlessly with your natural lashes for subtle enhancement.',
    'Korean PBT fiber, medical-grade adhesive compatible.',
    'Clean lashes before application; avoid oil-based products; brush gently daily with a lash wand.',
    28.00, 'USD', 150,
    (select id from cat where slug = 'classic-lashes'),
    'Classic Lashes',
    true, true,
    'Premium Classic Lash Extensions | Cils by Mone',
    'Natural-looking classic lash extensions for everyday elegance and comfort.'
  ),
  (
    gen_random_uuid(),
    'Volume Lash Collection - Dramatic',
    'LASH-002',
    'volume-lash-collection-dramatic',
    'Hand-crafted volume lash fans for creating bold, dramatic looks. Each fan is meticulously formed for consistent application and stunning results.',
    'Korean PBT fiber, ultra-fine strands.',
    'Store in a cool, dry place; keep tray sealed when not in use; handle with precision tweezers only.',
    35.00, 'USD', 120,
    (select id from cat where slug = 'volume-lashes'),
    'Volume Lashes',
    true, true,
    'Volume Lash Collection - Dramatic | Cils by Mone',
    'Create stunning volume sets with our premium hand-crafted lash fans.'
  ),
  (
    gen_random_uuid(),
    'Hybrid Lash Extension Set',
    'LASH-003',
    'hybrid-lash-extension-set',
    'Perfect blend of classic and volume lashes for a textured, customized appearance. Ideal for clients seeking dimension without overwhelming their natural lashes.',
    'Korean PBT fiber blend.',
    'Maintain proper humidity levels during storage; sanitize tools between uses.',
    32.00, 'USD', 140,
    (select id from cat where slug = 'classic-lashes'),
    'Hybrid Lashes',
    false, true,
    'Hybrid Lash Extension Set | Cils by Mone',
    'Versatile hybrid lash set combining classic and volume techniques for custom looks.'
  ),
  (
    gen_random_uuid(),
    'Mega Volume Lash Trays',
    'LASH-004',
    'mega-volume-lash-trays',
    'Ultra-fine mega volume lashes for the most dramatic looks. These featherweight extensions allow for maximum density while maintaining comfort.',
    'Korean PBT fiber, ultra-thin strands.',
    'Allow adhesive to fully cure; replace trays every 6 months for optimal quality.',
    38.00, 'USD', 100,
    (select id from cat where slug = 'volume-lashes'),
    'Volume Lashes',
    true, true,
    'Mega Volume Lash Trays | Cils by Mone',
    'Achieve maximum volume with our ultra-fine mega volume lash collection.'
  ),
  (
    gen_random_uuid(),
    'Wispy Lash Extension Collection',
    'LASH-005',
    'wispy-lash-extension-collection',
    'Trendy wispy lash extensions that create a soft, fluttery effect. Perfect for achieving that modern, angelic look that''s currently trending.',
    'Korean PBT fiber, varied lengths.',
    'Apply with strategic placement for best wispy effect; brush daily to maintain separation.',
    30.00, 'USD', 130,
    (select id from cat where slug = 'classic-lashes'),
    'Classic Lashes',
    false, true,
    'Wispy Lash Extension Collection | Cils by Mone',
    'Create soft, fluttery looks with our trendy wispy lash extension collection.'
  ),
  (
    gen_random_uuid(),
    'Cat Eye Lash Extension Set',
    'LASH-006',
    'cat-eye-lash-extension-set',
    'Specialty cat eye lash set designed to elongate and lift the outer corners. Creates a sultry, almond-shaped eye appearance.',
    'Korean PBT fiber, graduated lengths.',
    'Follow cat eye mapping guide for optimal placement; maintain outer corner length.',
    29.00, 'USD', 125,
    (select id from cat where slug = 'classic-lashes'),
    'Classic Lashes',
    false, true,
    'Cat Eye Lash Extension Set | Cils by Mone',
    'Achieve the perfect cat eye look with our specialty graduated lash extension set.'
  ),
  (
    gen_random_uuid(),
    'Doll Eye Lash Collection',
    'LASH-007',
    'doll-eye-lash-collection',
    'Doll eye lash extensions that open and widen the eyes for a youthful, doe-eyed appearance. Center-focused length creates a rounded, open look.',
    'Korean PBT fiber, center-focused mapping.',
    'Apply longest lashes to center of eye; maintain symmetry for best doll effect.',
    31.00, 'USD', 135,
    (select id from cat where slug = 'classic-lashes'),
    'Classic Lashes',
    false, true,
    'Doll Eye Lash Collection | Cils by Mone',
    'Create wide, youthful eyes with our doll eye lash extension collection.'
  ),
  (
    gen_random_uuid(),
    'Natural Lash Extension Tray',
    'LASH-008',
    'natural-lash-extension-tray',
    'Ultra-natural lash extensions that enhance without looking obvious. Perfect for clients who want subtle enhancement for everyday wear.',
    'Korean PBT fiber, natural brown/black blend.',
    'Apply with light touch; these blend seamlessly with natural lashes.',
    26.00, 'USD', 160,
    (select id from cat where slug = 'classic-lashes'),
    'Classic Lashes',
    true, true,
    'Natural Lash Extension Tray | Cils by Mone',
    'Subtle, natural-looking lash extensions for everyday enhancement.'
  ),
  -- Face Products
  (
    gen_random_uuid(),
    'Hydrating Face Serum',
    'FACE-001',
    'hydrating-face-serum',
    'Intensive hydrating serum formulated with hyaluronic acid and botanical extracts. Provides deep moisture for plump, radiant skin.',
    'Hyaluronic acid, niacinamide, aloe vera, chamomile extract.',
    'Apply 2-3 drops to clean face morning and evening; gently pat into skin until absorbed.',
    42.00, 'USD', 80,
    (select id from cat where slug = 'aftercare-prep'),
    'Skincare',
    true, true,
    'Hydrating Face Serum | Cils by Mone',
    'Deeply hydrate and plump your skin with our intensive face serum.'
  ),
  (
    gen_random_uuid(),
    'Vitamin C Brightening Cream',
    'FACE-002',
    'vitamin-c-brightening-cream',
    'Luxurious vitamin C cream that brightens and evens skin tone. Reduces appearance of dark spots and promotes a radiant, glowing complexion.',
    'Vitamin C (L-ascorbic acid), vitamin E, jojoba oil, shea butter.',
    'Apply to clean skin in the morning; use SPF during the day; store in a cool, dark place.',
    48.00, 'USD', 75,
    (select id from cat where slug = 'aftercare-prep'),
    'Skincare',
    true, true,
    'Vitamin C Brightening Cream | Cils by Mone',
    'Brighten and even your skin tone with our potent vitamin C cream.'
  ),
  (
    gen_random_uuid(),
    'Gentle Cleansing Balm',
    'FACE-003',
    'gentle-cleansing-balm',
    'Rich, nourishing cleansing balm that melts away makeup and impurities while maintaining skin''s natural moisture barrier. Suitable for all skin types.',
    'Jojoba oil, shea butter, chamomile, calendula extract.',
    'Massage onto dry skin, add water to emulsify, then rinse thoroughly. Follow with your regular cleanser if desired.',
    38.00, 'USD', 90,
    (select id from cat where slug = 'aftercare-prep'),
    'Skincare',
    false, true,
    'Gentle Cleansing Balm | Cils by Mone',
    'Remove makeup and cleanse gently with our nourishing cleansing balm.'
  ),
  (
    gen_random_uuid(),
    'Retinol Night Repair Cream',
    'FACE-004',
    'retinol-night-repair-cream',
    'Advanced retinol night cream that works while you sleep to reduce fine lines, improve texture, and promote cell renewal. Formulated for sensitive skin.',
    'Retinol, peptides, ceramides, niacinamide, squalane.',
    'Apply at night to clean, dry skin; start with 2-3 times per week; always use SPF during the day.',
    55.00, 'USD', 65,
    (select id from cat where slug = 'aftercare-prep'),
    'Skincare',
    true, true,
    'Retinol Night Repair Cream | Cils by Mone',
    'Wake up to smoother, younger-looking skin with our advanced retinol night cream.'
  ),
  (
    gen_random_uuid(),
    'Soothing Face Mask',
    'FACE-005',
    'soothing-face-mask',
    'Calming face mask enriched with aloe and cucumber to soothe irritated skin and reduce redness. Perfect for sensitive or reactive skin types.',
    'Aloe vera, cucumber extract, chamomile, allantoin, hyaluronic acid.',
    'Apply a thin layer to clean skin, leave on for 15-20 minutes, then rinse with warm water. Use 1-2 times per week.',
    32.00, 'USD', 100,
    (select id from cat where slug = 'aftercare-prep'),
    'Skincare',
    false, true,
    'Soothing Face Mask | Cils by Mone',
    'Calm and soothe your skin with our gentle, hydrating face mask.'
  ),
  (
    gen_random_uuid(),
    'Antioxidant Day Cream',
    'FACE-006',
    'antioxidant-day-cream',
    'Lightweight day cream packed with antioxidants to protect skin from environmental damage. Provides hydration without feeling heavy or greasy.',
    'Vitamin E, green tea extract, vitamin C, hyaluronic acid, SPF 30.',
    'Apply as the final step of your morning skincare routine; reapply SPF if spending extended time outdoors.',
    45.00, 'USD', 85,
    (select id from cat where slug = 'aftercare-prep'),
    'Skincare',
    true, true,
    'Antioxidant Day Cream | Cils by Mone',
    'Protect and hydrate your skin with our antioxidant-rich day cream.'
  )
on conflict (slug) do nothing;

-- Product images using local image paths
-- Note: Images are in frontend/public/images/ and can be accessed as /images/filename.jpg
-- Update these paths to Supabase URLs once images are uploaded to Supabase Storage
insert into public.product_images (product_id, image_url, alt_text, display_order)
select p.id, img.image_url, img.alt_text, img.display_order
from (
  values
    ('premium-classic-lash-extensions-natural', '/images/1.jpg', 'Premium classic lash extensions natural style', 1),
    ('volume-lash-collection-dramatic', '/images/2.jpg', 'Volume lash collection dramatic look', 1),
    ('hybrid-lash-extension-set', '/images/4.jpg', 'Hybrid lash extension set', 1),
    ('mega-volume-lash-trays', '/images/7.jpg', 'Mega volume lash trays', 1),
    ('wispy-lash-extension-collection', '/images/8.jpg', 'Wispy lash extension collection', 1),
    ('cat-eye-lash-extension-set', '/images/9.jpg', 'Cat eye lash extension set', 1),
    ('doll-eye-lash-collection', '/images/12.jpg', 'Doll eye lash collection', 1),
    ('natural-lash-extension-tray', '/images/13.jpg', 'Natural lash extension tray', 1),
    ('hydrating-face-serum', '/images/14.jpg', 'Hydrating face serum bottle', 1),
    ('vitamin-c-brightening-cream', '/images/15.jpg', 'Vitamin C brightening cream', 1),
    ('gentle-cleansing-balm', '/images/19.jpg', 'Gentle cleansing balm', 1),
    ('retinol-night-repair-cream', '/images/20.jpg', 'Retinol night repair cream', 1),
    ('soothing-face-mask', '/images/D1.jpg', 'Soothing face mask', 1),
    ('antioxidant-day-cream', '/images/YY-D1.jpg', 'Antioxidant day cream', 1)
) as img(slug, image_url, alt_text, display_order)
join public.products p on p.slug = img.slug
on conflict do nothing;

