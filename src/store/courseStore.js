import { create } from 'zustand';
import Cookies from 'js-cookie';

const useCourseStore = create((set, get) => ({
  courseData: {
    welcome: '',
    aboutCourse: '',
    endObjective: '',
    courseTitle: '',
    description: '',
    duration: '',
    completionTime: '',
    courseType: '',
    difficultyLevel: '',
    language: 'English',
    productCovered: '',
    category: '',
    subCategory: '',
    price: 0,
    originalPrice: 0,
    discount: '',
    courseAudience: '',
    learningObjective: '',
    technologiesUsed: '',
    technologyImage: '',
    customTechnology: 'No',
    coustomTechnologyImg: '',
    courseBanner: null,
    thumbnailType: 'predefined',
    lessons: [],
    objectives: [],
    preRequisites: [],
    learningObjectives: []
  },

  updateCourseData: (data) => 
    set((state) => ({
      courseData: { ...state.courseData, ...data }
    })),

  addLesson: (lesson) =>
    set((state) => ({
      courseData: {
        ...state.courseData,
        lessons: [...state.courseData.lessons, {
          lessonTitle: lesson.lessonTitle,
          lessonDuration: lesson.lessonDuration,
          lessonContent: lesson.lessonContent
        }]
      }
    })),

  submitCourse: async () => {
    try {
      const state = get();
      const { courseData } = state;
      const token = Cookies.get('accessToken');

      if (!token) throw new Error('Authentication token not found');

      const courseDataToSubmit = {
        ...courseData,
        courseBanner: courseData.courseBanner || null,
        objectives: courseData.objectives || [],
        preRequisites: courseData.preRequisites || [],
        learningObjectives: courseData.learningObjectives || []
      };

      const response = await fetch('http://localhost:8089/qlms/createCourse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(courseDataToSubmit)
      });

      if (!response.ok) throw new Error('Failed to create course');
      return await response.json();
    } catch (error) {
      console.error('Error creating course:', error);
      throw error;
    }
  }
}));

export default useCourseStore; 