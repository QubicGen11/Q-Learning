import { create } from 'zustand';
import axios from 'axios';
import Cookies from 'js-cookie';
import config from '../config/apiConfig';

const useCourseLearnStore = create((set, get) => ({
  currentCourse: null,
  isLoading: false,
  error: null,
  currentChapter: null,
  currentLesson: null,

  // Fetch course data by ID
  fetchCourseById: async (courseId) => {
    try {
      set({ isLoading: true });
      console.log('Fetching course with ID:', courseId);
      
      const token = Cookies.get('accessToken');
      const response = await axios.get(`http://localhost:8089/qlms/courses/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Raw API response:', response.data);
      
      if (!response.data) {
        throw new Error('No data received from API');
      }

      // Transform the API response
      const courseData = {
        id: response.data.id,
        courseName: response.data.courseName || 'Untitled Course',
        progress: response.data.progress || 0,
        ...response.data,
        chapters: response.data.courseChapters?.map(({ chapter }) => ({
          id: chapter.id,
          title: chapter.chapterName,
          lessons: chapter.chapterLessons?.map(({ lesson }) => ({
            id: lesson.id,
            title: lesson.lessonTitle,
            content: lesson.lessonContent,
            type: lesson.lessonType,
            video: lesson.lessonVideo,
            materials: lesson.lessonMaterials,
            questions: lesson.lessonQuestions?.map(q => ({
              question: q.question.question,
              options: q.question.options
            })) || []
          })) || [],
          questions: chapter.chaperQuestions?.map(q => ({
            question: q.question.question,
            options: q.question.options
          })) || []
        })) || []
      };

      console.log('Transformed course data:', courseData);

      set({ 
        currentCourse: courseData,
        isLoading: false,
        error: null
      });
    } catch (error) {
      console.error('Error fetching course:', error);
      set({ 
        error: error.message || 'Failed to fetch course data',
        isLoading: false,
        currentCourse: null
      });
    }
  },

  // Set current chapter and lesson
  setCurrentChapter: (chapter) => {
    console.log('Setting current chapter:', chapter);
    set({ currentChapter: chapter });
  },

  setCurrentLesson: (lesson) => {
    console.log('Setting current lesson:', lesson);
    set({ currentLesson: lesson });
  }
}));

export default useCourseLearnStore; 