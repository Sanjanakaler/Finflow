import { createContext, useContext, useReducer, useEffect } from 'react';
import { SEED_TRANSACTIONS } from '../data/mockData';

const AppContext = createContext(null);

const initialState = {
  role: 'admin',
  transactions: [],
  filters: {
    type: 'all',
    category: 'all',
    sort: 'date-desc',
    search: '',
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_ROLE':
      return { ...state, role: action.payload };

    case 'LOAD_TRANSACTIONS':
      return { ...state, transactions: action.payload };

    case 'ADD_TRANSACTION': {
      const updated = [action.payload, ...state.transactions];
      localStorage.setItem('finflow_txns', JSON.stringify(updated));
      return { ...state, transactions: updated };
    }

    case 'SET_FILTER':
      return { ...state, filters: { ...state.filters, ...action.payload } };

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const saved = localStorage.getItem('finflow_txns');
    const txns = saved ? JSON.parse(saved) : SEED_TRANSACTIONS;
    dispatch({ type: 'LOAD_TRANSACTIONS', payload: txns });
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}

// ── Selector helpers ──────────────────────────────────────
export function useFilteredTransactions() {
  const { state } = useApp();
  const { transactions, filters } = state;

  return transactions
    .filter(t => {
      if (filters.type !== 'all' && t.type !== filters.type) return false;
      if (filters.category !== 'all' && t.category !== filters.category) return false;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (!t.desc.toLowerCase().includes(q) && !t.category.toLowerCase().includes(q)) return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (filters.sort === 'date-desc') return new Date(b.date) - new Date(a.date);
      if (filters.sort === 'date-asc')  return new Date(a.date) - new Date(b.date);
      if (filters.sort === 'amount-desc') return b.amount - a.amount;
      return a.amount - b.amount;
    });
}

export function useTotals() {
  const { state } = useApp();
  let income = 0, expense = 0;
  state.transactions.forEach(t => {
    if (t.type === 'income') income += t.amount;
    else expense += t.amount;
  });
  const balance = income - expense;
  const savingsRate = income > 0 ? ((balance / income) * 100).toFixed(1) : '0.0';
  return { income, expense, balance, savingsRate };
}

export function useCategoryTotals() {
  const { state } = useApp();
  const map = {};
  state.transactions
    .filter(t => t.type === 'expense')
    .forEach(t => { map[t.category] = (map[t.category] || 0) + t.amount; });
  return Object.entries(map).sort((a, b) => b[1] - a[1]);
}