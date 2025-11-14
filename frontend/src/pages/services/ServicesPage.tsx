import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import type { Service } from '../../types/service';
import { Link } from 'react-router-dom';

export function ServicesPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const response = await api.get<Service[]>('/services');
      return response.data;
    },
  });

  return (
    <div className="space-y-16 pb-16">
      <section className="bg-white py-16">
        <div className="container text-center">
          <span className="text-xs uppercase tracking-[0.4em] text-brand-dark">In-Studio Experiences</span>
          <h1 className="mt-3 font-display text-4xl text-surface-dark">Lash Services & Certification Training</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-surface-dark/70">
            From bespoke lash application to industry-certified training, immerse yourself in luxury artistry designed
            by Moné and her master team.
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex rounded-full bg-surface-dark px-6 py-3 text-sm font-semibold uppercase text-white transition hover:bg-surface-dark/90"
          >
            Book Consultation
          </Link>
        </div>
      </section>

      <section className="container space-y-8">
        <div>
          <h2 className="font-display text-3xl text-surface-dark">Signature Services</h2>
          <p className="mt-2 text-sm text-surface-dark/70">
            Tailored lash experiences designed to transform texture, lift, and retention with precision artistry.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {isLoading && <p className="text-sm text-surface-dark/60">Loading services…</p>}
          {/* {data?.map((service) => (
            <article key={service.id} className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-soft">
              {service.image_url && (
                <img
                  src={`${service.image_url}?auto=format&fit=crop&w=800&q=80`}
                  alt={service.name}
                  className="h-56 w-full object-cover"
                />
              )}
              <div className="flex flex-1 flex-col gap-4 p-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-brand-dark">{service.category ?? 'Service'}</p>
                  <h3 className="mt-2 font-display text-xl text-surface-dark">{service.name}</h3>
                </div>
                <p className="text-sm text-surface-dark/70">{service.description}</p>
                <div className="mt-auto flex items-center justify-between text-sm">
                  {service.duration_minutes && (
                    <span className="text-surface-dark/70">{service.duration_minutes} minutes</span>
                  )}
                  {service.price && (
                    <span className="font-semibold text-surface-dark">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: service.currency,
                      }).format(service.price)}
                    </span>
                  )}
                </div>
                <Link
                  to="/contact"
                  className="block rounded-full border border-surface-dark/10 px-4 py-2 text-center text-xs font-semibold uppercase tracking-wide transition hover:border-brand-dark hover:text-brand-dark"
                >
                  Reserve Spot
                </Link>
              </div>
            </article>
          ))} */}
        </div>
      </section>
    </div>
  );
}

