import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import Swal from 'sweetalert2';
import Loading from './Loding';

const MyTransactions = () => {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState('type-income');

  const fetchTransactions = async () => {
    if (!user?.email) return;
    try {
      const res = await axios.get(
        `https://fin-eas-backend.vercel.app/transactions?email=${user.email}`
      );
      setTransactions(res.data);
    } catch {
      toast.error('Failed to fetch transactions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [user]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this transaction?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_API}/transactions/${id}`
      );
      toast.success('Transaction deleted');
      fetchTransactions();
    } catch {
      toast.error('Delete failed');
    }
  };

  const sortedTransactions = transactions.slice().sort((a, b) => {
    if (sortOption === 'type-income') {
      if (a.type === b.type) return 0;
      return a.type === 'income' ? -1 : 1;
    }
    if (sortOption === 'type-expense') {
      if (a.type === b.type) return 0;
      return a.type === 'expense' ? -1 : 1;
    }
    if (sortOption === 'date-new') {
      return new Date(b.date) - new Date(a.date);
    }
    if (sortOption === 'date-old') {
      return new Date(a.date) - new Date(b.date);
    }
    if (sortOption === 'amount-high') {
      return b.amount - a.amount;
    }
    if (sortOption === 'amount-low') {
      return a.amount - b.amount;
    }
    return 0;
  });

  if (loading) return <Loading />;

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <Toaster />
      <h2 className="text-2xl sm:text-3xl font-bold mb-6dark:text-slate-100 mb-2">
        My Transactions
      </h2>

      <div className="mb-4 flex flex-wrap gap-2 items-center">
        <label className="mr-2 dark:text-gray-300 font-semibold">
          Sort by:
        </label>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-slate-800 dark:text-gray-200"
        >
          <option value="type-income">Type: Income First</option>
          <option value="type-expense">Type: Expense First</option>
          <option value="date-new">Date: Newest First</option>
          <option value="date-old">Date: Oldest First</option>
          <option value="amount-high">Amount: High to Low</option>
          <option value="amount-low">Amount: Low to High</option>
        </select>
      </div>

      {sortedTransactions.length === 0 && (
        <p className="text-gray-600 dark:text-gray-300">
          No transactions found
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sortedTransactions.map((item) => (
          <div
            key={item._id}
            className="p-5 rounded-2xl 
              bg-gradient-to-br from-blue-50 via-white to-indigo-50
              dark:from-slate-900 dark:via-slate-800 dark:to-slate-900
              shadow-xl border border-slate-200 dark:border-slate-700
              hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="flex justify-between items-center mb-3">
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  item.type === 'income'
                    ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                    : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                }`}
              >
                {item.type}
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                {new Date(item.date).toLocaleDateString()}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-slate-800 dark:text-slate-100">
              {item.category}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              {item.description}
            </p>
            <div className="mt-3 font-bold text-slate-800 dark:text-slate-100 text-lg">
              $ {item.amount}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <NavLink
                to={`/update-transaction/${item._id}`}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-300 text-sm sm:text-base"
              >
                Update
              </NavLink>
              <button
                onClick={() => handleDelete(item._id)}
                className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors duration-300 text-sm sm:text-base"
              >
                Delete
              </button>
              <NavLink
                to={`/transaction-details/${item._id}`}
                className="px-4 py-2 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors duration-300 text-sm sm:text-base"
              >
                View
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTransactions;
