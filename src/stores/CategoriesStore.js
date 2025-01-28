import { create } from 'zustand';
import axios from 'axios';

const useCategoriesStore = create((set) => ({
  categoriesData: {
    mostPopular: [],
    newCourses: [],
    trending: [],
    allCourses: [],
  },
  isLoading: false,
  error: null,

  fetchCategoriesData: async (category, subCategory) => {
    // Prevent unnecessary state updates if already loading
    set((state) => {
      if (state.isLoading) return state;
      return { isLoading: true, error: null };
    });

    try {
      const response = await axios.get(`http://localhost:8089/qlms/coursesByOptions`, {
        params: { category, subCategory },
      });
      const { sections } = response.data;
      set({
        categoriesData: {
          mostPopular: sections.mostPopular || [],
          newCourses: sections.newCourses || [],
          trending: sections.trending || [],
          allCourses: sections.allCourses || [],
        },
        isLoading: false,
        error: null,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to fetch categories data.',
        isLoading: false,
      });
    }
  },


  
}));

export default useCategoriesStore;
