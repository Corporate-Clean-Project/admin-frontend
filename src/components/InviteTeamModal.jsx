import { useState } from 'react';

export default function InviteTeamModal({ onClose, onInvite }) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('admin');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError('');
    try {
      await onInvite({ email, role });
      onClose();
    } catch (err) {
      setError(err?.response?.data?.message || 'Could not send invite.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-xl shadow-2xl p-6">
        <h2 className="font-display text-lg mb-4">Invite a Team Member</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Work Email</label>
            <input
              type="email"
              required
              placeholder="colleague@toppristine.com"
              className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-transparent focus:border-primary focus:outline-none text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Role</label>
            <select
              className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-transparent focus:border-primary focus:outline-none text-sm"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="super_admin">Super Admin</option>
            </select>
          </div>
          {error && <p className="text-sm text-error">{error}</p>}
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 h-10 rounded-lg border border-outline-variant text-sm">
              Cancel
            </button>
            <button
              type="submit"
              disabled={sending}
              className="px-4 h-10 rounded-lg bg-primary-container text-on-primary text-sm font-semibold hover:opacity-90 disabled:opacity-60"
            >
              {sending ? 'Sending…' : 'Send Invite'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
