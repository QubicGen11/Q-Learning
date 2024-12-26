import React, { useRef, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { FiBell, FiHeart, FiShoppingCart } from 'react-icons/fi';
import { IoMdLogOut } from 'react-icons/io';
import { HiMenu } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useNavbarStore from '../../stores/navbarStore';
import useAuthStore from '../../stores/authStore';
import useSidebarStore from '../../stores/sidebarStore';


const Navbar = () => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const {
    isProfileDropdownOpen,
    toggleProfileDropdown,
    closeAll
  } = useNavbarStore();

  const { 
    userId,
    userName,
    role,
    isAuthenticated,
    checkAuth, 
    logout 
  } = useAuthStore();

  const { toggleSidebar } = useSidebarStore();

  useEffect(() => {
    checkAuth();
  }, []);

  // Log the values to verify
  console.log('Auth Store Values:', { userId, userName, role, isAuthenticated });

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

  return (
    <div className="h-16 bg-white border-b flex items-center justify-between px-4">
      {/* Left Section - Menu and Search */}
      <div className="flex items-center flex-1 gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
        >
          <HiMenu className="text-gray-600 text-xl" />
        </button>
        
        <div className="relative flex-1 max-w-xl">
          <input
            type="text"
            placeholder="Type anything..."
            className="w-full px-4 py-2 pl-10 pr-4  border rounded-3xl border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
        </div>

        {/* Create New Course Button */}
   
      </div>

      {/* Right Section - Notifications and Profile */}
      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <FiBell className="text-gray-600 text-xl" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <span className="material-icons text-gray-600">schedule</span>
        </button>
        
        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={toggleProfileDropdown}
          >
            <img
              src={`https://ui-avatars.com/api/?name=${userName || 'User'}&background=0056B3&color=fff`}
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-700">
                  {userName || 'Loading...'}
                </span>
                <span className="text-xs text-gray-500">
                  {role || 'User'}
                </span>
                </div>
          </div>

          {/* Dropdown Menu */}
          {isProfileDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
              <Link to="/notifications" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                Notifications
              </Link>
              <Link to="/account-settings" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                Account Settings
              </Link>
              <Link to="/edit-profile" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                Edit Profile
              </Link>
              <Link to="/payment-history" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                Payment History
              </Link>
              <Link to="/help-support" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                Help and Support
              </Link>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <span className="flex items-center">
                  <IoMdLogOut className="mr-2" /> Logout
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
