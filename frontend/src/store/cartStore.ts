import { create } from 'zustand';

type CartItem = {
  id: string;
  productId: string;
  variantId?: string;
  name: string;
  price: number;
  currency: string;
  quantity: number;
  image?: string | null;
  options?: {
    length_mm?: number | null;
    curl?: string | null;
    volume?: string | null;
  };
};

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'id'>) => void;
  updateQuantity: (productId: string, variantId: string | undefined, quantity: number) => void;
  removeItem: (productId: string, variantId?: string) => void;
  clear: () => void;
}

const STORAGE_KEY = 'cbm-cart';

const loadCart = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch {
    return [];
  }
};

const persistCart = (items: CartItem[]) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

export const useCartStore = create<CartState>((set) => ({
  items: loadCart(),
  addItem: (item) =>
    set((state) => {
      const existingIndex = state.items.findIndex(
        (cartItem) => cartItem.productId === item.productId && cartItem.variantId === item.variantId
      );

      let newItems: CartItem[];

      if (existingIndex >= 0) {
        newItems = state.items.map((cartItem, index) =>
          index === existingIndex
            ? { ...cartItem, quantity: Math.min(cartItem.quantity + item.quantity, 99) }
            : cartItem
        );
      } else {
        const newItem: CartItem = {
          id: `${item.productId}-${item.variantId ?? 'base'}`,
          ...item,
        };
        newItems = [...state.items, newItem];
      }

      persistCart(newItems);
      return { items: newItems };
    }),
  updateQuantity: (productId, variantId, quantity) =>
    set((state) => {
      const newItems = state.items.map((item) =>
        item.productId === productId && item.variantId === variantId
          ? { ...item, quantity: Math.max(1, Math.min(quantity, 99)) }
          : item
      );
      persistCart(newItems);
      return { items: newItems };
    }),
  removeItem: (productId, variantId) =>
    set((state) => {
      const newItems = state.items.filter(
        (item) => !(item.productId === productId && item.variantId === variantId)
      );
      persistCart(newItems);
      return { items: newItems };
    }),
  clear: () => {
    persistCart([]);
    set({ items: [] });
  },
}));

export const selectCartCount = (state: CartState) => state.items.reduce((acc, item) => acc + item.quantity, 0);
export const selectCartSubtotal = (state: CartState) =>
  state.items.reduce((acc, item) => acc + item.quantity * item.price, 0);
export type { CartItem };

