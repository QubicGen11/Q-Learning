import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom'; // Removed useNavigate
import useAfterLoginStore from '../../stores/afterlogin';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


const Topcategories = () => {
  const { 
    categories, 
    activeCategory, 
    loading, 
    error, 
    fetchCategories, 
    setActiveCategory 
  } = useAfterLoginStore();

  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -200, // Adjust the scroll amount as needed
        behavior: 'smooth'
      });
      setScrollPosition(scrollContainerRef.current.scrollLeft);
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 200, // Adjust the scroll amount as needed
        behavior: 'smooth'
      });
      setScrollPosition(scrollContainerRef.current.scrollLeft);
    }
  };

  // Handle category selection
  const handleCategoryClick = (category) => {
    setActiveCategory(category); // Only set the active category, no navigation
  };

  if (loading) {
    return <Skeleton height={40} count={5} style={{ marginBottom: '10px' }} />;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }

  if (!categories.length) {
    return <div className="p-4 text-center">No categories available.</div>;
  }

  return (
    <div className="border-b border-gray-200 relative">
      {/* Scroll Left Button */}
      <button 
        onClick={scrollLeft} 
        className="absolute left-0 top-1/2 transform -translate-y-1/2 rounded-full bg-white border border-gray-200 p-2 shadow-lg z-10 w-auto hover:bg-gray-100"
      >
        &lt;
      </button>

      {/* Categories List */}
      <div className="overflow-x-auto scrollbar-hide" ref={scrollContainerRef}>
        <div className="flex space-x-8 px-6 py-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.category)} // Only set active category
              className={`whitespace-nowrap hover:bg-[#f2f9ff] hover:transition-all duration-300 ease-in-out rounded text-sm font-medium py-1 px-4 ${
                activeCategory === category.category
                  ? 'text-[#0056B3] bg-[#f2f9ff] border-[#0056B3]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {category.category}
            </button>
          ))}
        </div>
      </div>

      {/* Scroll Right Button */}
      <button 
        onClick={scrollRight} 
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white border border-gray-200 p-2 rounded-full shadow-lg z-10 hover:bg-gray-100"
      >
        &gt;
      </button>

      {/* Subcategories List */}
      {activeCategory && (
        <div className="overflow-x-auto border-t bg-[#f5f5f5] border-gray-200 scrollbar-hide">
          <div className="flex space-x-8 px-6 py-2">
            {categories
              .find((cat) => cat.category === activeCategory)
              ?.subCategories?.map((subCategory) => (
                <Link
                  key={subCategory.id}
                  to={{
                    pathname: '/categories', // Navigate to /categories
                    search: `?category=${encodeURIComponent(activeCategory)}&subCategory=${encodeURIComponent(subCategory.subCategory)}`, // Pass query parameters
                  }}
                  className="whitespace-nowrap hover:bg-[#f2f9ff] rounded-2xl text-sm text-gray-500 hover:text-gray-700 px-1 py-1"
                >
                  {subCategory.subCategory || 'Unnamed Subcategory'}
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Topcategories;
