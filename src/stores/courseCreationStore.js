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
      hashtags: [],
      courseType: '',
      percentageRequired: '',
    },
    media: {
      courseBanner: null,
      courseImage: null,
      categoryImage: null
    },
    about: {
      courseOutcome: '',
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
    },
    courseSettings: [{
      pricingType: '',
      promotionType: '',
      publicAccess: false,
      enablePreview: false,
    }]
  },

  categories: [],
  subCategories: [],

  courseTypes: [],

  validationErrors: {},
  setValidationErrors: (errors) => set({ validationErrors: errors }),

  setStep: (step) => {
    set({ currentStep: step });
  },

  updateCourseData: (section, data) => {
    set((state) => ({
      courseData: {
        ...state.courseData,
        [section]: section === 'courseSettings' ? 
          // Handle settings as array
          (Array.isArray(data) ? data : [data])
          :
          section === 'courseFaqs' ?
          // Handle FAQs as array
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
  handleNext: (navigate) => {
    const { currentStep } = get();
    // Just handle navigation, no API call
    if (currentStep < 6) {
      set({ currentStep: currentStep + 1 });
      const nextStep = get().steps[currentStep];
      navigate(`/instructor/courses/create/${nextStep.path}`);
    }
  },

  submitCourse: async (navigate) => {
    const { courseData } = get();
    const token = Cookies.get('accessToken');

    try {
      const formattedSettings = courseData.courseSettings.map(setting => ({
        ...setting,
        startDate: setting.startDate ? new Date(setting.startDate).toISOString() : null,
        endDate: setting.endDate ? new Date(setting.endDate).toISOString() : null
      }));

      // Correctly format hashtags as array of objects with tagName
      const hashTags = Array.isArray(courseData.basicInfo.hashtags) 
        ? courseData.basicInfo.hashtags
        : courseData.basicInfo.hashtags.split(',')
            .map(tag => tag.trim())
            .filter(Boolean)
            .map(tag => ({ tagName: tag }));

      const requestBody = {
        courseName: courseData.basicInfo.courseName,
        courseTagline: courseData.basicInfo.courseTagline,
        courseDuration: courseData.basicInfo.courseDuration,
        difficultyLevel: courseData.basicInfo.difficultyLevel,
        category: courseData.basicInfo.category,
        subCategory: courseData.basicInfo.subCategory,
        teachingLanguage: courseData.basicInfo.teachingLanguage,
        courseType: courseData.basicInfo.courseType,
        percentageRequired: parseFloat(courseData.basicInfo.percentageRequired) || 0,
        hashTags, // Use the correctly formatted hashtags
        courseBanner: courseData.media.courseBanner,
        courseImage: courseData.media.courseImage,
        categoryImage: courseData.media.categoryImage,
        courseOutcome: courseData.about.courseOutcome,
        courseDescription: courseData.about.courseDescription,
        coursePreRequisites: courseData.about.coursePreRequisites,
        courseAudience: courseData.about.courseAudience,
        courseChapters: courseData.content.chapters,
        courseFaqs: Array.isArray(courseData.courseFaqs) ? 
          courseData.courseFaqs : 
          Object.values(courseData.courseFaqs || {}),
        courseSettings: formattedSettings,
        isDraft: false,
        courseStatus: 'pending'
      };

      console.log('Submitting course data:', requestBody); // Debug log

      const response = await fetch('http://localhost:8089/qlms/createCourse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Course submitted successfully!');
        navigate('/instructor/courses');
      } else {
        toast.error(data.message || 'Failed to submit course');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to submit course');
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
          hashtags: [],
          courseType: '',
          percentageRequired: '',
        },
        media: {
          courseBanner: null,
          courseImage: null,
          categoryImage: null
        },
        about: {
          courseOutcome: '',
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
        },
        courseSettings: [{
          pricingType: '',
          promotionType: '',
          publicAccess: false,
          enablePreview: false,
        }]
      }
    });
  },

  fetchCategories: async () => {
    try {
      const response = await fetch('http://localhost:8089/qlms/allCategories');
      const data = await response.json();
      set({ categories: data });
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to load categories');
    }
  },

  fetchSubCategories: async (categoryId) => {
    if (!categoryId) {
      set({ subCategories: [] });
      return;
    }
    try {
      const response = await fetch(`http://localhost:8089/qlms/allSubCategories/${categoryId}`);
      const data = await response.json();
      set({ subCategories: data });
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      toast.error('Failed to load subcategories');
    }
  },

  fetchCourseTypes: async () => {
    try {
      const response = await fetch('http://localhost:8089/qlms/allCourseTypes');
      const data = await response.json();
      set({ courseTypes: data });
    } catch (error) {
      console.error('Error fetching course types:', error);
      toast.error('Failed to load course types');
    }
  }
}));

export default useCourseCreationStore;