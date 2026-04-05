import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/mockData';
import styles from './AddTransactionModal.module.css';

export default function AddTransactionModal({ onClose }) {
  const { dispatch } = useApp();
  const [form, setForm] = useState({
    desc: '',
    amount: '',
    type: 'expense',
    category: 'Food & Dining',
    date: new Date().toISOString().split('T')[0],
  });
  const [error, setError] = useState('');

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSave() {
    if (!form.desc.trim() || !form.amount || !form.date) {
      setError('Please fill all fields.');
      return;
    }
    dispatch({
      type: 'ADD_TRANSACTION',
      payload: {
        id: Date.now(),
        desc: form.desc.trim(),
        amount: parseFloat(form.amount),
        type: form.type,
        category: form.category,
        date: form.date,
      },
    });
    onClose();
  }

  return (
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        <h3 className={styles.title}>Add Transaction</h3>

        <div className={styles.row}>
          <label>Description</label>
          <input name="desc" value={form.desc} onChange={handleChange} placeholder="e.g. Netflix Subscription" />
        </div>

        <div className={styles.row}>
          <label>Amount (₹)</label>
          <input name="amount" type="number" value={form.amount} onChange={handleChange} placeholder="0" min="0" />
        </div>

        <div className={styles.twoCol}>
          <div className={styles.row}>
            <label>Type</label>
            <select name="type" value={form.type} onChange={handleChange}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
          <div className={styles.row}>
            <label>Date</label>
            <input name="date" type="date" value={form.date} onChange={handleChange} />
          </div>
        </div>

        <div className={styles.row}>
          <label>Category</label>
          <select name="category" value={form.category} onChange={handleChange}>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.btns}>
          <button className={styles.btnCancel} onClick={onClose}>Cancel</button>
          <button className={styles.btnSave} onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}