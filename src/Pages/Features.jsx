import React from 'react';
import { motion } from 'framer-motion';
import {
  FiPieChart,
  FiTrendingUp,
  FiDollarSign,
  FiBarChart2,
  FiTarget,
  FiClock,
  FiLock,
  FiSmartphone,
  FiZap,
} from 'react-icons/fi';

const Features = () => {
  const mainFeatures = [
    {
      icon: <FiDollarSign size={50} />,
      title: 'Transaction Tracking',
      description:
        'Easily add, edit, and categorize all your income and expenses in one place.',
      color: 'var(--color-primary)',
    },
    {
      icon: <FiPieChart size={50} />,
      title: 'Visual Reports',
      description:
        'Beautiful charts and graphs help you understand your spending patterns at a glance.',
      color: 'var(--color-secondary)',
    },
    {
      icon: <FiTrendingUp size={50} />,
      title: 'Financial Insights',
      description:
        'Get personalized insights and recommendations to improve your financial health.',
      color: 'var(--color-success)',
    },
    {
      icon: <FiBarChart2 size={50} />,
      title: 'Budget Planning',
      description:
        'Set budgets for different categories and track your progress throughout the month.',
      color: 'var(--color-danger)',
    },
    {
      icon: <FiTarget size={50} />,
      title: 'Savings Goals',
      description:
        'Define your savings goals and watch your progress as you work towards them.',
      color: 'var(--color-primary)',
    },
    {
      icon: <FiClock size={50} />,
      title: 'Real-time Updates',
      description:
        'Your financial data syncs instantly across all your devices.',
      color: 'var(--color-secondary)',
    },
  ];

  const additionalFeatures = [
    {
      icon: <FiLock size={30} />,
      title: 'Bank-level Security',
      description:
        'Your data is encrypted and protected with industry-standard security.',
    },
    {
      icon: <FiSmartphone size={30} />,
      title: 'Mobile Friendly',
      description: 'Access your finances anywhere, anytime on any device.',
    },
    {
      icon: <FiZap size={30} />,
      title: 'Lightning Fast',
      description:
        'Optimized performance for quick loading and smooth experience.',
    },
  ];

  return (
    <div
      className="min-h-screen pt-24 pb-16 px-4"
      style={{ backgroundColor: 'var(--bg-color)' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ color: 'var(--color-primary)' }}
          >
            Powerful Features
          </h1>
          <p
            className="text-lg md:text-xl max-w-3xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            Everything you need to manage your money effectively, all in one
            beautiful platform.
          </p>
        </motion.div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {mainFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="p-8 rounded-2xl card hover:shadow-xl transition-all group"
            >
              <motion.div
                className="mb-6"
                style={{ color: feature.color }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {feature.icon}
              </motion.div>
              <h3
                className="text-2xl font-bold mb-3"
                style={{ color: 'var(--text-primary)' }}
              >
                {feature.title}
              </h3>
              <p
                className="text-base"
                style={{ color: 'var(--text-secondary)' }}
              >
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Additional Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-16"
        >
          <h2
            className="text-3xl font-bold text-center mb-10"
            style={{ color: 'var(--text-primary)' }}
          >
            And Much More...
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.9 + 0.1 * index }}
                className="p-6 rounded-xl card text-center"
              >
                <div
                  className="mb-4 flex justify-center"
                  style={{ color: 'var(--color-primary)' }}
                >
                  {feature.icon}
                </div>
                <h4
                  className="text-lg font-bold mb-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {feature.title}
                </h4>
                <p
                  className="text-sm"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center p-12 rounded-2xl"
          style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}
        >
          <h2 className="text-3xl font-bold mb-4">
            Experience All Features Today
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Sign up now and start managing your finances like a pro.
          </p>
          <a href="/signup">
            <button
              className="px-8 py-3 bg-white rounded-lg font-bold text-lg transition-all hover:scale-105"
              style={{ color: 'var(--color-primary)' }}
            >
              Start Free Trial
            </button>
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Features;
