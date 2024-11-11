import React, { useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel_main = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    className: "main-slider",
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex)
  };

  const slides = [
    {
      title: "Master Web Development",
      description: "Build responsive websites and dynamic web applications. Special offer: Courses from ₹449 only!",
      image: "https://res.cloudinary.com/devewerw3/image/upload/v1731319985/image_1613_kqxx5t.jpg",
    //   bgColor: "#BF28FE"
    },
    {
      title: "Learn Data Science & AI",
      description: "Transform your career with cutting-edge AI and ML skills. Courses starting at ₹449 today only!",
      image: "https://res.cloudinary.com/devewerw3/image/upload/v1731318298/image_1608_1_gzkxsp.jpg",
    //   bgColor: "#003366"
    },
    {
      title: "Boost Your Business Skills",
      description: "From leadership to analytics - upgrade your business acumen. Limited time offer at ₹449!",
      image: "https://res.cloudinary.com/devewerw3/image/upload/v1731318562/image_1610_1_leynal.jpg",
    //   bgColor: "#3D5300"
    }
  ];

  return (
    <div className="carousel-container" style={{ background: slides[currentSlide].bgColor }}>
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="carousel-slide">
            <div className="slide-content">
              <div className="image-content">
                <img src={slide.image} alt={slide.title} />
                <div className="overlay-text">
                  <h2>{slide.title}</h2>
                  <p>{slide.description}</p>
                  <button className="cta-button">Start Learning</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      <style jsx global>{`
        .carousel-container {
          position: relative;
          width: 100%;
          overflow: hidden;
          transition: background-color 0.5s ease;
        }

        .carousel-slide {
          position: relative;
          height: 500px;
        }

        @media (max-width: 1024px) {
          .carousel-slide {
            height: 500px;
          }
        }

        @media (max-width: 768px) {
          .carousel-slide {
            height: 400px;
          }
        }

        @media (max-width: 480px) {
          .carousel-slide {
            height: 300px;
          }
        }

        .slide-content {
          height: 100%;
          width: 100%;
        }

        .image-content {
          position: relative;
          height: 100%;
          width: 100%;
        }

        .image-content img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .overlay-text {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 2rem;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
          color: white;
        }

        .overlay-text h2 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        .overlay-text p {
          font-size: 1.2rem;
          margin-bottom: 1.5rem;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
        }

        @media (max-width: 768px) {
          .overlay-text h2 {
            font-size: 1.8rem;
          }

          .overlay-text p {
            font-size: 1rem;
          }
        }

        @media (max-width: 480px) {
          .overlay-text {
            padding: 1rem;
          }

          .overlay-text h2 {
            font-size: 1.4rem;
            margin-bottom: 0.5rem;
          }

          .overlay-text p {
            font-size: 0.9rem;
            margin-bottom: 1rem;
          }
        }

        .cta-button {
          background-color: #fa4616;
          color: white;
          padding: 0.8rem 1.5rem;
          border-radius: 4px;
          font-weight: 600;
          border: none;
          transition: background-color 0.2s;
        }

        .cta-button:hover {
          background-color: #e03a0d;
        }

        @media (max-width: 480px) {
          .cta-button {
            padding: 0.6rem 1rem;
            font-size: 0.9rem;
          }
        }

        /* Slider Navigation Styles */
        .slick-dots {
          bottom: 20px !important;
          z-index: 1;
        }

        .slick-dots li button:before {
          color: white !important;
          font-size: 10px !important;
          opacity: 0.8;
        }

        .slick-dots li.slick-active button:before {
          opacity: 1;
        }

        .slick-prev,
        .slick-next {
          z-index: 1;
          width: 40px !important;
          height: 40px !important;
          background: rgba(255, 255, 255, 0.3) !important;
          border-radius: 50% !important;
          backdrop-filter: blur(4px);
        }

        .slick-prev {
          left: 20px !important;
        }

        .slick-next {
          right: 20px !important;
        }

        @media (max-width: 768px) {
          .slick-prev,
          .slick-next {
            width: 35px !important;
            height: 35px !important;
          }

          .slick-prev {
            left: 10px !important;
          }

          .slick-next {
            right: 10px !important;
          }
        }

        @media (max-width: 480px) {
          .slick-prev,
          .slick-next {
            width: 30px !important;
            height: 30px !important;
          }

          .slick-prev {
            left: 5px !important;
          }

          .slick-next {
            right: 5px !important;
          }
        }

        .slick-prev:before,
        .slick-next:before {
          color: white !important;
          font-size: 24px !important;
          opacity: 1 !important;
        }

        @media (max-width: 768px) {
          .slick-prev:before,
          .slick-next:before {
            font-size: 20px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Carousel_main;
