import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CircleCheck,
  CircleDashed,
  ClipboardList,
  FileText,
  Gauge,
  Layers,
  Lightbulb,
  Lock,
  Menu,
  Scale,
  ShieldCheck,
  Target,
  TrendingUp,
  Upload,
  X,
} from 'lucide-react';
import Logo from '../components/common/Logo';

const NAV_LINKS = [
  { href: '#features', label: 'Features' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#about', label: 'About' },
];

const FEATURES = [
  {
    icon: FileText,
    title: 'Resume Analysis',
    description: 'Upload a PDF or DOCX resume and get a structured view of how your skills and experience come across.',
  },
  {
    icon: Target,
    title: 'Job Description Matching',
    description: 'Compare your resume with any job posting and see a clear, explainable alignment score.',
  },
  {
    icon: Layers,
    title: 'Skill Gap Analysis',
    description: 'See which required skills are well represented and which are not clearly shown in your resume.',
  },
  {
    icon: Lightbulb,
    title: 'Personalized Suggestions',
    description: 'Get practical, honest recommendations to present your real experience more clearly.',
  },
];

const STEPS = [
  { icon: Upload, title: 'Upload Your Resume', description: 'Drag and drop your resume as a PDF or DOCX file.' },
  { icon: ClipboardList, title: 'Add Job Description', description: 'Paste the posting for the role you want to apply for.' },
  { icon: Gauge, title: 'Analyze Your Match', description: 'Review your match score, skills and keyword coverage.' },
  { icon: TrendingUp, title: 'Improve Your Resume', description: 'Apply focused suggestions and present your strengths clearly.' },
];

const BENEFITS = [
  'Understand exactly which requirements your resume already covers',
  'Spot skills that are present in your experience but not clearly written down',
  'Tailor each application without rewriting your resume from scratch',
  'Track your alignment across every role you apply for',
];

const STATS = [
  { value: '4', label: 'Alignment dimensions' },
  { value: 'PDF & DOCX', label: 'Supported formats' },
  { value: '< 1 min', label: 'To your first insight' },
  { value: 'Local', label: 'Demo data stays in your browser' },
];

function HeroPreview() {
  const bars = [
    ['Skills', 85, 'bg-brand-500'],
    ['Keywords', 72, 'bg-violet-500'],
    ['Experience', 68, 'bg-sky-500'],
    ['Education', 90, 'bg-emerald-500'],
  ];
  const circumference = 2 * Math.PI * 50;

  return (
    <div className="relative">
      <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-tr from-brand-200/60 via-violet-200/40 to-transparent blur-2xl dark:from-brand-500/20 dark:via-violet-500/10" />
      <div className="card overflow-hidden">
        <div className="flex items-center gap-2 border-b border-line bg-subtle/60 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-rose-400" />
          <span className="h-3 w-3 rounded-full bg-amber-400" />
          <span className="h-3 w-3 rounded-full bg-emerald-400" />
          <span className="ml-3 truncate text-xs text-muted">hirepulse.app/results · Frontend Developer – Google</span>
        </div>

        <div className="grid gap-5 p-5 sm:grid-cols-5 sm:p-6">
          <div className="flex flex-col items-center justify-center rounded-xl border border-line p-4 sm:col-span-2">
            <div className="relative h-28 w-28">
              <svg viewBox="0 0 120 120" className="h-28 w-28 -rotate-90">
                <circle cx="60" cy="60" r="50" fill="none" strokeWidth="10" className="stroke-subtle" />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  strokeWidth="10"
                  strokeLinecap="round"
                  stroke="#6366f1"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference * (1 - 0.78)}
                />
              </svg>
              <span className="absolute inset-0 grid place-content-center text-3xl font-bold">78%</span>
            </div>
            <p className="mt-2 text-xs font-medium text-muted">Overall match score</p>
          </div>

          <div className="space-y-3 sm:col-span-3">
            {bars.map(([label, value, color]) => (
              <div key={label}>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="font-medium">{label}</span>
                  <span className="text-muted">{value}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-subtle">
                  <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 sm:col-span-5">
            {['React', 'JavaScript', 'REST APIs', 'Git'].map((skill) => (
              <span key={skill} className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300">
                <CircleCheck className="h-3 w-3" />
                {skill}
              </span>
            ))}
            {['Docker', 'AWS'].map((skill) => (
              <span key={skill} className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300">
                <CircleDashed className="h-3 w-3" />
                {skill}
              </span>
            ))}
          </div>

          <div className="flex items-start gap-3 rounded-xl bg-brand-50 p-3 text-xs text-brand-900 dark:bg-brand-500/10 dark:text-brand-200 sm:col-span-5">
            <Lightbulb className="h-4 w-4 shrink-0" />
            Add a project description that clearly shows how you used REST APIs.
          </div>
        </div>
      </div>

      <div className="card absolute -bottom-5 -left-5 hidden items-center gap-3 px-4 py-3 sm:flex">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10">
          <CircleCheck className="h-5 w-5" />
        </span>
        <div>
          <p className="text-sm font-semibold">6 matching skills</p>
          <p className="text-xs text-muted">2 not clearly represented</p>
        </div>
      </div>
    </div>
  );
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-300">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-lg text-muted">{description}</p>}
    </div>
  );
}

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const year = new Date().getFullYear();

  return (
    <div className="overflow-x-hidden bg-canvas">
      {/* Navbar */}
      <header className="sticky top-0 z-40 border-b border-line/70 bg-canvas/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" aria-label="HirePulse home">
            <Logo />
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="text-sm font-medium text-muted transition hover:text-ink">
                {link.label}
              </a>
            ))}
          </nav>
          <div className="hidden items-center gap-2 md:flex">
            <Link to="/app/dashboard" className="btn btn-ghost">
              Sign In
            </Link>
            <Link to="/app/analyze" className="btn btn-primary">
              Get Started
            </Link>
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="rounded-lg p-2 text-muted hover:bg-subtle md:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {menuOpen && (
          <div className="animate-fade-in border-t border-line bg-surface px-4 py-4 md:hidden">
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-muted hover:bg-subtle hover:text-ink"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Link to="/app/dashboard" className="btn btn-secondary">
                Sign In
              </Link>
              <Link to="/app/analyze" className="btn btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-x-0 top-0 -z-10 h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.12),transparent_60%)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:pb-28 lg:pt-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-300">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              Resume–job alignment, explained
            </span>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Your Resume.
              <br />
              <span className="bg-gradient-to-r from-brand-600 to-violet-600 bg-clip-text text-transparent">Your Next Opportunity.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted">
              HirePulse helps you understand how closely your resume aligns with a job description. See matching skills, requirements
              that aren't clearly represented, and practical ways to present your real experience better.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/app/analyze" className="btn btn-primary px-6 py-3 text-base">
                Analyze My Resume
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#features" className="btn btn-secondary px-6 py-3 text-base">
                Explore Features
              </a>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
              <span className="flex items-center gap-2">
                <CircleCheck className="h-4 w-4 text-emerald-500" /> No sign-up needed for the demo
              </span>
              <span className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-emerald-500" /> Files stay in your browser
              </span>
            </div>
          </div>
          <HeroPreview />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="scroll-mt-20 border-y border-line bg-surface py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Features"
            title="Everything you need to tailor your application"
            description="Clear, explainable insights that help you present your experience for each specific role."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map(({ icon: Icon, title, description }) => (
              <div key={title} className="group rounded-2xl border border-line bg-canvas p-6 transition hover:-translate-y-1 hover:border-brand-300 hover:shadow-soft dark:hover:border-brand-500/40">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-600 transition group-hover:bg-brand-600 group-hover:text-white dark:bg-brand-500/10 dark:text-brand-300">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="scroll-mt-20 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="How It Works" title="From resume to insight in four steps" />
          <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(({ icon: Icon, title, description }, index) => (
              <li key={title} className="card relative p-6">
                <span className="absolute right-5 top-5 text-4xl font-extrabold text-subtle">0{index + 1}</span>
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-violet-600 text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted">{description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Benefits / About */}
      <section id="about" className="scroll-mt-20 border-y border-line bg-surface py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-300">Why HirePulse</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Built for candidates, not keyword stuffing</h2>
            <p className="mt-4 text-lg text-muted">
              HirePulse focuses on clarity. It helps you communicate the experience you actually have – it never encourages adding
              skills you don't.
            </p>
            <ul className="mt-8 space-y-4">
              {BENEFITS.map((benefit) => (
                <li key={benefit} className="flex gap-3">
                  <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-line bg-canvas p-6">
                <p className="text-2xl font-bold tracking-tight text-brand-600 dark:text-brand-300 sm:text-3xl">{stat.value}</p>
                <p className="mt-2 text-sm text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy & responsible use */}
      <section id="privacy" className="scroll-mt-20 py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="card grid gap-8 p-8 sm:p-10 md:grid-cols-[auto,1fr]">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
              <ShieldCheck className="h-7 w-7" />
            </span>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Privacy & responsible use</h2>
              <p className="mt-3 text-muted">
                Automated similarity scores are informational. They describe how closely the text of your resume aligns with a job
                description – they are not hiring decisions and do not predict whether you will get an interview or an offer.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {[
                  { icon: Scale, title: 'Informational only', text: 'Scores support your judgement – they never replace it.' },
                  { icon: Lock, title: 'Your data, your control', text: 'The demo stores history only in your browser.' },
                  { icon: CircleCheck, title: 'Honest suggestions', text: 'We never suggest inventing skills or experience.' },
                ].map(({ icon: Icon, title, text }) => (
                  <div key={title} className="rounded-xl bg-subtle/60 p-4">
                    <Icon className="h-5 w-5 text-brand-600 dark:text-brand-300" />
                    <p className="mt-2 text-sm font-semibold">{title}</p>
                    <p className="mt-1 text-xs text-muted">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-violet-700 px-6 py-14 text-center text-white sm:px-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to see how your resume aligns?</h2>
          <p className="mx-auto mt-4 max-w-xl text-brand-100">Upload your resume, paste a job description and get clear insights in under a minute.</p>
          <Link to="/app/analyze" className="btn mt-8 bg-white px-6 py-3 text-base text-brand-700 hover:bg-brand-50">
            Analyze My Resume
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-line bg-surface">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm text-muted">
              Understand your resume–job alignment and present your real experience with confidence.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold">Product</p>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              <li><a href="#features" className="hover:text-ink">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-ink">How It Works</a></li>
              <li><a href="#privacy" className="hover:text-ink">Privacy</a></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold">App</p>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              <li><Link to="/app/dashboard" className="hover:text-ink">Dashboard</Link></li>
              <li><Link to="/app/analyze" className="hover:text-ink">Analyze Resume</Link></li>
              <li><Link to="/app/history" className="hover:text-ink">Analysis History</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-line">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-muted sm:flex-row sm:justify-between sm:px-6 lg:px-8">
            <p>© {year} HirePulse. All rights reserved.</p>
            <p>Prototype – analysis results are simulated with demo data.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
