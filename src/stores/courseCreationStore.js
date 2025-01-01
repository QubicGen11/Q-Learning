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
    set((state) => ({
      courseData: {
        ...state.courseData,
        [section]: {
          ...state.courseData[section],
          ...data
        }
      }
    }));
    console.log('Updated course data:', get().courseData); // Debug log
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
          courseOutCome: '',
          courseDescription: '',
          coursePreRequisites: [],
          coursePrerequisites: [],
          courseAudience: []
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
      courseOutCome: '',
      courseDescription: '',
      coursePreRequisites: [],
      coursePrerequisites: [],
      courseAudience: []
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
      const requestBody = {
        // Basic Info
        courseName: courseData.basicInfo.courseName,
        courseTagline: courseData.basicInfo.courseTagline,
        courseDuration: courseData.basicInfo.courseDuration,
        difficultyLevel: courseData.basicInfo.difficultyLevel,
        category: courseData.basicInfo.category,
        subCategory: courseData.basicInfo.subCategory,
        teachingLanguage: courseData.basicInfo.teachingLanguage,
        
        // Media
        courseBanner: courseData.media?.courseBanner || null,
        courseImage: courseData.media?.courseImage || null,
        categoryImage: courseData.media?.categoryImage || null,
        
        // About Course - Fixed field names and structure
        courseOutcome: courseData.about?.courseOutCome || '',
        courseOutCome: courseData.about?.courseOutCome || '',
        
        courseDescription: courseData.about?.courseDescription || '',
        coursePreRequisites: courseData.about?.coursePreRequisites || [],
        courseAudience: courseData.about?.courseAudience || [],
        
        // Add debug field
        _debug_outcome: courseData.about?.courseOutCome || '',

        isDraft: currentStep < 6,
        courseStatus: 'pending',
        courseChapters: courseData.content?.chapters || []
      };

      console.log('Outcome values being sent:', {
        courseOutcome: requestBody.courseOutcome,
        courseOutCome: requestBody.courseOutCome,
        _debug: requestBody._debug_outcome
      });

      const response = await fetch('http://localhost:8089/qlms/createCourse', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();
      console.log('API Response:', data);

      // Add verification request
      if (response.ok) {
        const verifyResponse = await fetch(`http://localhost:8089/qlms/getCourse/${data.course.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        });
        const verifyData = await verifyResponse.json();
        console.log('Verification GET response:', verifyData);
        
        // Log any differences in outcome field
        if (requestBody._debug_outcome !== verifyData.course.courseOutcome && 
            requestBody._debug_outcome !== verifyData.course.courseOutCome) {
          console.warn('Outcome field mismatch:', {
            sent: requestBody._debug_outcome,
            received_lowercase: verifyData.course.courseOutcome,
            received_uppercase: verifyData.course.courseOutCome
          });
        }
      }

      if (response.ok) {
        if (!data.course.courseOutCome && requestBody.courseOutCome) {
          console.warn('Warning: courseOutCome not in response despite being sent');
        }
        if (!data.course.coursePreRequisites && requestBody.coursePreRequisites?.length > 0) {
          console.warn('Warning: coursePreRequisites not in response despite being sent');
        }

        toast.success('Course updated successfully!');
        if (currentStep < 6) {
          set({ currentStep: currentStep + 1 });
        } else {
          navigate('/instructor/courses');
        }

        const courseId = data.course.id;
        // Verify the data was saved
        const verificationData = await verifyCourseData(courseId, token);
        console.log('Verification data:', verificationData);

        // Add verification request
        const verifyResponse = await fetch(`http://localhost:8089/qlms/getCourse/${data.course.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        });
        const verifyData = await verifyResponse.json();
        console.log('Verification GET response:', verifyData);
        
        // Log any differences
        if (JSON.stringify(requestBody.coursePreRequisites) !== 
            JSON.stringify(verifyData.course.coursePreRequisites)) {
          console.warn('Prerequisites mismatch:', {
            sent: requestBody.coursePreRequisites,
            received: verifyData.course.coursePreRequisites
          });
        }
      } else {
        toast.error(data.message || 'Failed to update course');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to update course');
    }
  },

  // Add this function to your store
  verifyCourseData: async (courseId, token) => {
    try {
      const response = await fetch(`http://localhost:8089/qlms/getCourse/${courseId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      const data = await response.json();
      console.log('Verification GET response:', data);
      return data;
    } catch (error) {
      console.error('Verification failed:', error);
      return null;
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

    case 3:
      if (!data.about.courseOutCome) {
        toast.error('Course outcome is required');
        return false;
      }
      if (!data.about.courseDescription) {
        toast.error('Course description is required');
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