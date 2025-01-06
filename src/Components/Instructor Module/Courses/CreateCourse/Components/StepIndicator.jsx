import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useCourseCreationStore from '../../../../../stores/courseCreationStore';

const StepIndicator = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentStep, setStep } = useCourseCreationStore();

  const mainTabs = [
    { 
      id: 'info', 
      label: 'Course Information', 
      path: '/instructor/courses/create/basic-info' 
    },
    { 
      id: 'content', 
      label: 'Course Content', 
      path: '/instructor/courses/create/content' 
    },
    { 
      id: 'settings', 
      label: 'Settings', 
      path: '/instructor/courses/create/settings' 
    }
  ];

  const courseInformationSteps = [
    {
      number: 1,
      title: 'Course Details',
      subtitle: 'Name, tagline category etc...',
      path: 'basic-info'
    },
    {
      number: 2,
      title: 'Add Media',
      subtitle: 'Upload banner image and video',
      path: 'media'
    },
    {
      number: 3,
      title: 'About Course',
      subtitle: 'Description prerequisites etc...',
      path: 'about'
    }
  ];

  const courseContentSteps = [
    {
      number: 1,
      title: 'Course Content',
      subtitle: 'Add sections and lectures',
      path: 'content'
    },
    {
      number: 2,
      title: "FAQ's",
      subtitle: 'Add frequently asked questions',
      path: 'faq'
    }
  ];

  const getCurrentTabAndSteps = () => {
    const path = location.pathname;
    if (path.includes('/basic-info') || path.includes('/media') || path.includes('/about')) {
      return {
        currentTab: 'info',
        steps: courseInformationSteps
      };
    } else if (path.includes('/content') || path.includes('/faq')) {
      return {
        currentTab: 'content',
        steps: courseContentSteps,
        currentStepNumber: path.includes('/content') ? 1 : 2
      };
    } else if (path.includes('/settings')) {
      return {
        currentTab: 'settings',
        steps: []
      };
    }
    return { currentTab: 'info', steps: courseInformationSteps };
  };

  const { currentTab, steps } = getCurrentTabAndSteps();

  const handleNext = () => {
    const { currentTab, steps } = getCurrentTabAndSteps();
    
    if (currentTab === 'info' && currentStep === courseInformationSteps.length) {
      // Move to Course Content after completing Course Information
      setStep(1);
      navigate('/instructor/courses/create/content');
    } else if (currentTab === 'content') {
      if (location.pathname.includes('/content')) {
        // Move from Course Content to FAQ
        setStep(2);
        navigate('/instructor/courses/create/faq');
      } else if (location.pathname.includes('/faq')) {
        // Move from FAQ to Settings
        navigate('/instructor/courses/create/settings');
      }
    } else if (currentStep < steps.length) {
      // Normal step progression within Course Information
      const nextStep = steps[currentStep];
      setStep(currentStep + 1);
      navigate(`/instructor/courses/create/${nextStep.path}`);
    }
  };

  const handlePrevious = () => {
    const { currentTab } = getCurrentTabAndSteps();
    
    if (currentTab === 'content') {
      if (location.pathname.includes('/faq')) {
        // Move back from FAQ to Course Content
        setStep(1);
        navigate('/instructor/courses/create/content');
      } else if (location.pathname.includes('/content')) {
        // Move back from Course Content to last step of Course Information
        setStep(3);
        navigate('/instructor/courses/create/about');
      }
    } else if (currentTab === 'settings') {
      // Move back from Settings to FAQ
      setStep(2);
      navigate('/instructor/courses/create/faq');
    } else if (currentStep > 1) {
      // Normal step regression within Course Information
      const prevStep = courseInformationSteps[currentStep - 2];
      setStep(currentStep - 1);
      navigate(`/instructor/courses/create/${prevStep.path}`);
    }
  };

  const getNextButtonText = () => {
    const { currentTab } = getCurrentTabAndSteps();
    const path = location.pathname;

    if (currentTab === 'info' && currentStep === courseInformationSteps.length) {
      return 'Next: Course Content';
    } else if (currentTab === 'content') {
      if (path.includes('/content')) {
        return "Next: FAQ's";
      } else if (path.includes('/faq')) {
        return 'Next: Settings';
      }
    }
    return 'Next';
  };

  const CheckIcon = () => (
    <svg 
      className="w-4 h-4" 
      viewBox="0 0 20 20" 
      fill="currentColor"
    >
      <path 
        fillRule="evenodd" 
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
        clipRule="evenodd" 
      />
    </svg>
  );

  return (
    <div className="space-y-2">
      {/* Main Navigation Tabs */}
      <div className="border-b">
        <div className="flex gap-8 ml-5 px-2 py-2">
          {mainTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className={` text-md font-medium border-b-2 -mb-[2px]  ${
                tab.id === currentTab
                  ? ' text-[#0056B3] bg-[#f2f9ff] px-4 py-1 rounded-md'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Step Indicator with Navigation */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          {steps.length > 0 && steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <div className="flex items-center">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-md border
                  ${currentStep === step.number 
                    ? 'bg-[#0056B3] text-white' 
                    : currentStep > step.number
                      ? 'bg-[#0056B3] text-white'
                      : 'border-2 border-gray-300 text-gray-400'
                  }
                `}>
                  {(currentStep > step.number && currentTab !== 'content') || 
                   (currentTab === 'content' && location.pathname.includes(step.path)) || 
                   (location.pathname.includes('faq') && step.path === 'content') ? (
                    <CheckIcon />
                  ) : (
                    step.number
                  )}
                </div>
                <div className="ml-3">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.number ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </p>
                  <p className={`text-xs ${
                    currentStep >= step.number ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    {step.subtitle}
                  </p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-24 h-[1px] ${
                  currentStep > step.number ? 'bg-[#0056B3]' : 'bg-gray-200'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-4">
          {(currentStep > 1 || currentTab !== 'info' || location.pathname.includes('/settings')) && (
            <button 
              onClick={handlePrevious}
              className="flex items-center gap-2 text-[#0056B3] hover:text-blue bg-[#F5F5F5] px-4 py-2 rounded-md"
            >
              <span className="material-icons text-sm">arrow_back</span>
              Previous
            </button>
          )}
          {(currentStep < steps.length || currentTab !== 'settings') && (
            <button 
              onClick={handleNext}
              className="flex items-center gap-2 text-[#0056B3] hover:text-[#004494] bg-[#F5F5F5] px-4 py-2 rounded-md"
            >
              {getNextButtonText()}
              <span className="material-icons text-sm">arrow_forward</span>
            </button>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default StepIndicator; 