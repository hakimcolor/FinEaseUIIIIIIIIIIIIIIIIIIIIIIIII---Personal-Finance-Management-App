import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiGlobe, FiSend, FiLoader } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: '1402997f-6389-452f-a1ce-ab28fde9ce1d',
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          from_name: 'Money Manager Contact Form',
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Message sent successfully! We'll get back to you soon.");
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <FiMail size={30} />,
      title: 'Email Us',
      info: 'hakimcolor777@gmail.com',
      link: 'mailto:hakimcolor777@gmail.com',
    },
    {
      icon: <FiPhone size={30} />,
      title: 'Call Us',
      info: '+880 1818 777856',
      link: 'tel:+8801818777856',
    },
    {
      icon: <FiGlobe size={30} />,
      title: 'Portfolio',
      info: 'hakimcolorportfolio.vercel.app',
      link: 'https://hakimcolorportfolio.vercel.app/',
    },
  ];

  return (
    <div
      className="min-h-screen pt-24 pb-16 px-4"
      style={{ backgroundColor: 'var(--bg-color)' }}
    >
      <Toaster position="top-right" />
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
            Get In Touch
          </h1>
          <p
            className="text-lg md:text-xl max-w-3xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            Have questions? We'd love to hear from you. Send us a message and
            we'll respond as soon as possible.
          </p>
        </motion.div>

        {/* Contact Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {contactInfo.map((item, index) => (
            <motion.a
              key={index}
              href={item.link}
              target={item.link.startsWith('http') ? '_blank' : '_self'}
              rel={item.link.startsWith('http') ? 'noopener noreferrer' : ''}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="p-6 rounded-2xl card text-center hover:shadow-xl transition-all"
            >
              <div
                className="mb-4 flex justify-center"
                style={{ color: 'var(--color-primary)' }}
              >
                {item.icon}
              </div>
              <h3
                className="text-xl font-bold mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                {item.title}
              </h3>
              <p
                className="text-base"
                style={{ color: 'var(--text-secondary)' }}
              >
                {item.info}
              </p>
            </motion.a>
          ))}
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-3xl mx-auto p-8 rounded-2xl card"
        >
          <h2
            className="text-3xl font-bold mb-6 text-center"
            style={{ color: 'var(--text-primary)' }}
          >
            Send Us a Message
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  className="block mb-2 font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 disabled:opacity-50"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)',
                  }}
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label
                  className="block mb-2 font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 disabled:opacity-50"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)',
                  }}
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <div>
              <label
                className="block mb-2 font-semibold"
                style={{ color: 'var(--text-primary)' }}
              >
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 disabled:opacity-50"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)',
                }}
                placeholder="Enter your subject"
              />
            </div>
            <div>
              <label
                className="block mb-2 font-semibold"
                style={{ color: 'var(--text-primary)' }}
              >
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                rows="6"
                className="w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 resize-none disabled:opacity-50"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)',
                }}
                placeholder="Enter your message if you want to know anything"
              />
            </div>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 text-white rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: 'var(--color-primary)' }}
              whileHover={!isSubmitting ? { scale: 1.02 } : {}}
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
            >
              {isSubmitting ? (
                <>
                  <FiLoader className="animate-spin" /> Sending...
                </>
              ) : (
                <>
                  <FiSend /> Send Message
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
