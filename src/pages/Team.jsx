import { useEffect, useState } from 'react';
import apiClient from '../api/client';
import { resetUserPassword } from '../api/users';
import useAuthStore from '../stores/authStore';

const roleLabels = {
  admin: 'Master Admin',
  super_admin: 'Super Admin',
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
  return user._id || user.id;
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
  const currentUser = useAuthStore((state) => state.user);
  const canInviteUsers = ['super_admin', 'admin'].includes(currentUser?.role);
  const canManageUsers = currentUser?.role === 'super_admin';
  const canResetPasswords = currentUser?.role === 'super_admin';
  const availableRoleOptions = roleOptions.filter((option) => (
    canManageUsers || option.value !== 'super_admin'
  ));
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [actionError, setActionError] = useState('');
  const [message, setMessage] = useState('');
  const [openMenu, setOpenMenu] = useState(null);
  const [inviteError, setInviteError] = useState('');
  const [inviteSuccess, setInviteSuccess] = useState('');
  const [inviteForm, setInviteForm] = useState({ name: '', email: '', role: '', password: '', confirmPassword: '' });
  const [activePanel, setActivePanel] = useState('invite');
  const [resetUserId, setResetUserId] = useState('');
  const [resetForm, setResetForm] = useState({ password: '', confirmPassword: '' });
  const [resetError, setResetError] = useState('');
  const [resetSuccess, setResetSuccess] = useState('');
  const [resetSubmitting, setResetSubmitting] = useState(false);
  const selectedResetUser = users.find((item) => String(getUserId(item)) === resetUserId);

  useEffect(() => {
    apiClient.get('/users').then(({ data }) => {
      setUsers(data.users || []);
    }).catch(() => {}).finally(() => setLoadingUsers(false));
  }, []);

  const handleInvite = async (event) => {
    event.preventDefault();
    setInviteError('');
    setInviteSuccess('');
    if (inviteForm.password.length < 8) {
      setInviteError('The password must be at least 8 characters.');
      return;
    }
    if (inviteForm.password !== inviteForm.confirmPassword) {
      setInviteError('The passwords do not match.');
      return;
    }
    try {
      const { data } = await apiClient.post('/users/invite', {
        name: inviteForm.name.trim(),
        email: inviteForm.email.trim(),
        role: inviteForm.role,
        password: inviteForm.password,
      });
      setUsers((items) => [...items, data.user]);
      setInviteForm({ name: '', email: '', role: '', password: '', confirmPassword: '' });
      setInviteSuccess('Invitation sent successfully.');
    } catch (err) {
      setInviteError(err?.response?.data?.message || 'Failed to send invitation.');
    }
  };

  const handlePasswordReset = async (event) => {
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
    setResetSubmitting(true);
    try {
      await resetUserPassword(getUserId(selectedResetUser), resetForm.password);
      setResetSuccess(`Password reset completed for ${selectedResetUser.name || selectedResetUser.email}.`);
      setResetForm({ password: '', confirmPassword: '' });
    } catch (err) {
      setResetError(err?.response?.data?.message || 'Failed to reset password.');
    } finally {
      setResetSubmitting(false);
    }
  };

  const handleRoleChange = async (user, role) => {
    const id = getUserId(user);
    setActionError('');
    setMessage('');
    try {
      await apiClient.patch(`/users/${id}`, { role });
      setUsers((items) => items.map((item) => getUserId(item) === id ? { ...item, role } : item));
      setMessage(`Role updated for ${user.name || user.email}.`);
    } catch (err) {
      setActionError(err?.response?.data?.message || 'Failed to update role.');
    }
    setOpenMenu(null);
  };

  const handleRemove = async (user) => {
    const id = getUserId(user);
    if (!window.confirm(`Remove portal access for ${user.name || user.email}?`)) return;
    setActionError('');
    setMessage('');
    try {
      await apiClient.delete(`/users/${id}`);
      setUsers((items) => items.filter((item) => getUserId(item) !== id));
      setMessage(`Access removed for ${user.name || user.email}.`);
    } catch (err) {
      setActionError(err?.response?.data?.message || 'Failed to remove user.');
    }
    setOpenMenu(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 px-5 py-8 font-sans sm:px-8">
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-indigo-700">Administration</p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Team</h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-500">Manage your team, access levels, and account security.</p>
        </div>
        <div className="flex items-center gap-5 rounded-lg border border-slate-200 bg-white px-4 py-3">
          <div>
            <p className="text-xs text-slate-500">Team members</p>
            <p className="mt-0.5 text-lg font-semibold text-slate-900">{users.length}</p>
          </div>
          <div className="h-8 w-px bg-slate-200" />
          <div>
            <p className="text-xs text-slate-500">Pending invites</p>
            <p className="mt-0.5 text-lg font-semibold text-slate-900">
              {users.filter((user) => getStatusLabel(user).toLowerCase().includes('pending')).length}
            </p>
          </div>
        </div>
      </header>

      {(actionError || message) && (
        <div role={actionError ? 'alert' : 'status'} className={`mb-5 rounded-lg border px-4 py-3 text-sm ${actionError ? 'border-rose-200 bg-rose-50 text-rose-700' : 'border-emerald-200 bg-emerald-50 text-emerald-700'}`}>
          {actionError || message}
        </div>
      )}

      {loadingUsers && (
        <div className="flex items-center justify-center py-20 text-sm text-slate-500">Loading team…</div>
      )}

      {!loadingUsers && (
        <div className={`grid items-start gap-6 ${canInviteUsers || canResetPasswords ? 'xl:grid-cols-[minmax(0,1.7fr)_minmax(340px,0.9fr)]' : 'grid-cols-1'}`}>
          <section className="min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-4 sm:px-6">
              <div>
                <h2 className="text-base font-semibold text-slate-900">Team members</h2>
                <p className="mt-1 text-sm text-slate-500">Review roles and account access.</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                {users.length} {users.length === 1 ? 'member' : 'members'}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] text-left">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/70">
                    <th className="px-5 py-3 text-xs font-semibold text-slate-500 sm:px-6">Member</th>
                    <th className="px-5 py-3 text-xs font-semibold text-slate-500">Role</th>
                    <th className="px-5 py-3 text-xs font-semibold text-slate-500">Status</th>
                    <th className="px-5 py-3 text-right text-xs font-semibold text-slate-500 sm:px-6">Access</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.length === 0 && (
                    <tr><td colSpan="4" className="px-6 py-12 text-center text-sm text-slate-500">No team members found.</td></tr>
                  )}
                  {users.map((user) => {
                    const id = getUserId(user);
                    const statusLabel = getStatusLabel(user);
                    const pending = statusLabel.toLowerCase().includes('pending');
                    const role = String(user.role || '').toLowerCase();
                    return (
                      <tr key={id || user.email} className={`transition-colors hover:bg-slate-50/70 ${openMenu === id ? 'relative z-30' : ''}`}>
                        <td className="px-5 py-4 sm:px-6">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-xs font-semibold text-indigo-700">{getInitials(user)}</div>
                            <div className="min-w-0">
                              <p className="truncate text-sm font-semibold text-slate-900">{user.name || user.fullName || 'Invited member'}</p>
                              <p className="mt-0.5 truncate text-xs text-slate-500">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <span className="inline-flex rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700">{roleLabels[role] || role || 'Unassigned'}</span>
                        </td>
                        <td className="px-5 py-4">
                          <span className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-medium ${pending ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'}`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${pending ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                            {statusLabel}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-right sm:px-6">
                          {canManageUsers ? (
                            <div className="inline-flex items-center justify-end gap-3 whitespace-nowrap">
                              <div className="relative inline-block">
                                <button type="button" aria-label={`Manage ${user.name || user.email}`} aria-expanded={openMenu === id} onClick={() => setOpenMenu(openMenu === id ? null : id)} className="flex h-8 w-8 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900">
                                  <span className="material-symbols-outlined text-[20px]">more_horiz</span>
                                </button>
                                {openMenu === id && (
                                  <div className="absolute right-0 top-full z-50 mt-2 w-52 rounded-lg border border-slate-200 bg-white p-2 text-left shadow-lg">
                                    <label className="block px-2 pt-1 text-xs font-medium text-slate-500" htmlFor={`role-${id}`}>Change role</label>
                                    <select id={`role-${id}`} value={role} onChange={(event) => handleRoleChange(user, event.target.value)} className="my-1 w-full rounded-md border border-slate-200 px-2 py-2 text-sm text-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500">
                                      {role && !roleOptions.some((option) => option.value === role) && <option value={role}>{roleLabels[role] || role}</option>}
                                      {roleOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                                    </select>
                                    <button type="button" onClick={() => handleRemove(user)} className="w-full rounded-md px-2 py-2 text-left text-sm font-medium text-rose-600 transition-colors hover:bg-rose-50">Remove access</button>
                                  </div>
                                )}
                              </div>
                            </div>
                          ) : <span className="text-xs text-slate-400">View only</span>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          {(canInviteUsers || canResetPasswords) && <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div role="tablist" aria-label="Team actions" className="flex border-b border-slate-200 px-5 pt-4 sm:px-6">
              {canInviteUsers && <button type="button" role="tab" aria-selected={activePanel === 'invite'} onClick={() => setActivePanel('invite')} className={`border-b-2 px-3 pb-3 text-sm font-medium transition-colors ${activePanel === 'invite' ? 'border-indigo-700 text-indigo-700' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>Invite member</button>}
              {canResetPasswords && <button type="button" role="tab" aria-selected={activePanel === 'reset'} onClick={() => setActivePanel('reset')} className={`border-b-2 px-3 pb-3 text-sm font-medium transition-colors ${activePanel === 'reset' ? 'border-indigo-700 text-indigo-700' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>Reset password</button>}
            </div>

            <div className="p-5 sm:p-6">
              {activePanel === 'invite' && canInviteUsers && (
                <>
                  <div className="mb-6">
                    <h3 className="text-base font-semibold text-slate-900">Invite a team member</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-500">Add a member to the roster. An invitation email will be sent.</p>
                  </div>
                  <form onSubmit={handleInvite} className="space-y-4">
                    <div>
                      <label htmlFor="team-name" className="mb-1.5 block text-sm font-medium text-slate-700">Full name</label>
                      <input id="team-name" type="text" required value={inviteForm.name} onChange={(event) => setInviteForm((form) => ({ ...form, name: event.target.value }))} placeholder="e.g. Robert Lang" className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100" />
                    </div>
                    <div>
                      <label htmlFor="team-email" className="mb-1.5 block text-sm font-medium text-slate-700">Work email</label>
                      <input id="team-email" type="email" required value={inviteForm.email} onChange={(event) => setInviteForm((form) => ({ ...form, email: event.target.value }))} placeholder="name@toppristine.com" className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100" />
                    </div>
                    <div>
                      <label htmlFor="team-role" className="mb-1.5 block text-sm font-medium text-slate-700">Role</label>
                      <select id="team-role" required value={inviteForm.role} onChange={(event) => setInviteForm((form) => ({ ...form, role: event.target.value }))} className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100">
                        <option value="">Select a role</option>
                        {availableRoleOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="invite-password" className="mb-1.5 block text-sm font-medium text-slate-700">Password</label>
                      <input id="invite-password" type="password" autoComplete="new-password" required minLength={8} value={inviteForm.password} onChange={(event) => setInviteForm((form) => ({ ...form, password: event.target.value }))} placeholder="Enter an initial password" className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100" />
                    </div>
                    <div>
                      <label htmlFor="invite-confirm-password" className="mb-1.5 block text-sm font-medium text-slate-700">Confirm password</label>
                      <input id="invite-confirm-password" type="password" autoComplete="new-password" required minLength={8} value={inviteForm.confirmPassword} onChange={(event) => setInviteForm((form) => ({ ...form, confirmPassword: event.target.value }))} placeholder="Enter the password again" className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100" />
                    </div>
                    {inviteError && <p role="alert" className="text-sm text-rose-600">{inviteError}</p>}
                    {inviteSuccess && <p role="status" className="text-sm text-emerald-700">{inviteSuccess}</p>}
                    <button type="submit" className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-indigo-700 px-4 text-sm font-semibold text-white transition-colors hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <span className="material-symbols-outlined text-[18px]">person_add</span> Add team member
                    </button>
                  </form>
                </>
              )}

              {activePanel === 'reset' && canResetPasswords && (
                <>
                  <div className="mb-6">
                    <h3 className="text-base font-semibold text-slate-900">Reset a password</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-500">Choose a team member and set a new password.</p>
                  </div>
                  <form onSubmit={handlePasswordReset} className="space-y-4">
                    <div>
                      <label htmlFor="reset-team-member" className="mb-1.5 block text-sm font-medium text-slate-700">Team member</label>
                      <select id="reset-team-member" required value={selectedResetUser ? resetUserId : ''} onChange={(event) => { setResetUserId(event.target.value); setResetError(''); setResetSuccess(''); setResetForm({ password: '', confirmPassword: '' }); }} className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100">
                        <option value="" disabled>Select a team member</option>
                        {users.map((u) => <option key={getUserId(u)} value={getUserId(u)}>{u.name || u.email} · {u.email}</option>)}
                      </select>
                    </div>
                    {selectedResetUser && (
                      <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-xs font-semibold text-indigo-700">{getInitials(selectedResetUser)}</div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-slate-800">{selectedResetUser.name || 'Team member'}</p>
                          <p className="truncate text-xs text-slate-500">{selectedResetUser.email}</p>
                        </div>
                      </div>
                    )}
                    <div>
                      <label htmlFor="new-team-password" className="mb-1.5 block text-sm font-medium text-slate-700">New password</label>
                      <input id="new-team-password" type="password" autoComplete="new-password" required minLength={8} value={resetForm.password} onChange={(event) => setResetForm((form) => ({ ...form, password: event.target.value }))} placeholder="Enter a new password" className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100" />
                    </div>
                    <div>
                      <label htmlFor="confirm-team-password" className="mb-1.5 block text-sm font-medium text-slate-700">Confirm new password</label>
                      <input id="confirm-team-password" type="password" autoComplete="new-password" required minLength={8} value={resetForm.confirmPassword} onChange={(event) => setResetForm((form) => ({ ...form, confirmPassword: event.target.value }))} placeholder="Enter the password again" className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100" />
                    </div>
                    {resetError && <p role="alert" className="text-sm text-rose-600">{resetError}</p>}
                    {resetSuccess && <p role="status" className="text-sm text-emerald-700">{resetSuccess}</p>}
                    <button type="submit" disabled={!selectedResetUser || resetSubmitting} className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-indigo-700 px-4 text-sm font-semibold text-white transition-colors hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60">{resetSubmitting ? 'Resetting…' : 'Reset password'}</button>
                  </form>
                </>
              )}
            </div>
          </section>}
        </div>
      )}
    </div>
  );
}
