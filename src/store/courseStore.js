import { create } from 'zustand';

const useCourseStore = create((set) => ({
  // Basic Information
  basicInfo: {
    courseTitle: '',
    description: '',
    duration: '',
    completionTime: '',
    courseType: 'Frontend',
    difficultyLevel: 'Intermediate',
    language: 'English',
    productCovered: 'Studio',
    category: '',
    thumbnailType: 'predefined',
    bannerImage: null,
  },

  // About Course
  aboutCourse: {
    welcomeMessage: '',
    courseOverview: '',
    courseAudience: '',
    endObjectives: '',
  },

  // Curriculum and Lessons
  curriculum: [],
  lessons: [],

  // Assignments
  assignments: [],

  // Resources
  resources: [],

  // Pricing
  pricing: {
    price: '',
    salePrice: '',
    discount: '',
    pricingModel: 'one-time',
    subscriptionDetails: {},
    accessDuration: 'lifetime',
  },

  // Course Details
  courseDetails: {
    courseAudience: '',
    endObjectives: '',
  },

  // Actions
  updateBasicInfo: (data) => 
    set((state) => ({ basicInfo: { ...state.basicInfo, ...data } })),

  updateAboutCourse: (data) =>
    set((state) => ({ aboutCourse: { ...state.aboutCourse, ...data } })),

  updateCurriculum: (curriculum) => set({ curriculum }),

  addLesson: (lesson) =>
    set((state) => ({ lessons: [...state.lessons, lesson] })),

  updateLesson: (lessonId, data) =>
    set((state) => ({
      lessons: state.lessons.map((lesson) =>
        lesson.id === lessonId ? { ...lesson, ...data } : lesson
      ),
    })),

  deleteLesson: (lessonId) =>
    set((state) => ({
      lessons: state.lessons.filter((lesson) => lesson.id !== lessonId),
    })),

  updatePricing: (data) =>
    set((state) => ({ pricing: { ...state.pricing, ...data } })),

  // Resources management
  addResource: (resource) =>
    set((state) => ({ resources: [...state.resources, resource] })),

  updateResource: (resourceId, data) =>
    set((state) => ({
      resources: state.resources.map((resource) =>
        resource.id === resourceId ? { ...resource, ...data } : resource
      ),
    })),

  deleteResource: (resourceId) =>
    set((state) => ({
      resources: state.resources.filter((resource) => resource.id !== resourceId),
    })),

  updateCourseDetails: (data) =>
    set((state) => ({
      courseDetails: { ...state.courseDetails, ...data }
    })),
}));

export default useCourseStore; 