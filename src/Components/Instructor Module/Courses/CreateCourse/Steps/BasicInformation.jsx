import React from 'react';
import useCourseCreationStore from '../../../../../stores/courseCreationStore';

const BasicInformation = () => {
  const { courseData, updateCourseData } = useCourseCreationStore();
  const { basicInfo } = courseData;

  const handleChange = (e) => {
    updateCourseData('basicInfo', {
      ...basicInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleHashtagChange = (e) => {
    const tags = e.target.value.split(',').map(tag => tag.trim());
    updateCourseData('basicInfo', {
      ...basicInfo,
      hashtags: tags
    });
  };

  return (
    <div className="max-w-[700px] mx-auto space-y-4">
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Course Name *
        </label>
        <input
          type="text"
          name="courseName"
          value={basicInfo?.courseName || ''}
          onChange={handleChange}
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
          onChange={handleChange}
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
          onChange={handleChange}
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
          onChange={handleChange}
          className="w-full px-3 py-1.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-9"
        >
          <option value="">Select Difficulty Level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Category *
        </label>
        <select
          name="category"
          value={basicInfo?.category || ''}
          onChange={handleChange}
          className="w-full px-3 py-1.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-9"
        >
          <option value="">Select Category</option>
          <option value="Development">Development</option>
          <option value="Design">Design</option>
          <option value="Business">Business</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Teaching Language *
        </label>
        <select
          name="teachingLanguage"
          value={basicInfo?.teachingLanguage || ''}
          onChange={handleChange}
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
          onChange={handleHashtagChange}
          placeholder="e.g., ux, design, career (comma separated)"
          className="w-full px-3 py-1.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-9"
        />
      </div>
    </div>
  );
};

export default BasicInformation; 