import React, { useEffect, useRef, useState } from 'react';
import { FaHeart, FaVolumeMute } from 'react-icons/fa';

const CourseBanner = ({ 
  title, 
  courseTagline,
  description, 
  thumbnail, 
  owner, 
  price, 
  originalPrice, 
  discount,
  courseBanner,
  category,
  subCategory,
  updatedAt,
  teachingLanguage,
  courseRating,
  categoryImage,
  rating
}) => {
  const [isCompact, setIsCompact] = useState(false);
  const bannerRef = useRef(null);
  const lastScrollY = useRef(0);
  
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${month}/${year}`;
  };

  const renderStars = (rating) => {
    const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
    return stars;
  };

  const averageRating = rating || 0;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if ((currentScrollY > 100 && !isCompact) || (currentScrollY <= 100 && isCompact)) {
        setIsCompact(currentScrollY > 100);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isCompact]);

  return (
    <div className="relative">
      <div className={`h-[200px] ${isCompact ? 'block' : 'hidden'}`} />
      
      <div 
        ref={bannerRef}
        className={`w-full transition-all duration-300 ease-in-out transform
          ${isCompact ? 'fixed top-0 left-0 right-0 z-50 h-20' : 'relative h-[400px]'}
        `}
        style={{
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          backgroundImage: isCompact ? `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${categoryImage})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {!isCompact && (
          <>
            <video 
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src={courseBanner} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/75 z-10" />
          </>
        )}

        <div className="relative z-20 max-w-7xl mx-auto px-4 h-full">
          <div 
            className={`transition-all duration-300 ease-in-out transform
              ${isCompact ? 'opacity-0 translate-y-[-20px] pointer-events-none absolute' : 'opacity-100 translate-y-0'}
            `}
          >
            <div className="flex flex-col md:flex-row justify-between items-start gap-8 py-12">
              <div className="flex-1">
                <div className="text-gray-300 mb-2">
                  <span>{category}</span> {'>'} <span>{subCategory}</span>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center gap-3">
                  {title}
                  <button className="text-gray-400 hover:text-red-500 transition-colors">
                    <FaHeart className="text-2xl" />
                  </button>
                </h1>

                <p className="text-gray-300 text-lg mb-6">
                  {courseTagline}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
                  <div className="bg-[#dc3545] px-3 py-1 rounded">
                    Highest Rated
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">{renderStars(averageRating)}</span>
                    <span>({averageRating} Rating)</span>
                  </div>
                  <div>15,490 students</div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-300">
                  <div className='text-white bg-[#4B5563] p-2 rounded'>
                    Last updated {formatDate(updatedAt)}
                  </div>
                  <div className="bg-green-600 px-2 py-1 rounded">{teachingLanguage}</div>
                  <div className="flex items-center gap-1">
                    
                    {/* <span></span> */}
                  </div>
                </div>
              </div>

              <div className="w-full md:w-80 rounded-lg shadow-lg p-6 mx-auto my-auto">
                
                <div className="flex items-center justify-between mb-4 ">
              
                <span className="text-3xl font-bold text-white">
                  ₹{Math.round(price)}
                </span>
                {originalPrice && (
                  <span className="text-gray-400 line-through text-white font-light opacity-80">
                    ₹{Math.round(originalPrice)}
                  </span>
                )}
                {discount && (
                  <span className="bg-green-500 text-white px-2 py-0.5 rounded-md font-medium text-sm ml-2">
                    {Math.round(discount)}% OFF
                  </span>
                )}
                    <FaVolumeMute size={30} color='white'/>
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

          <div 
            className={`h-full transition-all duration-300 ease-in-out transform relative
              ${isCompact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[20px] pointer-events-none absolute'}
            `}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${categoryImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div className="h-full flex items-center justify-between">
              <div className="flex-1">
                <h1 className="text-xl font-bold text-white truncate">
                  {title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
                  <div className="bg-[#dc3545] px-3 py-1 rounded">
                    Highest Rated
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">{renderStars(averageRating)}</span>
                    <span>({averageRating} Rating)</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-white">₹{price}</span>
                  {discount && <span className="text-green-500 text-sm">{discount}% off</span>}
                </div>
                <button className="bg-[#0056b3] text-white px-4 py-2 rounded hover:bg-blue-700">
                  Add to Cart
                </button>
                <button className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseBanner;