import React, { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import usePreLoginFeedStore from "../../stores/preLoginFeedStore";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import parse from "html-react-parser";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import trackLastViewedCourse from "../../utils/trackLastViewedCourse";

const QubinestSuggestionforyou = () => {
  const sliderRef = useRef(null);
  const defaultImage =
    'https://res.cloudinary.com/devewerw3/image/upload/v1738054203/florencia-viadana-1J8k0qqUfYY-unsplash_hsheym.jpg';

  const [favorites, setFavorites] = useState({}); // Track favorite state for each course
  const qubiNestSuggestions = usePreLoginFeedStore(state => state.qubiNestSuggestions);
  const isLoading = usePreLoginFeedStore(state => state.isLoading);
  const error = usePreLoginFeedStore(state => state.error);
  const fetchPreLoginFeed = usePreLoginFeedStore(state => state.fetchPreLoginFeed);

  useEffect(() => {
    fetchPreLoginFeed();
  }, []);

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
  };

  return (
    <div className="bg-[#f2f9ff]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16 py-6 sm:py-12">
        <div className="flex justify-between items-center mb-4 sm:mb-8">
          <h2 className="text-lg sm:text-[22px] font-medium text-gray-800">
            QubiNest Suggestions For You!
          </h2>
          <div className="flex gap-2 sm:gap-3">
            <button onClick={() => sliderRef.current?.slickPrev()} className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-white transition-colors">
              <FiChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={() => sliderRef.current?.slickNext()} className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-white transition-colors">
              <FiChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {isLoading ? (
          <Skeleton height={40} count={5} style={{ marginBottom: '10px' }} />
        ) : error ? (
          <p className="text-center text-red-500">Error: {error}</p>
        ) : (
          <Slider ref={sliderRef} {...settings}>
            {qubiNestSuggestions.map((course) => (
              <Link to={`/course/${course.id}`} key={course.id}  onClick={() => trackLastViewedCourse(course.id)}>
                <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex flex-col lg:flex-row">
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
                      {/* Heart Button */}
                      
                    </div>
                    <div className="flex-1 p-4 sm:p-6 lg:p-8">

                      <div className="flex justify-between ">
                   
                      <div>

                      <h3 className="text-base sm:text-lg lg:text-xl font-medium text-gray-800 mb-2">
                        {course.courseName || "Course Name"}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 hidden sm:block">
                        {parse(course.courseDescription || "Course Description")}
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
                        {favorites[course.id] ? (
                          <AiFillHeart className="text-red-500 text-xl" />
                        ) : (
                          <AiOutlineHeart className="text-black text-xl" />
                        )}
                      </div>

                      </div>

                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default QubinestSuggestionforyou;
