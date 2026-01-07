import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';
import { FiTrendingUp, FiTrendingDown, FiDollarSign } from 'react-icons/fi';

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
const AmountBreakdown = ({ amount }) => {
  const breakdown = getAmountBreakdown(Math.abs(amount));
  const parts = [];
  
  if (breakdown.millions > 0) parts.push(`${breakdown.millions}M`);
  if (breakdown.thousands > 0) parts.push(`${breakdown.thousands}K`);
  if (breakdown.hundreds > 0) parts.push(`${breakdown.hundreds}H`);
  if (breakdown.dollars > 0 || parts.length === 0) parts.push(`${breakdown.dollars}$`);
  if (breakdown.cents > 0) parts.push(`${breakdown.cents}¢`);
  
  return (
    <p className="text-xs opacity-70 mt-1">
      {parts.join(' + ')}
    </p>
  );
};

const OverVew = () => {
  const { user } = useContext(AuthContext);

  const [data, setData] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });

  useEffect(() => {
    if (user?.email) {
      axios
        .get(
          `${import.meta.env.VITE_BACKEND_API}/transactions/overview?email=${user.email}`
        )
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mb-8">
      <div className="flex flex-col gap-4">
        {/* Total Income */}
        <div 
          className="p-4 rounded-xl flex items-center gap-4"
          style={{ backgroundColor: 'var(--color-success)', color: 'white' }}
        >
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
            <FiTrendingUp size={24} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm opacity-80">Total Income</p>
            <p className="text-xl sm:text-2xl font-bold truncate">${formatAmount(data.totalIncome)}</p>
            <AmountBreakdown amount={data.totalIncome} />
          </div>
        </div>

        {/* Total Expense */}
        <div 
          className="p-4 rounded-xl flex items-center gap-4"
          style={{ backgroundColor: 'var(--color-danger)', color: 'white' }}
        >
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
            <FiTrendingDown size={24} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm opacity-80">Total Expense</p>
            <p className="text-xl sm:text-2xl font-bold truncate">${formatAmount(data.totalExpense)}</p>
            <AmountBreakdown amount={data.totalExpense} />
          </div>
        </div>

        {/* Balance */}
        <div 
          className="p-4 rounded-xl flex items-center gap-4"
          style={{ backgroundColor: 'var(--color-secondary)', color: 'white' }}
        >
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
            <FiDollarSign size={24} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm opacity-80">Balance</p>
            <p className="text-xl sm:text-2xl font-bold truncate">${formatAmount(data.balance)}</p>
            <AmountBreakdown amount={data.balance} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverVew;
