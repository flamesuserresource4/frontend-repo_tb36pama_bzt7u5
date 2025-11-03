import { User, LogOut, Shield } from 'lucide-react';

export default function Header({ user, onLogout }) {
  return (
    <header className="w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight">LicenseGuard</h1>
            <p className="text-xs text-slate-500 -mt-0.5">Team customer & license monitor</p>
          </div>
        </div>

        {user ? (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-lg border px-3 py-1.5 bg-white">
              <User className="h-4 w-4 text-slate-500" />
              <span className="text-sm font-medium">{user.name}</span>
            </div>
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <LogOut className="h-4 w-4" />
              Log out
            </button>
          </div>
        ) : null}
      </div>
    </header>
  );
}
