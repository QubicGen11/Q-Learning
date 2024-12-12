import React, { useState, useEffect, useRef } from 'react';
import { FiShoppingCart, FiMenu, FiX, FiBell, FiHeart } from 'react-icons/fi';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { IoMdLogOut } from "react-icons/io";
import { FaRegUser } from 'react-icons/fa';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import useNavbarStore from '../../../stores/navbarStore';
import useAuthStore from '../../../stores/authStore';

const useClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

const Newnavbar = () => {
  const navigate = useNavigate();
  const {
    isMenuOpen,
    isExploreOpen,
    isProfileDropdownOpen,
    selectedCategory,
    toggleMenu,
    toggleExplore,
    toggleProfileDropdown,
    setSelectedCategory,
    closeAll
  } = useNavbarStore();

  const {
    isLoggedIn,
    userName,
    userEmail,
    userImage,
    logout,
    checkAuth
  } = useAuthStore();

  const dropdownRef = useRef(null);

  useEffect(() => {
    checkAuth(); // Check authentication status when component mounts
  }, [checkAuth]);

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    const refreshToken = Cookies.get('refreshToken');
    
    if (accessToken && refreshToken) {
      try {
        const tokenPayload = JSON.parse(atob(accessToken.split('.')[1]));
        setIsLoggedIn(true);
        setUserName(tokenPayload.userName);
        setUserEmail('firstname@gmail.com'); // Replace with actual email if available
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  useClickOutside(dropdownRef, () => {
    if (isProfileDropdownOpen) {
      toggleProfileDropdown(false);
    }
  });

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
    closeAll();
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out of your account",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0056B3',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!',
      iconColor: '#0056B3'
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        Swal.fire({
          title: 'Logged Out!',
          text: 'You have been successfully logged out.',
          icon: 'success',
          confirmButtonColor: '#0056B3',
          iconColor: '#0056B3',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false
        }).then(() => {
          navigate('/whenuserlogout');
        });
      }
    });
  };

  const profileMenuItems = [
    { label: 'My Learning', link: '/my-learning' },
    { label: 'My Cart', link: '/cart' },
    { label: 'Wishlist', link: '/wishlist' },
    { label: 'Teach on QubiNest', link: '/teach' },
    { label: 'Notifications', link: '/notifications' },
    { label: 'Account Settings', link: '/settings' },
    { label: 'Edit Profile', link: '/profile/edit' },
    { label: 'Purchase History', link: '/purchases' },
    { label: 'Subscriptions', link: '/subscriptions' },
    { label: 'Help and Support', link: '/support' },
  ];

  return (
    <nav className="relative bg-white z-50">
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 bg-white border-b border-gray-300">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
          <img
            src="https://res.cloudinary.com/devewerw3/image/upload/v1732785466/logo_5_jqibzq.png"
            alt="QubiNest"
            className="h-7"
          />
          </Link>
        </div>

        {/* Search Bar with Explore Dropdown */}
        <div className="hidden lg:flex flex-1 mx-8">
          <div className="relative flex items-center w-[70%]">
            <div className="relative">
              <button 
                className="flex items-center px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-l-full 
                hover:bg-gray-50 hover:border-[#0056B3] hover:text-[#0056B3] transition-all duration-200"
                onClick={toggleExplore}
              >
                Explore
                <svg
                  className={`w-4 h-4 ml-1 transform transition-transform duration-200 ${
                    isExploreOpen ? 'rotate-180' : ''
                  }`}
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
                    <a href="/categories">
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
                    </a>

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

            {/* Search Input with matching hover effect */}
            <input
              type="text"
              placeholder="Type anything..."
              className="w-full px-4 py-2 border-y border-r border-gray-300 rounded-r-full 
              focus:outline-none focus:border-[#0056B3] hover:border-[#0056B3] transition-all duration-200"
            />
          </div>
        </div>

        {/* User Info and Icons */}
        {isLoggedIn ? (
          <div className="hidden md:flex items-center gap-4 lg:gap-8">
            <a href="#" className="text-gray-600 hover:text-[#0056B3] hover:scale-110 transform transition-transform duration-200 ">
              Teach Online
            </a>
            <a href="#" className="text-gray-600 hover:text-[#0056B3] hover:scale-110 transform transition-transform duration-200 ">
              Contact
            </a>
            <FiBell 
              size={20} 
              className="text-gray-600 hover:text-[#0056B3] cursor-pointer transform transition-transform hover:scale-125 duration-200" 
            />
            <FiHeart 
              size={20} 
              className="text-gray-600 hover:text-[#0056B3] cursor-pointer transform transition-transform hover:scale-125 duration-200" 
            />
            <FiShoppingCart 
              size={20} 
              className="text-gray-600 hover:text-[#0056B3] cursor-pointer transform transition-transform hover:scale-125 duration-200" 
            />
            <div ref={dropdownRef} className="relative">
              <button 
                className="flex items-center cursor-pointer hover:text-[#0056B3] transition-colors duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleProfileDropdown(!isProfileDropdownOpen);
                }}
              >
                {userImage ? (
                  <img
                    src={userImage}
                    alt="User"
                    className="w-8 h-8 rounded-full transform transition-transform hover:scale-110 duration-200"
                  />
                ) : (
                  <FaRegUser 
                    size={25} 
                    className="text-gray-600 hover:text-[#0056B3] transform transition-transform hover:scale-125 duration-200"
                  />
                )}
                <div className="ml-2 text-gray-600">
                  <span>{userName}</span>
                  <br />
                  <span className="text-sm">{userEmail}</span>
                </div>
              </button>

              {isProfileDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-64 bg-[#f3f4f6] rounded-lg shadow-lg border border-gray-200 z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="py-2">
                    {profileMenuItems.map((item, index) => (
                      <React.Fragment key={index}>
                        <a
                          href={item.link}
                          className="block px-4 py-2 text-gray-700 hover:bg-[#0056B3] hover:text-white transition-colors duration-200"
                        >
                          {item.label}
                        </a>
                        {(index === 2 || index === 3 || index === 8) && (
                          <hr className="my-1 border-gray-200" />
                        )}
                      </React.Fragment>
                    ))}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-white bg-[#6b7280] hover:bg-[#0056B3] flex items-center transition-colors duration-200"
                    >
                      <span className="mr-2"><IoMdLogOut /></span> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-4 lg:gap-8">
            <a href="#" className="text-gray-600 hover:text-[#0056B3] transition-colors duration-200">
              Teach Online
            </a>
            <a href="#" className="text-gray-600 hover:text-[#0056B3] transition-colors duration-200">
              About Platform
            </a>
            <a href="#" className="text-gray-600 hover:text-[#0056B3] transition-colors duration-200">
              Contact
            </a>
            <Link to="/login">
              <button className="bg-[#0056B3] text-white px-4 py-2 rounded-md hover:bg-[#004494] transition-colors duration-200">
                Get Started
              </button>
            </Link>
          </div>
        )}

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu - Updated */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 md:hidden">
          <div className="px-4 py-3 space-y-3">
            {/* Search bar for mobile */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search courses..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
              />
            </div>

            {/* Mobile Navigation Items */}
            {isLoggedIn ? (
              <>
                <div className="flex items-center space-x-3 py-3 border-b border-gray-200">
                  <img
                    src={userImage}
                    alt={userName}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{userName}</p>
                    <p className="text-sm text-gray-500">{userEmail}</p>
                  </div>
                </div>

                {/* Navigation Links */}
                <div className="space-y-2">
                  <a href="#" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                    My Learning
                  </a>
                  <a href="#" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                    My Cart
                  </a>
                  <a href="#" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                    Wishlist
                  </a>
                  <div className="border-t border-gray-200 my-2"></div>
                  <a href="#" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                    Teach Online
                  </a>
                  <a href="#" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                    Notifications
                  </a>
                  <a href="#" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                    Account Settings
                  </a>
                  <div className="border-t border-gray-200 my-2"></div>
                  <button
                    onClick={handleLogout}
                    className="w-full px-3 py-2 text-left text-red-600 hover:bg-red-50 rounded-md flex items-center"
                  >
                    <IoMdLogOut className="mr-2" /> Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <a href="#" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                  Teach Online
                </a>
                <a href="#" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                  About Platform
                </a>
                <a href="#" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                  Contact
                </a>
                <Link to="/login">
                  <button className="w-full mt-2 bg-[#0056B3] text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    Get Started
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Newnavbar;
