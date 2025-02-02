import React, { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Featuredsection.css";
import usePreLoginFeedStore from "../../stores/preLoginFeedStore";
import { Link } from "react-router-dom";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import trackLastViewedCourse from "../../utils/trackLastViewedCourse";
import { displayToast } from "../Common/Toast/Toast";
import { addToWishlist, getWishlist, removeFromWishlist } from "../../utils/wishlist";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import useWishlistStore from "../../stores/wishlistStore";
const Featuredsection = () => {

  const { favorites, fetchWishlist, toggleWishlist } = useWishlistStore();

  useEffect(() => {
    fetchWishlist(); // Fetch wishlist when component mounts
  }, []);
  const navigate = useNavigate()




 
  
  const sliderRef = useRef(null);

  // Simplified store access
  const featured = usePreLoginFeedStore((state) => state.featured);
  const defaultImage = "https://res.cloudinary.com/devewerw3/image/upload/v1738054203/florencia-viadana-1J8k0qqUfYY-unsplash_hsheym.jpg";
  const isLoading = usePreLoginFeedStore((state) => state.isLoading);
  const error = usePreLoginFeedStore((state) => state.error);
  const fetchPreLoginFeed = usePreLoginFeedStore((state) => state.fetchPreLoginFeed);

   // Track favorite state for each course

  useEffect(() => {
    fetchPreLoginFeed();
  }, []); // Empty dependency array

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    fade: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-[#f2f9ff]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16 py-6 sm:py-12">
        {/* Header with navigation buttons */}
        <div className="flex justify-between items-center mb-4 sm:mb-8">
          <h2 className="text-lg sm:text-[22px] font-medium text-gray-800">
            Featured Courses
          </h2>
          <div className="flex gap-2 sm:gap-3">
            <button
              onClick={() => sliderRef.current?.slickPrev()}
              className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full border border-gray-300 hover:bg-white transition-colors"
            >
              <FiChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={() => sliderRef.current?.slickNext()}
              className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full border border-gray-300 hover:bg-white transition-colors"
            >
              <FiChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Course Carousel */}
        {isLoading ? (
          <Skeleton height={40} count={5} style={{ marginBottom: "10px" }} />
        ) : error ? (
          <p className="text-center text-red-500">Error: {error}</p>
        ) : (
          <Slider ref={sliderRef} {...settings}>
            {featured.map((course) => (

              
                <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                onClick={() => {
                  trackLastViewedCourse(course.id);
                  navigate(`/course/${course.id}`);
                }}
                >
                  <div className="flex flex-col lg:flex-row">
                    {/* Left side - Image */}
                    <div className="relative w-full lg:w-[360px]">
                      <div className="absolute top-3 left-3 bg-[#0056B3] text-white text-xs px-2 py-1 rounded">
                        {course.category || "Category"}
                      </div>
                      <img
                        src={course.courseImage || defaultImage}
                        alt={course.courseName || "Course Name"}
                        onError={(e) => {
                          e.target.onerror = null; // Prevent infinite loop
                          e.target.src = defaultImage;
                        }}
                        className="w-full h-[200px] sm:h-[250px] lg:h-[300px] object-cover"
                      />
                    </div>

                    {/* Right side - Content */}
                    <div className="flex-1 p-4 sm:p-6 lg:p-8">
                      <div className="flex justify-between">
                        {/* Course Details */}
                        <div>
                          <h3 className="text-base sm:text-lg lg:text-xl font-medium text-gray-800 mb-2">
                            {course.courseName || "Course Name"}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 hidden sm:block">
                            {course.courseTagline || "Course Tagline"}
                          </p>
                          <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">
                            {course.trainerName || "Instructor Name"}
                          </p>

                          <div className="flex flex-wrap items-center text-[10px] sm:text-xs text-gray-500 gap-1 sm:gap-2 mb-3 sm:mb-4">
                            <span>{course.courseDuration || "Duration Unavailable"}</span>
                            <span>•</span>
                            <span>{course.difficultyLevel || "All Levels"}</span>
                          </div>

                          <div className="flex items-center gap-2 mb-3 sm:mb-4">
                            <span className="text-lg sm:text-xl font-bold text-[#0056B3]">
                              ₹{course.courseSettings?.[0]?.offeredPrice || "N/A"}
                            </span>
                          </div>
                        </div>

                        {/* Heart Button */}
                        <div
                          className="relative ml-auto cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault(); // Prevent navigation when clicking the heart
                            setFavorites((prev) => ({
                              ...prev,
                              [course.id]: !prev[course.id], // Toggle favorite state for this course
                            }));
                          }}
                        >
                        <div
          className="cursor-pointer"
          onClick={(e) => {
            e.stopPropagation(); // Prevent card navigation
            toggleWishlist(course.id, e); // Toggle the wishlist state
          }}
        >
          {favorites.has(course.id) ? (
            <AiFillHeart className="text-red-500 text-2xl" />
          ) : (
            <AiOutlineHeart className="text-black text-2xl" />
          )}
        </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
             
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default Featuredsection;
