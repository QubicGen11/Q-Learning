import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronRight, FaChevronLeft, FaStar, FaStarHalfAlt } from 'react-icons/fa';

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("Web Development");
  const [activeSubCategory, setActiveSubCategory] = useState("Web Development");
  const [showCourseArrows, setShowCourseArrows] = useState(false);
  const [showSubCategoryArrows, setShowSubCategoryArrows] = useState(false);
  const courseSliderRef = useRef(null);
  const subCategorySliderRef = useRef(null);

  const categoryData = {
    "Web Development": {
      subCategories: [
        { name: "Web Development", learners: "13.3M+ learners" },
        { name: "JavaScript", learners: "17.7M+ learners" },
        { name: "React JS", learners: "7M+ learners" },
        { name: "Angular", learners: "4M+ learners" },
        { name: "Python", learners: "15.5M+ learners" },
    
      ],
      courses: [
        {
          title: "The Complete 2024 Web Development Bootcamp",
          instructor: "Dr. Angela Yu, Developer and Lead...",
          rating: 4.7,
          reviews: "(410,569)",
          price: "₹449",
          originalPrice: "₹3,099",
          image: "/js-react-course.jpg",
          bestseller: true
        },
        {
          title: "The Complete 2024 Web Development Bootcamp",
          instructor: "Dr. Angela Yu, Developer and Lead...",
          rating: 4.7,
          reviews: "(410,569)",
          price: "₹449",
          originalPrice: "₹3,099",
          image: "/js-react-course.jpg",
          bestseller: true
        },
        {
          title: "The Web Developer Bootcamp 2024",
          instructor: "Colt Steele",
          rating: 4.7,
          reviews: "(276,847)",
          price: "₹499",
          originalPrice: "₹3,499",
          image: "/web-dev-purple.jpg"
        },
        {
          title: "Web Development Masterclass - Online Certification Course",
          instructor: "YouAccel Training",
          rating: 4.3,
          reviews: "(10,008)",
          price: "₹499",
          originalPrice: "₹3,299",
          image: "/rocket-course.jpg"
        },
        {
          title: "The Complete Web Developer Course 3.0",
          instructor: "Rob Percival, Codestars • over 2 million...",
          rating: 4.4,
          reviews: "(72,296)",
          price: "₹699",
          originalPrice: "₹4,999",
          image: "/web-dev-course.jpg"
        }
      ]
    },
    "IT Certifications": {
      subCategories: [
        { name: "AWS Certification", learners: "6M+ learners" },
        { name: "Microsoft Certification", learners: "4.5M+ learners" },
        { name: "Cisco CCNA", learners: "3M+ learners" },
        { name: "CompTIA A+", learners: "2M+ learners" }
      ],
      courses: [
        {
          title: "AWS Certified Solutions Architect Associate",
          instructor: "Stephane Maarek",
          rating: 4.8,
          reviews: "(321,456)",
          price: "₹549",
          originalPrice: "₹3,999",
          image: "/aws-cert.jpg",
          bestseller: true
        },
        {
          title: "CompTIA A+ Certification (220-1001)",
          instructor: "Mike Meyers",
          rating: 4.7,
          reviews: "(154,789)",
          price: "₹499",
          originalPrice: "₹3,599",
          image: "/comptia.jpg"
        },
        // Add more IT cert courses...
      ]
    },
    "Leadership": {
      subCategories: [
        { name: "Management", learners: "5M+ learners" },
        { name: "Project Management", learners: "3M+ learners" },
        { name: "Business Strategy", learners: "2M+ learners" }
      ],
      courses: [
        {
          title: "Leadership: Practical Leadership Skills",
          instructor: "Chris Croft",
          rating: 4.6,
          reviews: "(98,765)",
          price: "₹449",
          originalPrice: "₹2,999",
          image: "/leadership.jpg",
          bestseller: true
        },
        // Add more leadership courses...
      ]
    },
    "Data Science": {
      subCategories: [
        { name: "Python", learners: "46.6M+ learners" },
        { name: "Machine Learning", learners: "8M+ learners" },
        { name: "Deep Learning", learners: "2M+ learners" },
        { name: "Statistics", learners: "1M+ learners" }
      ],
      courses: [
        {
          title: "Python for Data Science and Machine Learning",
          instructor: "Jose Portilla",
          rating: 4.7,
          reviews: "(234,567)",
          price: "₹649",
          originalPrice: "₹4,499",
          image: "/python-ds.jpg",
          bestseller: true
        },
        // Add more data science courses...
      ]
    }
  };

  // Update the useEffect for overflow detection
  useEffect(() => {
    const checkOverflow = () => {
      // Check course slider
      if (courseSliderRef.current) {
        const totalSlides = categoryData[activeCategory].courses.length;
        const slidesToShow = window.innerWidth >= 1024 ? 4 : 
                            window.innerWidth >= 768 ? 3 : 
                            window.innerWidth >= 640 ? 2 : 1;
        
        setShowCourseArrows(totalSlides > slidesToShow);
      }

      // Check subcategory slider
      if (subCategorySliderRef.current) {
        const totalSubCategories = categoryData[activeCategory].subCategories.length;
        const subCategoriesToShow = window.innerWidth >= 1024 ? 6 : 
                                   window.innerWidth >= 768 ? 4 : 3;
        
        setShowSubCategoryArrows(totalSubCategories > subCategoriesToShow);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [activeCategory, categoryData]);

  // Custom arrow components
  const NextArrow = ({ onClick, show }) => (
    show ? (
      <button
        onClick={onClick}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center border border-gray-300 bg-white hover:bg-gray-100 transition-colors -right-6"
      >
        <FaChevronRight className="w-5 h-5 text-gray-700" />
      </button>
    ) : null
  );

  const PrevArrow = ({ onClick, show }) => (
    show ? (
      <button
        onClick={onClick}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center border border-gray-300 bg-white hover:bg-gray-100 transition-colors -left-6"
      >
        <FaChevronLeft className="w-5 h-5 text-gray-700" />
      </button>
    ) : null
  );

  // Updated settings for subcategories carousel
  const subCategorySettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        }
      }
    ],
    nextArrow: <NextArrow show={showSubCategoryArrows} />,
    prevArrow: <PrevArrow show={showSubCategoryArrows} />
  };

  // Updated settings for courses carousel
  const courseSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        }
      }
    ],
    nextArrow: <NextArrow show={showCourseArrows} />,
    prevArrow: <PrevArrow show={showCourseArrows} />
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < Math.floor(rating)) {
        stars.push(<FaStar key={i} className="text-[#b4690e] w-3 h-3" />);
      } else if (i === Math.floor(rating) && rating % 1 !== 0) {
        stars.push(<FaStarHalfAlt key={i} className="text-[#b4690e] w-3 h-3" />);
      } else {
        stars.push(<FaStar key={i} className="text-gray-300 w-3 h-3" />);
      }
    }
    return stars;
  };

  return (
    <div className="max-w-[1340px] mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-2">
        All the skills you need in one place
      </h1>
      <p className="text-gray-600 mb-8">
        From critical skills to technical topics, Udemy supports your professional development.
      </p>

      {/* Main Categories */}
      <div className="border-b border-gray-200 mb-6">
        {Object.keys(categoryData).map((category) => (
          <button
            key={category}
            onClick={() => {
              setActiveCategory(category);
              setActiveSubCategory(categoryData[category].subCategories[0].name);
            }}
            className={`px-4 py-3 mr-4 font-medium relative ${
              activeCategory === category
                ? 'text-black border-b-2 border-black -mb-[2px]'
                : 'text-gray-600'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Sub Categories Carousel */}
      <div className="relative px-2 mb-8">
        <Slider 
          ref={subCategorySliderRef}
          {...subCategorySettings} 
          className="subcategories-slider"
        >
          {categoryData[activeCategory].subCategories.map((category, index) => (
            <div key={index} className="px-2">
              <div
                onClick={() => setActiveSubCategory(category.name)}
                className={`flex items-center px-4 py-2 rounded-full cursor-pointer
                  ${category.name === activeSubCategory 
                    ? 'bg-black text-white' 
                    : 'bg-gray-100 text-gray-700'}`}
              >
                <div className='flex items-center gap-2 flex-col'>
                    <span className="font-medium whitespace-nowrap">{category.name}</span>
                    <span className="text-sm ml-2 opacity-75 whitespace-nowrap">{category.learners}</span>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Courses Carousel */}
      <div className="relative px-2">
        <Slider 
          ref={courseSliderRef}
          {...courseSettings} 
          className="course-slider"
        >
          {categoryData[activeCategory].courses.map((course, index) => (
            <div key={index} className="px-2 h-full">
              <div className="bg-white border border-gray-200 hover:shadow-md transition-shadow duration-200 h-[400px] flex flex-col">
                {/* Image Container - Fixed height */}
                <div className="w-full h-[180px]">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content Container - Flex grow to fill remaining space */}
                <div className="p-4 flex flex-col flex-grow">
                  {/* Title - Fixed height */}
                  <h3 className="font-bold text-base mb-2 line-clamp-2 min-h-[40px]">
                    {course.title}
                  </h3>

                  {/* Instructor */}
                  <p className="text-sm text-gray-600 mb-2 truncate">
                    {course.instructor}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    <span className="font-bold text-sm">{course.rating}</span>
                    <div className="flex">
                      {renderStars(course.rating)}
                    </div>
                    <span className="text-sm text-gray-600">
                      {course.reviews}
                    </span>
                  </div>

                  {/* Price section - Push to bottom */}
                  <div className="mt-auto">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-bold">{course.price}</span>
                      <span className="text-gray-600 line-through text-sm">
                        {course.originalPrice}
                      </span>
                    </div>

                    {course.bestseller && (
                      <span className="inline-block bg-[#eceb98] text-[#3d3c0a] text-xs font-bold px-2 py-1">
                        Bestseller
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <style jsx global>{`
        .course-slider .slick-track,
        .subcategories-slider .slick-track {
          display: flex !important;
          margin-left: 0 !important;
        }

        .course-slider .slick-slide,
        .subcategories-slider .slick-slide {
          height: inherit !important;
        }

        .course-slider .slick-slide > div,
        .subcategories-slider .slick-slide > div {
          height: 100%;
        }

        .course-slider .slick-list,
        .subcategories-slider .slick-list {
          margin: 0 -8px;
        }

        /* Hide disabled arrows */
        .course-slider .slick-disabled,
        .subcategories-slider .slick-disabled {
          display: none !important;
        }

        @media (max-width: 640px) {
          .course-slider .slick-prev,
          .course-slider .slick-next,
          .subcategories-slider .slick-prev,
          .subcategories-slider .slick-next {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default SkillsSection;
