import { create } from 'zustand';
import axios from 'axios';
import { displayToast } from '../Components/Common/Toast/Toast';

const useRegisterStore = create((set, get) => ({
  formData: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
  otp: new Array(6).fill(''),
  showOtpModal: false,
  loading: false,
  timer: 30,
  canResend: false,
  isResending: false,

  decrementTimer: () => {
    const { timer } = get();
    if (timer > 0) {
      set((state) => ({ 
        timer: state.timer - 1,
        canResend: state.timer <= 1
      }));
    }
  },

  startTimer: () => {
    set({ timer: 30, canResend: false });
    const interval = setInterval(() => {
      const { timer } = get();
      if (timer <= 0) {
        clearInterval(interval);
        set({ canResend: true });
      } else {
        get().decrementTimer();
      }
    }, 1000);
  },

  updateForm: (name, value) => {
    set((state) => ({
      formData: {
        ...state.formData,
        [name]: value,
      },
    }));
  },

  updateOtp: (index, value) => {
    set((state) => {
      const newOtp = [...state.otp];
      if (typeof index === 'number') {
        newOtp[index] = value;
      } else if (Array.isArray(index)) {
        return { otp: index };
      }
      return { otp: newOtp };
    });
  },

  register: async () => {
    const state = get();
    set({ loading: true });

    try {
      const response = await axios.post('http://localhost:8089/qlms/register', {
        firstName: state.formData.firstName,
        lastName: state.formData.lastName,
        email: state.formData.email,
        password: state.formData.password,
      });

      if (response.status === 200) {
        set({ 
          showOtpModal: true,
          loading: false 
        });
        
        get().startTimer();
        displayToast('success', 'Please check your email for OTP', 'Registration Initiated');
        return true;
      }
      throw new Error('Registration failed');
    } catch (error) {
      set({ loading: false });
      
      // Check if error is for existing registered user
      if (error.response?.data?.error === "User with this email already exists and is already registered.") {
        displayToast('info', 'This email is already registered. Please login.');
        setTimeout(() => {
          // window.location.href = '/login';
        }, 2000);
      } 
      // Check if error is for existing unregistered user
      else if (error.response?.data?.error === "User with this email already exists.") {
        displayToast('info', 'You have already started registration. Please complete OTP verification.');
        set({ showOtpModal: true });
        get().startTimer();
      }
      else {
        // Handle other errors
        displayToast('error', error.response?.data?.message || 'Something went wrong');
      }
      return false;
    }
  },

  verifyRegistration: async () => {
    const state = get();
    set({ loading: true });

    try {
      const response = await axios.post('http://localhost:8089/qlms/verifyRegistration', {
        firstName: state.formData.firstName,
        lastName: state.formData.lastName,
        email: state.formData.email,
        password: state.formData.password,
        registrationCode: state.otp.join('')
      });

      if (response.status === 200) {
        set({ 
          showOtpModal: false,
          loading: false,
          formData: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
          },
          otp: new Array(6).fill('')
        });

        displayToast('success', 'You can now login to your account', 'Registration Successful!');
        return true;
        // return true;
      }
      throw new Error('Verification failed');
    } catch (error) {
      set({ loading: false });
      displayToast('error', error.response?.data?.message || 'Invalid OTP', 'Verification Failed');
      return false;
    }
  },

  resetForm: () => {
    set({
      formData: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      otp: new Array(6).fill(''),
      showOtpModal: false,
      loading: false,
      timer: 30,
      canResend: false,
    });
  },

  handleResendOtp: async () => {
    const state = get();
    if (!state.canResend) return;

    set({ isResending: true });

    try {
      const response = await axios.post('http://localhost:8089/qlms/register', {
        firstName: state.formData.firstName,
        lastName: state.formData.lastName,
        email: state.formData.email,
        password: state.formData.password,
      });

      if (response.status === 200) {
        get().startTimer();
        set({ otp: new Array(6).fill('') });
        
        displayToast('success', 'OTP resent successfully!');
      }
    } catch (error) {
      displayToast('error', 'Something went wrong resending OTP');
    } finally {
      set({ isResending: false });
    }
  },

  closeOtpModal: () => set({ showOtpModal: false }),
}));

export default useRegisterStore;
