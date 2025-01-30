import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import './Mostelling.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import trackLastViewedCourse from '../../../utils/trackLastViewedCourse';
import { addToWishlist, getWishlist, removeFromWishlist } from '../../../utils/wishlist';

const MostSellingCourses = ({ courses }) => {
  const navigate = useNavigate();

  const [favorites, setFavorites] = useState(new Set()); // Object to track favorite state for each course

 
  // Add a default image constant
  const defaultImage = 'https://res.cloudinary.com/devewerw3/image/upload/v1738054203/florencia-viadana-1J8k0qqUfYY-unsplash_hsheym.jpg';

  // Handle card click
  const handleCourseClick = (courseId) => {
    trackLastViewedCourse(courseId); 
    navigate(`/course/${courseId}`);

  };

  // Custom arrow components
  const NextArrow = ({ className, style, onClick }) => {
    return (
      <div className={`custom-arrow next ${className}`} style={style} onClick={onClick}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gray-600">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    );
  };

  const PrevArrow = ({ className, style, onClick }) => {
    return (
      <div className={`custom-arrow prev ${className}`} style={style} onClick={onClick}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gray-600">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </div>
    );
  };

  // Add renderRating function
  const renderRating = (rating, reviewCount) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <span 
            key={star} 
            className={`text-lg ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          >
            ★
          </span>
        ))}
        <span className="ml-2 text-sm text-white">
          ({rating} | {reviewCount || ''})
        </span>
      </div>
    );
  };
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await getWishlist();
        if (response && response.wishlist) {
          console.log('Fetched Wishlist:', response.wishlist); // Debugging API response

          // Create a Set of courseIds for faster lookup
          const wishlistSet = new Set(response.wishlist.map((item) => item.courseId));
          setFavorites(wishlistSet);
        }
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };

    fetchWishlist();
  }, []);



  const toggleWishlist = async (courseId, e) => {
    e.stopPropagation(); // Prevent card click event
  
    if (favorites.has(courseId)) {
      // Remove from wishlist
      await removeFromWishlist(courseId);
      setFavorites((prev) => {
        const updated = new Set(prev);
        updated.delete(courseId);
        return updated;
      });
    } else {
      // Add to wishlist
      await addToWishlist(courseId);
      setFavorites((prev) => {
        const updated = new Set(prev);
        updated.add(courseId);
        return updated;
      });
    }
  };
  

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className="bg-[#f2f9ff] py-16 relative">
      <div className="max-w-7xl mx-auto px-4 relative">
        <h2 className="text-3xl font-semibold text-center mb-12">Most Selling Courses</h2>
        
        <div className="relative">
          <Slider {...settings}>
            {courses.map((course) => {
              // Safely fetch settings values
              const settings = course.courseSettings?.[0] || {};

              return (
                <div key={course.id} className="px-3">
                  <div 
                    className="group bg-none border border-gray-200 h-96 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                    onClick={() => handleCourseClick(course.id)}
                  >
                    <div className="relative overflow-hidden">
                      <img 
                        src={course.courseImage || course.courseBanner || defaultImage}
                        alt={course.courseName}
                        onError={(e) => {
                          e.target.onerror = null; // Prevent infinite loop
                          e.target.src = defaultImage;
                        }}
                        className="w-full h-48 object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                      />
                      <div
                        style={{
                          borderRadius: '4px 20px 4px 20px',
                          padding: '6px 8px 6px 8px',
                        }}
                        className="absolute top-4 left-4 bg-[#0056B3] text-white px-3 py-2 rounded-md text-sm"
                      >
                        {course.category}
                      </div>
                      <div className="absolute top-4 right-4 bg-[#f3f4f6] text-[#0056B3] px-3 py-1 rounded-md text-sm flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                        </svg>
                        32 Enrolled
                      </div>
                      
                      <div>

                      </div>
                    </div>
                    
                    <div>
                      {/* Rating Stars */}
                      <div className="flex justify-between items-center p-2 text-white bg-[#0056B3]">
                        <div>
                          {renderRating(course.rating || 4.7)}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-md font-bold text-white">
                            ₹{settings.offeredPrice || 0}/-
                          </span>
                          {settings.price && (
                            <span className="text-white line-through text-sm">
                              ₹{settings.price}/-
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="p-2">

                        <div className='flex justify-between items-center'>

                        <h3 className="font-medium text-lg mb-2 group-hover:text-blue-600 transition-colors duration-300">
                          {course.courseName}
                        </h3>

                        <div
                        className=" cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent clicking the card
                          setFavorites((prev) => ({
                            ...prev,
                            [course.id]: !prev[course.id], // Toggle favorite state for this course
                          }));
                        }}
                      >
                    <div className="absolute top-4 right-4 cursor-pointer" onClick={(e) => toggleWishlist(course.id, e)}>
                    {favorites.has(course.id) ? (
    <AiFillHeart className="text-red-500 text-2xl" />
) : (
    <AiOutlineHeart className="text-black text-2xl" />
)}
                    </div>
                      </div>
                        </div>


                              
                 
                        <p className="text-gray-600 text-sm mb-4">{course.trainerName}</p>

                        
                        {settings.discount && (
                          <span className="bg-black text-white text-xs px-2 py-1 rounded">
                            {settings.discount}% Off | Black Friday Sale
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default MostSellingCourses;
