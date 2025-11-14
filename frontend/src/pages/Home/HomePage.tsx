import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import type { Product } from '../../types/product';
import { ProductCard } from '../../components/common/ProductCard';

type ProductListResponse = {
  data: Product[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
};

export function HomePage() {
  const { data: featured } = useQuery({
    queryKey: ['products', 'featured'],
    queryFn: async () => {
      const response = await api.get<ProductListResponse>('/products', {
        params: { featured: true, pageSize: 8 },
      });
      return response.data.data;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 15,
    refetchOnMount: false,
  });

  return (
    <div className="space-y-16 pb-16">

      {/* HERO */}
      <section className="relative overflow-hidden bg-surface-dark text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1600&q=80"
            alt="Lash artist working"
            className="h-full w-full object-cover opacity-60"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </div>
        <div className="relative container flex flex-col gap-6 py-32">
          <span className="text-sm uppercase tracking-[0.4em] text-brand-light">
            Boutique Lash Atelier
          </span>
          <h1 className="max-w-2xl font-display text-4xl leading-tight md:text-5xl">
            Crafted for lash artists and beauty lovers who demand elevated essentials.
          </h1>
          <p className="max-w-lg text-lg text-white/80">
            Discover professional lash trays, premium adhesives, bespoke services, and master
            certification trainings designed by Moné Dupont.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/shop"
              className="rounded-full bg-brand px-6 py-3 font-semibold text-surface-dark shadow-glow transition hover:bg-brand-dark"
            >
              Shop Collection
            </Link>
            <Link
              to="/services"
              className="rounded-full border border-white/30 px-6 py-3 font-semibold text-white transition hover:border-white hover:bg-white hover:text-surface-dark"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="container">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm uppercase tracking-[0.3em] text-brand-dark">
              New & Noteworthy
            </span>
            <h2 className="mt-2 font-display text-3xl text-surface-dark">
              Featured Best Sellers
            </h2>
          </div>
          <Link to="/shop" className="text-sm font-semibold uppercase tracking-wide text-brand-dark">
            View All
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured?.map((product, index) => (
            <ProductCard key={product.id} product={product} priority={index < 4} />
          )) ?? (
            <p className="text-sm text-surface-dark/60">Loading featured products…</p>
          )}
        </div>
      </section>

      {/* OUR PROMISE */}
      <section className="bg-white py-16">
        <div className="container grid gap-10 md:grid-cols-2">
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80"
            alt="Luxury lash tools"
            className="h-80 w-full rounded-3xl object-cover shadow-soft md:h-full"
            loading="lazy"
            decoding="async"
          />
          <div className="space-y-6">
            <span className="text-sm uppercase tracking-[0.3em] text-brand-dark">Our Promise</span>
            <h2 className="font-display text-3xl text-surface-dark">
              Premium lash artistry rooted in technique, care, and community.
            </h2>
            <p className="text-surface-dark/70">
              From ethically sourced fibres to lab-tested adhesives, every product is obsessively
              crafted to help artists deliver unforgettable sets—while protecting natural lash health.
            </p>
            <ul className="grid gap-3 text-sm text-surface-dark/70 sm:grid-cols-2">
              <li className="rounded-xl bg-surface-muted p-4 shadow-soft">
                <span className="font-semibold text-surface-dark">Cruelty-Free Materials</span>
                <p className="mt-2 text-xs text-surface-dark/60">
                  100% vegan Korean PBT and hypoallergenic formulas.
                </p>
              </li>
              <li className="rounded-xl bg-surface-muted p-4 shadow-soft">
                <span className="font-semibold text-surface-dark">Artist-Approved Testing</span>
                <p className="mt-2 text-xs text-surface-dark/60">
                  Refined by master lash artists in real salons.
                </p>
              </li>
              <li className="rounded-xl bg-surface-muted p-4 shadow-soft">
                <span className="font-semibold text-surface-dark">Salon Training</span>
                <p className="mt-2 text-xs text-surface-dark/60">
                  Certification programs for every level of artist.
                </p>
              </li>
              <li className="rounded-xl bg-surface-muted p-4 shadow-soft">
                <span className="font-semibold text-surface-dark">Care Rituals</span>
                <p className="mt-2 text-xs text-surface-dark/60">
                  Retail-friendly aftercare to preserve retention.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* LASH ACADEMY */}
      <section className="bg-white text-dark-surface py-20">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-sm uppercase tracking-[0.3em] text-dark-surface">Lash Academy</span>
            <h2 className="text-3xl font-display leading-tight">Master the Art of Lash Extensions</h2>
            <p className="text-dark-surface">
              Learn classic, hybrid, and volume techniques from certified lash educators. Our
              training programs combine hands-on practice, real-client models, and lifetime
              mentorship.
            </p>

            <ul className="space-y-3 text-dark-surface/60 text-sm">
              <li>• Classic & Volume Certification</li>
              <li>• Live Model Practice Included</li>
              <li>• Lifetime Training Support</li>
              <li>• Internationally Recognized Certificate</li>
            </ul>

            <Link
              to="/academy"
              className="inline-block rounded-full bg-brand px-6 py-3 font-semibold text-surface-dark shadow-glow hover:bg-brand-dark transition"
            >
              Explore Trainings
            </Link>
          </div>

          <img
            src="https://www.thebeautyacademy.org/wp-content/uploads/2017/01/Eyelash-Extensions-MOBILE-BANNER.jpg"
            alt="Lash training model"
            className="rounded-3xl shadow-soft w-full object-cover h-96"
            loading="lazy"
          />
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="container py-20">
        <div className="text-center space-y-3">
          <span className="text-sm uppercase tracking-[0.3em] text-brand-dark">Why Artists Choose Us</span>
          <h2 className="text-3xl font-display text-surface-dark">Built for Lash Professionals</h2>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-surface-muted rounded-3xl shadow-soft text-center space-y-3">
            <h3 className="font-semibold text-surface-dark">Premium Retention</h3>
            <p className="text-sm text-surface-dark/70">Adhesives designed for 6–8 week hold in all climates.</p>
          </div>

          <div className="p-6 bg-surface-muted rounded-3xl shadow-soft text-center space-y-3">
            <h3 className="font-semibold text-surface-dark">Ultra-Black Fibers</h3>
            <p className="text-sm text-surface-dark/70">Matte, rich fibers that create bold, clean lash lines.</p>
          </div>

          <div className="p-6 bg-surface-muted rounded-3xl shadow-soft text-center space-y-3">
            <h3 className="font-semibold text-surface-dark">Fast Shipping</h3>
            <p className="text-sm text-surface-dark/70">Worldwide tracked delivery from our EU fulfillment center.</p>
          </div>

          <div className="p-6 bg-surface-muted rounded-3xl shadow-soft text-center space-y-3">
            <h3 className="font-semibold text-surface-dark">Trusted by Salons</h3>
            <p className="text-sm text-surface-dark/70">Used by 1,200+ lash artists around the world.</p>
          </div>
        </div>
      </section>

      {/* BEFORE & AFTER */}
      <section className="bg-white py-20">
        <div className="container text-center space-y-4">
          <span className="text-sm uppercase tracking-[0.3em] text-brand-dark">Results</span>
          <h2 className="text-3xl font-display text-surface-dark">
            Before & After Transformations
          </h2>
          <p className="text-surface-dark/70 max-w-lg mx-auto text-sm">
            Real clients. Real retention. Real artistry.
          </p>
        </div>

        <div className="mt-12 container grid md:grid-cols-3 gap-6">
          {[
            "https://www.xtremelashes.com/blog/wp-content/uploads/2018/07/aftercare-for-longer-lasting-eyelash-extensions.jpg",
            "https://img.freepik.com/free-photo/woman-before-after-eyelashes-extensions_23-2150039808.jpg?semt=ais_hybrid&w=740&q=80",
            "https://images.squarespace-cdn.com/content/v1/54a82a3fe4b0d132f65791c5/1536181997411-XW1ALF5OHO3TO2AYFSVR/image4.png"
          ].map((src) => (
            <img
              key={src}
              src={src}
              alt="Before and after lashes"
              className="rounded-3xl shadow-soft w-full h-80 object-cover"
              loading="lazy"
            />
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-white py-20 text-white">
        <div className="container space-y-10">
          <div className="text-center space-y-2">
            <span className="text-sm uppercase tracking-[0.3em] text-surface-dark">Testimonials</span>
            <h2 className="text-3xl font-display text-surface-dark">Loved by Lash Artists Worldwide</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-3xl p-6 shadow-soft">
              <p className="text-sm text-surface-dark">“The retention is insane. My clients come back after 5 weeks with 60%.”</p>
              <p className="mt-4 text-surface-dark text-xs font-semibold">— Valentina, Master Lash Artist</p>
            </div>

            <div className="bg-white/10 rounded-3xl p-6 shadow-soft">
              <p className="text-sm text-surface-dark">“The darkest, softest lash trays I’ve used in 6 years.”</p>
              <p className="mt-4 text-surface-dark text-xs font-semibold">— Sophie, Salon Owner</p>
            </div>

            <div className="bg-white/10 rounded-3xl p-6 shadow-soft">
              <p className="text-sm text-surface-dark">“Super fast delivery and amazing customer support.”</p>
              <p className="mt-4 text-surface-dark text-xs font-semibold">— Ana, Volume Specialist</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
