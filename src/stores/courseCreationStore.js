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
      courseAudience: []
    },
    content: { 
      chapters: []
    },
    courseFaqs: [],
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

  setStep: (step) => {
    set({ currentStep: step });
  },

  updateCourseData: (section, data) => {
    set((state) => ({
      courseData: {
        ...state.courseData,
        [section]: section === 'courseFaqs' ? 
          // Handle FAQs as a direct array
          (Array.isArray(data) ? data : Object.values(data))
          :
          // Handle other sections as before
          {
            ...state.courseData[section],
            ...data
          }
      }
    }));
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
        
        // About Course
        courseOutcome: courseData.about?.courseOutCome || '',
        courseOutCome: courseData.about?.courseOutCome || '',
        courseDescription: courseData.about?.courseDescription || '',
        coursePreRequisites: courseData.about?.coursePreRequisites || [],
        courseAudience: courseData.about?.courseAudience || [],
        
        // Course Content
        courseChapters: courseData.content?.chapters || [],

        // Course FAQs - ensure it's an array
        courseFaqs: Array.isArray(courseData.courseFaqs) ? 
          courseData.courseFaqs : 
          Object.values(courseData.courseFaqs || {}),

        isDraft: currentStep < 6,
        courseStatus: 'pending'
      };

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

      if (response.ok) {
        toast.success('Course updated successfully!');
        if (currentStep < 6) {
          set({ currentStep: currentStep + 1 });
        } else {
          navigate('/instructor/courses');
        }
      } else {
        toast.error(data.message || 'Failed to update course');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to update course');
    }
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
          courseBanner: null,
          courseImage: null,
          categoryImage: null
        },
        about: {
          courseOutCome: '',
          courseDescription: '',
          coursePreRequisites: [],
          courseAudience: []
        },
        content: { 
          chapters: []
        },
        courseFaqs: [],
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
  }
}));

export default useCourseCreationStore;