import React, { useState } from 'react';
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";

const SuperadminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginWithOTP, setLoginWithOTP] = useState(false);

  return (
    <div className="min-h-screen bg-[url('https://res.cloudinary.com/defsu5bfc/image/upload/v1737006056/Super_Admin_Login_1_lqxdzs.png')] bg-cover bg-center bg-no-repeat flex flex-col items-center">
      {/* Logo */}
      <div className="mt-[100px] mb-[30px]">
        <img src="https://res.cloudinary.com/defsu5bfc/image/upload/v1737007732/Logo_lta0fl.png" alt="QubiNest" className="h-[44px] w-[188px]" />
      </div>

      {/* Login Card */}
      <div className="bg-white rounded p-6 w-[814px] h-[500px] shadow-lg flex flex-col items-center justify-center">
        {/* Email */}
        <div className="mb-4">
          <div className="text-sm mb-1">Email</div>
          <div className="relative">
            <input
              type="email"
              placeholder="Enter Email Address"
              className="w-[476px] h-[48px] px-3 py-2 border border-gray-200 rounded"
            />
            <MdOutlineEmail className="absolute right-3 top-1/2 -translate-y-1/2 text-black h-5 w-5" />
          </div>
        </div>

        {/* Login with OTP Toggle and Remember Me aligned to start */}
        <div className="w-[476px] mb-4 flex flex-col items-start">
          <label className="relative inline-flex items-center cursor-pointer mb-2">
            <input 
              type="checkbox"
              className="sr-only peer"
              checked={loginWithOTP}
              onChange={() => setLoginWithOTP(!loginWithOTP)}
            />
            <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0056B3]"></div>
            <span className="ms-3 text-sm text-gray-600">Login With OTP</span>
          </label>

         
        </div>

        {/* Password */}
        <div className="mb-4">
          <div className="text-sm mb-1">Password</div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              className="px-3 py-2 w-[476px] h-[48px] border border-gray-200 rounded"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-black"
            >
              {showPassword ? (
                <IoEyeOffOutline className="h-5 w-5" />
              ) : (
                <IoEyeOutline className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        <div className="w-[476px] flex items-start my-4">
  <label className="flex items-center">
    <input type="checkbox" className="w-4 h-4 border border-gray-300 rounded" />
    <span className="ml-2 text-sm text-gray-600">Remember Me</span>
  </label>
</div>

        {/* Login Button */}
        <button className=" bg-[#0056B3] text-white py-2 rounded mb-4 w-[476px] h-[48px]">
          Login
        </button>

        {/* Forgot Password */}
        <div className="w-[476px] flex items-start my-4">

        <div className="text-center">
          <a href="#" className="text-[#0077FF] text-sm hover:underline">
            Forgot Password?
          </a>
        </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto mb-4 text-sm text-[#6B7280]">
        Disclaimer: A QubiGen product <a href="#" className="text-[#0056B3]">QubiNest</a> © Copyrights 2024
      </div>
    </div>
  );
};

export default SuperadminLogin;