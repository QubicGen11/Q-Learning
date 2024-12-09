import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEye, FiEyeOff, FiMail } from 'react-icons/fi';
import Newnavbar from '../New Landingpage/New Navbar Components/Newnavbar';

const Newlogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [otpLogin, setOtpLogin] = useState(false);

  return (
    <>
      <Newnavbar />

      <div className="flex h-screen">
        {/* Left Side - Gradient Background */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-b from-[#0056B3] to-[#00254D] items-center justify-center p-12">
          <img
            src="https://res.cloudinary.com/devewerw3/image/upload/v1732785413/illustration_1_pxlnzy.png"
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
              <div className="flex items-center space-x-4">
                <div
                  className={`w-10 h-5 flex items-center rounded-full p-1 cursor-pointer ${
                    otpLogin ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                  onClick={() => setOtpLogin(!otpLogin)}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                      otpLogin ? 'translate-x-5' : ''
                    }`}
                  ></div>
                </div>
                <label className="flex items-center text-sm text-gray-700">
                  Login With OTP
                </label>
              </div>

              {/* Conditional Input Fields */}
              {otpLogin ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    OTP
                  </label>
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                </div>
              ) : (
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

              {/* Forgot Password */}
              <div className="text-left">
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Forget Password?
                </Link>
              </div>

              {/* Login Button */}
              <button
                type="submit"
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
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                    alt="Google"
                    className="w-5 h-5"
                  />
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
    </>
  );
};

export default Newlogin;
