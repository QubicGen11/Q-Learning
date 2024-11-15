import { create } from 'zustand';
import Cookies from 'js-cookie';
const useAuthStore = create((set) => ({
  isAuthenticated: !!Cookies.get('accessToken'),
  sessionExpired: false,
  showStayLoggedIn: false,
  setSessionExpired: (value) => set({ sessionExpired: value }),
  setAuthenticated: (value) => set({ isAuthenticated: value }),
  setShowStayLoggedIn: (value) => set({ showStayLoggedIn: value }),
  refreshSession: () => {
    const refreshToken = Cookies.get('refreshToken');
    if (refreshToken) {
      Cookies.set('accessToken', refreshToken);
      set({ isAuthenticated: true, showStayLoggedIn: false });
      window.location.reload();
    }
  },
}));

export default useAuthStore; 