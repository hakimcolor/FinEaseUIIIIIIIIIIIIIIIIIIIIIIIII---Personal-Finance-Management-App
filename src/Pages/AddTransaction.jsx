
import React, { useContext, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../Context/AuthContext';

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
    } catch (error) {
      toast.error('Failed to add transaction');
    }
  };

  return (
    <div
      className="max-w-xl mx-auto p-6  mb-10 rounded-2xl 
    bg-gradient-to-br from-blue-50 via-white to-indigo-50
    dark:from-slate-900 dark:via-slate-800 dark:to-slate-900
    shadow-xl border border-slate-200 dark:border-slate-700"
    >
      <Toaster />

      <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-100">
        Add Transaction
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border 
          bg-white dark:bg-slate-900 
          text-slate-800 dark:text-slate-100
          border-slate-300 dark:border-slate-600
          focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg border 
          bg-white dark:bg-slate-900
          text-slate-800 dark:text-slate-100
          border-slate-300 dark:border-slate-600
          focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="">Select Category</option>
          <option value="home">Home</option>
          <option value="food">Food</option>
          <option value="transport">Transport</option>
          <option value="shopping">Shopping</option>
          <option value="salary">Salary</option>
        </select>

        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Amount"
          required
          className="w-full p-3 rounded-lg border 
          bg-white dark:bg-slate-900
          text-slate-800 dark:text-slate-100
          border-slate-300 dark:border-slate-600
          focus:ring-2 focus:ring-green-500 focus:outline-none"
        />

        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-3 rounded-lg border 
          bg-white dark:bg-slate-900
          text-slate-800 dark:text-slate-100
          border-slate-300 dark:border-slate-600
          focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg border 
          bg-white dark:bg-slate-900
          text-slate-800 dark:text-slate-100
          border-slate-300 dark:border-slate-600
          focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <input
          type="email"
          value={user?.email}
          readOnly
          className="w-full p-3 rounded-lg border 
          bg-slate-100 dark:bg-slate-800
          text-slate-600 dark:text-slate-300
          border-slate-300 dark:border-slate-600"
        />

        <input
          type="text"
          value={user?.displayName}
          readOnly
          className="w-full p-3 rounded-lg border 
          bg-slate-100 dark:bg-slate-800
          text-slate-600 dark:text-slate-300
          border-slate-300 dark:border-slate-600"
        />

        <button
          type="submit"
          className="w-full py-3 rounded-xl font-semibold text-white
          bg-gradient-to-r from-blue-600 to-indigo-600
          hover:from-blue-700 hover:to-indigo-700
          transition duration-200 shadow-lg"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default AddTransaction;
