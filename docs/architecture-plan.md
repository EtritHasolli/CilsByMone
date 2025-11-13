## Architecture & Implementation Plan

### 1. Overview
- **Stack**: Vite, React, TypeScript, Supabase (Postgres + Auth + Storage), Tailwind CSS, Stripe Checkout (primary), Shopify Buy SDK (optional fallback).
- **Hosting**: Vercel (recommended for frontend); Supabase managed backend (database, auth, storage, edge functions).
- **Structure**: Monorepo-ready layout with `frontend/` (SPA + admin), `backend/` (API routes or serverless functions), `db/` (migrations, seeds), `docs/` (guides).

### 2. Database Layer (Supabase)
- **Tables**  
  - `products`: core catalog data including SEO slugs and merchandising flags.  
  - `product_variants`: length/curl/volume options with price overrides and stock.  
  - `product_images`: ordered image set per product.  
  - `categories`: hierarchical classification.  
  - `blog_posts`: markdown content, status, metadata.  
  - `services`: in-salon offerings.  
  - `orders`, `order_items`: transactional records with pricing snapshots.  
  - `customers`: account profiles, JSON `addresses`.  
  - `newsletter_subscribers`, `reviews`.  
  - `inventory_alerts`: auto-generated low-stock records for admin notifications.  
  - `audit_logs`: optional but recommended for tracking admin actions.
- **Policies (RLS)**  
  - Enable RLS on all tables.  
  - Public `SELECT` via `anon` role for storefront tables (`products`, `categories`, `product_images`, approved `reviews`, published `blog_posts`, `services`).  
  - Authenticated shoppers (`authenticated` role) can insert into `orders`, `order_items`, `newsletter_subscribers`, and draft `reviews` limited to their user.  
  - Admin group (managed via Supabase Auth with `is_admin` claim) has full write access.  
  - `inventory_alerts` and `audit_logs` restricted to admin/service role access.
- **Functions & Triggers**  
  - `fn_adjust_inventory(order_id uuid)` to decrement stock quantities per variant upon payment confirmation.  
  - `fn_check_low_stock()` to insert into `inventory_alerts` when thresholds are crossed.  
  - `fn_calculate_order_totals(order_id)` for subtotal, shipping placeholder, taxes, total.  
  - `fn_related_products(product_id uuid)` leveraging category/variant similarity.  
  - `trigger_update_timestamp` for `updated_at` maintenance.  
  - `trigger_low_stock` on `product_variants` after update, calling `fn_check_low_stock`.
- **Migrations & Seeds**  
  - SQL migrations in `db/migrations` using Supabase CLI.  
  - `db/seeds` TypeScript script (or SQL) inserts sample catalog, services, blog posts, testimonials, newsletter subscribers.  
  - Seed markdown blog posts stored in `db/seed/blog/` for reuse.

### 3. Backend & Services
- **Configuration**  
  - `backend/` (or `src/server/`) with Supabase JS client instantiated via `supabaseClient.ts`.  
  - Environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `STRIPE_SECRET_KEY`, etc.) defined in `.env` / `.env.local`.
- **API Modules**  
  - `products`: list, detail, filtering, search, pagination.  
  - `variants`: pricing aggregation, availability.  
  - `cart`: localStorage sync, server fallback for logged-in customers.  
  - `orders`: create order, trigger payment session, inventory adjustments.  
  - `blog`: fetch published posts, single post.  
  - `newsletter`: validate, persist.  
  - `currency`: convert & format (uses exchange rate service/cache).  
  - `imageUpload`: placeholder integration hooks for Supabase Storage / Cloudinary.  
  - `csv`: import/export utilities using PapaParse.  
  - `search`: fuzzy search via Fuse.js-like library.  
  - `auth`: Supabase Auth helpers, session guards, admin claim checks.  
  - `notifications`: inventory alert fetching, mark-as-read.  
  - `analytics`: placeholder dataset for dashboard cards.
- **Payment Integration**  
  - Stripe Checkout session creation; webhook handler updates `orders`.  
  - Shopify Buy SDK module documented with swap instructions.  
  - Retry logic, failure messaging.  
  - Refund admin workflow stub.

### 4. Frontend Structure (React + Vite)
- **Routing**: React Router with public storefront, blog, services, admin routes.  
- **State Management**: React Query for data fetching, Zustand (or Redux Toolkit) for cart/session state, Context for currency.  
- **Styling**: Tailwind CSS + component primitives; integrate Headless UI for accessible components.  
- **Directories**  
  - `src/components`: shared UI (buttons, inputs, modals, toasts).  
  - `src/features`: domain modules (`catalog`, `cart`, `checkout`, `blog`, `admin`).  
  - `src/pages`: route-level pages.  
  - `src/services`: API client wrappers.  
  - `src/utils`: helpers (currency, formatting, SEO).  
  - `src/hooks`: custom hooks (`useCart`, `useCurrency`, `useInventoryAlerts`).  
  - `src/providers`: context providers (theme, auth, query).

