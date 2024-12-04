import React from 'react'

const Newnavbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 mx-12 shadow-lg">
      {/* Logo */}
      <div className="flex items-center">
        <img 
          src="https://res.cloudinary.com/devewerw3/image/upload/v1732785466/logo_5_jqibzq.png" 
          alt="QubiNest" 
          className="h-7 "
        />
      </div>

      {/* Search Bar */}
      <div className="flex-1 mx-8 ">
        <div className="relative  w-[70%]">
          <input
            type="text"
            placeholder="Type anything you will find a course"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-14">
        <a href="#" className="text-gray-600 hover:text-gray-900">Categories</a>
        <a href="#" className="text-gray-600 hover:text-gray-900">Teach Online</a>
        <a href="#" className="text-gray-600 hover:text-gray-900">About Platform</a>
        <a href="#" className="text-gray-600 hover:text-gray-900">Contact</a>
        <button className="bg-[#0056b3] text-white px-4 py-2 rounded-md hover:bg-[#0056b3]">
          Get Started
        </button>
      </div>
    </nav>
  )
}

export default Newnavbar
