import React from 'react';
import { FiEye } from 'react-icons/fi';

const Header = ({ activeSection, onSave, onPreview }) => {
  return (
    <div className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-gray-800">{activeSection}</h1>
      <div className="flex gap-4">
        <button
          onClick={onPreview}
          className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
        >
          Preview
        </button>
        <button
          onClick={onSave}
          className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Header; 