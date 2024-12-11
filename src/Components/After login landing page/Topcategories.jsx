import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Topcategories = () => {
  const [activeCategory, setActiveCategory] = useState('Design');

  const mainCategories = [
    'Design',
    'Data Science',
    'Web Development',
    'Civil Engineering',
    'Electronics',
    'Chip Level',
    'Communication',
    'IT Certifications',
    'Leadership',
    'Photography'
  ];

  const designSubCategories = [
    'Web Design',
    'Figma Basics',
    'Framer Design',
    'UX Design',
    'Graphic Design',
    '2D Animation',
    'Motion Design',
    'UI Design'
  ];

  return (
    <div className="border-b border-gray-200">
      {/* Main Categories */}
      <div className="overflow-x-auto">
        <div className="flex space-x-8 px-6 py-2">
          {mainCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap hover:bg-[#f2f9ff] hover:transition-all duration-300 ease-in-out rounded-2xl text-sm font-medium ${
                activeCategory === category
                ? 'text-[#0056B3] border-b-2 border-[#0056B3]'
                : 'text-gray-500 hover:text-gray-700'
              } px-1 py-2`}
            >
              {category}
            </button>
          ))}
          <button className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* Sub Categories for Design */}
      {activeCategory === 'Design' && (
        <div className="overflow-x-auto  border-t bg-[#f5f5f5] border-gray-200">
          <div className="flex space-x-8 px-6 py-2">
            {designSubCategories.map((subCategory) => (
              <Link
                key={subCategory}
                to={`/courses/${subCategory.toLowerCase().replace(' ', '-')}`}
                className="whitespace-nowrap  hover:bg-[#f2f9ff] rounded-2xl text-sm text-gray-500 hover:text-gray-700 px-1 py-1"
              >
                {subCategory}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Topcategories;