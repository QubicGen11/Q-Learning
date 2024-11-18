import React, { useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './quillConfig';
import useCourseStore from '../../../../store/courseStore';
import { FiTrash2, FiPlus } from 'react-icons/fi';

const AboutCourse = () => {
  const courseData = useCourseStore((state) => state.courseData);
  const updateCourseData = useCourseStore((state) => state.updateCourseData);

  useEffect(() => {
    if (!courseData.learningObjective) {
      updateCourseData({ learningObjective: [] });
    }
  }, []);

  const quillModules = {
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': ['', 'center', 'right', 'justify'] }],
        ['blockquote', 'code-block'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['link', 'image'],
        ['clean']
      ]
    },
    imageResize: {
      modules: ['Resize', 'DisplaySize']
    }
  };

  const customStyles = `
    .ql-editor p {
      margin-bottom: 1em;
    }
    .ql-align-center {
      text-align: center;
    }
    .ql-align-right {
      text-align: right;
    }
    .ql-align-justify {
      text-align: justify;
    }
  `;

  const handleObjectiveChange = (index, value) => {
    const newObjectives = [...(courseData.objectives || [])];
    newObjectives[index] = value;
    updateCourseData({ objectives: newObjectives });
  };

  const handlePrerequisiteChange = (index, value) => {
    const newPrerequisites = [...(courseData.preRequisites || [])];
    newPrerequisites[index] = {
      preRequisiteRequired: value,
      preRequisiteLevel: 'Beginner'
    };
    updateCourseData({ preRequisites: newPrerequisites });
  };

  const handleLearningObjectiveChange = (content) => {
    updateCourseData({ learningObjective: content });
  };

  const handleAddLearningObjective = () => {
    updateCourseData(prevData => ({
      ...prevData,
      learningObjective: [...(prevData.learningObjective || []), '']
    }));
  };

  const handleRemoveLearningObjective = (index) => {
    const updatedObjectives = courseData.learningObjective.filter((_, i) => i !== index);
    updateCourseData(prevData => ({
      ...prevData,
      learningObjective: updatedObjectives
    }));
  };

  return (
    <div className="flex flex-col gap-12">
      <style>{customStyles}</style>
      {/* Welcome Message */}
      <div className="relative z-10">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Welcome Message
        </label>
        <div className="relative" style={{ height: '250px' }}>
          <ReactQuill
            value={courseData.welcome}
            onChange={(content) => updateCourseData({ welcome: content })}
            modules={quillModules}
            className="h-full"
            theme="snow"
            placeholder="Enter welcome message..."
          />
        </div>
      </div>

      {/* Course Overview */}
      <div className="relative z-10">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Course Overview
        </label>
        <div className="relative" style={{ height: '250px' }}>
          <ReactQuill
            value={courseData.aboutCourse}
            onChange={(content) => updateCourseData({ aboutCourse: content })}
            modules={quillModules}
            className="h-full"
            theme="snow"
            placeholder="Enter course overview..."
          />
        </div>
      </div>

      {/* End Objective */}
      <div className="relative z-10">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          End Objective
        </label>
        <div className="relative" style={{ height: '250px' }}>
          <ReactQuill
            value={courseData.endObjective}
            onChange={(content) => updateCourseData({ endObjective: content })}
            modules={quillModules}
            className="h-full"
            theme="snow"
            placeholder="Enter end objective..."
          />
        </div>
      </div>

      {/* Learning Objectives */}
      <div className="relative z-10">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Learning Objectives
        </label>
        <div className="relative">
          <textarea
            value={courseData.learningObjective || ''}
            onChange={(e) => handleLearningObjectiveChange(e.target.value)}
            placeholder="Enter learning objectives (separated by commas)"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
        </div>
      </div>

      {/* Prerequisites Section */}
      <div className="relative z-20">
        <h3 className="text-base font-medium text-gray-900 mb-4">
          Prerequisites
        </h3>
        <div className="space-y-4">
          {(courseData.preRequisites || []).map((prerequisite, index) => (
            <div key={index} className="flex items-center gap-3">
              <input
                type="text"
                value={prerequisite.preRequisiteRequired || ''}
                onChange={(e) => handlePrerequisiteChange(index, e.target.value)}
                className="flex-1 p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter prerequisite"
              />
              <button
                type="button"
                onClick={() => {
                  const newPrerequisites = [...(courseData.preRequisites || [])];
                  newPrerequisites.splice(index, 1);
                  updateCourseData({ preRequisites: newPrerequisites });
                }}
                className="text-red-500 hover:text-red-700 p-1"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              const currentPrerequisites = courseData.preRequisites || [];
              updateCourseData({ 
                preRequisites: [
                  ...currentPrerequisites, 
                  { preRequisiteRequired: '', preRequisiteLevel: 'Beginner' }
                ]
              });
            }}
            className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium"
          >
            <span className="mr-2">+</span> Add Prerequisite
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Course Audience
        </label>
        <input
          type="text"
          value={courseData.courseAudience || ''}
          onChange={(e) => updateCourseData({ courseAudience: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="Who is this course for?"
        />
      </div>

      <style jsx global>{`
        .quill {
          position: relative;
          z-index: 10;
        }
        .ql-container {
          height: calc(100% - 42px) !important;
        }
        .ql-editor {
          min-height: 100%;
          max-height: 100%;
          overflow-y: auto;
        }
      `}</style>
    </div>
  );
};

export default AboutCourse; 