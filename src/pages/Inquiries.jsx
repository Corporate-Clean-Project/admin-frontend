import { useEffect, useState } from 'react';
import useInquiryStore from '../stores/inquiryStore';
import useAuthStore from '../stores/authStore';

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

const statusMap = {
  new: { label: 'New', color: 'bg-amber-100 text-amber-700' },
  in_review: { label: 'In Review', color: 'bg-indigo-50 text-indigo-700' },
  quoted: { label: 'Quoted', color: 'bg-emerald-50 text-emerald-700' },
  replied: { label: 'Replied', color: 'bg-sky-50 text-sky-700' },
  closed: { label: 'Closed', color: 'bg-slate-100 text-slate-600' },
};

export default function Inquiries() {
  const currentUser = useAuthStore((state) => state.user);
  const canManageInquiries = ['super_admin', 'admin'].includes(currentUser?.role);
  const {
    inquiries,
    selectedInquiry,
    total,
    loading,
    error,
    fetchInquiries,
    selectInquiry,
    updateStatus,
    replyToInquiry,
    deleteInquiry,
  } = useInquiryStore();

  const [activeFilter, setActiveFilter] = useState('all');
  const [reply, setReply] = useState('');
  const [sending, setSending] = useState(false);
  const [replyStatus, setReplyStatus] = useState('');
  const [actionError, setActionError] = useState('');
  const [confirmation, setConfirmation] = useState(null);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    const params = {};
    if (activeFilter === 'new') params.status = 'new';
    else if (activeFilter === 'in_review') params.status = 'in_review';
    else if (activeFilter === 'replied') params.status = 'replied';
    else if (activeFilter === 'closed') params.status = 'closed';
    selectInquiry(null);
    fetchInquiries(params).catch(() => {});
  }, [activeFilter, fetchInquiries, selectInquiry]);

  useEffect(() => {
    if (!inquiries.some((inquiry) => inquiry._id === selectedInquiry?._id)) {
      selectInquiry(inquiries[0] || null);
    }
  }, [inquiries, selectedInquiry, selectInquiry]);

  const handleSelectInquiry = (inquiry) => {
    selectInquiry(inquiry);
    setReply('');
    setReplyStatus('');
  };

  const handleStatusChange = async (newStatus) => {
    if (!selectedInquiry) return;
    setConfirmation({ type: 'status', inquiry: selectedInquiry, status: newStatus });
  };

  const handleConfirmAction = async () => {
    if (!confirmation) return;
    setActionError('');
    setConfirming(true);
    try {
      if (confirmation.type === 'delete') {
        await deleteInquiry(confirmation.inquiry._id);
      } else {
        await updateStatus(confirmation.inquiry._id, confirmation.status);
      }
      setConfirmation(null);
    } catch (err) {
      setActionError(err?.response?.data?.message || `Failed to ${confirmation.type === 'delete' ? 'delete inquiry' : 'update inquiry status'}.`);
    } finally {
      setConfirming(false);
    }
  };

  const handleSendReply = async () => {
    if (!selectedInquiry || !reply.trim()) return;
    setSending(true);
    setReplyStatus('');
    try {
      await replyToInquiry(selectedInquiry._id, reply.trim());
      setReply('');
      setReplyStatus('Reply sent successfully.');
    } catch (err) {
      setReplyStatus(err?.response?.data?.message || 'Failed to send reply.');
    } finally {
      setSending(false);
    }
  };

  const handleDelete = (inquiry) => {
    setConfirmation({ type: 'delete', inquiry });
  };

  const selected = selectedInquiry;
  return (
    <div className="inquiries-page flex min-h-screen flex-col overflow-visible bg-slate-50 p-4 font-sans sm:p-6 xl:h-screen xl:overflow-hidden xl:p-8">
      <div className="mb-6 flex items-center gap-3">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Inquiries & Client Communications</h1>
      </div>
      {(error || actionError) && <p role="alert" className="mb-4 rounded-lg bg-rose-50 px-4 py-2 text-sm text-rose-700">{actionError || error}</p>}

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex min-w-0 flex-1 gap-2 overflow-x-auto rounded-xl border border-slate-200/80 bg-white p-1.5 shadow-sm">
          {[
            { key: 'all', label: 'All Inquiries' },
            { key: 'new', label: 'New' },
            { key: 'in_review', label: 'In Review' },
            { key: 'replied', label: 'Replied' },
            { key: 'closed', label: 'Closed' },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveFilter(tab.key)}
              className={`flex min-w-max flex-1 items-center justify-center gap-1 rounded-lg px-3 py-2.5 text-xs leading-tight transition-all duration-150 sm:px-4 ${activeFilter === tab.key ? 'bg-indigo-700 text-white shadow-sm font-semibold' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {loading && inquiries.length === 0 && (
        <div className="flex items-center justify-center py-20 text-sm text-slate-500">Loading inquiries…</div>
      )}

      <div className="flex min-h-0 flex-1 flex-col gap-4 xl:flex-row xl:gap-6">
        <div className="flex max-h-80 w-full flex-shrink-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm xl:max-h-none xl:w-1/3">
          <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <h2 className="text-[11px] font-bold tracking-wider text-slate-500 uppercase">Conversations ({total})</h2>
          </div>
          
          <div className="hide-scrollbar flex-1 space-y-4 overflow-y-auto p-3 sm:p-4">
            {inquiries.map((inquiry) => (
              <div
                key={inquiry._id}
                role="button"
                tabIndex={0}
                onClick={() => handleSelectInquiry(inquiry)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleSelectInquiry(inquiry); } }}
                className={`p-4 rounded-xl border-2 bg-white transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 ${selected?._id === inquiry._id ? 'border-indigo-600 shadow-sm' : 'border-slate-100 hover:border-indigo-200 hover:shadow-md'}`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">{getInitials(inquiry.fullName)}</div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{inquiry.fullName}</h3>
                      <p className="text-[10px] text-slate-500">{inquiry.companyName || inquiry.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-400">{formatTimeAgo(inquiry.createdAt)}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${(statusMap[inquiry.status] || statusMap.new).color}`}>
                    {(statusMap[inquiry.status] || statusMap.new).label}
                  </span>
                  <span className="text-[10px] text-slate-500 capitalize">{inquiry.type}</span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-2">
                  {inquiry.message || inquiry.notes || inquiry.scope || '—'}
                </p>
              </div>
            ))}

            {inquiries.length === 0 && !loading && (
              <p className="py-8 text-center text-sm text-slate-500">No inquiries match the selected filter.</p>
            )}
          </div>
        </div>

        {selected && (
          <div className="hide-scrollbar flex min-h-[65vh] flex-1 flex-col space-y-4 overflow-y-visible bg-slate-50 pb-8 xl:min-h-0 xl:space-y-6 xl:overflow-y-auto">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
              <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row">
                <div className="flex min-w-0 items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xl">{getInitials(selected.fullName)}</div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">{selected.fullName}</h2>
                    <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                      <span className="flex min-w-0 items-center gap-1 break-all"><span className="material-symbols-outlined text-[14px]">mail</span> {selected.email}</span>
                      {selected.phone && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">call</span> {selected.phone}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                {canManageInquiries && <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5">
                    <span className="text-xs text-slate-500 font-semibold">Status:</span>
                    <select
                      value={selected.status}
                      onChange={(e) => handleStatusChange(e.target.value)}
                      className="bg-transparent text-xs font-bold text-slate-900 focus:outline-none"
                    >
                      <option value="new">New</option>
                      <option value="in_review">In Review</option>
                      <option value="quoted">Quoted</option>
                      <option value="replied">Replied</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                  <button type="button" onClick={() => handleDelete(selected)} className="p-2 rounded hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors" aria-label="Delete inquiry">
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>}
                {!canManageInquiries && <span className="text-xs font-semibold text-slate-500">Status: {statusMap[selected.status]?.label || selected.status}</span>}
              </div>
              
              <div className="grid grid-cols-1 gap-5 border-t border-slate-100 pt-4 sm:grid-cols-2 sm:gap-8">
                <div>
                  <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-1">Type</p>
                  <p className="text-sm font-bold text-slate-900 capitalize">{selected.inquiryType || selected.type}</p>
                  {selected.companyName && <p className="text-xs text-slate-500 mt-1">Company: {selected.companyName}</p>}
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-1">Details</p>
                  {selected.serviceType && <p className="text-sm font-bold text-slate-900">{selected.serviceType}</p>}
                  {selected.facilitySize && <p className="text-xs text-slate-500 mt-1">{selected.facilitySize.toLocaleString()} sq ft</p>}
                  {selected.cleaningSchedule && <p className="text-xs text-slate-500 mt-0.5">Schedule: {selected.cleaningSchedule}</p>}
                  {selected.budgetRange && <p className="text-xs text-slate-500 mt-0.5">Budget: {selected.budgetRange}</p>}
                  {!selected.serviceType && !selected.facilitySize && <p className="text-xs text-slate-500">—</p>}
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span className="material-symbols-outlined text-indigo-600 text-[18px]">mark_email_unread</span> Original Message
                </h3>
                <span className="text-xs text-slate-400 font-mono">Received {new Date(selected.createdAt).toLocaleDateString()} {new Date(selected.createdAt).toLocaleTimeString()}</span>
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-lg p-5 text-sm text-slate-700 leading-relaxed relative">
                <span className="material-symbols-outlined absolute top-4 left-4 text-slate-300 text-3xl">format_quote</span>
                <div className="pl-8 space-y-3 relative z-10">
                  <p>{selected.message || selected.notes || 'No message provided.'}</p>
                </div>
              </div>
            </div>

            {selected.replies && selected.replies.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
                <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-600 text-[18px]">forum</span> Conversation History
                </h3>
                <div className="space-y-4">
                  {selected.replies.map((r, idx) => (
                    <div key={idx} className="bg-indigo-50/50 border border-indigo-100 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-bold text-indigo-700">{r.sentByName || 'Admin'}</p>
                        <p className="text-[10px] text-slate-400">{new Date(r.sentAt).toLocaleString()}</p>
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{r.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {canManageInquiries && (
              <div className="bg-white border-2 border-indigo-100 rounded-xl shadow-md p-6">
                <div className="space-y-4">
                  <label className="block">
                    <span className="mb-1 block text-xs font-semibold text-slate-500">To</span>
                    <input
                      type="text"
                      readOnly
                      value={`${selected.fullName} <${selected.email}>`}
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-xs font-semibold text-slate-500">Message</span>
                    <textarea
                      className="w-full h-48 rounded-lg border border-slate-200 p-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y leading-relaxed"
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      placeholder="Type your reply here..."
                    />
                  </label>
                  {replyStatus && <p className="text-sm text-slate-600">{replyStatus}</p>}
                  <button
                    type="button"
                    disabled={sending || !reply.trim()}
                    onClick={handleSendReply}
                    className="px-6 py-2.5 bg-indigo-700 text-white font-bold text-sm rounded shadow-sm hover:bg-indigo-800 flex items-center gap-2 disabled:opacity-60 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">send</span> {sending ? 'Sending…' : 'Send Reply'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {!selected && inquiries.length > 0 && (
          <div className="flex-1 flex items-center justify-center text-sm text-slate-500">
            Select an inquiry to view details
          </div>
        )}
      </div>

      {confirmation && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !confirming) setConfirmation(null);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="inquiry-confirmation-title"
            className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
          >
            <div className="mb-5 flex items-start gap-4">
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${confirmation.type === 'delete' ? 'bg-rose-100 text-rose-600' : 'bg-indigo-100 text-indigo-600'}`}>
                <span className="material-symbols-outlined">{confirmation.type === 'delete' ? 'delete' : 'edit'}</span>
              </div>
              <div>
                <h2 id="inquiry-confirmation-title" className="text-lg font-bold text-slate-900">
                  {confirmation.type === 'delete' ? 'Delete inquiry?' : 'Update inquiry status?'}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {confirmation.type === 'delete'
                    ? `This will permanently delete the inquiry from ${confirmation.inquiry.fullName}. This action cannot be undone.`
                    : `Change ${confirmation.inquiry.fullName}'s inquiry status to ${statusMap[confirmation.status]?.label || confirmation.status}?`}
                </p>
              </div>
            </div>
            {actionError && <p role="alert" className="mb-4 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{actionError}</p>}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                disabled={confirming}
                onClick={() => setConfirmation(null)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={confirming}
                onClick={handleConfirmAction}
                className={`rounded-lg px-4 py-2 text-sm font-semibold text-white disabled:opacity-60 ${confirmation.type === 'delete' ? 'bg-rose-600 hover:bg-rose-700' : 'bg-indigo-700 hover:bg-indigo-800'}`}
              >
                {confirming ? 'Please wait…' : confirmation.type === 'delete' ? 'Delete inquiry' : 'Update status'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
