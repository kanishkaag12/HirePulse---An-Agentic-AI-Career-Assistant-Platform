import { Link, useParams } from 'react-router-dom';
import { Cell, Pie, PieChart, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from 'recharts';
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  ChevronDown,
  CircleCheck,
  CircleDashed,
  ClipboardList,
  Download,
  FileSearch,
  FileText,
  Gauge,
  GraduationCap,
  KeyRound,
  LayoutDashboard,
  Lightbulb,
  Plus,
  Printer,
  ShieldCheck,
  Target,
} from 'lucide-react';
import ChartCard from '../components/dashboard/ChartCard';
import MatchScoreCircle from '../components/analysis/MatchScoreCircle';
import SuggestionCard from '../components/analysis/SuggestionCard';
import ProgressBar from '../components/common/ProgressBar';
import SkillBadge from '../components/common/SkillBadge';
import { StatusBadge } from '../components/common/ScoreBadge';
import EmptyState from '../components/common/EmptyState';
import DemoNotice from '../components/common/DemoNotice';
import Dropdown from '../components/common/Dropdown';
import { useApp } from '../context/AppContext';
import useChartTheme from '../hooks/useChartTheme';
import { formatDate } from '../utils/format';
import { buildTextReport, downloadTextFile } from '../utils/report';

const BREAKDOWN_ITEMS = [
  { key: 'skills', label: 'Skills Alignment', short: 'Skills', icon: Target, tone: 'brand' },
  { key: 'keywords', label: 'Keyword Alignment', short: 'Keywords', icon: KeyRound, tone: 'violet' },
  { key: 'experience', label: 'Experience Alignment', short: 'Experience', icon: Briefcase, tone: 'sky' },
  { key: 'education', label: 'Education Alignment', short: 'Education', icon: GraduationCap, tone: 'emerald' },
];

function ResultActions({ onDownload }) {
  return (
    <div className="flex flex-wrap gap-2 print:hidden">
      <Link to="/app/analyze" className="btn btn-primary">
        <Plus className="h-4 w-4" />
        Analyze Another Job
      </Link>
      <Link to="/app/dashboard" className="btn btn-secondary">
        <LayoutDashboard className="h-4 w-4" />
        Back to Dashboard
      </Link>
      <Dropdown
        width="w-56"
        trigger={({ toggle, open }) => (
          <button type="button" onClick={toggle} className="btn btn-secondary" aria-expanded={open}>
            <Download className="h-4 w-4" />
            Download Report
            <ChevronDown className={`h-4 w-4 transition ${open ? 'rotate-180' : ''}`} />
          </button>
        )}
      >
        {({ close }) => (
          <div className="p-1.5">
            <button
              type="button"
              onClick={() => {
                close();
                setTimeout(() => window.print(), 100);
              }}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm hover:bg-subtle"
            >
              <Printer className="h-4 w-4" />
              Print / Save as PDF
            </button>
            <button
              type="button"
              onClick={() => {
                close();
                onDownload();
              }}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm hover:bg-subtle"
            >
              <FileText className="h-4 w-4" />
              Download as text (.txt)
            </button>
          </div>
        )}
      </Dropdown>
    </div>
  );
}

function SummaryBlock({ title, icon: Icon, children }) {
  return (
    <div className="rounded-xl border border-line p-4">
      <p className="flex items-center gap-2 text-sm font-semibold">
        <Icon className="h-4 w-4 text-brand-600 dark:text-brand-300" />
        {title}
      </p>
      <div className="mt-3">{children}</div>
    </div>
  );
}

