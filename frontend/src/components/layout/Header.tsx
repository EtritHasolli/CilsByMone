import { Link, NavLink } from 'react-router-dom';
import { ShoppingBag, Search, Menu, Globe, User } from 'lucide-react';
import { CurrencySelector } from '../ui/CurrencySelector';
import { useUIStore } from '../../store/uiStore';
import { useCartStore, selectCartCount } from '../../store/cartStore';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/services', label: 'Services' },
  // { to: '/blog', label: 'Blog' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

const languages = ['English', 'Deutsch', 'Français'];

export function Header() {
  const itemCount = useCartStore(selectCartCount);
  const openMobileNav = useUIStore((state) => state.openMobileNav);

  return (
    <header className="sticky top-0 z-40 border-b border-surface-dark/5 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="bg-brand-light/60 text-xs font-medium uppercase tracking-[0.35em] text-surface-dark">
        <div className="container flex items-center justify-between py-2">
          <span>Welcome to our store</span>
          <div className="hidden items-center gap-4 text-[11px] tracking-normal lg:flex">
            <Link to="/contact" className="hover:text-brand-dark">
              Contact
            </Link>
            <div className="flex items-center gap-2 text-surface-dark/70">
              <CurrencySelector />
              <span className="h-3 w-px bg-surface-dark/20" />
              <div className="flex items-center gap-1">
                <Globe className="h-3.5 w-3.5" />
                <select className="bg-transparent text-xs uppercase tracking-wide text-surface-dark focus:outline-none">
                  {languages.map((lang) => (
                    <option key={lang} value={lang} className="text-surface-dark">
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container flex h-20 items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <button
            className="rounded-md p-2 hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand lg:hidden"
            onClick={openMobileNav}
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Link to="/" className="font-display text-2xl tracking-[0.4em] text-surface-dark">
            CILS BY MONÉ
          </Link>
        </div>

        <nav className="hidden items-center gap-8 text-sm font-medium uppercase tracking-[0.3em] lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `pb-1 transition-colors ${isActive ? 'border-b-2 border-brand-dark text-brand-dark' : 'hover:text-brand-dark'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4 text-xs uppercase tracking-wide text-surface-dark/70">
          <Link to="/account" className="hidden items-center gap-1 hover:text-brand-dark sm:flex">
            <User className="h-4 w-4" />
            Account
          </Link>
    
          <Link
            to="/cart"
            className="relative rounded-full p-2 hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            aria-label="View cart"
          >
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-surface-dark text-[10px] font-semibold text-white">
              {itemCount}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}

