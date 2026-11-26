import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useApp } from '../../context/AppContext';

export default function DashboardLayout() {
  const { settings, updateSettings } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const collapsed = settings.sidebarCollapsed;

  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-canvas">
      <Sidebar
        collapsed={collapsed}
        onToggleCollapse={() => updateSettings({ sidebarCollapsed: !collapsed })}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />
      <div className={`transition-[padding] duration-200 print:!pl-0 ${collapsed ? 'lg:pl-20' : 'lg:pl-64'}`}>
        <Navbar onOpenMobile={() => setMobileOpen(true)} />
        <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
