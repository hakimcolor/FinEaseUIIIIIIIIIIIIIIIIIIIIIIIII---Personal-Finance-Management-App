import React, { useState, useEffect } from 'react';
import { FiDollarSign, FiPieChart, FiTrendingUp, FiEye, FiClock, FiTarget, FiShield, FiSmartphone, FiInfo } from 'react-icons/fi';

const MoneyTips = () => {
  const tips = [
    { tip: "Pay yourself first - save before you spend!", icon: <FiDollarSign size={28} /> },
    { tip: "The 50/30/20 rule: 50% needs, 30% wants, 20% savings", icon: <FiPieChart size={28} /> },
    { tip: "Small daily savings add up to big yearly gains", icon: <FiTrendingUp size={28} /> },
    { tip: "Track every expense - awareness is the first step", icon: <FiEye size={28} /> },
    { tip: "Avoid impulse buying - wait 24 hours before big purchases", icon: <FiClock size={28} /> },
    { tip: "Set specific financial goals with deadlines", icon: <FiTarget size={28} /> },
    { tip: "Build an emergency fund of 3-6 months expenses", icon: <FiShield size={28} /> },
    { tip: "Review subscriptions monthly - cancel unused ones", icon: <FiSmartphone size={28} /> },
  ];

  const [currentTip, setCurrentTip] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [tips.length]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6">
      <div className="rounded-2xl shadow-lg p-5 sm:p-6 text-white" style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}>
        <div className="flex items-center gap-4">
          <span className="animate-bounce">{tips[currentTip].icon}</span>
          <div>
            <p className="text-xs uppercase tracking-wide opacity-80 mb-1 flex items-center gap-1">
              <FiInfo size={12} /> Daily Money Tip
            </p>
            <p className="text-lg sm:text-xl font-semibold">{tips[currentTip].tip}</p>
          </div>
        </div>
        
        <div className="flex justify-center gap-2 mt-4">
          {tips.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTip(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentTip ? 'bg-white w-6' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoneyTips;
