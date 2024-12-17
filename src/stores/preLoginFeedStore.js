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
      const accessToken = Cookies.get('accessToken');

      const response = await fetch('http://localhost:8089/qlms/preLoginFeed', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 403) {
        // Token expired or invalid
        Swal.fire({
          title: 'Session Expired',
          text: 'Your session has expired. Please login again.',
          icon: 'warning',
          confirmButtonColor: '#0056B3',
          confirmButtonText: 'Login',
          iconColor: '#0056B3',
          allowOutsideClick: false
        }).then((result) => {
          if (result.isConfirmed) {
            // Clear cookies
            Cookies.remove('accessToken');
            Cookies.remove('refreshToken');
            // Redirect to login page
            window.location.href = '/login';
          }
        });
        throw new Error('Session expired');
      }

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