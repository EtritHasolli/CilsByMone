-- Enable required extensions
create extension if not exists "pgcrypto";
create extension if not exists "uuid-ossp";
create extension if not exists "citext";

-- Custom types
do $$
begin
  if not exists (select 1 from pg_type where typname = 'order_status') then
    create type public.order_status as enum ('pending', 'requires_payment', 'paid', 'fulfilled', 'cancelled', 'refunded');
  end if;
  if not exists (select 1 from pg_type where typname = 'blog_status') then
    create type public.blog_status as enum ('draft', 'scheduled', 'published', 'archived');
  end if;
  if not exists (select 1 from pg_type where typname = 'inventory_alert_type') then
    create type public.inventory_alert_type as enum ('low_stock', 'out_of_stock', 'restocked');
  end if;
end$$;

-- Tables
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  sku text not null unique,
  slug text not null unique,
  description text,
  ingredients text,
  care_instructions text,
  base_price numeric(10,2) not null,
  currency text not null default 'USD',
  stock_quantity integer not null default 0,
  category_id uuid references public.categories(id) on delete set null,
  category text,
  featured boolean not null default false,
  is_active boolean not null default true,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  length_mm numeric(4,1),
  curl text,
  volume text,
  price_modifier numeric(10,2) not null default 0,
  stock_quantity integer not null default 0,
  low_stock_threshold integer not null default 5,
  sku text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint product_variants_unique_combination unique (product_id, length_mm, curl, volume)
);

create table if not exists public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  image_url text not null,
  alt_text text,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid references auth.users (id) on delete set null,
  email citext not null unique,
  name text,
  phone text,
  addresses jsonb default '[]'::jsonb,
  marketing_opt_in boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text not null,
  author text,
  featured_image text,
  published_at timestamptz,
  status blog_status not null default 'draft',
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  duration_minutes integer,
  price numeric(10,2),
  currency text not null default 'USD',
  image_url text,
  category text,
  highlighted boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  customer_id uuid references public.customers(id) on delete set null,
  customer_email citext not null,
  currency text not null default 'USD',
  subtotal numeric(10,2) not null default 0,
  shipping_total numeric(10,2) not null default 0,
  tax_total numeric(10,2) not null default 0,
  discount_total numeric(10,2) not null default 0,
  total numeric(10,2) not null default 0,
  status order_status not null default 'pending',
  shipping_address jsonb,
  billing_address jsonb,
  notes text,
  payment_intent_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid not null references public.products(id),
  variant_id uuid references public.product_variants(id),
  quantity integer not null check (quantity > 0),
  unit_price numeric(10,2) not null,
  currency text not null default 'USD',
  total_price numeric(10,2) not null,
  product_name text,
  variant_options jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email citext not null unique,
  subscribed_at timestamptz not null default now(),
  source text,
  double_opt_in boolean not null default false
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  customer_id uuid references public.customers(id) on delete set null,
  name text not null,
  rating integer not null check (rating between 1 and 5),
  comment text,
  approved boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.inventory_alerts (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  variant_id uuid references public.product_variants(id) on delete cascade,
  alert_type inventory_alert_type not null default 'low_stock',
  threshold integer not null,
  current_stock integer not null,
  generated_at timestamptz not null default now(),
  acknowledged boolean not null default false,
  acknowledged_at timestamptz,
  acknowledged_by uuid references auth.users(id),
  meta jsonb default '{}'::jsonb
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references auth.users(id) on delete set null,
  actor_email text,
  resource text not null,
  resource_id uuid,
  action text not null,
  payload jsonb,
  created_at timestamptz not null default now()
);

-- Indexes
create index if not exists idx_products_category_id on public.products(category_id);
create index if not exists idx_products_featured on public.products(featured) where featured = true;
create index if not exists idx_product_variants_product on public.product_variants(product_id);
create index if not exists idx_product_images_product on public.product_images(product_id);
create index if not exists idx_orders_customer on public.orders(customer_id);
create index if not exists idx_orders_status on public.orders(status);
create index if not exists idx_order_items_order on public.order_items(order_id);
create index if not exists idx_reviews_product on public.reviews(product_id);
create index if not exists idx_inventory_alerts_ack on public.inventory_alerts(acknowledged) where acknowledged = false;
create unique index if not exists uq_inventory_alerts_active
on public.inventory_alerts(variant_id, alert_type)
where acknowledged = false;

-- Helper functions
create or replace function public.fn_calculate_order_totals(p_order_id uuid)
returns void
language plpgsql
as $$
declare
  v_subtotal numeric(10,2);
  v_shipping numeric(10,2);
  v_tax numeric(10,2);
  v_discount numeric(10,2);
begin
  select coalesce(sum(total_price), 0) into v_subtotal
  from public.order_items
  where order_id = p_order_id;

  select coalesce(shipping_total, 0), coalesce(tax_total, 0), coalesce(discount_total, 0)
  into v_shipping, v_tax, v_discount
  from public.orders
  where id = p_order_id;

  update public.orders
  set subtotal = v_subtotal,
      total = greatest(v_subtotal + v_shipping + v_tax - v_discount, 0),
      updated_at = now()
  where id = p_order_id;
