import { Info } from 'lucide-react';

export default function DemoNotice({ children, className = '' }) {
  return (
    <div
      className={`flex items-start gap-3 rounded-xl border border-brand-200 bg-brand-50/70 px-4 py-3 text-sm text-brand-900 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-200 ${className}`}
    >
      <Info className="mt-0.5 h-4 w-4 shrink-0" />
      <p>
        {children ?? (
          <>
            <span className="font-semibold">Demo mode:</span> results are simulated with frontend demo data. No resume text is
            extracted and no NLP model is run.
          </>
        )}
      </p>
    </div>
  );
}
