import React from 'react'
import { Link } from 'react-router-dom'

const Becauseyouhaveviewd = () => {
  const courses = [
    {
      id: 1,
      title: 'Basic Fundamentals of User Experience Design',
      instructor: 'Instructor Name, Degree/Qualification',
      rating: '21',
      currentPrice: '₹399',
      thumbnail: 'https://res.cloudinary.com/devewerw3/image/upload/v1733726889/image-11_s1glto.png'
    },
    {
      id: 2,
      title: 'Fundamentals of User Experience Principles',
      instructor: 'Instructor Name, Degree/Qualification',
      rating: '21',
      currentPrice: '₹299',
      thumbnail: 'https://res.cloudinary.com/devewerw3/image/upload/v1733726888/image-10_b1usms.png'
    },
    {
      id: 3,
      title: 'Basics of User Experience Design Patterns',
      instructor: 'Instructor Name, Degree/Qualification',
      rating: '23',
      currentPrice: '₹199',
      thumbnail: 'https://res.cloudinary.com/devewerw3/image/upload/v1733726890/image-12_kamzak.png'
    },
    {
      id: 4,
      title: 'Principles of User Experience & User Interface Design',
      instructor: 'Instructor Name, Degree/Qualification',
      rating: '21',
      currentPrice: '₹449',
      thumbnail: 'https://res.cloudinary.com/devewerw3/image/upload/v1733726886/image-2_qyye1q.png'
    },
    {
      id: 5,
      title: 'Laws & Principles of User Experience Design',
      instructor: 'Instructor Name, Degree/Qualification',
      rating: '21',
      currentPrice: '₹359',
      thumbnail: 'https://res.cloudinary.com/devewerw3/image/upload/v1733726885/image_fbx6gp.png'
    }
  ];

  return (
    <div className="px-6 py-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-4">
          <p className="text-lg font-bold">
            Because you viewed "<Link to="#" className="text-[#0056B3] font-bold hover:underline">Usability and UX</Link>"
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
              {/* Thumbnail */}
              <div className="relative overflow-hidden">
                <img 
                  src={course.thumbnail} 
                  alt={course.title} 
                  className="w-full aspect-[4/3] object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-2 left-2 bg-[#0056B3] text-white text-xs px-2 py-1 rounded">
                  {course.currentPrice}
                </div>
              </div>

              {/* Content */}
              <div className="p-3">
                <h3 className="text-sm font-medium text-[#1B1B1B] mb-2 line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-xs text-gray-500 mb-2">
                  {course.instructor}
                </p>
                <div className="flex items-center text-xs text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-400 mr-1">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                  <span>({course.rating})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Becauseyouhaveviewd