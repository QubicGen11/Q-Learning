import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiEye, FiEyeOff, FiMail } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import Newnavbar from '../New Landingpage/New Navbar Components/Newnavbar';
import axios from 'axios';
import Swal from 'sweetalert2';

const Newlogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [otpLogin, setOtpLogin] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.value && element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post('http://localhost:8089/qlms/sendOtp', {
        email: email
      });
      
      console.log('OTP Response:', response);
      
      if (response.status === 200) {
        setShowOtpModal(true);
        setTimer(30);
        setCanResend(false);
        setOtp(new Array(6).fill(""));
        
        Swal.fire({
          icon: 'success',
          title: 'OTP Sent!',
          text: 'Please check your email for the OTP',
          confirmButtonColor: '#0056B3',
            iconColor: '#0056B3'
        });
        
        console.log('ShowOtpModal state after setting:', true);
      }
    } catch (error) {
      console.error('OTP Error:', error);
      
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Failed to send OTP'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      let response;
      if (otpLogin) {
        response = await axios.post('http://localhost:8089/qlms/loginWithOtp', {
          email: email,
          otpCode: otp.join('')
        });
        
        console.log('Login Response:', response);
        
        if (response.status === 200) {
          setShowOtpModal(false);
          Swal.fire({
            icon: 'success',
            title: 'Login Successful!',
            text: 'Welcome back!',
            confirmButtonColor: '#0056B3',
            iconColor: '#0056B3'
          }).then(() => {
            clearStates();
            // Add navigation logic here
            // For example: navigate('/dashboard');
          });
        }
      } else {
        response = await axios.post('http://localhost:8089/qlms/loginWithPassword', {
          email: email,
          password: password
        });
        
        if (response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Login Successful!',
            text: 'Welcome back!',
            confirmButtonColor: '#0056B3'
          }).then(() => {
            clearStates();
            // Add navigation logic here
            // For example: navigate('/dashboard');
          });
        }
      }
    } catch (error) {
      console.error('Login Error:', error);
      
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.response?.data?.message || 'Invalid credentials',
        confirmButtonColor: '#0056B3'
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').slice(0, 6);
    const newOtp = [...otp];
    
    for (let i = 0; i < pasteData.length; i++) {
      newOtp[i] = pasteData[i];
    }
    
    setOtp(newOtp);
  };

  const handleResendOtp = async () => {
    if (!canResend) return;
    
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8089/qlms/sendOtp', {
        email: email
      });
      
      if (response.data.success) {
        setTimer(30);
        setCanResend(false);
        setOtp(new Array(6).fill(""));
        Swal.fire({
          icon: 'success',
          title: 'OTP Resent!',
          text: 'Please check your email for the new OTP'
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Failed to resend OTP'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let interval;
    if (showOtpModal && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showOtpModal, timer]);

  useEffect(() => {
    console.log('ShowOtpModal state changed:', showOtpModal);
  }, [showOtpModal]);

  const clearStates = () => {
    setEmail('');
    setPassword('');
    setOtp(new Array(6).fill(""));
    setShowOtpModal(false);
    setOtpLogin(false);
    setShowPassword(false);
    setLoading(false);
    setTimer(30);
    setCanResend(false);
  };

  return (
    <>
      <Newnavbar />

      <div className="flex h-screen overflow-hidden">
        {/* Left Side - Gradient Background */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-b from-[#0056B3] to-[#00254D] items-center justify-center p-12">
          <img
            src="https://res.cloudinary.com/devewerw3/image/upload/v1733812189/Frame_176_rkq6me.png"
            alt="Learning Illustration"
            className="max-w-[600px] w-full object-contain"
          />
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-6 lg:px-16 py-12 bg-white">
          <div className="w-full max-w-[350px]">
            {/* Login/Register Tabs */}
            <div className="flex w-full border-b border-gray-200 mb-8">
              <Link
                to="/login"
                className="flex-1 text-center text-[#0056B3] font-medium relative pb-4 after:content-[''] after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-[2px] after:bg-[#0056B3]"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="flex-1 text-center text-gray-400 hover:text-gray-700 pb-4"
              >
                Register
              </Link>
            </div>

            {/* Login Form */}
            <form className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Email Address"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <FiMail size={20} />
                  </span>
                </div>
              </div>

              {/* Login with OTP Toggle */}
              <div className="flex items-center space-x-2">
                <div
                  className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${
                    otpLogin ? 'bg-[#0056B3]' : 'bg-gray-300'
                  }`}
                  onClick={() => setOtpLogin(!otpLogin)}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                      otpLogin ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  ></div>
                </div>
                <label className="text-sm text-gray-600">Login With OTP</label>
              </div>

              {/* Conditional rendering based on OTP login */}
              {otpLogin ? (
                /* Remember Me Checkbox for OTP login */
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="w-4 h-4 border-gray-300 rounded"
                  />
                  <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                    Remember Me
                  </label>
                </div>
              ) : (
                /* Password field for regular login */
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter Password"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600"
                    >
                      {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                    </span>
                  </div>
                </div>
              )}

              {/* Login/Get OTP Button */}
              <button
                type="submit"
                onClick={otpLogin ? handleSendOtp : handleLogin}
                disabled={loading}
                className="w-full bg-[#0056B3] text-white py-2.5 rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing...
                  </span>
                ) : otpLogin ? 'Get OTP' : 'Login'}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-6">
              <hr className="flex-1 border-gray-300" />
              <span className="px-4 text-sm text-gray-400">OR</span>
              <hr className="flex-1 border-gray-300" />
            </div>

            {/* Social Login */}
            <div>
              <p className="text-sm text-center text-gray-600 mb-4">
                GET STARTED USING
              </p>
              <div className="flex justify-center gap-4">
                <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-100">
                  <FcGoogle size={20} />
                </button>
                <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-100">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
                    alt="LinkedIn"
                    className="w-5 h-5"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
            <button
              onClick={() => setShowOtpModal(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h2 className="text-xl font-medium mb-6">Enter OTP</h2>
            <div className="flex gap-2 justify-center mb-6">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={data}
                  onChange={(e) => handleOtpChange(e.target, index)}
                  onPaste={handlePaste}
                  onKeyUp={(e) => {
                    if (e.key === "Backspace" && !e.target.value && e.target.previousSibling) {
                      e.target.previousSibling.focus();
                    }
                  }}
                  className="w-12 h-12 border-2 rounded text-center text-xl font-medium
                           focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none
                           transition-all"
                />
              ))}
            </div>
            {timer > 0 && (
              <div className="text-center text-sm text-gray-600 mb-4">
                Time remaining: {timer} seconds
              </div>
            )}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-[#0056B3] text-white py-2.5 rounded-lg hover:bg-blue-700 font-medium disabled:opacity-70"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
            <button
              onClick={handleResendOtp}
              disabled={!canResend || loading}
              className={`mt-4 text-sm ${
                canResend ? "text-blue-500 hover:underline" : "text-gray-400"
              } disabled:opacity-70 w-full text-center`}
            >
              {canResend ? "Resend OTP" : "Wait to resend OTP"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Newlogin;