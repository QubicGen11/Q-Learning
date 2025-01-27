import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser';

const CourseDesc = ({ courseDescription }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShowButton, setShouldShowButton] = useState(false);

  useEffect(() => {
    // Check if description has more than 30 words
    if (courseDescription) {
      // Strip HTML tags for word count
      const plainText = courseDescription.replace(/<[^>]+>/g, '');
      const wordCount = plainText.trim().split(/\s+/).length;
      setShouldShowButton(wordCount > 30);
    }
  }, [courseDescription]);

  return (
    <div className="w-full bg-[#F3F4F6]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Description</h2>
          
          <div className="w-full">
            <div className={`space-y-4 ${!isExpanded && shouldShowButton ? 'line-clamp-3' : ''}`}>
              <div className="text-gray-700">
                {courseDescription ? parse(courseDescription) : 'No description available'}
              </div>
            </div>

            {shouldShowButton && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-[#0056B3] font-medium mt-2 hover:underline focus:outline-none"
              >
                {isExpanded ? 'READ LESS' : 'READ MORE'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDesc;