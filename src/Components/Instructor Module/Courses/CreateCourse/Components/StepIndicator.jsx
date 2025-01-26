import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useCourseCreationStore from '../../../../../stores/courseCreationStore';
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from 'react-icons/io';
import Cookies from 'js-cookie';
// import { toast } from 'react-toastify';
import Toast, { displayToast } from '../../../../Common/Toast/Toast';
import CommentDialog from './CommentDialog';
import ValidationDialog from './ValidationDialog';
 
 
 
const StepIndicator = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    currentStep,
    setStep,
    courseData,
    validateStep,
    validationErrors,
    setValidationErrors,
    submitCourse,
    validateMedia,
    validateContent,
    validateMoreInfo,
    validateFAQ,
    validateSettings
  } = useCourseCreationStore();
 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({ type: '', message: '' });
  const [showCommentDialog, setShowCommentDialog] = useState(false);
  const [showValidationDialog, setShowValidationDialog] = useState(false);
 
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
    if (location.pathname.includes('/basic-info')) {
      const { isValid, errors } = validateBasicInfo();
      if (!isValid) {
        setValidationErrors(errors);
        displayToast('error', 'Please complete all required fields');
        return;
      }
    }

    // Keep your existing About validation
    if (location.pathname.includes('/about')) {
      // Your existing about validation code
    }

    // Use store validations for other sections
    // if (location.pathname.includes('/media')) {
    //   if (!validateMedia()) {
    //     displayToast('error', 'Please upload all required media files');
    //     return;
    //   }
    // }

    // if (location.pathname.includes('/content')) {
    //   if (!validateContent()) {
    //     displayToast('error', 'Please complete the course content section');
    //     return;
    //   }
    // }

    // if (location.pathname.includes('/more-info')) {
    //   if (!validateMoreInfo()) {
    //     displayToast('error', 'Please complete glossary and references');
    //     return;
    //   }
    // }

    // if (location.pathname.includes('/faq')) {
    //   if (!validateFAQ()) {
    //     displayToast('error', 'Please add at least one FAQ');
    //     return;
    //   }
    // }

    if (location.pathname.includes('/settings')) {
      if (!validateSettings()) {
        displayToast('error', 'Please complete all required settings');
        return;
      }
    }

    const currentPath = location.pathname.split('/').pop();
   
    const isValid = validateStep(currentPath);
    console.log('Validation result:', isValid, 'for path:', currentPath);  // Debug log
 
    if (!isValid) {
      return;
    }
 
    if (currentTab === 'content') {
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
      if (currentStep < courseInformationSteps.length) {
        const nextStep = courseInformationSteps[currentStep];
        setStep(currentStep + 1);
        navigate(`/instructor/courses/create/${nextStep.path}`);
      } else {
        navigate('/instructor/courses/create/content');
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
 

 
  return (
    <div className="bg-white border-t relative">
      {showToast && (
        <div className="absolute top-4 right-4 z-50">
          <Toast
            type={toastMessage.type}
            message={toastMessage.message}
            onClose={() => setShowToast(false)}
          />
        </div>
      )}
 
      <div className="space-y-2">
        {/* Main Navigation Tabs */}
        <div className="flex justify-between  relative top-3 ">
          <div className="flex gap-8 ml-5 py-2 p-4 ">
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
          <div className="flex items-center gap-4 p-2 ">
  <div className="relative">
    <button
      onClick={() => {}}
      className="px-4 py-2 h-8 text-sm text-[#0056B3] border border-[#0056B3] hover:bg-gray-50 rounded-md flex items-center gap-2"
    >
      Preview
      <span className="material-icons text-sm">expand_more</span>
    </button>
  </div>

  {/* Add Save as Draft button */}
  <button
    onClick={async () => {
      try {
        setIsSubmitting(true);
        await submitCourse(true); // true for draft
        displayToast('success', 'Course saved as draft successfully!');
      } catch (error) {
        displayToast('error', 'Failed to save draft');
      } finally {
        setIsSubmitting(false);
      }
    }}
    disabled={isSubmitting}
    className="px-4 py-1 h-8 text-sm text-[#0056B3] border border-[#0056B3] hover:bg-gray-50 rounded-md flex items-center gap-2"
  >
    {isSubmitting ? (
      <>
        <span className="animate-spin mr-2">⌛</span>
        Saving...
      </>
    ) : (
      'Save as Draft'
    )}
  </button>

  {/* Submit for Review button */}
  <button
    onClick={async () => {
      const { 
        basicInfo, 
        media, 
        courseSettings,
        glossary,
        references,
        courseFaq,
        faq  
      } = courseData || {};
      
      // Add console.log to debug
      console.log('Course Data:', {
        courseFaq,
        faq,
        courseData
      });

      // Comprehensive validation checks
      const validationErrors = [];

      // Basic Info validation
      if (!basicInfo?.courseName) validationErrors.push("Course name is required");
      if (!basicInfo?.courseTagline) validationErrors.push("Course tagline is required");
      if (!basicInfo?.category) validationErrors.push("Category is required");
      if (!basicInfo?.subCategory) validationErrors.push("Subcategory is required");
      if (!basicInfo?.teachingLanguage) validationErrors.push("Teaching language is required");

      // Media validation
      if (!media?.courseBanner) validationErrors.push("Course banner is required");
      if (!media?.courseImage) validationErrors.push("Course image is required");
      
      // Course Settings validation
      // if (!courseSettings?.[0]) {
      //   validationErrors.push("Course settings are required");
      // } else { 
      //   const settings = courseSettings[0];
      //   if (!settings.pricingType) validationErrors.push("Pricing type is required");
      //   if (!settings.promotionType) validationErrors.push("Promotion type is required");
      //   if (settings.pricingType === 'Paid' && !settings.price) validationErrors.push("Price is required for paid courses");
      // }

      // Glossary and References validation
      if (!glossary || glossary.length === 0) {
        validationErrors.push("At least one glossary term is required");
      }
      if (!references || references.length === 0) {
        validationErrors.push("At least one reference is required");
      }

      // FAQ validation with debug logs
      console.log('FAQ Data:', { courseFaq, faq });
      const faqs = courseFaq || faq;
      console.log('Combined FAQs:', faqs);
      
      if (!faqs || faqs.length === 0) {
        console.log('FAQ Validation Failed');
        validationErrors.push("At least one FAQ is required");
      }

      // Log all validation errors
      console.log('Validation Errors:', validationErrors);

      // Display validation errors if any
      if (validationErrors.length > 0) {
        displayToast('error', validationErrors[0]);
        return;
      }

      // Show validation dialog first
      setShowValidationDialog(true);
    }}
    disabled={isSubmitting}
    className="px-4 py-1 h-8 text-sm text-white bg-[#0056B3] hover:bg-[#004494] rounded-md flex items-center gap-2"
  >
    {isSubmitting ? (
      <>
        <span className="animate-spin mr-2">⌛</span>
        Submitting...
      </>
    ) : (
      'Submit for Review'
    )}
  </button>

</div>
        </div>

        <div>
          {/* Validation Dialog */}
          <ValidationDialog
            isOpen={showValidationDialog}
            onClose={() => setShowValidationDialog(false)}
            onConfirm={() => {
              setShowValidationDialog(false);
              setShowCommentDialog(true); // Show comment dialog after validation
            }}
          />

          {/* Comment Dialog */}
          <CommentDialog  
            isOpen={showCommentDialog}
            onClose={() => setShowCommentDialog(false)}
            onSubmit={async (comment) => {
              try {
                setIsSubmitting(true);
                await submitCourse(false); // false for direct submit
                setShowCommentDialog(false);
                displayToast('success', 'Course submitted for review successfully!');
              } catch (error) {
                displayToast('error', 'Failed to submit course');
              } finally {
                setIsSubmitting(false);
              }
            }}
          />  
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
 <p></p>
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
    </div>
  );
};
 
export default StepIndicator;