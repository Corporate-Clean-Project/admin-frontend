import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import useAuthStore from '../stores/authStore';

const navItems = [
  { to: '/', label: 'Dashboard', icon: 'dashboard', end: true },
  { to: '/inquiries', label: 'Inquiries', icon: 'forum' },
  { to: '/content/about-us', label: 'About Us CMS', icon: 'edit_document' },
  { to: '/reviews', label: 'Reviews', icon: 'reviews' },
  { to: '/team', label: 'Team', icon: 'group', badgeText: 'ADMIN' },
];

export default function AdminLayout() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans text-slate-900 lg:h-screen lg:flex-row">
      <aside className="flex w-full shrink-0 flex-col border-b border-slate-200 bg-white lg:h-screen lg:w-64 lg:border-b-0 lg:border-r">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:h-20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-700 text-white rounded font-bold flex items-center justify-center font-serif text-xl">
              T
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-slate-900 leading-tight">Pristine</span>
              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Admin Portal</span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 lg:hidden"
            aria-label="Log out"
          >
            <span className="material-symbols-outlined">logout</span>
          </button>
        </div>

        <div className="hidden px-6 py-2 lg:block">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Navigation</p>
        </div>

        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-1 lg:flex-col lg:space-y-1 lg:overflow-visible lg:px-4 lg:pb-0">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex shrink-0 items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors lg:w-full ${isActive
                  ? 'bg-indigo-700 text-white'
                  : 'text-slate-600 hover:bg-slate-50'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-xl opacity-80">{item.icon}</span>
                {item.label}
              </div>
              {item.badge && (
                <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
              {item.badgeText && (
                <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                  {item.badgeText}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto hidden p-4 lg:block">
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors" onClick={handleLogout}>
            <div className="w-10 h-10 bg-indigo-100 text-indigo-700 rounded overflow-hidden flex items-center justify-center text-xs font-bold uppercase">
              {user?.name ? user.name.split(' ').map((n) => n[0]).join('').slice(0, 2) : 'AD'}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold text-slate-900 truncate">{user?.name || 'Admin'}</p>
              <p className="text-[11px] text-slate-500 truncate">{user?.email || ''}</p>
            </div>
            <span className="material-symbols-outlined text-slate-400 text-sm">logout</span>
          </div>
        </div>
      </aside>

      <main className="min-w-0 flex-1 overflow-y-auto">
        <div className="mx-auto max-w-7xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
