import React from 'react';
import { motion } from 'framer-motion';
import { FiTarget, FiHeart, FiTrendingUp, FiShield } from 'react-icons/fi';

const About = () => {
  const features = [
    {
      icon: <FiTarget size={40} />,
      title: 'Our Mission',
      description:
        'To empower individuals with simple yet powerful tools to take control of their financial future and achieve their money goals.',
    },
    {
      icon: <FiHeart size={40} />,
      title: 'Our Values',
      description:
        'We believe in transparency, simplicity, and putting our users first. Your financial wellness is our top priority.',
    },
    {
      icon: <FiTrendingUp size={40} />,
      title: 'Smart Tracking',
      description:
        'Track every transaction, analyze spending patterns, and make informed decisions with our intuitive dashboard.',
    },
    {
      icon: <FiShield size={40} />,
      title: 'Secure & Private',
      description:
        'Your financial data is encrypted and secure. We never share your information with third parties.',
    },
  ];

  return (
    <div
      className="min-h-screen pt-24 pb-16 px-4"
      style={{ backgroundColor: 'var(--bg-color)' }}
    >
      <div className="max-w-6xl mx-auto">
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
            About Money Manager
          </h1>
          <p
            className="text-lg md:text-xl max-w-3xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            Your trusted companion for managing personal finances, tracking
            expenses, and building better money habits.
          </p>
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16 p-8 rounded-2xl card"
        >
          <h2
            className="text-3xl font-bold mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Our Story
          </h2>
          <p
            className="text-lg mb-4"
            style={{ color: 'var(--text-secondary)' }}
          >
            Money Manager was born from a simple idea: personal finance
            shouldn't be complicated. We noticed that many people struggle with
            tracking their expenses and understanding where their money goes
            each month.
          </p>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            Our team built this platform to make financial management accessible
            to everyone, combining powerful analytics with an intuitive
            interface that anyone can use.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="p-8 rounded-2xl card hover:shadow-xl transition-all"
            >
              <div className="mb-4" style={{ color: 'var(--color-primary)' }}>
                {feature.icon}
              </div>
              <h3
                className="text-2xl font-bold mb-3"
                style={{ color: 'var(--text-primary)' }}
              >
                {feature.title}
              </h3>
              <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center p-12 rounded-2xl"
          style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Take Control?</h2>
          <p className="text-lg mb-6 opacity-90">
            Join thousands of users who are already managing their finances
            smarter.
          </p>
          <a href="/signup">
            <button
              className="px-8 py-3 bg-white rounded-lg font-bold text-lg transition-all hover:scale-105"
              style={{ color: 'var(--color-primary)' }}
            >
              Get Started Free
            </button>
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
