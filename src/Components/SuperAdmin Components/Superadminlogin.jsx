import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const Superadminlogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await axios.post('http://localhost:8089/qlms/adminLogin', {
        email,
        password
      });
      
      if (response.data.message) {
        setSuccessMessage(response.data.message);
        setShowOtpInput(true);
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:8089/qlms/adminVerification', {
        email,
        otpCode: otp
      });

      if (response.data.message === "OTP verified successfully. Login complete.") {
        // Save tokens in cookies
        Cookies.set('superadminToken', response.data.accessToken);
        Cookies.set('refreshToken', response.data.refreshToken);
        
        // Show success message
        setSuccessMessage(response.data.message);
        
        // Redirect after a short delay to show the success message
        setTimeout(() => {
          navigate('/superadmin');
        }, 1500);
      } else {
        setError('Invalid OTP');
      }
    } catch (error) {
      setError('Verification failed. Please try again.');
    }
  };

  const handleOtpChange = (index, value) => {
    const newOtp = otp.split('');
    newOtp[index] = value;
    setOtp(newOtp.join(''));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
         style={{
           backgroundImage: `url('https://img.freepik.com/free-photo/front-view-woman-wearing-headset-holding-laptop-makes-quiet-sign_23-2148434732.jpg?t=st=1731997565~exp=1732001165~hmac=0a1929faaa3210db3f7ec2538e100ad2c85fd730111876849d74889c5b500f8e&w=1380')`
         }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-45"></div>
      
      <div className='flex justify-start ml-44  items-center h-screen w-screen ' >

        {/* <img src="https://img.freepik.com/free-photo/front-view-woman-wearing-headset-holding-laptop-makes-quiet-sign_23-2148434732.jpg?t=st=1731997565~exp=1732001165~hmac=0a1929faaa3210db3f7ec2538e100ad2c85fd730111876849d74889c5b500f8e&w=1380" alt="" /> */}

      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-8 rounded-lg shadow-2xl w-96 z-10 "
        style={{backgroundColor: 'white',backdropFilter: 'blur(30px)'}}
      >
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-center mb-8 text-gray-800"
        >
            <div>

          <span className='text-red-500'>Qubi</span>Nest
          <p className='text-black-500 text-sm relative top-3'>SuperAdmin Login</p>
            </div>
        </motion.h2>

        {!showOtpInput ? (
          <form onSubmit={handleSubmit}>
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6"
            >
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Enter your email"
                required
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-6"
            >
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Enter your password"
                required
              />
            </motion.div>
            <div className='flex justify-center'>
              
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              type="submit"
              className="w-7/12 bg-red-500 text-white py-2 rounded-md hover:bg-red-400 transition-colors"
            >
              Login
            </motion.button>
            </div>

          </form>
        ) : (
          <>
            {successMessage && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-green-500 text-center mb-4"
              >
                {successMessage}
              </motion.p>
            )}
            <form onSubmit={handleOtpSubmit}>
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-6"
              >
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Enter OTP
                </label>
                <div className="flex gap-2 justify-center">
                  {[...Array(6)].map((_, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      value={otp[index] || ''}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^[0-9a-zA-Z]$/.test(value) || value === '') {
                          handleOtpChange(index, value);
                          // Auto-focus next input
                          if (value && index < 5) {
                            const nextInput = e.target.nextElementSibling;
                            if (nextInput) {
                              nextInput.focus();
                            }
                          }
                        }
                      }}
                      onKeyDown={(e) => {
                        // Handle backspace
                        if (e.key === 'Backspace' && !otp[index] && index > 0) {
                          const prevInput = e.target.previousElementSibling;
                          if (prevInput) {
                            prevInput.focus();
                          }
                        }
                      }}
                      className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      required
                    />
                  ))}
                </div>
              </motion.div>
              <div className='flex justify-center'>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-7/12 bg-red-500 text-white py-2 rounded-md hover:bg-red-400 transition-colors"
                >
                  Verify OTP
                </motion.button>
              </div>
            </form>
          </>
        )}

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 text-center mt-4"
          >
            {error}
          </motion.p>
        )}
      </motion.div>
      </div>
    </div>
  );
};

export default Superadminlogin;
