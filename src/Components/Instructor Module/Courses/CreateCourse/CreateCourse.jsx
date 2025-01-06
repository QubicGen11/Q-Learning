import React, { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import useCourseCreationStore from '../../../../stores/courseCreationStore';
import StepIndicator from './Components/StepIndicator';

function CreateCourse() {
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    currentStep, 
    setStep, 
    resetStore, 
    handleNext,
    submitCourse 
  } = useCourseCreationStore();

  // Updated steps definition
  const steps = [
    { id: 1, path: 'basic-info' },
    { id: 2, path: 'media' },
    { id: 3, path: 'about' },
    { id: 4, path: 'content' },
    { id: 5, path: 'more-info' },
    { id: 6, path: 'faq' },
    { id: 7, path: 'settings' }
  ];

  // Modified useEffect to handle course content section properly
  useEffect(() => {
    const path = location.pathname.split('/').pop();
    
    // Check if we're in the course content section
    if (['content', 'more-info', 'faq'].includes(path)) {
      const stepMap = {
        'content': 4,
        'more-info': 5,
        'faq': 6
      };
      setStep(stepMap[path]);
    } else {
      // Handle other sections
      const step = steps.find(s => s.path === path);
      if (step) {
        setStep(step.id);
      } else {
        // Only redirect if we're at the root create path
        if (location.pathname === '/instructor/courses/create') {
          navigate(`/instructor/courses/create/basic-info`);
        }
      }
    }
  }, [location.pathname, navigate, setStep]);

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? All progress will be lost.')) {
      resetStore();
      navigate('/instructor/courses');
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
              <div className="relative">
                <button
                  onClick={() => {/* Save as draft logic */}}
                  className="px-4 py-2 text-sm text-[#0056B3] border border-[#0056B3] hover:bg-gray-50 rounded-md flex items-center gap-2"
                >
                  Save as Draft
                  <span className="material-icons text-sm">expand_more</span>
                </button>
              </div>
              <button
                onClick={() => {/* Submit for review logic */}}
                className="px-4 py-2 text-sm text-white bg-[#0056B3] hover:bg-[#004494] rounded-md"
              >
                Submit for review
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
              onClick={() => handleNext(navigate)}
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