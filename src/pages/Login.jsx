import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err?.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-sans bg-white">
      
      {/* Left Column - Login Form */}
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
             <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Sign in to your account</h1>
             <p className="text-sm text-slate-500 font-medium">Enter your credentials to access the management portal.</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold tracking-wider text-slate-600 uppercase" htmlFor="email">
                Work Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="admin@toppristine.com"
                className="h-11 px-4 rounded-lg bg-white border border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-sm text-slate-900 font-medium transition-shadow shadow-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold tracking-wider text-slate-600 uppercase" htmlFor="password">
                  Workstation Password
                </label>
                <Link to="/forgot-password" className="text-xs font-bold text-indigo-600 hover:underline">
                  Forgot workstation password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  className="h-11 px-4 pr-10 w-full rounded-lg bg-white border border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-sm text-slate-900 font-medium transition-shadow shadow-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {error && <p className="text-sm text-rose-600 font-medium bg-rose-50 p-3 rounded-lg border border-rose-100">{error}</p>}
            
            <button
              type="submit"
              disabled={loading}
              className="h-12 mt-4 rounded-lg bg-indigo-700 text-white font-bold text-sm hover:bg-indigo-800 transition-colors shadow-sm disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? 'Authenticating…' : 'Authenticate & Enter'} <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </form>

          <p className="mt-8 text-[11px] text-slate-400 font-medium text-center flex items-center justify-center gap-1.5">
            <span className="material-symbols-outlined text-[14px]">lock</span> Restricted access. All login attempts are recorded and monitored.
          </p>
          
        </div>
      </div>

      {/* Right Column - Image */}
      <div className="hidden lg:flex flex-1 relative bg-slate-900 overflow-hidden">
        {/* Placeholder image mapping to the mockup's right side */}
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
