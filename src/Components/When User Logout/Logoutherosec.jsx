import React from 'react';
import { Link } from 'react-router-dom';

const Logoutherosec = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center px-4 md:px-6 py-8 md:py-12 w-full md:w-[100vw] mx-auto shadow-xl">
      {/* Left Section - Text Content */}
      <div className="w-full md:w-1/2 px-4 md:ml-[120px] text-center md:text-left mb-8 md:mb-0">
        <h1 className="text-4xl md:text-5xl lg:text-[64px] font-bold text-[#1B1B1B] mb-4 md:mb-6 leading-tight">
          QubiNest can give you
        </h1>
        <p className="text-xl md:text-3xl lg:text-[42px] text-[#1B1B1B] mb-6 md:mb-8 leading-relaxed font-medium" 
           style={{lineHeight: '125%'}}>
          access to our top 27,000+
        </p>
        <Link
          to="/login"
          className="inline-block bg-[#0056B3] text-white px-6 md:px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Get Started
        </Link>
      </div>

      {/* Right Section - Image */}
      <div className="w-full md:w-1/2 px-4 md:px-8 md:mr-[120px]">
        <div className="rounded-2xl overflow-hidden">
          <img
            src="https://res.cloudinary.com/devewerw3/image/upload/v1733910167/image_21_k1nsh4.png"
            alt="Study Materials"
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

export default Logoutherosec;