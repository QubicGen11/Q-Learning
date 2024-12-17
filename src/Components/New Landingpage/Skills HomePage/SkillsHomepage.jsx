import { useState } from 'react';
import './SkillsHomepage.css'

const SkillsHomepage = ({ categories }) => {
  // Get unique categories and remove null/empty values
  const uniqueCategories = [...new Set(categories
    .map(item => item.category)
    .filter(category => category)
  )];

  // Set default category to first available category or 'Programming' if none exist
  const defaultCategory = uniqueCategories.length > 0 ? uniqueCategories[0] : 'Programming';
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);

  // Get unique subcategories for selected category with default images
  const getSubcategoriesWithImages = (category) => {
    const subcategories = [...new Set(categories
      .filter(item => item.category === category && item.subCategory)
      .map(item => item.subCategory)
    )];

    // Map each subcategory to an object with title and image
    return subcategories.map((subCategory, index) => ({
      title: subCategory,
      image: [
      
        
        
        "https://res.cloudinary.com/devewerw3/image/upload/v1732872891/image_7_e201id.png",
        
      ][index % 6] // Cycle through images if more than 6 subcategories
    }));
  };

  // Get current subcategories based on selected category
  const currentSubcategories = getSubcategoriesWithImages(selectedCategory);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-20 py-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
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
                ? "text-blue-600 border-b-2 border-blue-600" 
                : "text-gray-600 hover:text-blue-600 hover:border-b-2 hover:border-blue-600"
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
        <button className="text-blue-600 hover:text-blue-700 bg-white px-4 py-2 rounded-md border border-blue-600 transition-all duration-300 hover:bg-blue-50">
          View all {selectedCategory} Courses
        </button>
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