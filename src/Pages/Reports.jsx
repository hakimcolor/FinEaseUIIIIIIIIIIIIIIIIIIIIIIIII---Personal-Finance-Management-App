import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';
import { Pie, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import { 
  FiPieChart, 
  FiBarChart2, 
  FiTrendingUp, 
  FiTrendingDown, 
  FiDollarSign,
  FiCalendar,
  FiFilter,
  FiPercent
} from 'react-icons/fi';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

// Format amount: 1.5M, 25.3K, or $1,234.56
const formatAmount = (amount) => {
  if (amount >= 1000000) {
    return (amount / 1000000).toFixed(2) + 'M';
  } else if (amount >= 1000) {
    return (amount / 1000).toFixed(2) + 'K';
  } else {
    return amount.toFixed(2);
  }
};

// Get detailed breakdown
const getAmountBreakdown = (amount) => {
  const millions = Math.floor(amount / 1000000);
  const thousands = Math.floor((amount % 1000000) / 1000);
  const hundreds = Math.floor((amount % 1000) / 100);
  const dollars = Math.floor(amount % 100);
  const cents = Math.round((amount % 1) * 100);
  
  return { millions, thousands, hundreds, dollars, cents };
};

// Amount Breakdown Component
const AmountBreakdown = ({ amount, light = false }) => {
  const breakdown = getAmountBreakdown(Math.abs(amount));
  const parts = [];
  
  if (breakdown.millions > 0) parts.push(`${breakdown.millions}M`);
  if (breakdown.thousands > 0) parts.push(`${breakdown.thousands}K`);
  if (breakdown.hundreds > 0) parts.push(`${breakdown.hundreds}H`);
  if (breakdown.dollars > 0 || parts.length === 0) parts.push(`${breakdown.dollars}$`);
  if (breakdown.cents > 0) parts.push(`${breakdown.cents}¢`);
  
  return (
    <p className="text-xs mt-1" style={{ color: light ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)' }}>
      {parts.join(' + ')}
    </p>
  );
};

const Reports = () => {
  const { user } = useContext(AuthContext);

  const [categoryData, setCategoryData] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [yearFilter, setYearFilter] = useState('all');
  const [monthFilter, setMonthFilter] = useState('all');
  const [isDark, setIsDark] = useState(false);

  // Detect dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const fetchCategoryTotals = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/transactions/category-total?email=${user.email}`
      );
      setCategoryData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/transactions?email=${user.email}`
      );
      setTransactions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchCategoryTotals();
      fetchTransactions();
    }
  }, [user]);

  // Get unique years from transactions
  const availableYears = [...new Set(transactions.map(t => new Date(t.date).getFullYear()))].sort((a, b) => b - a);

  // Filter by year and month
  const filteredTransactions = transactions.filter((t) => {
    const date = new Date(t.date);
    const yearMatch = yearFilter === 'all' || date.getFullYear() === Number(yearFilter);
    const monthMatch = monthFilter === 'all' || date.getMonth() + 1 === Number(monthFilter);
    return yearMatch && monthMatch;
  });

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

  const balance = incomeTotal - expenseTotal;
  const savingsRate = incomeTotal > 0 ? Math.round((balance / incomeTotal) * 100) : 0;

  // Chart colors using CSS variables
  const chartColors = ['#0D9488', '#6366F1', '#10B981', '#EF4444', '#F59E0B', '#8B5CF6'];
  
  // Text colors for charts (Chart.js doesn't support CSS variables)
  const textColor = isDark ? '#E5E7EB' : '#374151';
  const textMutedColor = isDark ? '#9CA3AF' : '#6B7280';
  const gridColor = isDark ? '#374151' : '#E5E7EB';

  return (
    <div className="min-h-screen py-8 px-4" style={{ backgroundColor: 'var(--bg-color)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}
              >
                <FiPieChart size={24} />
              </div>
              Financial Reports
            </h1>
            <p className="mt-2" style={{ color: 'var(--text-muted)' }}>
              Analyze your income and expenses
            </p>
          </div>

          {/* Year & Month Filter */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Year Filter */}
            <div 
              className="flex items-center gap-3 px-4 py-3 rounded-xl"
              style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
            >
              <FiCalendar style={{ color: 'var(--text-muted)' }} />
              <select
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                className="outline-none font-medium cursor-pointer"
                style={{ backgroundColor: 'var(--bg-card)', color: 'var(--text-primary)' }}
              >
                <option value="all">All Years</option>
                {availableYears.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            {/* Month Filter */}
            <div 
              className="flex items-center gap-3 px-4 py-3 rounded-xl"
              style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
            >
              <FiFilter style={{ color: 'var(--text-muted)' }} />
              <select
                value={monthFilter}
                onChange={(e) => setMonthFilter(e.target.value)}
                className="outline-none font-medium cursor-pointer"
                style={{ backgroundColor: 'var(--bg-card)', color: 'var(--text-primary)' }}
              >
                <option value="all">All Months</option>
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
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Total Income */}
          <div 
            className="rounded-2xl p-4 flex items-center gap-4"
            style={{ backgroundColor: 'var(--color-success)', color: 'white' }}
          >
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <FiTrendingUp size={24} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm opacity-80">Income</p>
              <p className="text-xl sm:text-2xl font-bold truncate">${formatAmount(incomeTotal)}</p>
              <AmountBreakdown amount={incomeTotal} light={true} />
            </div>
          </div>

          {/* Total Expense */}
          <div 
            className="rounded-2xl p-4 flex items-center gap-4"
            style={{ backgroundColor: 'var(--color-danger)', color: 'white' }}
          >
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <FiTrendingDown size={24} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm opacity-80">Expense</p>
              <p className="text-xl sm:text-2xl font-bold truncate">${formatAmount(expenseTotal)}</p>
              <AmountBreakdown amount={expenseTotal} light={true} />
            </div>
          </div>

          {/* Balance */}
          <div 
            className="rounded-2xl p-4 flex items-center gap-4"
            style={{ backgroundColor: 'var(--color-secondary)', color: 'white' }}
          >
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <FiDollarSign size={24} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm opacity-80">Balance</p>
              <p className="text-xl sm:text-2xl font-bold truncate">${formatAmount(balance)}</p>
              <AmountBreakdown amount={balance} light={true} />
            </div>
          </div>

          {/* Savings Rate */}
          <div 
            className="rounded-2xl p-4 flex items-center gap-4"
            style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}
          >
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <FiPercent size={24} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm opacity-80">Savings Rate</p>
              <p className="text-xl sm:text-2xl font-bold truncate">{savingsRate}%</p>
              <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.7)' }}>of income saved</p>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Income vs Expense Doughnut */}
          <ChartCard 
            title="Income vs Expense" 
            icon={<FiPieChart />}
            subtitle="Overall distribution"
          >
            <div className="h-64 flex items-center justify-center">
              <Doughnut
                data={{
                  labels: ['Income', 'Expense'],
                  datasets: [
                    {
                      data: [incomeTotal, expenseTotal],
                      backgroundColor: ['#10B981', '#EF4444'],
                      borderWidth: 0,
                      cutout: '70%',
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: { 
                        color: textColor,
                        padding: 20,
                        usePointStyle: true,
                      }
                    },
                  },
                }}
              />
            </div>
            {/* Center Stats */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none" style={{ marginTop: '-20px' }}>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Total</p>
              <p className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                ${(incomeTotal + expenseTotal).toLocaleString()}
              </p>
            </div>
          </ChartCard>

          {/* Category Breakdown */}
          <ChartCard 
            title="Spending by Category" 
            icon={<FiPieChart />}
            subtitle="Where your money goes"
          >
            <div className="h-64">
              <Pie
                data={{
                  labels: categoryData.map((c) => c._id),
                  datasets: [
                    {
                      data: categoryData.map((c) => c.total),
                      backgroundColor: chartColors,
                      borderWidth: 0,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: { 
                        color: textColor,
                        padding: 15,
                        usePointStyle: true,
                      }
                    },
                  },
                }}
              />
            </div>
          </ChartCard>
        </div>

        {/* Monthly Bar Chart - Full Width */}
        <ChartCard 
          title="Monthly Overview" 
          icon={<FiBarChart2 />}
          subtitle="Transaction totals by month"
        >
          <div className="h-72">
            <Bar
              data={{
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                  {
                    label: 'Amount',
                    data: monthlyTotals,
                    backgroundColor: '#0D9488',
                    borderRadius: 8,
                    borderSkipped: false,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { 
                  legend: { display: false }
                },
                scales: {
                  x: { 
                    ticks: { color: textMutedColor }, 
                    grid: { display: false }
                  },
                  y: { 
                    ticks: { color: textMutedColor }, 
                    grid: { color: gridColor }
                  },
                },
              }}
            />
          </div>
        </ChartCard>

        {/* Category List */}
        {categoryData.length > 0 && (
          <div 
            className="card rounded-2xl mt-6 overflow-hidden"
            style={{ border: '1px solid var(--border-color)' }}
          >
            <div className="p-6" style={{ borderBottom: '1px solid var(--border-color)' }}>
              <h3 className="text-lg font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <FiFilter style={{ color: 'var(--color-primary)' }} />
                Category Breakdown
              </h3>
            </div>
            <div className="divide-y" style={{ borderColor: 'var(--border-color)' }}>
              {categoryData.map((cat, index) => {
                const total = categoryData.reduce((sum, c) => sum + c.total, 0);
                const percentage = total > 0 ? Math.round((cat.total / total) * 100) : 0;
                return (
                  <div key={cat._id} className="p-4 flex items-center gap-4">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: chartColors[index % chartColors.length] }}
                    ></div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium capitalize" style={{ color: 'var(--text-primary)' }}>
                          {cat._id}
                        </span>
                        <span style={{ color: 'var(--text-secondary)' }}>
                          ${cat.total.toLocaleString()} ({percentage}%)
                        </span>
                      </div>
                      <div 
                        className="w-full h-2 rounded-full overflow-hidden"
                        style={{ backgroundColor: 'var(--border-color)' }}
                      >
                        <div 
                          className="h-full rounded-full transition-all duration-500"
                          style={{ 
                            width: `${percentage}%`,
                            backgroundColor: chartColors[index % chartColors.length]
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Reusable Chart Card
const ChartCard = ({ title, icon, subtitle, children }) => (
  <div 
    className="card rounded-2xl p-6 relative"
    style={{ border: '1px solid var(--border-color)' }}
  >
    <div className="flex items-center gap-2 mb-1">
      <span style={{ color: 'var(--color-primary)' }}>{icon}</span>
      <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{title}</h3>
    </div>
    {subtitle && (
      <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>{subtitle}</p>
    )}
    {children}
  </div>
);

export default Reports;
