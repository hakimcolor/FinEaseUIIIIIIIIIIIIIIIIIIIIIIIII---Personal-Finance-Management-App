import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const Reports = () => {
  const { user } = useContext(AuthContext);

  const [categoryData, setCategoryData] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [monthFilter, setMonthFilter] = useState('all');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detect system dark mode
  useEffect(() => {
    const dark =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(dark);
  }, []);

  useEffect(() => {
    if (user?.email) {
      fetchCategoryTotals();
      fetchTransactions();
    }
  }, [user]);

  const fetchCategoryTotals = async () => {
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_API
        }/transactions/category-total?email=${user.email}`
      );
      setCategoryData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(
        `https://fin-eas-backend.vercel.app/transactions?email=${user.email}`
      );
      setTransactions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Filter by month
  const filteredTransactions =
    monthFilter === 'all'
      ? transactions
      : transactions.filter(
          (t) => new Date(t.date).getMonth() + 1 === Number(monthFilter)
        );

  // Monthly totals
  const monthlyTotals = Array(12).fill(0);
  filteredTransactions.forEach((t) => {
    monthlyTotals[new Date(t.date).getMonth()] += t.amount;
  });

  // Income & Expense totals
  const incomeTotal = filteredTransactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expenseTotal = filteredTransactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  // Colors
  const pieColors = [
    '#FF6384',
    '#36A2EB',
    '#FFCE56',
    '#4BC0C0',
    '#9966FF',
    '#FF9F40',
  ];

  const textColor = isDarkMode ? '#E5E7EB' : '#111827';
  const gridColor = isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)';

  const barColor = isDarkMode ? '#818CF8' : '#4f46e5';

  return (
    <div
      className="p-6 min-h-screen transition-colors duration-300"
      style={{ color: textColor }}
    >
      <h1 className="text-3xl font-bold mb-6 text-green-400">
        Financial Reports
      </h1>

      {/* Month Filter */}
      <div className="mb-6">
        <label className="mr-3 font-semibold text-green-300">
          Filter by Month:
        </label>
        <select
          value={monthFilter}
          onChange={(e) => setMonthFilter(e.target.value)}
          className={`border px-3 py-1 rounded ${
            isDarkMode
              ? 'bg-gray-800 border-gray-700 text-gray-100'
              : 'bg-white border-gray-300 text-gray-900'
          }`}
        >
          <option value="all">All</option>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Category Pie */}
        <ChartCard title="Category Totals" isDarkMode={isDarkMode}>
          <Pie
            data={{
              labels: categoryData.map((c) => c._id),
              datasets: [
                {
                  data: categoryData.map((c) => c.total),
                  backgroundColor: pieColors,
                },
              ],
            }}
            options={{
              plugins: {
                legend: { labels: { color: textColor } },
              },
            }}
          />
        </ChartCard>

        {/* Monthly Bar */}
        <ChartCard title="Monthly Totals" isDarkMode={isDarkMode}>
          <Bar
            data={{
              labels: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
              ],
              datasets: [
                {
                  label: 'Amount',
                  data: monthlyTotals,
                  backgroundColor: barColor,
                },
              ],
            }}
            options={{
              plugins: { legend: { display: false } },
              scales: {
                x: { ticks: { color: textColor }, grid: { color: gridColor } },
                y: { ticks: { color: textColor }, grid: { color: gridColor } },
              },
            }}
          />
        </ChartCard>

        {/* Income vs Expense Pie */}
        <ChartCard title="Income vs Expense" isDarkMode={isDarkMode}>
          <Pie
            data={{
              labels: ['Income', 'Expense'],
              datasets: [
                {
                  data: [incomeTotal, expenseTotal],
                  backgroundColor: ['#22c55e', '#ef4444'],
                },
              ],
            }}
            options={{
              plugins: {
                legend: { labels: { color: textColor } },
              },
            }}
          />
        </ChartCard>

        {/* Income vs Expense Bar */}
        <ChartCard title="Income vs Expense (Bar)" isDarkMode={isDarkMode}>
          <Bar
            data={{
              labels: ['Income', 'Expense'],
              datasets: [
                {
                  data: [incomeTotal, expenseTotal],
                  backgroundColor: ['#22c55e', '#ef4444'],
                },
              ],
            }}
            options={{
              plugins: { legend: { display: false } },
              scales: {
                x: { ticks: { color: textColor }, grid: { color: gridColor } },
                y: { ticks: { color: textColor }, grid: { color: gridColor } },
              },
            }}
          />
        </ChartCard>
      </div>
    </div>
  );
};

// Reusable card
const ChartCard = ({ title, children, isDarkMode }) => (
  <div
    className={`border p-6 rounded-2xl shadow-md ${
      isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300'
    }`}
  >
    <h2 className="text-2xl font-semibold mb-4">{title}</h2>
    {children}
  </div>
);

export default Reports;
