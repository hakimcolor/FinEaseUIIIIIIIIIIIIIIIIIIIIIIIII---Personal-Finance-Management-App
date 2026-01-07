import React from 'react';
import { FiCheckCircle, FiTrendingUp, FiShield, FiTarget } from 'react-icons/fi';

const StaticHOMe = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16 space-y-14">
      {/* Budgeting Tips */}
      <section className="card rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-7 sm:p-10">
        <div className="flex items-center gap-3 mb-6">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center text-white"
            style={{ backgroundColor: 'var(--color-success)' }}
          >
            <FiTrendingUp size={24} />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: 'var(--color-success)' }}>
            Budgeting Tips
          </h2>
        </div>

        <ul className="grid sm:grid-cols-2 gap-4 text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>
          <li className="flex items-center gap-2">
            <FiCheckCircle style={{ color: 'var(--color-success)' }} /> Track your income and expenses regularly
          </li>
          <li className="flex items-center gap-2">
            <FiCheckCircle style={{ color: 'var(--color-success)' }} /> Set monthly spending limits
          </li>
          <li className="flex items-center gap-2">
            <FiCheckCircle style={{ color: 'var(--color-success)' }} /> Save at least 20% of your income
          </li>
          <li className="flex items-center gap-2">
            <FiCheckCircle style={{ color: 'var(--color-success)' }} /> Avoid unnecessary expenses
          </li>
          <li className="flex items-center gap-2">
            <FiCheckCircle style={{ color: 'var(--color-success)' }} /> Review your budget every month
          </li>
        </ul>
      </section>

      {/* Why Financial Planning Matters */}
      <section className="card rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-7 sm:p-10">
        <div className="flex items-center gap-3 mb-6">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center text-white"
            style={{ backgroundColor: 'var(--color-secondary)' }}
          >
            <FiTarget size={24} />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: 'var(--color-secondary)' }}>
            Why Financial Planning Matters
          </h2>
        </div>

        <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Financial planning helps you manage your money wisely, prepare for
          emergencies, achieve long-term goals, and live a stress-free life.
          With proper planning, you can control your expenses, grow your
          savings, and build a secure financial future.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <span className="px-4 py-2 rounded-full text-white text-xs sm:text-sm flex items-center gap-1" style={{ backgroundColor: 'var(--color-primary)' }}>
            <FiTrendingUp size={14} /> Smart Saving
          </span>
          <span className="px-4 py-2 rounded-full text-white text-xs sm:text-sm flex items-center gap-1" style={{ backgroundColor: 'var(--color-secondary)' }}>
            <FiShield size={14} /> Expense Control
          </span>
          <span className="px-4 py-2 rounded-full text-white text-xs sm:text-sm flex items-center gap-1" style={{ backgroundColor: 'var(--color-success)' }}>
            <FiTarget size={14} /> Secure Future
          </span>
        </div>
      </section>
    </div>
  );
};

export default StaticHOMe;
