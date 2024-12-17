import { create } from 'zustand';
import Cookies from 'js-cookie';

const usePreLoginFeedStore = create((set) => ({
  categories: [],
  mostSelling: [],
  topTrendingSkills: [],
  topSkillsAndCertifications: {},
  learnersChoice: [],
  isLoading: false,
  error: null,

  // Action to fetch and set the pre-login feed data
  fetchPreLoginFeed: async () => {
    set({ isLoading: true });
    try {
      const accessToken = Cookies.get('accessToken');

      const response = await fetch('http://localhost:8089/qlms/preLoginFeed', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      
      set({
        categories: data.categories || [],
        mostSelling: data.mostSelling || [],
        topTrendingSkills: data.topTrendingSkills || [],
        topSkillsAndCertifications: data.topSkillsAndCertifications || {},
        learnersChoice: data.learnersChoice || [],
        isLoading: false,
        error: null
      });
    } catch (error) {
      set({ 
        error: 'Failed to fetch pre-login feed data',
        isLoading: false 
      });
      console.error('Error fetching pre-login feed:', error);
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
      isLoading: false,
      error: null
    });
  }
}));

export default usePreLoginFeedStore; 