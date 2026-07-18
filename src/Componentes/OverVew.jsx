import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';
import { FiTrendingUp, FiTrendingDown, FiDollarSign } from 'react-icons/fi';

// Format amount with commas: $1,234.56
const formatAmount = (amount) => {
  return Number(amount).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
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
            <p className="text-xl sm:text-2xl font-bold truncate">
              ${formatAmount(data.totalIncome)}
            </p>
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
            <p className="text-xl sm:text-2xl font-bold truncate">
              ${formatAmount(data.totalExpense)}
            </p>
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
            <p className="text-xl sm:text-2xl font-bold truncate">
              ${formatAmount(data.balance)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverVew;
