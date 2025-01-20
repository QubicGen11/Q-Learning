import { create } from 'zustand';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const usePreLoginFeedStore = create((set, get) => ({
  categories: [],
  mostSelling: [],
  topTrendingSkills: [],
  topSkillsAndCertifications: {},
  learnersChoice: [],
  testimonials: [],
  isLoading: false,
  error: null,

  // Modified getCourseById to handle string IDs and add console.log
  getCourseById: (id) => {
    const { mostSelling, learnersChoice } = get();
    console.log('Looking for course with ID:', id);
    
    // Debug: Log the first few courses and their IDs
    const allCourses = [...mostSelling, ...learnersChoice];
    console.log('First few courses:', allCourses.slice(0, 3).map(c => ({ id: c.id, title: c.courseTitle })));
    
    // Convert id to string for comparison
    const stringId = String(id);
    const course = allCourses.find(course => {
      console.log('Comparing:', String(course.id), stringId, String(course.id) === stringId);
      return String(course.id) === stringId;
    });

    return course;
  },

  // Modified fetchPreLoginFeed to include better error handling
  fetchPreLoginFeed: async () => {
    set({ isLoading: true });
    try {
      console.log('Fetching pre-login feed...');
      const token = Cookies.get('accessToken');
      const response = await fetch('http://localhost:8089/qlms/allcourses', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Received data:', data);
      
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