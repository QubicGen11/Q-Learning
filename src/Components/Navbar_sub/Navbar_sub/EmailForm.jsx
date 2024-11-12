import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaLock, FaEnvelope } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';
import { OTPInput } from './OTPInput';

export const EmailForm = ({ isSignUp, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [signupStep, setSignupStep] = useState('form');
  const [loginMethod, setLoginMethod] = useState('choose');
  const [otpCode, setOtpCode] = useState('');
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [timer, setTimer] = useState(0);
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSendLoginOTP = async (e) => {
    e?.preventDefault();
    try {
      const response = await fetch('http://localhost:8089/qlms/sendOtp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email
        })
      });

      if (response.ok) {
        toast.success('OTP sent to your email!');
        setTimer(30);
        setShowOTPInput(true);
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to send OTP');
      }
    } catch (error) {
      console.error('API call failed:', error);
      toast.error('Failed to send OTP. Please try again.');
    }
  };

  const handleOTPLogin = async () => {
    try {
      const response = await fetch('http://localhost:8089/qlms/loginWithOtp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          otpCode: otpCode
        })
      });

      if (response.ok) {
        const data = await response.json();
        toast.success('Login successful!');
        
        if (data.accessToken && data.refreshToken) {
          Cookies.set('accessToken', data.accessToken, { 
            expires: 1,
            secure: true,
            sameSite: 'strict'
          });
          
          Cookies.set('refreshToken', data.refreshToken, { 
            expires: 7,
            secure: true,
            sameSite: 'strict'
          });
        }

        setTimeout(() => {
          onClose();
          window.location.reload();
        }, 1500);
      } else {
        const error = await response.json();
        toast.error(error.message || 'Invalid OTP');
      }
    } catch (error) {
      console.error('API call failed:', error);
      toast.error('Login failed. Please try again.');
    }
  };

  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8089/qlms/loginWithPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      if (response.ok) {
        const data = await response.json();
        toast.success('Login successful!');
        
        if (data.accessToken && data.refreshToken) {
          Cookies.set('accessToken', data.accessToken, { 
            expires: 1,
            secure: true,
            sameSite: 'strict'
          });
          
          Cookies.set('refreshToken', data.refreshToken, { 
            expires: 7,
            secure: true,
            sameSite: 'strict'
          });
        }

        setTimeout(() => {
          onClose();
          window.location.reload();
        }, 1500);
      } else {
        const error = await response.json();
        toast.error(error.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('API call failed:', error);
      toast.error('Login failed. Please try again.');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      // First step: Send email for registration
      const response = await fetch('http://localhost:8089/qlms/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email  // Only send email initially
        })
      });

      if (response.ok) {
        toast.success('Verification code sent to your email!');
        setSignupStep('verification');
        setResendTimer(30);
      } else {
        const error = await response.json();
        toast.error(error.message || 'Registration failed');
      }
    } catch (error) {
      console.error('API call failed:', error);
      toast.error('Registration failed. Please try again.');
    }
  };

  const handleResendVerificationCode = async () => {
    try {
      const response = await fetch('http://localhost:8089/qlms/sendOtp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email
        })
      });

      if (response.ok) {
        toast.success('New verification code sent!');
        setResendTimer(30);
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to send verification code');
      }
    } catch (error) {
      console.error('API call failed:', error);
      toast.error('Failed to send verification code. Please try again.');
    }
  };

  const handleVerification = async () => {
    try {
      // Complete registration with all details and verification code
      const response = await fetch('http://localhost:8089/qlms/verifyRegistration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          registrationCode: otpCode
        })
      });
  
      if (response.ok) {
        toast.success('Account created successfully! Please login to continue.');
        
        // Close the signup dialog after 2 seconds
        setTimeout(() => {
          onClose();
        }, 2000);
        
      } else {
        const error = await response.json();
        toast.error(error.message || 'Verification failed');
      }
    } catch (error) {
      console.error('API call failed:', error);
      toast.error('Verification failed. Please try again.');
    }
  };

  // Render login methods
  if (!isSignUp) {
    if (loginMethod === 'choose') {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-4"
        >
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Welcome Back!</h3>
            <p className="text-gray-600 dark:text-gray-400">Choose how you want to sign in</p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => setLoginMethod('password')}
              className="w-full py-3 px-4 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 
                         rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <FaLock className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              <span className="text-gray-700 dark:text-gray-300">Continue with Password</span>
            </button>

            <button
              onClick={() => setLoginMethod('otp')}
              className="w-full py-3 px-4 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 
                         rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <FaEnvelope className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              <span className="text-gray-700 dark:text-gray-300">Continue with OTP</span>
            </button>
          </div>
        </motion.div>
      );
    }

    // Password login form
    if (loginMethod === 'password') {
      return (
        <motion.form
          onSubmit={handlePasswordLogin}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-4"
        >
          <button
            type="button"
            onClick={() => setLoginMethod('choose')}
            className="mb-4 flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          >
            <FaArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                       dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                       dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Sign In
          </button>
        </motion.form>
      );
    }

    // OTP login form
    if (loginMethod === 'otp') {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-4"
        >
          <button
            type="button"
            onClick={() => setLoginMethod('choose')}
            className="mb-4 flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          >
            <FaArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>

          {!showOTPInput ? (
            <motion.form onSubmit={handleSendLoginOTP} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                           dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Send OTP
              </button>
            </motion.form>
          ) : (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">Enter OTP</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We've sent a code to<br />
                  <span className="font-medium">{formData.email}</span>
                </p>
              </div>

              <OTPInput
                value={otpCode}
                onChange={setOtpCode}
                length={6}
              />

              <div className="text-center text-sm">
                {timer > 0 ? (
                  <p className="text-gray-600 dark:text-gray-400">
                    Resend code in {timer}s
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={handleSendLoginOTP}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Resend Code
                  </button>
                )}
              </div>

              <button
                onClick={handleOTPLogin}
                disabled={otpCode.length !== 6}
                className={`w-full py-3 px-4 rounded-lg text-white
                  ${otpCode.length === 6 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-gray-400 cursor-not-allowed'}`}
              >
                Verify & Sign In
              </button>
            </div>
          )}
        </motion.div>
      );
    }
  }

  // Signup flow
  if (isSignUp) {
    if (signupStep === 'form') {
      return (
        <motion.form
          onSubmit={handleSignup}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                         dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                         dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                       dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                       dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                       dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Sign Up
          </button>
        </motion.form>
      );
    }

    // Verification step
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="space-y-6"
      >
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">Verify Your Email</h3>
          <p className="text-gray-600 dark:text-gray-400">
            We've sent a verification code to<br />
            <span className="font-medium">{formData.email}</span>
          </p>
        </div>

        <div className="space-y-4">
          <OTPInput
            value={otpCode}
            onChange={setOtpCode}
            length={6}
          />

          <div className="text-center text-sm">
            {resendTimer > 0 ? (
              <p className="text-gray-600 dark:text-gray-400">
                Resend code in {resendTimer}s
              </p>
            ) : (
              <button
                onClick={handleResendVerificationCode}
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Resend verification code
              </button>
            )}
          </div>

          <button
            onClick={handleVerification}
            disabled={otpCode.length !== 6}
            className={`w-full py-3 px-4 rounded-lg text-white transition-all duration-200
              ${otpCode.length === 6 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-gray-400 cursor-not-allowed'}
            `}
          >
            Complete Registration
          </button>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Didn't receive the code? Check your spam folder or{' '}
            <button
              onClick={() => setSignupStep('form')}
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              try a different email
            </button>
          </p>
        </div>
      </motion.div>
    );
  }

  return null;
};