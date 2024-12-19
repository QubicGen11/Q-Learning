import React from 'react';

const LessonMaterials = () => {
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
        
        <div className="flex items-center text-[#0056B3] p-2 bg-[#F3F4F6] rounded-lg">
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
    </div>
  );
};

export default LessonMaterials;