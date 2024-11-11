import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("Web Development");
  const [activeSubCategory, setActiveSubCategory] = useState("Web Development");

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

  // Settings for subcategories carousel
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
    ]
  };

  // Settings for courses carousel
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
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
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
      <div className="mb-8 relative">
        <Slider {...subCategorySettings} className="subcategories-slider">
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
      <div className="relative">
        <Slider {...courseSettings} className="courses-slider">
          {categoryData[activeCategory].courses.map((course, index) => (
            <div key={index} className="px-2">
              <div className="border rounded-lg hover:shadow-lg transition-shadow">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full aspect-video object-cover rounded-t-lg"
                />
                <div className="p-3">
                  <h3 className="font-bold text-xs mb-1 line-clamp-2 h-10 ">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 text-xs mb-1 truncate">
                    {course.instructor}
                  </p>
                  <div className="flex items-center gap-1">
                    <span className="text-orange-700 font-bold">{course.rating}</span>
                    <span className="text-gray-500 text-sm whitespace-nowrap">{course.reviews}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="font-bold whitespace-nowrap">{course.price}</span>
                    <span className="text-gray-500 line-through whitespace-nowrap">{course.originalPrice}</span>
                  </div>
                  {course.bestseller && (
                    <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 mt-2">
                      Bestseller
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <style jsx global>{`
        /* Custom styles for the carousels */
        .subcategories-slider .slick-prev,
        .subcategories-slider .slick-next,
        .courses-slider .slick-prev,
        .courses-slider .slick-next {
          width: 40px;
          height: 40px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          z-index: 10;
        }

        .subcategories-slider .slick-prev:hover,
        .subcategories-slider .slick-next:hover,
        .courses-slider .slick-prev:hover,
        .courses-slider .slick-next:hover {
          background: white;
        }

        .subcategories-slider .slick-prev:before,
        .subcategories-slider .slick-next:before,
        .courses-slider .slick-prev:before,
        .courses-slider .slick-next:before {
          color: #1c1d1f;
          opacity: 1;
        }

        .subcategories-slider .slick-prev {
          left: -20px;
        }

        .subcategories-slider .slick-next {
          right: -20px;
        }

        .courses-slider .slick-prev {
          left: -20px;
        }

        .courses-slider .slick-next {
          right: -20px;
        }

        /* Hide arrows when they're not needed */
        .slick-disabled {
          opacity: 0;
          pointer-events: none;
        }

        /* Add these new styles */
        .courses-slider .slick-slide {
          height: auto; /* Ensure consistent height */
        }

        .courses-slider .slick-track {
          display: flex;
          align-items: stretch;
        }

        .courses-slider .slick-slide > div {
          height: 100%;
        }

        .courses-slider .slick-slide > div > div {
          height: 100%;
        }
      `}</style>
    </div>
  );
};

export default SkillsSection;
