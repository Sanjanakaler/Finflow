import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { useTotals, useCategoryTotals, useApp } from '../context/AppContext';
import { CATEGORY_COLORS, CATEGORY_ICONS } from '../data/mockData';
import styles from './Insights.module.css';

const STACKED_DATA = [
  { month: 'Aug', 'Food & Dining': 3200, Transport: 1800, Shopping: 4500, Entertainment: 900, Health: 600, Housing: 18000 },
  { month: 'Sep', 'Food & Dining': 2800, Transport: 560,  Shopping: 2900, Entertainment: 300, Health: 0,   Housing: 18000 },
  { month: 'Oct', 'Food & Dining': 1800, Transport: 2400, Shopping: 4500, Entertainment: 119, Health: 800, Housing: 18000 },
  { month: 'Nov', 'Food & Dining': 2580, Transport: 340,  Shopping: 3200, Entertainment: 649, Health: 1200,Housing: 18000 },
];

const STACKED_KEYS = ['Food & Dining','Transport','Shopping','Entertainment','Health','Housing'];

function fmtK(v) { return '₹' + (v / 1000).toFixed(0) + 'k'; }

function InsightCard({ icon, title, value, valueColor, desc, pct, barColor, delay }) {
  return (
    <div className={styles.card} style={{ animationDelay: delay }}>
      <div className={styles.icon}>{icon}</div>
      <p className={styles.cardTitle}>{title}</p>
      <p className={styles.cardValue} style={{ color: valueColor }}>{value}</p>
      <p className={styles.cardDesc}>{desc}</p>
      {pct !== undefined && (
        <div className={styles.barTrack}>
          <div
            className={styles.barFill}
            style={{ width: `${Math.min(Math.abs(pct), 100)}%`, background: barColor }}
          />
        </div>
      )}
    </div>
  );
}

export default function Insights() {
  const cats = useCategoryTotals();
  const topCat = cats[0] || ['N/A', 0];
  const { income, expense, balance, savingsRate } = useTotals();
  const { state } = useApp();

  const nov = state.transactions.filter(t => t.date.startsWith('2024-11'));
  const oct = state.transactions.filter(t => t.date.startsWith('2024-10'));
  const novInc = nov.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0) || 118400;
  const octInc = oct.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0) || 100000;
  const novExp = nov.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0) || 26269;
  const octExp = oct.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0) || 48519;

  const incChange = octInc ? (((novInc - octInc) / octInc) * 100).toFixed(1) : 0;
  const expChange = octExp ? (((novExp - octExp) / octExp) * 100).toFixed(1) : 0;
  const totalExp  = cats.reduce((s, [, v]) => s + v, 0);
  const topPct    = totalExp ? ((topCat[1] / totalExp) * 100).toFixed(0) : 0;

  function fmt(n) { return '₹' + n.toLocaleString('en-IN'); }

  const cards = [
    {
      icon: CATEGORY_ICONS[topCat[0]] || '🏆',
      title: 'Top Spending Category',
      value: topCat[0],
      valueColor: CATEGORY_COLORS[topCat[0]] || 'var(--accent)',
      desc: `${fmt(topCat[1])} spent — ${topPct}% of total expenses`,
      pct: topPct,
      barColor: CATEGORY_COLORS[topCat[0]] || 'var(--accent)',
    },
    {
      icon: '📈',
      title: 'Income vs Last Month',
      value: `${incChange >= 0 ? '+' : ''}${incChange}%`,
      valueColor: incChange >= 0 ? 'var(--green)' : 'var(--red)',
      desc: `Nov ${fmt(novInc)} vs Oct ${fmt(octInc)}`,
      pct: Math.abs(incChange),
      barColor: 'var(--green)',
    },
    {
      icon: '📉',
      title: 'Expense vs Last Month',
      value: `${expChange >= 0 ? '+' : ''}${expChange}%`,
      valueColor: expChange <= 0 ? 'var(--green)' : 'var(--red)',
      desc: `Nov ${fmt(novExp)} vs Oct ${fmt(octExp)}`,
      pct: Math.abs(expChange),
      barColor: 'var(--red)',
    },
    {
      icon: '🎯',
      title: 'Savings Rate',
      value: `${savingsRate}%`,
      valueColor: 'var(--yellow)',
      desc: `Saved ${fmt(balance)} out of ${fmt(income)}. ${savingsRate > 30 ? 'Excellent discipline!' : 'Try saving more.'}`,
      pct: parseFloat(savingsRate),
      barColor: 'var(--yellow)',
    },
    {
      icon: '💡',
      title: 'Smart Observation',
      value: 'Housing is Fixed',
      valueColor: 'var(--teal)',
      desc: '₹18,000/month on rent every month. Consider optimising for better savings growth.',
    },
    {
      icon: '🔥',
      title: 'Transaction Count',
      value: `${state.transactions.length}`,
      valueColor: 'var(--orange)',
      desc: `${state.transactions.filter(t => t.type === 'income').length} income · ${state.transactions.filter(t => t.type === 'expense').length} expense entries`,
    },
  ];

  return (
    <div className="fade-up">
      <h2 className={styles.pageTitle}>Financial Insights</h2>

      <div className={styles.grid}>
        {cards.map((c, i) => (
          <InsightCard key={c.title} {...c} delay={`${i * 0.06}s`} />
        ))}
      </div>

      <div className={styles.chartCard}>
        <div className={styles.chartHeader}>
          <h3 className={styles.chartTitle}>Category Spending Over Months</h3>
          <span className={styles.pill}>2024</span>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={STACKED_DATA} barCategoryGap="35%">
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(42,47,64,0.6)" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: '#6b7290', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={fmtK} tick={{ fill: '#6b7290', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip
              formatter={(v, name) => [`₹${v.toLocaleString('en-IN')}`, name]}
              contentStyle={{ background: '#1e2230', border: '1px solid #2a2f40', borderRadius: 8, fontSize: 12 }}
            />
            <Legend wrapperStyle={{ fontSize: 11, color: '#6b7290' }} />
            {STACKED_KEYS.map(k => (
              <Bar key={k} dataKey={k} stackId="a" fill={CATEGORY_COLORS[k] + 'cc'} radius={k === 'Housing' ? [4,4,0,0] : [0,0,0,0]} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}