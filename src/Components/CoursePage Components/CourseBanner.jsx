import React, { useEffect, useRef } from 'react';
import { FaHeart, FaVolumeMute } from 'react-icons/fa';
import { gsap } from 'gsap';

const CourseBanner = () => {
  const bannerRef = useRef(null);
  const videoRef = useRef(null);
  const fullContentRef = useRef(null);
  const compactContentRef = useRef(null);

  useEffect(() => {
    // Set initial states
    gsap.set(compactContentRef.current, { opacity: 0, display: 'none' });
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 100) {
        gsap.to(bannerRef.current, {
          height: '80px',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          duration: 0.3
        });
        gsap.to(fullContentRef.current, { 
          opacity: 0, 
          display: 'none',
          duration: 0.3 
        });
        gsap.to(compactContentRef.current, { 
          opacity: 1,
          display: 'flex',
          duration: 0.3 
        });
      } else {
        gsap.to(bannerRef.current, {
          height: '400px',
          position: 'relative',
          duration: 0.3
        });
        gsap.to(fullContentRef.current, { 
          opacity: 1,
          display: 'block',
          duration: 0.3 
        });
        gsap.to(compactContentRef.current, { 
          opacity: 0,
          display: 'none',
          duration: 0.3 
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div id="banner-spacer" style={{ height: '400px', display: 'none' }}></div>
      <div ref={bannerRef} className="relative h-[400px] w-full bg-black">
        {/* Semi-transparent overlay */}
        <div className="absolute inset-0 bg-black/75 z-10"></div>
        
        {/* Background video */}
        <video 
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source 
            src="https://cdn.pixabay.com/video/2020/03/18/33871-398473585_tiny.mp4" 
            type="video/mp4" 
          />
        </video>

        {/* Full Content */}
        <div ref={fullContentRef} className="relative z-20 max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div className="flex-1">
              <div className="text-gray-300 mb-2">
                <span>Design</span> {'>'} <span>UX Design</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center gap-3">
                Real World UX | Learn User Experience & Start Your Career
                <button className="text-gray-400 hover:text-red-500 transition-colors">
                  <FaHeart className="text-2xl" />
                </button>
              </h1>

              <p className="text-gray-300 text-lg mb-6">
                UX based on real world examples. Gain powerful UX skills you can use to start a UX career or improve your projects.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
                <div className="bg-[#dc3545] px-3 py-1 rounded">
                  Highest Rated
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400">★★★★★</span>
                  <span>(1,858 Ratings)</span>
                </div>
                <div>15,490 students</div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-300">
                <div className='text-white bg-[#4B5563] p-2 rounded'>Last updated 07/2023</div>
                <div className="bg-green-600 px-2 py-1 rounded">English</div>
                <div className="flex items-center gap-1">
                  <FaVolumeMute />
                  <span>CC</span>
                </div>
              </div>
            </div>

            <div className="w-full md:w-80 rounded-lg shadow-lg p-6 mx-auto my-auto">
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-bold text-white">₹649</span>
                <span className="text-gray-500 line-through text-white font-light">₹3,099</span>
                <span className="text-green-600 font-semibold text-white font-light">79% off</span>
              </div>
              <button className="w-full bg-[#0056b3] text-white py-3 rounded font-semibold mb-3 hover:bg-blue-700 transition-colors">
                Add to Cart
              </button>
              <button className="w-full bg-[#f3f4f6] text-blue-600 border-2 py-3 rounded font-semibold hover:bg-blue-50 transition-colors">
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Compact Content */}
        <div 
          ref={compactContentRef} 
          className="relative z-20 max-w-7xl mx-auto px-4 h-full hidden"
        >
          <div className="h-full flex items-center justify-between">
            <div className="flex-1">
              <h1 className="text-xl font-bold text-white truncate pr-4">
                Real World UX | Learn User Experience & Start Your Career
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-white">₹649</span>
                <span className="text-green-500 text-sm">79% off</span>
              </div>
              <button className="bg-[#0056b3] text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">
                Add to Cart
              </button>
              <button className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 text-sm">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseBanner;