import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiHome, FiArrowLeft, FiAlertCircle, FiDollarSign } from 'react-icons/fi';

const NotFound = () => {
  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-color)' }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full opacity-10"
          style={{ backgroundColor: 'var(--color-danger)', filter: 'blur(100px)' }}
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full opacity-10"
          style={{ backgroundColor: 'var(--color-primary)', filter: 'blur(80px)' }}
          animate={{ 
            scale: [1.2, 1, 1.2],
            x: [0, -30, 0],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Floating Coins */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${10 + (i * 12)}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.4,
            }}
          >
            <FiDollarSign 
              size={24 + i * 4} 
              style={{ color: 'var(--color-primary)' }}
            />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-lg">
        {/* 404 Number */}
        <motion.div
          className="relative mb-6"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
        >
          <h1 
            className="text-[150px] sm:text-[200px] font-black leading-none select-none"
            style={{ 
              color: 'var(--color-danger)',
              textShadow: '0 10px 30px rgba(239, 68, 68, 0.3)',
              opacity: 0.9
            }}
          >
            404
          </h1>
          
          {/* Alert Icon */}
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div 
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--bg-card)', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}
            >
              <FiAlertCircle size={40} style={{ color: 'var(--color-danger)' }} />
            </div>
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h2 
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ color: 'var(--text-primary)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Oops! Page Not Found
        </motion.h2>

        {/* Description */}
        <motion.p 
          className="text-base sm:text-lg mb-8 leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Looks like this page went on a spending spree and got lost! 
          Don't worry, your finances are still safe with us.
        </motion.p>

        {/* Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link to="/">
            <motion.button
              className="flex items-center justify-center gap-2 px-8 py-4 text-white font-semibold rounded-xl transition-all w-full sm:w-auto"
              style={{ backgroundColor: 'var(--color-primary)' }}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(13, 148, 136, 0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              <FiHome size={20} />
              Go Home
            </motion.button>
          </Link>
          
          <motion.button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-8 py-4 font-semibold rounded-xl transition-all border-2 cursor-pointer"
            style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
            whileHover={{ scale: 1.05, borderColor: 'var(--color-primary)' }}
            whileTap={{ scale: 0.95 }}
          >
            <FiArrowLeft size={20} />
            Go Back
          </motion.button>
        </motion.div>

        {/* Fun Stats */}
        <motion.div 
          className="mt-12 grid grid-cols-3 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div 
            className="p-4 rounded-xl"
            style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
          >
            <p className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>$0</p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Lost here</p>
          </div>
          <div 
            className="p-4 rounded-xl"
            style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
          >
            <p className="text-2xl font-bold" style={{ color: 'var(--color-success)' }}>100%</p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Data safe</p>
          </div>
          <div 
            className="p-4 rounded-xl"
            style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
          >
            <p className="text-2xl font-bold" style={{ color: 'var(--color-secondary)' }}>∞</p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Possibilities</p>
          </div>
        </motion.div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <motion.path 
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
            fill="var(--color-primary)"
            fillOpacity="0.1"
            animate={{
              d: [
                "M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z",
                "M0 120L60 90C120 60 240 45 360 52.5C480 60 600 90 720 97.5C840 105 960 90 1080 75C1200 60 1320 45 1380 37.5L1440 30V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z",
                "M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              ]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
      </div>
    </div>
  );
};

export default NotFound;
