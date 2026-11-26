const TONES = {
  brand: 'bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-300',
  violet: 'bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-300',
  emerald: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300',
  amber: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-300',
};

export default function StatCard({ label, value, icon: Icon, hint, tone = 'brand' }) {
  return (
    <div className="card p-5 transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-muted">{label}</p>
        <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${TONES[tone]}`}>
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <p className="mt-3 text-3xl font-bold tracking-tight tabular-nums">{value}</p>
      {hint && <p className="mt-1 truncate text-xs text-muted">{hint}</p>}
    </div>
  );
}
