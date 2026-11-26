import { useEffect, useState } from 'react';
import { Activity, Circle, CircleCheck, LoaderCircle } from 'lucide-react';

const DEFAULT_STEPS = [
  'Reading resume file details',
  'Parsing the job description',
  'Comparing skills and keywords (simulated)',
  'Preparing your suggestions',
];

export default function LoadingAnimation({ steps = DEFAULT_STEPS, interval = 800, title = 'Analyzing your match' }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((step) => Math.min(step + 1, steps.length - 1)), interval);
    return () => clearInterval(id);
  }, [steps.length, interval]);

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-canvas/90 p-4 backdrop-blur-sm" role="status" aria-live="polite">
      <div className="card w-full max-w-md animate-fade-in p-8 text-center">
        <div className="relative mx-auto h-20 w-20">
          <span className="absolute inset-0 animate-ping rounded-full bg-brand-500/20" />
          <span className="relative grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-violet-600 text-white shadow-lg shadow-brand-500/30">
            <Activity className="h-9 w-9" />
          </span>
        </div>
        <h2 className="mt-6 text-lg font-semibold">{title}</h2>
        <p className="mt-1 text-sm text-muted">Demo mode: results are simulated – no real NLP model is running.</p>

        <ul className="mt-6 space-y-3 text-left">
          {steps.map((step, index) => (
            <li key={step} className="flex items-center gap-3 text-sm">
              {index < active ? (
                <CircleCheck className="h-5 w-5 shrink-0 text-emerald-500" />
              ) : index === active ? (
                <LoaderCircle className="h-5 w-5 shrink-0 animate-spin text-brand-500" />
              ) : (
                <Circle className="h-5 w-5 shrink-0 text-line" />
              )}
              <span className={index <= active ? 'text-ink' : 'text-muted'}>{step}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
