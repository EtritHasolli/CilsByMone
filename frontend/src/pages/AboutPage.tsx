export function AboutPage() {
  return (
    <div className="space-y-24 pb-24">

      {/* OUR STORY */}
      <section className="bg-white py-16">
        <div className="container grid gap-10 md:grid-cols-[1.1fr,0.9fr]">
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-[0.4em] text-brand-dark">
              Our Story
            </span>
            <h1 className="font-display text-4xl text-surface-dark leading-tight">
              Built by Moné Dupont for artists across the globe
            </h1>
            <p className="text-sm text-surface-dark/70">
              What began as an intimate concierge lash studio in Los Angeles has evolved into
              a global beauty company. Moné’s obsession with quality, retention, and meticulous
              technique fuels our education and product design.
            </p>
            <p className="text-sm text-surface-dark/70">
              Today, the Cils by Moné collective supports artists and clients worldwide with curated
              supplies, training, and experiential services. We believe in artistry that protects
              natural lashes, business mentorship that inspires confidence, and luxury rituals
              that feel personal.
            </p>
          </div>

          <img
            src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80"
            alt="Founder portrait"
            className="h-full w-full rounded-3xl object-cover shadow-soft"
          />
        </div>
      </section>

      {/* FOUNDER MESSAGE */}
      <section className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <img
            src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=900&q=80"
            alt="Founder working"
            className="rounded-3xl shadow-soft h-80 w-full object-cover md:h-full"
          />

          <div className="space-y-6">
            <span className="text-xs uppercase tracking-[0.4em] text-brand-dark">
              Founder’s Message
            </span>
            <h2 className="font-display text-3xl text-surface-dark leading-tight">
              “Every lash set is a form of self-expression — a quiet luxury.”
            </h2>
            <p className="text-sm text-surface-dark/70">
              After years behind the lash bed, Moné realized artists needed more than just products:
              they needed a brand that actually understood the craft. Cils by Moné was born from
              the desire to provide tools that feel intentional, elevate technique, and empower
              artists to build sustainable careers.
            </p>
            <p className="text-sm text-surface-dark/70">
              Every tray, adhesive, and training method is designed with a singular purpose:
              helping artists deliver unforgettable results — without compromising lash health.
            </p>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="container">
        <h2 className="font-display text-3xl text-surface-dark">Values that guide every set</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Intentional Craft",
              description:
                "Precision lash mapping and product development informed by 12+ years of real salon work.",
            },
            {
              title: "Conscious Quality",
              description:
                "Vegan fibres, low-fume adhesives, and clean formulas designed for retention and comfort.",
            },
            {
              title: "Community Growth",
              description:
                "Trainings, mentorship, and wholesale partnerships tailored to independent artists.",
            },
          ].map((value) => (
            <article key={value.title} className="rounded-3xl bg-white p-6 shadow-soft">
              <h3 className="font-semibold text-surface-dark">{value.title}</h3>
              <p className="mt-3 text-sm text-surface-dark/70">{value.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* BRAND PHILOSOPHY */}
      <section className="bg-surface-dark text-white py-20">
        <div className="container space-y-8">
          <h2 className="text-3xl font-display">Our Philosophy</h2>
          <p className="max-w-2xl text-white/80 text-sm">
            Lash artistry is more than application — it’s a meditative process that blends
            technique, chemistry, and client trust. At Cils by Moné, we honor the artistry by
            creating tools that support precision, retention, and creativity.
          </p>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              "Lashes should enhance natural beauty, never overwhelm it.",
              "Products must support both the client experience and the artist workflow.",
              "Education is the heartbeat of long-term success in the beauty industry.",
            ].map((item) => (
              <div key={item} className="rounded-3xl bg-white/10 p-6 shadow-soft text-sm">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="container py-10">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-[0.4em] text-brand-dark">Journey</span>
          <h2 className="text-3xl font-display text-surface-dark">How it all started</h2>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-4">
          {[
            {
              year: "2014",
              text: "Moné begins offering concierge lash services in Los Angeles.",
            },
            {
              year: "2017",
              text: "Launch of the first curated lash trays designed for retention and softness.",
            },
            {
              year: "2020",
              text: "Cils by Moné Academy introduces hands-on certification training.",
            },
            {
              year: "2023",
              text: "Expansion into EU distribution and global artist community.",
            },
          ].map((step) => (
            <div key={step.year} className="rounded-3xl bg-white p-6 shadow-soft">
              <h3 className="font-semibold text-brand-dark">{step.year}</h3>
              <p className="mt-2 text-sm text-surface-dark/70">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SUSTAINABILITY */}
      <section className="bg-white py-20">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-[0.4em] text-brand-dark">
              Sustainability
            </span>
            <h2 className="font-display text-3xl text-surface-dark">
              Beauty with responsibility
            </h2>
            <p className="text-sm text-surface-dark/70">
              We believe luxury should never come at the expense of ethics. Our fibres are
              cruelty-free Korean PBT, packaging is recyclable, and adhesives are formulated
              with reduced fumes for client safety.
            </p>
            <ul className="space-y-2 text-sm text-surface-dark/70">
              <li>• Cruelty-free manufacturing</li>
              <li>• Recyclable packaging</li>
              <li>• Cleaner, low-fume adhesives</li>
              <li>• Ethical supply chain partners</li>
            </ul>
          </div>

          <img
            src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=900&q=80"
            alt="Eco friendly materials"
            className="rounded-3xl shadow-soft w-full h-80 object-cover md:h-full"
          />
        </div>
      </section>

      {/* ACADEMY */}
      <section className="bg-surface-dark py-20 text-white">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-[0.4em] text-brand-light">Academy</span>
            <h2 className="text-3xl font-display">Educating the next generation of lash artists</h2>
            <p className="text-white/80 text-sm">
              From classic foundations to advanced volume, our academy provides structured
              education with real-model training, business development, and lifetime mentorship.
            </p>

            <ul className="text-sm text-white/70 space-y-1">
              <li>• Classic, Hybrid & Volume Certification</li>
              <li>• Live Model Practice</li>
              <li>• Lifetime Artist Support</li>
              <li>• Salon Business Coaching</li>
            </ul>
          </div>

          <img
            src="https://www.thebeautyacademy.org/wp-content/uploads/2017/01/Eyelash-Extensions-MOBILE-BANNER.jpg"
            alt="Lash academy"
            className="rounded-3xl shadow-soft w-full h-80 object-cover md:h-full"
          />
        </div>
      </section>

      {/* GLOBAL COMMUNITY */}
      <section className="container py-10">
        <h2 className="text-3xl font-display text-surface-dark text-center">
          A global community of artists
        </h2>
        <p className="text-center text-sm text-surface-dark/70 mt-2 max-w-xl mx-auto">
          Cils by Moné now serves thousands of artists across North America, Europe, and Australia.
          We’re honored to be part of your creative journey.
        </p>

        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {[
            "1200+ Artists",
            "30+ Countries",
            "10M+ Lash Fans Reached",
          ].map((stat) => (
            <div
              key={stat}
              className="p-6 bg-surface-muted rounded-3xl shadow-soft text-center"
            >
              <p className="font-semibold text-surface-dark">{stat}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRESS */}
      <section className="bg-white py-20">
        <div className="container space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-[0.4em] text-brand-dark">Press</span>
            <h2 className="font-display text-3xl text-surface-dark">Featured In</h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              "Harper’s Bazaar",
              "Vogue Beauty",
              "Elle Magazine",
            ].map((press) => (
              <div
                key={press}
                className="rounded-3xl bg-surface-muted p-6 shadow-soft text-center font-semibold text-surface-dark"
              >
                {press}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
