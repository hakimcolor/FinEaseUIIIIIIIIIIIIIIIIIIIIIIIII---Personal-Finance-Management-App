import { Link } from 'react-router-dom';
import { 
  FiFacebook, 
  FiTwitter, 
  FiInstagram, 
  FiLinkedin,
  FiMail,
  FiPhone,
  FiMapPin,
  FiDollarSign,
  FiHeart,
  FiArrowUp
} from 'react-icons/fi';
import Logo from '../assets/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Add Transaction', path: '/add-transaction' },
    { name: 'My Transactions', path: '/my-transactions' },
    { name: 'Reports', path: '/reports' },
    { name: 'My Profile', path: '/myprofile' },
  ];

  const socialLinks = [
    { 
      name: 'Facebook', 
      icon: <FiFacebook size={20} />, 
      url: 'https://www.facebook.com/hakimcolorofficial',
      color: '#1877F2'
    },
    { 
      name: 'Twitter', 
      icon: <FiTwitter size={20} />, 
      url: 'https://x.com/hakimcolor',
      color: '#1DA1F2'
    },
    { 
      name: 'Instagram', 
      icon: <FiInstagram size={20} />, 
      url: 'https://www.instagram.com/hakim.color/',
      color: '#E4405F'
    },
    { 
      name: 'LinkedIn', 
      icon: <FiLinkedin size={20} />, 
      url: 'https://www.linkedin.com/in/md-azizul-hakim-b646b22a7',
      color: '#0A66C2'
    },
  ];

  return (
    <footer 
      className="relative"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.95)', color: 'white' }}
    >
      {/* Top Wave */}
      <div className="absolute top-0 left-0 right-0 -translate-y-full">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M0 60L60 52.5C120 45 240 30 360 22.5C480 15 600 15 720 20C840 25 960 35 1080 40C1200 45 1320 45 1380 45L1440 45V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z" 
            fill="rgba(0, 0, 0, 0.95)"
          />
        </svg>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-110 shadow-lg"
        style={{ backgroundColor: 'var(--color-primary)' }}
      >
        <FiArrowUp size={20} />
      </button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-16 pb-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src={Logo} alt="Money Manager" className="w-12 h-12 rounded-xl" />
              <div>
                <h3 className="text-xl font-bold" style={{ color: 'var(--color-primary)' }}>
                  Money Manager
                </h3>
                <p className="text-xs text-gray-400">Your Financial Partner</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Take control of your finances with our easy-to-use money management app. 
              Track expenses, set goals, and build a better financial future.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                  style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FiDollarSign style={{ color: 'var(--color-primary)' }} />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-primary)' }}></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FiMail style={{ color: 'var(--color-primary)' }} />
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li>
                <a 
                  href="mailto:hakimcolor777@gmail.com"
                  className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors text-sm"
                >
                  <FiMail className="mt-0.5 flex-shrink-0" style={{ color: 'var(--color-primary)' }} />
                  <span>hakimcolor777@gmail.com</span>
                </a>
              </li>
              <li>
                <a 
                  href="tel:+8801818777856"
                  className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors text-sm"
                >
                  <FiPhone className="mt-0.5 flex-shrink-0" style={{ color: 'var(--color-primary)' }} />
                  <span>+880 1818 777 856</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <FiMapPin className="mt-0.5 flex-shrink-0" style={{ color: 'var(--color-primary)' }} />
                <span>Jashore, Khulna<br />Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / App Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FiHeart style={{ color: 'var(--color-primary)' }} />
              Stay Connected
            </h4>
            <p className="text-gray-400 text-sm mb-4">
              Follow us on social media for tips, updates, and financial insights.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div 
                className="p-3 rounded-xl text-center"
                style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
              >
                <p className="text-xl font-bold" style={{ color: 'var(--color-primary)' }}>10K+</p>
                <p className="text-xs text-gray-400">Users</p>
              </div>
              <div 
                className="p-3 rounded-xl text-center"
                style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
              >
                <p className="text-xl font-bold" style={{ color: 'var(--color-success)' }}>$2M+</p>
                <p className="text-xs text-gray-400">Tracked</p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div 
          className="h-px mb-6"
          style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent)' }}
        ></div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <p>
            © {currentYear} <span style={{ color: 'var(--color-primary)' }}>Money Manager</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link to="/" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
          <p className="flex items-center gap-1">
            Made with <FiHeart className="text-red-500" size={14} /> by Azizul Hakim
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
