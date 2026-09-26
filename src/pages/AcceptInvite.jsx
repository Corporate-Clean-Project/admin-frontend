import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { acceptInvite } from '../api/auth';

export default function AcceptInvite() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const email = searchParams.get('email') || '';
  const token = searchParams.get('token') || '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await acceptInvite({ email, token, name, password });
      navigate('/login');
    } catch (err) {
      setError(err?.response?.data?.message || 'Could not activate your account. The invite may have expired.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-4">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-xl shadow-lg p-8">
        <h1 className="font-display text-xl mb-2">Activate Your Account</h1>
        <p className="text-sm text-on-surface-variant mb-6">Welcome, {email || 'colleague'}. Set your name and password to get started.</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your full name"
            className="h-10 px-3 rounded-lg bg-surface-container-low border border-transparent focus:border-primary focus:outline-none text-sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="password"
            required
            placeholder="Create a password"
            className="h-10 px-3 rounded-lg bg-surface-container-low border border-transparent focus:border-primary focus:outline-none text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-sm text-error">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="h-11 rounded-lg bg-primary-container text-on-primary font-semibold text-sm hover:opacity-90 disabled:opacity-60"
          >
            {loading ? 'Activating…' : 'Activate Account'}
          </button>
        </form>
        <Link to="/login" className="block text-center text-xs text-primary hover:underline mt-6">
          Back to Sign In
        </Link>
      </div>
    </div>
  );
}
