import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { to: '/', label: 'Dashboard', icon: 'dashboard', end: true },
  { to: '/inquiries', label: 'Inquiries', icon: 'forum', badge: '12' },
  { to: '/content/about-us', label: 'About Us CMS', icon: 'edit_document' },
  { to: '/team', label: 'Invite Team', icon: 'group', badgeText: 'ADMIN' },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans">
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0">
        <div className="h-20 flex items-center px-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-700 text-white rounded font-bold flex items-center justify-center font-serif text-xl">
              T
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-slate-900 leading-tight">Top Pristine</span>
              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Admin Portal</span>
            </div>
          </div>
        </div>
        
        <div className="px-6 py-2">
          <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-2">Navigation</p>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  isActive
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

        <div className="p-4 mt-auto">
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors" onClick={handleLogout}>
            <div className="w-10 h-10 bg-slate-300 rounded overflow-hidden flex items-center justify-center text-xs text-slate-600 font-bold uppercase">
              img
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold text-slate-900 truncate">{user?.name || 'Julian Vance'}</p>
              <p className="text-[11px] text-slate-500 truncate">Master Craftsman</p>
            </div>
            <span className="material-symbols-outlined text-slate-400 text-sm">logout</span>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
