const PRIORITY_STYLES = {
  high: 'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300',
  medium: 'bg-amber-50 text-amber-800 dark:bg-amber-500/10 dark:text-amber-300',
  low: 'bg-subtle text-muted',
};

export default function SuggestionCard({ suggestion, index }) {
  return (
    <div className="flex gap-4 rounded-xl border border-line p-4 transition hover:border-brand-300 hover:bg-subtle/40 dark:hover:border-brand-500/40">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-50 text-sm font-bold text-brand-600 dark:bg-brand-500/10 dark:text-brand-300">
        {index + 1}
      </span>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${PRIORITY_STYLES[suggestion.priority]}`}>
            {suggestion.priority} priority
          </span>
          <span className="text-xs text-muted">{suggestion.category}</span>
        </div>
        <h3 className="mt-1.5 text-sm font-semibold">{suggestion.title}</h3>
        <p className="mt-1 text-sm text-muted">{suggestion.detail}</p>
      </div>
    </div>
  );
}
