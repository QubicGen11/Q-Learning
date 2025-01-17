import { create } from 'zustand';
import Cookies from 'js-cookie';
import axios from 'axios';
import { displayToast } from '../Components/Common/Toast/Toast';



// Add WebSocket connection
let ws = null;

const connectWebSocket = (token) => {
  
  // Create new WebSocket connection
  ws = new WebSocket('ws://localhost:8089/ws');

  ws.onopen = () => {
    console.log('WebSocket Connected');
    // Send authentication token
    ws.send(JSON.stringify({
      type: 'AUTH',
      token: token
    }));
  };

  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      switch (data.type) {
        case 'SESSION_EXPIRED':
          useAuthStore.getState().showSessionExpiredPopup();
          break;
        case 'NOTIFICATION':
          displayToast('info', data.message);
          break;
        default:
          // console.log('Received WebSocket message:', data);
      }
    } catch (error) {
      // console.error('Error processing WebSocket message:', error);
    }
  };

  ws.onclose = () => {
    // console.log('WebSocket Disconnected');
    // Attempt to reconnect after 5 seconds
    setTimeout(() => {
      if (Cookies.get('accessToken')) {
        // connectWebSocket(Cookies.get('accessToken'));
      }
    }, 5000);
  };

  ws.onerror = (error) => {
    // console.error('WebSocket Error:', error);
  };
};

// Enhanced token expiration check
const isTokenExpired = (token) => {
  if (!token) return true;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    
    console.log('Token Expiry Check:', {
      currentTime,
      expiryTime: payload.exp,
      isExpired: currentTime >= payload.exp
    });
    
    return currentTime >= payload.exp;
  } catch (error) {
    console.error('Token Expiry Check Error:', error);
    return true;
  }
};

const useAuthStore = create((set) => ({
  isLoggedIn: false,
  userName: '',
  userEmail: '',
  userImage: 'data:image/jpeg;base64,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',
  loading: false,

  login: async (email, password) => {
    set({ loading: true });
    try {
      const response = await axios.post('http://localhost:8089/qlms/loginWithPassword', {
        email,
        password
      });

      console.log('Login Response:', response.data);

      if (response.data && response.data.accessToken && response.data.refreshToken) {
        Cookies.set('accessToken', response.data.accessToken);
        Cookies.set('refreshToken', response.data.refreshToken);
        
        // Initialize WebSocket connection after successful login
        connectWebSocket(response.data.accessToken);

        const tokenPayload = JSON.parse(atob(response.data.accessToken.split('.')[1]));
        console.log('Decoded Token:', tokenPayload);

        set({ 
          isLoggedIn: true,
          userName: tokenPayload.name || tokenPayload.sub || email.split('@')[0],
          userEmail: tokenPayload.email || email,
          loading: false
        });

        console.log('State after login:', useAuthStore.getState());

        displayToast('success', 'Welcome back!');
        return true;
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Login Error:', error);
      set({ loading: false });
      
      displayToast('error', error.response?.data?.message || 'Invalid credentials');
      return false;
    }
  },

  sendOtp: async (email) => {
    
    set({ loading: true });
    try {
      const response = await axios.post('http://localhost:8089/qlms/sendOtp', { 
        email 
      });
      
      console.log('OTP Response:', response.data);
      
      set({ loading: false });
      
      displayToast('success', 'Please check your email for the OTP');
      
      return true;
      
    } catch (error) {
      console.error('OTP Error:', error);
      set({ loading: false });
      
      displayToast('error', error.response?.data?.message || 'Something went wrong');
      
      return false;
    }
  },

  verifyOtp: async (email, otp) => {
    set({ loading: true });
    try {
      console.log('Sending OTP verification with:', {
        email,
        otpCode: otp.join('')
      });

      const response = await axios.post('http://localhost:8089/qlms/loginWithOtp', {
        email,
        otpCode: otp.join('')
      });
      
      console.log('OTP Verification Response:', response.data);

      if (response.status === 200) {
        // Store tokens
        Cookies.set('accessToken', response.data.accessToken);
        Cookies.set('refreshToken', response.data.refreshToken);
        
        const tokenPayload = JSON.parse(atob(response.data.accessToken.split('.')[1]));
        
        set({ 
          isLoggedIn: true,
          userName: tokenPayload.userName || email.split('@')[0],
          userEmail: email,
          loading: false
        });

        displayToast('success', 'Welcome back!');
        return true;
      }
      throw new Error(response.data.message || 'Invalid OTP');
    } catch (error) {
      console.error('OTP Verification Error:', error.response?.data || error);
      set({ loading: false });
      
      displayToast('error', error.response?.data?.message || 'Invalid OTP');
      return false;
    }
  },

  logout: () => {
    // Close WebSocket connection
    if (ws) {
      ws.close();
      ws = null;
    }

    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    set({
      isLoggedIn: false,
      userName: '',
      userEmail: '',
      loading: false
    });
  },

  checkAuth: () => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      if (isTokenExpired(accessToken)) {
        // Token is expired, show popup and logout
        useAuthStore.getState().showSessionExpiredPopup();
        return;
      }
      
      try {
        const tokenPayload = JSON.parse(atob(accessToken.split('.')[1]));
        set({
          isLoggedIn: true,
          userName: tokenPayload.userName || tokenPayload.email?.split('@')[0],
          userEmail: tokenPayload.email
        });
      } catch (error) {
        console.error('Error decoding token:', error);
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
      }
    }
  },

  showSessionExpiredPopup: async () => {
    console.log('Attempting to show session expired popup');
    
    // Force show the toast with higher priority
    displayToast('error', 'Your session has expired. Please login again.', {
      position: "top-center",
      autoClose: false,  // Make it stay until user closes
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    // Small delay to ensure toast is shown
    await new Promise(resolve => setTimeout(resolve, 100));

    // Clear auth state
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    
    set({
      isLoggedIn: false,
      userName: '',
      userEmail: '',
      loading: false
    });

    // Force reload to login page after a small delay
    setTimeout(() => {
      window.location.href = '/login';
    }, 1000);
  },

  initializeTokenListener: () => {
    console.log('Initializing token listener');
    
    const checkToken = async () => {
      const token = Cookies.get('accessToken');
      const state = useAuthStore.getState();
      
      console.log('Token check:', {
        hasToken: !!token,
        isLoggedIn: state.isLoggedIn
      });

      // If logged in but no token, definitely show popup
      if (state.isLoggedIn && !token) {
        console.log('No token found but user is logged in, showing popup');
        useAuthStore.getState().showSessionExpiredPopup();
        return;
      }

      // If both token and logged in, check expiry
      if (state.isLoggedIn && token && isTokenExpired(token)) {
        console.log('Token is expired, showing popup');
        useAuthStore.getState().showSessionExpiredPopup();
      }
    };

    // Check more frequently - every 3 seconds
    const intervalCheck = setInterval(checkToken, 3000);

    // Initial check
    checkToken();

    return () => clearInterval(intervalCheck);
  }
}));

export default useAuthStore;