### 5. Key UI Deliverables
- **Global**: Header, footer, nav drawer, announcement banner, breadcrumb, currency selector, region modal, skeleton loaders, error boundary, toasts, cookie consent, accessibility hooks, PWA manifest.  
- **Home**: Hero, featured collections, bestsellers carousel, testimonials, IG placeholder, value props, newsletter CTA, brand story, SEO tags.  
- **Shop**: Filter sidebar/drawer, price slider, sort dropdown, product grid, quick view modal, pagination/infinite scroll, empty state.  
- **Product Detail**: Gallery, zoom, variant selectors, stock badge, quantity control, add-to-cart states, accordion info, related products, reviews, structured data, share buttons, recently viewed.  
- **Cart/Checkout**: Slide-out cart, checkout page, shipping selector, order summary, payment placeholders, confirmation page, tracking stub, abandoned cart notes.  
- **Services**: Listings, detail pages, booking CTA, courses, FAQ, contact form, schema.  
- **Blog & Content**: Blog index, filters, post template (markdown render + live preview editor in admin), related posts, schema, static content (About, Contact, FAQ, policies, sitemap).  
- **Admin**: Auth flow, dashboard, product CRUD with variant manager, bulk actions, CSV tools, orders & customers management, blog editor (markdown + preview), media library placeholder, site settings, analytics placeholder, alerts center for low stock, role-based protection.

### 6. Inventory Alerts Implementation
- `trigger_low_stock` monitors `product_variants.stock_quantity`.  
- Inserts into `inventory_alerts` when stock < configurable threshold.  
- Admin dashboard surfaces `inventory_alerts` feed with acknowledge button.  
- Email/webhook placeholder for future automation.  
- Settings allow per-variant reorder point input.  
- Scheduled job outline for periodic checks (documented).

### 7. Currency & Pricing
- Context provider maintains selected currency.  
- Fetch exchange rates from configurable API (placeholder with static seed).  
- Pricing displayed via `PriceDisplay` component.  
- Orders store currency + conversion rate snapshot.  
- Admin settings allow manual override of rates.

### 8. SEO, Performance, Accessibility
- Dynamic meta component with React Helmet alternative.  
- Sitemap generator script consuming Supabase data via service layer.  
- Robots.txt scaffold.  
- JSON-LD builders for product, blog, organization, breadcrumbs.  
- Lazy loading, responsive images, code splitting via React.lazy.  
- Web Vitals reporting hook tied to analytics placeholder.  
- Comprehensive ARIA, keyboard support, WCAG contrast compliance.

### 9. Testing Strategy
- Unit tests via Vitest + Testing Library for components and hooks.  
- Integration tests for services (API mocks).  
- E2E tests using Playwright for key flows (browse, cart, checkout, admin login).  
- Schema tests using db seed verification.  
- CI configuration placeholder (GitHub Actions).

### 10. Documentation Deliverables
- `README.md`: project intro, features.  
- `docs/setup.md`: environment setup, Supabase project configuration.  
- `docs/env.example`.  
- `docs/deployment.md`: Vercel/Netlify/custom steps.  
- `docs/api.md`: endpoints, data contracts.  
- `docs/components.md`: key component props.  
- `docs/customization.md`: branding/theme guidance.  
- `docs/payment.md`: Stripe/Shopify setup.  
- `docs/image-upload.md`: Supabase Storage / Cloudinary instructions.  
- `docs/gdpr.md`: compliance checklist.  
- `docs/deployment-checklist.md`.  
- `docs/troubleshooting.md`.

### 11. Execution Roadmap
1. Set up project scaffolding: update folder structure, configure linting, testing, Tailwind.  
2. Implement database migrations, RLS policies, triggers, seed data.  
3. Build backend service layer with typed clients and tests.  
4. Implement core storefront pages/components incrementally (home, shop, product).  
5. Add cart/checkout functionalities with Stripe integration.  
6. Build services, blog, content pages.  
7. Implement admin dashboard modules (products, orders, blog, settings, inventory alerts).  
8. Integrate SEO/accessibility enhancements.  
9. Finalize documentation, testing suites, deployment guides.  
10. QA pass covering responsive layouts, accessibility, performance checks.


