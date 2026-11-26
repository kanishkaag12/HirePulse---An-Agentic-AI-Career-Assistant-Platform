import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Camera,
  CircleCheck,
  Database,
  Lock,
  Mail,
  MapPin,
  Monitor,
  Moon,
  RotateCcw,
  Scale,
  Settings,
  ShieldCheck,
  Sun,
  Trash2,
  User,
} from 'lucide-react';
import Avatar from '../components/common/Avatar';
import Toggle from '../components/common/Toggle';
import ConfirmationModal from '../components/common/ConfirmationModal';
import ChartCard from '../components/dashboard/ChartCard';
import { useApp } from '../context/AppContext';
import { SORT_OPTIONS } from '../utils/historyFilters';
import { formatDate } from '../utils/format';

const TABS = [
  { to: '/app/profile', label: 'Profile', icon: User },
  { to: '/app/settings', label: 'Settings', icon: Settings },
];

const THEMES = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor },
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_AVATAR_SIZE = 1024 * 1024;

function ProfileTab() {
  const { profile, updateProfile, history } = useApp();
  const [draft, setDraft] = useState(profile);
  const [errors, setErrors] = useState({});
  const [avatarError, setAvatarError] = useState('');
  const [saved, setSaved] = useState(false);
  const fileRef = useRef(null);

  useEffect(() => {
    if (!saved) return undefined;
    const id = setTimeout(() => setSaved(false), 2500);
    return () => clearTimeout(id);
  }, [saved]);

  const isDirty = JSON.stringify(draft) !== JSON.stringify(profile);
  const setField = (field) => (event) => setDraft((d) => ({ ...d, [field]: event.target.value }));
  const average = history.length ? Math.round(history.reduce((sum, a) => sum + a.overallScore, 0) / history.length) : 0;

  const handleAvatar = (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setAvatarError('Please choose an image file.');
      return;
    }
    if (file.size > MAX_AVATAR_SIZE) {
      setAvatarError('Image must be smaller than 1 MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setAvatarError('');
      setDraft((d) => ({ ...d, avatar: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const next = {};
    if (!draft.name.trim()) next.name = 'Name is required.';
    if (!EMAIL_PATTERN.test(draft.email.trim())) next.email = 'Enter a valid email address.';
    setErrors(next);
    if (Object.keys(next).length) return;
    updateProfile({ ...draft, name: draft.name.trim(), email: draft.email.trim() });
    setSaved(true);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <form onSubmit={handleSubmit} noValidate className="card space-y-6 p-5 sm:p-6 lg:col-span-2">
        <div>
          <h3 className="font-semibold">Personal information</h3>
          <p className="text-sm text-muted">Update how your details appear across HirePulse.</p>
        </div>

        <div className="flex flex-wrap items-center gap-5">
          <Avatar name={draft.name} src={draft.avatar} size="lg" />
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              <input ref={fileRef} type="file" accept="image/*" className="sr-only" onChange={handleAvatar} />
              <button type="button" onClick={() => fileRef.current?.click()} className="btn btn-secondary py-2">
                <Camera className="h-4 w-4" />
                Upload photo
              </button>
              {draft.avatar && (
                <button type="button" onClick={() => setDraft((d) => ({ ...d, avatar: null }))} className="btn btn-ghost py-2">
                  Remove
                </button>
              )}
            </div>
            <p className={`text-xs ${avatarError ? 'text-rose-600' : 'text-muted'}`}>{avatarError || 'JPG or PNG, max 1 MB.'}</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="label">
              Full name
            </label>
            <input id="name" className="input" value={draft.name} onChange={setField('name')} aria-invalid={Boolean(errors.name)} />
            {errors.name && <p className="mt-1 text-xs text-rose-600">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="email" className="label">
              Email
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                id="email"
                type="email"
                className="input pl-9"
                value={draft.email}
                onChange={setField('email')}
                aria-invalid={Boolean(errors.email)}
              />
            </div>
            {errors.email && <p className="mt-1 text-xs text-rose-600">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="headline" className="label">
              Headline
            </label>
            <input id="headline" className="input" value={draft.headline} onChange={setField('headline')} placeholder="e.g. Frontend Developer" />
          </div>
          <div>
            <label htmlFor="location" className="label">
              Location
            </label>
            <div className="relative">
              <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input id="location" className="input pl-9" value={draft.location} onChange={setField('location')} />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-3 border-t border-line pt-5">
          {saved && (
            <span className="flex items-center gap-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400" role="status">
              <CircleCheck className="h-4 w-4" />
              Changes saved
            </span>
          )}
          <button type="button" onClick={() => setDraft(profile)} disabled={!isDirty} className="btn btn-secondary">
            Cancel
          </button>
          <button type="submit" disabled={!isDirty} className="btn btn-primary">
            Save changes
          </button>
        </div>
      </form>

      <div className="card h-fit p-6 text-center">
        <div className="flex justify-center">
          <Avatar name={profile.name} src={profile.avatar} size="lg" />
        </div>
        <p className="mt-4 font-semibold">{profile.name}</p>
        <p className="text-sm text-muted">{profile.headline}</p>
        <div className="mt-6 grid grid-cols-2 gap-3 text-left">
          <div className="rounded-xl bg-subtle/60 p-3">
            <p className="text-xs text-muted">Analyses</p>
            <p className="text-xl font-bold">{history.length}</p>
          </div>
          <div className="rounded-xl bg-subtle/60 p-3">
            <p className="text-xs text-muted">Avg. score</p>
            <p className="text-xl font-bold">{average}%</p>
          </div>
        </div>
        <p className="mt-4 text-xs text-muted">Member since {formatDate(profile.memberSince)}</p>
      </div>
    </div>
  );
}

function SettingsTab() {
  const { settings, updateSettings, history, clearHistory, resetDemoData } = useApp();
  const [modal, setModal] = useState(null);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    if (!notice) return undefined;
    const id = setTimeout(() => setNotice(''), 2500);
    return () => clearTimeout(id);
  }, [notice]);

  const confirmAction = () => {
    if (modal === 'clear') {
      clearHistory();
      setNotice('Analysis history cleared.');
    } else {
      resetDemoData();
      setNotice('Demo data restored.');
    }
    setModal(null);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        <ChartCard title="Appearance" subtitle="Choose how HirePulse looks to you">
          <div className="grid grid-cols-3 gap-3">
            {THEMES.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                type="button"
                onClick={() => updateSettings({ theme: value })}
                aria-pressed={settings.theme === value}
                className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-sm font-medium transition ${
                  settings.theme === value
                    ? 'border-brand-500 bg-brand-50 text-brand-700 ring-4 ring-brand-500/10 dark:bg-brand-500/10 dark:text-brand-300'
                    : 'border-line text-muted hover:bg-subtle hover:text-ink'
                }`}
              >
                <Icon className="h-5 w-5" />
                {label}
              </button>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Preferences" subtitle="Customize your experience">
          <div className="divide-y divide-line">
            <Toggle
              id="email-updates"
              label="Email updates"
              description="Receive a summary when an analysis completes (stored as a preference in this demo)."
              checked={settings.emailUpdates}
              onChange={(value) => updateSettings({ emailUpdates: value })}
            />
            <Toggle
              id="product-tips"
              label="Product tips"
              description="Show occasional tips for writing a clearer resume."
              checked={settings.productTips}
              onChange={(value) => updateSettings({ productTips: value })}
            />
            <Toggle
              id="sidebar-collapsed"
              label="Compact sidebar"
              description="Collapse the sidebar to icons on desktop."
              checked={settings.sidebarCollapsed}
              onChange={(value) => updateSettings({ sidebarCollapsed: value })}
            />
            <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <label htmlFor="default-sort" className="text-sm font-medium">
                  Default history sort
                </label>
                <p className="mt-0.5 text-sm text-muted">How the history page is sorted when you open it.</p>
              </div>
              <select
                id="default-sort"
                value={settings.defaultSort}
                onChange={(e) => updateSettings({ defaultSort: e.target.value })}
                className="input sm:w-48"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </ChartCard>

        <ChartCard title="Data management" subtitle="Everything is stored locally in this browser" icon={Database}>
          <div className="space-y-3">
            <div className="flex flex-col gap-3 rounded-xl border border-line p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium">Clear analysis history</p>
                <p className="text-sm text-muted">{history.length} saved analyses will be permanently removed.</p>
              </div>
              <button type="button" onClick={() => setModal('clear')} disabled={!history.length} className="btn btn-danger">
                <Trash2 className="h-4 w-4" />
                Clear history
              </button>
            </div>
            <div className="flex flex-col gap-3 rounded-xl border border-line p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium">Restore demo data</p>
                <p className="text-sm text-muted">Replace your history with the sample analyses.</p>
              </div>
              <button type="button" onClick={() => setModal('reset')} className="btn btn-secondary">
                <RotateCcw className="h-4 w-4" />
                Restore
              </button>
            </div>
            {notice && (
              <p className="flex items-center gap-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400" role="status">
                <CircleCheck className="h-4 w-4" />
                {notice}
              </p>
            )}
          </div>
        </ChartCard>
      </div>

      <ChartCard className="h-fit" title="Privacy" icon={ShieldCheck}>
        <ul className="space-y-4 text-sm">
          {[
            { icon: Lock, title: 'Local-only demo', text: 'Resumes are never uploaded. History, profile and settings stay in your browser storage.' },
            { icon: Scale, title: 'Informational scores', text: 'Match scores describe text alignment. They are not hiring decisions or predictions.' },
            { icon: CircleCheck, title: 'Honest guidance', text: 'Suggestions never ask you to add skills or experience you do not have.' },
          ].map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex gap-3">
              <Icon className="mt-0.5 h-4 w-4 shrink-0 text-brand-600 dark:text-brand-300" />
              <div>
                <p className="font-medium">{title}</p>
                <p className="text-muted">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </ChartCard>

      <ConfirmationModal
        open={Boolean(modal)}
        title={modal === 'clear' ? 'Clear all history?' : 'Restore demo data?'}
        message={
          modal === 'clear'
            ? 'All saved analyses will be permanently removed from this browser.'
            : 'Your current history will be replaced with the sample analyses.'
        }
        confirmLabel={modal === 'clear' ? 'Clear history' : 'Restore'}
        tone={modal === 'clear' ? 'danger' : 'primary'}
        onCancel={() => setModal(null)}
        onConfirm={confirmAction}
      />
    </div>
  );
}

export default function ProfileSettings({ tab = 'profile' }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{tab === 'profile' ? 'My Profile' : 'Settings'}</h2>
        <p className="mt-1 text-muted">
          {tab === 'profile' ? 'Manage your personal information.' : 'Manage preferences, appearance and your data.'}
        </p>
      </div>

      <div className="flex w-fit gap-1 rounded-xl border border-line bg-surface p-1">
        {TABS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
                isActive ? 'bg-brand-600 text-white shadow-sm' : 'text-muted hover:bg-subtle hover:text-ink'
              }`
            }
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </div>

      {tab === 'profile' ? <ProfileTab /> : <SettingsTab />}
    </div>
  );
}
