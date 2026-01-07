import { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../Firebase/Firebase.confige';
import { AuthContext } from '../Context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import axios from 'axios';
import { 
  FiUser, 
  FiMail, 
  FiLock, 
  FiEye, 
  FiEyeOff, 
  FiImage, 
  FiUserPlus,
  FiDollarSign,
  FiTrendingUp,
  FiPieChart,
  FiTarget
} from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';

const provider = new GoogleAuthProvider();

const SignUp = () => {
  const navigate = useNavigate();
  const { createUser } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [passcode, setPasscode] = useState('');
  const [firstName, setFirstName] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleToggle = () => setShow(!show);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_API}/users`, {
        firstName,
        email,
        password: passcode,
        imgUrl,
      });

      if (res.data.insertedId) {
        setSuccess(true);
        toast.success('Registration successful!');
        navigate('/');
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Server error');
    }
  };

  const handleGoogleSignUp = async () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;

        const userData = {
          firstName: user.displayName || 'Google User',
          email: user.email,
          password: '',
          imgUrl: user.photoURL || '',
        };

        try {
          const res = await axios.post(
            `${import.meta.env.VITE_BACKEND_API}/users`,
            userData
          );
          if (
            res.data.insertedId ||
            res.data.message === 'User already exists'
          ) {
            toast.success('Google Sign Up successful!');
            navigate('/');
          } else {
            toast.error(res.data.message);
          }
        } catch (err) {
          toast.error(err.response?.data?.message || 'Server error');
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const features = [
    { icon: <FiTrendingUp size={24} />, title: 'Track Spending', desc: 'Monitor where your money goes' },
    { icon: <FiTarget size={24} />, title: 'Set Goals', desc: 'Save for what matters most' },
    { icon: <FiPieChart size={24} />, title: 'View Reports', desc: 'Understand your finances' },
  ];

  return (
    <div 
      className="min-h-screen flex relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-color)' }}
    >
      <Helmet>
        <title>Signup | Money Manager</title>
      </Helmet>
      <Toaster position="top-right" />

      {/* Left Side - Branding (Hidden on mobile) */}
      <div 
        className="hidden lg:flex w-1/2 flex-col items-center justify-center p-12 relative"
        style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: 100 + i * 50,
                height: 100 + i * 50,
                left: `${10 + i * 15}%`,
                top: `${10 + (i % 3) * 30}%`,
              }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 4 + i, repeat: Infinity }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-6">
              <FiDollarSign size={40} />
            </div>
            <h1 className="text-4xl xl:text-5xl font-bold mb-4">Money Manager</h1>
            <p className="text-lg opacity-90 mb-10 max-w-md">
              Take control of your finances. Track spending, set goals, and build a better financial future.
            </p>
          </motion.div>

          {/* Features */}
          <div className="space-y-4">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4"
              >
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  {feature.icon}
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm opacity-80">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10">
        {/* Background Effects for mobile */}
        <div className="absolute inset-0 overflow-hidden lg:hidden">
          <motion.div 
            className="absolute top-1/4 -left-20 w-72 h-72 rounded-full opacity-20"
            style={{ backgroundColor: 'var(--color-primary)', filter: 'blur(80px)' }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-1/4 -right-20 w-72 h-72 rounded-full opacity-15"
            style={{ backgroundColor: 'var(--color-secondary)', filter: 'blur(80px)' }}
            animate={{ scale: [1.2, 1, 1.2] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>

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
                <FiUserPlus size={28} className="text-white" />
              </motion.div>
              <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
                Create Account
              </h2>
              <p className="mt-2" style={{ color: 'var(--text-muted)' }}>
                Start your financial journey today
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                  <FiUser className="inline mr-2" /> Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl outline-none transition-all"
                  style={{ 
                    backgroundColor: 'var(--bg-color)',
                    border: '2px solid var(--border-color)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>

              {/* Profile Image URL */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                  <FiImage className="inline mr-2" /> Profile Image URL
                </label>
                <input
                  type="text"
                  placeholder="Enter image URL"
                  value={imgUrl}
                  onChange={(e) => setImgUrl(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl outline-none transition-all"
                  style={{ 
                    backgroundColor: 'var(--bg-color)',
                    border: '2px solid var(--border-color)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                  <FiMail className="inline mr-2" /> Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                    placeholder="Enter your password"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
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

              {/* Terms */}
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="terms" 
                  required 
                  className="w-4 h-4 rounded cursor-pointer"
                  style={{ accentColor: 'var(--color-primary)' }}
                />
                <label htmlFor="terms" className="text-sm cursor-pointer" style={{ color: 'var(--text-secondary)' }}>
                  I agree to the{' '}
                  <span style={{ color: 'var(--color-primary)' }}>Terms & Conditions</span>
                </label>
              </div>

              {error && (
                <p className="text-sm p-3 rounded-lg" style={{ backgroundColor: 'var(--color-danger)', color: 'white' }}>
                  {error}
                </p>
              )}
              {success && (
                <p className="text-sm p-3 rounded-lg" style={{ backgroundColor: 'var(--color-success)', color: 'white' }}>
                  Registration successful!
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
                Create Account
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
              onClick={handleGoogleSignUp}
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

            {/* Sign In Link */}
            <p className="text-center mt-6" style={{ color: 'var(--text-secondary)' }}>
              Already have an account?{' '}
              <NavLink
                to="/signin"
                className="font-semibold hover:underline"
                style={{ color: 'var(--color-primary)' }}
              >
                Sign In
              </NavLink>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;
