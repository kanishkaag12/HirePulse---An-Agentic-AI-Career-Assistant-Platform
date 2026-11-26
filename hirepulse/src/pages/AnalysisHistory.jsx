import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowUpDown, Plus, Search, SearchX, SlidersHorizontal, Trash2 } from 'lucide-react';
import HistoryTable from '../components/analysis/HistoryTable';
import EmptyState from '../components/common/EmptyState';
import ConfirmationModal from '../components/common/ConfirmationModal';
import { useApp } from '../context/AppContext';
import { SCORE_FILTERS, SORT_OPTIONS, filterAnalyses } from '../utils/historyFilters';

export default function AnalysisHistory() {
  const { history, deleteAnalysis, clearHistory, settings } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const [scoreFilter, setScoreFilter] = useState('all');
  const [sort, setSort] = useState(settings.defaultSort);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [confirmClear, setConfirmClear] = useState(false);

  // The search query lives in the URL so the navbar search can link here.
  const query = searchParams.get('q') ?? '';
  const setQuery = (value) => setSearchParams(value ? { q: value } : {}, { replace: true });

  const results = useMemo(() => filterAnalyses(history, { query, scoreFilter, sort }), [history, query, scoreFilter, sort]);
  const filtersActive = Boolean(query) || scoreFilter !== 'all';

  const resetFilters = () => {
    setQuery('');
    setScoreFilter('all');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Analysis History</h2>
          <p className="mt-1 text-muted">Review, compare and manage your previous analyses.</p>
        </div>
        <div className="flex gap-2">
          {history.length > 0 && (
            <button type="button" onClick={() => setConfirmClear(true)} className="btn btn-secondary text-rose-600">
              <Trash2 className="h-4 w-4" />
              Clear all
            </button>
          )}
          <Link to="/app/analyze" className="btn btn-primary">
            <Plus className="h-4 w-4" />
            New analysis
          </Link>
        </div>
      </div>

      <div className="card p-5 sm:p-6">
        {history.length === 0 ? (
          <EmptyState
            title="No analyses yet"
            description="Your analyses will appear here so you can revisit and compare them."
            action={
              <Link to="/app/analyze" className="btn btn-primary">
                <Plus className="h-4 w-4" />
                Analyze your resume
              </Link>
            }
          />
        ) : (
          <>
            <div className="mb-5 grid gap-3 md:grid-cols-[1fr,auto,auto]">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by job title, company or file…"
                  className="input pl-9"
                  aria-label="Search analyses"
                />
              </div>
              <div className="relative">
                <SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <select
                  value={scoreFilter}
                  onChange={(e) => setScoreFilter(e.target.value)}
                  className="input appearance-none pl-9 pr-8"
                  aria-label="Filter by score"
                >
                  {SCORE_FILTERS.map((f) => (
                    <option key={f.value} value={f.value}>
                      {f.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="relative">
                <ArrowUpDown className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="input appearance-none pl-9 pr-8"
                  aria-label="Sort analyses"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <p className="mb-4 text-sm text-muted">
              Showing <span className="font-semibold text-ink">{results.length}</span> of {history.length} analyses
              {filtersActive && (
                <button type="button" onClick={resetFilters} className="ml-2 font-medium text-brand-600 hover:underline">
                  Clear filters
                </button>
              )}
            </p>

            {results.length ? (
              <HistoryTable analyses={results} onDelete={setPendingDelete} />
            ) : (
              <EmptyState
                icon={SearchX}
                title="No matching analyses"
                description="Try a different search term or score filter."
                action={
                  <button type="button" onClick={resetFilters} className="btn btn-secondary">
                    Clear filters
                  </button>
                }
              />
            )}
          </>
        )}
      </div>

      <ConfirmationModal
        open={Boolean(pendingDelete)}
        title="Delete this analysis?"
        message={pendingDelete ? `"${pendingDelete.jobTitle} – ${pendingDelete.company}" will be permanently removed from your history.` : ''}
        confirmLabel="Delete"
        onCancel={() => setPendingDelete(null)}
        onConfirm={() => {
          deleteAnalysis(pendingDelete.id);
          setPendingDelete(null);
        }}
      />

      <ConfirmationModal
        open={confirmClear}
        title="Clear all history?"
        message="All saved analyses will be permanently removed from this browser. This cannot be undone."
        confirmLabel="Clear history"
        onCancel={() => setConfirmClear(false)}
        onConfirm={() => {
          clearHistory();
          setConfirmClear(false);
        }}
      />
    </div>
  );
}
