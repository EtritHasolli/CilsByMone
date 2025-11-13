import { NavLink } from 'react-router-dom';
import { X } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/services', label: 'Services' },
  { to: '/blog', label: 'Blog' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export function MobileNav() {
  const { isMobileNavOpen, closeMobileNav } = useUIStore();

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/40 transition-opacity ${
        isMobileNavOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      }`}
      role="dialog"
      aria-hidden={!isMobileNavOpen}
      onClick={closeMobileNav}
    >
      <div
        className={`absolute inset-y-0 left-0 h-full w-80 max-w-full transform bg-surface p-6 transition-transform ${
          isMobileNavOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <span className="font-display text-xl">Menu</span>
          <button
            className="rounded-full p-2 hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            onClick={closeMobileNav}
            aria-label="Close navigation menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="mt-8 flex flex-col gap-4 text-lg font-medium">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={closeMobileNav}
              className={({ isActive }) =>
                `uppercase tracking-wide ${isActive ? 'text-brand-dark' : 'text-surface-dark'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}

