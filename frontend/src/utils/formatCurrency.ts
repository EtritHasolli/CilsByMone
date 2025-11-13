import type { Currency } from '../store/uiStore';

const currencySymbols: Record<Currency, string> = {
  USD: '$',
  GBP: '£',
  EUR: '€',
};

export function formatCurrency(value: number, currency: Currency) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    currencyDisplay: 'symbol',
  })
    .format(value)
    .replace(/[^\d.,]+/, currencySymbols[currency]);
}

