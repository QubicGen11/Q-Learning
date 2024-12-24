import React from 'react';

const CaptionControls = () => {
  return (
    <div className="absolute bottom-16 right-4 bg-white rounded-lg shadow-lg p-2">
      <button className="flex items-center gap-2 text-gray-700 hover:text-blue-600 px-3 py-2">
        <span className="material-icons text-sm">closed_caption</span>
        <span>English</span>
      </button>
      {/* Add more language options as needed */}
    </div>
  );
};

export default CaptionControls; 