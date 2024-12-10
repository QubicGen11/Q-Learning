import React, { useState } from 'react';
import { FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';

const Newnavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    { 
      title: 'Design', 
      icon: '🎨',
      courses: [
        {
          title: "Web Design",
          instructor: "John Doe, Senior Designer",
          image: "https://res.cloudinary.com/devewerw3/image/upload/v1732872891/image_8_ai6uoo.png",
          rating: 4.8,
          reviews: 326,
          tag: "Trending 🔥"
        },
        {
          title: "UX Design Fundamentals",
          instructor: "Sarah Wilson, UX Lead",
          image: "https://res.cloudinary.com/devewerw3/image/upload/v1732872891/image_7_e201id.png",
          rating: 4.6,
          reviews: 245,
          tag: "Most Popular"
        },
        {
          title: "UI/UX Masterclass",
          instructor: "Mike Chen, Product Designer",
          image: "https://res.cloudinary.com/devewerw3/image/upload/v1732872889/image_9_zafwev.png",
          rating: 4.9,
          reviews: 412,
          tag: "Bestseller"
        },
        {
          title: "Motion Design",
          instructor: "Emma Davis, Motion Expert",
          image: "https://res.cloudinary.com/devewerw3/image/upload/v1732872889/image_9_zafwev.png",
          rating: 4.7,
          reviews: 189,
          tag: "New"
        }
      ]
    },
    { title: 'Animation', icon: '🎬' },
    { title: 'Gen AI', icon: '🤖' },
    { title: 'Web Development', icon: '💻' },
    { title: 'Mobile Development', icon: '📱' },
    { title: 'Business', icon: '💼' },
    { title: 'Finance & Accounting', icon: '📊' },
    { title: 'Management', icon: '📈' },
    { title: 'Productivity', icon: '⚡' },
    { title: 'Fitness & Nutrition', icon: '💪' },
  ];

  return (
    <nav className="top-0 left-0 right-0 h-[64px] bg-white z-20 shadow-md">
      <div className="flex items-center justify-between px-6 py-4 bg-white rounded-lg border border-blue-300">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="https://res.cloudinary.com/devewerw3/image/upload/v1732785466/logo_5_jqibzq.png"
            alt="QubiNest"
            className="h-7"
          />
        </div>

        {/* Search Bar with Explore Dropdown */}
        <div className="hidden lg:flex flex-1 mx-8">
          <div className="relative flex items-center w-[70%]">
            <div className="relative">
              <button 
                className="flex items-center px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-l-full hover:bg-gray-50"
                onClick={() => setIsExploreOpen(!isExploreOpen)}
              >
                Explore
                <svg
                  className={`w-4 h-4 ml-1 transform transition-transform duration-200 ${isExploreOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Explore Dropdown */}
              {isExploreOpen && (
                <div className="absolute left-0 mt-2 w-[800px] bg-white rounded-lg shadow-xl border border-gray-200 z-30">
                  <div className="flex">
                    {/* Categories List */}
                    <div className="w-64 border-r border-gray-200 py-2">
                      {categories.map((category, index) => (
                        <div 
                          key={index}
                          className={`flex items-center px-4 py-3 cursor-pointer group transition-colors duration-200
                            ${selectedCategory?.title === category.title ? 'bg-blue-50' : 'hover:bg-blue-50'}`}
                          onClick={() => setSelectedCategory(category)}
                        >
                          <span className="mr-3 text-xl">{category.icon}</span>
                          <span className="text-gray-700 group-hover:text-blue-600 font-medium">
                            {category.title}
                          </span>
                          <svg
                            className="w-4 h-4 ml-auto text-gray-400 group-hover:text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      ))}
                    </div>

                    {/* Course Preview */}
                    {selectedCategory?.courses && (
                      <div className="flex-1 p-6">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-semibold">{selectedCategory.title} Courses</h3>
                          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            View All Courses
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          {selectedCategory.courses.map((course, index) => (
                            <div 
                              key={index}
                              className="flex gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                            >
                              <img 
                                src={course.image} 
                                alt={course.title}
                                className="w-24 h-24 object-cover rounded-lg"
                              />
                              <div>
                                <h4 className="font-medium text-sm mb-1">{course.title}</h4>
                                <p className="text-gray-600 text-xs mb-2">{course.instructor}</p>
                                <div className="flex items-center">
                                  <span className="text-yellow-400 mr-1">★</span>
                                  <span className="text-sm">{course.rating}</span>
                                  <span className="text-gray-400 text-sm ml-1">({course.reviews})</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Search Input */}
            <input
              type="text"
              placeholder="Type anything..."
              className="w-full px-4 py-2 border-y border-r border-gray-300 rounded-r-full focus:outline-none focus:border-blue-400"
            />
          </div>
        </div>

        {/* Rest of your existing navbar code */}
        <div className="hidden md:flex items-center gap-4 lg:gap-8">
          <a href="#" className="text-gray-600 hover:text-gray-900">Teach Online</a>
          <a href="#" className="text-gray-600 hover:text-gray-900">About Platform</a>
          <a href="#" className="text-gray-600 hover:text-gray-900">Contact</a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            <FiShoppingCart size={20} />
          </a>
          <button className="bg-[#0056B3] text-white px-4 py-2 rounded-md">
            Get Started
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-t border-gray-200">
          <div className="px-4 py-2">
            <a href="#" className="block py-2 text-gray-600">Teach Online</a>
            <a href="#" className="block py-2 text-gray-600">About Platform</a>
            <a href="#" className="block py-2 text-gray-600">Contact</a>
            <button className="w-full mt-2 bg-[#0056B3] text-white px-4 py-2 rounded-md">
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Newnavbar;
