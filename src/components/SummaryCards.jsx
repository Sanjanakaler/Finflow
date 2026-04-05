import { useTotals } from '../context/AppContext';
import styles from './SummaryCards.module.css';

function fmt(n) {
  return '₹' + n.toLocaleString('en-IN');
}

export default function SummaryCards() {
  const { income, expense, balance, savingsRate } = useTotals();

  const cards = [
    {
      label: 'Total Balance',
      value: fmt(balance),
      sub: `${savingsRate}% savings rate`,
      icon: '💰',
      trend: '↑',
      trendClass: styles.up,
      valueClass: styles.valBalance,
      glow: '#6c63ff',
    },
    {
      label: 'Total Income',
      value: fmt(income),
      sub: 'All time',
      icon: '📥',
      trend: '↑',
      trendClass: styles.up,
      valueClass: styles.valIncome,
      glow: '#22d3a0',
    },
    {
      label: 'Total Expenses',
      value: fmt(expense),
      sub: `${income > 0 ? ((expense / income) * 100).toFixed(1) : 0}% of income`,
      icon: '📤',
      trend: '↓',
      trendClass: styles.down,
      valueClass: styles.valExpense,
      glow: '#f87171',
    },
    {
      label: 'Net Savings',
      value: fmt(balance),
      sub: 'Keep it up!',
      icon: '🎯',
      trend: '↑',
      trendClass: styles.up,
      valueClass: styles.valSavings,
      glow: '#fbbf24',
    },
  ];

  return (
    <div className={styles.grid}>
      {cards.map((c, i) => (
        <div
          key={c.label}
          className={styles.card}
          style={{ animationDelay: `${i * 0.07}s`, '--glow': c.glow }}
        >
          <span className={styles.icon}>{c.icon}</span>
          <p className={styles.label}>{c.label}</p>
          <p className={`${styles.value} ${c.valueClass}`}>{c.value}</p>
          <p className={`${styles.sub} ${c.trendClass}`}>
            {c.trend} {c.sub}
          </p>
        </div>
      ))}
    </div>
  );
}
