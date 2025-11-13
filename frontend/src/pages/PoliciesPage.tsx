const policySections = [
  {
    title: 'Shipping & Returns',
    content: [
      'Orders ship from our Los Angeles studio Monday–Friday. Domestic shipping is complimentary for orders over $99.',
      'Unused retail items can be returned within 14 days. Professional products and adhesives are final sale to preserve formula integrity.',
    ],
  },
  {
    title: 'Service Policies',
    content: [
      'A 50% deposit is required to reserve service appointments or trainings. Rescheduling is available up to 48 hours in advance.',
      'Late arrivals of 15 minutes or more may require a condensed service or rebooking to protect other clients’ time.',
    ],
  },
  {
    title: 'Privacy & Data',
    content: [
      'We collect contact information and booking history to provide personalized service. Payment data is handled by Stripe and never stored on our servers.',
      'You may request account deletion or data export at any time by emailing privacy@cilsbymone.com.',
    ],
  },
];

export function PoliciesPage() {
  return (
    <div className="space-y-16 pb-16">
      <section className="bg-white py-16">
        <div className="container">
          <span className="text-xs uppercase tracking-[0.4em] text-brand-dark">Policies</span>
          <h1 className="mt-3 font-display text-4xl text-surface-dark">Transparent studio standards</h1>
          <p className="mt-4 max-w-3xl text-sm text-surface-dark/70">
            These policies are offered as a starting framework. Customize the language to align with your legal
            requirements, insurance, and regional regulations before launching.
          </p>
        </div>
      </section>

      <section className="container space-y-8">
        {policySections.map((section) => (
          <article key={section.title} className="rounded-3xl bg-white p-8 shadow-soft">
            <h2 className="font-display text-2xl text-surface-dark">{section.title}</h2>
            <div className="mt-4 space-y-4 text-sm text-surface-dark/70">
              {section.content.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

