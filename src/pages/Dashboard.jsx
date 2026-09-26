import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="p-8 space-y-8 bg-slate-50 min-h-screen font-sans">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Executive Dashboard</h1>
        <div className="flex bg-slate-100 rounded-lg p-1 border border-slate-200">
          <button className="px-4 py-1.5 text-xs font-semibold bg-white rounded shadow-sm text-slate-900">Today</button>
          <button className="px-4 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-900">This Week</button>
          <button className="px-4 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-900">This Month</button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">Total Active Inquiries</h2>
            <div className="w-8 h-8 rounded bg-indigo-50 flex items-center justify-center text-indigo-600">
              <span className="material-symbols-outlined text-[18px]">inbox</span>
            </div>
          </div>
          <p className="text-4xl font-bold text-slate-900 mb-2">24</p>
          <p className="text-xs font-semibold text-indigo-600 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">trending_up</span> +3 new today
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">Pending Email Replies</h2>
            <div className="w-8 h-8 rounded bg-rose-50 flex items-center justify-center text-rose-600">
              <span className="material-symbols-outlined text-[18px]">mail</span>
            </div>
          </div>
          <div className="flex items-end gap-3 mb-2">
            <p className="text-4xl font-bold text-slate-900">5</p>
            <span className="bg-rose-100 text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded-full mb-1">Needs reply</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">Active Pipeline Value</h2>
            <div className="w-8 h-8 rounded bg-emerald-50 flex items-center justify-center text-emerald-600">
              <span className="material-symbols-outlined text-[18px]">payments</span>
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">$485,200</p>
          <p className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">arrow_upward</span> +12% vs last month
          </p>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">About Us CMS Status</h2>
            <div className="w-8 h-8 rounded bg-indigo-50 flex items-center justify-center text-indigo-600">
              <span className="material-symbols-outlined text-[18px]">sync</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Published & Live
            </p>
            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-500">Synced 2h ago</p>
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
                <span className="bg-rose-100 text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded-full">5 pending</span>
              </div>
              <Link to="/inquiries" className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1">
                View All in Inquiries <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </Link>
            </div>
            
            <div className="space-y-4">
              {/* List Item 1 */}
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-indigo-100 text-indigo-700 rounded flex items-center justify-center font-bold text-sm">CD</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-slate-900">Claire Dubois</p>
                      <span className="text-[10px] text-slate-400 font-semibold">• 2 hours ago</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-700 mt-0.5">Estate Heritage Retrofit</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Phase I Structural & Millwork</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <p className="text-base font-bold text-slate-900">$94,000</p>
                  <button className="px-4 py-2 bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-bold rounded shadow flex items-center gap-2 transition-colors">
                    <span className="material-symbols-outlined text-[14px]">mail</span> Reply via Email
                  </button>
                </div>
              </div>

              {/* List Item 2 */}
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-indigo-100 text-indigo-700 rounded flex items-center justify-center font-bold text-sm">MV</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-slate-900">Marcus Vance</p>
                      <span className="text-[10px] text-slate-400 font-semibold">• 5 hours ago</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-700 mt-0.5">Yorkville Penthouse Master Suite</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Custom Walnut Veneer & Brass</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <p className="text-base font-bold text-slate-900">$62,000</p>
                  <button className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded shadow-sm flex items-center gap-2 transition-colors">
                    View Details <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </button>
                </div>
              </div>

              {/* List Item 3 */}
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-indigo-100 text-indigo-700 rounded flex items-center justify-center font-bold text-sm">SJ</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-slate-900">Sarah Jenkins</p>
                      <span className="text-[10px] text-slate-400 font-semibold">• 2 days ago</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-700 mt-0.5">Bridle Path Spa Sanctuary</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Nordic Hinoki Wood Finishes</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <p className="text-base font-bold text-slate-900">$33,000</p>
                  <button className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded shadow-sm flex items-center gap-2 transition-colors">
                    View Details <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </button>
                </div>
              </div>

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
              <a href="#" className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100 hover:border-indigo-300 transition-colors group">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-indigo-600 text-[18px]">open_in_new</span>
                  <span className="text-xs font-semibold text-slate-700 group-hover:text-indigo-700">View Live Client Website</span>
                </div>
                <span className="material-symbols-outlined text-slate-400 text-[14px]">north_east</span>
              </a>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-slate-900">Today's Activity</h2>
              <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">Realtime</span>
            </div>
            
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-slate-100">
              
              <div className="relative flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-indigo-50 border border-white flex items-center justify-center shrink-0 z-10">
                  <span className="material-symbols-outlined text-indigo-600 text-[14px]">mail</span>
                </div>
                <div>
                  <p className="text-xs text-slate-700"><span className="font-bold">Email sent</span> to <span className="font-bold">Dr. Aris Thorne</span> with architectural proposal.</p>
                  <p className="text-[10px] text-slate-400 mt-1">4h ago</p>
                </div>
              </div>

              <div className="relative flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-indigo-50 border border-white flex items-center justify-center shrink-0 z-10">
                  <span className="material-symbols-outlined text-indigo-600 text-[14px]">inbox</span>
                </div>
                <div>
                  <p className="text-xs text-slate-700"><span className="font-bold">New inquiry</span> received from <span className="font-bold">Claire Dubois</span>.</p>
                  <p className="text-[10px] text-slate-400 mt-1">5h ago</p>
                </div>
              </div>

              <div className="relative flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-indigo-50 border border-white flex items-center justify-center shrink-0 z-10">
                  <span className="material-symbols-outlined text-indigo-600 text-[14px]">edit</span>
                </div>
                <div>
                  <p className="text-xs text-slate-700"><span className="font-bold">About Us</span> founder bio updated & published.</p>
                  <p className="text-[10px] text-slate-400 mt-1">2h ago</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
