import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';
import { FiActivity, FiStar, FiThumbsUp, FiAlertTriangle, FiTool, FiAlertCircle } from 'react-icons/fi';

const FinancialHealth = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState({ totalIncome: 0, totalExpense: 0, balance: 0 });
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState({ label: '', color: '', icon: null });

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_API}/transactions/overview?email=${user.email}`)
        .then((res) => {
          setData(res.data);
          const { totalIncome, totalExpense } = res.data;
          if (totalIncome === 0) {
            setScore(0);
            setStatus({ label: 'No Data', color: 'var(--text-muted)', icon: <FiActivity size={24} /> });
            return;
          }
          const savingsRate = ((totalIncome - totalExpense) / totalIncome) * 100;
          const calculatedScore = Math.min(100, Math.max(0, savingsRate * 2));
          setScore(Math.round(calculatedScore));

          if (calculatedScore >= 80) {
            setStatus({ label: 'Excellent', color: 'var(--color-success)', icon: <FiStar size={24} /> });
          } else if (calculatedScore >= 60) {
            setStatus({ label: 'Good', color: 'var(--color-primary)', icon: <FiThumbsUp size={24} /> });
          } else if (calculatedScore >= 40) {
            setStatus({ label: 'Fair', color: 'var(--color-secondary)', icon: <FiAlertTriangle size={24} /> });
          } else if (calculatedScore >= 20) {
            setStatus({ label: 'Needs Work', color: 'var(--color-danger)', icon: <FiTool size={24} /> });
          } else {
            setStatus({ label: 'Critical', color: 'var(--color-danger)', icon: <FiAlertCircle size={24} /> });
          }
        })
        .catch((err) => console.error(err));
    }
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
        <FiActivity style={{ color: 'var(--color-primary)' }} /> Financial Health Score
      </h2>

      <div className="card rounded-2xl shadow-lg p-6 sm:p-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative w-40 h-40 sm:w-48 sm:h-48">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="50%" cy="50%" r="45%" stroke="var(--border-color)" strokeWidth="10" fill="none" />
              <circle
                cx="50%" cy="50%" r="45%"
                stroke="var(--color-primary)"
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${score * 2.83} 283`}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl sm:text-5xl font-bold" style={{ color: 'var(--text-primary)' }}>{score}</span>
              <span className="text-sm" style={{ color: 'var(--text-muted)' }}>out of 100</span>
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <span style={{ color: status.color }}>{status.icon}</span>
              <span className="text-2xl font-bold" style={{ color: status.color }}>{status.label}</span>
            </div>

            <div className="space-y-3" style={{ color: 'var(--text-secondary)' }}>
              <p className="flex items-center gap-2">
                <span style={{ color: 'var(--color-success)' }}>●</span>
                Savings Rate: {data.totalIncome > 0 ? Math.round(((data.totalIncome - data.totalExpense) / data.totalIncome) * 100) : 0}%
              </p>
              <p className="flex items-center gap-2">
                <span style={{ color: 'var(--color-primary)' }}>●</span>
                Total Saved: ${data.balance}
              </p>
              <p className="flex items-center gap-2">
                <span style={{ color: 'var(--color-secondary)' }}>●</span>
                Expense Ratio: {data.totalIncome > 0 ? Math.round((data.totalExpense / data.totalIncome) * 100) : 0}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialHealth;
