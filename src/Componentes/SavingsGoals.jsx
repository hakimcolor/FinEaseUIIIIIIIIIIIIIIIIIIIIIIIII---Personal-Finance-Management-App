import React, { useState } from 'react';
import { FiTarget, FiPlus, FiShield, FiMapPin, FiMonitor, FiTrendingUp } from 'react-icons/fi';

const SavingsGoals = () => {
  const [goals] = useState([
    { id: 1, name: 'Emergency Fund', target: 5000, current: 2500, icon: <FiShield size={24} />, colorVar: 'var(--color-primary)' },
    { id: 2, name: 'Vacation', target: 3000, current: 1200, icon: <FiMapPin size={24} />, colorVar: 'var(--color-secondary)' },
    { id: 3, name: 'New Laptop', target: 1500, current: 900, icon: <FiMonitor size={24} />, colorVar: 'var(--color-success)' },
    { id: 4, name: 'Investment', target: 10000, current: 4500, icon: <FiTrendingUp size={24} />, colorVar: 'var(--color-danger)' },
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
          <FiTarget style={{ color: 'var(--color-primary)' }} /> Savings Goals
        </h2>
        <button className="px-4 py-2 text-white rounded-full text-sm font-semibold transition hover:opacity-90 flex items-center gap-1" style={{ backgroundColor: 'var(--color-primary)' }}>
          <FiPlus size={16} /> Add Goal
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {goals.map((goal) => {
          const progress = Math.round((goal.current / goal.target) * 100);
          return (
            <div key={goal.id} className="card rounded-2xl shadow-lg p-5 sm:p-6 hover:shadow-xl transition">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: goal.colorVar }}
                  >
                    {goal.icon}
                  </div>
                  <div>
                    <h3 className="font-bold" style={{ color: 'var(--text-primary)' }}>{goal.name}</h3>
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                      ${goal.current.toLocaleString()} of ${goal.target.toLocaleString()}
                    </p>
                  </div>
                </div>
                <span className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{progress}%</span>
              </div>

              <div className="w-full rounded-full h-3 overflow-hidden" style={{ backgroundColor: 'var(--border-color)' }}>
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${progress}%`, backgroundColor: goal.colorVar }}
                ></div>
              </div>

              <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
                ${(goal.target - goal.current).toLocaleString()} remaining
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SavingsGoals;
