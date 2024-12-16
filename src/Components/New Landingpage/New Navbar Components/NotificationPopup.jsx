// Create a new file: NotificationPopup.jsx
import React, { useRef, useEffect } from 'react';
import '../../../App.css';

const NotificationPopup = ({ isOpen, onClose }) => {
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        // Check if the click is not on the bell icon (you might need to adjust the selector)
        if (!event.target.closest('.notification-bell')) {
          onClose();
        }
      }
    };

    // Add event listener when popup is open
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const notifications = [
    {
      heading: "NOTIFICATION HEADING",
      category: "Category of Notification",
      summary: "Summary and content of the notification",
      categoryColor: "#FFB800" // Yellow
    },
    {
      heading: "NOTIFICATION HEADING",
      category: "Category of Notification",
      summary: "Summary and content of the notification",
      categoryColor: "#DC3545" // Red
    },
    {
      heading: "NOTIFICATION HEADING",
      category: "Category of Notification",
      summary: "Summary and content of the notification",
      categoryColor: "#0056B3" // Blue
    },
    {
      heading: "NOTIFICATION HEADING",
      category: "Category of Notification",
      summary: "Summary and content of the notification",
      categoryColor: "#28A745" // Green
    },
    {
      heading: "NOTIFICATION HEADING",
      category: "Category of Notification",
      summary: "Summary and content of the notification",
      categoryColor: "#6C757D" // Gray
    },
    {
      heading: "NOTIFICATION HEADING",
      category: "Category of Notification",
      summary: "Summary and content of the notification",
      categoryColor: "#6C757D" // Gray
    },
    {
      heading: "NOTIFICATION HEADING",
      category: "Category of Notification",
      summary: "Summary and content of the notification",
      categoryColor: "#6C757D" // Gray
    },
  ];

  if (!isOpen) return null;

  return (
    <div 
      ref={popupRef}
      className="absolute right-0 mt-2 w-[400px] bg-white rounded-lg shadow-xl border border-gray-200 max-h-[500px] notification-container"
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

          .category-badge {
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 500;
            color: white;
          }
        `}
      </style>

      <div className="py-2">
        {notifications.map((notification, index) => (
          <div key={index} className="px-4 py-3 hover:bg-gray-50 transition-colors duration-200">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-900">{notification.heading}</h3>
                <div className="mt-1">
                  <span 
                    className="category-badge"
                    style={{ backgroundColor: notification.categoryColor }}
                  >
                    {notification.category}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600">{notification.summary}</p>
              </div>
              <button 
                className="ml-4 text-gray-400 hover:text-gray-600"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent event bubbling
                  // Add logic to remove this specific notification
                }}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPopup;