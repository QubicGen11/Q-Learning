import React from 'react';
import usePreLoginFeedStore from '../../../stores/preLoginFeedStore';


const LearnersChoice = () => {
  const learnersChoice = usePreLoginFeedStore((state) => state.learnersChoice || []);
  
  // Take only the first 4 courses
  const limitedCourses = learnersChoice?.slice(0, 4) || [];

  if (!learnersChoice || learnersChoice.length === 0) {
    return (
      <div className="bg-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Learners Choice</h2>
          <p className="mt-4 text-gray-600">No courses available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Learners Choice</h2>
          <button className="text-blue-600 hover:text-blue-700 font-medium">VIEW ALL</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {limitedCourses.map((course) => (
            <div key={course.id} className="group bg-white border rounded-xl p-4 hover:shadow-lg transition-shadow duration-300">
              <div className="flex gap-4">
                {/* Left side - Image */}
                <div className="relative w-40 sm:w-48 flex-shrink-0">
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <img 
                      src={course.thumbnail || course.courseBanner || 'https://via.placeholder.com/300x200'} 
                      alt={course.courseTitle}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <span className="absolute top-2 left-2 text-xs text-white px-2 py-1 rounded bg-blue-600">
                    {course.category}
                  </span>
                </div>

                {/* Right side - Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium mb-1 text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                    {course.courseTitle}
                  </h3>
                  
                  <p className="text-xs text-gray-600 mb-2">
                    {course.courseOwner}
                  </p>
                  
                  <div className="flex items-center gap-2 mb-2">
                    {course.price ? (
                      <>
                        <span className="text-blue-600 font-bold">₹{course.price}/-</span>
                        {course.originalPrice && (
                          <span className="text-gray-400 text-sm line-through">₹{course.originalPrice}/-</span>
                        )}
                      </>
                    ) : (
                      <span className="text-blue-600 font-bold">Free</span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600">
                    <div className="flex items-center gap-3">
                      <span>{course.viewsCount || 0} Viewing</span>
                      <span>{course.difficultyLevel}</span>
                    </div>
                  </div>

                  <span className={`inline-block mt-2 px-2 py-1 text-xs text-white rounded ${
                    course.courseType === 'Premium' ? 'bg-purple-600' :
                    course.courseType === 'Enterprise' ? 'bg-gray-700' :
                    'bg-green-500'
                  }`}>
                    {course.courseType}
                  </span>
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