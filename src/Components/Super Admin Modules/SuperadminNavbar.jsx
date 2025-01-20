import React, { useRef, useEffect } from 'react';
import { HiMenu } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import { FiBell } from 'react-icons/fi';
import { IoMdLogOut } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import useNavbarStore from '../../stores/navbarStore';
import useAuthStore from '../../stores/authStore';
import useSidebarStore from '../../stores/sidebarStore';
import Cookies from 'js-cookie';
    
const SuperadminNavbar = () => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const { isProfileDropdownOpen, toggleProfileDropdown, closeAll } = useNavbarStore();
  const { userName, role, logout } = useAuthStore();
  const { toggleSidebar } = useSidebarStore();

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
    // Clear cookies
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    
    // Clear auth store
    logout();
    
    // Navigate to login
    navigate('/login');
  };

  return (
    <div className="h-16 bg-white border-b flex items-center justify-between px-4">
      <div className="flex items-center flex-1 gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
        >
          <HiMenu className="text-gray-600 text-2xl" />
        </button>
        
        <div className="relative flex-1 max-w-xl">
          <input    
            type="text"
            placeholder="Type anything..."
            className="w-full px-4 py-2 pl-10 pr-4 border rounded-3xl border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <FiBell className="text-gray-600 text-xl" />
        </button>
        
        <div className="relative" ref={dropdownRef}>
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={toggleProfileDropdown}
          >
            <img
              src={`https://ui-avatars.com/api/?name=${userName || 'Admin'}&background=0056B3&color=fff`}
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-700">
                {userName || 'Loading...'}
              </span>
              <span className="text-xs text-gray-500">
                {role || 'Super Admin'}
              </span>
            </div>
          </div>

          {isProfileDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
              <Link to="/superadmin/profile" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                Profile Settings
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

export default SuperadminNavbar; 