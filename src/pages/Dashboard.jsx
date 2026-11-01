import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useDashboardStore from '../stores/dashboardStore';

function formatTimeAgo(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

function getInitials(name) {
  return (name || '?')
    .split(/[\s@.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join('');
}

export default function Dashboard() {
  const { stats, recentInquiries, inquiriesRequiringAction, loading, error, fetchStats } = useDashboardStore();

  useEffect(() => {
    fetchStats().catch(() => {});
  }, [fetchStats]);

  return (
    <div className="p-8 space-y-8 bg-slate-50 min-h-screen font-sans">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Executive Dashboard</h1>
      </div>
      {error && <p role="alert" className="rounded-lg bg-rose-50 px-4 py-2 text-sm text-rose-700">{error}</p>}

      {loading && !stats && (
        <div className="flex items-center justify-center py-20 text-sm text-slate-500">Loading dashboard…</div>
      )}

      {stats && (
        <>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">Total Inquiries</h2>
                <div className="w-8 h-8 rounded bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <span className="material-symbols-outlined text-[18px]">inbox</span>
                </div>
              </div>
              <p className="text-4xl font-bold text-slate-900 mb-2">{stats.totalInquiries}</p>
              <p className="text-xs font-semibold text-indigo-600 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">trending_up</span> +{stats.inquiriesToday} today
              </p>
            </div>

            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">New / Pending</h2>
                <div className="w-8 h-8 rounded bg-rose-50 flex items-center justify-center text-rose-600">
                  <span className="material-symbols-outlined text-[18px]">mail</span>
                </div>
              </div>
              <div className="flex items-end gap-3 mb-2">
                <p className="text-4xl font-bold text-slate-900">{stats.newInquiries}</p>
                {stats.newInquiries > 0 && (
                  <span className="bg-rose-100 text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded-full mb-1">Needs reply</span>
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">Quoted</h2>
                <div className="w-8 h-8 rounded bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <span className="material-symbols-outlined text-[18px]">payments</span>
                </div>
              </div>
              <p className="text-4xl font-bold text-slate-900 mb-2">{stats.quotedInquiries}</p>
              <p className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">check_circle</span> {stats.repliesToday} replies today
              </p>
            </div>

            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">Team Members</h2>
                <div className="w-8 h-8 rounded bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <span className="material-symbols-outlined text-[18px]">group</span>
                </div>
              </div>
              <div>
                <p className="text-4xl font-bold text-slate-900 mb-2">{stats.totalTeamMembers}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-500">Active members</p>
                  <Link to="/content/about-us" className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1">
                    Edit Content <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-6">
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <h2 className="text-lg font-bold text-slate-900">Inquiries Requiring Action</h2>
                    {inquiriesRequiringAction.length > 0 && (
                      <span className="bg-rose-100 text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded-full">{inquiriesRequiringAction.length} pending</span>
                    )}
                  </div>
                  <Link to="/inquiries" className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1">
                    View All in Inquiries <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </Link>
                </div>
                
                <div className="space-y-4">
                  {inquiriesRequiringAction.length === 0 && (
                    <p className="text-sm text-slate-500 text-center py-8">No inquiries requiring action right now.</p>
                  )}
                  {inquiriesRequiringAction.map((inquiry) => (
                    <div key={inquiry._id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-indigo-100 text-indigo-700 rounded flex items-center justify-center font-bold text-sm">{getInitials(inquiry.fullName)}</div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-bold text-slate-900">{inquiry.fullName}</p>
                            <span className="text-[10px] text-slate-400 font-semibold">• {formatTimeAgo(inquiry.createdAt)}</span>
                          </div>
                          <p className="text-xs font-semibold text-slate-700 mt-0.5">{inquiry.email}</p>
                          <p className="text-[11px] text-slate-500 mt-0.5 capitalize">{inquiry.type} inquiry</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-bold rounded capitalize">{inquiry.status}</span>
                        <Link to="/inquiries" className="px-4 py-2 bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-bold rounded shadow flex items-center gap-2 transition-colors">
                          <span className="material-symbols-outlined text-[14px]">mail</span> View
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <h2 className="text-sm font-bold text-slate-900 mb-4">Quick Shortcuts</h2>
                <div className="space-y-2">
                  <Link to="/inquiries" className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100 hover:border-indigo-300 transition-colors group">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-indigo-600 text-[18px]">inbox</span>
                      <span className="text-xs font-semibold text-slate-700 group-hover:text-indigo-700">Open Inquiries & Email</span>
                    </div>
                    <span className="material-symbols-outlined text-slate-400 text-[14px]">arrow_forward</span>
                  </Link>
                  <Link to="/content/about-us" className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100 hover:border-indigo-300 transition-colors group">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-indigo-600 text-[18px]">edit_document</span>
                      <span className="text-xs font-semibold text-slate-700 group-hover:text-indigo-700">Update About Us & Gallery</span>
                    </div>
                    <span className="material-symbols-outlined text-slate-400 text-[14px]">arrow_forward</span>
                  </Link>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-bold text-slate-900">Recent Activity</h2>
                  <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">Latest</span>
                </div>
                
                <div className="space-y-4 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-slate-100">
                  {recentInquiries.map((inquiry) => (
                    <div key={inquiry._id} className="relative flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-indigo-50 border border-white flex items-center justify-center shrink-0 z-10">
                        <span className="material-symbols-outlined text-indigo-600 text-[14px]">{inquiry.type === 'quote' ? 'request_quote' : 'inbox'}</span>
                      </div>
                      <div>
                        <p className="text-xs text-slate-700"><span className="font-bold">{inquiry.type === 'quote' ? 'Quote request' : 'New inquiry'}</span> from <span className="font-bold">{inquiry.fullName}</span></p>
                        <p className="text-[10px] text-slate-400 mt-1">{formatTimeAgo(inquiry.createdAt)}</p>
                      </div>
                    </div>
                  ))}
                  {recentInquiries.length === 0 && (
                    <p className="text-xs text-slate-500 text-center py-4">No recent activity</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
