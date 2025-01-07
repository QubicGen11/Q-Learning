import { useState } from 'react';
import './SkillsHomepage.css'

const SkillsHomepage = ({ categories }) => {
  // Get unique categories and remove null/empty values
  const uniqueCategories = [...new Set(categories
    .map(item => item.category)
    .filter(category => category)
  )];

  // Set default category to first available category or 'Web Development' if none exist
  const defaultCategory = uniqueCategories.length > 0 ? uniqueCategories[0] : 'Web Development';
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);

  // Get subcategories with their actual images from the API
  const getSubcategoriesWithImages = (category) => {
    return categories
      .filter(item => item.category === category)
      .map(item => ({
        title: item.subCategory,
        image: item.categoryImage // Using the actual image from API
      }));
  };

  // Get current subcategories based on selected category
  const currentSubcategories = getSubcategoriesWithImages(selectedCategory);

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
                ? "text-[#4B5563] border-b-2 border-[#0056B3] bg-[#f2f9ff]" 
                : "text-[#0056B3] hover:text-[#0056B3] hover:border-b-2 hover:border-[#0056B3]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Subcategories Section */}
      <div className="mb-6 flex justify-between items-center">
        <h3 className="text-xl text-gray-700 font-medium">
          {selectedCategory} Courses
        </h3>
        <div className="flex gap-4">
          <button className="text-[#0056B3] hover:text-[#0056B3] font-medium bg-white px-4 py-2 rounded-md border border-[#0056B3] transition-all duration-300 hover:bg-[#F3F4F6]">
            {selectedCategory} Skill Assessments
          </button>
          <button className="text-[#0056B3] hover:text-[#0056B3] font-medium bg-white px-4 py-2 rounded-md border border-[#0056B3] transition-all duration-300 hover:bg-[#F3F4F6]">
            View all {selectedCategory} Courses
          </button>
        </div>
      </div>

      {/* Subcategory Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {currentSubcategories.map((subCategory, index) => (
          <div 
            key={index} 
            className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
          >
            <div className="aspect-w-16 aspect-h-9 overflow-hidden">
              <img 
                src={subCategory.image} 
                alt={subCategory.title}
                className="w-full h-40 object-cover transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:rotate-1"
              />
            </div>
            <div className="p-4">
              <h4 className="text-center text-gray-800 text-sm font-medium group-hover:text-blue-600 transition-colors duration-300">
                {subCategory.title}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsHomepage;