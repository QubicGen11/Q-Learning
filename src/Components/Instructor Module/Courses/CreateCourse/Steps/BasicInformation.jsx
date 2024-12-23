import React from 'react';
import useCourseStepsStore from '../../../../../stores/courseStepsStore';

const BasicInformation = () => {
  const { courseData, updateCourseData } = useCourseStepsStore();
  const { basicInfo } = courseData;

  const handleChange = (e) => {
    updateCourseData('basicInfo', {
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Course Name *
        </label>
        <input
          type="text"
          name="courseName"
          value={basicInfo.courseName}
          onChange={handleChange}
          placeholder="Real World UX Learn User Experience & Start Your Career"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Course Tagline *
        </label>
        <textarea
          name="courseTagline"
          value={basicInfo.courseTagline}
          onChange={handleChange}
          placeholder="UX based on real world examples. Gain powerful UX skills you can use to start a UX career or improve your projects."
          rows={3}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Course Duration *
          </label>
          <input
            type="date"
            name="courseDuration"
            value={basicInfo.courseDuration}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Difficulty Level *
          </label>
          <select
            name="difficultyLevel"
            value={basicInfo.difficultyLevel}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category *
          </label>
          <select
            name="category"
            value={basicInfo.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select</option>
            {/* Add your categories */}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sub Category *
          </label>
          <select
            name="subCategory"
            value={basicInfo.subCategory}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select</option>
            {/* Add your sub-categories */}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Teaching Language *
          </label>
          <select
            name="teachingLanguage"
            value={basicInfo.teachingLanguage}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">MultiSelect</option>
            {/* Add your languages */}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hashtags *
          </label>
          <input
            type="text"
            name="hashtags"
            placeholder="Hashtag1"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default BasicInformation; 