import { useState, useEffect, useMemo, useCallback } from 'react';
import './SkillsHomepage.css';
import usePreLoginFeedStore from '../../../stores/preLoginFeedStore';
import { Link } from 'react-router-dom';
import trackLastViewedCourse from '../../../utils/trackLastViewedCourse';

const SkillsHomepage = () => {
  const skillsForYou = usePreLoginFeedStore((state) => state.skillsForYou || []);

  // Memoized unique categories to prevent recalculation
  const uniqueCategories = useMemo(() => {
    const categories = [...new Set(skillsForYou.map((item) => item.category).filter(Boolean))];
    console.log("Extracted Unique Categories:", categories);
    return categories;
  }, [skillsForYou]);

  // Default category (memoized for stability)
  const defaultCategory = useMemo(
    () => (uniqueCategories.length > 0 ? uniqueCategories[0] : 'Web Development'),
    [uniqueCategories]
  );

  // State for selected category
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);

  // Default image fallback
  const defaultImage =
    'https://res.cloudinary.com/devewerw3/image/upload/v1738054203/florencia-viadana-1J8k0qqUfYY-unsplash_hsheym.jpg';

  // Memoized function to get subcategories with images
  const getSubcategoriesWithImages = useCallback(
    (category) => {
      return skillsForYou
        .filter((item) => item.category === category)
        .map((item) => ({
          title: item.subCategory,
          image: item.courseImage || item.courseBanner || item.categoryImage || defaultImage,
        }))
        .slice(0, 6); // Limit to 6 items
    },
    [skillsForYou, defaultImage]
  );

  // State for current subcategories, initialized with the default category
  const [currentSubcategories, setCurrentSubcategories] = useState(
    getSubcategoriesWithImages(defaultCategory)
  );

  // Update subcategories when `selectedCategory` changes
  useEffect(() => {
    setCurrentSubcategories(getSubcategoriesWithImages(selectedCategory));
  }, [selectedCategory, getSubcategoriesWithImages]);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-20 py-8">
      <h2 className="text-xl font-semibold text-[#4B5563] mb-6">
        SKILLS FOR YOUR PRESENT (AND YOUR FUTURE)
      </h2>

      {/* Categories Navigation */}
      <div className="flex overflow-x-auto scrollbar-hide space-x-6 mb-8 pb-2">
        {uniqueCategories.map((category, index) => (
          <button
            key={index}
            onClick={() => setSelectedCategory(category)}
            className={`whitespace-nowrap px-4 py-2 text-sm font-medium transition-all duration-300 ${
              category === selectedCategory
                ? 'text-[#4B5563] border-b-2 border-[#0056B3] bg-[#f2f9ff]'
                : 'text-[#0056B3] hover:text-[#0056B3] hover:border-b-2 hover:border-[#0056B3]'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Subcategories Section */}
      <div className="mb-6 flex justify-between items-center">
        <h3 className="text-xl text-gray-700 font-medium">{selectedCategory} Courses</h3>
        <div className="flex gap-4">
          <button className="text-[#0056B3] hover:text-[#0056B3] font-medium bg-white px-4 py-2 rounded-md border border-[#0056B3] transition-all duration-300 hover:bg-[#F3F4F6]">
            {selectedCategory} Skill Assessments
          </button>
          <Link to={`/categories?category=${selectedCategory}`} onClick={() => trackLastViewedCourse(course.id)}>
          
          <button className="text-[#0056B3] hover:text-[#0056B3] font-medium bg-white px-4 py-2 rounded-md border border-[#0056B3] transition-all duration-300 hover:bg-[#F3F4F6]">
            View all {selectedCategory} Courses
          </button>
          </Link>
        </div>
      </div>

      {/* Subcategory Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {currentSubcategories.map((subCategory, index) => (

<Link
to={`/categories?category=${selectedCategory}&subCategory=${encodeURIComponent(
  subCategory.title
)}`}
key={index}
>
          <div
            key={index}
            className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
          >
            <div className="aspect-w-16 aspect-h-9 overflow-hidden">
              <img
                src={subCategory.image}
                alt={subCategory.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = defaultImage;
                }}
                className="w-full h-40 object-cover transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:rotate-1"
              />
            </div>
            <div className="p-4">
              <h4 className="text-center text-gray-800 text-sm font-medium group-hover:text-blue-600 transition-colors duration-300">
                {subCategory.title}
              </h4>
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SkillsHomepage;
