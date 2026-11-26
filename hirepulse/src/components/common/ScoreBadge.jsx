import { getScoreMeta } from '../../utils/format';

export function StatusBadge({ score }) {
  const meta = getScoreMeta(score);
  return (
    <span className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${meta.badge}`}>
      {meta.label}
    </span>
  );
}

export default function ScoreBadge({ score }) {
  const meta = getScoreMeta(score);
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold tabular-nums ring-1 ring-inset ${meta.badge}`}>
      {score}%
    </span>
  );
}
