import React from 'react'

const LearnersChoice = () => {
    const courses = [
      {
        title: "BASIC FUNDAMENTALS OF PROGRAMMING LANGUAGES",
        instructor: "Instructor Name, Degree/Qualification",
        price: "299/-",
        originalPrice: "3299/-",
        rating: 4.2,
        reviews: 326,
        viewing: "230 Viewing",
        lastUpdated: "Last Updated November 2024",
        image: "https://res.cloudinary.com/devewerw3/image/upload/v1732872891/image_8_ai6uoo.png",
        tag: "Trending 🔥",
        tagColor: "bg-purple-600"
      },
      {
        title: "ANGULAR & NODEJS - THE MEAN STACK GUIDE",
        instructor: "Instructor Name, Degree/Qualification",
        price: "499/-",
        originalPrice: "3299/-",
        rating: 2.2,
        reviews: 326,
        viewing: "230 Viewing",
        lastUpdated: "Last Updated August 2024",
        image: "https://res.cloudinary.com/devewerw3/image/upload/v1732872891/image_7_e201id.png",
        tag: "Most Purchased",
        tagColor: "bg-gray-700"
      },
      {
        title: "R PROGRAMMING A-Z™: R FOR DATA SCIENCE",
        instructor: "Instructor Name, Degree/Qualification",
        price: "699/-",
        originalPrice: "3299/-",
        rating: 4.2,
        reviews: 326,
        viewing: "230 Viewing",
        lastUpdated: "Last Updated October 2024",
        image: "https://res.cloudinary.com/devewerw3/image/upload/v1732872889/image_9_zafwev.png",
        tag: "Best In Teaching",
        tagColor: "bg-green-500"
      },
      {
        title: "PYTHON FOR DATA SCIENCE & MACHINE LEANING",
        instructor: "Instructor Name, Degree/Qualification",
        price: "1299/-",
        originalPrice: "3299/-",
        rating: 4.2,
        reviews: 326,
        viewing: "230 Viewing",
        lastUpdated: "Last Updated June 2024",
        image: "https://res.cloudinary.com/devewerw3/image/upload/v1732872891/image_8_ai6uoo.png",
        tag: "High Valued Skill",
        tagColor: "bg-emerald-500"
      }
    ];
  
    return (
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold">Learners Choice</h2>
            <button className="text-blue-600 hover:text-blue-700">VIEW ALL</button>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((course, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
                <div className="flex gap-4">
                  {/* Left side - Image */}
                  <div className="relative w-48 h-32">
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="w-full h-full object-cover rounded"
                    />
                    <span className="absolute top-2 left-2 text-white text-sm px-3 py-1 rounded bg-blue-600">
                      Course Category
                    </span>
                  </div>
  
                  {/* Right side - Content */}
                  <div className="flex-1">
                    <h3 className="font-medium text-sm mb-1">{course.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{course.instructor}</p>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-blue-600 font-bold">₹{course.price}</span>
                      <span className="text-gray-400 line-through">₹{course.originalPrice}</span>
                    </div>
  
                    <div className="flex items-center gap-2 text-sm">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-yellow-400">★</span>
                        ))}
                        <span className="ml-1 text-gray-600">({course.rating} | {course.reviews})</span>
                      </div>
                      <span className="text-gray-600">{course.lastUpdated}</span>
                    </div>
  
                    <div className="flex items-center gap-2 mt-2">
                      <span className="flex items-center text-gray-600 text-sm">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        {course.viewing}
                      </span>
                      <span className={`${course.tagColor} text-white text-xs px-2 py-1 rounded`}>
                        {course.tag}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default LearnersChoice;