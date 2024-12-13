import React from 'react';
import { FaHeart } from 'react-icons/fa';

const FrequentlyPurchases = () => {
  const courses = [
    {
      title: 'Basic Fundamentals of User Experience Design',
      price: '₹399/-',
    //   image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80',
      instructor: 'Instructor Name, Degree/Qualification',
      rating: 4.5,
      reviews: 21
    },
    {
      title: 'Fundamentals of User Experience Principles',
      price: '₹999/-',
    //   image: 'https://images.unsplash.com/photo-1587440871875-191322ee64b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80',
      instructor: 'Instructor Name, Degree/Qualification',
      rating: 4.5,
      reviews: 21
    },
    {
      title: 'Basics of User Experience Design Patterns',
      price: '₹199/-',
    //   image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      instructor: 'Instructor Name, Degree/Qualification',
      rating: 4.5,
      reviews: 21
    },
    {
      title: 'Principles of User Experience & User Interface Design',
      price: '₹449/-',
    //   image: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      instructor: 'Instructor Name, Degree/Qualification',
      rating: 4.5,
      reviews: 21
    },
    {
      title: 'Laws & Principles of User Experience Design',
      price: '₹359/-',
    //   image: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      instructor: 'Instructor Name, Degree/Qualification',
      rating: 4.5,
      reviews: 21
    }
  ];

  return (
    <div className="w-full bg-[#f3f4f6] py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-xl font-semibold mb-6">Frequently Purchase Together</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {courses.map((course, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden relative group">
              {/* Price tag overlay */}
              <div className="absolute top-2 left-2 z-10">
                <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-sm font-medium">
                  {course.price}
                </span>
              </div>
              
              {/* Wishlist button */}
              <button className="absolute top-2 right-2 z-10 text-white hover:text-red-500 transition-colors">
                <FaHeart className="text-lg" />
              </button>

              {/* Course image */}
              <div className="relative h-32 overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-black/10"></div>
              </div>

              {/* Course details */}
              <div className="p-3">
                <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                  {course.title}
                </h3>
                <p className="text-xs text-gray-500 mb-2">
                  {course.instructor}
                </p>
                <div className="flex items-center text-sm">
                  <div className="flex text-yellow-400">
                    {'★'.repeat(Math.floor(course.rating))}
                  </div>
                  <span className="text-xs text-gray-500 ml-1">({course.reviews})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FrequentlyPurchases;