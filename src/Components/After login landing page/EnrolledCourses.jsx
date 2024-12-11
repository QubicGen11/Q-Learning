import React from 'react';
import { Link } from 'react-router-dom';

const EnrolledCourses = () => {
  const courses = [
  
    {
      id: 2,
      title: 'WEB DESIGN',
      subtitle: '1. Welcome & Getting Started!',
      chapter: '1st Chapter',
      duration: '5 Mins',
      thumbnail: 'https://res.cloudinary.com/devewerw3/image/upload/v1733726886/image-2_qyye1q.png'
    },
    {
      id: 3,
      title: '2D ANIMATION',
      subtitle: '1. Introduction and Objectives',
      chapter: '1st Chapter',
      duration: '5 Mins',
      thumbnail: 'https://res.cloudinary.com/devewerw3/image/upload/v1733726885/image_fbx6gp.png'
    },
    {
      id: 4,
      title: 'MOTION DESIGN',
      subtitle: '1. Getting Started with Motion',
      chapter: '1st Chapter',
      duration: '5 Mins',
      thumbnail: 'https://res.cloudinary.com/devewerw3/image/upload/v1733726887/image-3_vrgrlf.png'
    },
    {
      id: 5,
      title: 'UX UI DESIGN',
      subtitle: '1. UX UI Fundamentals',
      chapter: '1st Chapter',
      duration: '5 Mins',
      thumbnail: 'https://res.cloudinary.com/devewerw3/image/upload/v1733726887/image-5_u4mnm5.png'
    },
    {
      id: 6,
      title: 'BASIC FUNDAMENTALS OF PROGRAMMING LANGUAGES',
      subtitle: '1. Programming Basics',
      chapter: '1st Chapter',
      duration: '5 Mins',
      thumbnail: 'https://res.cloudinary.com/devewerw3/image/upload/v1732872891/image_8_ai6uoo.png'
    },

    {
      id: 8,
      title: 'CONCEPTS OF BOOK CONTENT CREATION',
      subtitle: '1. Content Creation Basics',
      chapter: '1st Chapter',
      duration: '5 Mins',
      thumbnail: 'https://res.cloudinary.com/devewerw3/image/upload/v1732872889/image_9_zafwev.png'
    }
  ];

  return (
    <div className="px-6 py-8 bg-[#F8F9FA]">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl text-[#1B1B1B] font-bold">Enrolled Courses</h2>
          <Link className="text-[#0056B3] font-medium text-sm">MY LEARNINGS</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {courses.map((course) => (
            <div key={course.id} className="flex bg-white rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              {/* Thumbnail Container */}
              <div className="relative w-[120px] h-[100px] flex-shrink-0 overflow-hidden">
                <img 
                  src={course.thumbnail} 
                  alt={course.title} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <button className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653Z" />
                    </svg>
                  </div>
                </button>
                <div className="absolute bottom-1 left-1 flex items-center space-x-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <span>{course.duration}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-3 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-xs font-medium text-[#1B1B1B] mb-1">{course.title}</h3>
                  <p className="text-xs text-gray-600 mb-1">{course.subtitle}</p>
                </div>
                <p className="text-[11px] text-gray-400">{course.chapter}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnrolledCourses;