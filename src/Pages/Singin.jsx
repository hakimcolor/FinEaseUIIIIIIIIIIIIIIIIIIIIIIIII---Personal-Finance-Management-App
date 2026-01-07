import { auth } from '../Firebase/Firebase.confige';
import { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import {
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from 'firebase/auth';
import toast, { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff, FiLogIn, FiDollarSign } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';

const provider = new GoogleAuthProvider();

const SignIn = () => {
  const { singinuser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [passcode, setPasscode] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');

  const handleToggle = () => setShow(!show);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    singinuser(email, passcode)
      .then(() => {
        setEmail('');
        setPasscode('');
        toast.success('Sign in successful!', { duration: 1000 });
        navigate('/');
      })
      .catch((err) => {
        setError(err.message);
        toast.error(err.message, { duration: 2000 });
      });
  };

  const handleGoogleLogin = () => {
    setError('');

    signInWithPopup(auth, provider)
      .then(() => {
        setEmail('');
        setPasscode('');
        toast.success('Sign in successful!', { duration: 2000 });
        navigate('/');
      })
      .catch((err) => {
        setError(err.message);
        toast.error(err.message, { duration: 2000 });
      });
  };

  const handleForgotPassword = () => {
    if (!email) {
      toast.error('Please enter your email first!', { duration: 2000 });
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success('Password reset email sent! Check your Gmail inbox.', {
          duration: 3000,
        });
      })
      .catch((err) => {
        toast.error(err.message, { duration: 2000 });
      });
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-color)' }}
    >
      <Helmet>
        <title>SignIn | Money Manager</title>
      </Helmet>
      <Toaster />

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/4 -left-20 w-72 h-72 rounded-full opacity-20"
          style={{ backgroundColor: 'var(--color-primary)', filter: 'blur(80px)' }}
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full opacity-15"
          style={{ backgroundColor: 'var(--color-secondary)', filter: 'blur(100px)' }}
          animate={{ scale: [1.2, 1, 1.2], y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: `${15 + i * 18}%`, top: `${20 + (i % 3) * 25}%` }}
            animate={{ y: [0, -20, 0], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
          >
            <FiDollarSign size={30 + i * 5} style={{ color: 'var(--color-primary)' }} />
          </motion.div>
        ))}
      </div>

      {/* Main Card */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div 
          className="card rounded-3xl p-8 sm:p-10 shadow-2xl"
          style={{ border: '1px solid var(--border-color)' }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: 'var(--color-primary)' }}
              whileHover={{ scale: 1.1, rotate: 10 }}
            >
              <FiLogIn size={28} className="text-white" />
            </motion.div>
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Welcome Back 👋
            </h2>
            <p className="mt-2" style={{ color: 'var(--text-muted)' }}>
              Sign in to continue your journey
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                <FiMail className="inline mr-2" /> Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-3 rounded-xl outline-none transition-all"
                style={{ 
                  backgroundColor: 'var(--bg-color)',
                  border: '2px solid var(--border-color)',
                  color: 'var(--text-primary)'
                }}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                <FiLock className="inline mr-2" /> Password
              </label>
              <div className="relative">
                <input
                  type={show ? 'text' : 'password'}
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full px-4 py-3 pr-12 rounded-xl outline-none transition-all"
                  style={{ 
                    backgroundColor: 'var(--bg-color)',
                    border: '2px solid var(--border-color)',
                    color: 'var(--text-primary)'
                  }}
                />
                <button
                  type="button"
                  onClick={handleToggle}
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                  style={{ color: 'var(--color-primary)' }}
                >
                  {show ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleForgotPassword}
                disabled={!email}
                className={`text-sm cursor-pointer ${email ? 'hover:underline' : 'opacity-50 cursor-not-allowed'}`}
                style={{ color: 'var(--color-primary)' }}
              >
                Forgot Password?
              </button>
            </div>

            {error && (
              <p className="text-sm p-3 rounded-lg" style={{ backgroundColor: 'var(--color-danger)', color: 'white' }}>
                {error}
              </p>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full py-4 text-white font-bold rounded-xl cursor-pointer transition-all"
              style={{ backgroundColor: 'var(--color-primary)' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Sign In
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px" style={{ backgroundColor: 'var(--border-color)' }}></div>
            <span className="px-4 text-sm" style={{ color: 'var(--text-muted)' }}>or</span>
            <div className="flex-1 h-px" style={{ backgroundColor: 'var(--border-color)' }}></div>
          </div>

          {/* Google Button */}
          <motion.button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-xl font-medium cursor-pointer transition-all"
            style={{ 
              border: '2px solid var(--border-color)',
              color: 'var(--text-primary)'
            }}
            whileHover={{ scale: 1.02, borderColor: 'var(--color-primary)' }}
            whileTap={{ scale: 0.98 }}
          >
            <FcGoogle size={24} />
            Continue with Google
          </motion.button>

          {/* Sign Up Link */}
          <p className="text-center mt-6" style={{ color: 'var(--text-secondary)' }}>
            Don't have an account?{' '}
            <NavLink
              to="/signup"
              className="font-semibold hover:underline"
              style={{ color: 'var(--color-primary)' }}
            >
              Sign Up
            </NavLink>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn;
