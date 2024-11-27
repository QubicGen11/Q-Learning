import React from 'react';
import { FiEye } from 'react-icons/fi';

const getSectionTitle = (section) => {
  const titles = {
    basicInfo: 'Basic Information',
    aboutCourse: 'About Course',
    curriculum: 'Curriculum',
    lessons: 'Lessons',
    assignments: 'Assignments',
    resources: 'Resources',
    pricing: 'Pricing'
  };
  return titles[section] || 'Course Editor';
};

const Header = ({ activeSection, onSave, onPreview, isEditing }) => {
  const [isSaving, setIsSaving] = React.useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
      <h1 className="text-2xl font-semibold text-gray-800">
        {getSectionTitle(activeSection)}
      </h1>
      <div className="flex gap-4">
        <button
          onClick={onPreview}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md flex items-center gap-2"
        >
          <FiEye className="w-5 h-5" />
          Preview
        </button>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-70"
        >
          {isEditing ? 
            (isSaving ? 'Updating...' : 'Update Course') : 
            (isSaving ? 'Submitting...' : 'Submit for Review')
          }
        </button>
      </div>
    </header>
  );
};

export default Header; 