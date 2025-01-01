import React from 'react';
import useCourseCreationStore from '../../../../../stores/courseCreationStore';

function AboutCourse() {
  const { courseData, updateCourseData } = useCourseCreationStore();
  const { about } = courseData;

  const handleChange = (field, value) => {
    console.log('Updating about field:', field, value);
    updateCourseData('about', {
      ...about,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      {/* Course Outcome */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Course Outcome</label>
        <textarea
          value={about.courseOutcome || ''}
          onChange={(e) => handleChange('courseOutcome', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={4}
        />
      </div>

      {/* Course Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={about.description || ''}
          onChange={(e) => handleChange('description', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={6}
        />
      </div>

      {/* Prerequisites */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Prerequisites</label>
        <input
          type="text"
          value={about.prerequisites?.join(', ') || ''}
          onChange={(e) => handleChange('prerequisites', e.target.value.split(',').map(item => item.trim()))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Enter prerequisites separated by commas"
        />
      </div>

      {/* Target Audience */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Target Audience</label>
        <input
          type="text"
          value={about.targetAudience?.join(', ') || ''}
          onChange={(e) => handleChange('targetAudience', e.target.value.split(',').map(item => item.trim()))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Enter target audience separated by commas"
        />
      </div>
    </div>
  );
}

export default AboutCourse;