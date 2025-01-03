import React, { useState } from 'react';
import useCourseCreationStore from '../../../../../stores/courseCreationStore';
import { toast } from 'react-hot-toast';

function AboutCourse() {
  const { courseData, updateCourseData, setStep, currentStep } = useCourseCreationStore();
  const { about } = courseData;

  const [prerequisite, setPrerequisite] = useState({
    preRequisiteRequired: '',
    preRequisiteLevel: 'Beginner'
  });

  const handleChange = (field, value) => {
    console.log(`Updating ${field}:`, value);
    
    if (field === 'coursePreRequisites') {
      // Handle prerequisites as objects with level
      const prerequisites = value.split(',')
        .map(item => item.trim())
        .filter(Boolean)
        .map(item => ({
          preRequisiteRequired: item,
          preRequisiteLevel: 'Beginner'
        }));

      updateCourseData('about', {
        ...about,
        coursePreRequisites: prerequisites
      });
    } 
    else if (field === 'courseAudience') {
      // Handle audience as simple array
      const audiences = value.split(',')
        .map(item => item.trim())
        .filter(Boolean);

      updateCourseData('about', {
        ...about,
        courseAudience: audiences
      });
    }
    else if (field === 'courseOutcome') {
      // Handle outcome as simple string
      updateCourseData('about', {
        ...about,
        courseOutcome: value
      });
    }
    else {
      updateCourseData('about', {
        ...about,
        [field]: value
      });
    }
  };

  const handlePrerequisiteAdd = () => {
    if (prerequisite.preRequisiteRequired) {
      // Make sure we have an array to spread
      const currentPreReqs = about.coursePreRequisites || [];
      const updatedPrerequisites = [...currentPreReqs, {
        preRequisiteRequired: prerequisite.preRequisiteRequired,
        preRequisiteLevel: prerequisite.preRequisiteLevel
      }];

      console.log('Updated prerequisites:', updatedPrerequisites); // Debug log

      // Update the store
      updateCourseData('about', {
        ...about,
        coursePreRequisites: updatedPrerequisites
      });

      // Reset form
      setPrerequisite({
        preRequisiteRequired: '',
        preRequisiteLevel: 'Beginner'
      });
    }
  };

  const handleAudienceAdd = (value) => {
    if (value) {
      const audiences = value.split('\n').map(item => item.trim()).filter(item => item);
      handleChange('courseAudience', audiences);
    }
  };

  const handleNext = () => {
    // Validate required fields
    if (!about.courseOutcome?.trim()) {
      toast.error('Course outcome is required');
      return;
    }
    if (!about.courseDescription?.trim()) {
      toast.error('Course description is required');
      return;
    }

    // Log the data being saved
    console.log('About data being saved:', about);

    setStep(currentStep + 1);
  };

  const handleKeyDown = (e, field) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const value = e.target.value.trim();
      if (!value) return;

      if (field === 'coursePreRequisites') {
        const currentPreReqs = about.coursePreRequisites || [];
        updateCourseData('about', {
          ...about,
          coursePreRequisites: [
            ...currentPreReqs,
            { preRequisiteRequired: value, preRequisiteLevel: 'Beginner' }
          ]
        });
      } 
      else if (field === 'courseAudience') {
        const currentAudience = about.courseAudience || [];
        updateCourseData('about', {
          ...about,
          courseAudience: [...currentAudience, value]
        });
      }
      e.target.value = ''; // Clear the input
    }
  };

  const handleRemoveItem = (field, index) => {
    if (field === 'coursePreRequisites') {
      const newPreReqs = [...(about.coursePreRequisites || [])];
      newPreReqs.splice(index, 1);
      updateCourseData('about', {
        ...about,
        coursePreRequisites: newPreReqs
      });
    } 
    else if (field === 'courseAudience') {
      const newAudience = [...(about.courseAudience || [])];
      newAudience.splice(index, 1);
      updateCourseData('about', {
        ...about,
        courseAudience: newAudience
      });
    }
  };

  return (
    <div className="max-w-[800px] mx-auto">
      {/* What will you get */}
      <div className="mb-6">
        <label className="block text-sm text-gray-600 mb-2">
          What will you get *
        </label>
        <textarea
          value={about.courseOutcome || ''}
          onChange={(e) => handleChange('courseOutcome', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          rows={4}
          placeholder="Enter what students will learn"
        />
      </div>

      {/* Prerequisites */}
      <div className="mb-6">
        <label className="block text-sm text-gray-600 mb-2">
          Prerequisites * (Press Enter or comma to add)
        </label>
        <div>
          <input
            type="text"
            onKeyDown={(e) => handleKeyDown(e, 'coursePreRequisites')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Type and press Enter or comma to add prerequisite"
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {about.coursePreRequisites?.map((prereq, index) => (
              <div key={index} className="bg-blue-100 px-3 py-1 rounded-full flex items-center">
                <span>{prereq.preRequisiteRequired}</span>
                <button
                  onClick={() => handleRemoveItem('coursePreRequisites', index)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Who can enroll for this course */}
      <div className="mb-6">
        <label className="block text-sm text-gray-600 mb-2">
          Who can enrol for this course * (Press Enter or comma to add)
        </label>
        <div>
          <input
            type="text"
            onKeyDown={(e) => handleKeyDown(e, 'courseAudience')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Type and press Enter or comma to add audience"
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {about.courseAudience?.map((audience, index) => (
              <div key={index} className="bg-blue-100 px-3 py-1 rounded-full flex items-center">
                <span>{audience}</span>
                <button
                  onClick={() => handleRemoveItem('courseAudience', index)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Most useful reviews if any */}
      <div className="mb-6">
        <label className="block text-sm text-gray-600 mb-2">
          Most useful reviews if any *
        </label>
        <select
          value={about.reviews || ''}
          onChange={(e) => handleChange('reviews', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-white"
        >
          <option value="">Multi Select</option>
          {/* ... keep existing options ... */}
        </select>
      </div>

      {/* Description */}
      <div className="mb-6">
        <label className="block text-sm text-gray-600 mb-2">
          Description *
        </label>
        <textarea
          value={about.courseDescription || ''}
          onChange={(e) => handleChange('courseDescription', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          rows={4}
          placeholder="Enter course description"
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={() => setStep(currentStep - 1)}
          className="text-blue-600 hover:text-blue-700 flex items-center"
        >
          <span className="mr-2">←</span> Previous
        </button>
        <button
          onClick={() => setStep(currentStep + 1)}
          className="text-blue-600 hover:text-blue-700 flex items-center"
        >
          Next Course Content <span className="ml-2">→</span>
        </button>
      </div>
    </div>
  );
}

export default AboutCourse;