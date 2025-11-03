import { useState } from 'react';
import { Mail, Lock, Shield } from 'lucide-react';

export default function LoginForm({ onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Demo auth: accept any non-empty email/password pair
    setTimeout(() => {
      setLoading(false);
      if (email && password) {
        onSuccess({ name: email.split('@')[0] || 'User', email });
      } else {
        setError('Please enter your email and password');
      }
    }, 600);
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Welcome back</h2>
            <p className="text-sm text-slate-500">Sign in to monitor customers & licenses</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700">Email</label>
            <div className="mt-1.5 relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full rounded-lg border pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                autoComplete="email"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Password</label>
            <div className="mt-1.5 relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                autoComplete="current-password"
              />
            </div>
          </div>

          {error && (
            <div className="text-sm text-red-600">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-indigo-600 py-2.5 text-white font-medium hover:bg-indigo-500 disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="mt-4 text-xs text-slate-500 text-center">
          By continuing you agree to our Terms & Privacy.
        </p>
      </div>
    </div>
  );
}
