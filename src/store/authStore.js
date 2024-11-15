import { create } from 'zustand';
import Cookies from 'js-cookie';
const useAuthStore = create((set) => ({
  isAuthenticated: !!Cookies.get('accessToken'),
  sessionExpired: false,
  setSessionExpired: (value) => set({ sessionExpired: value }),
  setAuthenticated: (value) => set({ isAuthenticated: value }),
}));

export default useAuthStore; 