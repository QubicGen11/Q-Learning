import React from 'react';
import { FaHeart } from 'react-icons/fa';

const Instructor = () => {
  const instructor = {
    name: "Brendan Bolton-Klinger",
    title: "University Professor & UX Research Practitioner",
    students: "15,490",
    rating: "4.7",
    description: "Bolton-Klinger has taught User Experience (UX) and Interaction Design classes for almost two decades at University California Los Angeles, General Assembly, Pratt Institute, and the School of Visual Arts. He is a consultant, cofounder of several funded startups, and previously a UX Lead at Huge, specializing in the design of digital experiences, ranging from mobile applications, to large transactional and content sites. When not doing UX or teaching, he keeps busy herding toddlers and dogs."
  };

  const instructorCourses = [
    {
      title: "Basic Fundamentals of User Experience Design",
      image: "https://images.unsplash.com/photo-1587440871875-191322ee64b0",
      price: "₹399/-",
      originalPrice: "₹3,999/-",
      rating: 4.7,
      reviews: 418,
      instructor: "Instructor Name",
      instructorTitle: "Instructor Name"
    },
    {
      title: "Basic Fundamentals of User Experience Design",
      image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c",
      price: "₹399/-",
      originalPrice: "₹3,999/-",
      rating: 4.7,
      reviews: 418,
      instructor: "Instructor Name",
      instructorTitle: "Instructor Name"
    },
    {
      title: "Basic Fundamentals of User Experience Design",
      image: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28",
      price: "₹399/-",
      originalPrice: "₹3,999/-",
      rating: 4.7,
      reviews: 418,
      instructor: "Instructor Name",
      instructorTitle: "Instructor Name"
    }
  ];

  return (
    <div className="w-full bg-[#f3f4f6] py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Instructor Profile Section */}
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-4">Instructor</h2>
            <div className="flex items-start gap-4">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e" 
                alt={instructor.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[#0056D2]">{instructor.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{instructor.title}</p>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <span>{instructor.students} Students</span>
                  <span>★ {instructor.rating} Instructor Rating</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{instructor.description}</p>
              </div>
            </div>
          </div>

          {/* More Courses Section */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">More Course By Same Instructor</h2>
              <button className="text-[#0056D2] text-sm font-medium">VIEW ALL</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {instructorCourses.map((course, index) => (
                <div key={index} className="bg-white border rounded-lg overflow-hidden relative group">
                  {/* Price tag overlay */}
                  <div className="absolute top-2 left-2 z-10">
                    <div className="flex items-center gap-2">
                      <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-sm">
                        {course.price}
                      </span>
                      <span className="text-gray-500 line-through text-xs">
                        {course.originalPrice}
                      </span>
                    </div>
                  </div>
                  
                  {/* Wishlist button */}
                  <button className="absolute top-2 right-2 z-10">
                    <FaHeart className="text-white hover:text-red-500 transition-colors" />
                  </button>

                  {/* Course image */}
                  <div className="relative h-40 overflow-hidden">
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-200"
                    />
                    <div className="absolute inset-0 bg-black/10"></div>
                  </div>

                  {/* Course details */}
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2">
                      {course.title}
                    </h3>
                    <p className="text-xs text-gray-500 mb-2">
                      {course.instructor} | {course.instructorTitle}
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
      </div>
    </div>
  );
};

export default Instructor;