import React, { useContext, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { motion, useInView } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../Context/AuthContext';
import OverVew from '../Componentes/OverVew';
import QuickActions from '../Componentes/QuickActions';
import RecentTransactions from '../Componentes/RecentTransactions';
import SavingsGoals from '../Componentes/SavingsGoals';
import FinancialInsights from '../Componentes/FinancialInsights';
import ExpenseBreakdown from '../Componentes/ExpenseBreakdown';
import FinancialHealth from '../Componentes/FinancialHealth';
import { FiActivity, FiPieChart, FiTrendingUp, FiUser } from 'react-icons/fi';

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

const UserDashboard = () => {
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
    <div
      className="min-h-screen"
      style={{ backgroundColor: 'var(--bg-color)' }}
    >
      <Helmet>
        <title>User Dashboard - FinTrack</title>
      </Helmet>

      {/* Dashboard Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8">
        <ScrollReveal direction="up">
          <div className="flex items-center gap-4 mb-6">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'white',
              }}
            >
              <FiUser size={32} />
            </div>
            <div>
              <h1
                className="text-3xl sm:text-4xl font-bold"
                style={{ color: 'var(--text-primary)' }}
              >
                User Dashboard
              </h1>
              <p
                className="text-lg mt-1"
                style={{ color: 'var(--text-muted)' }}
              >
                Welcome back, {user?.displayName || 'User'}!
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>

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
              <h3
                className="text-xl font-bold mb-4 flex items-center gap-2"
                style={{ color: 'var(--text-primary)' }}
              >
                <FiActivity style={{ color: 'var(--color-primary)' }} />{' '}
                Financial Health
              </h3>
              <FinancialHealth />
            </div>
          </ScrollReveal>

          {/* Expense Breakdown */}
          <ScrollReveal direction="right" delay={0.2}>
            <div className="card rounded-2xl shadow-lg p-6">
              <h3
                className="text-xl font-bold mb-4 flex items-center gap-2"
                style={{ color: 'var(--text-primary)' }}
              >
                <FiPieChart style={{ color: 'var(--color-primary)' }} />{' '}
                Spending Overview
              </h3>
              <ExpenseBreakdown />
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Savings Goals */}
      <ScrollReveal direction="up" delay={0.1}>
        <SavingsGoals />
      </ScrollReveal>

      {/* Financial Insights */}
      <ScrollReveal direction="up" delay={0.15}>
        <FinancialInsights />
      </ScrollReveal>

      {/* Recent Transactions */}
      <ScrollReveal direction="up" delay={0.2}>
        <RecentTransactions />
      </ScrollReveal>
    </div>
  );
};

export default UserDashboard;
