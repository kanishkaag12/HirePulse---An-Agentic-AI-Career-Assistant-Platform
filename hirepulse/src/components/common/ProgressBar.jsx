import { useEffect, useState } from 'react';

const TONES = {
  brand: 'bg-brand-500',
  violet: 'bg-violet-500',
  sky: 'bg-sky-500',
  emerald: 'bg-emerald-500',
  amber: 'bg-amber-500',
};

export default function ProgressBar({ value, label, tone = 'brand', icon: Icon, hint }) {
  const [width, setWidth] = useState(0);

  // Start at 0 and animate to the value after mount
  useEffect(() => {
    const id = setTimeout(() => setWidth(value), 60);
    return () => clearTimeout(id);
  }, [value]);

  return (
    <div>
      {label && (
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="flex items-center gap-2 font-medium">
            {Icon && <Icon className="h-4 w-4 text-muted" />}
            {label}
          </span>
          <span className="font-semibold tabular-nums">{value}%</span>
        </div>
      )}
      <div
        className="h-2 overflow-hidden rounded-full bg-subtle"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div
          className={`h-full rounded-full ${TONES[tone]} transition-[width] duration-700 ease-out`}
          style={{ width: `${width}%` }}
        />
      </div>
      {hint && <p className="mt-1.5 text-xs text-muted">{hint}</p>}
    </div>
  );
}
