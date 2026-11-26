import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ChevronsLeft, ChevronsRight, FileSearch, History, LayoutDashboard, LogOut, Settings, User, X } from 'lucide-react';
import Logo from '../common/Logo';
import Avatar from '../common/Avatar';
import { useApp } from '../../context/AppContext';

export const NAV_ITEMS = [
  { to: '/app/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/app/analyze', label: 'Analyze Resume', icon: FileSearch },
  { to: '/app/history', label: 'Analysis History', icon: History },
  { to: '/app/profile', label: 'My Profile', icon: User },
  { to: '/app/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ collapsed, onToggleCollapse, mobileOpen, onCloseMobile }) {
  const { profile } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    onCloseMobile();
    navigate('/');
  };

  const renderNav = (compact) => (
    <>
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4" aria-label="Main navigation">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onCloseMobile}
            title={compact ? label : undefined}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${compact ? 'justify-center' : ''} ${
                isActive
                  ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300'
                  : 'text-muted hover:bg-subtle hover:text-ink'
              }`
            }
          >
            <Icon className="h-5 w-5 shrink-0" />
            {!compact && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-line p-3">
        <div className={`flex items-center gap-3 rounded-xl p-2 ${compact ? 'flex-col' : ''}`}>
          <Avatar name={profile.name} src={profile.avatar} size="sm" />
          {!compact && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{profile.name}</p>
              <p className="truncate text-xs text-muted">{profile.email}</p>
            </div>
          )}
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg p-2 text-muted transition hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10"
            title="Log out"
            aria-label="Log out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 hidden flex-col border-r border-line bg-surface transition-[width] duration-200 print:hidden lg:flex ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div className={`flex h-16 items-center border-b border-line px-4 ${collapsed ? 'justify-center' : 'justify-between'}`}>
          <Link to="/app/dashboard" aria-label="HirePulse dashboard">
            <Logo collapsed={collapsed} />
          </Link>
          {!collapsed && (
            <button
              type="button"
              onClick={onToggleCollapse}
              className="rounded-lg p-1.5 text-muted transition hover:bg-subtle hover:text-ink"
              aria-label="Collapse sidebar"
            >
              <ChevronsLeft className="h-4 w-4" />
            </button>
          )}
        </div>
        {collapsed && (
          <button
            type="button"
            onClick={onToggleCollapse}
            className="mx-auto mt-3 rounded-lg p-2 text-muted transition hover:bg-subtle hover:text-ink"
            aria-label="Expand sidebar"
          >
            <ChevronsRight className="h-4 w-4" />
          </button>
        )}
        {renderNav(collapsed)}
      </aside>

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-50 print:hidden lg:hidden ${mobileOpen ? '' : 'pointer-events-none'}`} aria-hidden={!mobileOpen}>
        <div
          className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity ${mobileOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={onCloseMobile}
        />
        <aside
          className={`absolute inset-y-0 left-0 flex w-72 max-w-[85%] flex-col bg-surface shadow-xl transition-transform duration-200 ${
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex h-16 items-center justify-between border-b border-line px-4">
            <Logo />
            <button
              type="button"
              onClick={onCloseMobile}
              className="rounded-lg p-2 text-muted hover:bg-subtle hover:text-ink"
              aria-label="Close navigation"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          {renderNav(false)}
        </aside>
      </div>
    </>
  );
}