export default function AnalysisResults() {
  const { id } = useParams();
  const { getAnalysis } = useApp();
  const chart = useChartTheme();
  const analysis = getAnalysis(id);

  if (!analysis) {
    return (
      <div className="card">
        <EmptyState
          icon={FileSearch}
          title="Analysis not found"
          description="This analysis may have been deleted, or the link is incorrect."
          action={
            <>
              <Link to="/app/history" className="btn btn-secondary">
                Go to history
              </Link>
              <Link to="/app/analyze" className="btn btn-primary">
                New analysis
              </Link>
            </>
          }
        />
      </div>
    );
  }

  const { breakdown, keywords, jdSummary } = analysis;
  const radarData = BREAKDOWN_ITEMS.map((item) => ({ subject: item.short, value: breakdown[item.key] }));
  const keywordTotal = keywords.found.length + keywords.notFound.length;
  const coverage = keywordTotal ? Math.round((keywords.found.length / keywordTotal) * 100) : 0;
  const pieData = [
    { name: 'Found', value: keywords.found.length },
    { name: 'Not clearly represented', value: keywords.notFound.length },
  ];

  const handleDownload = () => {
    const slug = `${analysis.jobTitle}-${analysis.company}`.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    downloadTextFile(`hirepulse-report-${slug}.txt`, buildTextReport(analysis));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card p-5 sm:p-6">
        <Link to="/app/history" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink print:hidden">
          <ArrowLeft className="h-4 w-4" />
          Back to history
        </Link>
        <div className="mt-4 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{analysis.jobTitle}</h2>
              <StatusBadge score={analysis.overallScore} />
            </div>
            <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
              <span className="flex items-center gap-1.5">
                <Briefcase className="h-4 w-4" />
                {analysis.company}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {formatDate(analysis.createdAt)}
              </span>
              <span className="flex min-w-0 items-center gap-1.5">
                <FileText className="h-4 w-4 shrink-0" />
                <span className="truncate">{analysis.fileName}</span>
              </span>
            </div>
          </div>
          <ResultActions onDownload={handleDownload} />
        </div>
        {analysis.simulated && (
          <DemoNotice className="mt-5">
            <span className="font-semibold">Simulated analysis:</span> these results were generated with frontend demo data. Your
            resume content was not read and no NLP model was run.
            {analysis.usedFallback && ' Few known skills were detected in the pasted job description, so example skills are shown.'}
          </DemoNotice>
        )}
      </div>

      {/* A + B */}
      <div className="grid gap-6 lg:grid-cols-3">
        <ChartCard title="Overall Match Score" icon={Gauge}>
          <div className="flex flex-col items-center text-center">
            <MatchScoreCircle score={analysis.overallScore} size={200} label="Match" />
            <p className="mt-5 text-sm text-muted">
              This score represents the textual alignment between your resume and the job description. It is not a prediction of
              hiring success.
            </p>
          </div>
        </ChartCard>

        <ChartCard
          className="lg:col-span-2"
          title="Match Breakdown"
          subtitle="Illustrative mock values – not actual computed metrics"
          icon={Target}
        >
          <div className="grid items-center gap-6 md:grid-cols-2">
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} outerRadius="75%">
                  <PolarGrid stroke={chart.grid} />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: chart.axis, fontSize: 12 }} />
                  <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar dataKey="value" stroke={chart.primary} fill={chart.primary} fillOpacity={0.25} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-5">
              {BREAKDOWN_ITEMS.map((item) => (
                <ProgressBar key={item.key} label={item.label} value={breakdown[item.key]} icon={item.icon} tone={item.tone} />
              ))}
            </div>
          </div>
        </ChartCard>
      </div>

      {/* C + D */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard
          title="Matching Skills"
          subtitle="Represented in both your resume and the job description"
          icon={CircleCheck}
          action={<span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">{analysis.matchedSkills.length} skills</span>}
        >
          {analysis.matchedSkills.length ? (
            <div className="flex flex-wrap gap-2">
              {analysis.matchedSkills.map((skill) => (
                <SkillBadge key={skill} name={skill} variant="matched" />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted">No matching skills were identified in this simulated analysis.</p>
          )}
        </ChartCard>

        <ChartCard
          title="Missing or Unconfirmed Skills"
          subtitle="Not clearly represented in your resume"
          icon={CircleDashed}
          action={<span className="text-sm font-semibold text-amber-600 dark:text-amber-400">{analysis.unconfirmedSkills.length} skills</span>}
        >
          {analysis.unconfirmedSkills.length ? (
            <>
              <div className="flex flex-wrap gap-2">
                {analysis.unconfirmedSkills.map((skill) => (
                  <SkillBadge key={skill} name={skill} variant="unconfirmed" />
                ))}
              </div>
              <p className="mt-4 text-xs text-muted">
                This doesn't mean you lack these skills – only that they aren't clearly shown in your resume. If you have real
                experience with them, consider making it more visible.
              </p>
            </>
          ) : (
            <p className="text-sm text-muted">All detected skills appear to be represented.</p>
          )}
        </ChartCard>
      </div>

      {/* E */}
      <ChartCard title="Keyword Analysis" subtitle="Relevant terms from the job description" icon={KeyRound}>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="flex flex-col items-center">
            <div className="relative h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} dataKey="value" innerRadius={60} outerRadius={85} paddingAngle={2} stroke="none" startAngle={90} endAngle={-270}>
                    <Cell fill={chart.primary} />
                    <Cell fill={chart.empty} />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="pointer-events-none absolute inset-0 grid place-content-center text-center">
                <span className="text-3xl font-bold tabular-nums">{coverage}%</span>
                <span className="text-xs text-muted">coverage</span>
              </div>
            </div>
            <div className="mt-2 flex gap-4 text-xs text-muted">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-brand-500" /> Found
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-line" /> Not clearly represented
              </span>
            </div>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold">Keywords found ({keywords.found.length})</p>
            <div className="flex flex-wrap gap-2">
              {keywords.found.length ? (
                keywords.found.map((k) => <SkillBadge key={k} name={k} variant="brand" />)
              ) : (
                <p className="text-sm text-muted">None found.</p>
              )}
            </div>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold">Not clearly represented ({keywords.notFound.length})</p>
            <div className="flex flex-wrap gap-2">
              {keywords.notFound.length ? (
                keywords.notFound.map((k) => <SkillBadge key={k} name={k} variant="neutral" />)
              ) : (
                <p className="text-sm text-muted">All relevant keywords are represented.</p>
              )}
            </div>
          </div>
        </div>
      </ChartCard>

      {/* F */}
      <ChartCard
        title="Resume Improvement Suggestions"
        subtitle="Only apply suggestions that accurately reflect your experience"
        icon={Lightbulb}
      >
        <div className="grid gap-3 md:grid-cols-2">
          {analysis.suggestions.map((suggestion, index) => (
            <SuggestionCard key={suggestion.id} suggestion={suggestion} index={index} />
          ))}
        </div>
      </ChartCard>

      {/* G */}
      <ChartCard title="Job Description Summary" subtitle="Extracted-style summary of the posting" icon={ClipboardList}>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <SummaryBlock title="Required skills" icon={Target}>
            <div className="flex flex-wrap gap-1.5">
              {jdSummary.required.length ? (
                jdSummary.required.map((s) => <SkillBadge key={s} name={s} variant="neutral" />)
              ) : (
                <p className="text-sm text-muted">None detected.</p>
              )}
            </div>
          </SummaryBlock>
          <SummaryBlock title="Preferred skills" icon={Plus}>
            <div className="flex flex-wrap gap-1.5">
              {jdSummary.preferred.length ? (
                jdSummary.preferred.map((s) => <SkillBadge key={s} name={s} variant="neutral" />)
              ) : (
                <p className="text-sm text-muted">None detected.</p>
              )}
            </div>
          </SummaryBlock>
          <SummaryBlock title="Experience" icon={Briefcase}>
            <p className="text-sm">{jdSummary.experience}</p>
          </SummaryBlock>
          <SummaryBlock title="Responsibilities" icon={ClipboardList}>
            <ul className="list-disc space-y-1.5 pl-4 text-sm">
              {jdSummary.responsibilities.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </SummaryBlock>
        </div>
      </ChartCard>

      {/* Responsible use + H */}
      <div className="card flex flex-col gap-5 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex gap-3">
          <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-500" />
          <p className="text-sm text-muted">
            Automated similarity scores are informational and are not definitive hiring decisions. Use these insights alongside your
            own judgement.
          </p>
        </div>
        <ResultActions onDownload={handleDownload} />
      </div>
    </div>
  );
}
