import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiUser, FiMail } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";

import Newnavbar from "../New Landingpage/New Navbar Components/Newnavbar";
import useRegisterStore from "../../stores/registerStore";


const NewRegister = () => {
  const {
    formData,
    otp,
    showOtpModal,
    loading,
    timer,
    canResend,
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

    // Allow both uppercase and lowercase letters
    if (!/^[a-zA-Z0-9]*$/.test(value)) return;

    updateOtp(index, value);

    // Focus next input
    if (value && element.nextSibling) {
      element.nextSibling.focus();
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
    await register();
  };

  const handleVerifyOtp = async () => {
    setIsVerifying(true);
    try {
      const success = await verifyRegistration();
      if (success) {
        navigate('/login');
      }
    } catch (error) {
      console.error('Verification error:', error);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Newnavbar />
      <div className="flex flex-1">
        {/* Left Side - Illustration */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-b from-[#0056B3] to-[#00254D] items-center justify-center p-12">
          <img
            src="https://res.cloudinary.com/devewerw3/image/upload/v1733812760/Frame_178_a8ta4s.png"
            alt="Learning Illustration"
            className="max-w-[500px] w-full object-contain"
          />
        </div>

        {/* Right Side - Register Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 lg:px-16 py-8 overflow-y-auto">
          <div className="w-full max-w-[350px]">
            {/* Login/Register Tabs */}
            <div className="flex w-full border-b border-gray-200 mb-6">
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
            </div>

            {/* Register Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* First Name Field */}
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

              {/* Last Name Field */}
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

              {/* Email Field */}
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

              {/* Password Field */}
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

              {/* Confirm Password Field */}
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

              {/* Register Button - Fixed at bottom */}
              <div className="mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#0056B3] text-white py-2.5 rounded-lg hover:bg-blue-700 font-medium disabled:opacity-70 transition-colors"
                >
                  {loading ? "Registering..." : "Register"}
                </button>
              </div>

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
              </div>
            </form>
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
                    if (
                      e.key === "Backspace" &&
                      !e.target.value &&
                      e.target.previousSibling
                    ) {
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
              onClick={handleVerifyOtp}
              disabled={isVerifying}
              className="w-full bg-[#0056B3] text-white py-2.5 rounded-lg hover:bg-blue-700 font-medium disabled:opacity-70"
            >
              {isVerifying ? "Verifying..." : "Verify OTP"}
            </button>
            <button
              onClick={handleResendOtp}
              disabled={!canResend || isVerifying}
              className={`mt-4 text-sm ${
                canResend ? "text-blue-500 hover:underline" : "text-gray-400"
              } disabled:opacity-70 w-full text-center`}
            >
              {canResend ? "Resend OTP" : "Wait to resend OTP"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewRegister;
