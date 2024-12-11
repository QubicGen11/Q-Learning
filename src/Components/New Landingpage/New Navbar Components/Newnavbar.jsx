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
          shortTitle: "Web Design",
          icon: "https://res.cloudinary.com/devewerw3/image/upload/v1732872891/image_8_ai6uoo.png",
        },
        {
          title: "UX Design",
          shortTitle: "UX Design",
          icon: "https://res.cloudinary.com/devewerw3/image/upload/v1732872891/image_7_e201id.png",
        },
        {
          title: "2D Animation",
          shortTitle: "2D Animation",
          icon: "https://res.cloudinary.com/devewerw3/image/upload/v1732872889/image_9_zafwev.png",
        },
        {
          title: "Motion Design",
          shortTitle: "Motion Design",
          icon: "https://res.cloudinary.com/devewerw3/image/upload/v1732872891/image_8_ai6uoo.png",
        },
        {
          title: "UX Design",
          shortTitle: "UX Design",
          icon: "https://res.cloudinary.com/devewerw3/image/upload/v1732872891/image_7_e201id.png",
        },
        {
          title: "User Experience",
          shortTitle: "User Experience Design",
          icon: "https://res.cloudinary.com/devewerw3/image/upload/v1732872889/image_9_zafwev.png",
        },
        {
          title: "UX Design",
          shortTitle: "UX Design",
          icon: "https://res.cloudinary.com/devewerw3/image/upload/v1732872891/image_8_ai6uoo.png",
        },
        {
          title: "UX Design",
          shortTitle: "UX Design",
          icon: "https://res.cloudinary.com/devewerw3/image/upload/v1732872891/image_7_e201id.png",
        },
        {
          title: "UX Design",
          shortTitle: "UX Design",
          icon: "https://res.cloudinary.com/devewerw3/image/upload/v1732872889/image_9_zafwev.png",
        },
        {
          title: "UX Design",
          shortTitle: "UX Design",
          icon: "https://res.cloudinary.com/devewerw3/image/upload/v1732872891/image_8_ai6uoo.png",
        },
        {
          title: "UX Design",
          shortTitle: "UX Design",
          icon: "https://res.cloudinary.com/devewerw3/image/upload/v1732872891/image_7_e201id.png",
        },
        {
          title: "UX Design",
          shortTitle: "UX Design",
          icon: "https://res.cloudinary.com/devewerw3/image/upload/v1732872889/image_9_zafwev.png",
        }
      ]
    },
    { 
      title: 'Animation', 
      icon: '🎬',
      courses: [
        {
          title: "3D Animation Fundamentals",
          instructor: "Alex Turner, 3D Animator",
          image: "https://res.cloudinary.com/devewerw3/image/upload/v1732872891/image_8_ai6uoo.png",
          rating: 4.7,
          reviews: 283,
          tag: "Bestseller"
        },
        {
          title: "Character Animation",
          instructor: "Maya Rodriguez, Character Artist",
          image: "https://res.cloudinary.com/devewerw3/image/upload/v1732872891/image_7_e201id.png",
          rating: 4.9,
          reviews: 412,
          tag: "Trending 🔥"
        },
        {
          title: "Motion Graphics Mastery",
          instructor: "Chris Lee, Motion Designer",
          image: "https://res.cloudinary.com/devewerw3/image/upload/v1732872889/image_9_zafwev.png",
          rating: 4.6,
          reviews: 156,
          tag: "Most Popular"
        },
        {
          title: "2D Animation Workshop",
          instructor: "Sarah Kim, Animation Director",
          image: "https://res.cloudinary.com/devewerw3/image/upload/v1732872891/image_8_ai6uoo.png",
          rating: 4.8,
          reviews: 329,
          tag: "New"
        }
      ]
    },
    { 
      title: 'Gen AI', 
      icon: '🤖',
      courses: [
        {
          title: "Prompt Engineering Mastery",
          instructor: "Dr. Lisa Chen, AI Researcher",
          image: "https://res.cloudinary.com/devewerw3/image/upload/v1732872891/image_7_e201id.png",
          rating: 4.9,
          reviews: 512,
          tag: "Trending 🔥"
        },
        {
          title: "AI Model Training",
          instructor: "Prof. James Wilson, AI Expert",
          image: "https://res.cloudinary.com/devewerw3/image/upload/v1732872889/image_9_zafwev.png",
          rating: 4.8,
          reviews: 245,
          tag: "Bestseller"
        },
        {
          title: "ChatGPT Development",
          instructor: "Emily Zhang, NLP Specialist",
          image: "https://res.cloudinary.com/devewerw3/image/upload/v1732872891/image_8_ai6uoo.png",
          rating: 4.7,
          reviews: 378,
          tag: "Most Popular"
        },
        {
          title: "AI Ethics & Safety",
          instructor: "Dr. Michael Brown, Ethics Researcher",
          image: "https://res.cloudinary.com/devewerw3/image/upload/v1732872891/image_7_e201id.png",
          rating: 4.6,
          reviews: 189,
          tag: "New"
        }
      ]
    },
    { 
      title: 'Web Development', 
      icon: '💻',
      courses: [
        {
          title: "Full Stack Development",
          instructor: "Mark Johnson, Senior Dev",
          image: "https://res.cloudinary.com/devewerw3/image/upload/v1732872889/image_9_zafwev.png",
          rating: 4.8,
          reviews: 426,
          tag: "Most Popular"
        },
        {
          title: "React.js Advanced",
          instructor: "Sophie Chen, Frontend Expert",
          image: "https://res.cloudinary.com/devewerw3/image/upload/v1732872891/image_8_ai6uoo.png",
          rating: 4.9,
          reviews: 567,
          tag: "Trending 🔥"
        },
        {
          title: "Node.js Backend",
          instructor: "David Miller, Backend Engineer",
          image: "https://res.cloudinary.com/devewerw3/image/upload/v1732872891/image_7_e201id.png",
          rating: 4.7,
          reviews: 312,
          tag: "Bestseller"
        },
        {
          title: "Next.js & TypeScript",
          instructor: "Rachel Green, Tech Lead",
          image: "https://res.cloudinary.com/devewerw3/image/upload/v1732872889/image_9_zafwev.png",
          rating: 4.8,
          reviews: 234,
          tag: "New"
        }
      ]
    },
    { 
      title: 'Mobile Development', 
      icon: '📱',
      courses: [
        {
          title: "iOS Development",
          instructor: "Tim Cook, iOS Expert",
          image: "https://res.cloudinary.com/devewerw3/image/upload/v1732872891/image_8_ai6uoo.png",
          rating: 4.8,
          reviews: 456,
          tag: "Bestseller"
        },
        {
          title: "Android Studio Pro",
          instructor: "Andy Roberts, Android Dev",
          image: "https://res.cloudinary.com/devewerw3/image/upload/v1732872891/image_7_e201id.png",
          rating: 4.7,
          reviews: 389,
          tag: "Most Popular"
        },
        {
          title: "Flutter Development",
          instructor: "Maria Garcia, Mobile Expert",
          image: "https://res.cloudinary.com/devewerw3/image/upload/v1732872889/image_9_zafwev.png",
          rating: 4.9,
          reviews: 612,
          tag: "Trending 🔥"
        },
        {
          title: "React Native Mastery",
          instructor: "Josh Brown, Cross-platform Dev",
          image: "https://res.cloudinary.com/devewerw3/image/upload/v1732872891/image_8_ai6uoo.png",
          rating: 4.6,
          reviews: 278,
          tag: "New"
        }
      ]
    },
    { 
      title: 'Business', 
      icon: '💼',
      courses: [
        {
          title: "Entrepreneurship 101",
          instructor: "Richard Branson, Business Mogul",
          image: "https://res.cloudinary.com/devewerw3/image/upload/v1732872891/image_7_e201id.png",
          rating: 4.9,
          reviews: 789,
          tag: "Bestseller"
        },
        {
          title: "Digital Marketing",
          instructor: "Lisa Thompson, Marketing Director",
          image: "https://res.cloudinary.com/devewerw3/image/upload/v1732872889/image_9_zafwev.png",
          rating: 4.8,
          reviews: 567,
          tag: "Trending 🔥"
        },
        {
          title: "Business Strategy",
          instructor: "Robert Kiyosaki, Strategy Expert",
          image: "https://res.cloudinary.com/devewerw3/image/upload/v1732872891/image_8_ai6uoo.png",
          rating: 4.7,
          reviews: 432,
          tag: "Most Popular"
        },
        {
          title: "Startup Growth Hacking",
          instructor: "Sean Ellis, Growth Expert",
          image: "https://res.cloudinary.com/devewerw3/image/upload/v1732872891/image_7_e201id.png",
          rating: 4.6,
          reviews: 234,
          tag: "New"
        }
      ]
    }
  ];

  const handleMouseLeave = () => {
    setIsExploreOpen(false);
    setSelectedCategory(null);
  };

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
                <div 
                  className="absolute left-0 mt-2 w-[1000px] bg-white rounded-lg shadow-xl border border-gray-200 z-30"
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="flex">
                    {/* Categories List - keep width proportional */}
                    <div className="w-[250px] border-r border-gray-200 py-2">
                      {categories.map((category, index) => (
                        <div 
                          key={index}
                          className={`flex items-center px-4 py-3 cursor-pointer group transition-colors duration-200
                            ${selectedCategory?.title === category.title ? 'bg-blue-50' : 'hover:bg-blue-50'}`}
                          onMouseEnter={() => setSelectedCategory(category)}
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

                    {/* Course Preview - updated layout */}
                    {selectedCategory?.courses && (
                      <div className="flex-1 p-6">
                        <div className="flex justify-between items-center mb-6">
                          <h3 className="text-sm  text-[#0056B3] ml-auto bg-white rounded-full font-extrabold">
                            VIEW ALL {selectedCategory.title.toUpperCase()} COURSES
                          </h3>
                        </div>
                        
                        {/* First row with special treatment for first item */}
                        <div className="grid grid-cols-4 gap-4 mb-6">
                          <div className="bg-blue-600 rounded-lg p-4 text-white">
                            <div className="flex flex-col items-center">
                              <div className="w-12 h-12 rounded-full bg-white/20 mb-3 flex items-center justify-center">
                                <img 
                                  src={selectedCategory.courses[0].icon} 
                                  alt={selectedCategory.courses[0].title}
                                  className="w-8 h-8"
                                />
                              </div>
                              <span className="text-sm font-medium text-center">
                                {selectedCategory.courses[0].shortTitle}
                              </span>
                            </div>
                          </div>
                          
                          {/* Regular items */}
                          {selectedCategory.courses.slice(1, 4).map((course, index) => (
                            <div 
                              key={index}
                              className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50"
                            >
                              <div className="w-12 h-12 rounded-full bg-gray-100 mb-3 flex items-center justify-center">
                                <img 
                                  src={course.icon} 
                                  alt={course.title}
                                  className="w-8 h-8"
                                />
                              </div>
                              <span className="text-sm font-medium text-center text-gray-800">
                                {course.shortTitle}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Second row */}
                        <div className="grid grid-cols-4 gap-4 mb-6">
                          {selectedCategory.courses.slice(4, 8).map((course, index) => (
                            <div 
                              key={index}
                              className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50"
                            >
                              <div className="w-12 h-12 rounded-full bg-gray-100 mb-3 flex items-center justify-center">
                                <img 
                                  src={course.icon} 
                                  alt={course.title}
                                  className="w-8 h-8"
                                />
                              </div>
                              <span className="text-sm font-medium text-center text-gray-800">
                                {course.shortTitle}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Third row */}
                        <div className="grid grid-cols-4 gap-4">
                          {selectedCategory.courses.slice(8, 12).map((course, index) => (
                            <div 
                              key={index}
                              className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50"
                            >
                              <div className="w-12 h-12 rounded-full bg-gray-100 mb-3 flex items-center justify-center">
                                <img 
                                  src={course.icon} 
                                  alt={course.title}
                                  className="w-8 h-8"
                                />
                              </div>
                              <span className="text-sm font-medium text-center text-gray-800">
                                {course.shortTitle}
                              </span>
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
