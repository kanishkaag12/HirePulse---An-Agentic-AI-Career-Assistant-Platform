import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bell, ChevronDown, ChevronRight, LogOut, Menu, Search, Settings, User } from 'lucide-react';
import Dropdown from '../common/Dropdown';
import Avatar from '../common/Avatar';
import { useApp } from '../../context/AppContext';
import { NOTIFICATIONS } from '../../data/mockData';

const PAGES = [
  { path: '/app/dashboard', title: 'Dashboard' },
  { path: '/app/analyze', title: 'Analyze Resume' },
  { path: '/app/results', title: 'Analysis Results', parent: { label: 'Analysis History', to: '/app/history' } },
  { path: '/app/history', title: 'Analysis History' },
  { path: '/app/profile', title: 'My Profile' },
  { path: '/app/settings', title: 'Settings' },
];

function MenuLink({ to, icon: Icon, onClick, danger = false, children }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition ${
        danger ? 'text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10' : 'text-ink hover:bg-subtle'
      }`}
    >
      <Icon className="h-4 w-4" />
      {children}
    </Link>
  );
}

export default function Navbar({ onOpenMobile }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { profile } = useApp();
  const [search, setSearch] = useState('');
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const page = PAGES.find((p) => pathname.startsWith(p.path)) ?? { title: 'HirePulse' };
  const unreadCount = notifications.filter((n) => !n.read).length;
  const showSearch = !pathname.startsWith('/app/history');

  const handleSearch = (event) => {
    event.preventDefault();
    const query = search.trim();
    navigate(query ? `/app/history?q=${encodeURIComponent(query)}` : '/app/history');
    setSearch('');
  };

  const markRead = (id) => setNotifications((list) => list.map((n) => (id == null || n.id === id ? { ...n, read: true } : n)));

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-surface/80 backdrop-blur print:hidden">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onOpenMobile}
          className="-ml-1 rounded-lg p-2 text-muted hover:bg-subtle hover:text-ink lg:hidden"
          aria-label="Open navigation"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="min-w-0 flex-1">
          <nav className="hidden items-center gap-1 text-xs text-muted sm:flex" aria-label="Breadcrumb">
            <Link to="/app/dashboard" className="hover:text-ink">
              HirePulse
            </Link>
            {page.parent && (
              <>
                <ChevronRight className="h-3 w-3" />
                <Link to={page.parent.to} className="hover:text-ink">
                  {page.parent.label}
                </Link>
              </>
            )}
            <ChevronRight className="h-3 w-3" />
            <span className="text-ink">{page.title}</span>
          </nav>
          <h1 className="truncate text-base font-semibold sm:text-lg">{page.title}</h1>
        </div>

        {showSearch && (
          <form onSubmit={handleSearch} className="relative hidden w-64 md:block" role="search">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search analyses…"
              className="input py-2 pl-9"
              aria-label="Search analyses"
            />
          </form>
        )}

        <Dropdown
          width="w-80"
          trigger={({ toggle }) => (
            <button
              type="button"
              onClick={toggle}
              className="relative rounded-lg p-2 text-muted transition hover:bg-subtle hover:text-ink"
              aria-label={`Notifications (${unreadCount} unread)`}
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-surface" />}
            </button>
          )}
        >
          {({ close }) => (
            <>
              <div className="flex items-center justify-between border-b border-line px-4 py-3">
                <p className="text-sm font-semibold">Notifications</p>
                <button
                  type="button"
                  onClick={() => markRead()}
                  disabled={!unreadCount}
                  className="text-xs font-medium text-brand-600 hover:underline disabled:text-muted disabled:no-underline"
                >
                  Mark all as read
                </button>
              </div>
              <ul className="max-h-80 overflow-y-auto">
                {notifications.map((n) => (
                  <li key={n.id}>
                    <Link
                      to={n.link}
                      onClick={() => {
                        markRead(n.id);
                        close();
                      }}
                      className="flex gap-3 px-4 py-3 transition hover:bg-subtle"
                    >
                      <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${n.read ? 'bg-transparent' : 'bg-brand-500'}`} />
                      <span>
                        <span className="block text-sm font-medium">{n.title}</span>
                        <span className="block text-xs text-muted">{n.message}</span>
                        <span className="mt-1 block text-[11px] text-muted">{n.time}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </Dropdown>

        <Dropdown
          width="w-60"
          trigger={({ toggle, open }) => (
            <button
              type="button"
              onClick={toggle}
              className="flex items-center gap-2 rounded-xl p-1 transition hover:bg-subtle sm:pr-2"
              aria-label="Open profile menu"
              aria-expanded={open}
            >
              <Avatar name={profile.name} src={profile.avatar} size="sm" />
              <ChevronDown className={`hidden h-4 w-4 text-muted transition sm:block ${open ? 'rotate-180' : ''}`} />
            </button>
          )}
        >
          {({ close }) => (
            <>
              <div className="border-b border-line px-4 py-3">
                <p className="truncate text-sm font-semibold">{profile.name}</p>
                <p className="truncate text-xs text-muted">{profile.email}</p>
              </div>
              <div className="p-1.5">
                <MenuLink to="/app/profile" icon={User} onClick={close}>
                  My Profile
                </MenuLink>
                <MenuLink to="/app/settings" icon={Settings} onClick={close}>
                  Settings
                </MenuLink>
                <MenuLink to="/" icon={LogOut} onClick={close} danger>
                  Log out
                </MenuLink>
              </div>
            </>
          )}
        </Dropdown>
      </div>
    </header>
  );
}
