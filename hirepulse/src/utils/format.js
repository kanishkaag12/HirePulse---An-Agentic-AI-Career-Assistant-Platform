export function formatDate(iso, options = { day: 'numeric', month: 'short', year: 'numeric' }) {
  return new Date(iso).toLocaleDateString('en-US', options);
}

export function formatShortDate(iso) {
  return formatDate(iso, { day: 'numeric', month: 'short' });
}

export function formatFileSize(bytes = 0) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function listToText(items) {
  if (items.length <= 1) return items.join('');
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;
}

export function getFirstName(name = '') {
  return name.trim().split(/\s+/)[0] || 'there';
}

export function getScoreMeta(score) {
  if (score >= 80) {
    return {
      label: 'Strong match',
      color: '#10b981',
      badge: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-300',
    };
  }
  if (score >= 60) {
    return {
      label: 'Moderate match',
      color: '#6366f1',
      badge: 'bg-brand-50 text-brand-700 ring-brand-600/20 dark:bg-brand-500/10 dark:text-brand-300',
    };
  }
  return {
    label: 'Needs work',
    color: '#f59e0b',
    badge: 'bg-amber-50 text-amber-800 ring-amber-600/20 dark:bg-amber-500/10 dark:text-amber-300',
  };
}
