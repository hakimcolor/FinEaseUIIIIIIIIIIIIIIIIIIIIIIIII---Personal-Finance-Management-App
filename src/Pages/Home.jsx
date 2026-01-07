import React, { useContext, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { motion, useInView } from 'framer-motion';
import { AuthContext } from '../Context/AuthContext';
import HomeSlider from '../Componentes/HomeSlider';
import OverVew from '../Componentes/OverVew';
import StaticHOMe from '../Componentes/StaticHOMe';
import QuickActions from '../Componentes/QuickActions';
import RecentTransactions from '../Componentes/RecentTransactions';
import MoneyTips from '../Componentes/MoneyTips';
import SavingsGoals from '../Componentes/SavingsGoals';
import { FiActivity, FiPieChart, FiBarChart2, FiTarget, FiTrendingUp, FiStar, FiThumbsUp, FiAlertTriangle } from 'react-icons/fi';

// Scroll Animation Wrapper Component
const ScrollReveal = ({ children, direction = 'up', delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 60 : direction === 'down' ? -60 : 0,
      x: direction === 'left' ? 60 : direction === 'right' ? -60 : 0,
      scale: direction === 'scale' ? 0.8 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: delay,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

// Stagger Container for children animations
const StaggerContainer = ({ children, staggerDelay = 0.1 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

const Home = () => {
  const { user } = useContext(AuthContext);

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-color)' }}>
      {/* Hero Slider */}
      <ScrollReveal direction="scale">
        <HomeSlider />
      </ScrollReveal>

      {/* Daily Money Tip */}
      <ScrollReveal direction="up" delay={0.1}>
        <MoneyTips />
      </ScrollReveal>

      {/* Show user-specific content if logged in */}
      {user ? (
        <>
          {/* Quick Actions */}
          <ScrollReveal direction="up" delay={0.1}>
            <QuickActions />
          </ScrollReveal>

          {/* Financial Overview Cards */}
          <ScrollReveal direction="up" delay={0.15}>
            <OverVew />
          </ScrollReveal>

          {/* Two Column Layout */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Financial Health Score */}
              <ScrollReveal direction="left" delay={0.1}>
                <div className="card rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                    <FiActivity style={{ color: 'var(--color-primary)' }} /> Financial Health
                  </h3>
                  <FinancialHealthMini />
                </div>
              </ScrollReveal>

              {/* Expense Breakdown Mini */}
              <ScrollReveal direction="right" delay={0.2}>
                <div className="card rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                    <FiPieChart style={{ color: 'var(--color-primary)' }} /> Spending Overview
                  </h3>
                  <ExpenseBreakdownMini />
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Savings Goals */}
          <ScrollReveal direction="up" delay={0.1}>
            <SavingsGoals />
          </ScrollReveal>

          {/* Recent Transactions */}
          <ScrollReveal direction="up" delay={0.15}>
            <RecentTransactions />
          </ScrollReveal>
        </>
      ) : (
        <ScrollReveal direction="scale" delay={0.2}>
          <WelcomeSection />
        </ScrollReveal>
      )}

      {/* Static Tips Section */}
      <ScrollReveal direction="up" delay={0.1}>
        <StaticHOMe />
      </ScrollReveal>
    </div>
  );
};

// Mini Financial Health
const FinancialHealthMini = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = React.useState({ totalIncome: 0, totalExpense: 0, balance: 0 });
  const [score, setScore] = React.useState(0);

  React.useEffect(() => {
    if (user?.email) {
      fetch(`${import.meta.env.VITE_BACKEND_API}/transactions/overview?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          const savingsRate = data.totalIncome > 0 
            ? ((data.totalIncome - data.totalExpense) / data.totalIncome) * 100 
            : 0;
          setScore(Math.min(100, Math.max(0, Math.round(savingsRate * 2))));
        })
        .catch(console.error);
    }
  }, [user]);

  const getStatus = () => {
    if (score >= 80) return { label: 'Excellent', icon: <FiStar size={20} />, color: 'var(--color-success)' };
    if (score >= 60) return { label: 'Good', icon: <FiThumbsUp size={20} />, color: 'var(--color-primary)' };
    if (score >= 40) return { label: 'Fair', icon: <FiAlertTriangle size={20} />, color: 'var(--color-secondary)' };
    return { label: 'Needs Work', icon: <FiAlertTriangle size={20} />, color: 'var(--color-danger)' };
  };

  const status = getStatus();

  return (
    <div className="flex items-center gap-6">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full transform -rotate-90">
          <circle cx="50%" cy="50%" r="40%" stroke="var(--border-color)" strokeWidth="8" fill="none" />
          <circle
            cx="50%" cy="50%" r="40%"
            stroke="var(--color-primary)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${score * 2.51} 251`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{score}</span>
        </div>
      </div>
      <div>
        <div className="text-lg font-bold flex items-center gap-1" style={{ color: status.color }}>
          {status.icon} {status.label}
        </div>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          Savings: {data.totalIncome > 0 ? Math.round(((data.totalIncome - data.totalExpense) / data.totalIncome) * 100) : 0}%
        </p>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Balance: ${data.balance}</p>
      </div>
    </div>
  );
};

const expenseCategoryColors = ['var(--color-primary)', 'var(--color-secondary)', 'var(--color-success)', 'var(--color-danger)'];

// Mini Expense Breakdown
const ExpenseBreakdownMini = () => {
  const { user } = useContext(AuthContext);
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    if (user?.email) {
      fetch(`${import.meta.env.VITE_BACKEND_API}/transactions?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          const expenses = data.filter((tx) => tx.type === 'expense');
          const total = expenses.reduce((sum, tx) => sum + Number(tx.amount), 0);
          
          const grouped = expenses.reduce((acc, tx) => {
            const cat = tx.category?.toLowerCase() || 'other';
            acc[cat] = (acc[cat] || 0) + Number(tx.amount);
            return acc;
          }, {});

          const categoryArray = Object.entries(grouped)
            .map(([name, amount], index) => ({
              name,
              amount,
              percentage: total > 0 ? Math.round((amount / total) * 100) : 0,
              color: expenseCategoryColors[index % 4],
            }))
            .sort((a, b) => b.amount - a.amount)
            .slice(0, 4);

          setCategories(categoryArray);
        })
        .catch(console.error);
    }
  }, [user]);

  if (categories.length === 0) {
    return <p style={{ color: 'var(--text-muted)' }} className="text-sm">No expense data yet</p>;
  }

  return (
    <div className="space-y-3">
      {categories.map((cat, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-1">
              <span className="capitalize" style={{ color: 'var(--text-primary)' }}>{cat.name}</span>
              <span style={{ color: 'var(--text-secondary)' }}>{cat.percentage}%</span>
            </div>
            <div className="w-full rounded-full h-2" style={{ backgroundColor: 'var(--border-color)' }}>
              <div className="h-full rounded-full" style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }}></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Welcome Section
const WelcomeSection = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12">
      <div className="rounded-3xl shadow-2xl p-8 sm:p-12 text-white text-center" style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}>
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 flex items-center justify-center gap-2">
          Take Control of Your Finances <FiTrendingUp />
        </h2>
        <p className="text-lg sm:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
          Track expenses, set savings goals, and build better money habits with our easy-to-use money management app.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
            <FiBarChart2 size={40} className="mx-auto mb-3" />
            <h3 className="font-bold text-lg">Track Spending</h3>
            <p className="text-sm opacity-80">Monitor where your money goes</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
            <FiTarget size={40} className="mx-auto mb-3" />
            <h3 className="font-bold text-lg">Set Goals</h3>
            <p className="text-sm opacity-80">Save for what matters most</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
            <FiTrendingUp size={40} className="mx-auto mb-3" />
            <h3 className="font-bold text-lg">Grow Wealth</h3>
            <p className="text-sm opacity-80">Build a secure financial future</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/signup" className="px-8 py-3 bg-white font-bold rounded-full hover:bg-gray-100 transition shadow-lg" style={{ color: 'var(--color-primary)' }}>
            Get Started Free
          </a>
          <a href="/signin" className="px-8 py-3 bg-transparent border-2 border-white font-bold rounded-full hover:bg-white/10 transition">
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
