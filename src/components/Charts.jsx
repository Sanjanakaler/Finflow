import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer
} from 'recharts';
import { useCategoryTotals, useApp } from '../context/AppContext';
import { CATEGORY_COLORS } from '../data/mockData';
import styles from './Charts.module.css';

const MONTHLY_DATA = [
  { month: 'Jun', income: 68000,  expense: 52000 },
  { month: 'Jul', income: 72000,  expense: 58000 },
  { month: 'Aug', income: 80000,  expense: 61000 },
  { month: 'Sep', income: 105000, expense: 63360 },
  { month: 'Oct', income: 100000, expense: 48519 },
  { month: 'Nov', income: 118400, expense: 26269 },
];

const BALANCE_DATA = MONTHLY_DATA.map(d => ({
  month: d.month,
  balance: d.income - d.expense,
  income: d.income,
}));

function fmtK(v) { return '₹' + (v / 1000).toFixed(0) + 'k'; }

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className={styles.tooltip}>
      <p className={styles.tooltipLabel}>{label}</p>
      {payload.map(p => (
        <p key={p.dataKey} style={{ color: p.color, fontSize: 12, marginTop: 3 }}>
          {p.name}: ₹{Number(p.value).toLocaleString('en-IN')}
        </p>
      ))}
    </div>
  );
};

export function BalanceTrendChart() {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.title}>Balance Trend</h3>
        <span className={styles.pill}>Last 6 months</span>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={BALANCE_DATA}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(42,47,64,0.7)" />
          <XAxis dataKey="month" tick={{ fill: '#6b7290', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tickFormatter={fmtK} tick={{ fill: '#6b7290', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: 11, color: '#6b7290' }} />
          <Line type="monotone" dataKey="balance" name="Balance" stroke="#6c63ff" strokeWidth={2.5} dot={{ fill: '#6c63ff', r: 4 }} activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="income" name="Income" stroke="#22d3a0" strokeWidth={2} strokeDasharray="5 3" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function SpendingDonutChart() {
  const cats = useCategoryTotals().slice(0, 6);
  const total = cats.reduce((s, [, v]) => s + v, 0);

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.title}>Spending Breakdown</h3>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={cats.map(([name, value]) => ({ name, value }))}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={3}
            dataKey="value"
          >
            {cats.map(([name]) => (
              <Cell key={name} fill={CATEGORY_COLORS[name] || '#9ca3af'} stroke="transparent" />
            ))}
          </Pie>
          <Tooltip formatter={(v) => `₹${v.toLocaleString('en-IN')}`} contentStyle={{ background: '#1e2230', border: '1px solid #2a2f40', borderRadius: 8, fontSize: 12 }} />
        </PieChart>
      </ResponsiveContainer>
      <div className={styles.legend}>
        {cats.slice(0, 5).map(([cat, val]) => (
          <div key={cat} className={styles.legendItem}>
            <div className={styles.legendLeft}>
              <div className={styles.legendDot} style={{ background: CATEGORY_COLORS[cat] }} />
              <span>{cat}</span>
            </div>
            <span className={styles.legendPct}>
              {total ? ((val / total) * 100).toFixed(0) : 0}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MonthlyBarChart() {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.title}>Monthly Income vs Expenses</h3>
        <span className={styles.pill}>2024</span>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={MONTHLY_DATA} barCategoryGap="30%">
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(42,47,64,0.7)" vertical={false} />
          <XAxis dataKey="month" tick={{ fill: '#6b7290', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tickFormatter={fmtK} tick={{ fill: '#6b7290', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: 11, color: '#6b7290' }} />
          <Bar dataKey="income" name="Income" fill="rgba(34,211,160,0.75)" radius={[5,5,0,0]} />
          <Bar dataKey="expense" name="Expense" fill="rgba(248,113,113,0.75)" radius={[5,5,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}