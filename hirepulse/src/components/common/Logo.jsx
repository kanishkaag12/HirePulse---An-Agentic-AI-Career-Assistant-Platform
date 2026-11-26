import { Activity } from 'lucide-react';

export default function Logo({ collapsed = false, className = '' }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-violet-600 text-white shadow-sm shadow-brand-500/30">
        <Activity className="h-5 w-5" strokeWidth={2.5} />
      </span>
      {!collapsed && (
        <span className="text-lg font-bold tracking-tight text-ink">
          Hire<span className="text-brand-500">Pulse</span>
        </span>
      )}
    </span>
  );
}
