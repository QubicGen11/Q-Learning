import React from 'react';
import { FiEye } from 'react-icons/fi';

const Header = ({ activeSection, onPreview, onSave }) => {
  const getSectionTitle = (section) => {
    const titles = {
      basicInfo: 'Basic Information',
      aboutCourse: 'About This Course',
      curriculum: 'Curriculum',
      lessons: 'Lessons',
      assignments: 'Assignments',
      resources: 'Resources',
      pricing: 'Pricing',
      access: 'Access Control',
      settings: 'Course Settings'
    };
    return titles[section] || 'Course Setup';
  };

  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          {getSectionTitle(activeSection)}
        </h1>
        <div className="flex items-center space-x-4">
          <button 
            onClick={onPreview}
            className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            <FiEye className="text-gray-600" />
            <span>Preview</span>
          </button>
          <button 
            onClick={onSave}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 