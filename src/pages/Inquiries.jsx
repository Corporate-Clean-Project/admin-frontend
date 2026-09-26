export default function Inquiries() {
  return (
    <div className="p-8 h-full flex flex-col font-sans bg-slate-50 min-h-screen">
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Inquiries & Client Valuation</h1>
        <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2.5 py-1 rounded-full">Live Pipeline</span>
      </div>

      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div className="flex bg-white rounded-lg p-1 border border-slate-200 shadow-sm overflow-hidden flex-1 min-w-[300px]">
          <button className="flex-1 px-4 py-2 text-xs font-bold bg-indigo-700 text-white rounded shadow-sm flex flex-col items-center justify-center leading-tight">
            All Inquiries <span className="text-[10px]">24</span>
          </button>
          <button className="flex-1 px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 rounded flex flex-col items-center justify-center leading-tight">
            Awaiting Reply <span className="text-[10px] text-amber-500 font-bold">5</span>
          </button>
          <button className="flex-1 px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 rounded flex flex-col items-center justify-center leading-tight">
            Under Review <span className="text-[10px] text-indigo-500 font-bold">11</span>
          </button>
          <button className="flex-1 px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 rounded flex flex-col items-center justify-center leading-tight">
            Closed / Contracted <span className="text-[10px] text-emerald-500 font-bold">8</span>
          </button>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">search</span>
            <input
              type="text"
              placeholder="Filter by client, address or scope..."
              className="pl-9 pr-4 py-2 w-64 text-xs bg-white border border-slate-200 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <button className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">tune</span> Valuation Range
          </button>
        </div>
      </div>

      <div className="flex gap-6 flex-1 min-h-0">
        
        {/* Left Column - Active Conversations */}
        <div className="w-1/3 flex flex-col bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex-shrink-0">
          <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <h2 className="text-[11px] font-bold tracking-wider text-slate-500 uppercase">Active Conversations (4)</h2>
            <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-emerald-600 uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Auto-sync active
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Inquiry 1 (Selected) */}
            <div className="p-4 rounded-xl border-2 border-indigo-600 bg-white shadow-sm relative cursor-pointer">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600 rounded-l-xl"></div>
              <div className="flex justify-between items-start mb-3 pl-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                    {/* Fake img */}
                    <img src="https://i.pravatar.cc/100?img=5" alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1">Claire Dubois <span className="material-symbols-outlined text-indigo-600 text-[14px]">verified</span></h3>
                    <p className="text-[10px] text-slate-500">Dubois & Assoc. Studio</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-900">$94,000</p>
                  <p className="text-[10px] text-slate-500">Est. Scope</p>
                </div>
              </div>
              <div className="flex items-center justify-between mb-3 pl-2">
                <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-bold rounded flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Awaiting Reply
                </span>
                <span className="text-[11px] font-semibold text-slate-700 truncate max-w-[120px]">Estate Heritage Retrofit</span>
                <span className="text-[10px] text-slate-400">2h ago</span>
              </div>
              <p className="text-xs text-slate-500 line-clamp-2 pl-2">
                Dear Julian, our design studio is coordinating the Bridle Path estate expansion. We have finalized architectural schematic...
              </p>
              <div className="mt-3 text-right">
                <span className="material-symbols-outlined text-indigo-600 text-[18px]">arrow_forward</span>
              </div>
            </div>

            {/* Inquiry 2 */}
            <div className="p-4 rounded-xl border border-slate-100 bg-white hover:border-indigo-200 hover:shadow-md transition-all cursor-pointer">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                    <img src="https://i.pravatar.cc/100?img=11" alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Marcus Vance</h3>
                    <p className="text-[10px] text-slate-500">Private Client</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-900">$62,000</p>
                  <p className="text-[10px] text-slate-500">Est. Scope</p>
                </div>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded">
                  Reviewed
                </span>
                <span className="text-[11px] font-semibold text-slate-700 truncate max-w-[120px]">Yorkville Penthouse</span>
                <span className="text-[10px] text-slate-400">5h ago</span>
              </div>
              <p className="text-xs text-slate-500 line-clamp-2">
                Julian, loved the custom acoustic ceiling battens you installed at the Avenue Rd residence. We are revamping our 4,200 sq...
              </p>
              <div className="mt-3 text-right">
                <span className="material-symbols-outlined text-slate-300 text-[18px]">arrow_forward</span>
              </div>
            </div>

            {/* Inquiry 3 */}
            <div className="p-4 rounded-xl border border-slate-100 bg-white hover:border-indigo-200 hover:shadow-md transition-all cursor-pointer">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                    <img src="https://i.pravatar.cc/100?img=9" alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Sarah Jenkins</h3>
                    <p className="text-[10px] text-slate-500">Jenkins Interior Studio</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-900">$33,000</p>
                  <p className="text-[10px] text-slate-500">Est. Scope</p>
                </div>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded">
                  In Progress
                </span>
                <span className="text-[11px] font-semibold text-slate-700 truncate max-w-[120px]">Ensuite Spa Sanctuary</span>
                <span className="text-[10px] text-slate-400">Yesterday</span>
              </div>
              <p className="text-xs text-slate-500 line-clamp-2">
                Looking for water-resistant teak vanities and seamless wall panels for an executive master suite. Material schedule is...
              </p>
              <div className="mt-3 text-right">
                <span className="material-symbols-outlined text-slate-300 text-[18px]">arrow_forward</span>
              </div>
            </div>

             {/* Inquiry 4 */}
             <div className="p-4 rounded-xl border-l-4 border-l-indigo-600 border border-slate-100 bg-indigo-50/50 hover:shadow-md transition-all cursor-pointer">
              <div className="flex justify-between items-start mb-3 pl-1">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                    <img src="https://i.pravatar.cc/100?img=33" alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Robert Lang</h3>
                    <p className="text-[10px] text-slate-500">Private Residence</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-900">$125,000</p>
                  <p className="text-[10px] text-slate-500">Est. Scope</p>
                </div>
              </div>
              <div className="flex items-center justify-between mb-3 pl-1">
                <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-[10px] font-bold rounded">
                  Proposal Ready
                </span>
                <span className="text-[11px] font-semibold text-slate-700 truncate max-w-[120px]">Custom Walnut Joinery</span>
                <span className="text-[10px] text-slate-400">2 days ago</span>
              </div>
              <p className="text-xs text-slate-500 line-clamp-2 pl-1">
                Floor-to-ceiling double-height library with integrated rolling ladder, hidden humidor chamber, and brass channel...
              </p>
              <div className="mt-3 text-right">
                <span className="material-symbols-outlined text-slate-300 text-[18px]">arrow_forward</span>
              </div>
            </div>

            <div className="py-4 text-center">
              <a href="#" className="text-xs font-bold text-indigo-600 hover:underline">View All 24 Inquiries & Historical Archives &rarr;</a>
            </div>
          </div>
        </div>

        {/* Right Column - Detail View */}
        <div className="flex-1 flex flex-col bg-slate-50 overflow-y-auto space-y-6 pb-8">
          
          {/* Header Info Box */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg bg-slate-200 overflow-hidden">
                  <img src="https://i.pravatar.cc/100?img=5" alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Claire Dubois</h2>
                  <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">mail</span> c.dubois@architects.ca</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">call</span> +1 (416) 902-3841</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5">
                <span className="text-xs text-slate-500 font-semibold">Workflow:</span>
                <select className="bg-transparent text-xs font-bold text-slate-900 focus:outline-none">
                  <option>Awaiting Reply</option>
                  <option>In Review</option>
                  <option>Closed</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-8 pt-4 border-t border-slate-100">
              <div>
                <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-1">Project Scope</p>
                <p className="text-sm font-bold text-slate-900">Heritage Estate Remodel</p>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-1"><span className="material-symbols-outlined text-[14px]">location_on</span> 1400 Forest Hill Rd, Toronto</p>
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-1">Target Handover</p>
                <p className="text-sm font-bold text-slate-900">Q4 2025 (November)</p>
                <p className="text-xs text-slate-500 mt-1">Lead Architect: C. Dubois</p>
              </div>
            </div>
          </div>

          {/* Original Specification Box */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-indigo-600 text-[18px]">mark_email_unread</span> Original Inbound Specification
              </h3>
              <span className="text-xs text-slate-400 font-mono">Received Today at 09:24 AM EST</span>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-lg p-5 text-sm text-slate-700 leading-relaxed font-serif relative">
              <span className="material-symbols-outlined absolute top-4 left-4 text-slate-300 text-3xl">format_quote</span>
              <div className="pl-8 space-y-4 relative z-10">
                <p className="font-semibold text-slate-500 uppercase tracking-wider text-[10px] mb-2">Client Transmission:</p>
                <p>"Dear Julian, our design studio is coordinating the Bridle Path estate expansion. We have finalized architectural schematics for the custom English walnut joinery, including continuous fluted paneling in the gallery foyer and custom radius library bookcases."</p>
                <p>"Given the heritage designation of the property, we need an artisan team capable of historical profile replication while executing modern concealed soft-touch pivot hinges. Attached you will find revision 3 of the elevation drawings."</p>
                <p>"Can you confirm whether your team can take on a site walkthrough this Thursday or Friday afternoon to verify rough openings? Looking forward to your response."</p>
                <p className="text-xs font-semibold text-slate-400 italic pt-2">Claire Dubois, Principal Architect • Dubois & Associates Studio</p>
              </div>
            </div>
          </div>

          {/* Direct Email Dispatch Box */}
          <div className="bg-white border-2 border-indigo-100 rounded-xl shadow-md p-6">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-700 text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">reply</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Direct Email Dispatch</h3>
                  <p className="text-xs text-slate-500">Send formal studio correspondence directly to Claire Dubois</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400">Sender Relay:</span>
                <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded font-mono font-semibold">julian@toppristine.com</span>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center border-b border-slate-100 pb-2">
                <span className="w-16 text-xs text-slate-400 font-semibold">To:</span>
                <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-2 py-1 rounded">Claire Dubois &lt;c.dubois@architects.ca&gt;</span>
                <button className="ml-auto text-xs text-indigo-600 font-bold hover:underline">+ Cc / Bcc</button>
              </div>
              <div className="flex items-center border-b border-slate-100 pb-2">
                <span className="w-16 text-xs text-slate-400 font-semibold">Subject:</span>
                <span className="text-sm font-semibold text-slate-900">Re: Estate Heritage Retrofit - Valuation & Next Steps (Top Pristine)</span>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-2">Quick Insertion Snippets:</p>
              <div className="flex flex-wrap gap-2">
                <button className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold rounded flex items-center gap-1 transition-colors">
                  <span className="material-symbols-outlined text-[14px]">calendar_month</span> Consultation Walkthrough
                </button>
                <button className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold rounded flex items-center gap-1 transition-colors">
                  <span className="material-symbols-outlined text-[14px]">description</span> Request Spec CAD
                </button>
                <button className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold rounded flex items-center gap-1 transition-colors">
                  <span className="material-symbols-outlined text-[14px]">payments</span> Send Formal Estimate
                </button>
                <button className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold rounded flex items-center gap-1 transition-colors">
                  <span className="material-symbols-outlined text-[14px]">attach_file</span> Attach NDA Scope
                </button>
              </div>
            </div>

            <div className="border border-slate-200 rounded-lg overflow-hidden flex flex-col mb-4">
              <div className="bg-slate-50 border-b border-slate-200 px-3 py-2 flex items-center gap-4">
                <button className="text-slate-600 hover:text-slate-900"><span className="material-symbols-outlined text-[16px]">format_bold</span></button>
                <button className="text-slate-600 hover:text-slate-900"><span className="material-symbols-outlined text-[16px]">format_italic</span></button>
                <button className="text-slate-600 hover:text-slate-900"><span className="material-symbols-outlined text-[16px]">format_list_bulleted</span></button>
                <div className="w-px h-4 bg-slate-300"></div>
                <button className="text-slate-600 hover:text-slate-900"><span className="material-symbols-outlined text-[16px]">link</span></button>
                <button className="text-slate-600 hover:text-slate-900"><span className="material-symbols-outlined text-[16px]">image</span></button>
                <span className="ml-auto text-xs text-slate-400 font-mono">348 characters</span>
              </div>
              <textarea 
                className="w-full h-48 p-4 text-sm text-slate-800 focus:outline-none resize-none leading-relaxed"
                defaultValue={`Dear Claire,

Thank you for reaching out regarding the Forest Hill estate heritage retrofit. Julian Vance and our master joinery team have thoroughly reviewed your preliminary architectural drawings and specifications (Rev 3).

We would be delighted to arrange a private on-site consultation this Thursday or Friday afternoon to verify rough tolerances and discuss grain matching protocols for the walnut paneling.`}
              ></textarea>
            </div>

            <div className="flex items-center gap-3">
              <button className="px-6 py-2.5 bg-white border border-slate-300 text-slate-700 font-bold text-sm rounded shadow-sm hover:bg-slate-50">Save Draft</button>
              <button className="px-6 py-2.5 bg-indigo-700 text-white font-bold text-sm rounded shadow-sm hover:bg-indigo-800 flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">send</span> Send Email & Mark as Responded
              </button>
            </div>
            
            <div className="mt-4 flex items-center justify-between pt-4 border-t border-slate-100">
               <p className="text-xs text-slate-500 flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">schedule</span> Automated Follow-up: Remind team if no client reply within 48 hours</p>
               <button className="text-xs font-bold text-indigo-600 hover:underline">Configure Timing</button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
