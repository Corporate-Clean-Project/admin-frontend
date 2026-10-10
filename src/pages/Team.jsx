import { useState } from 'react';

const initialUsers = [
  { id: 'demo-1', name: 'Julian Vance', email: 'julian@toppristine.com', role: 'admin', status: 'online' },
  { id: 'demo-2', name: 'Emma Richards', email: 'emma.r@toppristine.com', role: 'coordinator', status: 'active' },
  { id: 'demo-3', name: 'Marcus Chen', email: 'm.chen@toppristine.com', role: 'estimator', status: 'active' },
  { id: 'demo-4', name: 'Sophia Rossi', email: 's.rossi@toppristine.com', role: 'architect', status: 'pending' },
];

const roleLabels = {
  admin: 'Master Admin',
  super_admin: 'Master Admin',
  editor: 'Editor',
  coordinator: 'Client Coordinator',
  architect: 'Lead Architect',
  estimator: 'Project Estimator',
};

const roleOptions = [
  { value: 'admin', label: 'Master Admin' },
  { value: 'editor', label: 'Editor' },
  { value: 'super_admin', label: 'Super Admin' },
];

function getUserId(user) {
  return user.id || user._id;
}

function getInitials(user) {
  const displayName = user.name || user.fullName || user.email || '?';
  return displayName
    .split(/[\s@.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');
}

function getStatusLabel(user) {
  const status = String(user.status || user.inviteStatus || '').toLowerCase();
  if (status.includes('pending') || status.includes('invite')) return 'Pending Invite Acceptance';
  if (user.isOnline || status === 'online') return 'Online Now';
  if (user.lastActiveAt || user.lastLoginAt) {
    const date = new Date(user.lastActiveAt || user.lastLoginAt);
    if (!Number.isNaN(date.getTime())) return `Active (${date.toLocaleDateString()})`;
  }
  return status ? status.replace(/[_-]/g, ' ') : 'Active';
}

export default function Team() {
  const [users, setUsers] = useState(initialUsers);
  const [actionError, setActionError] = useState('');
  const [message, setMessage] = useState('');
  const [openMenu, setOpenMenu] = useState(null);
  const [inviteError, setInviteError] = useState('');
  const [inviteSuccess, setInviteSuccess] = useState('');
  const [inviteForm, setInviteForm] = useState({ name: '', email: '', role: '' });
  const [activePanel, setActivePanel] = useState('invite');
  const [resetUserId, setResetUserId] = useState(initialUsers[0].id);
  const [resetForm, setResetForm] = useState({ password: '', confirmPassword: '' });
  const [resetError, setResetError] = useState('');
  const [resetSuccess, setResetSuccess] = useState('');
  const selectedResetUser = users.find((item) => String(getUserId(item)) === resetUserId);

  const handleInvite = (event) => {
    event.preventDefault();
    setInviteError('');
    setInviteSuccess('');
    if (users.some((user) => user.email.toLowerCase() === inviteForm.email.trim().toLowerCase())) {
      setInviteError('A team member with this email already exists.');
      return;
    }
    setUsers((items) => [...items, {
      id: `demo-${Date.now()}`,
      name: inviteForm.name.trim(),
      email: inviteForm.email.trim(),
      role: inviteForm.role,
      status: 'pending',
    }]);
    setInviteForm({ name: '', email: '', role: '' });
    setInviteSuccess('Demo invitation added to the roster. No email was sent.');
  };

  const handlePasswordReset = (event) => {
    event.preventDefault();
    setResetError('');
    setResetSuccess('');
    if (!selectedResetUser?.email) {
      setResetError('Select a team member with a valid email address.');
      return;
    }
    if (resetForm.password.length < 8) {
      setResetError('The new password must be at least 8 characters.');
      return;
    }
    if (resetForm.password !== resetForm.confirmPassword) {
      setResetError('The passwords do not match.');
      return;
    }

    setResetSuccess(`Demo reset completed for ${selectedResetUser.name || selectedResetUser.email}. The account password was not changed.`);
    setResetForm({ password: '', confirmPassword: '' });
  };

  const handleResend = (user) => {
    setActionError('');
    setMessage(`Demo only: no invitation email was sent to ${user.email}.`);
  };

  const handleRoleChange = (user, role) => {
    const id = getUserId(user);
    setActionError('');
    setMessage('');
    setUsers((items) => items.map((item) => getUserId(item) === id ? { ...item, role } : item));
    setMessage(`Demo role updated for ${user.name || user.email}.`);
    setOpenMenu(null);
  };

  const handleRemove = (user) => {
    const id = getUserId(user);
    if (!window.confirm(`Remove portal access for ${user.name || user.email}?`)) return;
    setActionError('');
    setMessage('');
    setUsers((items) => items.filter((item) => getUserId(item) !== id));
    setMessage(`Demo access removed for ${user.name || user.email}.`);
    setOpenMenu(null);
  };

  return (
    <div className="p-8 font-sans bg-slate-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Team Provisioning &amp; Access</h1>
        </div>

      {(actionError || message) && (
        <div role={actionError ? 'alert' : 'status'} className={`mb-5 rounded-lg px-4 py-3 text-sm ${actionError ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-700'}`}>
          {actionError || message}
        </div>
      )}

      <div className="flex gap-8 items-start">
        <div className="flex-[2] bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-slate-200 text-slate-600 flex items-center justify-center shadow-inner">
                <span className="material-symbols-outlined text-[18px]">shield_person</span>
              </div>
              <h2 className="text-sm font-bold text-slate-900">Active Admin Roster</h2>
            </div>
            <div className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">{users.length} Team Members</div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/50">
                  <th className="px-6 py-3 text-[10px] font-bold uppercase text-slate-500 tracking-wider">Member Details</th>
                  <th className="px-6 py-3 text-[10px] font-bold uppercase text-slate-500 tracking-wider">Operational Role</th>
                  <th className="px-6 py-3 text-[10px] font-bold uppercase text-slate-500 tracking-wider">Security Status</th>
                  <th className="px-6 py-3 text-[10px] font-bold uppercase text-slate-500 tracking-wider text-right">Access</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.length === 0 && (
                  <tr><td colSpan="4" className="px-6 py-8 text-center text-sm text-slate-500">No team members found.</td></tr>
                )}
                {users.map((user) => {
                  const id = getUserId(user);
                  const status = getStatusLabel(user);
                  const pending = status.toLowerCase().includes('pending');
                  const role = String(user.role || '').toLowerCase();
                  return (
                    <tr key={id || user.email} className={`hover:bg-slate-50 transition-colors ${openMenu === id ? 'relative z-30' : ''}`}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs shadow-sm">{getInitials(user)}</div>
                          <div>
                            <p className="text-sm font-bold text-slate-900">{user.name || user.fullName || 'Invited member'}</p>
                            <p className="text-[11px] text-slate-500 font-mono mt-0.5">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4"><span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded uppercase tracking-wider">{roleLabels[role] || role || 'Unassigned'}</span></td>
                      <td className="px-6 py-4">
                        <span className={`flex items-center gap-1.5 text-[11px] font-semibold ${pending ? 'text-amber-600' : 'text-slate-500'}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${pending ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`}></span>{status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="inline-flex items-center justify-end gap-3 whitespace-nowrap">
                          {pending && <button type="button" onClick={() => handleResend(user)} className="text-indigo-600 hover:text-indigo-800 text-[10px] font-bold uppercase transition-colors">Resend</button>}
                          <div className="relative inline-block">
                            <button type="button" aria-label={`Manage ${user.name || user.email}`} aria-expanded={openMenu === id} onClick={() => setOpenMenu(openMenu === id ? null : id)} className="text-slate-400 hover:text-slate-900 transition-colors">
                              <span className="material-symbols-outlined text-[18px]">more_vert</span>
                            </button>
                            {openMenu === id && (
                              <div className="absolute right-0 top-full z-50 mt-2 w-52 rounded-lg border border-slate-200 bg-white p-2 text-left shadow-xl ring-1 ring-black/5">
                                <label className="block px-2 pt-1 text-[10px] font-bold uppercase tracking-wide text-slate-400" htmlFor={`role-${id}`}>Change role</label>
                                <select id={`role-${id}`} value={role} onChange={(event) => handleRoleChange(user, event.target.value)} className="my-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs text-slate-700">
                                  {role && !roleOptions.some((option) => option.value === role) && <option value={role}>{roleLabels[role] || role}</option>}
                                  {roleOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                                </select>
                                <button type="button" onClick={() => handleRemove(user)} className="w-full rounded-md px-2 py-1.5 text-left text-xs font-semibold text-rose-600 hover:bg-rose-50">Remove access</button>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex-1 bg-white border border-slate-200 rounded-xl shadow-sm p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -z-10"></div>
          <div role="tablist" aria-label="Team actions" className="mb-6 flex rounded-lg bg-slate-100 p-1">
              <button
                type="button"
                role="tab"
                aria-selected={activePanel === 'invite'}
                onClick={() => setActivePanel('invite')}
                className={`flex-1 rounded-md px-3 py-2 text-sm font-semibold transition-colors ${activePanel === 'invite' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
              >
                Send invitation
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activePanel === 'reset'}
                onClick={() => setActivePanel('reset')}
                className={`flex-1 rounded-md px-3 py-2 text-sm font-semibold transition-colors ${activePanel === 'reset' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
              >
                Reset password
              </button>
          </div>

          {activePanel === 'invite' && (
            <>
              <div className="mb-8">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Provision New Architect / Staff</h3>
                <p className="text-xs text-slate-500 leading-relaxed">Add a demo team member to the roster. Invitation email delivery is not enabled in demo mode.</p>
              </div>

              <form onSubmit={handleInvite} className="space-y-5">
                <div>
                  <label htmlFor="team-name" className="text-[10px] font-bold tracking-wider text-slate-500 uppercase block mb-1">Full Legal Name</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">badge</span>
                    <input id="team-name" type="text" required value={inviteForm.name} onChange={(event) => setInviteForm((form) => ({ ...form, name: event.target.value }))} placeholder="e.g. Robert Lang" className="w-full h-11 pl-10 pr-4 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-medium text-slate-900" />
                  </div>
                </div>

                <div>
                  <label htmlFor="team-email" className="text-[10px] font-bold tracking-wider text-slate-500 uppercase block mb-1">Work Email</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">mail</span>
                    <input id="team-email" type="email" required value={inviteForm.email} onChange={(event) => setInviteForm((form) => ({ ...form, email: event.target.value }))} placeholder="name@toppristine.com" className="w-full h-11 pl-10 pr-4 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-medium text-slate-900" />
                  </div>
                </div>

                <div>
                  <label htmlFor="team-role" className="text-[10px] font-bold tracking-wider text-slate-500 uppercase block mb-1">Role Assignment</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">admin_panel_settings</span>
                    <select id="team-role" required value={inviteForm.role} onChange={(event) => setInviteForm((form) => ({ ...form, role: event.target.value }))} className="w-full h-11 pl-10 pr-4 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-semibold text-slate-900 appearance-none cursor-pointer">
                      <option value="">Select an operational role…</option>
                      {roleOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px] pointer-events-none">expand_more</span>
                  </div>
                </div>

                {inviteError && <p role="alert" className="text-sm text-rose-600">{inviteError}</p>}
                {inviteSuccess && <p role="status" className="text-sm text-emerald-600">{inviteSuccess}</p>}
                <div className="pt-4">
                  <button type="submit" className="w-full h-12 bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-sm rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">forward_to_inbox</span>Add Demo Team Member
                  </button>
                </div>
              </form>
            </>
          )}

          {activePanel === 'reset' && (
            <>
              <div className="mb-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
                  <span className="material-symbols-outlined">lock_reset</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Reset a team member’s password</h3>
                <p className="text-xs text-slate-500 leading-relaxed">Choose a team member and enter a new password. No reset link will be sent.</p>
              </div>
              <form onSubmit={handlePasswordReset} className="space-y-5">
                <div>
                  <label htmlFor="reset-team-member" className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-500">Team member</label>
                  <select
                    id="reset-team-member"
                    required
                    value={selectedResetUser ? resetUserId : ''}
                    onChange={(event) => {
                      setResetUserId(event.target.value);
                      setResetError('');
                      setResetSuccess('');
                      setResetForm({ password: '', confirmPassword: '' });
                    }}
                    className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-medium text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="" disabled>Select a team member</option>
                    {users.map((teamUser) => (
                      <option key={getUserId(teamUser)} value={getUserId(teamUser)}>{teamUser.name || teamUser.email} · {teamUser.email}</option>
                    ))}
                  </select>
                </div>
                {selectedResetUser && (
                  <div className="flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50 p-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">{getInitials(selectedResetUser)}</div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-800">{selectedResetUser.name || 'Team member'}</p>
                      <p className="truncate text-xs text-slate-500">{selectedResetUser.email}</p>
                    </div>
                    <span className="material-symbols-outlined ml-auto text-emerald-600">verified_user</span>
                  </div>
                )}
                <div>
                  <label htmlFor="new-team-password" className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-500">New password</label>
                  <input
                    id="new-team-password"
                    type="password"
                    autoComplete="new-password"
                    required
                    minLength={8}
                    value={resetForm.password}
                    onChange={(event) => setResetForm((form) => ({ ...form, password: event.target.value }))}
                    placeholder="Enter a new password"
                    className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-medium text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label htmlFor="confirm-team-password" className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-500">Confirm new password</label>
                  <input
                    id="confirm-team-password"
                    type="password"
                    autoComplete="new-password"
                    required
                    minLength={8}
                    value={resetForm.confirmPassword}
                    onChange={(event) => setResetForm((form) => ({ ...form, confirmPassword: event.target.value }))}
                    placeholder="Enter the new password again"
                    className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-medium text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <div className="rounded-lg border border-amber-100 bg-amber-50 px-3 py-2.5 text-xs leading-relaxed text-amber-800">
                  Demo mode: submitting this form does not update the account or send an email. A backend password-reset endpoint is needed to securely apply the change.
                </div>
                {resetError && <p role="alert" className="text-sm text-rose-600">{resetError}</p>}
                {resetSuccess && <p role="status" className="text-sm text-emerald-700">{resetSuccess}</p>}
                <button type="submit" disabled={!selectedResetUser} className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-indigo-700 text-sm font-bold text-white shadow-sm transition-colors hover:bg-indigo-800 disabled:cursor-not-allowed disabled:opacity-60">
                  <span className="material-symbols-outlined text-[18px]">lock_reset</span>
                  Reset password
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
