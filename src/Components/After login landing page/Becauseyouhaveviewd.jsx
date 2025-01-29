import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

const Becauseyouhaveviewd = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState({}); // Track favorite state for each course
  const defaultImage = 'https://res.cloudinary.com/devewerw3/image/upload/v1738054203/florencia-viadana-1J8k0qqUfYY-unsplash_hsheym.jpg';

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const accessToken = Cookies.get('accessToken');
        if (!accessToken) throw new Error('User not authenticated');

        const response = await fetch(`http://localhost:8089/qlms/recommendations/what-to-learn-next?userId=${accessToken}`);
        const data = await response.json();
        setCourses(data.recommendations);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  const NextArrow = ({ onClick }) => (
    <div
      className="absolute top-1/2 right-[-20px] transform -translate-y-1/2 bg-gray-200 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer shadow hover:bg-gray-300 hover:text-white z-10"
      onClick={onClick}
    >
      →
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div
      className="absolute top-1/2 left-[-20px] transform -translate-y-1/2 bg-gray-200 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer shadow hover:bg-gray-300 hover:text-white z-10"
      onClick={onClick}
    >
      ←
    </div>
  );

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="px-6 py-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-4">
          <p className="text-lg font-bold">Because you viewed "   <Link to="#" className="text-[#0056B3] font-bold hover:underline">
            User Experience Certification
          </Link>"</p>  
        
        </div>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error: {error}</p>
        ) : (
          <Slider {...sliderSettings}>
            {courses.map((course) => (
              <Link to={`/course/${course.id}`} key={course.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div key={course.id} className="bg-white h-72 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <img
                      src={course.courseImage || defaultImage}
                      alt={course.courseName}
                      onError={(e) => {
                        e.target.onerror = null; // Prevent infinite loop
                        e.target.src = defaultImage;
                      }}
                      className="w-full aspect-[4/3] object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute top-2 left-2 bg-[#0056B3] text-white text-xs px-2 py-1 rounded">
                      ₹{course.courseSettings?.[0]?.offeredPrice || 'N/A'}
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium text-[#1B1B1B] mb-2 line-clamp-2">{course.courseName}</h3>
                      <div
                        className="cursor-pointer"
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
                          <AiOutlineHeart className="text-gray-400 text-xl" />
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">{course.trainerName}</p>
                    <div className="flex items-center text-xs text-gray-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4 text-yellow-400 mr-1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c.969.093 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>({course.averageRating})</span>
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

export default Becauseyouhaveviewd;
