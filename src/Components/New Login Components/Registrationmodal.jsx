import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiUser, FiMail } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from 'framer-motion';

import Newnavbar from "../New Landingpage/New Navbar Components/Newnavbar";
import useRegisterStore from "../../stores/registerStore";


const Registrationmodal = () => {
  const {
    formData,
    otp,
    showOtpModal,
    loading,
    timer,
    canResend,
    isResending,
    updateForm,
    updateOtp,
    register,
    handleResendOtp,
    verifyRegistration
  } = useRegisterStore();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "firstName":
        error = !value.trim() ? "First name is required" : "";
        break;
      case "lastName":
        error = !value.trim() ? "Last name is required" : "";
        break;
      case "email":
        error = !value.trim()
          ? "Email is required"
          : !validateEmail(value)
          ? "Please enter a valid email"
          : "";
        break;
      case "password":
        error = !value
          ? "Password is required"
          : !validatePassword(value)
          ? "Password must be at least 8 characters with 1 uppercase, 1 lowercase, 1 number and 1 special character"
          : "";
        break;
      case "confirmPassword":
        error = !value
          ? "Please confirm password"
          : value !== formData.password
          ? "Passwords do not match"
          : "";
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateForm(name, value);

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));

    if (name === "password") {
      const confirmError = validateField(
        "confirmPassword",
        formData.confirmPassword
      );
      setErrors((prev) => ({ ...prev, confirmPassword: confirmError }));
    }
  };

  const handleOtpChange = (element, index) => {
    let value = element.value;
    
    // Allow both uppercase and lowercase letters and numbers
    if (!/^[a-zA-Z0-9]*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    updateOtp(newOtp);

    // Focus next input
    if (value && element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      
      const newOtp = [...otp];
      newOtp[index] = '';
      updateOtp(newOtp);

      // Focus previous input
      if (index > 0) {
        const prevInput = e.target.previousSibling;
        if (prevInput) {
          prevInput.focus();
        }
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, 6);
    const newOtp = [...otp];

    for (let i = 0; i < pasteData.length; i++) {
      newOtp[i] = pasteData[i];
    }

    updateOtp(newOtp);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields first
    const newErrors = {
      firstName: validateField('firstName', formData.firstName),
      lastName: validateField('lastName', formData.lastName),
      email: validateField('email', formData.email),
      password: validateField('password', formData.password),
      confirmPassword: validateField('confirmPassword', formData.confirmPassword)
    };

    // Update error state
    setErrors(newErrors);

    // Check if there are any errors
    const hasErrors = Object.values(newErrors).some(error => error !== '');
    
    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setErrors(prev => ({
        ...prev,
        confirmPassword: 'Passwords do not match'
      }));
      return;
    }

    // Only proceed if there are no errors
    if (!hasErrors) {
      await register();
    } else {
      toast.error('Please fix all errors before submitting');
    }
  };

  const handleVerifyOtp = async () => {
    setIsVerifying(true);
    try {
      const success = await verifyRegistration();
      if (success) {
        navigate('/loginmodal');
      }
    } catch (error) {
      console.error('Verification error:', error);
    } finally {
      setIsVerifying(false);
    }
  };

  const isFormValid = () => {
    // Check if all required fields are filled
    const requiredFields = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword
    };

    // Check if any field is empty
    const hasEmptyFields = Object.values(requiredFields).some(field => !field);
    if (hasEmptyFields) return false;

    // Check if there are any validation errors
    const hasErrors = Object.values(errors).some(error => error !== '');
    if (hasErrors) return false;

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) return false;

    // Check email format
    if (!validateEmail(formData.email)) return false;

    // Check password strength
    if (!validatePassword(formData.password)) return false;

    return true;
  };

  return (
    <div className=" ">
      {/* <Newnavbar /> */}
      <div className="flex ">
        {/* Left Side - Only adding animation */}
      

        {/* Right Side - Only adding animation */}
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
            {/* Login/Register Tabs */}
            {/* <div className="flex w-full border-b border-gray-200 mb-6">
              <Link
                to="/login"
                className="flex-1 text-center text-[#6B7280] hover:text-gray-700 py-2"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="flex-1 text-center text-[#0056B3] font-medium relative py-2 after:content-[''] after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-[2px] after:bg-[#0056B3]"
              >
                Register
              </Link>
            </div> */}

            {/* Register Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* First Name - Only adding animation */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Enter your first name"
                      className="w-full pr-10 pl-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                    <FiUser
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                  </div>
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-0.5">
                      {errors.firstName}
                    </p>
                  )}
                </div>
              </motion.div>

              {/* Last Name - Only adding animation */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Enter your last name"
                      className="w-full pr-10 pl-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                    <FiUser
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                  </div>
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-0.5">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </motion.div>

              {/* Email - Only adding animation */}
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
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="w-full pr-10 pl-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                    <FiMail
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-0.5">{errors.email}</p>
                  )}
                </div>
              </motion.div>

              {/* Password - Only adding animation */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Set Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="w-full pl-4 pr-12 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                    <div className="absolute right-3 top-[50%] -translate-y-[50%] w-[20px] h-[20px] flex items-center justify-center pointer-events-none">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-400 hover:text-gray-600 w-full h-full flex items-center justify-center pointer-events-auto"
                      >
                        {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                      </button>
                    </div>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-0.5">{errors.password}</p>
                  )}
                </div>
              </motion.div>

              {/* Confirm Password - Only adding animation */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.4 }}
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      className="w-full pl-4 pr-12 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                    <div className="absolute right-3 top-[50%] -translate-y-[50%] w-[20px] h-[20px] flex items-center justify-center pointer-events-none">
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="text-gray-400 hover:text-gray-600 w-full h-full flex items-center justify-center pointer-events-auto"
                      >
                        {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                      </button>
                    </div>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-0.5">{errors.confirmPassword}</p>
                  )}
                </div>
              </motion.div>

              {/* Register Button - Fixed at bottom */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="mt-6"
              >
                <button
                  type="submit"
                  disabled={loading || !isFormValid()}
                  className={`w-full py-2.5 rounded-lg font-medium transition-colors ${
                    loading || !isFormValid()
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-[#0056B3] hover:bg-blue-700 text-white'
                  }`}
                >
                  {loading ? "Registering..." : "Register"}
                </button>
              </motion.div>

              {/* Divider */}
              <div className="flex items-center my-6">
                {/* <hr className="flex-1 border-gray-300" /> */}
                {/* <span className="px-4 text-sm text-gray-400">OR</span>
                <hr className="flex-1 border-gray-300" /> */}
              </div>

              {/* Social Login */}
              {/* <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <p className="text-sm text-center text-gray-600 mb-4">
                  GET STARTED USING
                </p>
                <div className="flex justify-center gap-4">
                  <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
                    <FcGoogle size={20} />
                  </button>
                  <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
                      alt="LinkedIn"
                      className="w-5 h-5"
                    />
                  </button>
                </div>
              </motion.div> */}
            </form>
          </motion.div>
        </motion.div>
      </div>

      {/* OTP Modal */}
      {showOtpModal && (
        <AnimatePresence>
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
                whileTap={{ scale: 0.8 }}
                onClick={() => {
                  useRegisterStore.getState().closeOtpModal();
                }}
                className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
              >
                ✕
              </motion.button>
              <motion.h2 
                initial={{ x: -50, opacity: 0 }}
                animate={{ 
                  x: 0, 
                  opacity: 1,
                  transition: {
                    type: "spring",
                    damping: 10,
                    stiffness: 100
                  }
                }}
                className="text-xl font-medium mb-6"
              >
                Enter OTP
              </motion.h2>
              <div 
  className="flex gap-2 justify-center mb-6"
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      handleVerifyOtp();
    }
  }}
