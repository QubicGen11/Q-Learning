import React from 'react'

const LearnersChoice = () => {
    const courses = [
      {
        title: "BASIC FUNDAMENTALS OF PROGRAMMING LANGUAGES",
        instructor: "Instructor Name",
        qualification: "Degree/Qualification",
        price: "299",
        originalPrice: "3,299",
        rating: 4.2,
        reviews: 326,
        viewing: "230",
        lastUpdated: "November 2024",
        image: "https://res.cloudinary.com/devewerw3/image/upload/v1732872891/image_8_ai6uoo.png",
        tag: "Trending",
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
      <div className="bg-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Learners Choice</h2>
            <button className="text-blue-600 hover:text-blue-700 font-medium">VIEW ALL</button>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((course, index) => (
              <div key={index} className="group bg-white border rounded-xl p-4 hover:shadow-lg transition-shadow duration-300">
                <div className="flex gap-4">
                  {/* Left side - Image */}
                  <div className="relative w-40 sm:w-48 flex-shrink-0">
                    <div className="aspect-video rounded-lg overflow-hidden">
                      <img 
                        src={course.image} 
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <span className="absolute top-2 left-2 text-xs text-white px-2 py-1 rounded bg-blue-600">
                      Course Category
                    </span>
                  </div>
  
                  {/* Right side - Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium mb-1 text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                      {course.title}
                    </h3>
                    
                    <p className="text-xs text-gray-600 mb-2">
                      {course.instructor}, {course.qualification}
                    </p>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-blue-600 font-bold">₹{course.price}/-</span>
                      <span className="text-gray-400 text-sm line-through">₹{course.originalPrice}/-</span>
                    </div>
  
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600">
                      <div className="flex items-center">
                        <div className="flex items-center text-yellow-400 mr-1">
                          {[...Array(5)].map((_, i) => (
                            <span key={i}>★</span>
                          ))}
                        </div>
                        <span>({course.rating} | {course.reviews})</span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <span>{course.viewing} Viewing</span>
                        <span>Last Updated {course.lastUpdated}</span>
                      </div>
                    </div>
  
                    {course.tag && (
                      <span className={`inline-block mt-2 px-2 py-1 text-xs text-white rounded ${course.tagColor}`}>
                        {course.tag}
                      </span>
                    )}
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