export const SCORE_FILTERS = [
  { value: 'all', label: 'All scores', test: () => true },
  { value: 'strong', label: '80% and above', test: (score) => score >= 80 },
  { value: 'moderate', label: '60% – 79%', test: (score) => score >= 60 && score < 80 },
  { value: 'low', label: 'Below 60%', test: (score) => score < 60 },
];

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'highest', label: 'Highest score' },
  { value: 'lowest', label: 'Lowest score' },
];

const SORTERS = {
  newest: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  oldest: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
  highest: (a, b) => b.overallScore - a.overallScore,
  lowest: (a, b) => a.overallScore - b.overallScore,
};

export function filterAnalyses(analyses, { query = '', scoreFilter = 'all', sort = 'newest' } = {}) {
  const term = query.trim().toLowerCase();
  const { test } = SCORE_FILTERS.find((f) => f.value === scoreFilter) ?? SCORE_FILTERS[0];

  return analyses
    .filter((a) => test(a.overallScore))
    .filter((a) => !term || [a.jobTitle, a.company, a.fileName].some((v) => v?.toLowerCase().includes(term)))
    .sort(SORTERS[sort] ?? SORTERS.newest);
}
