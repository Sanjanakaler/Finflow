export const CATEGORY_COLORS = {
  'Food & Dining': '#f87171',
  'Transport': '#60a5fa',
  'Shopping': '#f472b6',
  'Entertainment': '#a78bfa',
  'Health': '#34d399',
  'Housing': '#fbbf24',
  'Salary': '#22d3a0',
  'Freelance': '#6c63ff',
  'Investment': '#2dd4bf',
  'Other': '#9ca3af',
};

export const CATEGORY_ICONS = {
  'Food & Dining': '🍔',
  'Transport': '🚗',
  'Shopping': '🛍️',
  'Entertainment': '🎮',
  'Health': '💊',
  'Housing': '🏠',
  'Salary': '💼',
  'Freelance': '💻',
  'Investment': '📈',
  'Other': '💰',
};

export const CATEGORIES = Object.keys(CATEGORY_COLORS);

export const SEED_TRANSACTIONS = [
  { id: 1,  desc: 'Monthly Salary',     amount: 85000, type: 'income',  category: 'Salary',       date: '2024-11-01' },
  { id: 2,  desc: 'Netflix',            amount: 649,   type: 'expense', category: 'Entertainment', date: '2024-11-02' },
  { id: 3,  desc: 'Swiggy Order',       amount: 480,   type: 'expense', category: 'Food & Dining', date: '2024-11-03' },
  { id: 4,  desc: 'Uber Ride',          amount: 340,   type: 'expense', category: 'Transport',     date: '2024-11-05' },
  { id: 5,  desc: 'Freelance Project',  amount: 28000, type: 'income',  category: 'Freelance',     date: '2024-11-07' },
  { id: 6,  desc: 'Zara Shopping',      amount: 3200,  type: 'expense', category: 'Shopping',      date: '2024-11-08' },
  { id: 7,  desc: 'Gym Membership',     amount: 1200,  type: 'expense', category: 'Health',        date: '2024-11-10' },
  { id: 8,  desc: 'Rent Payment',       amount: 18000, type: 'expense', category: 'Housing',       date: '2024-11-01' },
  { id: 9,  desc: 'Dividend Income',    amount: 5400,  type: 'income',  category: 'Investment',    date: '2024-11-12' },
  { id: 10, desc: 'BigBasket Grocery',  amount: 2100,  type: 'expense', category: 'Food & Dining', date: '2024-11-14' },
  { id: 11, desc: 'Monthly Salary',     amount: 85000, type: 'income',  category: 'Salary',       date: '2024-10-01' },
  { id: 12, desc: 'Amazon Shopping',    amount: 4500,  type: 'expense', category: 'Shopping',      date: '2024-10-04' },
  { id: 13, desc: 'Doctor Visit',       amount: 800,   type: 'expense', category: 'Health',        date: '2024-10-06' },
  { id: 14, desc: 'Spotify',            amount: 119,   type: 'expense', category: 'Entertainment', date: '2024-10-07' },
  { id: 15, desc: 'Freelance Project',  amount: 15000, type: 'income',  category: 'Freelance',     date: '2024-10-10' },
  { id: 16, desc: 'Petrol',             amount: 2400,  type: 'expense', category: 'Transport',     date: '2024-10-12' },
  { id: 17, desc: 'Rent Payment',       amount: 18000, type: 'expense', category: 'Housing',       date: '2024-10-01' },
  { id: 18, desc: 'Restaurant Dinner',  amount: 1800,  type: 'expense', category: 'Food & Dining', date: '2024-10-18' },
  { id: 19, desc: 'Monthly Salary',     amount: 85000, type: 'income',  category: 'Salary',       date: '2024-09-01' },
  { id: 20, desc: 'SIP Investment',     amount: 10000, type: 'expense', category: 'Investment',    date: '2024-09-03' },
  { id: 21, desc: 'Myntra Sale',        amount: 2900,  type: 'expense', category: 'Shopping',      date: '2024-09-05' },
  { id: 22, desc: 'Freelance Project',  amount: 20000, type: 'income',  category: 'Freelance',     date: '2024-09-09' },
  { id: 23, desc: 'Ola Cab',            amount: 560,   type: 'expense', category: 'Transport',     date: '2024-09-11' },
  { id: 24, desc: 'Rent Payment',       amount: 18000, type: 'expense', category: 'Housing',       date: '2024-09-01' },
];