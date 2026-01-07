import React, { useContext, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../Context/AuthContext';
import { 
  FiDollarSign, 
  FiTrendingUp, 
  FiTrendingDown, 
  FiTag, 
  FiFileText, 
  FiCalendar, 
  FiUser, 
  FiMail,
  FiPlus,
  FiHome,
  FiShoppingBag,
  FiTruck,
  FiShoppingCart,
  FiBriefcase
} from 'react-icons/fi';

const AddTransaction = () => {
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    type: 'expense',
    category: '',
    amount: '',
    description: '',
    date: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const transactionData = {
      ...formData,
      amount: Number(formData.amount),
      email: user?.email,
      name: user?.displayName,
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/transactions`,
        transactionData
      );

      if (res.data.insertedId) {
        toast.success('Transaction Added Successfully!');
        setFormData({
          type: 'expense',
          category: '',
          amount: '',
          description: '',
          date: '',
        });
      }
    } catch {
      toast.error('Failed to add transaction');
    }
  };

  const categories = [
    { value: 'home', label: 'Home', icon: <FiHome /> },
    { value: 'food', label: 'Food', icon: <FiShoppingBag /> },
    { value: 'transport', label: 'Transport', icon: <FiTruck /> },
    { value: 'shopping', label: 'Shopping', icon: <FiShoppingCart /> },
    { value: 'salary', label: 'Salary', icon: <FiBriefcase /> },
  ];

  return (
    <div className="min-h-screen py-8 px-4" style={{ backgroundColor: 'var(--bg-color)' }}>
      <Toaster />
      
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div 
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
            style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}
          >
            <FiPlus size={28} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Add Transaction
          </h1>
          <p className="mt-2" style={{ color: 'var(--text-muted)' }}>
            Record your income or expense
          </p>
        </div>

        {/* Form Card */}
        <div 
          className="card rounded-3xl shadow-xl p-6 sm:p-8"
          style={{ border: '1px solid var(--border-color)' }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Transaction Type Toggle */}
            <div>
              <label className="block text-sm font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
                Transaction Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'income' })}
                  className="flex items-center justify-center gap-2 p-4 rounded-xl font-semibold transition-all duration-200 border-2 cursor-pointer"
                  style={{
                    backgroundColor: formData.type === 'income' ? 'var(--color-success)' : 'transparent',
                    borderColor: formData.type === 'income' ? 'var(--color-success)' : 'var(--border-color)',
                    color: formData.type === 'income' ? 'white' : 'var(--text-secondary)'
                  }}
                >
                  <FiTrendingUp size={20} />
                  Income
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'expense' })}
                  className="flex items-center justify-center gap-2 p-4 rounded-xl font-semibold transition-all duration-200 border-2 cursor-pointer"
                  style={{
                    backgroundColor: formData.type === 'expense' ? 'var(--color-danger)' : 'transparent',
                    borderColor: formData.type === 'expense' ? 'var(--color-danger)' : 'var(--border-color)',
                    color: formData.type === 'expense' ? 'white' : 'var(--text-secondary)'
                  }}
                >
                  <FiTrendingDown size={20} />
                  Expense
                </button>
              </div>
              {/* Hidden select for form data */}
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="hidden"
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
                <FiTag className="inline mr-2" />
                Category
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, category: cat.value })}
                    className="flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-200 border-2 cursor-pointer hover:scale-105"
                    style={{
                      backgroundColor: formData.category === cat.value ? 'var(--color-primary)' : 'transparent',
                      borderColor: formData.category === cat.value ? 'var(--color-primary)' : 'var(--border-color)',
                      color: formData.category === cat.value ? 'white' : 'var(--text-secondary)'
                    }}
                  >
                    <span className="text-lg">{cat.icon}</span>
                    <span className="text-xs font-medium">{cat.label}</span>
                  </button>
                ))}
              </div>
              {/* Hidden select for form validation */}
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="hidden"
              >
                <option value="">Select Category</option>
                <option value="home">Home</option>
                <option value="food">Food</option>
                <option value="transport">Transport</option>
                <option value="shopping">Shopping</option>
                <option value="salary">Salary</option>
              </select>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
                <FiDollarSign className="inline mr-2" />
                Amount
              </label>
              <div className="relative">
                <span 
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold"
                  style={{ color: 'var(--color-primary)' }}
                >
                  $
                </span>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="0.00"
                  required
                  className="w-full pl-10 pr-4 py-4 rounded-xl text-xl font-semibold transition-all duration-200 outline-none focus:border-[var(--color-primary)]"
                  style={{ 
                    backgroundColor: 'var(--bg-color)',
                    border: '2px solid var(--border-color)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
                <FiFileText className="inline mr-2" />
                Description
              </label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="What was this transaction for?"
                className="w-full px-4 py-4 rounded-xl transition-all duration-200 outline-none focus:border-[var(--color-primary)]"
                style={{ 
                  backgroundColor: 'var(--bg-color)',
                  border: '2px solid var(--border-color)',
                  color: 'var(--text-primary)'
                }}
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
                <FiCalendar className="inline mr-2" />
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-4 rounded-xl transition-all duration-200 outline-none cursor-pointer focus:border-[var(--color-primary)]"
                style={{ 
                  backgroundColor: 'var(--bg-color)',
                  border: '2px solid var(--border-color)',
                  color: 'var(--text-primary)'
                }}
              />
            </div>

            {/* User Info - Read Only */}
            <div 
              className="rounded-xl p-4"
              style={{ backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)' }}
            >
              <p className="text-xs font-medium mb-3" style={{ color: 'var(--text-muted)' }}>
                Transaction will be recorded for:
              </p>
              <div className="flex items-center gap-4">
                {user?.photoURL && (
                  <img 
                    src={user.photoURL} 
                    alt="User" 
                    className="w-12 h-12 rounded-full border-2"
                    style={{ borderColor: 'var(--color-primary)' }}
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <FiUser size={14} style={{ color: 'var(--text-muted)' }} />
                    <input
                      type="text"
                      value={user?.displayName}
                      readOnly
                      className="bg-transparent font-medium truncate w-full outline-none"
                      style={{ color: 'var(--text-primary)' }}
                    />
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <FiMail size={14} style={{ color: 'var(--text-muted)' }} />
                    <input
                      type="email"
                      value={user?.email}
                      readOnly
                      className="bg-transparent text-sm truncate w-full outline-none"
                      style={{ color: 'var(--text-secondary)' }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-xl font-semibold text-white text-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              <FiPlus size={20} />
              Add Transaction
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTransaction;
