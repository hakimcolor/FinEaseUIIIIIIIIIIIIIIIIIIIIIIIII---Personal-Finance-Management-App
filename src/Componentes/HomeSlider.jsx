import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const TipsSlider = () => {
  const tips = [
    {
      _id: 't001',
      title: 'Start Small, Achieve Big',
      description:
        'Even tiny steps towards saving consistently can lead to remarkable financial growth over time.',
      image:
        'https://i.ibb.co.com/XxtFcLgx/Gemini-Generated-Image-fn9l19fn9l19fn9l.png',
      disclaimer:
        'This tip is for informational purposes only. Make financial decisions based on your personal situation.',
    },
    {
      _id: 't002',
      title: 'Track Your Expenses',
      description:
        'Monitoring your daily expenses helps you identify unnecessary spending and save more efficiently.',
      image:
        'https://i.ibb.co.com/7JNsCstH/AZr-BMMJOti2qt7-Qp-ouid-A-AZr-BMMJPmq73-IVPD4h1k-Ow.jpg',
      disclaimer:
        'This tip is for informational purposes only. Adapt advice to your own financial needs.',
    },
    {
      _id: 't003',
      title: 'Invest in Knowledge',
      description:
        'Learning about personal finance, investments, and money management pays the best returns in the long run.',
      image:
        'https://i.ibb.co.com/6cQV09Yq/Gemini-Generated-Image-y0acrqy0acrqy0ac.png',
      disclaimer:
        'This tip is for guidance only. Results may vary based on individual effort and situation.',
    },
    {
      _id: 't004',
      title: 'Build an Emergency Fund',
      description:
        'Set aside a small portion of your income regularly to prepare for unexpected financial events.',
      image:
        'https://i.ibb.co.com/7J3Rtt1S/Gemini-Generated-Image-hdtla0hdtla0hdtl.png',
      disclaimer:
        'This is general advice. Personal financial circumstances may require different actions.',
    },
    {
      _id: 't005',
      title: 'Automate Your Savings',
      description:
        'Automating transfers to your savings account ensures consistent growth without extra effort.',
      image:
        'https://i.ibb.co.com/VW537vtR/Gemini-Generated-Image-pb5gn8pb5gn8pb5g.png',
      disclaimer:
        'Information provided is educational. Adjust actions according to your financial goals.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto  px-4 py-8 rounded-3x">
      <h2 className="text-4xl sm:text-5xl font-extrabold text-center mb-10 text-teal-600 drop-shadow-md">
        💰 Money Management Inspirations
      </h2>

      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        className="rounded-3xl"
      >
        {tips.map((tip) => (
          <SwiperSlide key={tip._id}>
            <div className="flex flex-col md:flex-row items-center border border-teal-200 rounded-3xl p-6 md:p-8 bg-gradient-to-r from-white via-teal-50 to-green-50 shadow-lg hover:shadow-teal-400 transition duration-500 gap-6 md:gap-8">
              {/* Text Section */}
              <div className="flex-1 space-y-4">
                <h3 className="text-2xl sm:text-3xl font-bold text-teal-900">
                  {tip.title}
                </h3>
                <p className="text-gray-700 text-base sm:text-lg">
                  {tip.description}
                </p>
                <p className="text-sm sm:text-base text-gray-600 italic mt-1">
                  {tip.disclaimer}
                </p>
              </div>

              {/* Image Section */}
              <div
                className="flex-1 relative w-full md:w-[450px] lg:w-[550px]
mt-6 md:mt-0"
              >
                <img
                  src={tip.image}
                  alt={tip.title}
                  className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-cover rounded-2xl transform transition duration-700 hover:scale-105 shadow-md"
                />
                <div className="absolute inset-0 bg-teal-200 bg-opacity-10 rounded-2xl opacity-0 hover:opacity-30 transition duration-500"></div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TipsSlider;
