export function ContactPage() {
  return (
    <div className="space-y-16 pb-16">
      <section className="bg-white py-16">
        <div className="container grid gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-[0.4em] text-brand-dark">Connect</span>
            <h1 className="font-display text-4xl text-surface-dark">Book appointments, trainings, or wholesale consults</h1>
            <p className="text-sm text-surface-dark/70">
              Complete the form with as much detail as possible. Our concierge team responds within one business day.
              For urgent studio requests, call us directly at (310) 555-2481.
            </p>
            <div className="rounded-3xl bg-surface-muted p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-surface-dark">
                Studio & Academy Hours
              </h2>
              <p className="mt-3 text-sm text-surface-dark/70">
                Tuesday – Saturday: 9am – 6pm
                <br />
                Sunday: VIP booking by appointment only
                <br />
                Monday: Closed
              </p>
            </div>
          </div>
          <form className="space-y-4 rounded-3xl bg-white p-8 shadow-soft">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm text-surface-dark">
                Name
                <input
                  type="text"
                  className="rounded-md border border-surface-dark/10 px-3 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                  placeholder="Your full name"
                  required
                />
              </label>
              <label className="flex flex-col gap-2 text-sm text-surface-dark">
                Email
                <input
                  type="email"
                  className="rounded-md border border-surface-dark/10 px-3 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                  placeholder="you@example.com"
                  required
                />
              </label>
            </div>
            <label className="flex flex-col gap-2 text-sm text-surface-dark">
              Phone
              <input
                type="tel"
                className="rounded-md border border-surface-dark/10 px-3 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                placeholder="+1 (555) 123-4567"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-surface-dark">
              Service or Inquiry Type
              <select className="rounded-md border border-surface-dark/10 px-3 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand">
                <option>Signature Lash Application</option>
                <option>Volume Certification Training</option>
                <option>Wholesale Product Partner</option>
                <option>Press & Partnerships</option>
                <option>Other</option>
              </select>
            </label>
            <label className="flex flex-col gap-2 text-sm text-surface-dark">
              Message
              <textarea
                rows={5}
                className="rounded-md border border-surface-dark/10 px-3 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                placeholder="Share details about your request..."
              />
            </label>
            <button
              type="submit"
              className="w-full rounded-full bg-surface-dark px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-surface-dark/90"
            >
              Submit Inquiry
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

