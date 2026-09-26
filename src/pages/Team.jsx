export default function Team() {
  return (
    <div className="p-8 font-sans bg-slate-50 min-h-screen">
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Team Provisioning & Access</h1>
        <p className="text-sm text-slate-500 font-medium max-w-2xl">Grant secure internal portal access to your core executive staff, architectural partners, and project coordinators. Ensure all permissions align with their designated operational purview.</p>
      </div>

      <div className="flex gap-8 items-start">
        
        {/* Left Column - Active Roster */}
        <div className="flex-[2] bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
             <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded bg-slate-200 text-slate-600 flex items-center justify-center shadow-inner">
                 <span className="material-symbols-outlined text-[18px]">shield_person</span>
               </div>
               <h2 className="text-sm font-bold text-slate-900">Active Admin Roster</h2>
             </div>
             <div className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                4 Active Licenses
             </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/50">
                  <th className="px-6 py-3 text-[10px] font-bold uppercase text-slate-500 tracking-wider">Member Details</th>
                  <th className="px-6 py-3 text-[10px] font-bold uppercase text-slate-500 tracking-wider">Operational Role</th>
                  <th className="px-6 py-3 text-[10px] font-bold uppercase text-slate-500 tracking-wider">Security Status</th>
                  <th className="px-6 py-3 text-[10px] font-bold uppercase text-slate-500 tracking-wider text-right">Access</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                
                {/* Row 1 */}
                <tr className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs shadow-sm">JV</div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">Julian Vance</p>
                        <p className="text-[11px] text-slate-500 font-mono mt-0.5">julian@toppristine.com</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded uppercase tracking-wider">Master Admin</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Online Now</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-slate-900 transition-colors opacity-50 cursor-not-allowed">
                       <span className="material-symbols-outlined text-[18px]">more_vert</span>
                    </button>
                  </td>
                </tr>

                {/* Row 2 */}
                <tr className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs shadow-sm">ER</div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">Emma Richards</p>
                        <p className="text-[11px] text-slate-500 font-mono mt-0.5">emma.r@toppristine.com</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-700 text-[10px] font-bold rounded uppercase tracking-wider">Client Coordinator</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500"><span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span> Active (2h ago)</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-slate-900 transition-colors">
                       <span className="material-symbols-outlined text-[18px]">more_vert</span>
                    </button>
                  </td>
                </tr>

                {/* Row 3 */}
                <tr className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs shadow-sm">MC</div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">Marcus Chen</p>
                        <p className="text-[11px] text-slate-500 font-mono mt-0.5">m.chen@toppristine.com</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-700 text-[10px] font-bold rounded uppercase tracking-wider">Project Estimator</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500"><span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span> Active (1d ago)</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-slate-900 transition-colors">
                       <span className="material-symbols-outlined text-[18px]">more_vert</span>
                    </button>
                  </td>
                </tr>

                {/* Row 4 */}
                <tr className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs shadow-sm border border-amber-200">SR</div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">Sophia Rossi</p>
                        <p className="text-[11px] text-slate-500 font-mono mt-0.5">s.rossi@toppristine.com</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-700 text-[10px] font-bold rounded uppercase tracking-wider">Lead Architect</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-600"><span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span> Pending Invite Acceptance</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-indigo-600 hover:text-indigo-800 text-[10px] font-bold uppercase transition-colors mr-3">
                       Resend
                    </button>
                    <button className="text-slate-400 hover:text-slate-900 transition-colors">
                       <span className="material-symbols-outlined text-[18px]">more_vert</span>
                    </button>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column - Invite Form */}
        <div className="flex-1 bg-white border-2 border-indigo-50 rounded-xl shadow-lg p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -z-10"></div>
          
          <div className="mb-8">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Provision New Architect / Staff</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Enter their credentials below. They will receive an encrypted magic link via email to set their private workstation password.</p>
          </div>

          <form className="space-y-5">
             <div>
                <label className="text-[10px] font-bold tracking-wider text-slate-500 uppercase block mb-1">Full Legal Name</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">badge</span>
                  <input type="text" placeholder="e.g. Robert Lang" className="w-full h-11 pl-10 pr-4 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-medium text-slate-900" />
                </div>
             </div>

             <div>
                <label className="text-[10px] font-bold tracking-wider text-slate-500 uppercase block mb-1">Work Email (Must be @toppristine.com)</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">mail</span>
                  <input type="email" placeholder="name@toppristine.com" className="w-full h-11 pl-10 pr-4 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-medium text-slate-900" />
                </div>
             </div>

             <div>
                <label className="text-[10px] font-bold tracking-wider text-slate-500 uppercase block mb-1">Role Assignment</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">admin_panel_settings</span>
                  <select className="w-full h-11 pl-10 pr-4 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-semibold text-slate-900 appearance-none cursor-pointer">
                    <option value="" disabled selected>Select an operational role...</option>
                    <option value="coordinator">Client Coordinator (Inquiries Only)</option>
                    <option value="architect">Lead Architect (Full Read, CMS Write)</option>
                    <option value="admin">Master Admin (Unrestricted)</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px] pointer-events-none">expand_more</span>
                </div>
             </div>
             
             <div className="pt-4">
                <button type="button" className="w-full h-12 bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-sm rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">forward_to_inbox</span> Send Invitation & Magic Link
                </button>
             </div>
          </form>
          
        </div>

      </div>

    </div>
  );
}
