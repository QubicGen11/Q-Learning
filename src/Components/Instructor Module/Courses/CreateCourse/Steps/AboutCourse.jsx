import React, { useState } from 'react';
import useCourseCreationStore from '../../../../../stores/courseCreationStore';
import { toast } from 'react-hot-toast';

function AboutCourse() {
  const { courseData, updateCourseData, setStep, currentStep } = useCourseCreationStore();
  const { about } = courseData;

  // State for prerequisites
  const [prerequisite, setPrerequisite] = useState({
    preRequisiteRequired: '',
    preRequisiteLevel: 'Beginner'
  });

  const handleChange = (field, value) => {
    console.log(`Updating ${field}:`, value); // Debug log
    updateCourseData('about', {
      ...about,
      [field]: value
    });
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

  return (
    <div className="max-w-[700px] mx-auto space-y-8">
      {/* Course Outcome */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Course Outcome *
        </label>
        <textarea
          value={about.courseOutcome || ''}
          onChange={(e) => {
            console.log('Setting courseOutcome:', e.target.value);
            handleChange('courseOutcome', e.target.value);
          }}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={4}
          placeholder="What will students learn from this course?"
        />
      </div>

      {/* Course Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Course Description *
        </label>
        <textarea
          value={about.courseDescription || ''}
          onChange={(e) => handleChange('courseDescription', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={6}
          placeholder="Provide a detailed description of your course"
        />
      </div>

      {/* Prerequisites */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Course Prerequisites
        </label>
        <div className="space-y-4">
          <div className="flex gap-4">
            <input
              type="text"
              value={prerequisite.preRequisiteRequired}
              onChange={(e) => setPrerequisite({
                ...prerequisite,
                preRequisiteRequired: e.target.value
              })}
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter prerequisite"
            />
            <select
              value={prerequisite.preRequisiteLevel}
              onChange={(e) => setPrerequisite({
                ...prerequisite,
                preRequisiteLevel: e.target.value
              })}
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
            <button
              onClick={handlePrerequisiteAdd}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add
            </button>
          </div>
          
          {/* Display prerequisites */}
          <div className="space-y-2">
            {about.coursePreRequisites?.map((prereq, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                <span>
                  {prereq.preRequisiteRequired} - {prereq.preRequisiteLevel}
                </span>
                <button
                  onClick={() => {
                    const updated = about.coursePreRequisites.filter((_, i) => i !== index);
                    handleChange('coursePreRequisites', updated);
                  }}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Course Audience */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Course Audience
        </label>
        <textarea
          value={about.courseAudience?.join('\n') || ''}
          onChange={(e) => handleAudienceAdd(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={4}
          placeholder="Enter each target audience on a new line"
        />
      </div>

      {/* Debug display */}
      <div className="mt-4 p-4 bg-gray-50 rounded">
        <pre className="text-xs">
          {JSON.stringify({
            courseOutCome: about.courseOutCome,
            coursePreRequisites: about.coursePreRequisites
          }, null, 2)}
        </pre>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4">
        <button
          onClick={() => setStep(currentStep - 1)}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default AboutCourse;