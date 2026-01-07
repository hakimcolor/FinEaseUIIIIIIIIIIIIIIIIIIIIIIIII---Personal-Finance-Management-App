import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { FiTrendingUp, FiTarget, FiShield, FiPieChart, FiArrowRight, FiCheck } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const HomeSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    {
      id: 1,
      badge: 'Financial Freedom',
      title: 'Take Control of',
      highlight: 'Your Money',
      description: 'Track every dollar, understand your spending habits, and make smarter financial decisions with powerful insights.',
      features: ['Real-time tracking', 'Smart insights', 'Secure & private'],
      icon: <FiTrendingUp />,
      cta: 'Start Free',
      link: '/signup',
      stat: { value: '10K+', label: 'Active Users' }
    },
    {
      id: 2,
      badge: 'Goal Setting',
      title: 'Achieve Your',
      highlight: 'Financial Goals',
      description: 'Set savings targets, track your progress, and celebrate milestones. Turn your dreams into achievable goals.',
      features: ['Custom goals', 'Progress tracking', 'Milestone alerts'],
      icon: <FiTarget />,
      cta: 'Set Goals',
      link: '/add-transaction',
      stat: { value: '$2M+', label: 'Goals Achieved' }
    },
    {
      id: 3,
      badge: 'Security First',
      title: 'Build Your',
      highlight: 'Emergency Fund',
      description: 'Prepare for the unexpected. Build a safety net that gives you peace of mind and financial security.',
      features: ['Auto-save rules', 'Fund calculator', 'Smart reminders'],
      icon: <FiShield />,
      cta: 'Get Started',
      link: '/signup',
      stat: { value: '98%', label: 'User Satisfaction' }
    },
    {
      id: 4,
      badge: 'Analytics',
      title: 'Understand Your',
      highlight: 'Spending Patterns',
      description: 'Beautiful charts and detailed reports help you see exactly where your money goes each month.',
      features: ['Visual reports', 'Category breakdown', 'Monthly trends'],
      icon: <FiPieChart />,
      cta: 'View Demo',
      link: '/reports',
      stat: { value: '50+', label: 'Report Types' }
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-4 pb-8">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ 
          clickable: true,
          el: '.custom-pagination',
        }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop={true}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="rounded-3xl overflow-hidden"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div 
              className="card rounded-3xl p-6 sm:p-8 lg:p-12 min-h-[420px] sm:min-h-[450px] lg:min-h-[480px] relative overflow-hidden"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 right-0 w-96 h-96 rounded-full" style={{ backgroundColor: 'var(--color-primary)', filter: 'blur(100px)' }}></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full" style={{ backgroundColor: 'var(--color-secondary)', filter: 'blur(80px)' }}></div>
              </div>

              <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12 h-full">
                {/* Left Content */}
                <div className="flex-1 text-center lg:text-left">
                  {/* Badge */}
                  <div 
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
                    style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}
                  >
                    {slide.icon}
                    {slide.badge}
                  </div>

                  {/* Title */}
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4" style={{ color: 'var(--text-primary)' }}>
                    {slide.title}{' '}
                    <span style={{ color: 'var(--color-primary)' }}>{slide.highlight}</span>
                  </h1>

                  {/* Description */}
                  <p className="text-base sm:text-lg mb-6 max-w-xl mx-auto lg:mx-0 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {slide.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
                    {slide.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                        <FiCheck style={{ color: 'var(--color-success)' }} />
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                    <Link
                      to={slide.link}
                      className="inline-flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
                      style={{ backgroundColor: 'var(--color-primary)' }}
                    >
                      {slide.cta}
                      <FiArrowRight />
                    </Link>
                  </div>
                </div>

                {/* Right Content - Stats Card */}
                <div className="flex-shrink-0 w-full lg:w-auto">
                  <div 
                    className="rounded-2xl p-6 sm:p-8 text-center lg:text-left max-w-sm mx-auto"
                    style={{ backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)' }}
                  >
                    {/* Icon */}
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl mb-4 mx-auto lg:mx-0"
                      style={{ backgroundColor: 'var(--color-primary)' }}
                    >
                      {slide.icon}
                    </div>

                    {/* Stat */}
                    <div className="mb-4">
                      <p className="text-4xl sm:text-5xl font-bold" style={{ color: 'var(--color-primary)' }}>
                        {slide.stat.value}
                      </p>
                      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                        {slide.stat.label}
                      </p>
                    </div>

                    {/* Mini Features */}
                    <div className="space-y-2">
                      {slide.features.slice(0, 2).map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-primary)' }}></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination */}
      <div className="flex items-center justify-center gap-6 mt-6">
        {/* Slide Indicators */}
        <div className="flex items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex ? 'w-8' : 'w-2'
              }`}
              style={{ 
                backgroundColor: index === activeIndex ? 'var(--color-primary)' : 'var(--border-color)'
              }}
            />
          ))}
        </div>

        {/* Slide Counter */}
        <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
          <span style={{ color: 'var(--text-primary)' }} className="font-semibold">{String(activeIndex + 1).padStart(2, '0')}</span>
          {' / '}
          {String(slides.length).padStart(2, '0')}
        </div>
      </div>
    </div>
  );
};

export default HomeSlider;
