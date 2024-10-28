import React, { useState } from 'react';
import { FiSearch, FiMoreVertical, FiClock } from 'react-icons/fi';

const Courses_main = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState('English');
  const [sortBy, setSortBy] = useState('Featured');

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

  const courses = [
    // Frontend Fundamentals
    {
      logo: techLogos.html,
      title: "HTML5 & CSS3 Fundamentals: Build Modern Websites",
      duration: "2h",
      type: "Frontend"
    },
    {
      logo: techLogos.css,
      title: "Advanced CSS: Flexbox, Grid & Animations",
      duration: "2h 30m",
      type: "Frontend"
    },
    {
      logo: techLogos.javascript,
      title: "JavaScript ES6+ Complete Guide",
      duration: "3h 30m",
      type: "Frontend"
    },
    {
      logo: techLogos.typescript,
      title: "TypeScript for JavaScript Developers",
      duration: "2h 15m",
      type: "Frontend"
    },

    // React Ecosystem
    {
      logo: techLogos.react,
      title: "React.js: Building Modern User Interfaces",
      duration: "2h 45m",
      type: "Frontend"
    },
    {
      logo: techLogos.redux,
      title: "Redux & Redux Toolkit for State Management",
      duration: "1h 30m",
      type: "Frontend"
    },
    {
      logo: techLogos.nextjs,
      title: "Next.js 14: Full Stack Development",
      duration: "3h 45m",
      type: "Full Stack"
    },
    {
      logo: techLogos.tailwind,
      title: "Tailwind CSS: Modern Styling Framework",
      duration: "1h 45m",
      type: "Frontend"
    },

    // Backend Development
    {
      logo: techLogos.nodejs,
      title: "Node.js & Express.js Backend Development",
      duration: "2h 30m",
      type: "Backend"
    },
    {
      logo: techLogos.mongodb,
      title: "MongoDB Database Design & Operations",
      duration: "2h",
      type: "Database"
    },
    {
      logo: techLogos.postgresql,
      title: "PostgreSQL: Advanced Database Concepts",
      duration: "2h 15m",
      type: "Database"
    },
    {
      logo: techLogos.graphql,
      title: "GraphQL API Development with Node.js",
      duration: "2h",
      type: "Backend"
    },

    // Cloud & DevOps
    {
      logo: techLogos.docker,
      title: "Docker & Containerization Basics",
      duration: "1h 45m",
      type: "DevOps"
    },
    {
      logo: techLogos.aws,
      title: "AWS Services for Web Developers",
      duration: "2h 30m",
      type: "Cloud"
    },
    {
      logo: techLogos.firebase,
      title: "Firebase: Backend as a Service (BaaS)",
      duration: "1h 30m",
      type: "Cloud"
    },
    {
      logo: techLogos.git,
      title: "Git & GitHub Version Control Mastery",
      duration: "1h 45m",
      type: "DevOps"
    },

    // Additional Courses
    {
      logo: techLogos.react,
      title: "React Native Mobile Development",
      duration: "3h",
      type: "Mobile"
    },
    {
      logo: techLogos.javascript,
      title: "Testing in JavaScript with Jest",
      duration: "1h 30m",
      type: "Testing"
    },
    {
      logo: techLogos.nodejs,
      title: "RESTful API Design with Node.js",
      duration: "2h",
      type: "Backend"
    },
    {
      logo: techLogos.react,
      title: "React Performance Optimization",
      duration: "1h 45m",
      type: "Frontend"
    }
  ];

  // Update product counts based on new courses
  const products = [
    { name: "Frontend Development", count: 25 },
    { name: "Backend Development", count: 18 },
    { name: "Full Stack", count: 12 },
    { name: "Database Management", count: 6 },
    { name: "DevOps & Deployment", count: 10 },
    { name: "Cloud Services", count: 7 },
    { name: "Mobile Development", count: 5 },
    { name: "Testing & QA", count: 6 },
    { name: "API Development", count: 8 },
    { name: "Performance Optimization", count: 4 }
  ];

  // Categories for web development
  const categories = [
    { name: "New Releases", count: 54 },
    { name: "Beginner Friendly", count: 32 },
    { name: "Advanced Topics", count: 28 },
    { name: "Project Based", count: 15 },
    { name: "Certification Prep", count: 12 }
  ];

  return (
    <div className="max-w-[1600px] mx-auto px-8 py-8">
      <div className="border-b pb-6 mb-8">
        <h1 className="text-4xl font-bold">Courses</h1>
      </div>
      
      <div className="flex gap-12">
        {/* Left Sidebar */}
        <div className="w-[280px] flex-shrink-0">
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
          <div className="mb-6">
            <button className="text-blue-600 hover:text-blue-800 text-sm">Reset</button>
          </div>

          {/* Category */}
          <div className="mb-6">
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
          <div className="mb-6">
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

        {/* Main Content */}
        <div className="flex-1">
          {/* Top Bar */}
          <div className="flex justify-between items-center mb-8">
            <div className="text-gray-600">204 Results</div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-sm">Language:</span>
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="border rounded px-2 py-1 text-sm min-w-[120px]"
                >
                  <option>English</option>
                  <option>Spanish</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border rounded px-2 py-1 text-sm min-w-[120px]"
                >
                  <option>Featured</option>
                  <option>Newest</option>
                </select>
              </div>
            </div>
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-4 gap-6">
            {courses.map((course, index) => (
              <div key={index} className="bg-white border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="h-8 mb-8">
                  <img 
                    src={course.logo} 
                    alt={course.type} 
                    className="h-full object-contain"
                  />
                </div>
                <h3 className="text-blue-600 hover:text-blue-800 mb-6 text-base font-normal">
                  {course.title}
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600 text-sm">
                    <FiClock className="mr-1" />
                    <span>{course.duration}</span>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <FiMoreVertical />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses_main;
