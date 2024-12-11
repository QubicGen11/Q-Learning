import React from 'react'

const QubinestSuggestionforyou = () => {
  const courses = [
    {
      id: 1,
      title: 'METHODS OF DESIGN SYNTHESIS: RESEARCH TO PRODUCT INNOVATION',
      description: 'Theory and methods for synthesizing design thinking research data to identify innovations and new product features.',
      instructor: 'Instructor Name, Degree/Qualification',
      lastUpdated: 'Last updated June 2024',
      totalHours: '50+ hours of Learning',
      lectures: '356 Lectures',
      level: 'All levels',
      rating: 4.21,
      reviews: 326,
      currentPrice: '₹299',
      originalPrice: '₹3,299',
      thumbnail: 'https://res.cloudinary.com/devewerw3/image/upload/v1733726889/image-11_s1glto.png',
      category: 'Course Category'
    }
  ];

  return (
    <div className="px-6 py-8 bg-[#f2f9ff]">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-xl font-bold text-[#1B1B1B] mb-6">QubiNest Suggestion For You!</h2>
        
        <div className="space-y-4">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex flex-col md:flex-row">
                {/* Left side - Image */}
                <div className="relative w-full md:w-[300px] overflow-hidden">
                  <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                    {course.category}
                  </div>
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="w-full h-[200px] md:h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>

                {/* Right side - Content */}
                <div className="flex-1 p-4">
                  <h3 className="text-lg font-semibold text-[#1B1B1B] mb-2">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {course.description}
                  </p>
                  <p className="text-sm text-gray-500 mb-2">
                    {course.instructor}
                  </p>
                  
                  <div className="text-xs text-gray-500 space-y-1 mb-3">
                    <p>{course.lastUpdated} • {course.totalHours} • {course.lectures} • {course.level}</p>
                  </div>

                  <div className="flex items-center space-x-2 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, index) => (
                        <svg key={index} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" 
                          className={`w-4 h-4 ${index < Math.floor(course.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm">({course.rating}) • {course.reviews} Reviews</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold">{course.currentPrice}</span>
                    <span className="text-sm text-gray-500 line-through">{course.originalPrice}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default QubinestSuggestionforyou