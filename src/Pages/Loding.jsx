import { motion } from 'framer-motion';
import logo from '../assets/Logo.png';

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      {/* Logo */}
      <motion.img
        src={logo}
        alt="Loading Logo"
        className="w-32 h-32 mb-6"
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{
          rotate: { repeat: Infinity, duration: 2, ease: 'linear' },
          scale: { repeat: Infinity, duration: 1.5, ease: 'easeInOut' },
        }}
      />

      {/* Loading text */}
      <motion.p
        className="text-lg font-semibold text-gray-700"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Loading...
      </motion.p>

      {/* Dots */}
      <div className="flex gap-2 mt-4">
        {[1, 2, 3].map((i) => (
          <motion.span
            key={i}
            className="w-3 h-3 rounded-full bg-gray-800"
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Loading;
