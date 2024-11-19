import React, { useState, useEffect } from 'react';
import { FiSearch, FiMoreVertical, FiClock, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import Navbar_main from '../Navbar Components/Navbar_main';
import config from '../../config/apiConfig';
import Cookies from 'js-cookie';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const Courses_main = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState('English');
  const [sortBy, setSortBy] = useState('Featured');
  const [courses, setCourses] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState([]);
  const [viewMode, setViewMode] = useState('all');
  const [myCourses, setMyCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

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

  const fetchMyCourses = async () => {
    try {
      console.log("Fetching My Courses API called");
      const token = Cookies.get('accessToken');
      const response = await fetch('http://localhost:8089/qlms/getUserCreatedCourse', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      console.log("My Courses Data:", data);
      setMyCourses(data);
    } catch (error) {
      console.error('Error fetching my courses:', error);
    }
  };

  const fetchEnrolledCourses = async () => {
    try {
      console.log("Fetching Enrolled Courses API called");
      const token = Cookies.get('accessToken');
      const response = await fetch('http://localhost:8089/qlms/getUserEnrolledCourse', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      console.log("Enrolled Courses Data:", data);
      setEnrolledCourses(data);
    } catch (error) {
      console.error('Error fetching enrolled courses:', error);
    }
  };

  const getFilteredCourses = () => {
    if (viewMode === 'myCourses') {
      if (!Array.isArray(myCourses)) return [];
      return myCourses.filter(course => 
        (course.courseTitle?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (course.courseType?.toLowerCase() || '').includes(searchQuery.toLowerCase())
      );
    }
    let filtered = courses.filter(course => 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.type.toLowerCase().includes(searchQuery.toLowerCase())
    );

    switch(viewMode) {
      case 'teaching':
        return filtered.filter(course => course.isInstructor);
      case 'learning':
        return filtered.filter(course => course.isEnrolled);
      default:
        return filtered;
    }
  };

  const filteredCourses = getFilteredCourses();

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

  useEffect(() => {
    console.log("Current viewMode:", viewMode);
    if (viewMode === 'myCourses') {
      fetchMyCourses();
    } else if (viewMode === 'enrolled') {
      fetchEnrolledCourses();
    } else {
      // Your existing courses fetch
      console.log("Fetching All Courses API called");
    }
  }, [viewMode]);

  const navigate = useNavigate();

  const handleDeleteCourse = async (courseId) => {
    try {
      const token = Cookies.get('accessToken');
      const response = await fetch(`${config.CURRENT_URL}/qlms/deleteCourse/${courseId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      
      if (response.ok) {
        // Refresh the courses list
        fetchMyCourses();
      }
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

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
            <div className="flex items-center gap-4 w-full sm:w-auto mb-4 sm:mb-0">
             
              
              <div className="flex rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('all')}
                  className={`px-4 py-2 text-sm ${
                    viewMode === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  Available Courses
                </button>
                <button
                  onClick={() => setViewMode('enrolled')}
                  className={`px-4 py-2 text-sm ${
                    viewMode === 'enrolled'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  Enrolled Courses
                </button>
                <button
                  onClick={() => setViewMode('myCourses')}
                  className={`px-4 py-2 text-sm ${
                    viewMode === 'myCourses'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  My Teachings
                </button>
              </div>
            </div>

            {/* Existing Language and Sort Controls */}
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
          <span className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                {filteredCourses.length} Results
              </span>
          {/* Course Grid */}
          {viewMode === 'myCourses' ? (
            <div className="w-full">
              {!Array.isArray(myCourses) || myCourses.length === 0 ? (
                // Empty state message
                <div className="text-center py-12 px-4">
                 
                  <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    No Courses Found
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
                    You haven't created any courses yet. Start creating your first course!
                  </p>
                  <button
                    onClick={() => navigate('/instructor')}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 
                               text-white rounded-lg transition-colors duration-200"
                  >
                    <span className="mr-2">Become an Instructor</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              ) : (
                // Course grid when courses exist
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {myCourses.map((course) => (
                    <div 
                      key={course.id}
                      className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg 
                                hover:shadow-lg transition-all duration-300 relative"
                    >
                      {/* Course Actions Dropdown */}
                      <div className="absolute top-2 right-2 z-10">
                        <Menu as="div" className="relative inline-block text-left">
                          <Menu.Button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full 
                                                 transition-colors duration-200 focus:outline-none">
                            <FiMoreVertical className="text-gray-600 dark:text-gray-400 w-5 h-5" />
                          </Menu.Button>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right divide-y divide-gray-100 
                                                  rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 
                                                  focus:outline-none dark:divide-gray-700">
                              <div className="px-1 py-1">
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      onClick={() => navigate(`/mainadmin/${course.id}`)}
                                      className={`${
                                        active 
                                          ? 'bg-purple-500 text-white' 
                                          : 'text-gray-700 dark:text-gray-300'
                                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >
                                      <FiEdit2 className="mr-2 h-5 w-5" />
                                      Edit Course
                                    </button>
                                  )}
                                </Menu.Item>
                                
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      onClick={() => {
                                        if (window.confirm('Are you sure you want to delete this course?')) {
                                          handleDeleteCourse(course.id);
                                        }
                                      }}
                                      className={`${
                                        active 
                                          ? 'bg-red-500 text-white' 
                                          : 'text-red-600 dark:text-red-400'
                                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >
                                      <FiTrash2 className="mr-2 h-5 w-5" />
                                      Delete Course
                                    </button>
                                  )}
                                </Menu.Item>
                              </div>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>

                      {/* Course Content (clickable to view course) */}
                      <div 
                        onClick={() => navigate(`/courses/${course.id}`)}
                        className="cursor-pointer p-4"
                      >
                        {/* Course Banner/Image */}
                        <div className="relative flex items-center justify-center h-40 mb-4">
                          <img 
                            src={course.courseBanner || "https://via.placeholder.com/400x300"}
                            alt={course.courseTitle} 
                            className="max-h-full w-auto object-contain"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "https://via.placeholder.com/400x300";
                            }}
                          />
                        </div>

                        {/* Course Title */}
                        <h3 className="text-blue-600 dark:text-blue-400 hover:text-blue-800 
                                     dark:hover:text-blue-300 mb-4 text-base font-medium line-clamp-2">
                          {course.courseTitle}
                        </h3>

                        {/* Course Details */}
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex flex-col">
                            <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                              ${course.price || 0}
                            </span>
                            {course.originalPrice && course.originalPrice > course.price && (
                              <span className="text-sm line-through text-gray-500">
                                ${course.originalPrice}
                              </span>
                            )}
                          </div>

                          <div className="flex flex-col items-end text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                              <FiClock className="w-4 h-4" />
                              <span>{course.duration || "N/A"}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : viewMode === 'enrolled' ? (
            <div className="w-full">
              {!Array.isArray(enrolledCourses) || enrolledCourses.length === 0 ? (
                // Empty state message for enrolled courses
                <div className="text-center py-12 px-4">
                
                  <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    No Enrolled Courses
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
                    You haven't enrolled in any courses yet. Start learning today!
                  </p>
                  <button
                    onClick={() => setViewMode('all')}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 
                               text-white rounded-lg transition-colors duration-200"
                  >
                    <span className="mr-2">Browse Courses</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              ) : (
                // Enrolled courses grid
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {/* Use the same course card structure as myCourses */}
                  {enrolledCourses.map((course) => (
                    <div 
                      key={course.id}
                      onClick={() => navigate(`/courses/${course.id}`)}
                      className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-4 
                                hover:shadow-lg transition-all duration-300 relative cursor-pointer"
                    >
                      {/* Course Banner/Image */}
                      <div className="relative flex items-center justify-center h-40 mb-4">
                        <img 
                          src={course.courseBanner || course.thumbnail || "https://via.placeholder.com/400x300"}
                          alt={course.courseTitle} 
                          className="max-h-full w-auto object-contain"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/400x300";
                          }}
                        />
                      </div>

                      {/* Course Title */}
                      <h3 className="text-blue-600 dark:text-blue-400 hover:text-blue-800 
                                   dark:hover:text-blue-300 mb-4 text-base font-medium line-clamp-2">
                        {course.courseTitle || "Untitled Course"}
                      </h3>

                      {/* Course Description */}
                      <div className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3"
                           dangerouslySetInnerHTML={{ __html: course.description || course.aboutCourse || "No description available" }}>
                      </div>

                      {/* Course Details */}
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex flex-col">
                          <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                            ${course.price || 0}
                          </span>
                          {course.originalPrice && course.originalPrice > course.price && (
                            <span className="text-sm line-through text-gray-500">
                              ${course.originalPrice}
                            </span>
                          )}
                          {course.discount && course.discount !== "0%" && (
                            <span className="text-xs text-green-500">
                              {course.discount} OFF
                            </span>
                          )}
                        </div>

                        <div className="flex flex-col items-end text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <FiClock className="w-4 h-4" />
                            <span>{course.duration || "N/A"} hrs</span>
                          </div>
                          {course.language && (
                            <span className="text-xs">{course.language}</span>
                          )}
                        </div>
                      </div>

                      {/* Category & Type */}
                      {(course.category || course.courseType) && (
                        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                          <div className="flex flex-wrap gap-2">
                            {course.category && (
                              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded">
                                {course.category}
                              </span>
                            )}
                            {course.courseType && (
                              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded">
                                {course.courseType}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            // Your existing All Courses view
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses_main;
