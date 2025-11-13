import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronsUpDown } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useUIStore } from '../../store/uiStore';
import type { Currency } from '../../store/uiStore';
import { api } from '../../lib/api';

const currencyOptions: { code: Currency; label: string; symbol: string }[] = [
  { code: 'USD', label: 'USD', symbol: '$' },
  { code: 'GBP', label: 'GBP', symbol: '£' },
  { code: 'EUR', label: 'EUR', symbol: '€' },
];

type RatesResponse = {
  base: string;
  rates: Record<string, number>;
  updatedAt: string;
};

export function CurrencySelector() {
  const currency = useUIStore((state) => state.currency);
  const setCurrency = useUIStore((state) => state.setCurrency);

  const { data, refetch } = useQuery({
    queryKey: ['currency', currency],
    queryFn: async () => {
      const response = await api.get<RatesResponse>('/currency/rates', { params: { base: currency } });
      return response.data;
    },
    staleTime: 1000 * 60 * 60,
  });

  useEffect(() => {
    refetch();
  }, [currency, refetch]);

  return (
    <div className="relative">
      <details className="group">
        <summary className="flex cursor-pointer items-center gap-2 rounded-full border border-surface-dark/10 bg-white px-3 py-1.5 text-sm font-semibold text-surface-dark shadow-soft transition hover:border-brand-dark/50 hover:text-brand-dark">
          <span>{currencyOptions.find((option) => option.code === currency)?.symbol ?? '$'}</span>
          <span>{currency}</span>
          <ChevronsUpDown className="h-4 w-4 text-surface-dark/60 transition group-open:rotate-180" />
        </summary>

        <AnimatePresence>
          <motion.ul
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="absolute right-0 mt-2 w-36 overflow-hidden rounded-lg border border-surface-dark/10 bg-white shadow-lg"
          >
            {currencyOptions.map((option) => (
              <li key={option.code}>
                <button
                  type="button"
                  className={`flex w-full items-center justify-between px-3 py-2 text-sm transition hover:bg-surface-muted ${
                    currency === option.code ? 'text-brand-dark' : 'text-surface-dark/80'
                  }`}
                  onClick={() => setCurrency(option.code)}
                >
                  <span>
                    {option.symbol} {option.code}
                  </span>
                  {currency === option.code && <span className="text-xs uppercase text-brand-dark">Active</span>}
                </button>
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </details>

      {data && (
        <p className="mt-1 text-[10px] uppercase tracking-wide text-surface-dark/50">
          Updated {new Date(data.updatedAt).toLocaleDateString()}
        </p>
      )}
    </div>
  );
}

