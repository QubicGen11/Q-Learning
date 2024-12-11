import React from 'react';
import Slider from 'react-slick';
import './Mostelling.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MostSellingCourses = () => {
  const courses = [
    {
      title: "Basic Fundamentals of programming languages",
      image: "https://res.cloudinary.com/devewerw3/image/upload/v1732872891/image_8_ai6uoo.png",
      rating: 4.7,
      reviews: 121,
      currentPrice: "299/-",
      originalPrice: "3299/-",
      enrolled: "32,000",
      instructor: "Instructor Name, Degree/Qualification",
      tag: "Best Seller",
      tagColor: "bg-emerald-500"
    },
    {
      title: "Fundamentals of Arts & Crafts by professional",
      image: "https://res.cloudinary.com/devewerw3/image/upload/v1732872891/image_7_e201id.png",
      rating: 4.8,
      reviews: 1128,
      currentPrice: "99/-",
      originalPrice: "1499/-",
      enrolled: "32,000",
      instructor: "Instructor Name, Degree/Qualification",
      tag: "40% Off | Black Friday Sale",
      tagColor: "bg-gray-800"
    },
    {
      title: "Concepts of book content creation, writing & publishing methods",
      image: "https://res.cloudinary.com/devewerw3/image/upload/v1732872889/image_9_zafwev.png",
      rating: 3.8,
      reviews: 106,
      currentPrice: "459/-",
      originalPrice: "1499/-",
      enrolled: "32,000",
      instructor: "Instructor Name, Degree/Qualification",
      tag: "Trending 🔥",
      tagColor: "bg-purple-600"
    },
    {
      title: "Concepts of book content creation, writing & publishing methods",
      image: "https://res.cloudinary.com/devewerw3/image/upload/v1732872889/image_9_zafwev.png",
      rating: 3.8,
      reviews: 106,
      currentPrice: "459/-",
      originalPrice: "1499/-",
      enrolled: "32,000",
      instructor: "Instructor Name, Degree/Qualification",
      tag: "Trending 🔥",
      tagColor: "bg-purple-600"
    },
    {
      title: "Concepts of book content creation, writing & publishing methods",
      image: "https://res.cloudinary.com/devewerw3/image/upload/v1732872889/image_9_zafwev.png",
      rating: 3.8,
      reviews: 106,
      currentPrice: "459/-",
      originalPrice: "1499/-",
      enrolled: "32,000",
      instructor: "Instructor Name, Degree/Qualification",
      tag: "Trending 🔥",
      tagColor: "bg-purple-600"
    },
  ];

  // Custom arrow components
  const NextArrow = ({ className, style, onClick }) => {
    return (
      <div
        className={`custom-arrow next ${className}`}
        style={style}
        onClick={onClick}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor"
          className="text-gray-600"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M9 5l7 7-7 7" 
          />
        </svg>
      </div>
    );
  };

  const PrevArrow = ({ className, style, onClick }) => {
    return (
      <div
        className={`custom-arrow prev ${className}`}
        style={style}
        onClick={onClick}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor"
          className="text-gray-600"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M15 19l-7-7 7-7" 
          />
        </svg>
      </div>
    );
  };

  // Slider settings
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
            {courses.map((course, index) => (
              <div key={index} className="px-3">
                <div className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="relative overflow-hidden">
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="w-full h-48 object-cover transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:rotate-1"
                    />
                    <div className="absolute top-4 left-4 bg-[#0056b3] text-white px-3 py-1 rounded-md text-sm">
                      Course Category
                    </div>
                    <div className="absolute top-4 right-4 bg-white rounded-md px-2 py-1 flex items-center text-sm">
                      <span className="mr-1">👥</span>
                      <span>{course.enrolled} Enrolled</span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-400">★</span>
                      ))}
                      <span className="ml-2 text-sm">({course.rating} | {course.reviews})</span>
                    </div>
                    
                    <h3 className="font-medium text-lg mb-2 group-hover:text-[#0056b3] transition-colors duration-300">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">{course.instructor}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-[#0056b3] font-bold">₹{course.currentPrice}</span>
                        <span className="ml-2 text-gray-400 line-through">₹{course.originalPrice}</span>
                      </div>
                      <span className={`${course.tagColor} text-white text-sm px-2 py-1 rounded transition-transform duration-300 group-hover:scale-105`}>
                        {course.tag}
                      </span>
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


