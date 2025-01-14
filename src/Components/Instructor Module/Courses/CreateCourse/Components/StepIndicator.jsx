import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useCourseCreationStore from '../../../../../stores/courseCreationStore';
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from 'react-icons/io';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';


const StepIndicator = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    currentStep, 
    setStep, 
    courseData, 
    validationErrors,
    setValidationErrors,
    submitCourse
  } = useCourseCreationStore();

  const [isSubmitting, setIsSubmitting] = useState(false);

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
      title: 'More Info',
      subtitle: 'Glossary and References',
      path: 'more-info'
    },
    {
      number: 3,
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
    } else if (path.includes('/content') || path.includes('/more-info') || path.includes('/faq')) {
      const currentStepNumber = path.includes('/content') ? 1 
        : path.includes('/more-info') ? 2 
        : path.includes('/faq') ? 3 : 1;
      return {
        currentTab: 'content',
        steps: courseContentSteps,
        currentStepNumber
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

  const validateBasicInfo = () => {
    const { basicInfo } = courseData || {};
    const errors = {};

    // Required fields validation
    if (!basicInfo?.courseName || basicInfo.courseName.length < 10) {
      errors.courseName = 'Course name is required and must be at least 10 characters';
    }
    if (!basicInfo?.courseTagline || basicInfo.courseTagline.length < 20) {
      errors.courseTagline = 'Course tagline is required and must be at least 20 characters';
    }
    if (!basicInfo?.courseDuration) {
      errors.courseDuration = 'Course duration is required';
    } else if (isNaN(basicInfo.courseDuration) || Number(basicInfo.courseDuration) <= 0) {
      errors.courseDuration = 'Course duration must be a valid number greater than 0';
    }
    if (!basicInfo?.difficultyLevel) {
      errors.difficultyLevel = 'Difficulty level is required';
    }
    if (!basicInfo?.category) {
      errors.category = 'Category is required';
    }
    if (basicInfo?.category && !basicInfo?.subCategory) {
      errors.subCategory = 'Subcategory is required';
    }
    if (!basicInfo?.teachingLanguage) {
      errors.teachingLanguage = 'Teaching language is required';
    }

    // Return validation result
    const isValid = Object.keys(errors).length === 0;
    return { isValid, errors };
  };

  const handleNext = () => {
    console.log('Current path:', location.pathname);
    console.log('Validation errors:', validationErrors);

    // Check for validation errors in About section
    if (location.pathname.includes('/about')) {
      // Check if any validation errors exist
      const hasErrors = Object.values(validationErrors).some(error => error !== null && error !== undefined);
      
      if (hasErrors) {
        toast.error('Please fix all validation errors before proceeding');
        return; // Stop navigation if there are errors
      }
      
      // Also check if required fields are filled
      const { about } = courseData || {};
      if (!about?.courseOutcome || 
          !about?.coursePreRequisites?.length || 
          !about?.courseAudience?.length || 
          !about?.courseDescription) {
        toast.error('Please complete all required fields');
        return;
      }
    }

    // Add this new check for MoreInfo step
    if (location.pathname.includes('/more-info')) {
      const { glossary, references } = courseData;
      
      // Check if there are any validation errors
      const hasErrors = Object.keys(validationErrors).some(key => 
        ['glossary', 'references'].includes(key) && validationErrors[key]
      );

      if (hasErrors) {
        // Display each validation error as a separate toast
        Object.values(validationErrors).forEach(error => {
          alert(error);
        });
        return;
      }

      // Check if required data exists
      const hasValidGlossary = Array.isArray(glossary) && 
        glossary.some(item => item.acronym?.trim() && item.meaning?.trim());
      
      const hasValidReferences = Array.isArray(references) && 
        references.some(item => item.reference?.trim() && item.link?.trim());

      if (!hasValidGlossary || !hasValidReferences) {
        if (!hasValidGlossary) {
          toast.error('At least one glossary item with both acronym and meaning is required');
        }
        if (!hasValidReferences) {
          toast.error('At least one reference with both title and link is required');
        }
        return;
      }
    }

    // Add this new check for FAQ step
    if (location.pathname.includes('/faq')) {
      const { faq } = courseData;
      
      // Check if there are any validation errors
      if (validationErrors.faq) {
        toast.error(validationErrors.faq);
        return;
      }

      // Check if FAQs exist and are valid
      const hasValidFaqs = Array.isArray(faq) && 
        faq.length > 0 && 
        faq.every(item => item.question?.trim() && item.answer?.trim());

      if (!hasValidFaqs) {
        toast.error('Please add at least one FAQ with both question and answer');
        return;
      }
    }

    // Rest of your navigation logic...
    const { currentTab, steps } = getCurrentTabAndSteps();
    
    if (currentTab === 'info' && location.pathname.includes('/about')) {
      if (Object.keys(validationErrors).length > 0) {
        toast.error('Please fix all validation errors before proceeding');
        return;
      }
    }

    // Your existing navigation code
    if (currentTab === 'info' && location.pathname.includes('/about')) {
      if (Object.keys(validationErrors).length > 0) {
        toast.error('Please fix all validation errors before proceeding');
        return;
      }
    }

    if (currentTab === 'info' && location.pathname.includes('/basic-info')) {
      const { isValid, errors } = validateBasicInfo();
      
      // Always set validation errors when Next is clicked
      setValidationErrors(errors);
      
      // Only proceed if valid
      if (isValid) {
        setStep(currentStep + 1);
        navigate('/instructor/courses/create/media');
      }
      return;
    }

    // Existing navigation logic for other steps
    if (currentTab === 'info' && currentStep === courseInformationSteps.length) {
      setStep(1);
      navigate('/instructor/courses/create/content');
    } else if (currentTab === 'content') {
      if (location.pathname.includes('/content')) {
        setStep(2);
        navigate('/instructor/courses/create/more-info');
      } else if (location.pathname.includes('/more-info')) {
        setStep(3);
        navigate('/instructor/courses/create/faq');
      } else if (location.pathname.includes('/faq')) {
        navigate('/instructor/courses/create/settings');
      }
    } else if (currentTab === 'info') {
      // Handle navigation within info tab
      const nextStep = courseInformationSteps[currentStep];
      if (nextStep) {
        setStep(currentStep + 1);
        navigate(`/instructor/courses/create/${nextStep.path}`);
      }
    }
  };

  const handlePrevious = () => {
    const { currentTab } = getCurrentTabAndSteps();
    
    if (currentTab === 'content') {
      if (location.pathname.includes('/faq')) {
        // Move back from FAQ to More Info
        setStep(2);
        navigate('/instructor/courses/create/more-info');
      } else if (location.pathname.includes('/more-info')) {
        // Move back from More Info to Content
        setStep(1);
        navigate('/instructor/courses/create/content');
      } else if (location.pathname.includes('/content')) {
        // Move back to Course Information
        setStep(courseInformationSteps.length);
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

    if (currentTab === 'info' && path.includes('/about')) {
      return 'Next: Course Content';
    }
    
    if (currentTab === 'content') {
      if (path.includes('/content')) {
        return 'Next: More Info';
      } else if (path.includes('/more-info')) {
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

  const getStepText = (direction) => {
    const currentPath = location.pathname;
    
    // Course Information steps
    if (currentPath.includes('basic-info')) {
      return direction === 'next' ? 'Add Media' : 'Course Details';
    }
    if (currentPath.includes('media')) {
      return direction === 'next' ? 'About Course' : 'Course Details';
    }
    if (currentPath.includes('about')) {
      return direction === 'next' ? 'Course Content' : 'Add Media';
    }
    
    // Course Content steps
    if (currentPath.includes('/content')) {
      return direction === 'next' ? 'Glossary and References' : 'About Course';
    }
    if (currentPath.includes('more-info')) {
      return direction === 'next' ? "FAQ's" : 'Course Content';
    }
    if (currentPath.includes('faq')) {
      return direction === 'next' ? 'Settings' : 'Glossary and References';
    }
    
    // Settings
    if (currentPath.includes('settings')) {
      return direction === 'next' ? '' : "FAQ's";
    }
    
    return direction === 'next' ? 'Next' : 'Previous';
  };

  // Add this function to check if we're on settings page
  const isSettingsPage = () => {
    return location.pathname.includes('/settings');
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await submitCourse(navigate);
    } catch (error) {
      console.error('Error in handleSubmit:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="space-y-2">
      {/* Main Navigation Tabs */}
      <div className="flex justify-between">
        <div className="flex gap-8 ml-5 py-2 p-4">
          {mainTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className={`text-md font-medium -mb-[2px] ${
                tab.id === currentTab
                  ? 'text-[#0056B3] bg-[#f2f9ff] px-4 py-1 rounded-md'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4 p-2">
          <div className="relative">
            <button
              onClick={() => {/* Save as draft logic */}}
              className="px-4 py-2 h-8 text-sm text-[#0056B3] border border-[#0056B3] hover:bg-gray-50 rounded-md flex items-center gap-2"
            >
              Preview
              <span className="material-icons text-sm">expand_more</span>
            </button>
          </div>
          {location.pathname.includes('/settings') ? (
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center justify-center gap-1 text-white bg-[#0056B3] hover:bg-[#004494] px-3 h-8 rounded-md"
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin mr-2">⌛</span>
                  Submitting...
                </>
              ) : (
                'Submit for Reviews'
              )}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-4 py-1 h-8 text-sm text-white bg-[#0056B3] hover:bg-[#004494] rounded-md flex items-center gap-2"
            >
              Next
              <IoIosArrowRoundForward className="text-2xl" />
            </button>
          )}
        </div>
      </div>

      {/* Keep existing Step Indicator and add Settings heading when on settings page */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          {/* Left side: Steps or Settings heading */}
          <div className="flex items-center">
            {isSettingsPage() ? (
              <h2 
                className="font-medium h-[24px] relative" 
                style={{ 
                  fontSize: '16px', 
                  fontWeight: '700', 
                  lineHeight: '24px', 
                  letterSpacing: '0.15px', 
                  textAlign: 'left', 
                  color: '#6b7280', 
                  width:"24px",
                  height:"24px"
                }}
              >
                Settings
              </h2>
            ) : (
              steps.length > 0 && steps.map((step, index) => (
                <React.Fragment key={step.number}>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center w-4/5">
                      <div className={`
                        relative group z-[1]
                        ${(currentTab === 'info' && currentStep === step.number) || 
                          (currentTab === 'content' && getCurrentTabAndSteps().currentStepNumber === step.number)
                          ? 'after:content-[""] after:absolute after:-inset-1 after:border-2 after:border-[#0056B3] after:rounded-full' 
                          : ''}
                      `}>
                        <div className={`
                          w-8 h-8 rounded-full flex items-center justify-center text-md border
                          ${(currentTab === 'info' && currentStep === step.number) || 
                            (currentTab === 'content' && getCurrentTabAndSteps().currentStepNumber === step.number)
                            ? 'bg-[#0056B3] text-white' 
                            : ((currentTab === 'info' && currentStep > step.number) || 
                               (currentTab === 'content' && getCurrentTabAndSteps().currentStepNumber > step.number))
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
                        
                        {/* Tooltip */}
                        <div className="absolute left-[40px] top-[50%] -translate-y-1/2
                                          bg-gray-800 text-white text-sm rounded px-2 py-1
                                          opacity-0 group-hover:opacity-100 pointer-events-none 
                                          transition-opacity duration-200 whitespace-nowrap">
                          {step.title}
                        </div>
                      </div>
                      <div className="ml-3 ">
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

                    {/* course highlighter */}
                    {/* <div className={`
                      h-1 w-full relative top-5 right-4
                      ${(currentTab === 'info' && currentStep === step.number) || 
                        (currentTab === 'content' && getCurrentTabAndSteps().currentStepNumber === step.number)
                        ? 'bg-[#0056B3]' 
                        : 'bg-transparent'}
                    `
                    `} /> */}

                    
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-24 h-[1px] ${
                      currentStep > step.number ? 'bg-[#0056B3]' : 'bg-gray-200'
                    }`} />
                  )}
                </React.Fragment>
              ))
            )}
          </div>
        </div>

        {/* Right side: Navigation Buttons */}
        <div className="flex items-center gap-4">
          {(currentStep > 1 || currentTab !== 'info' || location.pathname.includes('/settings')) && (
            <button 
              onClick={handlePrevious}
              className="flex items-center justify-center gap-1 text-[#0056B3] hover:text-blue bg-[#F5F5F5] px-3 h-8 rounded-md"
            >
            
              <IoIosArrowRoundBack className="text-xl" />
              Previous
              <span className="text-sm">{getStepText('previous')}</span>
            </button>
          )}

          {location.pathname.includes('/settings') ? (
            <button 
              onClick={handleSubmit}
              className="flex items-center justify-center gap-1 text-white bg-[#0056B3] hover:bg-[#004494] px-3 h-8 rounded-md"
            >
              Submit for Reviews
            </button>
          ) : (currentStep < steps.length || currentTab !== 'settings') && (
            <button 
              onClick={handleNext}
              className="flex items-center justify-center gap-1 text-[#0056B3] hover:text-[#004494] bg-[#F5F5F5] px-3 h-8 rounded-md"
            >
              Next
              <span className="text-sm">{getStepText('next')}</span>
              <IoIosArrowRoundForward className="text-xl" />
            </button>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default StepIndicator; 