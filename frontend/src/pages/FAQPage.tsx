const faqSections = [
  {
    title: 'Orders & Shipping',
    items: [
      {
        question: 'When will my order ship?',
        answer:
          'Orders placed before 2pm PST ship within 1-2 business days. Express processing is available for licensed professionals—email concierge@cilsbymone.com.',
      },
      {
        question: 'Do you offer international shipping?',
        answer:
          'Yes, we ship worldwide. Duties and taxes are calculated at checkout. Expect 5-10 business days for delivery outside North America.',
      },
    ],
  },
  {
    title: 'Products & Retention',
    items: [
      {
        question: 'Are your lash fibres cruelty-free?',
        answer:
          'Absolutely. We use vegan Korean PBT fibres exclusively. Every batch is triple-tested for consistency, curl integrity, and safety.',
      },
      {
        question: 'Which adhesive is best for sensitive clients?',
        answer:
          'ProHold Adhesive offers a 1-second dry time with low fumes and medical-grade ingredients. For highly sensitive clients, we recommend patch testing 48 hours prior to application.',
      },
    ],
  },
  {
    title: 'Education & Training',
    items: [
      {
        question: 'Do your trainings include certification?',
        answer:
          'Yes. Graduates receive a digital and physical certificate recognized by partner salons. Programs include hands-on models, kit materials, and mentorship calls.',
      },
      {
        question: 'Can I book private coaching?',
        answer:
          'Private intensives with Moné are available quarterly. Submit a request via our contact form with your desired dates and focus areas.',
      },
    ],
  },
];

export function FAQPage() {
  return (
    <div className="space-y-16 pb-16">
      <section className="bg-white py-16">
        <div className="container">
          <span className="text-xs uppercase tracking-[0.4em] text-brand-dark">Frequently Asked</span>
          <h1 className="mt-3 font-display text-4xl text-surface-dark">Everything you need to know</h1>
          <p className="mt-4 max-w-2xl text-sm text-surface-dark/70">
            Policies, product care, and studio standards curated for lash artists and clients. Can’t find what you’re
            looking for? Email concierge@cilsbymone.com.
          </p>
        </div>
      </section>

      <section className="container space-y-10">
        {faqSections.map((section) => (
          <div key={section.title} className="rounded-3xl bg-white p-8 shadow-soft">
            <h2 className="text-lg font-semibold text-surface-dark">{section.title}</h2>
            <div className="mt-6 space-y-4">
              {section.items.map((item) => (
                <details key={item.question} className="rounded-2xl border border-surface-dark/5 bg-surface-muted p-4">
                  <summary className="cursor-pointer text-sm font-semibold text-surface-dark">
                    {item.question}
                  </summary>
                  <p className="mt-3 text-sm text-surface-dark/70">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

