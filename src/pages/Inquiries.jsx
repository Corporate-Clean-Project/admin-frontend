import { useState } from 'react';

const inquiries = [
  {
    name: 'Claire Dubois',
    company: 'Dubois & Assoc. Studio',
    amount: '$94,000',
    status: 'Awaiting Reply',
    filter: 'awaiting',
    scope: 'Estate Heritage Retrofit',
    avatar: 'https://i.pravatar.cc/100?img=5',
    email: 'c.dubois@architects.ca',
    phone: '+1 (416) 902-3841',
    address: '1400 Forest Hill Rd, Toronto',
    handover: 'Q4 2025 (November)',
    lead: 'C. Dubois',
    received: 'Today at 09:24 AM EST',
    message: [
      'Dear Julian, our design studio is coordinating the Bridle Path estate expansion. We have finalized architectural schematics for the custom English walnut joinery, including continuous fluted paneling in the gallery foyer and custom radius library bookcases.',
      'Given the heritage designation of the property, we need an artisan team capable of historical profile replication while executing modern concealed soft-touch pivot hinges. Attached you will find revision 3 of the elevation drawings.',
      'Can you confirm whether your team can take on a site walkthrough this Thursday or Friday afternoon to verify rough openings? Looking forward to your response.',
    ],
    signature: 'Claire Dubois, Principal Architect • Dubois & Associates Studio',
    reply: `Dear Claire,\n\nThank you for reaching out regarding the Forest Hill estate heritage retrofit. Julian Vance and our master joinery team have thoroughly reviewed your preliminary architectural drawings and specifications (Rev 3).\n\nWe would be delighted to arrange a private on-site consultation this Thursday or Friday afternoon to verify rough tolerances and discuss grain matching protocols for the walnut paneling.`,
  },
  {
    name: 'Marcus Vance',
    company: 'Private Client',
    amount: '$62,000',
    status: 'Reviewed',
    filter: 'review',
    scope: 'Yorkville Penthouse',
    avatar: 'https://i.pravatar.cc/100?img=11',
    email: '',
    phone: '',
    address: '',
    handover: '',
    lead: '',
    received: '5 hours ago',
    message: [
      'Julian, loved the custom acoustic ceiling battens you installed at the Avenue Rd residence. We are revamping our 4,200 sq. ft. Yorkville penthouse.',
    ],
    signature: 'Marcus Vance',
    reply: '',
  },
  {
    name: 'Sarah Jenkins',
    company: 'Jenkins Interior Studio',
    amount: '$33,000',
    status: 'In Progress',
    filter: 'review',
    scope: 'Ensuite Spa Sanctuary',
    avatar: 'https://i.pravatar.cc/100?img=9',
    email: '',
    phone: '',
    address: '',
    handover: '',
    lead: '',
    received: 'Yesterday',
    message: [
      'Looking for water-resistant teak vanities and seamless wall panels for an executive master suite. Material schedule is in progress.',
    ],
    signature: 'Sarah Jenkins',
    reply: '',
  },
  {
    name: 'Robert Lang',
    company: 'Private Residence',
    amount: '$125,000',
    status: 'Proposal Ready',
    filter: 'review',
    scope: 'Custom Walnut Joinery',
    avatar: 'https://i.pravatar.cc/100?img=33',
    email: '',
    phone: '',
    address: '',
    handover: '',
    lead: '',
    received: '2 days ago',
    message: [
      'Floor-to-ceiling double-height library with integrated rolling ladder, hidden humidor chamber, and brass channel details.',
    ],
    signature: 'Robert Lang',
    reply: '',
  },
];

