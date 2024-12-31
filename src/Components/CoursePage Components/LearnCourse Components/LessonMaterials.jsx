import React, { useState } from 'react';

const LessonMaterials = ({ lessonMaterials }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between border-b border-gray-200 pb-2">
        <div className="flex items-center space-x-1 text-[#0056B3] cursor-pointer p-2 bg-[#F3F4F6] rounded-lg">
          <span>Show Transcript</span>
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 16 16" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="transform rotate-180"
          >
            <path 
              d="M4 6L8 10L12 6" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
        
        <div 
          onClick={() => setIsDrawerOpen(true)}
          className="flex items-center text-[#0056B3] p-2 bg-[#F3F4F6] rounded-lg cursor-pointer hover:bg-[#E5E7EB]"
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 16 16" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="mr-1"
          >
            <path
              d="M2 4C2 3.44772 2.44772 3 3 3H6.5C6.81476 3 7.11115 3.14819 7.30208 3.4L8.19792 4.6C8.38885 4.85181 8.68524 5 9 5H13C13.5523 5 14 5.44772 14 6V12C14 12.5523 13.5523 13 13 13H3C2.44772 13 2 12.5523 2 12V4Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Materials</span>
        </div>
      </div>
      
      <div className="mt-4 text-gray-600 leading-relaxed text-[15px]">
        User Experience, or UX, is an exciting field. It's essentially about empowering people to do the things they want to do, which is both fun and gratifying. And, having a great user experience drives business success...
      </div>

      {/* Materials Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        } z-50`}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Materials</h2>
            <button 
              onClick={() => setIsDrawerOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {/* Display lesson materials */}
          <div className="mt-4">
            <a 
              href={lessonMaterials}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
            >
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" 
                  fill="currentColor"
                />
              </svg>
              Download Course Materials
            </a>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isDrawerOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}
    </div>
  );
};

export default LessonMaterials;