end;
$$;

create or replace function public.fn_adjust_inventory(p_order_id uuid)
returns void
language plpgsql
as $$
declare
  rec record;
begin
  for rec in
    select oi.variant_id, oi.quantity, pv.stock_quantity, pv.product_id
    from public.order_items oi
    join public.product_variants pv on pv.id = oi.variant_id
    where oi.order_id = p_order_id
      and oi.variant_id is not null
  loop
    update public.product_variants
    set stock_quantity = greatest(rec.stock_quantity - rec.quantity, 0),
        updated_at = now()
    where id = rec.variant_id;

    update public.products
    set stock_quantity = greatest(
      (select coalesce(sum(stock_quantity),0) from public.product_variants where product_id = rec.product_id),
      0
    ),
        updated_at = now()
    where id = rec.product_id;
  end loop;
end;
$$;

create or replace function public.fn_emit_low_stock_alert()
returns trigger
language plpgsql
as $$
declare
  v_product_id uuid;
  v_threshold integer;
begin
  v_product_id := new.product_id;
  v_threshold := new.low_stock_threshold;

  if new.stock_quantity <= 0 then
    insert into public.inventory_alerts (product_id, variant_id, alert_type, threshold, current_stock, meta)
    values (v_product_id, new.id, 'out_of_stock', v_threshold, new.stock_quantity, jsonb_build_object('message', 'Variant is out of stock'))
    on conflict do nothing;
  elsif new.stock_quantity <= v_threshold then
    insert into public.inventory_alerts (product_id, variant_id, alert_type, threshold, current_stock, meta)
    values (v_product_id, new.id, 'low_stock', v_threshold, new.stock_quantity, jsonb_build_object('message', 'Variant below threshold'))
    on conflict do nothing;
  end if;
  return new;
end;
$$;

create or replace function public.fn_order_paid_trigger()
returns trigger
language plpgsql
as $$
begin
  if new.status = 'paid' and old.status is distinct from 'paid' then
    perform public.fn_calculate_order_totals(new.id);
    perform public.fn_adjust_inventory(new.id);
  end if;
  return new;
end;
$$;

create or replace function public.fn_touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.fn_related_products(p_product_id uuid, p_limit integer default 6)
returns setof public.products
language sql
stable
as $$
  select p.*
  from public.products p
  where p.id <> p_product_id
    and (
      p.category_id = (select category_id from public.products where id = p_product_id)
      or p.category = (select category from public.products where id = p_product_id)
    )
    and p.is_active = true
  order by p.featured desc, p.updated_at desc
  limit greatest(p_limit, 1);
$$;

-- Triggers
create trigger trg_products_updated_at
before update on public.products
for each row execute function public.fn_touch_updated_at();

create trigger trg_product_variants_updated_at
before update on public.product_variants
for each row execute function public.fn_touch_updated_at();

create trigger trg_blog_posts_updated_at
before update on public.blog_posts
for each row execute function public.fn_touch_updated_at();

create trigger trg_services_updated_at
before update on public.services
for each row execute function public.fn_touch_updated_at();

create trigger trg_customers_updated_at
before update on public.customers
for each row execute function public.fn_touch_updated_at();

create trigger trg_orders_updated_at
before update on public.orders
for each row execute function public.fn_touch_updated_at();

create trigger trg_reviews_updated_at
before update on public.reviews
for each row execute function public.fn_touch_updated_at();

create trigger trg_product_variants_low_stock
after insert or update on public.product_variants
for each row execute function public.fn_emit_low_stock_alert();

create trigger trg_orders_paid
after update on public.orders
for each row execute function public.fn_order_paid_trigger();

-- Row Level Security
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_variants enable row level security;
alter table public.product_images enable row level security;
alter table public.customers enable row level security;
alter table public.blog_posts enable row level security;
alter table public.services enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.reviews enable row level security;
alter table public.inventory_alerts enable row level security;
alter table public.audit_logs enable row level security;

-- Helper expressions
create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select coalesce(auth.jwt() ->> 'is_admin', 'false') = 'true';
$$;

-- Categories policies
create policy "Allow public read categories"
on public.categories
for select
using (true);

create policy "Admins manage categories"
on public.categories
for all
using (public.is_admin() or auth.role() = 'service_role')
with check (public.is_admin() or auth.role() = 'service_role');

-- Products policies
create policy "Allow public read products"
on public.products
for select
using (is_active = true);

create policy "Admins manage products"
on public.products
for all
using (public.is_admin() or auth.role() = 'service_role')
with check (public.is_admin() or auth.role() = 'service_role');

-- Product variants policies
create policy "Allow public read product_variants"
on public.product_variants
for select
using (true);

create policy "Admins manage product_variants"
on public.product_variants
for all
using (public.is_admin() or auth.role() = 'service_role')
with check (public.is_admin() or auth.role() = 'service_role');