export default function Inquiries() {
  const [selectedInquiry, setSelectedInquiry] = useState(inquiries[0]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [reply, setReply] = useState(inquiries[0].reply);
  const [workflowStatus, setWorkflowStatus] = useState(inquiries[0].status);

  const selectInquiry = (inquiry) => {
    setSelectedInquiry(inquiry);
    setReply(inquiry.reply);
    setWorkflowStatus(inquiry.status);
  };

  const isVisible = (inquiry) =>
    activeFilter === 'all' || inquiry.filter === activeFilter;

  return (
    <div className="inquiries-page p-8 h-screen flex flex-col font-sans bg-slate-50 overflow-hidden">
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Inquiries & Client Valuation</h1>
      </div>

      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div className="flex flex-1 min-w-[300px] gap-2 rounded-xl border border-slate-200/80 bg-white p-1.5 shadow-sm">
          <button type="button" onClick={() => setActiveFilter('all')} className={`flex-1 rounded-lg px-4 py-2.5 text-xs transition-all duration-150 flex flex-col items-center justify-center gap-0.5 leading-tight ${activeFilter === 'all' ? 'bg-indigo-700 text-white shadow-sm font-semibold' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'}`}>
            All Inquiries <span className={`text-[10px] font-bold ${activeFilter === 'all' ? 'text-indigo-100' : 'text-slate-400'}`}>24</span>
          </button>
          <button type="button" onClick={() => setActiveFilter('awaiting')} className={`flex-1 rounded-lg px-4 py-2.5 text-xs transition-all duration-150 flex flex-col items-center justify-center gap-0.5 leading-tight ${activeFilter === 'awaiting' ? 'bg-indigo-700 text-white shadow-sm font-semibold' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'}`}>
            Awaiting Reply <span className={`text-[10px] font-bold ${activeFilter === 'awaiting' ? 'text-indigo-100' : 'text-amber-600'}`}>5</span>
          </button>
          <button type="button" onClick={() => setActiveFilter('review')} className={`flex-1 rounded-lg px-4 py-2.5 text-xs transition-all duration-150 flex flex-col items-center justify-center gap-0.5 leading-tight ${activeFilter === 'review' ? 'bg-indigo-700 text-white shadow-sm font-semibold' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'}`}>
            Under Review <span className={`text-[10px] font-bold ${activeFilter === 'review' ? 'text-indigo-100' : 'text-indigo-600'}`}>11</span>
          </button>
          <button type="button" onClick={() => setActiveFilter('closed')} className={`flex-1 rounded-lg px-4 py-2.5 text-xs transition-all duration-150 flex flex-col items-center justify-center gap-0.5 leading-tight ${activeFilter === 'closed' ? 'bg-indigo-700 text-white shadow-sm font-semibold' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'}`}>
            Closed / Contracted <span className={`text-[10px] font-bold ${activeFilter === 'closed' ? 'text-indigo-100' : 'text-emerald-600'}`}>8</span>
          </button>
        </div>
      </div>

      <div className="flex gap-6 flex-1 min-h-0">
        
        {/* Left Column - Active Conversations */}
        <div className="w-1/3 flex flex-col bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex-shrink-0">
          <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <h2 className="text-[11px] font-bold tracking-wider text-slate-500 uppercase">Active Conversations (4)</h2>
          
          </div>
          
          <div className="hide-scrollbar flex-1 overflow-y-auto p-4 space-y-4">
            {/* Inquiry 1 (Selected) */}
            <div
              role="button"
              tabIndex={0}
              aria-pressed={selectedInquiry.name === inquiries[0].name}
              onClick={() => selectInquiry(inquiries[0])}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  selectInquiry(inquiries[0]);
                }
              }}
              className={`p-4 rounded-xl border-2 bg-white shadow-sm relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 ${selectedInquiry.name === inquiries[0].name ? 'border-indigo-600' : 'border-slate-100 hover:border-indigo-200 hover:shadow-md'} ${isVisible(inquiries[0]) ? '' : 'hidden'}`}
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600 rounded-l-xl"></div>
              <div className="flex justify-between items-start mb-3 pl-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                    {/* Fake img */}
                    <img src={inquiries[0].avatar} alt={`${inquiries[0].name} avatar`} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1">{inquiries[0].name} <span className="material-symbols-outlined text-indigo-600 text-[14px]">verified</span></h3>
                    <p className="text-[10px] text-slate-500">{inquiries[0].company}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-900">{inquiries[0].amount}</p>
                  <p className="text-[10px] text-slate-500">Est. Scope</p>
                </div>
              </div>
              <div className="flex items-center justify-between mb-3 pl-2">
                <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-bold rounded flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Awaiting Reply
                </span>
                <span className="text-[11px] font-semibold text-slate-700 truncate max-w-[120px]">{inquiries[0].scope}</span>
                <span className="text-[10px] text-slate-400">2h ago</span>
              </div>
              <p className="text-xs text-slate-500 line-clamp-2 pl-2">
                {inquiries[0].message[0]}
              </p>
              <div className="mt-3 text-right">
                <span className="material-symbols-outlined text-indigo-600 text-[18px]">arrow_forward</span>
              </div>
            </div>

            {/* Inquiry 2 */}
            <div
              role="button"
              tabIndex={0}
              aria-pressed={selectedInquiry.name === inquiries[1].name}
              onClick={() => selectInquiry(inquiries[1])}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  selectInquiry(inquiries[1]);
                }
              }}
              className={`p-4 rounded-xl border-2 bg-white transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 ${selectedInquiry.name === inquiries[1].name ? 'border-indigo-600 shadow-sm' : 'border-slate-100 hover:border-indigo-200 hover:shadow-md'} ${isVisible(inquiries[1]) ? '' : 'hidden'}`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                    <img src={inquiries[1].avatar} alt={`${inquiries[1].name} avatar`} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{inquiries[1].name}</h3>
                    <p className="text-[10px] text-slate-500">{inquiries[1].company}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-900">{inquiries[1].amount}</p>
                  <p className="text-[10px] text-slate-500">Est. Scope</p>
                </div>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded">
                  {inquiries[1].status}
                </span>
                <span className="text-[11px] font-semibold text-slate-700 truncate max-w-[120px]">{inquiries[1].scope}</span>
                <span className="text-[10px] text-slate-400">5h ago</span>
              </div>
              <p className="text-xs text-slate-500 line-clamp-2">
                {inquiries[1].message[0]}
              </p>
              <div className="mt-3 text-right">
                <span className="material-symbols-outlined text-slate-300 text-[18px]">arrow_forward</span>
              </div>
            </div>

            {/* Inquiry 3 */}
            <div
              role="button"
              tabIndex={0}
              aria-pressed={selectedInquiry.name === inquiries[2].name}
              onClick={() => selectInquiry(inquiries[2])}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  selectInquiry(inquiries[2]);
                }
              }}
              className={`p-4 rounded-xl border-2 bg-white transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 ${selectedInquiry.name === inquiries[2].name ? 'border-indigo-600 shadow-sm' : 'border-slate-100 hover:border-indigo-200 hover:shadow-md'} ${isVisible(inquiries[2]) ? '' : 'hidden'}`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                    <img src={inquiries[2].avatar} alt={`${inquiries[2].name} avatar`} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{inquiries[2].name}</h3>
                    <p className="text-[10px] text-slate-500">{inquiries[2].company}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-900">{inquiries[2].amount}</p>
                  <p className="text-[10px] text-slate-500">Est. Scope</p>
                </div>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded">
                  {inquiries[2].status}
                </span>
                <span className="text-[11px] font-semibold text-slate-700 truncate max-w-[120px]">{inquiries[2].scope}</span>
                <span className="text-[10px] text-slate-400">Yesterday</span>
              </div>
              <p className="text-xs text-slate-500 line-clamp-2">
                {inquiries[2].message[0]}
              </p>
              <div className="mt-3 text-right">
                <span className="material-symbols-outlined text-slate-300 text-[18px]">arrow_forward</span>
              </div>
            </div>

             {/* Inquiry 4 */}
             <div
              role="button"
              tabIndex={0}
              aria-pressed={selectedInquiry.name === inquiries[3].name}
              onClick={() => selectInquiry(inquiries[3])}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  selectInquiry(inquiries[3]);
                }
              }}
              className={`p-4 rounded-xl border-2 bg-white transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 ${selectedInquiry.name === inquiries[3].name ? 'border-indigo-600 shadow-sm' : 'border-slate-100 hover:border-indigo-200 hover:shadow-md'} ${isVisible(inquiries[3]) ? '' : 'hidden'}`}
             >
              <div className="flex justify-between items-start mb-3 pl-1">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                    <img src={inquiries[3].avatar} alt={`${inquiries[3].name} avatar`} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{inquiries[3].name}</h3>
                    <p className="text-[10px] text-slate-500">{inquiries[3].company}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-900">{inquiries[3].amount}</p>
                  <p className="text-[10px] text-slate-500">Est. Scope</p>
                </div>
              </div>
              <div className="flex items-center justify-between mb-3 pl-1">
                <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-[10px] font-bold rounded">
                  {inquiries[3].status}
                </span>
                <span className="text-[11px] font-semibold text-slate-700 truncate max-w-[120px]">{inquiries[3].scope}</span>
                <span className="text-[10px] text-slate-400">2 days ago</span>
              </div>
              <p className="text-xs text-slate-500 line-clamp-2 pl-1">
                {inquiries[3].message[0]}
              </p>
              <div className="mt-3 text-right">
                <span className="material-symbols-outlined text-slate-300 text-[18px]">arrow_forward</span>
              </div>
            </div>

            {!inquiries.some(isVisible) && (
              <p className="py-8 text-center text-sm text-slate-500">
                No inquiries match the selected filter.
              </p>
            )}

            <div className="py-4 text-center">
              <span className="text-xs font-bold text-slate-500">Showing the 4 available inquiries</span>
            </div>
          </div>
        </div>

        {/* Right Column - Detail View */}
        <div className="hide-scrollbar flex-1 min-h-0 flex flex-col bg-slate-50 overflow-y-auto space-y-6 pb-8">
          
          {/* Header Info Box */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg bg-slate-200 overflow-hidden">
                  <img src={selectedInquiry.avatar} alt={`${selectedInquiry.name} avatar`} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">{selectedInquiry.name}</h2>
                  <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">mail</span> {selectedInquiry.email || 'No email provided'}</span>
                    {selectedInquiry.phone && (
                      <>
                        <span>•</span>
                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">call</span> {selectedInquiry.phone}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5">
                <span className="text-xs text-slate-500 font-semibold">Workflow:</span>
                <select
                  value={workflowStatus}
                  onChange={(event) => setWorkflowStatus(event.target.value)}
                  className="bg-transparent text-xs font-bold text-slate-900 focus:outline-none"
                >
                  <option>Awaiting Reply</option>
                  <option>Reviewed</option>
                  <option>In Progress</option>
                  <option>Proposal Ready</option>
                  <option>Closed</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-8 pt-4 border-t border-slate-100">
              <div>
                <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-1">Project Scope</p>
                <p className="text-sm font-bold text-slate-900">{selectedInquiry.scope}</p>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-1"><span className="material-symbols-outlined text-[14px]">location_on</span> {selectedInquiry.address || 'Address not provided'}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-1">Target Handover</p>
                <p className="text-sm font-bold text-slate-900">{selectedInquiry.handover || 'Not provided'}</p>
                <p className="text-xs text-slate-500 mt-1">{selectedInquiry.lead ? `Lead Architect: ${selectedInquiry.lead}` : selectedInquiry.company}</p>
              </div>
            </div>
          </div>

          {/* Original Specification Box */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-indigo-600 text-[18px]">mark_email_unread</span> Original Inbound Specification
              </h3>
              <span className="text-xs text-slate-400 font-mono">Received {selectedInquiry.received}</span>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-lg p-5 text-sm text-slate-700 leading-relaxed font-serif relative">
              <span className="material-symbols-outlined absolute top-4 left-4 text-slate-300 text-3xl">format_quote</span>
              <div className="pl-8 space-y-4 relative z-10">
                <p className="font-semibold text-slate-500 uppercase tracking-wider text-[10px] mb-2">Client Transmission:</p>
                {selectedInquiry.message.map((paragraph) => <p key={paragraph}>"{paragraph}"</p>)}
                <p className="text-xs font-semibold text-slate-400 italic pt-2">{selectedInquiry.signature}</p>
              </div>
            </div>
          </div>

          {/* Direct Email Dispatch Box */}
          <div className="bg-white border-2 border-indigo-100 rounded-xl shadow-md p-6">
            <div className="space-y-4">
              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-slate-500">To</span>
                <input
                  type="text"
                  readOnly
                  value={selectedInquiry.email ? `${selectedInquiry.name} <${selectedInquiry.email}>` : selectedInquiry.name}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-slate-500">Subject</span>
                <input
                  type="text"
                  value={`Re: ${selectedInquiry.scope} - Valuation & Next Steps`}
                  readOnly
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-slate-500">Message</span>
                <textarea
                  className="w-full h-48 rounded-lg border border-slate-200 p-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y leading-relaxed"
                  value={reply}
                  onChange={(event) => setReply(event.target.value)}
                />
              </label>
              <button type="button" className="px-6 py-2.5 bg-indigo-700 text-white font-bold text-sm rounded shadow-sm hover:bg-indigo-800 flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">send</span> Send Email
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
