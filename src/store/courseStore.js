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

  fetchCourseById: async (courseId) => {
    try {
      const token = Cookies.get('accessToken');
      const response = await fetch(`http://localhost:8089/qlms/getCourseById/${courseId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch course');
      
      const courseData = await response.json();
      
      // Transform the lessons data
      const transformedLessons = courseData.courseLesson?.map(lessonItem => ({
        id: lessonItem.lessonId,
        title: lessonItem.lesson?.lessonTitle || '',
        content: lessonItem.lesson?.lessonContent || '',
        duration: lessonItem.lesson?.lessonDuration?.replace(/[^0-9]/g, '') || '0', // Extract numbers only
        feedback: lessonItem.lesson?.feedback || ''
      })) || [];

      const transformedData = {
        welcome: courseData.welcome || '',
        aboutCourse: courseData.aboutCourse || '',
        endObjective: courseData.endObjective || '',
        courseTitle: courseData.courseTitle || '',
        description: courseData.description || '',
        duration: courseData.duration || '',
        completionTime: courseData.completionTime || '',
        courseType: courseData.courseType || '',
        difficultyLevel: courseData.difficultyLevel || '',
        language: courseData.language || 'English',
        productCovered: courseData.productCovered || '',
        category: courseData.category || '',
        subCategory: courseData.subCategory || '',
        price: courseData.price || 0,
        originalPrice: courseData.originalPrice || 0,
        discount: courseData.discount || '',
        courseAudience: courseData.courseAudience || '',
        learningObjective: courseData.learningObjective || '',
        technologiesUsed: courseData.technologiesUsed || '',
        technologyImage: courseData.technologyImage || '',
        customTechnology: courseData.customTechnology || '',
        courseBanner: courseData.courseBanner || null,
        lessons: transformedLessons,
        preRequisites: courseData.coursePreRequisites?.map(prereq => ({
          id: prereq.preRequisiteId,
          preRequisiteRequired: prereq.preRequisites?.preRequisiteRequired || '',
          preRequisiteLevel: prereq.preRequisites?.preRequisiteLevel || ''
        })) || []
      };

      set({ courseData: transformedData });
    } catch (error) {
      console.error('Error fetching course:', error);
      throw error;
    }
  },

  submitCourse: async (courseId) => {
    try {
      const state = get();
      const { courseData } = state;
      
      // Transform lessons back to API format
      const transformedLessons = courseData.lessons?.map(lesson => ({
        id: lesson.id,
        courseId: courseId,
        lessonId: lesson.id,
        lesson: {
          id: lesson.id,
          lessonTitle: lesson.title,
          lessonContent: lesson.content,
          lessonDuration: `${lesson.duration} minutes`,
          feedback: lesson.feedback || ''
        }
      }));

      const courseDataToSubmit = {
        ...courseData,
        courseLesson: transformedLessons,
        courseBanner: courseData.courseBanner || null,
        coursePreRequisites: courseData.preRequisites?.map(prereq => ({
          id: prereq.id,
          courseId: courseId,
          preRequisiteId: prereq.id,
          preRequisites: {
            id: prereq.id,
            preRequisiteRequired: prereq.preRequisiteRequired,
            preRequisiteLevel: prereq.preRequisiteLevel
          }
        }))
      };

      const url = courseId 
        ? `http://localhost:8089/qlms/updateCourse/${courseId}`
        : 'http://localhost:8089/qlms/createCourse';

      const response = await fetch(url, {
        method: courseId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(courseDataToSubmit)
      });

      if (!response.ok) throw new Error(`Failed to ${courseId ? 'update' : 'create'} course`);
      return await response.json();
    } catch (error) {
      console.error('Error submitting course:', error);
      throw error;
    }
  }
}));

export default useCourseStore; 