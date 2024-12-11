import React, { useRef } from 'react';
import Slider from 'react-slick';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Featuredsection.css';

const Featuredsection = () => {
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    fade: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  const courses = [
    {
      id: 1,
      title: 'Web Design Fundamentals',
      description: 'Master the core principles of web design and create stunning responsive websites.',
      instructor: 'Sarah Wilson, Web Design Expert',
      lastUpdated: 'Last Updated June 2023',
      totalHours: '45 Hours of Learning',
      lectures: '220 Lectures',
      level: 'Beginner',
      rating: '4.8',
      reviews: '320',
      currentPrice: '₹399/-',
      originalPrice: '₹2,999/-',
      thumbnail: 'https://media.istockphoto.com/id/1480095869/photo/student-or-man-use-computer-for-elearning-education-online-internet-technology-webinar-online.jpg?s=612x612&w=0&k=20&c=uQ-iVnJGi8O9T6rxI546QNFCLeQAVR9JNMwEm37c94k=',
      category: 'Web Design'
    },
    {
      id: 2,
      title: '2D Animation Masterclass',
      description: 'Learn professional 2D animation techniques from industry experts.',
      instructor: 'Michael Chen, Animation Director',
      lastUpdated: 'Last Updated May 2023', 
      totalHours: '50 Hours of Learning',
      lectures: '280 Lectures',
      level: 'Intermediate',
      rating: '4.9',
      reviews: '450',
      currentPrice: '₹499/-',
      originalPrice: '₹3,499/-',
      thumbnail: 'https://media.istockphoto.com/id/1300822108/photo/group-of-unrecognisable-international-students-having-online-meeting.jpg?s=612x612&w=0&k=20&c=-X6IUTSdDMfJrFdQFhrDuwhnMrM1BLjfrLzydpibCTA=',
      category: 'Animation'
    },
    {
      id: 3,
      title: 'Motion Design Advanced Course',
      description: 'Take your motion design skills to the next level with advanced techniques.',
      instructor: 'David Miller, Motion Designer',
      lastUpdated: 'Last Updated July 2023',
      totalHours: '55 Hours of Learning',
      lectures: '300 Lectures',
      level: 'Advanced',
      rating: '4.7',
      reviews: '280',
      currentPrice: '₹599/-',
      originalPrice: '₹3,999/-',
      thumbnail: 'https://media.istockphoto.com/id/1500285927/photo/young-woman-a-university-student-studying-online.jpg?s=612x612&w=0&k=20&c=yvFDnYMNEJ6WEDYrAaOOLXv-Jhtv6ViBRXSzJhL9S_k=',
      category: 'Motion Design'
    }
  ];

  return (
    <div className="bg-[#f2f9ff]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16 py-6 sm:py-12">
        {/* Header with navigation buttons */}
        <div className="flex justify-between items-center mb-4 sm:mb-8">
          <h2 className="text-lg sm:text-[22px] font-medium text-gray-800">Featured courses</h2>
          <div className="flex gap-2 sm:gap-3">
            <button 
              onClick={() => sliderRef.current?.slickPrev()}
              className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full border border-gray-300 hover:bg-white transition-colors"
            >
              <FiChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button 
              onClick={() => sliderRef.current?.slickNext()}
              className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full border border-gray-300 hover:bg-white transition-colors"
            >
              <FiChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Course Carousel */}
        <Slider ref={sliderRef} {...settings}>
          {courses.map((course) => (
            <div key={course.id}>
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex flex-col lg:flex-row">
                  {/* Left side - Image */}
                  <div className="relative w-full lg:w-[360px]">
                    <div className="absolute top-3 left-3 bg-[#0056B3] text-white text-xs px-2 py-1 rounded">
                      {course.category}
                    </div>
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
                      className="w-full h-[200px] sm:h-[250px] lg:h-[300px] object-cover"
                    />
                  </div>

                  {/* Right side - Content */}
                  <div className="flex-1 p-4 sm:p-6 lg:p-8">
                    <h3 className="text-base sm:text-lg lg:text-xl font-medium text-gray-800 mb-2">
                      {course.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 hidden sm:block">
                      {course.description}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">
                      {course.instructor}
                    </p>
                    
                    <div className="flex flex-wrap items-center text-[10px] sm:text-xs text-gray-500 gap-1 sm:gap-2 mb-3 sm:mb-4">
                      <span>{course.lastUpdated}</span>
                      <span>•</span>
                      <span>{course.totalHours}</span>
                      <span>•</span>
                      <span>{course.lectures}</span>
                      <span>•</span>
                      <span>{course.level}</span>
                    </div>

                    <div className="flex items-center gap-2 mb-3 sm:mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, index) => (
                          <svg key={index} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" 
                            className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400">
                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-xs sm:text-sm">({course.rating}) • {course.reviews} Reviews</span>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="text-lg sm:text-xl font-bold text-[#0056B3]">{course.currentPrice}</span>
                      <span className="text-xs sm:text-sm text-gray-500 line-through">{course.originalPrice}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Featuredsection;