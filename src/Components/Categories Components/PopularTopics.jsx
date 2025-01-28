import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useCategoriesStore from '../../stores/CategoriesStore'; // Import CategoriesStore

const PopularTopics = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category'); // Get dynamic category from URL
  const subCategory = searchParams.get('subCategory'); // Get dynamic subcategory from URL (if present)

  const { categoriesData, fetchCategoriesData, isLoading, error } = useCategoriesStore();

  // Fetch categories data when the category or subcategory changes
  useEffect(() => {
    if (category) {
      fetchCategoriesData(category, subCategory); // Fetch data using the dynamic category and subcategory
    }
  }, [category, subCategory, fetchCategoriesData]);

  const mostPopularCourses = categoriesData?.mostPopular || []; // Get most popular courses

  return (
    <div className="bg-[#f8f9fa] py-12">
      <div className="max-w-[1400px] mx-auto px-16">
        <h2 className="text-[22px] font-medium text-gray-800 mb-8">Popular Topics</h2>

        {isLoading ? (
          <p className="text-center">Loading popular topics...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {mostPopularCourses.length > 0 ? (
              mostPopularCourses.map((course) => (
                <button
                  key={course.id}
                  className="bg-white px-4 py-3 rounded-lg text-sm text-gray-700 hover:shadow-md transition-shadow duration-300 text-center"
                >
                  {course.courseName || 'Unnamed Course'}
                </button>
              ))
            ) : (
              <p className="text-center col-span-full text-gray-500">No popular topics available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PopularTopics;
