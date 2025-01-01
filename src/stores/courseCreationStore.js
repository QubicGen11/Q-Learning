import { create } from 'zustand';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

const useCourseCreationStore = create((set, get) => ({
  currentStep: 1,
  steps: [
    { id: 1, title: 'Basic Information', path: 'basic-info' },
    { id: 2, title: 'Media', path: 'media' },
    { id: 3, title: 'About', path: 'about' },
    { id: 4, title: 'Content', path: 'content' },
    { id: 5, title: 'FAQ', path: 'faq' },
    { id: 6, title: 'Settings', path: 'settings' }
  ],
  
  setStep: (step) => {
    set({ currentStep: step });
  },

  updateCourseData: (section, data) => {
    set(state => ({
      courseData: {
        ...state.courseData,
        [section]: {
          ...state.courseData[section],
          ...data
        }
      }
    }));
    // Log the updated state
    console.log('Updated course data:', get().courseData);
  },

  resetStore: () => {
    set({
      currentStep: 1,
      courseData: {
        basicInfo: {
          courseName: '',
          courseTagline: '',
          courseDuration: '',
          difficultyLevel: '',
          category: '',
          subCategory: '',
          teachingLanguage: '',
          hashtags: []
        },
        media: {
          courseBanner: '',
          courseImage: '',
          categoryImage: ''
        },
        about: {
          courseOutcome: '',
          description: '',
          prerequisites: [],
          targetAudience: []
        },
        content: { 
          chapters: []
        },
        faq: [],
        settings: {
          courseVisibility: { public: false, enablePreview: false },
          courseAccess: { duration: '', lifetimeAccess: false },
          pricing: { originalPrice: '', discountedPrice: '', startDate: null, endDate: null },
          enrollment: {
            maxStudents: '',
            certificateEligibility: false,
            notifications: { notifyUpdates: false, notifyAssignments: false }
          }
        }
      }
    });
  },

  courseData: {
    basicInfo: {
      courseName: '',
      courseTagline: '',
      courseDuration: '',
      difficultyLevel: '',
      category: '',
      subCategory: '',
      teachingLanguage: '',
      hashtags: []
    },
    media: {
      courseBanner: null,
      courseImage: null,
      categoryImage: null
    },
    about: {
      courseOutcome: '',
      description: '',
      prerequisites: [],
      targetAudience: []
    },
    content: { 
      chapters: []
    },
    faq: [],
    settings: {
      courseVisibility: { public: false, enablePreview: false },
      courseAccess: { duration: '', lifetimeAccess: false },
      pricing: { originalPrice: '', discountedPrice: '', startDate: null, endDate: null },
      enrollment: {
        maxStudents: '',
        certificateEligibility: false,
        notifications: { notifyUpdates: false, notifyAssignments: false }
      }
    }
  },

  // Function to handle next button click and API calls
  handleNext: async (navigate) => {
    const { currentStep, courseData } = get();
    const token = Cookies.get('accessToken');

    try {
      console.log('Course data before API call:', courseData);
      console.log('Media data before API call:', courseData.media);

      // Create request body
      const requestBody = {
        courseName: courseData.basicInfo.courseName,
        courseTagline: courseData.basicInfo.courseTagline,
        courseDuration: courseData.basicInfo.courseDuration,
        difficultyLevel: courseData.basicInfo.difficultyLevel,
        category: courseData.basicInfo.category,
        subCategory: courseData.basicInfo.subCategory,
        teachingLanguage: courseData.basicInfo.teachingLanguage,
        isDraft: currentStep < 6,
        courseStatus: 'pending',
        // Use the full data URLs
        courseBanner: courseData.media?.courseBanner || null,
        courseImage: courseData.media?.courseImage || null,
        categoryImage: courseData.media?.categoryImage || null
      };

      console.log('Final request body media:', {
        courseBanner: requestBody.courseBanner ? 'present' : 'null',
        courseImage: requestBody.courseImage ? 'present' : 'null',
        categoryImage: requestBody.categoryImage ? 'present' : 'null'
      });

      const response = await fetch('http://localhost:8089/qlms/createCourse', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      const responseData = await response.json();
      console.log('API Response:', responseData);

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to save progress');
      }

      // Success handling
      if (currentStep < 6) {
        set({ currentStep: currentStep + 1 });
        navigate(`/instructor/courses/create/${get().steps[currentStep].path}`);
        toast.success('Progress saved successfully!');
      } else {
        toast.success('Course created successfully!');
        navigate('/instructor/courses');
      }
      return true;

    } catch (error) {
      console.error('Error in handleNext:', error);
      toast.error(error.message || 'Failed to save progress');
      return false;
    }
  }
}));

// Helper function to validate step data
function validateStepData(step, data) {
  switch(step) {
    case 1:
      // Check all required fields for basic info
      const requiredFields = [
        'courseName',
        'courseTagline',
        'courseDuration',
        'difficultyLevel',
        'category',
        'subCategory',
        'teachingLanguage'
      ];

      for (const field of requiredFields) {
        if (!data.basicInfo[field]) {
          toast.error(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
          return false;
        }
      }
      return true;

    case 2:
      console.log('Validating media data:', data.media);
      if (!data.media.courseBanner) {
        toast.error('Please upload a banner image');
        return false;
      }
      if (!data.media.courseImage) {
        toast.error('Please upload a course image');
        return false;
      }
      if (!data.media.categoryImage) {
        toast.error('Please upload a category image');
        return false;
      }
      return true;
    // Add validation for other steps...
    default:
      return true;
  }
}

const validateBasicInfo = (data) => {
  const required = [
    'courseName',
    'courseTagline',
    'courseDuration',
    'difficultyLevel',
    'category',
    'subCategory',
    'teachingLanguage'
  ];

  for (const field of required) {
    if (!data[field]) {
      return `${field.replace(/([A-Z])/g, ' $1').toLowerCase()} is required`;
    }
  }
  return null;
};

export default useCourseCreationStore;