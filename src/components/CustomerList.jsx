import { useMemo, useState } from 'react';
import { Search, Plus, CheckCircle2, AlertTriangle, Clock } from 'lucide-react';

const StatusPill = ({ status }) => {
  const map = {
    Active: {
      icon: CheckCircle2,
      className: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    },
    'At Risk': {
      icon: AlertTriangle,
      className: 'text-amber-700 bg-amber-50 border-amber-200',
    },
    Trial: {
      icon: Clock,
      className: 'text-indigo-700 bg-indigo-50 border-indigo-200',
    },
  };
  const Icon = map[status]?.icon || Clock;
  const classes = map[status]?.className || 'text-slate-700 bg-slate-50 border-slate-200';
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${classes}`}>
      <Icon className="h-3.5 w-3.5" />
      {status}
    </span>
  );
};

export default function CustomerList({ customers, onAdd }) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return customers.filter((c) =>
      c.name.toLowerCase().includes(q) ||
      c.owner.toLowerCase().includes(q) ||
      c.tier.toLowerCase().includes(q)
    );
  }, [customers, query]);

  return (
    <section className="rounded-xl border bg-white">
      <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search customers"
            className="w-full rounded-lg border pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          onClick={onAdd}
          className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          <Plus className="h-4 w-4" />
          Add customer
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-fixed">
          <thead>
            <tr className="text-left text-slate-500 text-sm border-t border-b bg-slate-50">
              <th className="px-4 py-3 font-medium w-1/4">Customer</th>
              <th className="px-4 py-3 font-medium w-1/5">Owner</th>
              <th className="px-4 py-3 font-medium w-1/5">Tier</th>
              <th className="px-4 py-3 font-medium w-1/5">Licenses</th>
              <th className="px-4 py-3 font-medium w-1/5">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} className="border-b last:border-0">
                <td className="px-4 py-3">
                  <div>
                    <p className="font-medium">{c.name}</p>
                    <p className="text-xs text-slate-500">{c.domain}</p>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm">{c.owner}</td>
                <td className="px-4 py-3 text-sm">{c.tier}</td>
                <td className="px-4 py-3 text-sm">
                  <span className="font-medium">{c.licenses.active}</span>
                  <span className="text-slate-500"> / {c.licenses.total}</span>
                </td>
                <td className="px-4 py-3">
                  <StatusPill status={c.status} />
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-sm text-slate-500">
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
