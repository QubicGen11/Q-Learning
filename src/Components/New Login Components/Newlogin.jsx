import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEye, FiEyeOff, FiMail } from 'react-icons/fi';

const Newlogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0056B3] items-center justify-center p-12">
        <img 
          src="https://res.cloudinary.com/devewerw3/image/upload/v1732785413/illustration_1_pxlnzy.png" 
          alt="Learning Illustration" 
          className="max-w-[600px] w-full object-contain"
        />
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-6 lg:px-16 py-12">
        <div className="w-full max-w-[440px] min-h-[600px] flex flex-col">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8 justify-center">
            <img 
              src="https://res.cloudinary.com/devewerw3/image/upload/v1732785466/logo_5_jqibzq.png" 
              alt="QubiNest Logo" 
              className="h-[44px]"
            />
          </div>

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
              className="flex-1 text-center text-[#6B7280] hover:text-gray-700 pb-4"
            >
              Register
            </Link>
          </div>

          {/* Login Form */}
          <form className="space-y-6 flex-1 flex flex-col">
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

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
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

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-600">Remember Me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700">
                Forget Password?
              </Link>
            </div>

            {/* Login Button */}
            <div className="mt-auto pt-6">
              <button
                type="submit"
                className="w-full bg-[#0056B3] text-white py-2.5 rounded-lg hover:bg-blue-700 font-medium"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Newlogin;
