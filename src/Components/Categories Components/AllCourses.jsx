import React, { useEffect, useState } from 'react';
import { FiFilter } from 'react-icons/fi';
import { BiSort } from 'react-icons/bi';
import { useSearchParams } from 'react-router-dom';
import useCategoriesStore from '../../stores/CategoriesStore';

const AllCourses = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category'); // Get dynamic category from URL
  const subCategory = searchParams.get('subCategory'); // Get dynamic subcategory from URL (if present)

  const { categoriesData, fetchCategoriesData, isLoading, error } = useCategoriesStore();
  const defaultImage = "https://res.cloudinary.com/devewerw3/image/upload/v1738054203/florencia-viadana-1J8k0qqUfYY-unsplash_hsheym.jpg"


  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const resultsPerPage = 10; // Set the number of courses per page

  // Fetch courses data when category, subCategory, or currentPage changes
  useEffect(() => {
    if (category) {
      fetchCategoriesData(category, subCategory, currentPage, resultsPerPage);
    }
  }, [category, subCategory, currentPage, fetchCategoriesData]);

  const allCourses = categoriesData?.allCourses || []; // Get all courses from Zustand store

  const getTagColor = (tag) => {
    switch (tag) {
      case 'Best Seller':
        return 'bg-green-600';
      case 'Trending':
        return 'bg-purple-600';
      case 'Hot':
        return 'bg-orange-600';
      default:
        return 'bg-blue-600';
    }
  };

  return (
    <div className="bg-white py-12">
      <div className="max-w-[1400px] mx-auto px-16">
        {/* Header with Filter and Sort */}
        <h1 className="font-medium text-black text-xl mb-5">All Design Courses</h1>
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50 text-[#0056B3]">
              <FiFilter className="w-5 h-5" />
              Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50 text-[#0056B3]">
              <BiSort className="w-5 h-5" />
              Sort by
            </button>
          </div>
          <span className="text-gray-600">10,000 RESULTS</span>
        </div>

        {/* Course Grid */}
        {isLoading ? (
          <p className="text-center">Loading courses...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {allCourses.length > 0 ? (
              allCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                >
                  {/* Course Image */}
                  <div className="relative">
                  <img 
                        src={course.courseImage || course.courseBanner || defaultImage}
                        alt={course.courseName}
                        onError={(e) => {
                          e.target.onerror = null; // Prevent infinite loop
                          e.target.src = defaultImage;
                        }}
                        className="w-full h-48 object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                      />
                    <div className="absolute top-3 left-3">
                      {course.tag && (
                        <span className={`px-2 py-1 text-xs rounded ${getTagColor(course.tag)} text-white`}>
                          {course.tag}
                        </span>
                      )}
                    </div>
                    <div className="absolute bottom-3 right-3">
                      <div className="flex items-center gap-2 bg-[#f3f4f6] p-2">
                        <span className="text-sm font-bold text-[#0056B3] shadow-2xl">
                          {course.currentPrice || `₹${course.courseSettings?.[0]?.offeredPrice || 'N/A'}`}
                        </span>
                        <span className="text-xs text-[#0056B3] font-bold line-through">
                          {course.originalPrice || ''}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Course Content */}
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                      {course.title || course.courseName}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{course.instructor || course.trainerName}</p>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <span>{course.duration || 'Duration Unavailable'}</span>
                      <span className="mx-1">•</span>
                      <span>{course.lectures || 'Lectures Unavailable'}</span>
                      <span className="mx-1">•</span>
                      <span>{course.level || 'Level Unavailable'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, index) => (
                          <svg
                            key={index}
                            className={`w-4 h-4 ${
                              index < Math.floor(course.averageRating || 0)
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                            }`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        ({course.averageRating || '0.0'}) • {course.reviews || '0'} reviews
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center col-span-full text-gray-500">No courses available.</p>
            )}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-3 py-1 border rounded-md hover:bg-gray-50"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 rounded-full ${
                currentPage === page ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-3 py-1 border rounded-md hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllCourses;
