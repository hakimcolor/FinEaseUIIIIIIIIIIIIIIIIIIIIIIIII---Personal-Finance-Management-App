import React, { useContext, useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiLogOut,
  FiMenu,
  FiX,
  FiSun,
  FiMoon,
  FiChevronDown,
  FiHome,
  FiPlusCircle,
  FiList,
  FiPieChart,
  FiUser,
} from 'react-icons/fi';
import logo from '../assets/Logo.png';
import { AuthContext } from '../Context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';

const Header = () => {
  const { user, singout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      darkMode ? 'dark' : 'light'
    );
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = [
    {
      name: 'Home',
      path: '/',
      icon: <FiHome size={18} />,
      always: true,
      shortName: 'Home',
    },
    {
      name: 'About',
      path: '/about',
      icon: <FiUser size={18} />,
      public: true,
      shortName: 'About',
    },
    {
      name: 'Features',
      path: '/features',
      icon: <FiPieChart size={18} />,
      public: true,
      shortName: 'Features',
    },
    {
      name: 'Contact',
      path: '/contact',
      icon: <FiList size={18} />,
      always: true,
      shortName: 'Contact',
    },
    {
      name: 'Add Transaction',
      path: '/add-transaction',
      private: true,
      icon: <FiPlusCircle size={18} />,
      shortName: 'Add',
    },
    {
      name: 'My Transactions',
      path: '/my-transactions',
      private: true,
      icon: <FiList size={18} />,
      shortName: 'Transactions',
    },
    {
      name: 'Reports',
      path: '/reports',
      private: true,
      icon: <FiPieChart size={18} />,
      shortName: 'Reports',
    },
    {
      name: 'My Profile',
      path: '/myprofile',
      private: true,
      icon: <FiUser size={18} />,
      shortName: 'Profile',
    },
  ];

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#16a34a',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out',
    }).then((res) => {
      if (res.isConfirmed) {
        singout()
          .then(() => {
            toast.success('Logged Out!');
            navigate('/');
            setIsOpen(false);
            setDropdown(false);
          })
          .catch((error) => {
            console.error('Logout error:', error);
            toast.error('Failed to logout');
          });
      }
    });
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="w-full fixed top-0 left-0 z-50 shadow-lg"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto flex items-center justify-between py-2.5 px-3 lg:py-3 lg:px-6">
        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-2 cursor-pointer shrink-0"
        >
          <motion.img
            src={logo}
            alt="logo"
            className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full"
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300 }}
          />
          <motion.span
            className="text-base sm:text-lg lg:text-xl font-bold hidden sm:block text-white"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="hidden md:inline">Money Manager</span>
            <span className="md:hidden">Money</span>
          </motion.span>
        </NavLink>

        {/* Desktop Menu - Shows on lg (1024px+) */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-5">
          {navLinks.map((link, index) =>
            link.always || (link.public && !user) || (link.private && user) ? (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 text-sm font-medium transition cursor-pointer whitespace-nowrap ${
                      isActive ? 'font-bold' : 'hover:opacity-80'
                    }`
                  }
                  style={({ isActive }) => ({
                    color: isActive
                      ? 'var(--color-primary)'
                      : 'rgba(255, 255, 255, 0.9)',
                    borderBottom: isActive
                      ? '2px solid var(--color-primary)'
                      : 'none',
                    paddingBottom: '4px',
                  })}
                >
                  <motion.span
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: 'spring' }}
                  >
                    {link.icon}
                  </motion.span>
                  <span className="hidden xl:inline">{link.name}</span>
                  <span className="xl:hidden">
                    {link.shortName || link.name}
                  </span>
                </NavLink>
              </motion.div>
            ) : null
          )}

          {/* Dark Mode Toggle */}
          <motion.button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full cursor-pointer border transition-all duration-300"
            style={{
              borderColor: 'var(--color-primary)',
              color: 'var(--color-primary)',
            }}
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
          </motion.button>

          {/* User/Profile Section */}
          {!user ? (
            <div className="flex gap-2 xl:gap-3">
              <NavLink to="/signin">
                <button
                  className="px-3 xl:px-4 py-2 border font-semibold rounded-lg cursor-pointer transition text-sm"
                  style={{
                    borderColor: 'var(--color-primary)',
                    color: 'var(--color-primary)',
                  }}
                >
                  Login
                </button>
              </NavLink>
              <NavLink to="/signup">
                <button
                  className="px-3 xl:px-4 py-2 text-white font-semibold rounded-lg cursor-pointer transition text-sm"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                >
                  Sign Up
                </button>
              </NavLink>
            </div>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setDropdown(!dropdown)}
              >
                <img
                  src={user.photoURL}
                  alt="user"
                  className="w-10 h-10 rounded-full border-2"
                  style={{ borderColor: 'var(--color-primary)' }}
                />
                <FiChevronDown
                  size={18}
                  style={{ color: 'var(--color-primary)' }}
                />
              </div>

              <AnimatePresence>
                {dropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className="absolute right-0 mt-3 w-56 shadow-lg rounded-xl p-4 border z-50"
                    style={{
                      backgroundColor: 'var(--bg-card)',
                      borderColor: 'var(--border-color)',
                      backdropFilter: 'blur(20px)',
                    }}
                  >
                    <p
                      className="font-semibold"
                      style={{ color: 'var(--color-primary)' }}
                    >
                      {user.displayName}
                    </p>
                    <p
                      className="text-sm"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {user.email}
                    </p>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 mt-4 px-4 py-2 text-white rounded-lg cursor-pointer transition hover:opacity-90"
                      style={{ backgroundColor: 'var(--color-danger)' }}
                    >
                      <FiLogOut /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </nav>

        {/* Tablet Menu - Shows on md (768px - 1023px) */}
        <nav className="hidden md:flex lg:hidden items-center gap-1.5">
          {navLinks.map((link) =>
            link.always || (link.public && !user) || (link.private && user) ? (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center justify-center p-2 rounded-lg transition cursor-pointer ${
                    isActive ? 'font-bold' : 'hover:opacity-80'
                  }`
                }
                style={({ isActive }) => ({
                  color: isActive ? 'white' : 'rgba(255, 255, 255, 0.9)',
                  backgroundColor: isActive
                    ? 'var(--color-primary)'
                    : 'transparent',
                })}
                title={link.name}
              >
                {link.icon}
              </NavLink>
            ) : null
          )}

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg cursor-pointer transition-all duration-300"
            style={{ color: 'var(--color-primary)' }}
            title={darkMode ? 'Light Mode' : 'Dark Mode'}
          >
            {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          {/* User Section - Tablet */}
          {!user ? (
            <div className="flex gap-2">
              <NavLink to="/signin">
                <button
                  className="px-3 py-2 border font-semibold rounded-lg cursor-pointer transition text-sm"
                  style={{
                    borderColor: 'var(--color-primary)',
                    color: 'var(--color-primary)',
                  }}
                >
                  Login
                </button>
              </NavLink>
              <NavLink to="/signup">
                <button
                  className="px-3 py-2 text-white font-semibold rounded-lg cursor-pointer transition text-sm"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                >
                  Sign Up
                </button>
              </NavLink>
            </div>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <div
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => setDropdown(!dropdown)}
              >
                <img
                  src={user.photoURL}
                  alt="user"
                  className="w-9 h-9 rounded-full border-2"
                  style={{ borderColor: 'var(--color-primary)' }}
                />
                <FiChevronDown
                  size={16}
                  style={{ color: 'var(--color-primary)' }}
                />
              </div>

              <AnimatePresence>
                {dropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className="absolute right-0 mt-3 w-52 shadow-lg rounded-xl p-4 border z-50"
                    style={{
                      backgroundColor: 'var(--bg-card)',
                      borderColor: 'var(--border-color)',
                    }}
                  >
                    <p
                      className="font-semibold text-sm"
                      style={{ color: 'var(--color-primary)' }}
                    >
                      {user.displayName}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {user.email}
                    </p>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 mt-3 px-3 py-2 text-white rounded-lg cursor-pointer transition text-sm hover:opacity-90"
                      style={{ backgroundColor: 'var(--color-danger)' }}
                    >
                      <FiLogOut size={16} /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button - Shows on < md (768px) */}
        <div className="flex md:hidden items-center gap-3">
          {/* Dark Mode Toggle - Mobile */}
          <motion.button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full cursor-pointer"
            style={{ color: 'var(--color-primary)' }}
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
          >
            {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </motion.button>

          <motion.button
            className="text-2xl cursor-pointer p-1"
            style={{ color: 'var(--color-primary)' }}
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FiX />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FiMenu />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="md:hidden shadow-lg p-5 space-y-3 border-t overflow-hidden"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.95)',
              borderColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
            }}
          >
            {/* User Info - Mobile */}
            {user && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-3 pb-4 mb-2"
                style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}
              >
                <motion.img
                  src={user.photoURL}
                  alt="user"
                  className="w-12 h-12 rounded-full border-2"
                  style={{ borderColor: 'var(--color-primary)' }}
                  whileHover={{ scale: 1.1 }}
                />
                <div>
                  <p
                    className="font-semibold"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    {user.displayName}
                  </p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </div>
              </motion.div>
            )}

            {/* Nav Links - Mobile */}
            {navLinks.map((link, index) =>
              link.always ||
              (link.public && !user) ||
              (link.private && user) ? (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <NavLink
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 text-base font-medium py-3 px-4 rounded-xl transition-all ${
                        isActive ? 'text-white' : 'text-gray-200'
                      }`
                    }
                    style={({ isActive }) => ({
                      backgroundColor: isActive
                        ? 'var(--color-primary)'
                        : 'transparent',
                    })}
                  >
                    <motion.span
                      style={{ color: 'inherit' }}
                      whileHover={{ scale: 1.2, rotate: 10 }}
                    >
                      {link.icon}
                    </motion.span>
                    {link.name}
                  </NavLink>
                </motion.div>
              ) : null
            )}

            {/* Auth Buttons - Mobile */}
            {!user ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-3 pt-4"
                style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}
              >
                <NavLink
                  to="/signin"
                  onClick={() => setIsOpen(false)}
                  className="block"
                >
                  <motion.button
                    className="w-full py-3 border rounded-xl font-bold transition-all"
                    style={{
                      borderColor: 'var(--color-primary)',
                      color: 'var(--color-primary)',
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Login
                  </motion.button>
                </NavLink>
                <NavLink
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="block"
                >
                  <motion.button
                    className="w-full py-3 text-white rounded-xl font-bold transition-all"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Sign Up
                  </motion.button>
                </NavLink>
              </motion.div>
            ) : (
              <button
                onClick={handleLogout}
                className="w-full py-3 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 mt-2 hover:opacity-90"
                style={{ backgroundColor: 'var(--color-danger)' }}
              >
                <FiLogOut /> Logout
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
