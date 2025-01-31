import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useWishlistStore from "../../stores/wishlistStore"; // Wishlist Store
import LoginModal from "../New Login Components/LoginModal";
import Registrationmodal from "../New Login Components/Registrationmodal";

const LoginRegisterModal = () => {
  const { showLoginModal, closeLoginModal } = useWishlistStore();
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login/Register

  if (!showLoginModal) return null; // Don't render if modal is not open

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative bg-white w-full max-w-lg rounded-lg shadow-lg p-6"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          {/* Close Button */}
          <button
            onClick={closeLoginModal}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none"
          >
            ✕
          </button>

          {/* Toggle Login/Register */}
          <div className="flex justify-center space-x-8 mb-4 border-b border-gray-300 pb-3">
            <button
              className={`text-md font-medium transition-colors duration-300 ${
                isLogin
                  ? "text-[#1d4ed8] border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              }`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`text-md font-medium transition-colors duration-300 ${
                !isLogin
                  ? "text-[#1d4ed8] border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              }`}
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>
          </div>

          {/* Render Login or Register Component */}
          <div className="mt-6">
            {isLogin ? <LoginModal /> : <Registrationmodal />}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoginRegisterModal;
