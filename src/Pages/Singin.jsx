
import { auth } from '../Firebase/Firebase.confige';
import React, { useContext, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import {
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from 'firebase/auth';
import toast, { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet';

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
    <div className=" flex items-center justify-center px-4 pt-20 pb-10 transition-colors">
      <Helmet>
        <title>SignIn | Money Manager</title>
      </Helmet>
      <Toaster />
      <div className="bg-white dark:bg-[#122022] shadow-2xl rounded-3xl p-10 w-full max-w-md border border-[#00A86B]/40 dark:border-[#00A86B]/20 transition-colors">
        <h2 className="text-3xl font-extrabold text-center text-[#003B2E] dark:text-white mb-2">
          Welcome Back 👋
        </h2>
        <p className="text-center text-[#003B2E]/80 dark:text-[#D2EAE5] mb-8">
          Sign in to continue your journey
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <label className="block text-[#003B2E] dark:text-[#D2EAE5] font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-[#23403B] rounded-xl focus:ring-2 focus:ring-[#00A86B] focus:outline-none transition bg-[#F9FAFB] dark:bg-[#1B2D2D] text-[#003B2E] dark:text-white"
            />
          </div>

          <div className="relative">
            <label className="block text-[#003B2E] dark:text-[#D2EAE5] font-medium mb-1">
              Password
            </label>
            <input
              type={show ? 'text' : 'password'}
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-[#23403B] rounded-xl focus:ring-2 focus:ring-[#00A86B] focus:outline-none pr-10 transition bg-[#F9FAFB] dark:bg-[#1B2D2D] text-[#003B2E] dark:text-white"
            />
            <button
              type="button"
              onClick={handleToggle}
              className="absolute mt-6 right-3 -translate-y-1/2 text-[#00A86B] dark:text-[#39F9C0]"
            >
              {show ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
            </button>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <button
              type="button"
              onClick={handleForgotPassword}
              disabled={!email}
              className={`text-sm ${
                email
                  ? 'text-[#00A86B] dark:text-[#39F9C0] hover:underline'
                  : 'text-gray-400 cursor-not-allowed'
              }`}
            >
              Forgot Password?
            </button>
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 border border-[#00A86B] bg-[#00A86B] text-white font-bold rounded-xl hover:bg-[#007C56] dark:hover:bg-[#009E70] transition"
          >
            Sign In
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-[#00A86B] dark:bg-[#39F9C0]"></div>
          <span className="px-3 text-[#00A86B] dark:text-[#39F9C0] text-sm">or</span>
          <div className="flex-grow h-px bg-[#00A86B] dark:bg-[#39F9C0]"></div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 border border-[#00A86B] dark:border-[#39F9C0] py-3 rounded-xl text-[#003B2E] dark:text-white hover:bg-[#00A86B] hover:text-white dark:hover:bg-[#39F9C0] transition"
        >
          <FcGoogle className="w-7 h-7" />
          <span className="font-medium">Continue with Google</span>
        </button>

        <p className="text-sm text-center text-[#003B2E] dark:text-[#D2EAE5] mt-6">
          Don’t have an account?{' '}
          <NavLink
            to="/signup"
            className="text-[#00A86B] dark:text-[#39F9C0] font-medium hover:underline"
          >
            Sign Up
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
