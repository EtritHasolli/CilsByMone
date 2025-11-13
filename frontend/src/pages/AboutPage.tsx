export function AboutPage() {
  return (
    <div className="space-y-16 pb-16">
      <section className="bg-white py-16">
        <div className="container grid gap-10 md:grid-cols-[1.1fr,0.9fr]">
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-[0.4em] text-brand-dark">Our Story</span>
            <h1 className="font-display text-4xl text-surface-dark">Built by Moné Dupont for artists across the globe</h1>
            <p className="text-sm text-surface-dark/70">
              What began as an intimate concierge lash studio in Los Angeles has evolved into a global beauty company.
              Moné’s obsession with quality, retention, and meticulous technique fuels our education and product design.
            </p>
            <p className="text-sm text-surface-dark/70">
              Today, the Cils by Moné collective supports artists and clients worldwide with curated supplies, training,
              and experiential services. We believe in artistry that protects natural lashes, business mentorship that
              inspires confidence, and luxury rituals that feel personal.
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80"
            alt="Founder portrait"
            className="h-full w-full rounded-3xl object-cover shadow-soft"
          />
        </div>
      </section>

      <section className="container">
        <h2 className="font-display text-3xl text-surface-dark">Values that guide every set</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            {
              title: 'Intentional Craft',
              description:
                'Precision lash mapping, refined product development, and artist education designed from 12+ years of salon experience.',
            },
            {
              title: 'Conscious Quality',
              description:
                'Vegan fibres, low-fume adhesives, and clinically tested formulas that safeguard lash health and client comfort.',
            },
            {
              title: 'Community Growth',
              description:
                'Boutique trainings, mentorship, and wholesale partnerships that elevate independent artists and salons.',
            },
          ].map((value) => (
            <article key={value.title} className="rounded-3xl bg-white p-6 shadow-soft">
              <h3 className="font-semibold text-surface-dark">{value.title}</h3>
              <p className="mt-3 text-sm text-surface-dark/70">{value.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

