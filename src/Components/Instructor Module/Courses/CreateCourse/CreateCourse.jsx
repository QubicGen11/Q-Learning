import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useCourseStepsStore from '../../../../stores/courseStepsStore';
import useSidebarStore from '../../../../stores/sidebarStore';
import BasicInformation from './Steps/BasicInformation';
import AddMedia from './Steps/AddMedia';
import AboutCourse from './Steps/AboutCourse';

function CreateCourse() {
  const { currentStep, setCurrentStep } = useCourseStepsStore();
  const { isCollapsed, toggleSidebar } = useSidebarStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isCollapsed) {
      toggleSidebar();
    }
  }, [isCollapsed, toggleSidebar]);

  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return <BasicInformation />;
      case 2:
        return <AddMedia />;
      case 3:
        return <AboutCourse />;
      default:
        return <BasicInformation />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header with Breadcrumb and Action Buttons */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-blue-600 cursor-pointer">Courses</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600">Add Course</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1 px-4 py-2 text-sm text-gray-600 hover:text-gray-800">
            <span>Preview</span>
            <span className="material-icons text-lg">expand_more</span>
          </button>
          <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Submit for review
          </button>
        </div>
      </div>

      {/* Top Navigation Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex gap-8">
          <button className={`py-4 px-1 -mb-px ${currentStep <= 3 ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}>
            Basic Information
          </button>
          <button className="py-4 px-1 text-gray-500">
            Course Content
          </button>
          <button className="py-4 px-1 text-gray-500">
            Settings
          </button>
        </div>
      </div>

      {/* Steps Progress */}
      <div className="bg-white rounded-lg p-6 mb-6">
        <div className="flex justify-between">
          <div className="flex items-start gap-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${currentStep >= 1 ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
              {currentStep > 1 ? '✓' : '1'}
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Course Details</h3>
              <p className="text-sm text-gray-500">Name, tagline, category, etc..</p>
            </div>
          </div>

          <div className="flex-1 border-t-2 border-gray-200 mt-4 mx-8" />

          <div className="flex items-start gap-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${currentStep >= 2 ? 'bg-green-500 text-white' : currentStep === 2 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
              {currentStep > 2 ? '✓' : '2'}
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Add Media</h3>
              <p className="text-sm text-gray-500">Upload banner image and video</p>
            </div>
          </div>

          <div className="flex-1 border-t-2 border-gray-200 mt-4 mx-8" />

          <div className="flex items-start gap-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${currentStep === 3 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
              3
            </div>
            <div>
              <h3 className="font-medium text-gray-900">About Course</h3>
              <p className="text-sm text-gray-500">Description, prerequisites etc..</p>
            </div>
          </div>
        </div>
      </div>

      {/* Current Step Content */}
      <div className="bg-white rounded-lg p-6">
        {renderStep()}
      </div>

      {/* Bottom Navigation */}
      <div className="flex justify-between mt-6">
        {currentStep > 1 && (
          <button
            onClick={() => setCurrentStep(currentStep - 1)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            <span className="material-icons">arrow_back</span>
            Previous
          </button>
        )}
        {currentStep === 3 ? (
          <button
            onClick={() => navigate('/instructor/courses/content')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 ml-auto"
          >
            Next Course Content
            <span className="material-icons">arrow_forward</span>
          </button>
        ) : (
          <button
            onClick={() => setCurrentStep(currentStep + 1)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 ml-auto"
          >
            Next
            <span className="material-icons">arrow_forward</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default CreateCourse; 