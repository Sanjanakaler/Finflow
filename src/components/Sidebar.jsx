import { useApp } from '../context/AppContext';
import styles from './Sidebar.module.css';

const NAV_ITEMS = [
  { id: 'dashboard',    icon: '🏠', label: 'Dashboard' },
  { id: 'transactions', icon: '💳', label: 'Transactions' },
  { id: 'insights',     icon: '📊', label: 'Insights' },
];

export default function Sidebar({ activePage, onNavigate, isOpen, onClose }) {
  const { state, dispatch } = useApp();

  function handleRole(e) {
    dispatch({ type: 'SET_ROLE', payload: e.target.value });
  }

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`}
        onClick={onClose}
      />

      <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>💎</div>
          <span className={styles.logoText}>FinFlow</span>
        </div>

        <p className={styles.navLabel}>Menu</p>

        <nav>
          {NAV_ITEMS.map(item => (
            <div
              key={item.id}
              className={`${styles.navItem} ${activePage === item.id ? styles.navItemActive : ''}`}
              onClick={() => { onNavigate(item.id); onClose(); }}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              {item.label}
            </div>
          ))}
        </nav>

        <div className={styles.roleSwitcher}>
          <p className={styles.roleLabel}>Switch Role</p>
          <select
            className={styles.roleSelect}
            value={state.role}
            onChange={handleRole}
          >
            <option value="admin">Admin</option>
            <option value="viewer">Viewer</option>
          </select>
          <span className={`${styles.roleBadge} ${state.role === 'admin' ? styles.badgeAdmin : styles.badgeViewer}`}>
            {state.role === 'admin' ? '⚡ Admin' : '👁 Viewer'}
          </span>
        </div>
      </aside>
    </>
  );
}
