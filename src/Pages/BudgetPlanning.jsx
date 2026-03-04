import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../Context/AuthContext';
import {
  FiTarget,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiAlertTriangle,
  FiCheckCircle,
  FiDollarSign,
} from 'react-icons/fi';
import Swal from 'sweetalert2';

const BudgetPlanning = () => {
  const { user } = useContext(AuthContext);
  const [budgets, setBudgets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });
  const [editingBudget, setEditingBudget] = useState(null);

  useEffect(() => {
    if (user?.email) {
      fetchBudgets();
      fetchTransactions();
    }
  }, [user]);

  const fetchBudgets = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/budgets?email=${user.email}`
      );
      setBudgets(res.data);
    } catch (error) {
      toast.error('Failed to fetch budgets');
    }
  };

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/transactions?email=${user.email}`
      );
      setTransactions(res.data);
    } catch (error) {
      console.error('Failed to fetch transactions');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const budgetData = {
        ...formData,
        email: user.email,
        amount: Number(formData.amount),
      };

      if (editingBudget) {
        await axios.put(
          `${import.meta.env.VITE_BACKEND_API}/budgets/${editingBudget._id}`,
          budgetData
        );
        toast.success('Budget updated');
      } else {
        await axios.post(
          `${import.meta.env.VITE_BACKEND_API}/budgets`,
          budgetData
        );
        toast.success('Budget created');
      }

      setFormData({
        category: '',
        amount: '',
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
      });
      setEditingBudget(null);
      setShowForm(false);
      fetchBudgets();
    } catch (error) {
      toast.error('Operation failed');
    }
  };

  const handleEdit = (budget) => {
    setEditingBudget(budget);
    setFormData({
      category: budget.category,
      amount: budget.amount,
      month: budget.month,
      year: budget.year,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Delete Budget?',
      text: 'This action cannot be undone',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, delete it',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${import.meta.env.VITE_BACKEND_API}/budgets/${id}`);
        toast.success('Budget deleted');
        fetchBudgets();
      } catch (error) {
        toast.error('Failed to delete budget');
      }
    }
  };

  const calculateSpending = (budget) => {
    const spending = transactions
      .filter(
        (t) =>
          t.type === 'expense' &&
          t.category === budget.category &&
          new Date(t.date).getMonth() + 1 === budget.month &&
          new Date(t.date).getFullYear() === budget.year
      )
      .reduce((sum, t) => sum + t.amount, 0);

    return spending;
  };

  const getMonthName = (month) => {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return months[month - 1];
  };

  return (
    <div
      className="min-h-screen py-8 px-4"
      style={{ backgroundColor: 'var(--bg-color)' }}
    >
      <Helmet>
        <title>Budget Planning - FinTrack</title>
      </Helmet>
      <Toaster />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1
              className="text-2xl sm:text-3xl font-bold flex items-center gap-3"
              style={{ color: 'var(--text-primary)' }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  color: 'white',
                }}
              >
                <FiTarget size={24} />
              </div>
              Budget Planning
            </h1>
            <p className="mt-2" style={{ color: 'var(--text-muted)' }}>
              Set monthly budgets and track your spending
            </p>
          </div>

          <button
            onClick={() => {
              setShowForm(!showForm);
              if (showForm) {
                setEditingBudget(null);
                setFormData({
                  category: '',
                  amount: '',
                  month: new Date().getMonth() + 1,
                  year: new Date().getFullYear(),
                });
              }
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-white cursor-pointer transition-all hover:opacity-90"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            <FiPlus size={18} />
            {showForm ? 'Cancel' : 'Add Budget'}
          </button>
        </div>

        {/* Budget Form */}
        {showForm && (
          <div
            className="card rounded-2xl p-6 mb-6"
            style={{ border: '1px solid var(--border-color)' }}
          >
            <h3
              className="text-lg font-bold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              {editingBudget ? 'Edit Budget' : 'Create Budget'}
            </h3>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Category
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  placeholder="e.g., Food, Transport"
                  required
                  className="w-full px-4 py-3 rounded-xl outline-none"
                  style={{
                    backgroundColor: 'var(--bg-color)',
                    border: '2px solid var(--border-color)',
                    color: 'var(--text-primary)',
                  }}
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Budget Amount
                </label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                  placeholder="0.00"
                  required
                  className="w-full px-4 py-3 rounded-xl outline-none"
                  style={{
                    backgroundColor: 'var(--bg-color)',
                    border: '2px solid var(--border-color)',
                    color: 'var(--text-primary)',
                  }}
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Month
                </label>
                <select
                  value={formData.month}
                  onChange={(e) =>
                    setFormData({ ...formData, month: Number(e.target.value) })
                  }
                  className="w-full px-4 py-3 rounded-xl outline-none cursor-pointer"
                  style={{
                    backgroundColor: 'var(--bg-color)',
                    border: '2px solid var(--border-color)',
                    color: 'var(--text-primary)',
                  }}
                >
                  {[...Array(12)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {getMonthName(i + 1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Year
                </label>
                <input
                  type="number"
                  value={formData.year}
                  onChange={(e) =>
                    setFormData({ ...formData, year: Number(e.target.value) })
                  }
                  min="2020"
                  max="2030"
                  className="w-full px-4 py-3 rounded-xl outline-none"
                  style={{
                    backgroundColor: 'var(--bg-color)',
                    border: '2px solid var(--border-color)',
                    color: 'var(--text-primary)',
                  }}
                />
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-semibold text-white transition-all cursor-pointer hover:opacity-90"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                >
                  {editingBudget ? 'Update Budget' : 'Create Budget'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Budgets List */}
        {budgets.length === 0 ? (
          <div
            className="card rounded-2xl p-12 text-center"
            style={{ border: '1px solid var(--border-color)' }}
          >
            <FiTarget
              size={64}
              className="mx-auto mb-4"
              style={{ color: 'var(--text-muted)' }}
            />
            <h3
              className="text-xl font-semibold mb-2"
              style={{ color: 'var(--text-primary)' }}
            >
              No budgets yet
            </h3>
            <p className="mb-6" style={{ color: 'var(--text-muted)' }}>
              Create your first budget to start tracking your spending
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {budgets.map((budget) => {
              const spending = calculateSpending(budget);
              const percentage = (spending / budget.amount) * 100;
              const isOverBudget = spending > budget.amount;
              const isNearLimit = percentage >= 80 && !isOverBudget;

              return (
                <div
                  key={budget._id}
                  className="card rounded-2xl p-6"
                  style={{ border: '1px solid var(--border-color)' }}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3
                        className="text-lg font-bold capitalize"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {budget.category}
                      </h3>
                      <p
                        className="text-sm"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {getMonthName(budget.month)} {budget.year}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(budget)}
                        className="p-2 rounded-lg transition-all cursor-pointer hover:scale-110"
                        style={{
                          backgroundColor: 'var(--color-primary)',
                          color: 'white',
                        }}
                      >
                        <FiEdit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(budget._id)}
                        className="p-2 rounded-lg transition-all cursor-pointer hover:scale-110"
                        style={{
                          backgroundColor: 'var(--color-danger)',
                          color: 'white',
                        }}
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span style={{ color: 'var(--text-secondary)' }}>
                        ${spending.toFixed(2)} spent
                      </span>
                      <span style={{ color: 'var(--text-secondary)' }}>
                        ${budget.amount.toFixed(2)} budget
                      </span>
                    </div>
                    <div
                      className="w-full h-3 rounded-full overflow-hidden"
                      style={{ backgroundColor: 'var(--border-color)' }}
                    >
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(percentage, 100)}%`,
                          backgroundColor: isOverBudget
                            ? 'var(--color-danger)'
                            : isNearLimit
                              ? 'var(--color-secondary)'
                              : 'var(--color-success)',
                        }}
                      ></div>
                    </div>
                    <p
                      className="text-xs mt-1 text-right"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {percentage.toFixed(1)}% used
                    </p>
                  </div>

                  {/* Status */}
                  {isOverBudget ? (
                    <div
                      className="flex items-center gap-2 p-3 rounded-lg"
                      style={{
                        backgroundColor: 'var(--color-danger)',
                        color: 'white',
                      }}
                    >
                      <FiAlertTriangle size={18} />
                      <span className="text-sm font-medium">
                        Over budget by ${(spending - budget.amount).toFixed(2)}
                      </span>
                    </div>
                  ) : isNearLimit ? (
                    <div
                      className="flex items-center gap-2 p-3 rounded-lg"
                      style={{
                        backgroundColor: 'var(--color-secondary)',
                        color: 'white',
                      }}
                    >
                      <FiAlertTriangle size={18} />
                      <span className="text-sm font-medium">
                        Approaching limit: $
                        {(budget.amount - spending).toFixed(2)} remaining
                      </span>
                    </div>
                  ) : (
                    <div
                      className="flex items-center gap-2 p-3 rounded-lg"
                      style={{
                        backgroundColor: 'var(--color-success)',
                        color: 'white',
                      }}
                    >
                      <FiCheckCircle size={18} />
                      <span className="text-sm font-medium">
                        On track: ${(budget.amount - spending).toFixed(2)}{' '}
                        remaining
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetPlanning;
