import { motion } from 'framer-motion';
import logo from '../assets/Logo.png';
import {
  FiDollarSign,
  FiTrendingUp,
  FiPieChart,
  FiBarChart2,
} from 'react-icons/fi';

const Loading = () => {
  const icons = [
    { Icon: FiDollarSign, delay: 0 },
    { Icon: FiTrendingUp, delay: 0.2 },
    { Icon: FiPieChart, delay: 0.4 },
    { Icon: FiBarChart2, delay: 0.6 },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ backgroundColor: 'var(--bg-color)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Animated Background Gradient Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20"
          style={{
            backgroundColor: 'var(--color-primary)',
            filter: 'blur(100px)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-20"
          style={{
            backgroundColor: 'var(--color-secondary)',
            filter: 'blur(80px)',
          }}
          animate={{
            scale: [1.3, 1, 1.3],
            x: [0, -40, 0],
            y: [0, 40, 0],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full opacity-15"
          style={{
            backgroundColor: 'var(--color-success)',
            filter: 'blur(70px)',
          }}
          animate={{
            scale: [1, 1.4, 1],
            x: [0, 30, 0],
            y: [0, -40, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Container with Multiple Rings */}
        <div className="relative mb-8">
          {/* Outer Ring 1 */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              border: '4px solid var(--color-primary)',
              borderTopColor: 'transparent',
              borderRightColor: 'transparent',
              width: '160px',
              height: '160px',
              margin: '-16px',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />

          {/* Outer Ring 2 */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              border: '3px solid var(--color-secondary)',
              borderBottomColor: 'transparent',
              borderLeftColor: 'transparent',
              width: '140px',
              height: '140px',
              margin: '-6px',
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
          />

          {/* Inner Ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              border: '3px solid var(--color-success)',
              borderTopColor: 'transparent',
              width: '120px',
              height: '120px',
              margin: '4px',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />

          {/* Logo with Pulse Effect */}
          <motion.div
            className="relative z-10"
            animate={{
              scale: [1, 1.08, 1],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.img
              src={logo}
              alt="Loading Logo"
              className="w-28 h-28 rounded-full shadow-2xl"
              style={{ boxShadow: '0 0 40px rgba(13, 148, 136, 0.3)' }}
            />
          </motion.div>

          {/* Glow Effect */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                'radial-gradient(circle, var(--color-primary) 0%, transparent 70%)',
              width: '128px',
              height: '128px',
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* App Name with Gradient */}
        <motion.h1
          className="text-3xl font-bold mb-2 bg-clip-text text-transparent"
          style={{
            backgroundImage:
              'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Money Manager
        </motion.h1>

        {/* Loading Text with Animation */}
        <motion.p
          className="text-base mb-8 font-medium"
          style={{ color: 'var(--text-secondary)' }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Loading your finances...
        </motion.p>

        {/* Progress Bar */}
        <div
          className="w-64 h-1.5 rounded-full overflow-hidden mb-6"
          style={{ backgroundColor: 'var(--border-color)' }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{
              background:
                'linear-gradient(90deg, var(--color-primary), var(--color-secondary), var(--color-success))',
            }}
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
              repeatDelay: 0.2,
            }}
          />
        </div>

        {/* Animated Dots */}
        <div className="flex gap-3 mb-12">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: 'var(--color-primary)' }}
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.15,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        {/* Floating Financial Icons */}
        <div className="absolute -z-10">
          {icons.map(({ Icon, delay }, i) => {
            const angle = (i * 360) / icons.length;
            const radius = 150;
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;

            return (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 0.6, 0],
                  scale: [0.5, 1.2, 0.5],
                  y: [0, -20, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: delay,
                  ease: 'easeInOut',
                }}
              >
                <Icon size={28} style={{ color: 'var(--color-primary)' }} />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom Text with Fade In */}
      <motion.div
        className="absolute bottom-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <p
          className="text-sm font-medium mb-1"
          style={{ color: 'var(--text-muted)' }}
        >
          Securing your financial data
        </p>
        <motion.div
          className="flex justify-center gap-1"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {['•', '•', '•'].map((dot, i) => (
            <motion.span
              key={i}
              style={{ color: 'var(--color-primary)' }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            >
              {dot}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Loading;
