import React, { useState } from 'react';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';

export const SearchFilters = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const categories = [
    {
      title: "Development",
      items: [
        "Web Development",
        "Mobile Development",
        "Programming Languages",
        "Game Development",
        "Database Design"
      ]
    },
    {
      title: "Business",
      items: [
        "Entrepreneurship",
        "Communication",
        "Management",
        "Sales",
        "Strategy"
      ]
    },
    {
      title: "IT & Software",
      items: [
        "IT Certifications",
        "Network Security",
        "Hardware",
        "Operating Systems",
        "Cloud Computing"
      ]
    }
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-full px-4 border-r border-gray-900 dark:border-gray-600 flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700"
      >
        <span className="text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
          {selectedCategory}
        </span>
        <FiChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute left-0 top-full mt-1 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50">
            <div className="max-h-[70vh] overflow-y-auto">
              <button
                onClick={() => {
                  setSelectedCategory('All Categories');
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                All Categories
              </button>
              {categories.map((category, index) => (
                <div key={index} className="group relative">
                  <div className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                    <span className="text-sm text-gray-700 dark:text-gray-300">{category.title}</span>
                    <FiChevronRight className="w-4 h-4 text-gray-500" />
                  </div>
                  <div className="hidden group-hover:block absolute left-full top-0 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg">
                    {category.items.map((item, itemIndex) => (
                      <button
                        key={itemIndex}
                        onClick={() => {
                          setSelectedCategory(item);
                          setIsOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};