import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ArrowRight, Award, Clock, FileText, Gauge, Plus, Sparkles, TrendingUp } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import ChartCard from '../components/dashboard/ChartCard';
import HistoryTable from '../components/analysis/HistoryTable';
import SkillBadge from '../components/common/SkillBadge';
import EmptyState from '../components/common/EmptyState';
import { useApp } from '../context/AppContext';
import useChartTheme from '../hooks/useChartTheme';
import { filterAnalyses } from '../utils/historyFilters';
import { formatShortDate } from '../utils/format';

const MONTH = 30 * 24 * 60 * 60 * 1000;

function TrendTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload;
  return (
    <div className="rounded-xl border border-line bg-surface px-3 py-2 text-xs shadow-lg">
      <p className="font-semibold text-ink">{point.jobTitle}</p>
      <p className="text-muted">
        {point.company} · {point.date}
      </p>
      <p className="mt-1 font-semibold text-brand-600 dark:text-brand-300">{point.score}% match</p>
    </div>
  );
}

export default function Dashboard() {
  const { history } = useApp();
  const chart = useChartTheme();

  const stats = useMemo(() => {
    const scores = history.map((a) => a.overallScore);
    const best = history.reduce((top, a) => (!top || a.overallScore > top.overallScore ? a : top), null);
    return {
      total: history.length,
      average: scores.length ? Math.round(scores.reduce((sum, s) => sum + s, 0) / scores.length) : 0,
      best,
      recent: history.filter((a) => Date.now() - new Date(a.createdAt).getTime() <= MONTH).length,
    };
  }, [history]);

  const recentAnalyses = useMemo(() => filterAnalyses(history, { sort: 'newest' }).slice(0, 5), [history]);

  const trendData = useMemo(
    () =>
      filterAnalyses(history, { sort: 'oldest' })
        .slice(-8)
        .map((a) => ({ date: formatShortDate(a.createdAt), score: a.overallScore, jobTitle: a.jobTitle, company: a.company })),
    [history],
  );

  const skillGaps = useMemo(() => {
    const counts = {};
    history.forEach((a) =>
      a.unconfirmedSkills.forEach((skill) => {
        counts[skill] = (counts[skill] ?? 0) + 1;
      }),
    );
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6);
  }, [history]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Welcome back!</h2>
          <p className="mt-1 text-muted">Ready to improve your next job application?</p>
        </div>
        <Link to="/app/analyze" className="btn btn-primary">
          <Plus className="h-4 w-4" />
          Analyze New Resume
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Analyses" value={stats.total} icon={FileText} hint="All time" />
        <StatCard label="Average Match Score" value={`${stats.average}%`} icon={Gauge} tone="violet" hint="Across all analyses" />
        <StatCard
          label="Highest Match Score"
          value={`${stats.best?.overallScore ?? 0}%`}
          icon={Award}
          tone="emerald"
          hint={stats.best ? `${stats.best.jobTitle} · ${stats.best.company}` : 'No analyses yet'}
        />
        <StatCard label="Recent Analyses" value={stats.recent} icon={Clock} tone="amber" hint="In the last 30 days" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <ChartCard
          className="lg:col-span-2"
          title="Match score trend"
          subtitle="Your last analyses over time"
          icon={TrendingUp}
        >
          {trendData.length ? (
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData} margin={{ top: 10, right: 8, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="scoreFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={chart.primary} stopOpacity={0.3} />
                      <stop offset="100%" stopColor={chart.primary} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={chart.grid} vertical={false} />
                  <XAxis dataKey="date" tick={{ fill: chart.axis, fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 100]} ticks={[0, 25, 50, 75, 100]} tick={{ fill: chart.axis, fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<TrendTooltip />} cursor={{ stroke: chart.grid }} />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke={chart.primary}
                    strokeWidth={2.5}
                    fill="url(#scoreFill)"
                    dot={{ r: 4, fill: chart.primary, strokeWidth: 2, stroke: '#fff' }}
                    activeDot={{ r: 6 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <EmptyState title="No trend yet" description="Run your first analysis to start tracking your match scores." />
          )}
        </ChartCard>

        <div className="space-y-6">
          <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 to-violet-700 p-6 text-white shadow-soft">
            <Sparkles className="h-6 w-6 text-brand-200" />
            <h3 className="mt-4 text-lg font-semibold">Applying somewhere new?</h3>
            <p className="mt-1 text-sm text-brand-100">Check how well your resume aligns before you hit submit.</p>
            <Link to="/app/analyze" className="btn mt-5 w-full bg-white text-brand-700 hover:bg-brand-50">
              Analyze New Resume
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <ChartCard title="Skills to clarify" subtitle="Most often not clearly represented">
            {skillGaps.length ? (
              <div className="flex flex-wrap gap-2">
                {skillGaps.map(([skill, count]) => (
                  <SkillBadge key={skill} name={skill} variant="unconfirmed" count={count} />
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted">Nothing to show yet.</p>
            )}
          </ChartCard>
        </div>
      </div>

      <ChartCard
        title="Recent analyses"
        subtitle="Your latest resume–job comparisons"
        action={
          <Link to="/app/history" className="btn btn-ghost px-3 py-1.5 text-sm">
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        }
      >
        {recentAnalyses.length ? (
          <HistoryTable analyses={recentAnalyses} />
        ) : (
          <EmptyState
            title="No analyses yet"
            description="Upload your resume and a job description to get your first match score."
            action={
              <Link to="/app/analyze" className="btn btn-primary">
                <Plus className="h-4 w-4" />
                Start an analysis
              </Link>
            }
          />
        )}
      </ChartCard>
    </div>
  );
}
