import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { resetPassword } from '../api/auth';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const email = searchParams.get('email') || 'julian@toppristine.com';
  const token = searchParams.get('token') || '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await resetPassword({ email, token, password });
      navigate('/login');
    } catch (err) {
      setError(err?.response?.data?.message || 'Could not reset password. Try requesting a new link.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-sans bg-white">
      
      {/* Left Column - Form */}
      <div className="w-full lg:w-5/12 xl:w-1/3 p-8 sm:p-12 md:p-16 flex flex-col justify-center shrink-0">
        <div className="w-full max-w-sm mx-auto flex flex-col">
          
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-indigo-700 text-white rounded font-bold flex items-center justify-center font-serif text-2xl shadow-sm">
              T
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-slate-900 text-lg leading-tight">Top Pristine</span>
              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Corporate Admin Workspace</span>
            </div>
          </div>

          <div className="mb-8">
             <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Set a New Password</h1>
             <p className="text-sm text-slate-500 font-medium">Secure access recovery for <span className="text-slate-900 font-semibold">{email}</span></p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <input
                type="password"
                required
                placeholder="Create strong enterprise credential"
                className="h-11 px-4 rounded-lg bg-white border border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-sm text-slate-900 font-medium transition-shadow shadow-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <input
                type="password"
                required
                placeholder="Re-enter new password"
                className="h-11 px-4 rounded-lg bg-white border border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-sm text-slate-900 font-medium transition-shadow shadow-sm"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-lg p-3">
              <div className="flex justify-between items-center mb-2">
                 <span className="text-xs font-bold text-slate-700">Password Strength: <span className="text-amber-500">Medium</span></span>
                 <span className="text-[10px] font-semibold text-slate-400">Ensure 12+ chars & symbols</span>
              </div>
              <div className="flex gap-1 h-1.5 w-full rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 flex-1"></div>
                <div className="h-full bg-amber-500 flex-1"></div>
                <div className="h-full bg-slate-200 flex-1"></div>
              </div>
            </div>

            {error && <p className="text-sm text-rose-600 font-medium bg-rose-50 p-3 rounded-lg border border-rose-100">{error}</p>}
            
            <button
              type="submit"
              disabled={loading}
              className="h-12 mt-2 rounded-lg bg-indigo-700 text-white font-bold text-sm hover:bg-indigo-800 transition-colors shadow-sm disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? 'Updating…' : 'Save Credential & Re-Authenticate'} <span className="material-symbols-outlined text-[18px]">lock_reset</span>
            </button>
          </form>

          <Link to="/login" className="mt-8 text-xs font-bold text-indigo-600 hover:underline text-center flex items-center justify-center gap-1.5">
            <span className="material-symbols-outlined text-[14px]">arrow_back</span> Back to portal sign in
          </Link>
          
        </div>
      </div>

      {/* Right Column - Image */}
      <div className="hidden lg:flex flex-1 relative bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1600&h=900" alt="Architecture" className="w-full h-full object-cover opacity-60 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
        </div>
        
        <div className="relative z-10 p-12 mt-auto text-white max-w-xl">
           <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">Architecture & Mastery</span>
           <h2 className="text-3xl font-serif leading-tight mb-4 text-slate-50">Precision in every detail.<br/>Excellence in every build.</h2>
           <p className="text-sm text-slate-300 font-medium leading-relaxed">The internal management platform for Top Pristine artisans, architects, and project coordinators. Ensure all client communications and site specifications are handled with utmost discretion.</p>
        </div>
      </div>

    </div>
  );
}
