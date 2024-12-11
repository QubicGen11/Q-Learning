import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

const Afterloginhero = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      try {
        const tokenPayload = JSON.parse(atob(accessToken.split('.')[1]));
        setUserName(tokenPayload.userName);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  return (
    <div className="flex items-center justify-between px-6 py-12">
      {/* Left Section - Welcome Text */}
      <div className="flex-1">
        <h1 className="text-[42px] font-bold text-[#1B1B1B] mb-6 leading-tight">
          Welcome, {userName}
        </h1>
        <p className="text-xl text-[#1B1B1B] mb-8 max-w-md leading-relaxed">
          You avail access to 11,000+ of our top-rated courses in tech, business, and more.
        </p>
        <Link
          to="/explore"
          className="inline-block bg-[#0056B3] text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Explore
        </Link>
      </div>

      {/* Right Section - Image */}
      <div className="flex-1 ml-8">
        <div className="rounded-2xl overflow-hidden">
          <img
            src="https://res.cloudinary.com/devewerw3/image/upload/v1733910167/image_21_k1nsh4.png"
            alt="Library"
            className="w-full h-[400px] object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Afterloginhero;