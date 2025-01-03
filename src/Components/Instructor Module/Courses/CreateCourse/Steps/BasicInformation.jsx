import React, { useEffect } from 'react';
import useCourseCreationStore from '../../../../../stores/courseCreationStore';

function BasicInfo() {
  const { 
    courseData, 
    updateCourseData, 
    categories, 
    subCategories, 
    fetchCategories, 
    fetchSubCategories 
  } = useCourseCreationStore();
  const { basicInfo } = courseData;

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Fetch subcategories when category changes
  useEffect(() => {
    if (basicInfo.category) {
      const selectedCategory = categories.find(cat => cat.category === basicInfo.category);
      if (selectedCategory) {
        fetchSubCategories(selectedCategory.id);
      }
    }
  }, [basicInfo.category, categories, fetchSubCategories]);

  const handleChange = (field, value) => {
    // If changing category, reset subcategory
    if (field === 'category') {
      updateCourseData('basicInfo', {
        ...basicInfo,
        category: value,
        subCategory: '' // Reset subcategory when category changes
      });
    } else {
      updateCourseData('basicInfo', {
        ...basicInfo,
        [field]: value
      });
    }
  };

  return (
    <div className="max-w-[700px] mx-auto space-y-6">
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Course Name *
        </label>
        <input
          type="text"
          name="courseName"
          value={basicInfo?.courseName || ''}
          onChange={(e) => handleChange('courseName', e.target.value)}
          placeholder="Real World UX Learn User Experience & Start Your Career"
          className="w-full px-3 py-1.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-9"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Course Tagline *
        </label>
        <textarea
          name="courseTagline"
          value={basicInfo?.courseTagline || ''}
          onChange={(e) => handleChange('courseTagline', e.target.value)}
          placeholder="UX based on real world examples. Gain powerful UX skills you can use to start a UX career or improve your projects."
          rows={3}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Course Duration *
        </label>
        <input
          type="text"
          name="courseDuration"
          value={basicInfo?.courseDuration || ''}
          onChange={(e) => handleChange('courseDuration', e.target.value)}
          placeholder="e.g., 10 hours"
          className="w-full px-3 py-1.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-9"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Difficulty Level *
        </label>
        <select
          name="difficultyLevel"
          value={basicInfo?.difficultyLevel || ''}
          onChange={(e) => handleChange('difficultyLevel', e.target.value)}
          className="w-full px-3 py-1.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-9"
        >
          <option value="">Select Difficulty Level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="category" className="block mb-1 text-sm text-gray-600 font-semibold">
          Category *
        </label>
        <div className="relative">
          <select
            id="category"
            value={basicInfo.category || ''}
            onChange={(e) => handleChange('category', e.target.value)}
            className="w-full text-sm px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.category} className='text-sm'>
                {cat.category}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
           
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="subcategory" className="block mb-1 text-sm text-gray-600 font-semibold">
          Subcategory *
        </label>
        <div className="relative">
          <select
            id="subcategory"
            value={basicInfo.subCategory || ''}
            onChange={(e) => handleChange('subCategory', e.target.value)}
            className="w-full text-sm px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            required
            disabled={!basicInfo.category}
          >
            <option value="">Select a subcategory</option>
            {subCategories.map((subCat, index) => (
              <option key={index} value={subCat.subCategory} className='text-sm'>
                {subCat.subCategory}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Teaching Language *
        </label>
        <select
          name="teachingLanguage"
          value={basicInfo?.teachingLanguage || ''}
          onChange={(e) => handleChange('teachingLanguage', e.target.value)}
          className="w-full px-3 py-1.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-9"
        >
          <option value="">Select Language</option>
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
          <option value="Urdu">Urdu</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Hashtags
        </label>
        <input
          type="text"
          name="hashtags"
          value={(basicInfo?.hashtags || []).join(', ')}
          onChange={(e) => handleChange('hashtags', e.target.value)}
          placeholder="e.g., ux, design, career (comma separated)"
          className="w-full px-3 py-1.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-9"
        />
      </div>
    </div>
  );
}

export default BasicInfo; 