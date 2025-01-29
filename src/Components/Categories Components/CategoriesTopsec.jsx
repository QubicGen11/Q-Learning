import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import useCategoriesStore from '../../stores/CategoriesStore';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'; // Import heart icons

const CategoriesTopsec = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category'); // Dynamic category
  const subCategory = searchParams.get('subCategory'); // Dynamic subCategory (optional)
  const [activeTab, setActiveTab] = useState('Most Popular'); // Default tab
  const [favorites, setFavorites] = useState({}); // Track favorite state for each course
  const defaultImage =
    "https://res.cloudinary.com/devewerw3/image/upload/v1738054203/florencia-viadana-1J8k0qqUfYY-unsplash_hsheym.jpg";

  const { categoriesData, fetchCategoriesData, isLoading, error } = useCategoriesStore();

  // Fetch API data whenever category or subCategory changes
  useEffect(() => {
    if (category) {
      fetchCategoriesData(category, subCategory);
    }
  }, [category, subCategory, fetchCategoriesData]);

  // Get courses based on the active tab
  const getCourses = () => {
    if (activeTab === 'Most Popular') return categoriesData.mostPopular;
    if (activeTab === 'New') return categoriesData.newCourses;
    if (activeTab === 'Trending') return categoriesData.trending;
    return categoriesData.allCourses;
  };

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-[#0056B3] text-white py-4">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
          <h1 className="text-xl sm:text-2xl font-semibold text-center">{category || 'Category'}</h1>
          <div className="flex items-center text-xs sm:text-sm mt-1 justify-center">
            <Link to="/" className="hover:underline">Home</Link>
            <span className="mx-2">›</span>
            <span>{category || 'Category'}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16 py-6 sm:py-8">
        {/* Tab Navigation */}
        <div className="flex space-x-4 sm:space-x-6 mb-6 sm:mb-8 border-b overflow-x-auto">
          {['Most Popular', 'New', 'Trending'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-xs sm:text-sm whitespace-nowrap ${
                activeTab === tab
                  ? 'text-[#0056B3] border-b-2 border-[#0056B3]'
                  : 'text-gray-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Loading/Error Handling */}
        {isLoading ? (
          <Skeleton height={40} count={5} style={{ marginBottom: '10px' }} />
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {getCourses().map((course) => (
              <Link to={`/course/${course.id}`} key={course.id}>
                <div
                  key={course.id}
                  className="bg-white rounded-lg hover:shadow-md transition-all duration-300 cursor-pointer group"
                >
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={course.courseImage || course.courseBanner || defaultImage}
                      alt={course.courseName}
                      onError={(e) => {
                        e.target.onerror = null; // Prevent infinite loop
                        e.target.src = defaultImage;
                      }}
                      className="w-full h-48 object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                    />
                    <div className="absolute top-2 left-2 bg-[#0056B3] text-white text-xs px-2 py-1 rounded">
                      ₹{course.courseSettings?.[0]?.offeredPrice || 'N/A'}
                    </div>
                    {/* Heart Button */}
                    <div
                      className="absolute top-2 right-2 cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault(); // Prevent navigation when clicking the heart
                        setFavorites((prev) => ({
                          ...prev,
                          [course.id]: !prev[course.id], // Toggle favorite state for this course
                        }));
                      }}
                    >
                      {favorites[course.id] ? (
                        <AiFillHeart className="text-red-500 text-xl" />
                      ) : (
                        <AiOutlineHeart className="text-white text-xl" />
                      )}
                    </div>
                  </div>
                  <div className="p-2 sm:p-3">
                    <h3 className="text-xs sm:text-sm font-medium text-gray-800 mb-1 line-clamp-2 group-hover:text-[#0056B3] transition-colors duration-300">
                      {course.courseName}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-gray-500 mb-1">
                      {course.trainerName}
                    </p>
                    <div className="flex items-center text-[10px] sm:text-xs text-gray-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-yellow-400 mr-1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{course.averageRating || '0.0'}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesTopsec;
