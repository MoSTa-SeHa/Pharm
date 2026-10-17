
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import PharmacyERP from './pages/PharmacyERP';
import AiICD from './pages/AiICD';
import Inventory from './pages/Inventory';
import Sales from './pages/Sales';
import Purchases from './pages/Purchases';
import Customers from './pages/Customers';
import HR from './pages/HR';
import Planning from './pages/Planning';
import Marketing from './pages/Marketing';
import Production from './pages/Production';
import Government from './pages/Government';
import SqlConsole from './pages/SqlConsole';
import LandingPage from './pages/LandingPage';
import Auth from './pages/Auth';
import AboutUs from './pages/AboutUs';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Policy from './pages/Policy';

const App: React.FC = () => {
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#/');
  const [user, setUser] = useState<{ email: string; isAdmin: boolean } | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash || '#/');
    };

    const savedUser = localStorage.getItem('mosta_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const logout = () => {
    localStorage.removeItem('mosta_user');
    setUser(null);
    window.location.hash = '#/';
  };

  const renderPage = () => {
    // Public routes available to everyone
    switch (currentHash) {
      case '#/about': return <AboutUs />;
      case '#/privacy': return <Privacy />;
      case '#/terms': return <Terms />;
      case '#/policy': return <Policy />;
      default: break;
    }

    // If user is not logged in, they can only see Home or Auth (or above public pages)
    if (!user) {
      if (currentHash === '#/auth') {
        return <Auth onAuthSuccess={(userData) => setUser(userData)} />;
      }
      return <LandingPage />;
    }

    // Authenticated views
    switch (currentHash) {
      case '#/':
        return <Dashboard />;
      case '#/sales':
        return <Sales />;
      case '#/purchases':
        return <Purchases />;
      case '#/inventory':
        return <Inventory />;
      case '#/customers':
        return <Customers />;
      case '#/hr':
        return <HR />;
      case '#/planning':
        return <Planning />;
      case '#/marketing':
        return <Marketing />;
      case '#/production':
        return <Production />;
      case '#/drugs':
        return <PharmacyERP />;
      case '#/ai-icd':
        return <AiICD />;
      case '#/government':
        return <Government />;
      case '#/sql-console':
        return user.isAdmin ? <SqlConsole /> : <Dashboard />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout user={user} onLogout={logout}>
      {renderPage()}
    </Layout>
  );
};

export default App;
