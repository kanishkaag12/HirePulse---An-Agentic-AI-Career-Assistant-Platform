import { Link } from 'react-router-dom';
import { Eye, Trash2 } from 'lucide-react';
import AnalysisCard from '../dashboard/AnalysisCard';
import { StatusBadge } from '../common/ScoreBadge';
import { formatDate, getScoreMeta } from '../../utils/format';

const TH = 'px-4 py-3 font-medium';
const TD = 'px-4 py-3.5';

export default function HistoryTable({ analyses, onDelete }) {
  return (
    <>
      {/* Mobile: cards */}
      <div className="grid gap-3 sm:grid-cols-2 md:hidden">
        {analyses.map((analysis) => (
          <AnalysisCard key={analysis.id} analysis={analysis} onDelete={onDelete} />
        ))}
      </div>

      {/* Tablet & desktop: table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-line text-xs uppercase tracking-wide text-muted">
              <th className={TH}>Job role</th>
              <th className={TH}>Company</th>
              <th className={TH}>Match score</th>
              <th className={TH}>Date</th>
              <th className={TH}>Status</th>
              <th className={`${TH} text-right`}>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {analyses.map((analysis) => {
              const meta = getScoreMeta(analysis.overallScore);
              return (
                <tr key={analysis.id} className="transition hover:bg-subtle/60">
                  <td className={TD}>
                    <p className="font-medium">{analysis.jobTitle}</p>
                    <p className="max-w-[220px] truncate text-xs text-muted">{analysis.fileName}</p>
                  </td>
                  <td className={`${TD} text-muted`}>{analysis.company}</td>
                  <td className={TD}>
                    <div className="flex items-center gap-3">
                      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-subtle">
                        <div className="h-full rounded-full" style={{ width: `${analysis.overallScore}%`, backgroundColor: meta.color }} />
                      </div>
                      <span className="font-semibold tabular-nums">{analysis.overallScore}%</span>
                    </div>
                  </td>
                  <td className={`${TD} whitespace-nowrap text-muted`}>{formatDate(analysis.createdAt)}</td>
                  <td className={TD}>
                    <StatusBadge score={analysis.overallScore} />
                  </td>
                  <td className={TD}>
                    <div className="flex justify-end gap-1">
                      <Link to={`/app/results/${analysis.id}`} className="btn btn-ghost px-3 py-1.5 text-xs">
                        <Eye className="h-4 w-4" />
                        View
                      </Link>
                      {onDelete && (
                        <button
                          type="button"
                          onClick={() => onDelete(analysis)}
                          className="rounded-lg p-2 text-muted transition hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10"
                          aria-label={`Delete analysis for ${analysis.jobTitle}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
