import React from 'react';
import usePreLoginFeedStore from '../../../stores/preLoginFeedStore';

const LearnersChoice = () => {
  const learnersChoice = usePreLoginFeedStore((state) => state.learnersChoice || []);
  
  // Take only the first 4 courses
  const limitedCourses = learnersChoice?.slice(0, 4) || [];

  // Add a default image constant
  const defaultImage = 'https://images.unsplash.com/photo-1591951425328-48c1fe7179cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGJvb2tzfGVufDB8fDB8fHww';

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

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
                      src={course.courseImage || course.courseBanner || defaultImage}
                      alt={course.courseName}
                      onError={(e) => {
                        e.target.onerror = null; // Prevent infinite loop
                        e.target.src = defaultImage;
                      }}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="absolute top-2 left-2 text-xs text-white px-2 py-1 rounded bg-blue-600">
                    {course.category}
                  </span>
                </div>

                {/* Right side - Content */}
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {course.courseName}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-2">
                    {course.trainerName}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-yellow-400 text-sm">{renderStars(course.rating)}</span>
                    <span className="text-xs text-gray-600">({course.rating})</span>
                  </div>
                  
                  {/* Price */}
                  <div className="flex items-center gap-2 mb-2">
                    {course.courseSettings?.[0]?.settings && (
                      <>
                        <span className="text-blue-600 font-bold">
                          ₹{course.courseSettings[0].settings.price}
                        </span>
                        {course.courseSettings[0].settings.offeredPrice && (
                          <span className="text-gray-400 text-sm line-through">
                            ₹{course.courseSettings[0].settings.offeredPrice}
                          </span>
                        )}
                        {course.courseSettings[0].settings.discount && (
                          <span className="text-green-600 text-xs">
                            {course.courseSettings[0].settings.discount}% off
                          </span>
                        )}
                      </>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600">
                    <div className="flex items-center gap-3">
                      <span>{course.viewsCount || 0} Viewing</span>
                      <span>{course.difficultyLevel}</span>
                      <span>{course.courseDuration}</span>
                    </div>
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