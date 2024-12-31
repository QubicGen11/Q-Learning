import React, { useRef, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { FiBell, FiHeart, FiShoppingCart } from 'react-icons/fi';
import { IoMdLogOut } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuthStore from '../../../stores/authStore';
import useNavbarStore from '../../../stores/navbarStore';

const CourseTracker = ({ courseName, progress }) => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Get states and actions from navbar store
  const {
    isProfileDropdownOpen,
    toggleProfileDropdown,
    closeAll
  } = useNavbarStore();

  // Get user data and checkAuth from auth store
  const { userName, userEmail, userImage, logout, checkAuth } = useAuthStore();

  // Call checkAuth when component mounts
  useEffect(() => {
    checkAuth();
  }, []);

  console.log('Auth Store Values:', { userName, userEmail, userImage });

  // Static course data


  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeAll();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeAll]);

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out of your account",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0056B3',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!'
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        closeAll();
        navigate('/whenuserlogout');
      }
    });
  };

  // console.log('Current Course:', currentCourse);

  console.log('CourseTracker props:', { courseName, progress });

  return (
    <div className="h-14 bg-gradient-to-r from-[#0056B3] to-[#00254D] text-white">
      <div className="h-full flex items-center justify-between px-4">
        {/* Left Section - Logo */}
        <div className="flex items-center w-1/6">
          <img
            src="https://res.cloudinary.com/devewerw3/image/upload/v1734594088/Logo_7_ulr2j8.png"
            alt="QubiNest"
            className="h-10"
          />
        </div>

        {/* Center Section - Course Title and Progress */}
        <div className="flex-1 ">
          <div className="flex items-center mb-1 space-x-14">
            <div className="">
              <span className="text-base font-medium">{courseName}</span>
            <div className="flex items-center space-x-2">
              <div className="flex items-center text-xs text-white/80 space-x-2">
                <span>52 Hours of Learning</span>
                <span>•</span>
                <span>346 Lectures</span>
                <span>•</span>
                <span>All Levels</span>
              </div>
            </div>
            </div>
            




            
              <div className="w-72 ml-4 flex items-center justify-center ">
                <div className="h-1 bg-white rounded-full flex-1">
                  <div 
                    className="h-full bg-green-500 rounded-full transition-all duration-300"
                    style={{ width: '30%' }}
                  />
                </div>
                <span className="text-xs text-white ml-2">30%</span>
              </div>
            
          </div>
        </div>

        {/* Right Section - User Profile */}
        <div className="flex items-center ml-2 relative" ref={dropdownRef}>
          <div 
            className="flex items-center space-x-2 cursor-pointer" 
            onClick={toggleProfileDropdown}
          >
            <img
              src={userImage}
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium">{userName || 'First Name'}</span>
              <span className="text-xs text-white/80">{userEmail || 'firstname@gmail.com'}</span>
            </div>
          </div>

          {/* Dropdown Menu */}
          {isProfileDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
              <Link to="/profile" className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100">
                <FaUser className="mr-2" /> Profile
              </Link>
              <Link to="/notifications" className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100">
                <FiBell className="mr-2" /> Notifications
              </Link>
              <Link to="/wishlist" className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100">
                <FiHeart className="mr-2" /> Wishlist
              </Link>
              <Link to="/cart" className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100">
                <FiShoppingCart className="mr-2" /> Cart
              </Link>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                <IoMdLogOut className="mr-2" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseTracker;