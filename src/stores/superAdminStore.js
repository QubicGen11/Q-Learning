import { create } from 'zustand';
import axios from 'axios';
import Cookies from 'js-cookie';

const useSuperAdminStore = create((set, get) => ({
  courses: [],
  currentPage: 1,
  rowsPerPage: 10,
  loading: false,
  error: null,
  selectedCourses: [],

  // Get paginated data for current page
  getPaginatedData: () => {
    const { courses, currentPage, rowsPerPage } = get();
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return courses.slice(startIndex, endIndex);
  },

  // Get total pages
  getTotalPages: () => {
    const { courses, rowsPerPage } = get();
    return Math.ceil(courses.length / rowsPerPage);
  },

  // Fetch all courses
  fetchCoursesForReview: async () => {
    set({ loading: true });
    try {
      const accessToken = Cookies.get('accessToken');
      const response = await axios.get(`http://localhost:8089/qlms/allcourses`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      set({ 
        courses: response.data.courses, 
        loading: false 
      });
      return response.data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Pagination controls
  nextPage: () => {
    const { currentPage, getTotalPages } = get();
    if (currentPage < getTotalPages()) {
      set({ currentPage: currentPage + 1 });
    }
  },

  previousPage: () => {
    const { currentPage } = get();
    if (currentPage > 1) {
      set({ currentPage: currentPage - 1 });
    }
  },

  // Selection handlers
  toggleCourseSelection: (courseId) => {
    set(state => ({
      selectedCourses: state.selectedCourses.includes(courseId)
        ? state.selectedCourses.filter(id => id !== courseId)
        : [...state.selectedCourses, courseId]
    }));
  },

  selectAllCourses: () => {
    const { courses, selectedCourses } = get();
    set({
      selectedCourses: selectedCourses.length === courses.length ? [] : courses.map(course => course.id)
    });
  }
}));

export default useSuperAdminStore; 