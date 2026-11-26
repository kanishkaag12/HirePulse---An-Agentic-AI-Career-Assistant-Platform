import { Link } from 'react-router-dom';
import { Eye, Trash2 } from 'lucide-react';
import { StatusBadge } from '../common/ScoreBadge';
import { formatDate, getScoreMeta } from '../../utils/format';

export default function AnalysisCard({ analysis, onDelete }) {
  const meta = getScoreMeta(analysis.overallScore);

  return (
    <div className="rounded-xl border border-line bg-surface p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate font-semibold">{analysis.jobTitle}</p>
          <p className="truncate text-sm text-muted">{analysis.company}</p>
        </div>
        <span className="text-xl font-bold tabular-nums" style={{ color: meta.color }}>
          {analysis.overallScore}%
        </span>
      </div>
      <div className="mt-3 flex items-center justify-between gap-2 text-xs text-muted">
        <span>{formatDate(analysis.createdAt)}</span>
        <StatusBadge score={analysis.overallScore} />
      </div>
      <div className="mt-4 flex gap-2">
        <Link to={`/app/results/${analysis.id}`} className="btn btn-secondary flex-1 py-2">
          <Eye className="h-4 w-4" />
          View results
        </Link>
        {onDelete && (
          <button
            type="button"
            onClick={() => onDelete(analysis)}
            className="btn btn-secondary px-3 py-2 text-rose-600"
            aria-label={`Delete analysis for ${analysis.jobTitle}`}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
