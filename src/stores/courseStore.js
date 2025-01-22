import { create } from 'zustand';
import axios from 'axios';
import Cookies from 'js-cookie';

const useCourseStore = create((set) => ({
  courses: [],
  loading: false,
  error: null,

  fetchCourses: async () => {
    set({ loading: true });
    try {
      const accessToken = Cookies.get('accessToken');
      const response = await axios.get('http://localhost:8089/qlms/allcoursesbyusers ', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      set({ courses: response.data.courses, loading: false });
      console.log(response.data.courses);
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  }
}));

export default useCourseStore; 