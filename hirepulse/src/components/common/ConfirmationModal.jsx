import { useEffect } from 'react';
import { TriangleAlert } from 'lucide-react';

export default function ConfirmationModal({
  open,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  tone = 'danger',
  onConfirm,
  onCancel,
}) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => event.key === 'Escape' && onCancel();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onCancel]);

  if (!open) return null;

  const danger = tone === 'danger';

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center p-4" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onCancel} />
      <div className="card relative w-full max-w-md animate-fade-in p-6">
        <div className="flex gap-4">
          <span
            className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${
              danger ? 'bg-rose-50 text-rose-600 dark:bg-rose-500/10' : 'bg-brand-50 text-brand-600 dark:bg-brand-500/10'
            }`}
          >
            <TriangleAlert className="h-5 w-5" />
          </span>
          <div>
            <h2 id="confirm-title" className="text-base font-semibold">
              {title}
            </h2>
            <p className="mt-1.5 text-sm text-muted">{message}</p>
          </div>
        </div>
        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button type="button" className={`btn ${danger ? 'btn-danger' : 'btn-primary'}`} onClick={onConfirm} autoFocus>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
