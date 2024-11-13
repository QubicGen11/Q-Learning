import React, { useState } from 'react';
import { FiHelpCircle } from 'react-icons/fi';

const Tooltip = ({ content }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <span className="relative inline-block ml-2">
      <FiHelpCircle
        className="w-4 h-4 text-gray-400 cursor-help"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      />
      {isVisible && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg whitespace-nowrap z-50">
          {content}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900" />
        </div>
      )}
    </span>
  );
};

export default Tooltip; 