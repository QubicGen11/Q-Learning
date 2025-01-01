import React, { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import useCourseCreationStore from '../../../../stores/courseCreationStore';
import StepIndicator from './Components/StepIndicator';

function CreateCourse() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentStep, steps, setStep, resetStore, submitCourse } = useCourseCreationStore();

  // Set initial step based on URL
  useEffect(() => {
    const path = location.pathname.split('/').pop();
    const step = steps.find(s => s.path === path);
    if (step) {
      setStep(step.id);
    } else {
      // Redirect to first step if no valid path
      navigate(`/instructor/courses/create/${steps[0].path}`);
    }
  }, [location.pathname]);

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? All progress will be lost.')) {
      resetStore();
      navigate('/instructor/courses');
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      const nextStep = steps[currentStep];
      setStep(currentStep + 1);
      navigate(`/instructor/courses/create/${nextStep.path}`);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      const prevStep = steps[currentStep - 2];
      setStep(currentStep - 1);
      navigate(`/instructor/courses/create/${prevStep.path}`);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold">Create New Course</h1>
              <p className="text-sm text-gray-500">Step {currentStep} of {steps.length}</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => {/* Save as draft logic */}}
                className="px-4 py-2 text-sm text-[#FFFFFF]  bg-[#0056B3] hover:bg-[#004494] rounded-md "
              >
                Save as Draft
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-sm text-[#FFFFFF]  bg-[#0056B3] hover:bg-[#004494] rounded-md "
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
        <StepIndicator />
      </div>

      {/* Content Area */}
      <div className="p-6">
        <Outlet />
      </div>

      {/* Bottom Navigation */}
      <div className="border-t border-gray-200 px-6 py-4">
        <div className="flex justify-between">
          {currentStep > 1 && (
            <button
              onClick={handlePrevious}
              className="flex items-center gap-2 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50"
            >
              <span className="material-icons">arrow_back</span>
              Previous
            </button>
          )}
          {currentStep === steps.length ? (
            <button
              onClick={() => submitCourse(navigate)}
              className="flex items-center gap-2 text-white bg-green-600 px-6 py-2 rounded-lg hover:bg-green-700 ml-auto"
            >
              Submit Course
              <span className="material-icons">check</span>
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 text-white bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700 ml-auto"
            >
              Next
              <span className="material-icons">arrow_forward</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateCourse; 