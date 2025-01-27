import { create } from 'zustand';
import Cookies from 'js-cookie';

const usePreLoginFeedStore = create((set) => ({
  categories: [],
  mostSelling: [],
  topTrendingSkills: [],
  topSkillsAndCertifications: {},
  learnersChoice: [],
  testimonials: [],
  isLoading: false,
  error: null,

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
      topTrendingSkills: [],
      topSkillsAndCertifications: {},
      learnersChoice: [],
      testimonials: [],
      isLoading: false,
      error: null
    });
  }
}));

export default usePreLoginFeedStore; 