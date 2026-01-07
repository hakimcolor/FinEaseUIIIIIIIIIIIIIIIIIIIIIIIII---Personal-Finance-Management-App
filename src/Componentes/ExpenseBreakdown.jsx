import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';
import { FiPieChart, FiInbox } from 'react-icons/fi';

const categoryColors = [
  'var(--color-primary)',
  'var(--color-secondary)',
  'var(--color-success)',
  'var(--color-danger)',
];

const ExpenseBreakdown = () => {
  const { user } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_API}/transactions?email=${user.email}`)
        .then((res) => {
          const expenses = res.data.filter((tx) => tx.type === 'expense');
          const total = expenses.reduce((sum, tx) => sum + Number(tx.amount), 0);
          setTotalExpense(total);

          const grouped = expenses.reduce((acc, tx) => {
            const cat = tx.category?.toLowerCase() || 'other';
            acc[cat] = (acc[cat] || 0) + Number(tx.amount);
            return acc;
          }, {});

          const categoryArray = Object.entries(grouped)
            .map(([name, amount], index) => ({
              name,
              amount,
              percentage: total > 0 ? Math.round((amount / total) * 100) : 0,
              color: categoryColors[index % 4],
            }))
            .sort((a, b) => b.amount - a.amount);

          setCategories(categoryArray);
        })
        .catch((err) => console.error(err));
    }
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
        <FiPieChart style={{ color: 'var(--color-primary)' }} /> Expense Breakdown
      </h2>

      <div className="card rounded-2xl shadow-lg p-6 sm:p-8">
        {categories.length === 0 ? (
          <div className="text-center py-8" style={{ color: 'var(--text-muted)' }}>
            <FiInbox size={48} className="mx-auto mb-3" />
            <p>No expense data yet. Start tracking to see breakdown!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {categories.map((cat, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold capitalize" style={{ color: 'var(--text-primary)' }}>{cat.name}</span>
                    <span style={{ color: 'var(--text-secondary)' }}>${cat.amount.toLocaleString()} ({cat.percentage}%)</span>
                  </div>
                  <div className="w-full rounded-full h-2.5 overflow-hidden" style={{ backgroundColor: 'var(--border-color)' }}>
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}

            <div className="pt-4 mt-6" style={{ borderTop: '1px solid var(--border-color)' }}>
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>Total Expenses</span>
                <span className="font-bold text-xl" style={{ color: 'var(--color-danger)' }}>${totalExpense.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseBreakdown;
