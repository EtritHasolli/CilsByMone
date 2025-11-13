import fetch from 'node-fetch';
import { z } from 'zod';

const ratesSchema = z.object({
  base: z.string(),
  rates: z.record(z.string(), z.number()),
});

const SUPPORTED_CURRENCIES = ['USD', 'GBP', 'EUR'] as const;

type SupportedCurrency = (typeof SUPPORTED_CURRENCIES)[number];

const DEFAULT_USD_RATES: Record<SupportedCurrency, number> = {
  USD: 1,
  GBP: 0.79,
  EUR: 0.93,
};

const buildFallbackRates = (base: SupportedCurrency): Record<SupportedCurrency, number> => {
  if (base === 'USD') {
    return DEFAULT_USD_RATES;
  }

  if (base === 'GBP') {
    const usdPerGbp = 1 / DEFAULT_USD_RATES.GBP;
    const eurPerGbp = DEFAULT_USD_RATES.EUR / DEFAULT_USD_RATES.GBP;
    return {
      USD: Number(usdPerGbp.toFixed(4)),
      GBP: 1,
      EUR: Number(eurPerGbp.toFixed(4)),
    };
  }

  // base === 'EUR'
  const usdPerEur = 1 / DEFAULT_USD_RATES.EUR;
  const gbpPerEur = DEFAULT_USD_RATES.GBP / DEFAULT_USD_RATES.EUR;
  return {
    USD: Number(usdPerEur.toFixed(4)),
    GBP: Number(gbpPerEur.toFixed(4)),
    EUR: 1,
  };
};

export const currencyService = {
  supportedCurrencies: SUPPORTED_CURRENCIES,

  async fetchRates(baseCurrency: SupportedCurrency = 'USD') {
    try {
      const response = await fetch(`https://api.exchangerate.host/latest?base=${baseCurrency}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch exchange rates (${response.status})`);
      }

      const json = await response.json();
      const data = ratesSchema.parse(json);

      const rates: Record<SupportedCurrency, number> = {
        USD: data.rates.USD ?? DEFAULT_USD_RATES.USD,
        GBP: data.rates.GBP ?? DEFAULT_USD_RATES.GBP,
        EUR: data.rates.EUR ?? DEFAULT_USD_RATES.EUR,
      };

      return {
        base: data.base as SupportedCurrency,
        rates,
        updatedAt: new Date().toISOString(),
        source: 'live',
      };
    } catch (error) {
      const fallbackRates = buildFallbackRates(baseCurrency);
      return {
        base: baseCurrency,
        rates: fallbackRates,
        updatedAt: new Date().toISOString(),
        source: 'fallback',
        error: error instanceof Error ? error.message : 'Unable to fetch live exchange rates',
      };
    }
  },
};

