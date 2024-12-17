import { create } from 'zustand';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const usePreLoginFeedStore = create((set) => ({
  categories: [],
  mostSelling: [],
  topTrendingSkills: [],
  topSkillsAndCertifications: {},
  learnersChoice: [],
  testimonials: [],
  isLoading: false,
  error: null,

  // Action to fetch and set the pre-login feed data
  fetchPreLoginFeed: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch('http://localhost:8089/qlms/preLoginFeed', {
        headers: {
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
        testimonials: data.testimonials || [],
        isLoading: false,
        error: null
      });
    } catch (error) {
      set({ 
        categories: [],
        mostSelling: [],
        topTrendingSkills: [],
        topSkillsAndCertifications: {},
        learnersChoice: [],
        testimonials: [],
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
      testimonials: [],
      isLoading: false,
      error: null
    });
  }
}));

export default usePreLoginFeedStore; 