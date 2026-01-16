import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../Context/AuthContext';
import { 
  FiUser, 
  FiMail, 
  FiEdit2, 
  FiLogOut, 
  FiCamera, 
  FiX,
  FiSave,
  FiCalendar,
  FiShield,
  FiTrendingUp,
  FiTrendingDown,
  FiDollarSign
} from 'react-icons/fi';

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

const MyProfile = () => {
  const { user, singout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    imgUrl: '',
    password: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stats, setStats] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });

  const fetchUser = async () => {
    if (!user?.email) return;
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/users/by-email?email=${user.email}`
      );
      const userData = res.data;
      setFormData({
        firstName: userData.firstName || '',
        email: userData.email || '',
        imgUrl: userData.imgUrl || '',
        password: '',
      });
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch user info');
    }
  };

  const fetchStats = async () => {
    if (!user?.email) return;
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/transactions/overview?email=${user.email}`
      );
      setStats(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchStats();
  }, [user?.email]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to update your profile?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'No, cancel',
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_API}/users`,
          formData
        );
        await Swal.fire({
          title: 'Success!',
          text: res.data.message,
          icon: 'success',
          confirmButtonText: 'OK',
        });

        setIsModalOpen(false);
        fetchUser();
      } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || 'Update failed');
      }
    } else {
      toast('Update canceled');
    }
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0D9488',
      cancelButtonColor: '#EF4444',
      confirmButtonText: 'Yes, log out',
    }).then((res) => {
      if (res.isConfirmed) {
        singout()
          .then(() => {
            toast.success('Logged Out!');
            navigate('/');
          })
          .catch((error) => {
            console.error('Logout error:', error);
            toast.error('Failed to logout');
          });
      }
    });
  };

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-color)' }}>
      <div className="text-center" style={{ color: 'var(--text-muted)' }}>Loading...</div>
    </div>
  );

  return (
    <div className="min-h-screen py-8 px-4" style={{ backgroundColor: 'var(--bg-color)' }}>
      <Helmet>
        <title>My Profile - Money Manager</title>
      </Helmet>
      <Toaster />
      
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div 
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
            style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}
          >
            <FiUser size={28} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
            My Profile
          </h1>
          <p className="mt-2" style={{ color: 'var(--text-muted)' }}>
            Manage your account settings
          </p>
        </div>

        {/* Profile Card */}
        <div 
          className="card rounded-3xl shadow-xl overflow-hidden"
          style={{ border: '1px solid var(--border-color)' }}
        >
          {/* Profile Header */}
          <div 
            className="p-8 text-center relative"
            style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}
          >
            {/* Profile Image */}
            <div className="relative inline-block">
              {formData.imgUrl || user?.photoURL ? (
                <img
                  src={formData.imgUrl || user?.photoURL}
                  alt="Profile"
                  className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
                />
              ) : (
                <div 
                  className="w-28 h-28 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-4xl font-bold"
                  style={{ backgroundColor: 'var(--bg-card)', color: 'var(--color-primary)' }}
                >
                  {formData.firstName?.charAt(0) || user?.displayName?.charAt(0) || 'U'}
                </div>
              )}
              <button
                onClick={() => setIsModalOpen(true)}
                className="absolute bottom-0 right-0 w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg cursor-pointer transition-all hover:scale-110"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                <FiCamera size={18} />
              </button>
            </div>

            {/* Name */}
            <h2 className="text-2xl font-bold text-white mt-4">
              {formData.firstName || user?.displayName || 'User'}
            </h2>
            <p className="text-white/80 text-sm mt-1">
              {formData.email || user?.email}
            </p>
          </div>

          {/* Profile Details */}
          <div className="p-6 sm:p-8 space-y-4">
            {/* Email */}
            <div 
              className="flex items-center gap-4 p-4 rounded-xl"
              style={{ backgroundColor: 'var(--bg-color)' }}
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}
              >
                <FiMail size={20} />
              </div>
              <div>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Email Address</p>
                <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {formData.email || user?.email}
                </p>
              </div>
            </div>

            {/* Name */}
            <div 
              className="flex items-center gap-4 p-4 rounded-xl"
              style={{ backgroundColor: 'var(--bg-color)' }}
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-secondary)', color: 'white' }}
              >
                <FiUser size={20} />
              </div>
              <div>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Full Name</p>
                <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {formData.firstName || user?.displayName || 'Not set'}
                </p>
              </div>
            </div>

            {/* Account Created */}
            {user?.metadata?.creationTime && (
              <div 
                className="flex items-center gap-4 p-4 rounded-xl"
                style={{ backgroundColor: 'var(--bg-color)' }}
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: 'var(--color-success)', color: 'white' }}
                >
                  <FiCalendar size={20} />
                </div>
                <div>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Member Since</p>
                  <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {new Date(user.metadata.creationTime).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            )}

            {/* Account Status */}
            <div 
              className="flex items-center gap-4 p-4 rounded-xl"
              style={{ backgroundColor: 'var(--bg-color)' }}
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-success)', color: 'white' }}
              >
                <FiShield size={20} />
              </div>
              <div>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Account Status</p>
                <p className="font-semibold" style={{ color: 'var(--color-success)' }}>
                  Active
                </p>
              </div>
            </div>
          </div>

          {/* Financial Stats */}
          <div 
            className="p-6 sm:p-8"
            style={{ borderTop: '1px solid var(--border-color)' }}
          >
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <FiDollarSign style={{ color: 'var(--color-primary)' }} />
              Financial Overview
            </h3>
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
                  <p className="text-xl sm:text-2xl font-bold truncate">${formatAmount(stats.totalIncome)}</p>
                  <AmountBreakdown amount={stats.totalIncome} />
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
                  <p className="text-xl sm:text-2xl font-bold truncate">${formatAmount(stats.totalExpense)}</p>
                  <AmountBreakdown amount={stats.totalExpense} />
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
                  <p className="text-xl sm:text-2xl font-bold truncate">${formatAmount(stats.balance)}</p>
                  <AmountBreakdown amount={stats.balance} />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div 
            className="p-6 sm:p-8 flex flex-col sm:flex-row gap-3"
            style={{ borderTop: '1px solid var(--border-color)' }}
          >
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-white transition-all cursor-pointer hover:opacity-90"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              <FiEdit2 size={18} />
              Edit Profile
            </button>
            <button
              onClick={handleLogout}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-white transition-all cursor-pointer hover:opacity-90"
              style={{ backgroundColor: 'var(--color-danger)' }}
            >
              <FiLogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Update Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="card w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
            style={{ border: '1px solid var(--border-color)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div 
              className="p-6 flex items-center justify-between"
              style={{ borderBottom: '1px solid var(--border-color)' }}
            >
              <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                Update Profile
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-lg cursor-pointer transition-all hover:scale-110"
                style={{ color: 'var(--text-muted)' }}
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                  <FiUser className="inline mr-2" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl outline-none transition-all"
                  style={{ 
                    backgroundColor: 'var(--bg-color)',
                    border: '2px solid var(--border-color)',
                    color: 'var(--text-primary)'
                  }}
                  placeholder="Enter your name"
                />
              </div>

              {/* Profile Image URL */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                  <FiCamera className="inline mr-2" />
                  Profile Image URL
                </label>
                <input
                  type="text"
                  name="imgUrl"
                  value={formData.imgUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl outline-none transition-all"
                  style={{ 
                    backgroundColor: 'var(--bg-color)',
                    border: '2px solid var(--border-color)',
                    color: 'var(--text-primary)'
                  }}
                  placeholder="Enter image URL"
                />
              </div>

              {/* Preview */}
              {formData.imgUrl && (
                <div className="text-center">
                  <p className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>Preview</p>
                  <img
                    src={formData.imgUrl}
                    alt="Preview"
                    className="w-20 h-20 rounded-full mx-auto object-cover border-2"
                    style={{ borderColor: 'var(--color-primary)' }}
                    onError={(e) => e.target.style.display = 'none'}
                  />
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div 
              className="p-6 flex gap-3"
              style={{ borderTop: '1px solid var(--border-color)' }}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-3 rounded-xl font-semibold transition-all cursor-pointer border-2"
                style={{ 
                  borderColor: 'var(--border-color)', 
                  color: 'var(--text-primary)',
                  backgroundColor: 'transparent'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-white transition-all cursor-pointer hover:opacity-90"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                <FiSave size={18} />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
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

export default MyProfile;
