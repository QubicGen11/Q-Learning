import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import './Testimonial.css';

const testimonials = [
  {
    quote: "Being up to date and familiar with the latest web development technologies is very essential in today's digital landscape. The QLearning Academy offers a comprehensive overview of training and development opportunities in full-stack development. It is the perfect platform to develop, acquire new knowledge, and prepare for a successful career in web development. From beginner to expert, many different learning paths are available. It's a great initiative to bring coding education to everyone!",
    name: "Michael Anderson",
    position: "Senior Full Stack Developer, TechCorp Inc.",
    // image: "https://staticcontent.cdn.contentraven.com/crcloud/pages/11218/1/en-us/images/slide_img1.png" // Replace with actual image path
  },
  {
    quote: "The curriculum at QLearning Academy perfectly balances theoretical knowledge with practical applications. Their modern approach to teaching web development concepts has helped countless students transition into successful developers. The hands-on projects and real-world scenarios make learning both engaging and effective.",
    name: "Sarah Johnson",
    position: "Lead Frontend Developer, Innovation Labs",
    // image: "https://i.ytimg.com/vi/yxtJaPX8MfU/oar2.jpg?sqp=-oaymwEYCJUDENAFSFqQAgHyq4qpAwcIARUAAIhC&rs=AOn4CLBkdYToPX0d37BrQdhnTQhiPGWxxA"
  },

];

const Testimonial = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-6 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          navigation={{
            enabled: true,
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next',
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="testimonial-swiper"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col items-center px-4 sm:px-8">
                {/* Profile Image */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mb-6">
                  <img
                    src={testimonial.image || '/default-avatar.png'}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-sm sm:text-base text-gray-700 dark:text-gray-200 
                                     text-center mb-6 relative max-w-2xl mx-auto">
                  {/* Add large quotes for decoration */}
                  <span className="absolute top-0 left-0 text-4xl text-gray-200 -translate-x-4 -translate-y-4">
                    "
                  </span>
                  <p className="relative z-10">
                    {testimonial.quote}
                  </p>
                  <span className="absolute bottom-0 right-0 text-4xl text-gray-200 translate-x-4 translate-y-4">
                    "
                  </span>
                </blockquote>

                {/* Author Info */}
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.position}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}

          {/* Custom Navigation Buttons - Hidden on Mobile */}
          <div className="hidden sm:block">
            <button className="swiper-button-prev !w-10 !h-10 !bg-white !shadow-md !rounded-full
                              !left-2 sm:!left-4 after:!text-gray-600 hover:!bg-gray-50">
            </button>
            <button className="swiper-button-next !w-10 !h-10 !bg-white !shadow-md !rounded-full
                              !right-2 sm:!right-4 after:!text-gray-600 hover:!bg-gray-50">
            </button>
          </div>
        </Swiper>
      </div>

      <style jsx global>{`
        .testimonial-swiper .swiper-button-next,
        .testimonial-swiper .swiper-button-prev {
          top: 50%;
          transform: translateY(-50%);
        }

        .testimonial-swiper .swiper-button-next:after,
        .testimonial-swiper .swiper-button-prev:after {
          font-size: 1.2rem;
          font-weight: bold;
        }

        @media (max-width: 640px) {
          .testimonial-swiper .swiper-button-next,
          .testimonial-swiper .swiper-button-prev {
            display: none;
          }

          .testimonial-swiper .swiper-slide {
            padding: 0 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Testimonial;

