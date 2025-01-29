import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Logoutskillsforyou.css';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import trackLastViewedCourse from '../../utils/trackLastViewedCourse';

const Logoutskillsforyou = () => {
  const [categoryData, setCategoryData] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const defaultImage = 'https://res.cloudinary.com/devewerw3/image/upload/v1738054203/florencia-viadana-1J8k0qqUfYY-unsplash_hsheym.jpg';

  // Fetch recommendations from API
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch('http://localhost:8089/qlms/recommendations');
        if (!response.ok) {
          throw new Error('Failed to fetch recommendations');
        }
        const data = await response.json();

        console.log('API Response:', data);

        const skillsForYou = data.recommendations.skillsForYou || [];
        const groupedData = skillsForYou.reduce((acc, item) => {
          const { category } = item;
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(item);
          return acc;
        }, {});

        setCategoryData(groupedData);

        // Set initial selected category and courses
        const firstCategory = Object.keys(groupedData)[0];
        if (firstCategory) {
          setSelectedCategory(firstCategory);
          setCourses(groupedData[firstCategory]);
        }
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCourses(categoryData[category] || []);
  };

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  if (isLoading) {
    return <Skeleton height={40} count={5} style={{ marginBottom: '10px' }}  />;
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-20 py-8 overflow-hidden">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        SKILLS FOR YOUR PRESENT (AND YOUR FUTURE)
      </h2>

      {/* Categories Navigation */}
      <div className="flex overflow-x-auto scrollbar-hide space-x-6 mb-8 pb-2">
        {Object.keys(categoryData).map((category, index) => (
          <button
            key={index}
            onClick={() => handleCategoryChange(category)}
            className={`whitespace-nowrap px-4 py-2 text-sm font-medium transition-all duration-300 ${
              selectedCategory === category
                ? 'text-blue-600 border-b-2 border-blue-600 bg-[#f2f9ff]'
                : 'text-gray-600 hover:text-blue-600 hover:border-b-2 hover:border-blue-600'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Courses Section */}
      {courses.length > 0 ? (
        <Slider {...sliderSettings}>
          {courses.map((course, index) => (
            <Link to={`/course/${course.id}`} key={course.id} onClick={() => trackLastViewedCourse(course.id)}>

            <div key={course.id} className="px-2">
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div className="relative overflow-hidden">
                  <img
                    src={course.courseImage || course.categoryImage || defaultImage}
                    alt={course.courseName}
                    onError={(e) => {
                      e.target.onerror = null; // Prevent infinite loop
                      e.target.src = defaultImage;
                    }}
                    className="w-full h-40 object-cover transition-transform duration-300 hover:scale-110"

                  />
                  {/* <div className="absolute top-2 left-2 bg-[#0056B3] text-white text-xs px-2 py-1 rounded">
                    {course.price || 'Free'}
                  </div> */}
                </div>
                <div className="p-4">
                  <h4 className="text-sm font-medium text-[#1B1B1B] mb-2 line-clamp-2">
                    {course.courseName}
                  </h4>
                  <p className="text-xs text-gray-500 mb-2">
                    {course.trainerName || 'Instructor'}
                  </p>
                  <div className="flex items-center text-xs text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4 text-yellow-400 mr-1"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{course.averageRating || '(0)'}</span>
                  </div>
                </div>
              </div>
            </div>
            </Link>
          ))}
        </Slider>
      ) : (
        <div className="text-center text-gray-600 mt-8">
          No courses available for this category.
        </div>
      )}
    </div>
  );
};

// Custom arrows for the carousel
function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <div className={`${className} custom-arrow next-arrow`} onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div className={`${className} custom-arrow prev-arrow`} onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
    </div>
  );
}

export default Logoutskillsforyou;
