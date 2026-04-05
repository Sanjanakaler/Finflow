import { useState } from 'react';
import { useApp, useFilteredTransactions } from '../context/AppContext';
import { CATEGORY_COLORS, CATEGORY_ICONS, CATEGORIES } from '../data/mockData';
import AddTransactionModal from './AddTransactionModal';
import styles from './TransactionTable.module.css';

function fmt(n) { return '₹' + n.toLocaleString('en-IN'); }
function fmtDate(d) {
  return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function TransactionTable() {
  const { state, dispatch } = useApp();
  const { filters, role } = state;
  const transactions = useFilteredTransactions();
  const [modalOpen, setModalOpen] = useState(false);

  function setFilter(obj) { dispatch({ type: 'SET_FILTER', payload: obj }); }

  const uniqueCategories = [...new Set(state.transactions.map(t => t.category))].sort();

  return (
    <div className="fade-up">
      <div className={styles.header}>
        <h2 className={styles.title}>All Transactions</h2>
        <button
          className={styles.addBtn}
          onClick={() => setModalOpen(true)}
          disabled={role !== 'admin'}
          title={role !== 'admin' ? 'Viewers cannot add transactions' : ''}
        >
          ＋ Add Transaction
        </button>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        {['all', 'income', 'expense'].map(t => (
          <button
            key={t}
            className={`${styles.filterBtn} ${filters.type === t ? styles.filterBtnActive : ''}`}
            onClick={() => setFilter({ type: t })}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}

        <select
          className={styles.filterSelect}
          value={filters.category}
          onChange={e => setFilter({ category: e.target.value })}
        >
          <option value="all">All Categories</option>
          {uniqueCategories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <select
          className={styles.filterSelect}
          value={filters.sort}
          onChange={e => setFilter({ sort: e.target.value })}
        >
          <option value="date-desc">Newest First</option>
          <option value="date-asc">Oldest First</option>
          <option value="amount-desc">Highest Amount</option>
          <option value="amount-asc">Lowest Amount</option>
        </select>
      </div>

      {/* Table */}
      <div className={styles.tableWrap}>
        {transactions.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>🔍</div>
            <p>No transactions found</p>
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Description</th>
                <th>Date</th>
                <th className={styles.hideSm}>Category</th>
                <th>Type</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(t => (
                <tr key={t.id}>
                  <td>
                    <div className={styles.descCell}>
                      <div
                        className={styles.rowIcon}
                        style={{ background: (CATEGORY_COLORS[t.category] || '#9ca3af') + '22' }}
                      >
                        {CATEGORY_ICONS[t.category] || '💳'}
                      </div>
                      <div>
                        <div className={styles.descName}>{t.desc}</div>
                        <div className={styles.descSub}>#{String(t.id).padStart(5, '0')}</div>
                      </div>
                    </div>
                  </td>
                  <td className={styles.dateCell}>{fmtDate(t.date)}</td>
                  <td className={styles.hideSm}>
                    <span
                      className={styles.catBadge}
                      style={{
                        background: (CATEGORY_COLORS[t.category] || '#9ca3af') + '22',
                        color: CATEGORY_COLORS[t.category] || '#9ca3af',
                      }}
                    >
                      {t.category}
                    </span>
                  </td>
                  <td>
                    <span className={`${styles.typeBadge} ${t.type === 'income' ? styles.typeIncome : styles.typeExpense}`}>
                      {t.type.charAt(0).toUpperCase() + t.type.slice(1)}
                    </span>
                  </td>
                  <td className={t.type === 'income' ? styles.amtPos : styles.amtNeg}>
                    {t.type === 'income' ? '+' : '-'}{fmt(t.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modalOpen && <AddTransactionModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}
