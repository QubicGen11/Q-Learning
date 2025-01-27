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

  exploreTopSkillsAndCertifications: {
    unlockPotential: [],
    trendingSkills: [],
    masterSkills: [],
    diverseCourses: [],
    certifiedCourses: []
  },

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
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('http://localhost:8089/qlms/recommendations');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Update store with the nested recommendations data
      set({ 
        categories: data.recommendations?.categories || [],
        mostSelling: data.recommendations?.mostSelling || [],
        skillsForYou: data.recommendations?.skillsForYou || [],
        topTrendingSkills: data.recommendations?.trendingSkillsForYou || [],
        topSkillsAndCertifications: data.recommendations?.topSkillsAndCertifications || {},
        learnersChoice: data.recommendations?.learnersChoice || [],
        testimonials: data.recommendations?.testimonials || [],
        exploreTopSkillsAndCertifications: {
          unlockPotential: data.recommendations?.exploreTopSkillsAndCertifications?.unlockPotential || [],
          trendingSkills: data.recommendations?.exploreTopSkillsAndCertifications?.trendingSkills || [],
          masterSkills: data.recommendations?.exploreTopSkillsAndCertifications?.masterSkills || [],
          diverseCourses: data.recommendations?.exploreTopSkillsAndCertifications?.diverseCourses || [],
          certifiedCourses: data.recommendations?.exploreTopSkillsAndCertifications?.certifiedCourses || []
        },
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
        exploreTopSkillsAndCertifications: {
          unlockPotential: [],
          trendingSkills: [],
          masterSkills: [],
          diverseCourses: [],
          certifiedCourses: []
        },
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