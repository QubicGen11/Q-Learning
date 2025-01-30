import React, { useRef, useEffect, useState } from "react";

import "../../../App.css";
import { getWishlist } from "../../../utils/wishlist";
import { useNavigate } from "react-router-dom";

const WishlistPopup = ({ isOpen, onClose }) => {
  const popupRef = useRef(null);
  const [wishlistItems, setWishlistItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const response = await getWishlist();
        console.log("Fetched Wishlist:", response); // ✅ Debugging API response

        if (response?.wishlist && Array.isArray(response.wishlist)) {
          setWishlistItems(response.wishlist); // ✅ Store fetched wishlist
        } else {
          console.warn("Wishlist is empty or not an array:", response);
        }
      } catch (error) {
        console.error("Error loading wishlist:", error);
      }
    };

    if (isOpen) {
      loadWishlist();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        if (!event.target.closest(".wishlist-icon")) {
          onClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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
          {wishlistItems.length > 0 ? (
            wishlistItems.map((wishlistItem, index) => {
              console.log("Wishlist Item:", wishlistItem); // ✅ Debugging each item
              const course = wishlistItem?.course;
              if (!course) {
                console.warn(`Course data missing for wishlist item ${index}`, wishlistItem);
                return null;
              }

              return (
                <div key={course.id} className="hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                onClick={() => {
                  
                  navigate(`/course/${course.id}`);
                }}>
                  <div className="px-4 py-2">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <span className="inline-block px-2 py-0.5 text-xs rounded-md bg-gray-100 text-gray-800">
                          {course.category || "No Category"}
                        </span>
                        <h3 className="text-sm font-semibold text-gray-900 mt-1">
                          {course.courseName || "No Title"}
                        </h3>
                        <p className="text-xs text-gray-600">{course.trainerName || "Unknown Instructor"}</p>
                        <div className="flex items-center justify-between mt-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold">
                              ₹{course.courseSettings?.[0]?.offeredPrice || "N/A"}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-400">★★★★★</span>
                            <span className="text-xs text-gray-600">
                              ({course.averageRating || "0.0"})
                            </span>
                          </div>
                        </div>
                      </div>
                     
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center py-4 text-gray-600">Your wishlist is empty.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishlistPopup;
