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
    <div className="flex flex-col md:flex-row items-center justify-center px-4 md:px-6 py-8 md:py-12 w-full md:w-[100vw] mx-auto">
      {/* Left Section - Welcome Text */}
      <div className="w-full md:w-1/2 px-4 md:ml-[120px] text-center md:text-left mb-8 md:mb-0">
        <h1 className="text-4xl md:text-5xl lg:text-[64px] font-bold text-[#1B1B1B] mb-4 md:mb-6 leading-tight">
          Welcome, {userName}
        </h1>
        <p className="text-xl md:text-3xl lg:text-[42px] text-[#1B1B1B] mb-6 md:mb-8 leading-relaxed font-medium" 
           style={{lineHeight: '125%'}}>
          You avail access to 11,000+ of our top-rated courses in tech, business, and more.
        </p>
        <Link
          to="/explore"
          className="inline-block bg-[#0056B3] text-white px-6 md:px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Explore
        </Link>
      </div>

      {/* Right Section - Image */}
      <div className="w-full md:w-1/2 px-4 md:px-8 md:mr-[120px]">
        <div className="rounded-2xl overflow-hidden">
          <img
            src="https://res.cloudinary.com/devewerw3/image/upload/v1733910167/image_21_k1nsh4.png"
            alt="Library"
            className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover object-center"
            style={{
              aspectRatio: '16/9',
              maxWidth: '100%',
              width: 'auto'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Afterloginhero;