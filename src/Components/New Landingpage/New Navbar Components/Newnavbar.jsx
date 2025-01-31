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
import NotificationPopup from './NotificationPopup';
import WishlistPopup from './WishlistPopup';
import useWishlistStore from '../../../stores/wishlistStore';
import useCartStore from '../../../stores/useCartStore';

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
  const { favorites, fetchWishlist } = useWishlistStore(); // For wishlist
  const { cartItems, fetchCart } = useCartStore(); // For cart
  const wishlistCount = favorites ? favorites.size : 0; // Get wishlist count
  const cartCount = cartItems ? cartItems.length : 0; // Get cart count

  const dropdownRef = useRef(null);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8089/qlms/categories');
        const data = await response.json();
        if (data.categories) {
          const formattedCategories = data.categories.map((category) => ({
            title: category.category,
      
            courses: category.subCategories.map((sub) => ({
              title: sub.subCategory,
              shortTitle: sub.subCategory,
              imageUrl: sub.imageUrl,
              icon: 'https://via.placeholder.com/40',
            })),
          }));
          setCategories(formattedCategories);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast.error('Failed to load categories.');
      }
    };

    fetchCategories();
  }, []);

  useClickOutside(dropdownRef, () => {
    if (isProfileDropdownOpen) {
      toggleProfileDropdown(false);
    }
  });

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
    { label: 'Teach on QubiNest', link: '/instructor' },
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
                  className="absolute left-0 mt-2 h-[500px] w-[1000px]  bg-white rounded-lg shadow-xl border border-gray-200 z-30"
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="flex">
                    {/* Categories List - keep width proportional */}
                    <div className="w-[350px] h-[500px] overflow-y-auto border-r border-gray-200 py-2">
                      {categories.map((category, index) => (
                        <div 
                          key={index}
                          className={`flex items-center text-xs px-4 py-3 cursor-pointer group transition-colors duration-200
                            ${selectedCategory?.title === category.title ? 'bg-blue-50' : 'hover:bg-blue-50'}`}
                            onMouseEnter={() => {
                              if (selectedCategory?.title !== category.title) {
                                setSelectedCategory(category);
                              }
                            }}
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
                    {selectedCategory && selectedCategory.courses?.length > 0 && (
  <div className="flex-1 p-6 h-[500px] overflow-y-auto">
    <div className="flex justify-between items-center mb-6">
      <Link
        to={`/categories?category=${encodeURIComponent(
          selectedCategory.title
        )}&subCategory=${encodeURIComponent(selectedCategory.courses[0]?.title)}`}
        className="text-sm text-[#0056B3] font-bold hover:underline ml-auto"
      >
        VIEW ALL {selectedCategory.title.toUpperCase()} COURSES
      </Link>
    </div>

    <div className="grid grid-cols-4 gap-4 mb-6">
      {selectedCategory.courses.map((course, index) => (
        <Link
          to={`/categories?category=${encodeURIComponent(
            selectedCategory.title
          )}&subCategory=${encodeURIComponent(course.title)}`}
          key={index}
          className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-100 justify-center"
        >
          {/* <div className="w-12 h-12 rounded-full bg-gray-100 mb-3 flex items-center justify-center">
            <img
              src={course.imageUrl || `https://picsum.photos/seed/${encodeURIComponent(course.title)}/64`}
              alt={course.title}
              className="w-8 h-8 rounded-full"
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null; // Prevent infinite loop
                e.target.src = "https://via.placeholder.com/64"; // Fallback image
              }}
            />
          </div> */}
          <span className="text-sm font-medium text-center text-gray-800">
            {course.shortTitle}
          </span>
        </Link>
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
            <a href="/instructor" className="text-gray-600 hover:text-[#0056B3] hover:scale-110 transform transition-transform duration-200 ">
              Teach Online
            </a>
            <a href="#" className="text-gray-600 hover:text-[#0056B3] hover:scale-110 transform transition-transform duration-200 ">
              Contact
            </a>
            <div className="relative">
              <FiBell 
                size={20} 
                className="notification-bell text-gray-600 hover:text-[#0056B3] cursor-pointer transform transition-transform hover:scale-125 duration-200" 
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              />
              <NotificationPopup 
                isOpen={isNotificationOpen} 
                onClose={() => setIsNotificationOpen(false)}
              />
            </div>
            <div className="relative">
              <FiHeart
                size={20}
                className="wishlist-icon text-gray-600 hover:text-[#0056B3] cursor-pointer transform transition-transform hover:scale-125 duration-200"
                onClick={() => setIsWishlistOpen(!isWishlistOpen)}
              />
              {wishlistCount > 0 && (
                <span className="absolute -top-4 -right-4 bg-[#0056b3] text-white text-xs font-bold px-2 py-1 rounded-full">
                  {wishlistCount}
                </span>
              )}
              <WishlistPopup isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
            </div>

            <div className="relative">
              <Link to="/cart">
                <FiShoppingCart
                  size={20}
                  className="text-gray-600 hover:text-[#0056B3] cursor-pointer transform transition-transform hover:scale-125 duration-200"
                />
              </Link>
              {cartCount > 0 && (
                <span className="absolute -top-4 -right-4 bg-[#0056b3] text-white text-xs font-bold px-2 py-1 rounded-full">
                  {cartCount}
                </span>
              )}
            </div>


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
            <a href="/instructor" className="text-gray-600 hover:text-[#0056B3] transition-colors duration-200">
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
                  <a href="/instructor" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
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
