import { create } from 'zustand';
import Cookies from 'js-cookie';
import axios from 'axios';
import config from '../config/apiConfig';
import { toast } from 'react-hot-toast';

const useAuthStore = create((set, get) => ({
  isAuthenticated: !!Cookies.get('accessToken'),
  showStayLoggedIn: false,
  
  setAuthenticated: (value) => set({ isAuthenticated: value }),
  setShowStayLoggedIn: (value) => set({ showStayLoggedIn: value }),
  
  checkTokenExpiration: () => {
    const accessToken = Cookies.get('accessToken');
    console.log('Checking token expiration, token exists:', !!accessToken);

    if (!accessToken) {
      set({ isAuthenticated: false });
      return;
    }

    try {
      const payload = JSON.parse(atob(accessToken.split('.')[1]));
      const expirationTime = payload.exp * 1000;
      const currentTime = Date.now();
      
      console.log('Token expires at:', new Date(expirationTime));
      console.log('Current time:', new Date(currentTime));
      console.log('Time until expiration (minutes):', 
        Math.round((expirationTime - currentTime) / 1000 / 60));

      if (currentTime >= expirationTime - 300000) {
        const refreshToken = Cookies.get('refreshToken');
        console.log('Token near expiration, refresh token exists:', !!refreshToken);
        
        if (refreshToken) {
          set({ showStayLoggedIn: true });
        } else {
          set({ isAuthenticated: false });
          Cookies.remove('accessToken');
        }
      }
    } catch (error) {
      console.error('Error checking token expiration:', error);
      set({ isAuthenticated: false });
      Cookies.remove('accessToken');
    }
  },

  refreshSession: async () => {
    const refreshToken = Cookies.get('refreshToken');
    
    console.log('Attempting to use refresh token as access token');

    if (!refreshToken) {
      set({ 
        isAuthenticated: false,
        showStayLoggedIn: false 
      });
      return false;
    }

    try {
      // Simply replace the access token with the refresh token
      Cookies.set('accessToken', refreshToken, { 
        secure: true,
        sameSite: 'strict'
      });
      
      set({ 
        isAuthenticated: true, 
        showStayLoggedIn: false
      });
      
      toast.success('Session extended successfully');
      return true;
    } catch (error) {
      console.error('Error extending session:', error);
      
      // Clear tokens and reset state on error
      set({ 
        isAuthenticated: false,
        showStayLoggedIn: false 
      });
      
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
      
      toast.error('Session expired. Please login again.');
      return false;
    }
  },

  logout: () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    set({ 
      isAuthenticated: false,
      showStayLoggedIn: false
    });
  }
}));

export default useAuthStore; 