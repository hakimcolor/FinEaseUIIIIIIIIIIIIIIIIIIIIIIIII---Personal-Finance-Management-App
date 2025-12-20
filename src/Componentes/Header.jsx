import React, { useContext, useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  FiLogOut,
  FiMenu,
  FiX,
  FiSun,
  FiMoon,
  FiChevronDown,
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

  // Dark Mode Setup
  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      darkMode ? 'dark' : 'light'
    );
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Add Transaction', path: '/add-transaction', private: true },
    { name: 'My Transactions', path: '/my-transactions', private: true },
    { name: 'Reports', path: '/reports', private: true },
    { name: 'My Profile', path: '/myprofile', private: true },
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
        singout();
        toast.success('Logged Out!');
        navigate('/');
      }
    });
  };

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-white dark:bg-[#0D1B1E] shadow-lg backdrop-blur-sm">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-5">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 cursor-pointer">
          <img src={logo} alt="logo" className="w-12 h-12 rounded-full" />
          <span className="text-xl font-bold text-green-600 dark:text-green-400">
            Money Manager
          </span>
        </NavLink>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) =>
            !link.private || (link.private && user) ? (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-lg font-medium transition cursor-pointer ${
                    isActive
                      ? 'text-green-500 font-bold underline'
                      : 'text-black dark:text-white hover:text-green-500'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ) : null
          )}

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full cursor-pointer border border-[#00A86B] text-[#00A86B] dark:border-[#39F9C0] dark:text-[#39F9C0] hover:bg-[#00A86B] hover:text-white dark:hover:bg-[#39F9C0] transition-all duration-300"
          >
            {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>

          {/* User/Profile Section */}
          {!user ? (
            <div className="flex gap-4">
              <NavLink to="/signin">
                <button className="px-4 py-2 border border-green-600 text-green-600 font-semibold rounded-lg hover:bg-green-600 hover:text-white cursor-pointer transition">
                  Login
                </button>
              </NavLink>

              <NavLink to="/signup">
                <button className="px-4 py-2 border border-green-600 text-green-600 font-semibold rounded-lg hover:bg-green-600 hover:text-white cursor-pointer transition">
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
                  className="w-12 h-12 rounded-full border-2 border-green-600"
                />
                <FiChevronDown size={20} className="text-green-500" />
              </div>

              {/* Dropdown */}
              {dropdown && (
                <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-[#132729] shadow-lg rounded-xl p-4 border dark:border-gray-700 animate__animated animate__fadeIn">
                  <p className="font-semibold text-green-600">
                    {user.displayName}
                  </p>
                  <p className="text-sm text-gray-500">{user.email}</p>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer transition"
                  >
                    <FiLogOut /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl cursor-pointer text-green-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0D1B1E] shadow-lg p-6 space-y-6 animate__animated animate__fadeInDown">
          {navLinks.map((link) =>
            !link.private || (link.private && user) ? (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block text-xl font-semibold text-white hover:text-green-400 py-2 transition-all"
              >
                {link.name}
              </NavLink>
            ) : null
          )}

          {/* Login/Signup Mobile */}
          {!user ? (
            <>
              <NavLink to="/signin">
                <button className="w-full py-3 border border-green-600 text-white rounded-lg font-bold hover:bg-green-600 hover:text-white transition-all">
                  Login
                </button>
              </NavLink>

              <NavLink to="/signup">
                <button className="w-full py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-all">
                  Sign Up
                </button>
              </NavLink>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="w-full py-3 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-all"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
