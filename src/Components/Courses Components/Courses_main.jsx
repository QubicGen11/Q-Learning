import React, { useState, useEffect } from 'react';
import { FiSearch, FiMoreVertical, FiClock } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Navbar_main from '../Navbar Components/Navbar_main';
import config from '../../config/apiConfig';

const Courses_main = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState('English');
  const [sortBy, setSortBy] = useState('Featured');
  const [courses, setCourses] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState([]);

  const [techLogos, setTechLogos] = useState({
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
  });

  useEffect(() => {
    // Load custom tech logos from localStorage
    const customTechLogos = localStorage.getItem('customTechLogos');
    if (customTechLogos) {
      try {
        const parsedLogos = JSON.parse(customTechLogos);
        setTechLogos(prevLogos => ({
          ...prevLogos,
          ...parsedLogos
        }));
      } catch (error) {
        console.error('Error parsing custom tech logos:', error);
      }
    }
  }, []);

  const products = [
    { name: "Frontend Development", count: 25 },
    // ... rest of your products array
  ];

  const courseCategories = [
    {
      title: "Development",
      count: 150,
      subcategories: [
        { name: "Web Development", count: 85 },
        { name: "Mobile Development", count: 35 },
        { name: "Programming Languages", count: 45 },
        { name: "Game Development", count: 20 },
        { name: "Database Design", count: 15 }
      ]
    },
    {
      title: "Business",
      count: 130,
      subcategories: [
        { name: "Entrepreneurship", count: 40 },
        { name: "Communication", count: 30 },
        { name: "Management", count: 35 },
        { name: "Sales", count: 25 }
      ]
    },
    {
      title: "IT & Software",
      count: 120,
      subcategories: [
        { name: "IT Certifications", count: 45 },
        { name: "Network Security", count: 30 },
        { name: "Hardware", count: 15 },
        { name: "Operating Systems", count: 30 }
      ]
    }
  ];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Get access token from cookies
        const accessToken = document.cookie
          .split('; ')
          .find(row => row.startsWith('accessToken='))
          ?.split('=')[1];

        const response = await fetch(`${config.CURRENT_URL}/qlms/allCourses`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }

        const data = await response.json();
        
        // Process the courses data
        const processedCourses = data.map(course => ({
          id: course.id,
          title: course.courseTitle,
          type: course.courseType,
          duration: course.duration,
          courseImage: course.courseBanner,
          createdAt: new Date(), // You might want to add this field in your API
          techStackData: course.technologiesUsed.split(',').map(tech => ({
            name: tech.trim(),
            url: techLogos[tech.toLowerCase().trim()] || techLogos.html
          })),
          // Add other fields as needed
        }));

        setCourses(processedCourses);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setCourses([]);
      }
    };

    fetchCourses();
  }, [techLogos]);

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

      <Navbar_main />
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
                  Categories
                </h2>
                <div className="space-y-4">
                  {courseCategories.map((category) => (
                    <div key={category.title} className="space-y-2">
                      {/* Main Category */}
                      <div className="flex items-center justify-between group">
                        <label className="flex items-center space-x-2 text-sm cursor-pointer flex-grow">
                          <input 
                            type="checkbox" 
                            checked={selectedCategories.includes(category.title)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedCategories([...selectedCategories, category.title]);
                              } else {
                                setSelectedCategories(
                                  selectedCategories.filter(cat => cat !== category.title)
                                );
                              }
                            }}
                            className="form-checkbox text-orange-500 dark:text-orange-400
                                     border-gray-300 dark:border-gray-600
                                     rounded focus:ring-orange-500 dark:focus:ring-orange-400" 
                          />
                          <span className="text-gray-700 dark:text-gray-300 group-hover:text-orange-500 
                                         transition-colors duration-200">
                            {category.title}
                          </span>
                          <span className="text-gray-500 dark:text-gray-400">
                            ({category.count})
                          </span>
                        </label>
                        <button
                          onClick={() => {
                            setExpandedCategories(prev => 
                              prev.includes(category.title)
                                ? prev.filter(cat => cat !== category.title)
                                : [...prev, category.title]
                            );
                          }}
                          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full
                                   transition-colors duration-200"
                        >
                          <svg
                            className={`w-4 h-4 transition-transform duration-200 
                                       ${expandedCategories.includes(category.title) ? 'transform rotate-180' : ''}`}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>

                      {/* Subcategories */}
                      {expandedCategories.includes(category.title) && (
                        <div className="ml-6 space-y-2">
                          {category.subcategories.map((sub) => (
                            <label key={sub.name} className="flex items-center justify-between text-sm 
                                                       cursor-pointer group">
                              <div className="flex items-center space-x-2">
                                <input 
                                  type="checkbox" 
                                  checked={selectedCategories.includes(sub.name)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setSelectedCategories([...selectedCategories, sub.name]);
                                    } else {
                                      setSelectedCategories(
                                        selectedCategories.filter(cat => cat !== sub.name)
                                      );
                                    }
                                  }}
                                  className="form-checkbox text-orange-500 dark:text-orange-400
                                           border-gray-300 dark:border-gray-600
                                           rounded focus:ring-orange-500 dark:focus:ring-orange-400" 
                                />
                                <span className="text-gray-600 dark:text-gray-400 group-hover:text-orange-500 
                                               transition-colors duration-200">
                                  {sub.name}
                                </span>
                              </div>
                              <span className="text-gray-500 dark:text-gray-400">({sub.count})</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Reset Button */}
                {selectedCategories.length > 0 && (
                  <button
                    onClick={() => setSelectedCategories([])}
                    className="mt-4 text-sm text-orange-500 hover:text-orange-600 
                               transition-colors duration-200"
                  >
                    Reset Filters
                  </button>
                )}
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
                  {/* Main Logo */}
                  <div className="relative flex items-center justify-center h-12 sm:h-16 mb-6">
                    <div className="absolute inset-0 dark:bg-blue-500/20 rounded-full blur-xl scale-150 
                                  opacity-0 dark:opacity-0 dark:group-hover:opacity-75 
                                  transition-all duration-300 -z-10"></div>
                    <img 
                      src={course.courseImage}
                      alt={course.courseTitle} 
                      className="max-h-full w-auto object-contain relative z-10
                               dark:opacity-90 group-hover:opacity-100
                               transition-all duration-300"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = techLogos.html;
                      }}
                    />
                  </div>

                
                  {/* Tech Stack Icons */}
                  {course.techStackData && course.techStackData.length > 0 && (
                    <div className="flex gap-2 mb-4">
                      {course.techStackData.map(tech => (
                        <img 
                          key={tech.name}
                          src={tech.url}
                          alt={tech.name}
                          className="w-6 h-6 object-contain"
                          title={tech.name}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = techLogos.html;
                          }}
                        />
                      ))}
                    </div>
                  )}
                  
                  <h3 className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 
                               mb-4 sm:mb-6 text-sm sm:text-base font-normal line-clamp-2">
                    {course.title}
                  </h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                      <FiClock className="mr-1" />
                      <span>{course.duration}</span>
                    </div>
                    <span className="text-sm text-gray-500">{course.type}</span>
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
