import { create } from 'zustand';

const useCourseCreationStore = create((set) => ({
  currentStep: 1,
  totalSteps: 6,
  steps: [
    { 
      id: 1, 
      title: 'Basic Information', 
      subtitle: 'Name, tagline, category, etc..',
      path: 'basic-info',
      isCompleted: false 
    },
    { 
      id: 2, 
      title: 'Add Media', 
      subtitle: 'Upload banner image and video',
      path: 'media',
      isCompleted: false 
    },
    { 
      id: 3, 
      title: 'About Course', 
      subtitle: 'Description, prerequisites etc..',
      path: 'about',
      isCompleted: false 
    },
    { 
      id: 4, 
      title: 'Course Content', 
      subtitle: 'Add chapters and lessons',
      path: 'content',
      isCompleted: false 
    },
    { 
      id: 5, 
      title: 'FAQs', 
      subtitle: 'Add frequently asked questions',
      path: 'faq',
      isCompleted: false 
    },
    { 
      id: 6, 
      title: 'Settings', 
      subtitle: 'Configure course settings',
      path: 'settings',
      isCompleted: false 
    }
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
      courseOutcome: [],
      prerequisites: [],
      targetAudience: [],
      description: ''
    },
    content: {
      chapters: []
    },
    faq: [],
    settings: {
      courseVisibility: {
        public: false,
        enablePreview: false
      },
      courseAccess: {
        duration: '',
        lifetimeAccess: false
      },
      pricing: {
        originalPrice: '',
        discountedPrice: '',
        startDate: '',
        endDate: ''
      },
      enrollment: {
        maxStudents: '',
        certificateEligibility: false,
        notifications: {
          notifyUpdates: false,
          notifyAssignments: false
        }
      }
    }
  },
  setStep: (step) => set((state) => ({ 
    currentStep: step,
    steps: state.steps.map(s => ({
      ...s,
      isCompleted: s.id < step
    }))
  })),
  updateCourseData: (section, data) => set((state) => ({
    courseData: {
      ...state.courseData,
      [section]: data
    }
  })),
  markStepComplete: (stepId) => set((state) => ({
    steps: state.steps.map(step => 
      step.id === stepId ? { ...step, isCompleted: true } : step
    )
  })),
  resetStore: () => set({
    currentStep: 1,
    steps: [
      { 
        id: 1, 
        title: 'Basic Information', 
        subtitle: 'Name, tagline, category, etc..',
        path: 'basic-info',
        isCompleted: false 
      },
      { 
        id: 2, 
        title: 'Add Media', 
        subtitle: 'Upload banner image and video',
        path: 'media',
        isCompleted: false 
      },
      { 
        id: 3, 
        title: 'About Course', 
        subtitle: 'Description, prerequisites etc..',
        path: 'about',
        isCompleted: false 
      },
      { 
        id: 4, 
        title: 'Course Content', 
        subtitle: 'Add chapters and lessons',
        path: 'content',
        isCompleted: false 
      },
      { 
        id: 5, 
        title: 'FAQs', 
        subtitle: 'Add frequently asked questions',
        path: 'faq',
        isCompleted: false 
      },
      { 
        id: 6, 
        title: 'Settings', 
        subtitle: 'Configure course settings',
        path: 'settings',
        isCompleted: false 
      }
    ].map(step => ({ ...step, isCompleted: false })),
    courseData: {
      basicInfo: {},
      media: {},
      about: {},
      content: { chapters: [] },
      faq: [],
      settings: {}
    }
  })
}));

export default useCourseCreationStore;