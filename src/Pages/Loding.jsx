import { motion } from 'framer-motion';
import logo from '../assets/Logo.png';
import { FiDollarSign } from 'react-icons/fi';

const Loading = () => {
  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ backgroundColor: 'var(--bg-color)' }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-20"
          style={{ backgroundColor: 'var(--color-primary)', filter: 'blur(80px)' }}
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full opacity-20"
          style={{ backgroundColor: 'var(--color-secondary)', filter: 'blur(60px)' }}
          animate={{ 
            scale: [1.2, 1, 1.2],
            x: [0, -20, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Container with Ring */}
        <div className="relative mb-8">
          {/* Outer Ring */}
          <motion.div 
            className="absolute inset-0 rounded-full"
            style={{ 
              border: '3px solid var(--color-primary)',
              borderTopColor: 'transparent',
              width: '140px',
              height: '140px',
              margin: '-10px'
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
          
          {/* Inner Ring */}
          <motion.div 
            className="absolute inset-0 rounded-full"
            style={{ 
              border: '3px solid var(--color-secondary)',
              borderBottomColor: 'transparent',
              width: '120px',
              height: '120px',
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />

          {/* Logo */}
          <motion.img
            src={logo}
            alt="Loading Logo"
            className="w-28 h-28 rounded-full relative z-10"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* App Name */}
        <motion.h1 
          className="text-2xl font-bold mb-2"
          style={{ color: 'var(--text-primary)' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Money Manager
        </motion.h1>

        {/* Loading Text */}
        <motion.p
          className="text-sm mb-6"
          style={{ color: 'var(--text-muted)' }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading your finances...
        </motion.p>

        {/* Animated Dots */}
        <div className="flex gap-2">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: 'var(--color-primary)' }}
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.15,
              }}
            />
          ))}
        </div>

        {/* Floating Icons */}
        <div className="absolute -z-10">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.cos(i * 60 * Math.PI / 180) * 120}px`,
                top: `${Math.sin(i * 60 * Math.PI / 180) * 120}px`,
              }}
              animate={{
                y: [0, -10, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            >
              <FiDollarSign 
                size={20} 
                style={{ color: 'var(--color-primary)' }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Text */}
      <motion.p 
        className="absolute bottom-8 text-xs"
        style={{ color: 'var(--text-muted)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Securing your financial data...
      </motion.p>
    </div>
  );
};

export default Loading;
