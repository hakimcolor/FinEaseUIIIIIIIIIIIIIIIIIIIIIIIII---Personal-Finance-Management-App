import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../Firebase/Firebase.confige';
import { AuthContext } from '../Context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import axios from 'axios';

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

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const handleToggle = () => setShow(!show);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      const res = await axios.post('https://fin-eas-backend.vercel.app/users', {
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
            'https://fin-eas-backend.vercel.app/users',
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

  return (
    <div className="relative min-h-screen mt-[-40px] w-full flex flex-col md:flex-row dark:bg-[#0B1416] dark:text-white bg-[#F1F4F6] transition">
      <Particles
        id="tsparticles"
        init={particlesInit}
        className="absolute inset-0 -z-10"
        options={{
          background: { color: 'transparent' },
          fpsLimit: 60,
          particles: {
            number: { value: 45 },
            size: { value: { min: 2, max: 5 } },
            color: { value: '#00A86B' },
            opacity: { value: 0.4 },
            move: { enable: true, speed: 0.8 },
            links: {
              enable: true,
              color: '#00A86B',
              distance: 150,
              opacity: 0.5,
            },
          },
        }}
      />

      <Helmet>
        <title>Signup | Money Manager</title>
      </Helmet>

      <Toaster position="top-right" />

      <div
        className="hidden md:flex w-full md:w-1/2 items-center justify-center bg-gradient-to-br 
                    from-[#00A86B] to-[#007C56] dark:from-[#0E2A24] dark:to-[#0E1F1C] p-10"
      >
        <div className="text-center px-6 md:px-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg leading-tight">
            Money Manager
          </h1>
          <p className="mt-4 text-white/90 text-base md:text-lg">
            Track your spending. Grow your savings. Manage your financial life.
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center py-10 sm:py-14 px-5 sm:px-8 lg:px-12">
        <div
          className="bg-white dark:bg-[#122022] shadow-2xl rounded-3xl p-8 sm:p-10 w-full max-w-md 
                      border border-[#00A86B]/40 dark:border-[#00A86B]/20"
        >
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-[#003B2E] dark:text-white mb-8">
            Create Your Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col">
              <label className="text-[#003B2E] dark:text-[#D2EAE5] mb-2">
                First Name
              </label>
              <input
                type="text"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[#F9FAFB] dark:bg-[#1B2D2D] 
                text-[#003B2E] dark:text-white border border-gray-300 
                dark:border-[#23403B] rounded-xl focus:ring-2 focus:ring-[#00A86B] 
                outline-none transition"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-[#003B2E] dark:text-[#D2EAE5] mb-2">
                Profile Image URL
              </label>
              <input
                type="text"
                placeholder="Enter image URL"
                value={imgUrl}
                onChange={(e) => setImgUrl(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[#F9FAFB] dark:bg-[#1B2D2D] 
                text-[#003B2E] dark:text-white border border-gray-300 
                dark:border-[#23403B] rounded-xl focus:ring-2 focus:ring-[#00A86B] 
                outline-none transition"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-[#003B2E] dark:text-[#D2EAE5] mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[#F9FAFB] dark:bg-[#1B2D2D] 
                text-[#003B2E] dark:text-white border border-gray-300 
                dark:border-[#23403B] rounded-xl focus:ring-2 focus:ring-[#00A86B] 
                outline-none transition"
              />
            </div>

            <div className="relative flex flex-col">
              <label className="text-[#003B2E] dark:text-[#D2EAE5] mb-2">
                Password
              </label>
              <input
                type={show ? 'text' : 'password'}
                placeholder="Enter your password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[#F9FAFB] dark:bg-[#1B2D2D] 
                text-[#003B2E] dark:text-white border border-gray-300 
                dark:border-[#23403B] rounded-xl focus:ring-2 focus:ring-[#00A86B] 
                pr-12 outline-none transition"
              />

              <button
                type="button"
                onClick={handleToggle}
                className="absolute mt-14 right-4 -translate-y-1/2 text-[#00A86B] dark:text-[#39F9C0]"
              >
                {show ? (
                  <AiOutlineEyeInvisible size={22} />
                ) : (
                  <AiOutlineEye size={22} />
                )}
              </button>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <input type="checkbox" name="terms" id="terms" required />
              <label
                htmlFor="terms"
                className="text-sm text-[#003B2E] dark:text-[#D2EAE5]"
              >
                Accept our{' '}
                <span className="text-[#00A86B] dark:text-[#39F9C0]">
                  terms and conditions
                </span>
              </label>
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}
            {success && (
              <p className="text-green-600 text-sm">Registration successful!</p>
            )}

            <button
              type="submit"
              className="w-full py-3 border border-[#00A86B] bg-[#00A86B] text-white 
                font-bold rounded-xl hover:bg-[#007C56] dark:hover:bg-[#009E70] transition"
            >
              Sign Up
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-[#00A86B] dark:bg-[#39F9C0]"></div>
            <span className="px-3 text-[#00A86B] dark:text-[#39F9C0] text-sm">
              or
            </span>
            <div className="flex-grow h-px bg-[#00A86B] dark:bg-[#39F9C0]"></div>
          </div>

          <button
            onClick={handleGoogleSignUp}
            className="w-full flex items-center justify-center gap-3 border border-[#00A86B] dark:border-[#39F9C0] py-3 rounded-xl text-[#003B2E] dark:text-white hover:bg-[#00A86B] hover:text-white dark:hover:bg-[#39F9C0] transition"
          >
            <FcGoogle className="w-7 h-7" />
            <span className="font-medium">Continue with Google</span>
          </button>

          <p className="text-sm text-center text-[#003B2E] dark:text-[#D2EAE5] mt-6">
            Already have an account?{' '}
            <NavLink
              to="/signin"
              className="text-[#00A86B] dark:text-[#39F9C0] hover:underline"
            >
              Sign In
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
