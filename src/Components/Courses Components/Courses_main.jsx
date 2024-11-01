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
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 bg-white dark:bg-gray-900 transition-all duration-300">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4 sm:pb-6 mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
          Courses
        </h1>
      </div>
      
      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Left Sidebar */}
        <div className="w-full lg:w-[280px] lg:flex-shrink-0">
          {/* Search Box */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 border rounded-md pr-10 text-sm
                       bg-white dark:bg-gray-800 
                       border-gray-200 dark:border-gray-700
                       text-gray-900 dark:text-white
                       placeholder-gray-500 dark:placeholder-gray-400
                       focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          </div>

          {/* Reset Link */}
          <div className="mb-4 sm:mb-6">
            <button 
              onClick={handleReset}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm"
            >
              Reset
            </button>
          </div>

          {/* Filters Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="space-y-6">
              {/* Category */}
              <div>
                <h2 className="text-sm font-semibold mb-3 text-gray-900 dark:text-white">
                  Category
                </h2>
                <div className="space-y-2">
                  {categories.map((category, index) => (
                    <label key={index} className="flex items-center space-x-2 text-sm">
                      <input 
                        type="checkbox" 
                        className="form-checkbox text-blue-600 dark:text-blue-400
                                 border-gray-300 dark:border-gray-600
                                 rounded focus:ring-blue-500 dark:focus:ring-blue-400" 
                      />
                      <span className="text-gray-700 dark:text-gray-300">{category.name}</span>
                      <span className="text-gray-500 dark:text-gray-400">({category.count})</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Product */}
              <div>
                <h2 className="text-sm font-semibold mb-3 text-gray-900 dark:text-white">
                  Product
                </h2>
                <div className="space-y-2">
                  {products.map((product, index) => (
                    <label key={index} className="flex items-center space-x-2 text-sm">
                      <input 
                        type="checkbox" 
                        className="form-checkbox text-blue-600 dark:text-blue-400
                                 border-gray-300 dark:border-gray-600
                                 rounded focus:ring-blue-500 dark:focus:ring-blue-400" 
                      />
                      <span className="text-gray-700 dark:text-gray-300">{product.name}</span>
                      <span className="text-gray-500 dark:text-gray-400">({product.count})</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 
                         bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
            <div className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
              {filteredCourses.length} Results
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full sm:w-auto">
              {/* Language Selector */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-sm text-gray-700 dark:text-gray-300">Language:</span>
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="border rounded px-2 py-1 text-sm min-w-[120px] w-full sm:w-auto
                           bg-white dark:bg-gray-700
                           border-gray-300 dark:border-gray-600
                           text-gray-900 dark:text-white"
                >
                  <option>English</option>
                  <option>Spanish</option>
                </select>
              </div>

              {/* Sort Selector */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-sm text-gray-700 dark:text-gray-300">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border rounded px-2 py-1 text-sm min-w-[120px] w-full sm:w-auto
                           bg-white dark:bg-gray-700
                           border-gray-300 dark:border-gray-600
                           text-gray-900 dark:text-white"
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
                className="group"
              >
                <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-4 sm:p-6 
                              hover:shadow-lg transition-all duration-300 relative">
                  {/* Logo with Glow Effect */}
                  <div className="relative flex items-center justify-center h-12 sm:h-16 mb-6">
                    <div className="absolute inset-0 dark:bg-blue-500/20 rounded-full blur-xl scale-150 
                                  opacity-0 dark:opacity-0 dark:group-hover:opacity-75 
                                  transition-all duration-300 -z-10"></div>
                    <img 
                      src={course.logo} 
                      alt={course.type} 
                      className="max-h-full w-auto object-contain relative z-10
                               dark:opacity-90 group-hover:opacity-100
                               transition-all duration-300"
                    />
                  </div>
                  
                  <h3 className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 
                               mb-4 sm:mb-6 text-sm sm:text-base font-normal line-clamp-2">
                    {course.title}
                  </h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                      <FiClock className="mr-1" />
                      <span>{course.duration}</span>
                    </div>
                    <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
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
