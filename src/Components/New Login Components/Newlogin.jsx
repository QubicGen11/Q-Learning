import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEye, FiEyeOff, FiMail } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import Newnavbar from '../New Landingpage/New Navbar Components/Newnavbar';

const Newlogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [otpLogin, setOtpLogin] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.value && element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otpLogin) {
      setShowOtpModal(true);
    }
    // Handle regular login here
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
          <div className="w-full max-w-[440px]">
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
                onClick={handleSubmit}
                className="w-full bg-[#0056B3] text-white py-2.5 rounded-lg hover:bg-blue-700 font-medium"
              >
                {otpLogin ? 'Get OTP' : 'Login'}
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

        {/* OTP Modal */}
        {showOtpModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
              {/* Close button */}
              <button 
                onClick={() => setShowOtpModal(false)}
                className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>

              {/* Modal content */}
              <h2 className="text-xl font-medium mb-6">Enter OTP</h2>
              <div className="flex gap-2 justify-center mb-6">
                {otp.map((data, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={data}
                    onChange={(e) => handleOtpChange(e.target, index)}
                    onKeyUp={(e) => {
                      // Handle backspace
                      if (e.key === 'Backspace' && !e.target.value && e.target.previousSibling) {
                        e.target.previousSibling.focus();
                      }
                    }}
                    className="w-12 h-12 border-2 rounded text-center text-xl font-medium 
                             focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none
                             transition-all"
                  />
                ))}
              </div>
              <button 
                onClick={() => {
                  // Handle OTP verification here
                  console.log('OTP:', otp.join(''));
                }}
                className="w-full bg-[#0056B3] text-white py-2.5 rounded-lg hover:bg-blue-700 font-medium"
              >
                Login
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Newlogin;
