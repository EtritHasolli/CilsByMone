import { create } from 'zustand';

type Currency = 'USD' | 'GBP' | 'EUR';

interface UIState {
  isMobileNavOpen: boolean;
  openMobileNav: () => void;
  closeMobileNav: () => void;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  announcementDismissed: boolean;
  dismissAnnouncement: () => void;
}

const STORAGE_KEY = 'cbm-ui-state';

const loadInitialState = (): Pick<UIState, 'currency' | 'announcementDismissed'> => {
  if (typeof window === 'undefined') return { currency: 'USD', announcementDismissed: false };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { currency: 'USD', announcementDismissed: false };
    const parsed = JSON.parse(raw);
    return {
      currency: parsed.currency ?? 'USD',
      announcementDismissed: Boolean(parsed.announcementDismissed),
    };
  } catch {
    return { currency: 'USD', announcementDismissed: false };
  }
};

const persistState = (state: Pick<UIState, 'currency' | 'announcementDismissed'>) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export const useUIStore = create<UIState>((set, get) => ({
  isMobileNavOpen: false,
  openMobileNav: () => set({ isMobileNavOpen: true }),
  closeMobileNav: () => set({ isMobileNavOpen: false }),
  currency: loadInitialState().currency,
  setCurrency: (currency) => {
    set({ currency });
    persistState({ currency, announcementDismissed: get().announcementDismissed });
  },
  announcementDismissed: loadInitialState().announcementDismissed,
  dismissAnnouncement: () => {
    set({ announcementDismissed: true });
    persistState({ currency: get().currency, announcementDismissed: true });
  },
}));

export type { Currency };

