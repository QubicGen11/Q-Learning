import React from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import './Mostelling.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MostSellingCourses = ({ courses }) => {
  const navigate = useNavigate();

  // Handle card click
  const handleCourseClick = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  // Custom arrow components
  const NextArrow = ({ className, style, onClick }) => {
    return (
      <div className={`custom-arrow next ${className}`} style={style} onClick={onClick}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gray-600">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    );
  };

  const PrevArrow = ({ className, style, onClick }) => {
    return (
      <div className={`custom-arrow prev ${className}`} style={style} onClick={onClick}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gray-600">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </div>
    );
  };

  // Add renderStars function
  const renderRating = (rating, reviewCount) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <span 
            key={star} 
            className={`text-lg ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          >
            ★
          </span>
        ))}
        <span className="ml-2 text-sm text-gray-600">
          ({rating} | {reviewCount || '121'})
        </span>
      </div>
    );
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className="bg-[#f2f9ff] py-16 relative">
      <div className="max-w-7xl mx-auto px-4 relative">
        <h2 className="text-3xl font-semibold text-center mb-12">Most Selling Courses</h2>
        
        <div className="relative">
          <Slider {...settings}>
            {courses.map((course) => (
              <div key={course.id} className="px-3">
                <div 
                  className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                  onClick={() => handleCourseClick(course.id)}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={course.categoryImage || course.courseBanner} 
                      alt={course.courseName} 
                      className="w-full h-48 object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-md text-sm">
                    {course.category}
                    </div>
                    <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-md text-sm flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                      </svg>
                      32 Enrolled
                    </div>
                  </div>
                  
                  <div className="p-4">
                    {/* Rating Stars */}
                    <div className="mb-2">
                      {renderRating(course.rating || 4.7)}
                    </div>
                    
                    <h3 className="font-medium text-lg mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {course.courseName}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">{course.trainerName}</p>
                    
                    {/* Price Section */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-blue-600">
                          ₹{course.courseSettings[0]?.settings.offeredPrice}/-
                        </span>
                        <span className="text-gray-400 line-through text-sm">
                          ₹{course.courseSettings[0]?.settings.price}/-
                        </span>
                      </div>
                      {course.courseSettings[0]?.settings.discount && (
                        <span className="bg-black text-white text-xs px-2 py-1 rounded">
                          {course.courseSettings[0]?.settings.discount}% Off | Black Friday Sale
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default MostSellingCourses;


