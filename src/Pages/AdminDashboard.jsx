import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../Context/AuthContext';
import {
  FiUsers,
  FiTag,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiShield,
  FiUser,
  FiBarChart2,
  FiZap,
} from 'react-icons/fi';
import Swal from 'sweetalert2';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const [tips, setTips] = useState([]);

  // Category form state
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    type: 'both',
    icon: 'FiTag',
  });
  const [editingCategory, setEditingCategory] = useState(null);

  // Tips form state
  const [tipForm, setTipForm] = useState({
    title: '',
    description: '',
    category: 'savings',
    featured: true,
  });
  const [editingTip, setEditingTip] = useState(null);

  useEffect(() => {
    fetchUsers();
    fetchCategories();
    fetchReports();
    fetchTips();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/users/all`
      );
      setUsers(res.data);
    } catch (error) {
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/categories`
      );
      setCategories(res.data);
    } catch (error) {
      toast.error('Failed to fetch categories');
    }
  };

  const fetchReports = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/admin/reports`
      );
      setReports(res.data);
    } catch (error) {
      toast.error('Failed to fetch reports');
    }
  };

  const fetchTips = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/tips`);
      setTips(res.data);
    } catch (error) {
      toast.error('Failed to fetch tips');
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_BACKEND_API}/users/${userId}/role`,
        { role: newRole }
      );
      toast.success('User role updated');
      fetchUsers();
    } catch (error) {
      toast.error('Failed to update role');
    }
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingCategory) {
        await axios.put(
          `${import.meta.env.VITE_BACKEND_API}/categories/${editingCategory._id}`,
          categoryForm
        );
        toast.success('Category updated');
      } else {
        await axios.post(
          `${import.meta.env.VITE_BACKEND_API}/categories`,
          categoryForm
        );
        toast.success('Category created');
      }

      setCategoryForm({ name: '', type: 'both', icon: 'FiTag' });
      setEditingCategory(null);
      fetchCategories();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setCategoryForm({
      name: category.name,
      type: category.type,
      icon: category.icon,
    });
  };

  const handleDeleteCategory = async (id) => {
    const result = await Swal.fire({
      title: 'Delete Category?',
      text: 'This action cannot be undone',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, delete it',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_BACKEND_API}/categories/${id}`
        );
        toast.success('Category deleted');
        fetchCategories();
      } catch (error) {
        toast.error('Failed to delete category');
      }
    }
  };

  const handleTipSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingTip) {
        await axios.put(
          `${import.meta.env.VITE_BACKEND_API}/tips/${editingTip._id}`,
          tipForm
        );
        toast.success('Tip updated');
      } else {
        await axios.post(`${import.meta.env.VITE_BACKEND_API}/tips`, tipForm);
        toast.success('Tip created');
      }

      setTipForm({
        title: '',
        description: '',
        category: 'savings',
        featured: true,
      });
      setEditingTip(null);
      fetchTips();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleEditTip = (tip) => {
    setEditingTip(tip);
    setTipForm({
      title: tip.title,
      description: tip.description,
      category: tip.category,
      featured: tip.featured,
    });
  };

  const handleDeleteTip = async (id) => {
    const result = await Swal.fire({
      title: 'Delete Tip?',
      text: 'This action cannot be undone',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, delete it',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${import.meta.env.VITE_BACKEND_API}/tips/${id}`);
        toast.success('Tip deleted');
        fetchTips();
      } catch (error) {
        toast.error('Failed to delete tip');
      }
    }
  };

  return (
    <div
      className="min-h-screen py-8 px-4"
      style={{ backgroundColor: 'var(--bg-color)' }}
    >
      <Helmet>
        <title>Admin Dashboard - FinTrack</title>
      </Helmet>
      <Toaster />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: 'var(--color-danger)', color: 'white' }}
            >
              <FiShield size={32} />
            </div>
            <div>
              <h1
                className="text-3xl sm:text-4xl font-bold"
                style={{ color: 'var(--text-primary)' }}
              >
                Admin Dashboard
              </h1>
              <p
                className="text-lg mt-1"
                style={{ color: 'var(--text-muted)' }}
              >
                Platform Management & Control
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('users')}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all cursor-pointer"
            style={{
              backgroundColor:
                activeTab === 'users'
                  ? 'var(--color-primary)'
                  : 'var(--bg-card)',
              color: activeTab === 'users' ? 'white' : 'var(--text-secondary)',
              border:
                activeTab === 'users'
                  ? 'none'
                  : '1px solid var(--border-color)',
            }}
          >
            <FiUsers size={18} />
            Users
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all cursor-pointer"
            style={{
              backgroundColor:
                activeTab === 'categories'
                  ? 'var(--color-primary)'
                  : 'var(--bg-card)',
              color:
                activeTab === 'categories' ? 'white' : 'var(--text-secondary)',
              border:
                activeTab === 'categories'
                  ? 'none'
                  : '1px solid var(--border-color)',
            }}
          >
            <FiTag size={18} />
            Categories
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all cursor-pointer"
            style={{
              backgroundColor:
                activeTab === 'reports'
                  ? 'var(--color-primary)'
                  : 'var(--bg-card)',
              color:
                activeTab === 'reports' ? 'white' : 'var(--text-secondary)',
              border:
                activeTab === 'reports'
                  ? 'none'
                  : '1px solid var(--border-color)',
            }}
          >
            <FiBarChart2 size={18} />
            Reports
          </button>
          <button
            onClick={() => setActiveTab('tips')}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all cursor-pointer"
            style={{
              backgroundColor:
                activeTab === 'tips'
                  ? 'var(--color-primary)'
                  : 'var(--bg-card)',
              color: activeTab === 'tips' ? 'white' : 'var(--text-secondary)',
              border:
                activeTab === 'tips' ? 'none' : '1px solid var(--border-color)',
            }}
          >
            <FiZap size={18} />
            Tips
          </button>
        </div>

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div
            className="card rounded-2xl overflow-hidden"
            style={{ border: '1px solid var(--border-color)' }}
          >
            <div
              className="p-6"
              style={{ borderBottom: '1px solid var(--border-color)' }}
            >
              <h3
                className="text-lg font-bold"
                style={{ color: 'var(--text-primary)' }}
              >
                User Management
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr
                    style={{
                      backgroundColor: 'var(--bg-color)',
                      borderBottom: '1px solid var(--border-color)',
                    }}
                  >
                    <th
                      className="text-left px-6 py-4 font-semibold text-sm"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      User
                    </th>
                    <th
                      className="text-left px-6 py-4 font-semibold text-sm"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      Email
                    </th>
                    <th
                      className="text-left px-6 py-4 font-semibold text-sm"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      Role
                    </th>
                    <th
                      className="text-left px-6 py-4 font-semibold text-sm"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, index) => (
                    <tr
                      key={u._id}
                      style={{
                        borderBottom:
                          index !== users.length - 1
                            ? '1px solid var(--border-color)'
                            : 'none',
                      }}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {u.imgUrl ? (
                            <img
                              src={u.imgUrl}
                              alt={u.firstName}
                              className="w-10 h-10 rounded-full"
                            />
                          ) : (
                            <div
                              className="w-10 h-10 rounded-full flex items-center justify-center"
                              style={{
                                backgroundColor: 'var(--color-primary)',
                                color: 'white',
                              }}
                            >
                              <FiUser />
                            </div>
                          )}
                          <span
                            className="font-medium"
                            style={{ color: 'var(--text-primary)' }}
                          >
                            {u.firstName}
                          </span>
                        </div>
                      </td>
                      <td
                        className="px-6 py-4"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {u.email}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-semibold"
                          style={{
                            backgroundColor:
                              u.role === 'admin'
                                ? 'var(--color-danger)'
                                : 'var(--color-success)',
                            color: 'white',
                          }}
                        >
                          {u.role || 'user'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={u.role || 'user'}
                          onChange={(e) =>
                            handleRoleChange(u._id, e.target.value)
                          }
                          className="px-3 py-2 rounded-lg cursor-pointer outline-none"
                          style={{
                            backgroundColor: 'var(--bg-color)',
                            border: '1px solid var(--border-color)',
                            color: 'var(--text-primary)',
                          }}
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Categories Tab */}
        {activeTab === 'categories' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Category Form */}
            <div
              className="card rounded-2xl p-6"
              style={{ border: '1px solid var(--border-color)' }}
            >
              <h3
                className="text-lg font-bold mb-4 flex items-center gap-2"
                style={{ color: 'var(--text-primary)' }}
              >
                <FiPlus style={{ color: 'var(--color-primary)' }} />
                {editingCategory ? 'Edit Category' : 'Add Category'}
              </h3>

              <form onSubmit={handleCategorySubmit} className="space-y-4">
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Category Name
                  </label>
                  <input
                    type="text"
                    value={categoryForm.name}
                    onChange={(e) =>
                      setCategoryForm({ ...categoryForm, name: e.target.value })
                    }
                    placeholder="e.g., Entertainment"
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
                    Type
                  </label>
                  <select
                    value={categoryForm.type}
                    onChange={(e) =>
                      setCategoryForm({ ...categoryForm, type: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl outline-none cursor-pointer"
                    style={{
                      backgroundColor: 'var(--bg-color)',
                      border: '2px solid var(--border-color)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    <option value="both">Both</option>
                    <option value="income">Income Only</option>
                    <option value="expense">Expense Only</option>
                  </select>
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl font-semibold text-white transition-all cursor-pointer hover:opacity-90"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  >
                    {editingCategory ? 'Update' : 'Create'}
                  </button>
                  {editingCategory && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingCategory(null);
                        setCategoryForm({
                          name: '',
                          type: 'both',
                          icon: 'FiTag',
                        });
                      }}
                      className="px-6 py-3 rounded-xl font-semibold transition-all cursor-pointer"
                      style={{
                        backgroundColor: 'var(--bg-color)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Categories List */}
            <div
              className="card rounded-2xl overflow-hidden"
              style={{ border: '1px solid var(--border-color)' }}
            >
              <div
                className="p-6"
                style={{ borderBottom: '1px solid var(--border-color)' }}
              >
                <h3
                  className="text-lg font-bold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  All Categories ({categories.length})
                </h3>
              </div>

              <div
                className="divide-y max-h-[500px] overflow-y-auto"
                style={{ borderColor: 'var(--border-color)' }}
              >
                {categories.map((cat) => (
                  <div
                    key={cat._id}
                    className="p-4 flex items-center justify-between"
                  >
                    <div>
                      <h4
                        className="font-semibold capitalize"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {cat.name}
                      </h4>
                      <p
                        className="text-sm"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        Type: {cat.type}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditCategory(cat)}
                        className="p-2 rounded-lg transition-all cursor-pointer hover:scale-110"
                        style={{
                          backgroundColor: 'var(--color-primary)',
                          color: 'white',
                        }}
                      >
                        <FiEdit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(cat._id)}
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
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div
            className="card rounded-2xl overflow-hidden"
            style={{ border: '1px solid var(--border-color)' }}
          >
            <div
              className="p-6"
              style={{ borderBottom: '1px solid var(--border-color)' }}
            >
              <h3
                className="text-lg font-bold"
                style={{ color: 'var(--text-primary)' }}
              >
                Financial Reports Monitoring
              </h3>
              <p
                className="text-sm mt-1"
                style={{ color: 'var(--text-muted)' }}
              >
                Overview of platform-wide financial activity
              </p>
            </div>

            <div className="p-6">
              {reports.length === 0 ? (
                <div className="text-center py-12">
                  <FiBarChart2
                    size={48}
                    className="mx-auto mb-4"
                    style={{ color: 'var(--text-muted)' }}
                  />
                  <p style={{ color: 'var(--text-muted)' }}>
                    No reports available yet
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {reports.map((report, index) => (
                    <div
                      key={index}
                      className="p-6 rounded-xl"
                      style={{
                        backgroundColor: 'var(--bg-color)',
                        border: '1px solid var(--border-color)',
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4
                          className="font-semibold"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          {report.title}
                        </h4>
                        <span
                          className="text-2xl font-bold"
                          style={{ color: 'var(--color-primary)' }}
                        >
                          {report.value}
                        </span>
                      </div>
                      <p
                        className="text-sm"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {report.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tips Tab */}
        {activeTab === 'tips' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Tips Form */}
            <div
              className="card rounded-2xl p-6"
              style={{ border: '1px solid var(--border-color)' }}
            >
              <h3
                className="text-lg font-bold mb-4 flex items-center gap-2"
                style={{ color: 'var(--text-primary)' }}
              >
                <FiPlus style={{ color: 'var(--color-primary)' }} />
                {editingTip ? 'Edit Financial Tip' : 'Add Financial Tip'}
              </h3>

              <form onSubmit={handleTipSubmit} className="space-y-4">
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    value={tipForm.title}
                    onChange={(e) =>
                      setTipForm({ ...tipForm, title: e.target.value })
                    }
                    placeholder="e.g., Save 20% of your income"
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
                    Description
                  </label>
                  <textarea
                    value={tipForm.description}
                    onChange={(e) =>
                      setTipForm({ ...tipForm, description: e.target.value })
                    }
                    placeholder="Detailed tip description..."
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl outline-none resize-none"
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
                    Category
                  </label>
                  <select
                    value={tipForm.category}
                    onChange={(e) =>
                      setTipForm({ ...tipForm, category: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl outline-none cursor-pointer"
                    style={{
                      backgroundColor: 'var(--bg-color)',
                      border: '2px solid var(--border-color)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    <option value="savings">Savings</option>
                    <option value="budgeting">Budgeting</option>
                    <option value="investing">Investing</option>
                    <option value="debt">Debt Management</option>
                    <option value="general">General</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={tipForm.featured}
                    onChange={(e) =>
                      setTipForm({ ...tipForm, featured: e.target.checked })
                    }
                    className="w-4 h-4 cursor-pointer"
                  />
                  <label
                    htmlFor="featured"
                    className="text-sm font-medium cursor-pointer"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Featured Tip
                  </label>
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl font-semibold text-white transition-all cursor-pointer hover:opacity-90"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  >
                    {editingTip ? 'Update' : 'Create'}
                  </button>
                  {editingTip && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingTip(null);
                        setTipForm({
                          title: '',
                          description: '',
                          category: 'savings',
                          featured: true,
                        });
                      }}
                      className="px-6 py-3 rounded-xl font-semibold transition-all cursor-pointer"
                      style={{
                        backgroundColor: 'var(--bg-color)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Tips List */}
            <div
              className="card rounded-2xl overflow-hidden"
              style={{ border: '1px solid var(--border-color)' }}
            >
              <div
                className="p-6"
                style={{ borderBottom: '1px solid var(--border-color)' }}
              >
                <h3
                  className="text-lg font-bold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  All Financial Tips ({tips.length})
                </h3>
              </div>

              <div
                className="divide-y max-h-[600px] overflow-y-auto"
                style={{ borderColor: 'var(--border-color)' }}
              >
                {tips.length === 0 ? (
                  <div className="text-center py-12">
                    <FiZap
                      size={48}
                      className="mx-auto mb-4"
                      style={{ color: 'var(--text-muted)' }}
                    />
                    <p style={{ color: 'var(--text-muted)' }}>
                      No tips created yet
                    </p>
                  </div>
                ) : (
                  tips.map((tip) => (
                    <div key={tip._id} className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4
                              className="font-semibold"
                              style={{ color: 'var(--text-primary)' }}
                            >
                              {tip.title}
                            </h4>
                            {tip.featured && (
                              <span
                                className="px-2 py-0.5 rounded text-xs font-semibold"
                                style={{
                                  backgroundColor: 'var(--color-warning)',
                                  color: 'white',
                                }}
                              >
                                Featured
                              </span>
                            )}
                          </div>
                          <p
                            className="text-sm mb-2"
                            style={{ color: 'var(--text-secondary)' }}
                          >
                            {tip.description}
                          </p>
                          <span
                            className="text-xs px-2 py-1 rounded capitalize"
                            style={{
                              backgroundColor: 'var(--bg-color)',
                              color: 'var(--text-muted)',
                            }}
                          >
                            {tip.category}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditTip(tip)}
                            className="p-2 rounded-lg transition-all cursor-pointer hover:scale-110"
                            style={{
                              backgroundColor: 'var(--color-primary)',
                              color: 'white',
                            }}
                          >
                            <FiEdit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteTip(tip._id)}
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
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
