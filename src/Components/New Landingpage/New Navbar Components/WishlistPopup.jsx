// WishlistPopup.jsx
import React, { useRef, useEffect } from 'react';
import '../../../App.css';

const WishlistPopup = ({ isOpen, onClose }) => {
  const popupRef = useRef(null);

  const wishlistItems = [
    {
      title: "FUNDAMENTS OF WEB DESIGN AND PRINCIPLES OF DESIGN",
      category: "Web Design",
      instructor: "Instructor Name, Degree/Qualification",
      price: "₹99/-",
      originalPrice: "₹299/-",
      rating: "4.2",
      reviews: "326"
    },
    {
      title: "FUNDAMENTS OF WEB DESIGN AND PRINCIPLES OF DESIGN",
      category: "Web Design",
      instructor: "Instructor Name, Degree/Qualification",
      price: "₹99/-",
      originalPrice: "₹299/-",
      rating: "4.2",
      reviews: "326"
    },
    {
      title: "FUNDAMENTS OF WEB DESIGN AND PRINCIPLES OF DESIGN",
      category: "Web Design",
      instructor: "Instructor Name, Degree/Qualification",
      price: "₹99/-",
      originalPrice: "₹299/-",
      rating: "4.2",
      reviews: "326"
    },
    {
      title: "BASIC FUNDAMENTALS OF PROGRAMMING LANGUAGES",
      category: "Development",
      instructor: "Instructor Name, Degree/Qualification",
      price: "₹249/-",
      originalPrice: "₹1299/-",
      rating: "4.2",
      reviews: "326"
    },
    {
      title: "BEGINNER TO MASTER JOURNEY OF JAVA SCRIPTS",
      category: "Front End Tech Stack",
      instructor: "Instructor Name, Degree/Qualification",
      price: "₹184/-",
      originalPrice: "₹349/-",
      rating: "4.2",
      reviews: "326"
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        if (!event.target.closest('.wishlist-icon')) {
          onClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="relative">
      <div 
        ref={popupRef}
        className="absolute right-0 top-2 w-[400px] bg-white rounded-lg shadow-xl border border-gray-200 max-h-[500px] notification-container z-50"
      >
        <style>
          {`
            .notification-container {
              overflow-y: auto;
            }
            
            .notification-container::-webkit-scrollbar {
              background-color: #fff;
              width: 16px;
            }

            .notification-container::-webkit-scrollbar-track {
              background-color: #fff;
            }

            .notification-container::-webkit-scrollbar-thumb {
              background-color: #babac0;
              border-radius: 16px;
              border: 4px solid #fff;
            }

            .notification-container::-webkit-scrollbar-button {
              display: none;
            }
          `}
        </style>
        <div className="divide-y divide-gray-100">
          {wishlistItems.map((item, index) => (
            <div key={index} className="hover:bg-gray-50 transition-colors duration-200">
              <div className="px-4 py-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <span className="inline-block px-2 py-0.5 text-xs rounded-md bg-gray-100 text-gray-800">
                      {item.category}
                    </span>
                    <h3 className="text-sm font-semibold text-gray-900 mt-1">{item.title}</h3>
                    <p className="text-xs text-gray-600">{item.instructor}</p>
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold">{item.price}</span>
                        <span className="text-xs text-gray-500 line-through">{item.originalPrice}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400">★★★★★</span>
                        <span className="text-xs text-gray-600">({item.rating} | {item.reviews})</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    className="ml-2 text-gray-400 hover:text-gray-600"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPopup;