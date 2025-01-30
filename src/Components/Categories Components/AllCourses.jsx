import React, { useEffect, useState } from 'react';
import { FiFilter } from 'react-icons/fi';
import { BiSort } from 'react-icons/bi';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'; // Import heart icons
import useCategoriesStore from '../../stores/CategoriesStore';
import { Link, useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import trackLastViewedCourse from '../../utils/trackLastViewedCourse';
import useWishlistStore from '../../stores/wishlistStore';

const AllCourses = () => {
  const { categoriesData, isLoading, error } = useCategoriesStore();
  const { favorites, fetchWishlist, toggleWishlist } = useWishlistStore();

  useEffect(() => {
    fetchWishlist(); // Fetch wishlist when component mounts
  }, []);


  const navigate = useNavigate()

  
  const defaultImage =
    'https://res.cloudinary.com/devewerw3/image/upload/v1738054203/florencia-viadana-1J8k0qqUfYY-unsplash_hsheym.jpg';

  const [currentPage, setCurrentPage] = useState(1); // Pagination state
// Track favorite state for each course
  const resultsPerPage = 5; // Set the number of courses per page

  const allCourses = categoriesData?.allCourses || []; // Get all courses from Zustand store

  // Calculate the courses to display on the current page
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const paginatedCourses = allCourses.slice(startIndex, endIndex);

  // Helper function to assign tags conditionally
  const assignTag = (course) => {
    const averageRating = course.averageRating || 4.5; // Default to 0 if undefined
    const reviews = course.reviews || 500; // Default to 0 if undefined

    if (averageRating >= 4.5 && reviews >= 500) {
      return 'Best Seller';
    } else if (averageRating >= 4.0 && reviews >= 200) {
      return 'Trending';
    } else if (averageRating >= 3.5) {
      return 'Hot';
    }
    return null; // No tag
  };

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
          <span className="text-gray-600">{allCourses.length} RESULTS</span>
        </div>

        {/* Course Grid */}
        {isLoading ? (
          <Skeleton height={40} count={5} style={{ marginBottom: '10px' }} />
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {paginatedCourses.length > 0 ? (
              paginatedCourses.map((course) => {
                const tag = assignTag(course); // Assign tag dynamically
                return (
                 
                    <div
                      key={course.id}
                      className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                      onClick={() => {
                        trackLastViewedCourse(course.id);
                        navigate(`/course/${course.id}`);
                      }}
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
                          className="w-full h-48 object-cover rounded-t-lg transition-transform duration-500 ease-in-out hover:scale-105"
                        />

                        {/* Heart Button */}
                        <div
                          className="absolute top-3 right-3 cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault(); // Prevent navigation when clicking the heart
                            setFavorites((prev) => ({
                              ...prev,
                              [course.id]: !prev[course.id], // Toggle favorite state for this course
                            }));
                          }}
                        >
                          
                          <div
          className="cursor-pointer"
          onClick={(e) => {
            e.stopPropagation(); // Prevent card navigation
            toggleWishlist(course.id, e); // Toggle the wishlist state
          }}
        >
          {favorites.has(course.id) ? (
            <AiFillHeart className="text-red-500 text-2xl" />
          ) : (
            <AiOutlineHeart className="text-black text-2xl" />
          )}
        </div>


                        </div>

                        {/* Price */}
                        <div className="absolute top-3 left-3 bg-white text-[#0056B3] px-3 py-1 rounded-full text-sm font-bold shadow-md">
                          ₹{course.courseSettings?.[0]?.offeredPrice || 'N/A'}
                        </div>
                      </div>

                      {/* Course Content */}
                      <div className="p-4">
                        {/* Course Title */}
                        <h3 className="text-sm font-semibold text-gray-800 mb-1 line-clamp-2">
                          {course.title || course.courseName}
                        </h3>

                        <div className="flex justify-between">
                          {/* Tag */}
                          {tag && (
                            <div className="py-2">
                              <span
                                className={`px-2 py-1 text-xs font-medium rounded ${getTagColor(tag)} text-white`}
                              >
                                {tag}
                              </span>
                            </div>
                          )}

                          {/* Ratings */}
                          <div className="flex items-center">
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
                            <span className="text-xs text-gray-600 ml-2">
                              ({course.averageRating || '0.0'}) • {course.reviews || '0'} reviews
                            </span>
                          </div>
                        </div>

                        {/* Instructor Name */}
                        <p className="text-xs text-gray-500 mb-2">{course.instructor || course.trainerName}</p>

                        {/* Course Details */}
                        <div className="text-xs text-gray-600 mb-3">
                          <span>{course.courseDuration || 'Duration Unavailable'} Total Hours</span>
                          <span className="mx-1">•</span>
                          <span>{course.lectures || '0 lectures'}</span>
                          <span className="mx-1">•</span>
                          <span>{course.level || 'All Levels'}</span>
                        </div>
                      </div>
                    </div>
                 
                );
              })
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
          {[...Array(Math.ceil(allCourses.length / resultsPerPage))].map((_, pageIndex) => (
            <button
              key={pageIndex}
              onClick={() => setCurrentPage(pageIndex + 1)}
              className={`w-8 h-8 rounded-full ${
                currentPage === pageIndex + 1 ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {pageIndex + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-3 py-1 border rounded-md hover:bg-gray-50"
            disabled={currentPage === Math.ceil(allCourses.length / resultsPerPage)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllCourses;
