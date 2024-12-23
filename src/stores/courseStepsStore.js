import { create } from 'zustand';

const useCourseStepsStore = create((set) => ({
  currentStep: 1,
  courseData: {
    basicInfo: {
      courseName: '',
      courseTagline: '',
      courseDuration: '',
      category: '',
      subCategory: '',
      teachingLanguage: '',
      hashtags: [],
      difficultyLevel: ''
    },
    media: {
      banner: null,
      video: null
    },
    about: {
      description: '',
      prerequisites: []
    }
  },
  setCurrentStep: (step) => set({ currentStep: step }),
  updateCourseData: (section, data) => set((state) => ({
    courseData: {
      ...state.courseData,
      [section]: { ...state.courseData[section], ...data }
    }
  }))
}));

export default useCourseStepsStore; 