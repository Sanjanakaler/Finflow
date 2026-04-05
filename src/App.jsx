import { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Sidebar from './components/Sidebar';
import SummaryCards from './components/SummaryCards';
import { BalanceTrendChart, SpendingDonutChart, MonthlyBarChart } from './components/Charts';
import TransactionTable from './components/TransactionTable';
import Insights from './components/Insights';
import './index.css';
import styles from './App.module.css';

function Dashboard() {
  return (
    <div className="fade-up">
      <SummaryCards />
      <div className={styles.chartsRow}>
        <BalanceTrendChart />
        <SpendingDonutChart />
      </div>
      <div style={{ marginBottom: 28 }}>
        <MonthlyBarChart />
      </div>
    </div>
  );
}

function AppInner() {
  const [activePage, setActivePage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { state, dispatch } = useApp();

  const pageTitles = {
    dashboard: 'Dashboard',
    transactions: 'Transactions',
    insights: 'Insights',
  };

  return (
    <div className={styles.app}>
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <main className={styles.main}>
        <div className={styles.topbar}>
          <div className={styles.topLeft}>
            <button className={styles.hamburger} onClick={() => setSidebarOpen(true)}>☰</button>
            <h1 className={styles.pageTitle}>{pageTitles[activePage]}</h1>
          </div>
          <div className={styles.topRight}>
            <div className={styles.searchWrap}>
              <span className={styles.searchIcon}>🔍</span>
              <input
                className={styles.searchInput}
                placeholder="Search transactions…"
                value={state.filters.search}
                onChange={e => dispatch({ type: 'SET_FILTER', payload: { search: e.target.value } })}
              />
            </div>
            <div className={styles.avatar}>A</div>
          </div>
        </div>
        {activePage === 'dashboard'    && <Dashboard />}
        {activePage === 'transactions' && <TransactionTable />}
        {activePage === 'insights'     && <Insights />}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  );
}