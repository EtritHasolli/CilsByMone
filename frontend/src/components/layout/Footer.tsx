import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Instagram, Facebook, Twitter, Youtube } from 'lucide-react';
import { api } from '../../lib/api';

const socialLinks = [
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
  { icon: Facebook, label: 'Facebook', href: 'https://facebook.com' },
  { icon: Twitter, label: 'Twitter', href: 'https://twitter.com' },
  { icon: Youtube, label: 'YouTube', href: 'https://youtube.com' },
];

export function Footer() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const subscribeMutation = useMutation({
    mutationFn: async (input: string) => {
      await api.post('/newsletter', { email: input, source: 'footer' });
    },
    onSuccess: () => {
      setMessage('You are officially on the list. Check your inbox for a welcome note.');
      setEmail('');
    },
    onError: () => {
      setMessage('Unable to subscribe right now. Please try again or email concierge@cilsbymone.com.');
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email) return;
    setMessage(null);
    subscribeMutation.mutate(email);
  };

  return (
    <footer className="mt-auto bg-surface-dark text-surface">
      <div className="container grid gap-10 py-16 md:grid-cols-4">
        <div className="space-y-3">
          <h3 className="font-display text-xl text-brand-light">Cils by Moné</h3>
          <p className="text-sm text-white/80">
            Boutique lash artistry and beauty essentials crafted to elevate every appointment and at-home ritual.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-brand-light">Customer Care</h4>
          <nav className="mt-4 flex flex-col gap-2 text-sm text-white/80">
            <Link to="/faq">FAQ</Link>
            <Link to="/shipping">Shipping & Returns</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/privacy">Privacy Policy</Link>
          </nav>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-brand-light">Visit</h4>
          <p className="mt-4 text-sm text-white/80">
            2456 Sunset Boulevard
            <br />
            Los Angeles, CA 90026
            <br />
            Tue–Sat: 9am – 6pm
          </p>
          <p className="mt-4 text-sm text-white/80">
            <span className="font-semibold text-white">Studio:</span> (310) 555-2481
            <br />
            <span className="font-semibold text-white">Email:</span> hello@cilsbymone.com
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-brand-light">Newsletter</h4>
          <p className="mt-4 text-sm text-white/80">
            Be the first to access new drops, pro education, and exclusive offers crafted for artists.
          </p>
          <form className="mt-4 flex flex-col gap-2" onSubmit={handleSubmit}>
            <input
              type="email"
              name="newsletter"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            />
            <button
              type="submit"
              disabled={subscribeMutation.isPending}
              className="rounded-md bg-brand px-4 py-2 text-sm font-semibold text-surface-dark shadow-soft transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              {subscribeMutation.isPending ? 'Joining…' : 'Join'}
            </button>
          </form>
          {message && <p className="mt-2 text-xs text-white/70">{message}</p>}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 text-xs text-white/60 md:flex-row">
          <p>&copy; {new Date().getFullYear()} Cils by Moné. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
                aria-label={link.label}
              >
                <link.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

