import { useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import LoginForm from './components/LoginForm.jsx';
import LicenseOverview from './components/LicenseOverview.jsx';
import CustomerList from './components/CustomerList.jsx';

function App() {
  const [user, setUser] = useState(null);
  const [customers, setCustomers] = useState([
    {
      id: 'c1',
      name: 'Acme Corp',
      domain: 'acme.com',
      owner: 'Jamie Lee',
      tier: 'Enterprise',
      licenses: { active: 180, total: 200 },
      status: 'Active',
    },
    {
      id: 'c2',
      name: 'Northwind',
      domain: 'northwind.io',
      owner: 'Priya Patel',
      tier: 'Pro',
      licenses: { active: 38, total: 50 },
      status: 'At Risk',
    },
    {
      id: 'c3',
      name: 'Globex',
      domain: 'globex.net',
      owner: 'Alex Kim',
      tier: 'Pro',
      licenses: { active: 12, total: 25 },
      status: 'Trial',
    },
  ]);

  const handleLogin = (u) => setUser(u);
  const handleLogout = () => setUser(null);

  const addCustomer = () => {
    const id = Math.random().toString(36).slice(2, 8);
    setCustomers((prev) => [
      {
        id,
        name: `NewCo ${prev.length + 1}`,
        domain: `newco${prev.length + 1}.com`,
        owner: user?.name || 'Owner',
        tier: 'Starter',
        licenses: { active: 0, total: 5 },
        status: 'Trial',
      },
      ...prev,
    ]);
  };

  const content = useMemo(() => {
    if (!user) {
      return (
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <LoginForm onSuccess={handleLogin} />
        </main>
      );
    }

    return (
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <LicenseOverview customers={customers} />
        <CustomerList customers={customers} onAdd={addCustomer} />
      </main>
    );
  }, [user, customers]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header user={user} onLogout={handleLogout} />
      {content}
      <footer className="py-8 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} LicenseGuard. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
