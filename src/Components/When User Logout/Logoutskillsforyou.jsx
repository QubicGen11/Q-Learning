import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Logoutskillsforyou.css'

const Logoutskillsforyou = () => {
  const categories = [
    "Design", "Data Science", "Web Development", "Civil Engineering", 
    "Electronics", "Chip Level", "Communication", "IT Certifications", 
    "Leadership", "Photography"
  ];

  const designCourses = [
    {
      title: "Basic Fundamentals of User Experience Design",
      instructor: "Instructor Name, Degree/Qualification",
      rating: "(21)",
      price: "₹399",
      image: "https://res.cloudinary.com/devewerw3/image/upload/v1733726889/image-11_s1glto.png"
    },
    {
      title: "Basic Fundamentals of User Experience Design",
      instructor: "Instructor Name, Degree/Qualification",
      rating: "(21)",
      price: "₹399",
      image: "https://res.cloudinary.com/devewerw3/image/upload/v1733726889/image-11_s1glto.png"
    },
    {
      title: "Basic Fundamentals of User Experience Design",
      instructor: "Instructor Name, Degree/Qualification",
      rating: "(21)",
      price: "₹399",
      image: "https://res.cloudinary.com/devewerw3/image/upload/v1733726889/image-11_s1glto.png"
    },
    {
      title: "Basic Fundamentals of User Experience Design",
      instructor: "Instructor Name, Degree/Qualification",
      rating: "(21)",
      price: "₹399",
      image: "https://res.cloudinary.com/devewerw3/image/upload/v1733726889/image-11_s1glto.png"
    },
    {
      title: "Basic Fundamentals of User Experience Design",
      instructor: "Instructor Name, Degree/Qualification",
      rating: "(21)",
      price: "₹399",
      image: "https://res.cloudinary.com/devewerw3/image/upload/v1733726889/image-11_s1glto.png"
    },
    {
      title: "Fundamentals of User Experience Principles",
      instructor: "Instructor Name, Degree/Qualification",
      rating: "(21)",
      price: "₹299",
      image: "https://res.cloudinary.com/devewerw3/image/upload/v1733726888/image-10_b1usms.png"
    },
    {
      title: "Basics of User Experience Design Patterns",
      instructor: "Instructor Name, Degree/Qualification",
      rating: "(21)",
      price: "₹199",
      image: "https://res.cloudinary.com/devewerw3/image/upload/v1733726890/image-12_kamzak.png"
    },
    {
      title: "Principles of User Experience & User Interface Design",
      instructor: "Instructor Name, Degree/Qualification",
      rating: "(21)",
      price: "₹449",
      image: "https://res.cloudinary.com/devewerw3/image/upload/v1733726886/image-2_qyye1q.png"
    },
    {
      title: "Laws & Principles of User Experience Design",
      instructor: "Instructor Name, Degree/Qualification",
      rating: "(21)",
      price: "₹449",
      image: "https://res.cloudinary.com/devewerw3/image/upload/v1733726887/image-5_u4mnm5.png"
    }
  ];

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-20 py-8 overflow-hidden">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        SKILLS FOR YOUR PRESENT (AND YOUR FUTURE)
      </h2>
      
      {/* Categories Navigation */}
      <div className="flex overflow-x-auto scrollbar-hide space-x-6 mb-8 pb-2">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`whitespace-nowrap px-4 py-2 text-sm font-medium transition-all duration-300 ${
              index === 0 
                ? "text-blue-600 border-b-2 border-blue-600" 
                : "text-gray-600 hover:text-blue-600 hover:border-b-2 hover:border-blue-600"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Design Courses Section */}
   

      {/* Course Cards Carousel */}
      <Slider {...sliderSettings}>
        {designCourses.map((course, index) => (
          <div key={index} className="px-2">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
              <div className="relative overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-40 object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-2 left-2 bg-[#0056B3] text-white text-xs px-2 py-1 rounded">
                  {course.price}
                </div>
              </div>
              <div className="p-4">
                <h4 className="text-sm font-medium text-[#1B1B1B] mb-2 line-clamp-2">
                  {course.title}
                </h4>
                <p className="text-xs text-gray-500 mb-2">
                  {course.instructor}
                </p>
                <div className="flex items-center text-xs text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-400 mr-1">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                  <span>{course.rating}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

// Custom arrows for the carousel
function SampleNextArrow(props) {
  const { className, onClick, currentSlide, slideCount, slidesToShow } = props;
  const isLastSlide = currentSlide + slidesToShow >= slideCount;
  
  return (
    <div
      className={`${className} custom-arrow next-arrow ${isLastSlide ? 'hidden' : ''}`}
      onClick={onClick}
    >
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
  const { className, onClick, currentSlide } = props;
  
  return (
    <div
      className={`${className} custom-arrow prev-arrow ${currentSlide === 0 ? 'hidden' : ''}`}
      onClick={onClick}
    >
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