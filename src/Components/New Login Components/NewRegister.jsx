import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEye, FiEyeOff, FiUser, FiMail } from 'react-icons/fi';
import { FcGoogle } from "react-icons/fc";

import Newnavbar from '../New Landingpage/New Navbar Components/Newnavbar';

const NewRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [isRegistering, setIsRegistering] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    registrationCode: '30IR9d',
    otpCode: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOtpChange = (element, index) => {
    const value = element.value.toUpperCase(); // Convert to uppercase

    if (!/^[A-Z0-9]*$/.test(value)) return; // Allow only alphanumeric

    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    // Focus next input
    if (value && element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').toUpperCase().slice(0, 6);
    const newOtp = [...otp];

    for (let i = 0; i < pasteData.length; i++) {
      newOtp[i] = pasteData[i];
    }

    setOtp(newOtp);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsRegistering(true);
    try {
      const response = await fetch('http://localhost:8089/qlms/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowOtpModal(true);
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsRegistering(false);
    }
  };

  const handleVerifyOtp = async () => {
    setIsVerifying(true);
    try {
      const verificationResponse = await fetch('http://localhost:8089/qlms/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, otpCode: otp.join('') }),
      });

      if (verificationResponse.ok) {
        setShowOtpModal(false);
      } else {
        console.error('OTP verification failed');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOtp = () => {
    // Implement resend OTP logic here
    console.log('Resend OTP');
  };

  return (
    <>
      <Newnavbar />
      <div className="flex h-screen overflow-hidden">
        {/* Left Side - Illustration */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-b from-[#0056B3] to-[#00254D] items-center justify-center p-12">
          <img
            src="https://res.cloudinary.com/devewerw3/image/upload/v1733812760/Frame_178_a8ta4s.png"
            alt="Learning Illustration"
            className="max-w-[500px] w-full object-contain"
          />
        </div>

        {/* Right Side - Register Form */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-6 lg:px-16 py-12">
          <div className="w-full max-w-[440px] min-h-[600px] flex flex-col">
            {/* Login/Register Tabs */}
            <div className="flex w-full border-b border-gray-200 mb-8">
              <Link
                to="/login"
                className="flex-1 text-center text-[#6B7280] hover:text-gray-700 pb-4"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="flex-1 text-center text-[#0056B3] font-medium relative pb-4 after:content-[''] after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-[2px] after:bg-[#0056B3]"
              >
                Register
              </Link>
            </div>

            {/* Register Form */}
            <form className="space-y-6 flex-1 flex flex-col" onSubmit={handleRegister}>
              {/* First Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Enter First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                  <FiUser className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                </div>
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
                    placeholder="Enter Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                  <FiUser className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                </div>
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
                    placeholder="Enter Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <FiMail size={20} />
                  </span>
                </div>
              </div>

              {/* Set Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Set Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={handleChange}
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

              {/* Confirm Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                  <span
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600"
                  >
                    {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                  </span>
                </div>
              </div>

              {/* Register Button */}
              <div className="mt-auto pt-6">
                <button
                  type="submit"
                  disabled={isRegistering}
                  className="w-full bg-[#0056B3] text-white py-2.5 rounded-lg hover:bg-blue-700 font-medium disabled:opacity-70"
                >
                  {isRegistering ? 'Registering...' : 'Register'}
                </button>
              </div>
            </form>

            {/* Add Divider */}
            <div className="flex items-center my-6">
              <hr className="flex-1 border-gray-300" />
              <span className="px-4 text-sm text-gray-400">OR</span>
              <hr className="flex-1 border-gray-300" />
            </div>

            {/* Add Social Login */}
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
                    if (e.key === 'Backspace' && !e.target.value && e.target.previousSibling) {
                      e.target.previousSibling.focus();
                    }
                  }}
                  className="w-12 h-12 border-2 rounded text-center text-xl font-medium uppercase
                           focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none
                           transition-all"
                />
              ))}
            </div>
            <button
              onClick={handleVerifyOtp}
              disabled={isVerifying}
              className="w-full bg-[#0056B3] text-white py-2.5 rounded-lg hover:bg-blue-700 font-medium disabled:opacity-70"
            >
              {isVerifying ? 'Verifying...' : 'Verify OTP'}
            </button>
            <button
              onClick={handleResendOtp}
              disabled={isVerifying}
              className="mt-4 text-sm text-blue-500 hover:underline disabled:opacity-70 w-full text-center"
            >
              Resend OTP
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default NewRegister; 