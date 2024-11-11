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
    <div className="bg-gray-50 dark:bg-gray-900 py-8 sm:py-12 lg:py-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-[100px]">
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="testimonial-swiper dark:testimonial-swiper-dark"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col-reverse md:flex-row items-center gap-6 md:gap-12 p-4">
                {/* Testimonial Content */}
                <div className="w-full md:w-2/3">
                  <blockquote className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed mb-4
                                       text-gray-700 dark:text-gray-200 transition-colors duration-300">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="text-center md:text-left">
                    <h3 className="text-lg font-semibold mb-1 
                                 text-gray-900 dark:text-white transition-colors duration-300">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                      {testimonial.position}
                    </p>
                  </div>
                </div>

                {/* Profile Image with Glow Effect */}
                <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-64 lg:h-64 
                              flex-shrink-0 mb-6 md:mb-0 relative group">
                  {/* Glow effect - only visible in dark mode */}
                  <div className="absolute inset-0 dark:bg-blue-500/20 rounded-full 
                                blur-2xl scale-110 opacity-0 dark:opacity-75 
                                group-hover:scale-125 group-hover:opacity-100 dark:group-hover:opacity-90 
                                transition-all duration-300 -z-10"></div>
                  
                  <div className="relative w-full h-full rounded-full overflow-hidden 
                                border-4 border-white dark:border-gray-700 
                                shadow-lg transition-transform duration-300 
                                group-hover:scale-105">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* MVP Badge with Glow */}
                    <div className="absolute bottom-0 right-0 group">
                      <div className="absolute inset-0 dark:bg-yellow-500/30 
                                    rounded-full blur-md scale-150 opacity-0 
                                    dark:opacity-75 transition-opacity duration-300"></div>
                      <img
                        src="/path-to-mvp-badge.png"
                        alt="MVP Badge"
                        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 
                                 relative z-10 transition-transform duration-300 
                                 group-hover:scale-110"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonial;

