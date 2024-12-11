import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CategoriesTopsec = () => {
  const [activeTab, setActiveTab] = useState('Most Popular');

  const categories = [
    'UX Design', 'Web Design', 'Graphic Design & Illustration', 
    'Design Tools', 'Game Design', '3D Animation', 
    'Fashion Design', 'Architectural Design', 'Leadership'
  ];

  const courses = [
    {
      id: 1,
      title: 'Basic Fundamentals of User Experience Design',
      instructor: 'Instructor Name, Degree/Qualification',
      rating: '(21)',
      price: '₹399',
      image: 'https://res.cloudinary.com/devewerw3/image/upload/v1733726889/image-11_s1glto.png'
    },
    {
      id: 1,
      title: 'Basic Fundamentals of User Experience Design',
      instructor: 'Instructor Name, Degree/Qualification',
      rating: '(21)',
      price: '₹399',
      image: 'https://res.cloudinary.com/devewerw3/image/upload/v1733726889/image-11_s1glto.png'
    },
    {
      id: 1,
      title: 'Basic Fundamentals of User Experience Design',
      instructor: 'Instructor Name, Degree/Qualification',
      rating: '(21)',
      price: '₹399',
      image: 'https://res.cloudinary.com/devewerw3/image/upload/v1733726889/image-11_s1glto.png'
    },
    {
      id: 1,
      title: 'Basic Fundamentals of User Experience Design',
      instructor: 'Instructor Name, Degree/Qualification',
      rating: '(21)',
      price: '₹399',
      image: 'https://res.cloudinary.com/devewerw3/image/upload/v1733726889/image-11_s1glto.png'
    },
    {
      id: 1,
      title: 'Basic Fundamentals of User Experience Design',
      instructor: 'Instructor Name, Degree/Qualification',
      rating: '(21)',
      price: '₹399',
      image: 'https://res.cloudinary.com/devewerw3/image/upload/v1733726889/image-11_s1glto.png'
    },
   
   
  ];

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-[#0056B3] text-white py-4">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
          <h1 className="text-xl sm:text-2xl font-semibold text-center">Design</h1>
          <div className="flex items-center text-xs sm:text-sm mt-1 justify-center">
            <Link to="/" className="hover:underline">Home</Link>
            <span className="mx-2">›</span>
            <span>Design</span>
          </div>
        </div>
      </div>

      {/* Categories Navigation */}
      <div className="border-b overflow-x-auto">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
          <div className="flex space-x-8 py-4 min-w-max">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`text-gray-600 whitespace-nowrap hover:text-[#0056B3] focus:outline-none text-xs sm:text-sm
                  ${index === 0 ? 'text-[#0056B3]' : ''}`}
              >
                {category}
              </button>
            ))}
            <button className="text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16 py-6 sm:py-8">
        <h2 className="text-lg sm:text-xl font-semibold mb-2">UX Design</h2>
        <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">Courses to get you started</p>
        
        {/* Course Filters */}
        <div className="flex space-x-4 sm:space-x-6 mb-6 sm:mb-8 border-b overflow-x-auto">
          {['Most Popular', 'New', 'Trending'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-xs sm:text-sm whitespace-nowrap ${
                activeTab === tab
                  ? 'text-[#0056B3] border-b-2 border-[#0056B3]'
                  : 'text-gray-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {courses.map((course) => (
            <div 
              key={course.id} 
              className="bg-white rounded-lg hover:shadow-md transition-all duration-300 cursor-pointer group"
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-32 sm:h-36 object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-2 left-2 bg-[#0056B3] text-white text-xs px-2 py-1 rounded">
                  {course.price}
                </div>
              </div>
              <div className="p-2 sm:p-3">
                <h3 className="text-xs sm:text-sm font-medium text-gray-800 mb-1 line-clamp-2 group-hover:text-[#0056B3] transition-colors duration-300">
                  {course.title}
                </h3>
                <p className="text-[10px] sm:text-xs text-gray-500 mb-1">
                  {course.instructor}
                </p>
                <div className="flex items-center text-[10px] sm:text-xs text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-yellow-400 mr-1">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                  <span>{course.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesTopsec;