import { create } from 'zustand';
import axios from 'axios';
import Swal from 'sweetalert2';

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
        
        Swal.fire({
          icon: 'success',
          title: 'Registration Initiated!',
          text: 'Please check your email for OTP',
          confirmButtonColor: '#0056B3',
          iconColor: '#0056B3'
        });
        return true;
      }
      throw new Error('Registration failed');
    } catch (error) {
      set({ loading: false });
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: error.response?.data?.message || 'Something went wrong',
        confirmButtonColor: '#0056B3'
      });
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

        Swal.fire({
          icon: 'success',
          title: 'Registration Successful!',
          text: 'You can now login to your account',
          confirmButtonColor: '#0056B3',
          iconColor: '#0056B3'
        });
        return true;
      }
      throw new Error('Verification failed');
    } catch (error) {
      set({ loading: false });
      Swal.fire({
        icon: 'error',
        title: 'Verification Failed',
        text: error.response?.data?.message || 'Invalid OTP',
        confirmButtonColor: '#0056B3'
      });
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
        
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'OTP resent successfully!',
          position: 'center',
          confirmButtonColor: '#0056B3',
          iconColor: '#0056B3',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong resending OTP',
        position: 'center',
      });
    }
  },

  closeOtpModal: () => set({ showOtpModal: false }),
}));

export default useRegisterStore;
