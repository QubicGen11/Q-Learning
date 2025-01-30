import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import trackLastViewedCourse from '../../utils/trackLastViewedCourse';
import useWishlistStore from '../../stores/wishlistStore';

const Becauseyouhaveviewd = () => {
  const [courses, setCourses] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [viewedMessage, setViewedMessage] = useState('');

  const { favorites, fetchWishlist, toggleWishlist } = useWishlistStore();

  useEffect(() => {
    fetchWishlist(); // Fetch wishlist when component mounts
  }, []);


  const navigate = useNavigate()

  const defaultImage = 'https://res.cloudinary.com/devewerw3/image/upload/v1738054203/florencia-viadana-1J8k0qqUfYY-unsplash_hsheym.jpg';

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const accessToken = Cookies.get('accessToken');
        if (!accessToken) throw new Error('User not authenticated');

        const response = await fetch(`http://localhost:8089/qlms/recommendations/what-to-learn-next`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        const data = await response.json();
        setViewedMessage(data.message);
        setCourses(data.recommendations || []);
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
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <div className="px-6 py-8">
      <div className="max-w-[1200px] mx-auto">
        {/* Display "Because you viewed..." message */}
        {viewedMessage && (
          <div className="mb-4">
            <p className="text-lg font-bold">
              {viewedMessage.split('"')[0]} "
              <Link to="#" className="text-[#0056B3] font-bold hover:underline">
                {viewedMessage.split('"')[1]}
              </Link>
              "
            </p>
          </div>
        )}

        {loading ? (
          <p className="text-center"> <Skeleton height={40} count={5} style={{ marginBottom: '10px' }} /></p>
        ) : error ? (
          <p className="text-center text-red-500">Error: {error}</p>
        ) : (
          <Slider {...sliderSettings}>
            {courses.map((course) => (
              <>
              
                <div className="bg-white h-72 w-56 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                onClick={() => {
                  trackLastViewedCourse(course.id);
                  navigate(`/course/${course.id}`);
                }}>
                  <div className="relative overflow-hidden">
                    <img
                      src={course.courseImage || defaultImage}
                      alt={course.courseName}
                      onError={(e) => {
                        e.target.onerror = null;
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
                   
                   {/* Heart fill code */}

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
              </>
              
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default Becauseyouhaveviewd;
