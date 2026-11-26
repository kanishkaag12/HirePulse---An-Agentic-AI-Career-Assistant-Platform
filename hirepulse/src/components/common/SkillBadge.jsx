import { CircleCheck, CircleDashed } from 'lucide-react';

const VARIANTS = {
  matched: {
    className: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300',
    icon: CircleCheck,
  },
  unconfirmed: {
    className: 'border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300',
    icon: CircleDashed,
  },
  brand: {
    className: 'border-brand-200 bg-brand-50 text-brand-700 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-300',
    icon: null,
  },
  neutral: {
    className: 'border-line bg-subtle text-ink',
    icon: null,
  },
};

export default function SkillBadge({ name, variant = 'neutral', count }) {
  const { className, icon: Icon } = VARIANTS[variant];

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium ${className}`}>
      {Icon && <Icon className="h-3.5 w-3.5" />}
      {name}
      {count != null && <span className="ml-0.5 rounded-full bg-black/5 px-1.5 text-xs dark:bg-white/10">{count}</span>}
    </span>
  );
}
