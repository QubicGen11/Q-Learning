import { create } from 'zustand';
import Cookies from 'js-cookie';

const usePreLoginFeedStore = create((set, get) => ({
  categories: [],
  mostSelling: [],
  skillsForYou: [],
  topTrendingSkills: [],
  topSkillsAndCertifications: {},
  learnersChoice: [],
  testimonials: [],
  courseDetails: null,
  isLoading: false,
  error: null,

  // Fetch course by ID
  getCourseById: async (courseId) => {
    set({ isLoading: true, error: null });
    try {
      const token = Cookies.get('accessToken');
      const response = await fetch(`http://localhost:8089/qlms/courses/${courseId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Fetched course data:', data);
      
      set({ 
        courseDetails: data, // Store the entire response
        isLoading: false,
        error: null 
      });
      
      return data;
    } catch (error) {
      console.error('Error fetching course details:', error);
      set({ 
        courseDetails: null,
        error: error.message,
        isLoading: false 
      });
      throw error;
    }
  },

  // Simplified fetchPreLoginFeed to handle the new API response structure
  fetchPreLoginFeed: async () => {
    set({ isLoading: true });
    try {
      console.log('Fetching pre-login feed...');
      const token = Cookies.get('accessToken');
      const response = await fetch('http://localhost:8089/qlms/recommendations', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { recommendations } = await response.json();
      console.log('Received recommendations:', recommendations);
      
      set({
        categories: recommendations.categories || [],
        mostSelling: recommendations.mostSelling || [],
        skillsForYou: recommendations.skillsForYou || [],
        topTrendingSkills: recommendations.trendingSkills || [],
        topSkillsAndCertifications: recommendations.skillsForYou || {},
        learnersChoice: recommendations.learnersChoice || [],
        testimonials: recommendations.testimonials || [],
        isLoading: false,
        error: null
      });
    } catch (error) {
      console.error('Error in fetchPreLoginFeed:', error);
      set({ 
        categories: [],
        mostSelling: [],
        skillsForYou: [],
        topTrendingSkills: [],
        topSkillsAndCertifications: {},
        learnersChoice: [],
        testimonials: [],
        error: error.message,
        isLoading: false 
      });
    }
  },

  // Reset store
  resetStore: () => {
    set({
      categories: [],
      mostSelling: [],
      skillsForYou: [],
      topTrendingSkills: [],
      topSkillsAndCertifications: {},
      learnersChoice: [],
      testimonials: [],
      courseDetails: null,
      isLoading: false,
      error: null
    });
  }
}));

export default usePreLoginFeedStore; 