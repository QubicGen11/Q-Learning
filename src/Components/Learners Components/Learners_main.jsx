import React from 'react';
import { FaChevronRight, FaChevronLeft, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Learners_main = () => {
  const courses = [
    {
      id: 1,
      title: "100 Days of Code: The Complete Python Pro Bootcamp",
      instructor: "Dr. Angela Yu, Developer and Lead Instructor",
      rating: 4.7,
      reviews: 332843,
      image: "https://res.cloudinary.com/devewerw3/image/upload/v1731319985/image_1613_kqxx5t.jpg",
      price: "₹499",
      originalPrice: "₹3,299",
      bestseller: true
    },
    {
      id: 1,
      title: "100 Days of Code: The Complete Python Pro Bootcamp",
      instructor: "Dr. Angela Yu, Developer and Lead Instructor",
      rating: 4.7,
      reviews: 332843,
      image: "https://res.cloudinary.com/devewerw3/image/upload/v1731319985/image_1613_kqxx5t.jpg",
      price: "₹499",
      originalPrice: "₹3,299",
      bestseller: true
    },
    {
      id: 1,
      title: "100 Days of Code: The Complete Python Pro Bootcamp",
      instructor: "Dr. Angela Yu, Developer and Lead Instructor",
      rating: 4.7,
      reviews: 332843,
      image: "https://res.cloudinary.com/devewerw3/image/upload/v1731319985/image_1613_kqxx5t.jpg",
      price: "₹499",
      originalPrice: "₹3,299",
      bestseller: true
    },
    {
      id: 2,
      title: "The Complete 2024 Web Development Bootcamp",
      instructor: "Dr. Angela Yu, Developer and Lead Instructor",
      rating: 4.7,
      reviews: 410569,
      image: "https://res.cloudinary.com/devewerw3/image/upload/v1731318298/image_1608_1_gzkxsp.jpg",
      price: "₹449",
      originalPrice: "₹3,099",
      bestseller: true
    },
    {
      id: 3,
      title: "[NEW] Ultimate AWS Certified Cloud Practitioner CLF-C02",
      instructor: "Stephane Maarek | AWS Certified Cloud Architect",
      rating: 4.7,
      reviews: 225542,
      image: "https://res.cloudinary.com/devewerw3/image/upload/v1731318562/image_1610_1_leynal.jpg",
      price: "₹499",
      originalPrice: "₹3,499",
      bestseller: true
    },
    {
      id: 4,
      title: "Ultimate AWS Certified Solutions Architect Associate SAA-C03",
      instructor: "Stephane Maarek | AWS Certified Cloud Architect",
      rating: 4.7,
      reviews: 239293,
      image: "https://res.cloudinary.com/devewerw3/image/upload/v1731318562/image_1610_1_leynal.jpg",
      price: "₹499",
      originalPrice: "₹3,499",
      bestseller: true
    }
  ];

  // Custom arrow components
  const NextArrow = ({ onClick }) => (
    <div
      onClick={onClick}
      className="!absolute cursor-pointer"
      style={{
        top: '50%',
        transform: 'translateY(-50%)',
        right: '-8px',
        zIndex: 10,
      }}
    >
      <div className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-300 bg-white hover:bg-gray-100 transition-colors">
        <FaChevronRight className="w-4 h-4 text-gray-700" />
      </div>
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div
      onClick={onClick}
      className="!absolute cursor-pointer"
      style={{
        top: '50%',
        transform: 'translateY(-50%)',
        left: '-8px',
        zIndex: 10,
      }}
    >
      <div className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-300 bg-white hover:bg-gray-100 transition-colors">
        <FaChevronLeft className="w-4 h-4 text-gray-700" />
      </div>
    </div>
  );

  // Slider settings
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
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
        breakpoint: 640,
        settings: {
          slidesToShow: 1.1,
          slidesToScroll: 1,
          arrows: false,
        }
      }
    ]
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
    <div className="max-w-[1340px] mx-auto px-4 sm:px-12 py-6 sm:py-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          Learners are viewing
        </h2>
      </div>

      <div className="relative mx-4 sm:mx-0">
        <Slider {...settings} className="course-slider">
          {courses.map((course) => (
            <div key={course.id} className="px-2">
              <div className="bg-white border border-gray-200 hover:shadow-md transition-shadow duration-200">
                <div className="relative">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full aspect-video object-cover"
                  />
                </div>

                <div className="p-3 sm:p-4">
                  <h3 className="font-bold text-sm sm:text-base mb-1 line-clamp-2 h-12">
                    {course.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 mb-1 truncate">
                    {course.instructor}
                  </p>

                  <div className="flex items-center gap-1 mb-1">
                    <span className="font-bold text-sm">{course.rating}</span>
                    <div className="flex">
                      {renderStars(course.rating)}
                    </div>
                    <span className="text-xs sm:text-sm text-gray-600">
                      ({course.reviews.toLocaleString()})
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm sm:text-base">{course.price}</span>
                    <span className="text-gray-600 line-through text-xs sm:text-sm">
                      {course.originalPrice}
                    </span>
                  </div>

                  {course.bestseller && (
                    <span className="inline-block bg-[#eceb98] text-[#3d3c0a] text-[10px] sm:text-xs 
                                   font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 mt-2">
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
        .course-slider .slick-track {
          display: flex !important;
          margin-left: 0 !important;
        }

        .course-slider .slick-slide {
          height: inherit !important;
        }

        .course-slider .slick-slide > div {
          height: 100%;
        }

        .course-slider .slick-list {
          margin: 0 -8px;
          overflow: hidden !important;
        }

        /* Slider container */
        .slick-slider {
          position: relative !important;
          padding: 0 8px !important;
        }

        /* Navigation button styles */
        .slick-arrow {
          position: absolute !important;
          top: 50% !important;
          transform: translateY(-50%) !important;
          z-index: 10 !important;
          width: 40px !important;
          height: 40px !important;
          transition: none !important;
        }

        .slick-arrow:hover {
          top: 50% !important;
          transform: translateY(-50%) !important;
        }

        .slick-arrow:before {
          display: none !important;
        }

        .slick-prev {
          left: -8px !important;
        }

        .slick-next {
          right: -8px !important;
        }

        /* Hide disabled arrows */
        .slick-disabled {
          opacity: 0 !important;
          cursor: default !important;
          pointer-events: none !important;
        }

        @media (max-width: 640px) {
          .slick-slider {
            margin: 0 -16px !important;
            padding: 0 16px !important;
          }
          
          .slick-list {
            overflow: visible !important;
            margin: 0 -8px !important;
          }

          .slick-slide {
            padding: 0 8px !important;
          }

          .slick-prev,
          .slick-next {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Learners_main;
