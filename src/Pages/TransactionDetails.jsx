import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from './Loding';
import { 
  FiArrowLeft, 
  FiTrendingUp, 
  FiTrendingDown, 
  FiTag, 
  FiFileText, 
  FiDollarSign, 
  FiCalendar,
  FiUser,
  FiMail,
  FiInfo
} from 'react-icons/fi';

const TransactionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_API}/transactions/${id}`)
      .then((res) => setTransaction(res.data))
      .catch(() => console.log('Failed to load transaction'));
  }, [id]);

  if (!transaction) return <Loading />;

  const isIncome = transaction.type === 'income';

  return (
    <div className="min-h-screen py-8 px-4" style={{ backgroundColor: 'var(--bg-color)' }}>
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 font-medium transition-all duration-200 cursor-pointer hover:gap-3"
          style={{ color: 'var(--text-secondary)' }}
        >
          <FiArrowLeft />
          Back to Transactions
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div 
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
            style={{ 
              backgroundColor: isIncome ? 'var(--color-success)' : 'var(--color-danger)', 
              color: 'white' 
            }}
          >
            {isIncome ? <FiTrendingUp size={28} /> : <FiTrendingDown size={28} />}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Transaction Details
          </h1>
          <p className="mt-2" style={{ color: 'var(--text-muted)' }}>
            View complete transaction information
          </p>
        </div>

        {/* Main Card */}
        <div 
          className="card rounded-3xl shadow-xl overflow-hidden"
          style={{ border: '1px solid var(--border-color)' }}
        >
          {/* Amount Header */}
          <div 
            className="p-6 sm:p-8 text-center text-white"
            style={{ 
              backgroundColor: isIncome ? 'var(--color-success)' : 'var(--color-danger)'
            }}
          >
            <p className="text-sm uppercase tracking-wider opacity-80 mb-2">
              {isIncome ? 'Income' : 'Expense'} Amount
            </p>
            <p className="text-4xl sm:text-5xl font-bold flex items-center justify-center gap-2">
              <FiDollarSign size={36} />
              {transaction.amount}
            </p>
          </div>

          {/* Details */}
          <div className="p-6 sm:p-8 space-y-5">
            {/* Type Badge */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: 'var(--bg-color)' }}
                >
                  <FiInfo style={{ color: 'var(--color-primary)' }} />
                </div>
                <div>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Type</p>
                  <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>Transaction Type</p>
                </div>
              </div>
              <span 
                className="px-4 py-2 rounded-full text-sm font-semibold text-white"
                style={{ 
                  backgroundColor: isIncome ? 'var(--color-success)' : 'var(--color-danger)'
                }}
              >
                {transaction.type}
              </span>
            </div>

            {/* Divider */}
            <div style={{ borderBottom: '1px solid var(--border-color)' }}></div>

            {/* Category */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: 'var(--bg-color)' }}
                >
                  <FiTag style={{ color: 'var(--color-primary)' }} />
                </div>
                <div>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Category</p>
                  <p className="font-semibold capitalize" style={{ color: 'var(--text-primary)' }}>
                    {transaction.category}
                  </p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div style={{ borderBottom: '1px solid var(--border-color)' }}></div>

            {/* Description */}
            <div className="flex items-start gap-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'var(--bg-color)' }}
              >
                <FiFileText style={{ color: 'var(--color-primary)' }} />
              </div>
              <div>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Description</p>
                <p className="font-medium" style={{ color: 'var(--text-primary)' }}>
                  {transaction.description || 'No description provided'}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div style={{ borderBottom: '1px solid var(--border-color)' }}></div>

            {/* Date */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: 'var(--bg-color)' }}
                >
                  <FiCalendar style={{ color: 'var(--color-primary)' }} />
                </div>
                <div>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Date</p>
                  <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {new Date(transaction.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* User Info */}
            {(transaction.name || transaction.email) && (
              <>
                <div style={{ borderBottom: '1px solid var(--border-color)' }}></div>
                
                <div 
                  className="rounded-xl p-4"
                  style={{ backgroundColor: 'var(--bg-color)' }}
                >
                  <p className="text-xs font-medium mb-3" style={{ color: 'var(--text-muted)' }}>
                    Recorded By
                  </p>
                  <div className="space-y-2">
                    {transaction.name && (
                      <div className="flex items-center gap-2">
                        <FiUser size={14} style={{ color: 'var(--text-muted)' }} />
                        <span style={{ color: 'var(--text-primary)' }}>{transaction.name}</span>
                      </div>
                    )}
                    {transaction.email && (
                      <div className="flex items-center gap-2">
                        <FiMail size={14} style={{ color: 'var(--text-muted)' }} />
                        <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{transaction.email}</span>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer Actions */}
          <div 
            className="p-6 sm:p-8 flex gap-3"
            style={{ borderTop: '1px solid var(--border-color)' }}
          >
            <button
              onClick={() => navigate(-1)}
              className="flex-1 py-3 rounded-xl font-semibold transition-all duration-200 cursor-pointer border-2"
              style={{ 
                borderColor: 'var(--border-color)', 
                color: 'var(--text-primary)',
                backgroundColor: 'transparent'
              }}
            >
              <FiArrowLeft className="inline mr-2" />
              Go Back
            </button>
            <button
              onClick={() => navigate(`/update-transaction/${id}`)}
              className="flex-1 py-3 rounded-xl font-semibold text-white transition-all duration-200 cursor-pointer hover:opacity-90"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              Edit Transaction
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
