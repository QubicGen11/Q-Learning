import React, { useState, useEffect } from 'react';
import { FiSearch, FiMoreVertical, FiClock } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Courses_main = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState('English');
  const [sortBy, setSortBy] = useState('Featured');
  const [courses, setCourses] = useState([]);

  const techLogos = {
    html: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    css: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    javascript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    react: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    nextjs: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    nodejs: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    mongodb: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    typescript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    tailwind: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
    redux: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
    postgresql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    docker: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    aws: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
    firebase: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
    graphql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg"
  };

  const products = [
    { name: "Frontend Development", count: 25 },
    // ... rest of your products array
  ];

  const categories = [
    { name: "New Releases", count: 54 },
    // ... rest of your categories array
  ];

  useEffect(() => {
    const initialCourses = [
      // Frontend Fundamentals
      {
        logo: techLogos.html,
        title: "HTML5 & CSS3 Fundamentals: Build Modern Websites",
        duration: "2h",
        type: "Frontend"
      },
      // ... rest of your courses array
    ];

    const storedCourses = localStorage.getItem('courses');
    if (!storedCourses) {
      localStorage.setItem('courses', JSON.stringify(initialCourses));
      setCourses(initialCourses);
    } else {
      setCourses(JSON.parse(storedCourses));
    }
  }, []);

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleReset = () => {
    setSearchQuery('');
    setLanguage('English');
    setSortBy('Featured');
  };

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === 'Newest') {
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    }
    return 0;
  });

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      {/* Header */}
      <div className="border-b pb-4 sm:pb-6 mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Courses</h1>
      </div>
      
      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Left Sidebar - Hidden on mobile, shown as overlay or top section */}
        <div className="w-full lg:w-[280px] lg:flex-shrink-0">
          {/* Search Box */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 border rounded-md pr-10 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          {/* Reset Link */}
          <div className="mb-4 sm:mb-6">
            <button 
              onClick={handleReset}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Reset
            </button>
          </div>

          {/* Filters Section */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-6 mb-6">
            {/* Category */}
            <div className="flex-1 lg:flex-none mb-4 sm:mb-0">
              <h2 className="text-sm font-semibold mb-3 flex items-center">
                Category
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </h2>
              <div className="space-y-2">
                {categories.map((category, index) => (
                  <label key={index} className="flex items-center space-x-2 text-sm">
                    <input type="checkbox" className="form-checkbox" />
                    <span>{category.name}</span>
                    <span className="text-gray-500">({category.count})</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Product */}
            <div className="flex-1 lg:flex-none">
              <h2 className="text-sm font-semibold mb-3 flex items-center">
                Product
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </h2>
              <div className="space-y-2">
                {products.map((product, index) => (
                  <label key={index} className="flex items-center space-x-2 text-sm">
                    <input type="checkbox" className="form-checkbox" />
                    <span>{product.name}</span>
                    <span className="text-gray-500">({product.count})</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4 sm:gap-0">
            <div className="text-gray-600 text-sm sm:text-base">
              {sortedCourses.length} Results
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full sm:w-auto">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-sm">Language:</span>
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="border rounded px-2 py-1 text-sm min-w-[120px] w-full sm:w-auto"
                >
                  <option>English</option>
                  <option>Spanish</option>
                </select>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-sm">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border rounded px-2 py-1 text-sm min-w-[120px] w-full sm:w-auto"
                >
                  <option>Featured</option>
                  <option>Newest</option>
                </select>
              </div>
            </div>
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {sortedCourses.map((course) => (
              <Link 
                to={`/courses/${course.id}`} 
                key={course.id}
                className="block"
              >
                <div className="bg-white border rounded-lg p-4 sm:p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-center h-12 sm:h-16 mb-6">
                    <img 
                      src={course.logo} 
                      alt={course.type} 
                      className="max-h-full w-auto object-contain"
                    />
                  </div>
                  <h3 className="text-blue-600 hover:text-blue-800 mb-4 sm:mb-6 text-sm sm:text-base font-normal line-clamp-2">
                    {course.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600 text-xs sm:text-sm">
                      <FiClock className="mr-1" />
                      <span>{course.duration}</span>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <FiMoreVertical />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses_main;
