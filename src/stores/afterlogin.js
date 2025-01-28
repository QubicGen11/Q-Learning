import { create } from 'zustand';
import axios from 'axios';

const useAfterLoginStore = create((set) => ({
  categories: [],
  activeCategory: null,
  loading: false,
  error: null,

  fetchCategories: async () => {
    set({ loading: true });
    try {
      const response = await axios.get('http://localhost:8089/qlms/categories', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log('API Response:', response.data); // Debug the raw response
  
      const categoriesData = response.data.categories; // Access the correct property
      if (!Array.isArray(categoriesData)) {
        throw new Error('Invalid data structure for categories');
      }
  
      const transformedCategories = categoriesData.map((category) => ({
        id: category.id,
        category: category.category,
        subCategories: category.subCategories || [],
      }));
  
      set({
        categories: transformedCategories,
        activeCategory: transformedCategories[0]?.category || null,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error('Error details:', error.response || error); // Detailed error logging
      set({
        error: 'Failed to fetch categories',
        loading: false,
      });
    }
  },
  

  setActiveCategory: (category) => {
    set({ activeCategory: category });
  },
}));

export default useAfterLoginStore;
