import { useState } from 'react';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../api/auth';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await forgotPassword(email);
    } finally {
      setLoading(false);
      setSent(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-4">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-xl shadow-lg p-8">
        <h1 className="font-display text-xl mb-2">Reset Your Password</h1>
        <p className="text-sm text-on-surface-variant mb-6">
          Enter your work email and we'll send a reset link if an account exists.
        </p>
        {sent ? (
          <p className="text-sm text-tertiary">
            If an account exists for that email, a reset link has been sent. Check your inbox.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              required
              placeholder="e.g. admin@toppristine.com"
              className="h-10 px-3 rounded-lg bg-surface-container-low border border-transparent focus:border-primary focus:outline-none text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              disabled={loading}
              className="h-11 rounded-lg bg-primary-container text-on-primary font-semibold text-sm hover:opacity-90 disabled:opacity-60"
            >
              {loading ? 'Sending…' : 'Send Reset Link'}
            </button>
          </form>
        )}
        <Link to="/login" className="block text-center text-xs text-primary hover:underline mt-6">
          Back to Sign In
        </Link>
      </div>
    </div>
  );
}
