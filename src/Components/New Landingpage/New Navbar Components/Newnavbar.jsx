import React, { useState } from 'react';
import { FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';

const Newnavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 h-[64px] bg-white z-20 shadow-md">
      <div className="flex items-center justify-between px-6 py-4 bg-white rounded-lg border border-blue-300">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="https://res.cloudinary.com/devewerw3/image/upload/v1732785466/logo_5_jqibzq.png"
            alt="QubiNest"
            className="h-7"
          />
        </div>

        {/* Search Bar with Explore Dropdown - Hide on mobile, show on lg screens */}
        <div className="hidden lg:flex flex-1 mx-8">
          <div className="relative flex items-center w-[70%]">
            <div className="relative">
              <button className="flex items-center px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-l-full">
                Explore
                <svg
                  className="w-4 h-4 ml-1"
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
            </div>
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Type anything..."
                className="w-full px-4 py-2 border border-gray-300 rounded-r-full focus:outline-none pr-12"
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Desktop and Tablet Navigation Links */}
        <div className="hidden md:flex items-center gap-4 lg:gap-8">
          <a href="#" className="text-gray-600 hover:text-gray-900 whitespace-nowrap">
            Teach Online
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900 whitespace-nowrap">
            About Platform
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900 whitespace-nowrap">
            Contact
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            <FiShoppingCart size={20} />
          </a>
          <button className="bg-[#0056B3] text-white px-4 py-2 rounded-md whitespace-nowrap">
            Get Started
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-[64px] left-0 right-0 bg-white border-t border-gray-200 md:hidden">
            <div className="px-4 py-2">
              {/* Mobile Search */}
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none pr-12"
                />
                <button className="absolute right-4 top-1/2 -translate-y-1/2">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
              
              {/* Mobile Navigation Links */}
              <div className="flex flex-col space-y-4">
                <a href="#" className="text-gray-600 hover:text-gray-900 py-2">
                  Teach Online
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900 py-2">
                  About Platform
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900 py-2">
                  Contact
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900 py-2">
                  <FiShoppingCart size={20} className="inline mr-2" />
                  Cart
                </a>
                <button className="bg-[#0056B3] text-white px-4 py-2 rounded-md w-full">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Newnavbar;
