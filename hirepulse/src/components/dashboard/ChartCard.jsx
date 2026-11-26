// Generic titled card used for charts and result sections.
export default function ChartCard({ title, subtitle, icon: Icon, action, children, className = '' }) {
  return (
    <section className={`card p-5 sm:p-6 ${className}`}>
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          {Icon && (
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-subtle text-brand-600 dark:text-brand-300">
              <Icon className="h-5 w-5" />
            </span>
          )}
          <div>
            <h2 className="text-base font-semibold">{title}</h2>
            {subtitle && <p className="mt-0.5 text-sm text-muted">{subtitle}</p>}
          </div>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