-- Product images policies
create policy "Allow public read product_images"
on public.product_images
for select
using (true);

create policy "Admins manage product_images"
on public.product_images
for all
using (public.is_admin() or auth.role() = 'service_role')
with check (public.is_admin() or auth.role() = 'service_role');

-- Blog posts policies
create policy "Allow public read published blog posts"
on public.blog_posts
for select
using (status = 'published');

create policy "Authenticated can read drafts they authored"
on public.blog_posts
for select
using (
  public.is_admin()
  or auth.role() = 'service_role'
);

create policy "Admins manage blog posts"
on public.blog_posts
for all
using (public.is_admin() or auth.role() = 'service_role')
with check (public.is_admin() or auth.role() = 'service_role');

-- Services policies
create policy "Allow public read services"
on public.services
for select
using (true);

create policy "Admins manage services"
on public.services
for all
using (public.is_admin() or auth.role() = 'service_role')
with check (public.is_admin() or auth.role() = 'service_role');

-- Customers policies
create policy "Customers manage their own profile"
on public.customers
for all
using (
  auth.role() = 'authenticated'
  and auth.uid() = auth_user_id
)
with check (
  auth.role() = 'authenticated'
  and auth.uid() = auth_user_id
);

create policy "Admins manage customers"
on public.customers
for all
using (public.is_admin() or auth.role() = 'service_role')
with check (public.is_admin() or auth.role() = 'service_role');

-- Orders policies
create policy "Customers read own orders"
on public.orders
for select
using (
  auth.role() = 'authenticated'
  and auth.uid() = (
    select auth_user_id from public.customers where id = customer_id
  )
);

create policy "Customers insert orders"
on public.orders
for insert
with check (
  auth.role() = 'authenticated'
  and (
    customer_id is null
    or customer_id in (
      select id from public.customers where auth_user_id = auth.uid()
    )
  )
);

create policy "Customers update own orders before paid"
on public.orders
for update
using (
  auth.role() = 'authenticated'
  and auth.uid() = (
    select auth_user_id from public.customers where id = customer_id
  )
  and status in ('pending', 'requires_payment')
)
with check (
  auth.role() = 'authenticated'
  and auth.uid() = (
    select auth_user_id from public.customers where id = customer_id
  )
  and status in ('pending', 'requires_payment')
);

create policy "Admins manage orders"
on public.orders
for all
using (public.is_admin() or auth.role() = 'service_role')
with check (public.is_admin() or auth.role() = 'service_role');

-- Order items policies
create policy "Customers manage own order items"
on public.order_items
for all
using (
  auth.role() = 'authenticated'
  and exists (
    select 1 from public.orders
    where id = order_id
      and (
        auth.uid() = (
          select auth_user_id from public.customers where id = customer_id
        )
        or customer_id is null
      )
  )
)
with check (
  auth.role() = 'authenticated'
  and exists (
    select 1 from public.orders
    where id = order_id
      and (
        auth.uid() = (
          select auth_user_id from public.customers where id = customer_id
        )
        or customer_id is null
      )
  )
);

create policy "Admins manage order items"
on public.order_items
for all
using (public.is_admin() or auth.role() = 'service_role')
with check (public.is_admin() or auth.role() = 'service_role');

-- Newsletter subscribers policies
create policy "Authenticated insert newsletter subscriber"
on public.newsletter_subscribers
for insert
with check (auth.role() = 'authenticated');

create policy "Admins read newsletter subscribers"
on public.newsletter_subscribers
for select
using (public.is_admin() or auth.role() = 'service_role');

create policy "Admins manage newsletter subscribers"
on public.newsletter_subscribers
for all
using (public.is_admin() or auth.role() = 'service_role')
with check (public.is_admin() or auth.role() = 'service_role');

-- Reviews policies
create policy "Public read approved reviews"
on public.reviews
for select
using (approved = true);

create policy "Authenticated create review"
on public.reviews
for insert
with check (auth.role() = 'authenticated');

create policy "Customers manage own pending reviews"
on public.reviews
for update
using (
  auth.role() = 'authenticated'
  and customer_id in (
    select id from public.customers where auth_user_id = auth.uid()
  )
  and approved = false
)
with check (
  auth.role() = 'authenticated'
  and customer_id in (
    select id from public.customers where auth_user_id = auth.uid()
  )
  and approved = false
);

create policy "Admins manage reviews"
on public.reviews
for all
using (public.is_admin() or auth.role() = 'service_role')
with check (public.is_admin() or auth.role() = 'service_role');

-- Inventory alerts policies
create policy "Admins manage inventory alerts"
on public.inventory_alerts
for all
using (public.is_admin() or auth.role() = 'service_role')
with check (public.is_admin() or auth.role() = 'service_role');

-- Audit logs policies
create policy "Admins manage audit logs"
on public.audit_logs
for all
using (public.is_admin() or auth.role() = 'service_role')
with check (public.is_admin() or auth.role() = 'service_role');

-- Views or helper definitions can be added in subsequent migrations.


