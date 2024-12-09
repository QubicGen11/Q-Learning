import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';

const Newnavbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md rounded-lg border border-blue-300 ">
      {/* Logo */}
      <div className="flex items-center">
        <img
          src="https://res.cloudinary.com/devewerw3/image/upload/v1732785466/logo_5_jqibzq.png"
          alt="QubiNest"
          className="h-7"
        />
      </div>

      {/* Search Bar with Explore Dropdown */}
      <div className="flex-1 mx-8">
        <div className="relative flex items-center w-[70%]">
          {/* Explore Dropdown */}
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
            {/* Dropdown Menu */}
          </div>
          {/* Input Field */}
          <input
            type="text"
            placeholder="Type anything..."
            className="flex-grow px-4 py-2 border border-gray-300 rounded-r-full focus:outline-none"
          />
          {/* Search Icon */}
          <button className="absolute right-3">
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

      {/* Navigation Links */}
      <div className="flex items-center gap-8">
        <a href="#" className="text-gray-600 hover:text-gray-900">
          Teach Online
        </a>
        <a href="#" className="text-gray-600 hover:text-gray-900">
          About Platform
        </a>
        <a href="#" className="text-gray-600 hover:text-gray-900">
          Contact
        </a>
        {/* Shopping Cart Icon */}
        <a href="#" className="text-gray-600 hover:text-gray-900">
          <FiShoppingCart size={20} />
        </a>
        <button className="bg-[#0056B3] text-white px-4 py-2 rounded-md">
          Get Started
        </button>
      </div>
    </nav>
  );
};

export default Newnavbar;