>
  {otp.map((data, index) => (
    <motion.input
      key={index}
      type="text"
      maxLength="1"
      value={data}
      onChange={(e) => handleOtpChange(e.target, index)}
      onKeyDown={(e) => handleKeyDown(e, index)}
      onPaste={handlePaste}
      className="w-12 h-12 border-2 rounded text-center text-xl font-medium
                 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none
                 transition-all"
      autoFocus={index === 0}
    />
  ))}
</div>

              {timer > 0 && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    transition: {
                      type: "spring",
                      damping: 10
                    }
                  }}
                  className="text-center text-sm text-gray-600 mb-4"
                >
                  <motion.span
              
                    className="inline-block"
                  >
                    Time remaining: {timer} seconds
                  </motion.span>
                </motion.div>
              )}
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 5px 15px rgba(0, 86, 179, 0.3)"
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
                onClick={handleVerifyOtp}
                disabled={isVerifying}
                className="w-full bg-[#0056B3] text-white py-2.5 rounded-lg hover:bg-blue-700 font-medium 
                         disabled:opacity-70 transform"
              >
                {isVerifying ? (
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
                disabled={!canResend || isVerifying || isResending}
                className={`mt-4 text-sm ${
                  canResend ? "text-blue-500 hover:underline" : "text-gray-400"
                } disabled:opacity-70 w-full text-center transform flex items-center justify-center gap-2`}
              >
                {isResending ? (
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
                  canResend ? "Resend OTP" : "Wait to resend OTP"
                )}
              </motion.button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}

      
    </div>
  );
};

export default  Registrationmodal;
