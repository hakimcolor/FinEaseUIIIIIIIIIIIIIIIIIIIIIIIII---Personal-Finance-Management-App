import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';
import {
  FiZap,
  FiTrendingUp,
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
} from 'react-icons/fi';

const FinancialInsights = () => {
  const { user } = useContext(AuthContext);
  const [insights, setInsights] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetchInsights();
    }
  }, [user]);

  const fetchInsights = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/insights?email=${user.email}`
      );
      setInsights(res.data.insights || []);
      setStats(res.data.stats);
    } catch (error) {
      console.error('Failed to fetch insights:', error);
    } finally {
      setLoading(false);
    }
  };

  const getInsightIcon = (insight) => {
    const text = insight.toLowerCase();
    if (text.includes('great') || text.includes('keep it up')) {
      return {
        icon: <FiCheckCircle size={20} />,
        color: 'var(--color-success)',
      };
    } else if (text.includes('consider') || text.includes('try')) {
      return { icon: <FiInfo size={20} />, color: 'var(--color-secondary)' };
    } else if (text.includes('exceed') || text.includes('higher')) {
      return {
        icon: <FiAlertCircle size={20} />,
        color: 'var(--color-danger)',
      };
    }
    return { icon: <FiZap size={20} />, color: 'var(--color-primary)' };
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6">
        <div
          className="card rounded-2xl p-6 animate-pulse"
          style={{ border: '1px solid var(--border-color)' }}
        >
          <div
            className="h-6 rounded w-1/3 mb-4"
            style={{ backgroundColor: 'var(--border-color)' }}
          ></div>
          <div className="space-y-3">
            <div
              className="h-4 rounded w-full"
              style={{ backgroundColor: 'var(--border-color)' }}
            ></div>
            <div
              className="h-4 rounded w-5/6"
              style={{ backgroundColor: 'var(--border-color)' }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6">
      <div
        className="card rounded-2xl p-6 shadow-lg"
        style={{
          border: '1px solid var(--border-color)',
          background:
            'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-color) 100%)',
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}
          >
            <FiTrendingUp size={24} />
          </div>
          <div>
            <h3
              className="text-xl font-bold"
              style={{ color: 'var(--text-primary)' }}
            >
              Financial Insights
            </h3>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Personalized recommendations based on your spending
            </p>
          </div>
        </div>

        {/* Insights List */}
        <div className="space-y-3">
          {insights.map((insight, index) => {
            const { icon, color } = getInsightIcon(insight);
            return (
              <div
                key={index}
                className="flex items-start gap-3 p-4 rounded-xl transition-all hover:scale-[1.01]"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                }}
              >
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${color}20`, color }}
                >
                  {icon}
                </div>
                <p
                  className="flex-1 text-sm leading-relaxed pt-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {insight}
                </p>
              </div>
            );
          })}
        </div>

        {/* Stats Summary */}
        {stats && (
          <div
            className="mt-6 p-4 rounded-xl"
            style={{
              backgroundColor: 'var(--bg-color)',
              border: '1px solid var(--border-color)',
            }}
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center">
                <p
                  className="text-xs mb-1"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Savings Rate
                </p>
                <p
                  className="text-lg font-bold"
                  style={{ color: 'var(--color-success)' }}
                >
                  {stats.savingsRate.toFixed(1)}%
                </p>
              </div>
              <div className="text-center">
                <p
                  className="text-xs mb-1"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Balance
                </p>
                <p
                  className="text-lg font-bold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  ${stats.balance.toFixed(0)}
                </p>
              </div>
              <div className="text-center">
                <p
                  className="text-xs mb-1"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Income
                </p>
                <p
                  className="text-lg font-bold"
                  style={{ color: 'var(--color-success)' }}
                >
                  ${stats.totalIncome.toFixed(0)}
                </p>
              </div>
              <div className="text-center">
                <p
                  className="text-xs mb-1"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Expenses
                </p>
                <p
                  className="text-lg font-bold"
                  style={{ color: 'var(--color-danger)' }}
                >
                  ${stats.totalExpense.toFixed(0)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancialInsights;
