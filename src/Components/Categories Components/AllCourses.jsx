import React, { useState } from 'react';
import { FiFilter } from 'react-icons/fi';
import { BiSort } from 'react-icons/bi';

const AllCourses = () => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const courses = [
    {
      id: 1,
      title: 'Web Design Fundamentals',
      instructor: 'Instructor Name | Instructor Name',
      duration: '11 Total Hours',
      lectures: '44 lectures',
      level: 'Beginner',
      rating: 4.2,
      reviews: 418,
      currentPrice: '₹399/-',
      originalPrice: '₹1,999/-',
      thumbnail: 'https://res.cloudinary.com/devewerw3/image/upload/v1733726886/image-2_qyye1q.png',
      tag: 'Best Seller'
    },
    {
      id: 2,
      title: '2D Animation Masterclass',
      instructor: 'Instructor Name | Instructor Name',
      duration: '11 Total Hours',
      lectures: '44 lectures',
      level: 'Beginner',
      rating: 4.2,
      reviews: 418,
      currentPrice: '₹399/-',
      originalPrice: '₹1,999/-',
      thumbnail: 'https://res.cloudinary.com/devewerw3/image/upload/v1733726885/image_fbx6gp.png',
      tag: 'Best Seller'
    },
    {
      id: 3,
      title: 'Motion Design Advanced Course',
      instructor: 'Instructor Name | Instructor Name',
      duration: '11 Total Hours',
      lectures: '44 lectures',
      level: 'Advanced',
      rating: 4.2,
      reviews: 418,
      currentPrice: '₹399/-',
      originalPrice: '₹1,999/-',
      thumbnail: 'https://res.cloudinary.com/devewerw3/image/upload/v1733726887/image-3_vrgrlf.png',
      tag: 'Best Seller'
    },
    {
      id: 4,
      title: 'UX/UI Design Professional',
      instructor: 'Instructor Name | Instructor Name',
      duration: '11 Total Hours',
      lectures: '44 lectures',
      level: 'Intermediate',
      rating: 4.2,
      reviews: 418,
      currentPrice: '₹399/-',
      originalPrice: '₹1,999/-',
      thumbnail: 'https://res.cloudinary.com/devewerw3/image/upload/v1733726887/image-5_u4mnm5.png',
      tag: 'Trending'
    },
    {
      id: 5,
      title: 'Programming Languages Fundamentals',
      instructor: 'Instructor Name | Instructor Name',
      duration: '11 Total Hours',
      lectures: '44 lectures',
      level: 'Beginner',
      rating: 4.2,
      reviews: 418,
      currentPrice: '₹399/-',
      originalPrice: '₹1,999/-',
      thumbnail: 'https://res.cloudinary.com/devewerw3/image/upload/v1732872891/image_8_ai6uoo.png',
      tag: 'Hot'
    },
    {
      id: 6,
      title: 'Arts & Crafts Professional Course',
      instructor: 'Instructor Name | Instructor Name',
      duration: '11 Total Hours',
      lectures: '44 lectures',
      level: 'All Levels',
      rating: 4.2,
      reviews: 418,
      currentPrice: '₹399/-',
      originalPrice: '₹1,999/-',
      thumbnail: 'https://res.cloudinary.com/devewerw3/image/upload/v1732872891/image_7_e201id.png',
      tag: 'Best Seller'
    },
    {
      id: 7,
      title: 'R Programming A-Z™: R For Data Science',
      instructor: 'Instructor Name | Instructor Name',
      duration: '11 Total Hours',
      lectures: '44 lectures',
      level: 'Intermediate',
      rating: 4.2,
      reviews: 418,
      currentPrice: '₹399/-',
      originalPrice: '₹1,999/-',
      thumbnail: 'https://res.cloudinary.com/devewerw3/image/upload/v1733726889/image-11_s1glto.png',
      tag: 'Trending'
    },
    {
      id: 8,
      title: 'Angular & NodeJS - The MEAN Stack Guide',
      instructor: 'Instructor Name | Instructor Name',
      duration: '11 Total Hours',
      lectures: '44 lectures',
      level: 'Advanced',
      rating: 4.2,
      reviews: 418,
      currentPrice: '₹399/-',
      originalPrice: '₹1,999/-',
      thumbnail: 'https://res.cloudinary.com/devewerw3/image/upload/v1733726888/image-10_b1usms.png',
      tag: 'Hot'
    },
    {
      id: 9,
      title: 'Python for Data Science & Machine Learning',
      instructor: 'Instructor Name | Instructor Name',
      duration: '11 Total Hours',
      lectures: '44 lectures',
      level: 'All Levels',
      rating: 4.2,
      reviews: 418,
      currentPrice: '₹399/-',
      originalPrice: '₹1,999/-',
      thumbnail: 'https://res.cloudinary.com/devewerw3/image/upload/v1733726890/image-12_kamzak.png',
      tag: 'Best Seller'
    }
  ];

  const getTagColor = (tag) => {
    switch(tag) {
      case 'Best Seller':
        return 'bg-green-600';
      case 'Trending':
        return 'bg-purple-600';
      case 'Hot':
        return 'bg-orange-600';
      default:
        return 'bg-blue-600';
    }
  };

  return (
    <div className="bg-white py-12">
      <div className="max-w-[1400px] mx-auto px-16">
        {/* Header with Filter and Sort */}
       <h1   className=' font-medium text-black text-xl mb-5'> All Design courses</h1>
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50 text-[#0056B3]">
              <FiFilter className="w-5 h-5" />
              Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50 text-[#0056B3]">
              <BiSort className="w-5 h-5" />
              Sort by
            </button>
          </div>
          <span className="text-gray-600">10,000 RESULTS</span>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
              {/* Course Image */}
              <div className="relative">
                <img 
                  src={course.thumbnail} 
                  alt={course.title}
                  className="w-full h-48 object-cover transition-all duration-300 hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  {course.tag && (
                    <span className={`px-2 py-1 text-xs rounded ${getTagColor(course.tag)} text-white`}>
                      {course.tag}
                    </span>
                  )}
                </div>
                <div className="absolute bottom-3 right-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{course.currentPrice}</span>
                    <span className="text-xs text-gray-300 line-through">{course.originalPrice}</span>
                  </div>
                </div>
              </div>

              {/* Course Content */}
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-800 mb-2">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{course.instructor}</p>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <span>{course.duration}</span>
                  <span className="mx-1">•</span>
                  <span>{course.lectures}</span>
                  <span className="mx-1">•</span>
                  <span>{course.level}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, index) => (
                      <svg key={index} className={`w-4 h-4 ${index < Math.floor(course.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({course.rating}) • {course.reviews}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-8">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            className="px-3 py-1 border rounded-md hover:bg-gray-50"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 rounded-full ${
                currentPage === page 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}
          <span>...</span>
          <button 
            onClick={() => setCurrentPage(prev => prev + 1)}
            className="px-3 py-1 border rounded-md hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllCourses;