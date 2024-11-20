import { create } from 'zustand';
import Cookies from 'js-cookie';

// Helper functions for localStorage
const LOCAL_STORAGE_KEY = 'course_draft';

// Transform the form data to match backend structure
const transformPayload = (formData) => {
  // Ensure lessons have the correct structure
  const transformedLessons = formData.lessons?.map(lesson => ({
    lessonTitle: lesson.lessonTitle || "",
    lessonDuration: lesson.lessonDuration || "",
    lessonContent: lesson.lessonContent || ""
  })) || [];

  // Ensure prerequisites have the correct structure
  const transformedPreRequisites = formData.preRequisites?.map(prereq => ({
    preRequisiteRequired: prereq.preRequisiteRequired || "",
    preRequisiteLevel: prereq.preRequisiteLevel || ""
  })) || [];

  // Transform the main payload
  return {
    welcome: formData.welcome || "",
    aboutCourse: formData.aboutCourse || "",
    endObjective: formData.endObjective || "",
    courseTitle: formData.courseTitle || "",
    description: formData.description || "",
    duration: `${formData.duration} weeks`,
    completionTime: `${formData.completionTime} hours`,
    courseType: formData.courseType || "",
    difficultyLevel: formData.difficultyLevel || "",
    language: formData.language || "",
    productCovered: formData.productCovered || "",
    category: formData.category || "",
    subCategory: formData.subCategory || "",
    price: Number(formData.price) || 0,
    originalPrice: Number(formData.originalPrice) || 0,
    discount: formData.discount || "",
    courseAudience: formData.courseAudience || "",
    learningObjective: formData.learningObjective || "",
    technologiesUsed: formData.technologiesUsed || "",
    technologyImage: formData.technologyImage || "",
    customTechnology: formData.customTechnology || "No",
    coustomTechnologyImg: formData.coustomTechnologyImg || "N/A",
    courseBanner: formData.courseBanner || "",
    lessons: transformedLessons,
    preRequisites: transformedPreRequisites
  };
};

const useCourseStore = create((set, get) => ({
  courseData: {
    title: '',
    description: '',
    welcomeMessage: '',
    learningObjective: [],
    preRequisites: [],
    courseAudience: '',
    lessons: []
  },

  updateCourseData: (data) => 
    set((state) => ({
      courseData: {
        ...state.courseData,
        ...data
      }
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

  submitCourse: async (courseData) => {
    try {
      // Ensure lessons array exists and filter out invalid lessons
      const filteredLessons = (courseData.lessons || []).filter(lesson => 
        lesson && 
        lesson.lessonTitle && 
        lesson.lessonTitle.trim() !== ''
      );

      // Create new course data object with filtered lessons
      const cleanedCourseData = {
        ...courseData,
        lessons: filteredLessons.length > 0 ? filteredLessons : [{
          lessonTitle: "Default Lesson",
          lessonDuration: "1 hour",
          lessonContent: "Default content"
        }]
      };

      console.log("Submitting course data:", cleanedCourseData);

      const token = Cookies.get('accessToken');
      const response = await fetch("http://localhost:8089/qlms/createCourse", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cleanedCourseData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Server error');
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error("Full error details:", error);
      throw new Error(`Failed to create course: ${error.message}`);
    }
  },

  removeLesson: (lessonId) =>
    set((state) => ({
      courseData: {
        ...state.courseData,
        lessons: state.courseData.lessons.filter(lesson => lesson.id !== lessonId)
      }
    }))
}));

export default useCourseStore; 