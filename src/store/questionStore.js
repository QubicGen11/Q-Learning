import { create } from 'zustand';
import axios from 'axios';
import config from '../config/apiConfig';
import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast';

const useQuestionStore = create((set, get) => ({
  questions: [],
  loading: false,
  error: null,

  // Fetch questions for a specific lesson
  fetchQuestions: async (lessonId) => {
    set({ loading: true });
    try {
      const accessToken = Cookies.get('accessToken');
      const response = await axios.get(
        `${config.CURRENT_URL}/qlms/getLessonQuestions/${lessonId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      set({ 
        questions: response.data,
        loading: false,
        error: null
      });
    } catch (error) {
      console.error('Error fetching questions:', error);
      set({ 
        error: error.message,
        loading: false
      });
      toast.error('Failed to fetch questions');
    }
  },

  // Add a new question
  addQuestion: async (questionsData) => {
    set({ loading: true });
    try {
      const accessToken = Cookies.get('accessToken');
      
      const response = await axios.post(
        `${config.CURRENT_URL}/qlms/newQuestion`,
        { questions: questionsData },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      // Update local state with new questions
      set(state => ({
        questions: [...state.questions, ...response.data.questions],
        loading: false,
        error: null
      }));
      
      toast.success('Question added successfully');
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to add question';
      toast.error(errorMessage);
      
      set({ 
        error: errorMessage,
        loading: false
      });
      
      throw error;
    }
  },

  // Update an existing question
  updateQuestion: async (lessonId, questionData) => {
    set({ loading: true });
    try {
      const accessToken = Cookies.get('accessToken');
      const response = await axios.put(
        `${config.CURRENT_URL}/qlms/updateQuestion/${lessonId}`,
        questionData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      
      // Update local state
      set(state => ({
        questions: state.questions.map(q => 
          q.id === questionData.id ? response.data : q
        ),
        loading: false,
        error: null
      }));
      
      toast.success('Question updated successfully');
      return response.data;
    } catch (error) {
      console.error('Error updating question:', error);
      set({ 
        error: error.message,
        loading: false
      });
      toast.error('Failed to update question');
      throw error;
    }
  },

  // Delete a question
  deleteQuestion: async (lessonId, questionId) => {
    set({ loading: true });
    try {
      const accessToken = Cookies.get('accessToken');
      await axios.delete(
        `${config.CURRENT_URL}/qlms/deleteQuestion/${lessonId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      
      // Update local state
      set(state => ({
        questions: state.questions.filter(q => q.id !== questionId),
        loading: false,
        error: null
      }));
      
      toast.success('Question deleted successfully');
    } catch (error) {
      console.error('Error deleting question:', error);
      set({ 
        error: error.message,
        loading: false
      });
      toast.error('Failed to delete question');
      throw error;
    }
  },

  // Clear questions (useful when unmounting)
  clearQuestions: () => {
    set({ 
      questions: [],
      loading: false,
      error: null
    });
  }
}));

export default useQuestionStore; 