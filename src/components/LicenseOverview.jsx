import { Users, Key, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function LicenseOverview({ customers }) {
  const totalCustomers = customers.length;
  const totalLicenses = customers.reduce((sum, c) => sum + c.licenses.total, 0);
  const active = customers.filter((c) => c.status === 'Active').length;
  const atRisk = customers.filter((c) => c.status === 'At Risk').length;

  const cards = [
    {
      label: 'Customers',
      value: totalCustomers,
      icon: Users,
      color: 'bg-indigo-50 text-indigo-600',
    },
    {
      label: 'Total Licenses',
      value: totalLicenses,
      icon: Key,
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      label: 'Active',
      value: active,
      icon: CheckCircle2,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      label: 'At Risk',
      value: atRisk,
      icon: AlertTriangle,
      color: 'bg-amber-50 text-amber-600',
    },
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(({ label, value, icon: Icon, color }) => (
        <div key={label} className="rounded-xl border bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">{label}</p>
              <p className="mt-1 text-2xl font-semibold">{value}</p>
            </div>
            <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${color}`}>
              <Icon className="h-5 w-5" />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
