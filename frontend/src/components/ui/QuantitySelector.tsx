import { Minus, Plus } from 'lucide-react';

type QuantitySelectorProps = {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
};

export function QuantitySelector({ value, min = 1, max = 99, onChange }: QuantitySelectorProps) {
  const decrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const increment = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  return (
    <div className="inline-flex items-center rounded-full border border-surface-dark/10 bg-white shadow-soft">
      <button
        type="button"
        onClick={decrement}
        className="flex h-10 w-10 items-center justify-center rounded-l-full text-surface-dark transition hover:bg-surface-muted disabled:opacity-40"
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="w-12 text-center text-sm font-semibold text-surface-dark">{value}</span>
      <button
        type="button"
        onClick={increment}
        className="flex h-10 w-10 items-center justify-center rounded-r-full text-surface-dark transition hover:bg-surface-muted disabled:opacity-40"
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}

