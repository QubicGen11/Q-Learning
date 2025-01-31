import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import usePreLoginFeedStore from '../../stores/preLoginFeedStore';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import trackLastViewedCourse from '../../utils/trackLastViewedCourse';


const WhatToLearnNext = () => {
  const navigate = useNavigate();
  const { enrolledBasedRecommendations, fetchPreLoginFeed, isLoading } = usePreLoginFeedStore();
  const [showAll, setShowAll] = useState(false); // State to toggle "View All"
  const defaultImage =
  'https://res.cloudinary.com/devewerw3/image/upload/v1738054203/florencia-viadana-1J8k0qqUfYY-unsplash_hsheym.jpg';

  useEffect(() => {
    fetchPreLoginFeed(); // Fetch data on component mount
  }, [fetchPreLoginFeed]);

  const displayedCourses = showAll
    ? enrolledBasedRecommendations
    : enrolledBasedRecommendations.slice(0, 5); // Show only 4 courses initially

  return (
    <div className="px-6 py-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-[#1B1B1B] mb-2">What to learn next</h2>
          <p className="text-sm text-gray-600">
            Because you Enrolled "
            <Link to="#" className="text-[#0056B3] font-bold hover:underline">
              User Experience Certification
            </Link>
            "
          </p>
        </div>

        {isLoading ? (
          <Skeleton height={40} count={5} style={{ marginBottom: '10px' }} />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {displayedCourses.map((course) => (
                <div
                  key={course.id}
                  onClick={() => {
                    trackLastViewedCourse(course.id);
                    navigate(`/course/${course.id}`);
                  }}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                >
                  {/* Thumbnail */}
                  <div className="relative overflow-hidden">
                    <img
                      src={course.courseImage || defaultImage}
                      alt={course.courseName}
                      onError={(e) => {
                        e.target.onerror = null; // Prevent infinite loop
                        e.target.src = defaultImage;
                      }}
                      className="w-full aspect-[4/3] object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute top-2 left-2 bg-[#0056B3] text-white text-xs px-2 py-1 rounded">
                      ₹{course.courseSettings?.[0]?.offeredPrice || 'N/A'}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-3">
                    <h3 className="text-sm font-medium text-[#1B1B1B] mb-2 line-clamp-2">
                      {course.courseName}
                    </h3>
                    <p className="text-xs text-gray-500 mb-2">{course.trainerName}</p>
                    <div className="flex items-center text-xs text-gray-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4 text-yellow-400 mr-1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>(Rating | Reviews)</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View All Button */}
            {enrolledBasedRecommendations.length > 4 && (
              <div className="text-center mt-4">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="text-[#0056B3] text-sm font-medium hover:underline"
                >
                  {showAll ? 'Show Less' : 'View All'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default WhatToLearnNext;
