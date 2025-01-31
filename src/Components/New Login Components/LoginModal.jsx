import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff, FiMail } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import Newnavbar from '../New Landingpage/New Navbar Components/Newnavbar';

import Swal from 'sweetalert2';

import useAuthStore from '../../stores/authStore';
import { motion, AnimatePresence } from 'framer-motion';
import useWishlistStore from '../../stores/wishlistStore';

const LoginModal = () => {
  const { login, sendOtp, verifyOtp, loading } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [otpLogin, setOtpLogin] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
 
  const { syncLocalWishlist } = useWishlistStore();

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
    if (!email) {
      Swal.fire({
        icon: 'error',
        title: 'Email Required',
        text: 'Please enter your email address',
        confirmButtonColor: '#0056B3'
      });
      return;
    }

    console.log('Sending OTP to:', email);
    const success = await sendOtp(email);
    console.log('Send OTP result:', success); // Debug log
    
    if (success) {
      console.log('Setting showOtpModal to true');
      setShowOtpModal(true);
      setTimer(30);
      setCanResend(false);
      setOtp(new Array(6).fill(""));
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (otpLogin && showOtpModal) {
      const otpString = otp.join('');
      console.log('Attempting OTP verification with:', {
        email,
        otpCode: otpString
      });
      
      const success = await verifyOtp(email, otp);
      if (success) {
        setShowOtpModal(false);
        // navigate('/afterlogin');
      }
    } else if (!otpLogin) {
      const success = await login(email, password);
      if (success) {
        // navigate('/afterlogin');
        syncLocalWishlist();
       setTimeout(() => {
        window.location.reload();
       }, 1000);
      }
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
    const success = await sendOtp(email);
    if (success) {
      setTimer(30);
      setCanResend(false);
      setOtp(new Array(6).fill(""));
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

  useEffect(() => {
    console.log('OTP Modal State:', showOtpModal);
  }, [showOtpModal]);

  return (
    <div className="">
    
      <div className="flex ">
        {/* Left Side - Animated Gradient Background */}
      

        {/* Right Side - Animated Login Form */}
        <motion.div 
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full flex justify-center items-center"
        >
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-full max-w-[350px]"
          >
            {/* Animated Login/Register Tabs */}
            {/* <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex w-full border-b border-gray-200 mb-8"
            >
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
            </motion.div> */}

            {/* Animated Form Fields */}
            <motion.form 
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {/* Email Field with Animation */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
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
              </motion.div>

              {/* Animated OTP Toggle */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="flex items-center space-x-2"
              >
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
              </motion.div>

              {/* Animated Password/Remember Me Section */}
              <AnimatePresence mode="wait">
                {otpLogin ? (
                  <motion.div
                    key="remember-me"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center"
                  >
                    <input
                      type="checkbox"
                      id="remember"
                      className="w-4 h-4 border-gray-300 rounded"
                    />
                    <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                      Remember Me
                    </label>
                  </motion.div>
                ) : (
                  <motion.div
                    key="password"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
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
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Animated Login Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
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
              </motion.button>
            </motion.form>

            {/* Animated Divider */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="flex items-center my-6"
            >
              {/* <hr className="flex-1 border-gray-300" /> */}
              {/* <span className="px-4 text-sm text-gray-400">OR</span>
              <hr className="flex-1 border-gray-300" /> */}
            </motion.div>

            {/* Animated Social Login */}
            {/* <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
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
            </motion.div> */}


            
          </motion.div>
        </motion.div>
      </div>

      {/* Animated OTP Modal */}
      <AnimatePresence>
        {showOtpModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div 
              initial={{ y: -100, opacity: 0, rotateX: 90 }}
              animate={{ 
                y: 0, 
                opacity: 1,
                rotateX: 0,
                transition: {
                  type: "spring",
                  damping: 15,
                  stiffness: 100,
                  duration: 0.7
                }
              }}
              exit={{ 
                y: 100,
                opacity: 0,
                rotateX: -90,
                transition: {
                  duration: 0.3
                }
              }}
              className="bg-white p-8 rounded-lg shadow-lg w-96 relative backdrop-blur-lg"
            >
              <motion.button
                whileHover={{ 
                  scale: 1.2, 
                  rotate: 180,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowOtpModal(false)}
                className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
              >
                ✕
              </motion.button>

              <motion.h2 
                initial={{ y: -20, opacity: 0 }}
                animate={{ 
                  y: 0, 
                  opacity: 1,
                  transition: { delay: 0.1, duration: 0.5 }
                }}
                className="text-xl font-medium mb-6"
              >
                Enter OTP
              </motion.h2>

              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ 
                  y: 0, 
                  opacity: 1,
                  transition: { delay: 0.2, duration: 0.5 }
                }}
                className="flex gap-2 justify-center mb-6"
              >
                {otp.map((data, index) => (
                  <motion.input
                    key={index}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: 1, 
                      opacity: 1,
                      transition: { delay: 0.3 + index * 0.1 }
                    }}
                    whileFocus={{ scale: 1.1 }}
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
                    autoFocus={index === 0}
                  />
                ))}
              </motion.div>

              {timer > 0 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-sm text-gray-600 mb-4"
                >
                  Time remaining: {timer} seconds
                </motion.div>
              )}

              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  transition: {
                    type: "spring",
                    damping: 12,
                    stiffness: 100
                  }
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ y: 50, opacity: 0 }}
                animate={{ 
                  y: 0, 
                  opacity: 1,
                  transition: {
                    type: "spring",
                    damping: 12,
                    stiffness: 100,
                    delay: 0.5
                  }
                }}
                onClick={(e) => {
                  e.preventDefault();
                  handleLogin(e);
                }}
                disabled={loading || otp.some(digit => digit === "")}
                className="w-full bg-[#0056B3] text-white py-2.5 rounded-lg hover:bg-blue-700 font-medium 
                         disabled:opacity-70 transform"
              >
                {loading ? (
                  <motion.span
                    animate={{
                      rotate: 360
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="inline-block"
                  >
                    ⟳
                  </motion.span>
                ) : "Verify OTP"}
              </motion.button>

              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  color: canResend ? "#0056B3" : undefined
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ y: 50, opacity: 0 }}
                animate={{ 
                  y: 0, 
                  opacity: 1,
                  transition: {
                    type: "spring",
                    damping: 12,
                    stiffness: 100,
                    delay: 0.6
                  }
                }}
                onClick={handleResendOtp}
                disabled={!canResend || loading}
                className={`mt-4 text-sm ${
                  canResend ? "text-blue-500 hover:underline" : "text-gray-400"
                } disabled:opacity-70 w-full text-center transform flex items-center justify-center gap-2`}
              >
                {loading ? (
                  <>
                    <motion.span
                      animate={{
                        rotate: 360
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      className="inline-block"
                    >
                      ⟳
                    </motion.span>
                    <span>Resending...</span>
                  </>
                ) : (
                  canResend ? "Resend OTP" : ``
                )}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoginModal;