import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
import { 
  FiDollarSign, 
  FiTrendingUp, 
  FiTrendingDown, 
  FiTag, 
  FiFileText, 
  FiCalendar,
  FiEdit3,
  FiArrowLeft,
  FiHome,
  FiShoppingBag,
  FiTruck,
  FiShoppingCart,
  FiBriefcase,
  FiSave
} from 'react-icons/fi';

const UpdateTransaction = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: 'expense',
    category: '',
    amount: '',
    description: '',
    date: '',
  });

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}/transactions/${id}`
        );
        setFormData(res.data);
      } catch {
        Swal.fire('Error', 'Failed to load transaction', 'error');
      }
    };
    fetchTransaction();
  }, [id]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to update this transaction?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'No',
    });

    if (result.isConfirmed) {
      try {
        await axios.put(
          `${import.meta.env.VITE_BACKEND_API}/transactions/${id}`,
          formData
        );
        Swal.fire('Updated!', 'Transaction has been updated.', 'success');
        navigate('/my-transactions');
      } catch (error) {
        console.error(error.response?.data || error);
        Swal.fire('Error', 'Update failed', 'error');
      }
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
      <Helmet>
        <title>Update Transaction - Money Manager</title>
      </Helmet>
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 font-medium transition-all duration-200 cursor-pointer hover:gap-3"
          style={{ color: 'var(--text-secondary)' }}
        >
          <FiArrowLeft />
          Back
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div 
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
            style={{ backgroundColor: 'var(--color-secondary)', color: 'white' }}
          >
            <FiEdit3 size={28} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Update Transaction
          </h1>
          <p className="mt-2" style={{ color: 'var(--text-muted)' }}>
            Edit your transaction details
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
                value={formData.date ? formData.date.split('T')[0] : ''}
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

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 py-4 rounded-xl font-semibold transition-all duration-200 cursor-pointer border-2 flex items-center justify-center gap-2"
                style={{ 
                  borderColor: 'var(--border-color)', 
                  color: 'var(--text-primary)',
                  backgroundColor: 'transparent'
                }}
              >
                <FiArrowLeft size={18} />
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-4 rounded-xl font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                <FiSave size={18} />
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateTransaction;
