import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <div 
      className="relative w-full h-screen overflow-hidden"
      style={{
        background: `
          url('https://res.cloudinary.com/devewerw3/image/upload/v1732785195/Icons_Bg_2_b85kye.png'),
          linear-gradient(to bottom, #0056B3, #00254D)
        `,
        backgroundBlendMode: 'overlay',
        backgroundSize: 'cover',
      }}
    >
      {/* Main content */}
      <div className="relative z-20 container mx-auto px-6 py-20 flex items-center justify-between">
        {/* Left content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl text-white"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[3rem] font-bold leading-tight mb-4"
          >
            Empowering learners to<br />
            achieve their dreams.
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-[2.5rem] leading-tight mb-10"
          >
            Enabling educators to inspire<br />
            and Teach Online.
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex gap-4"
          >
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white hover:bg-gray-100 text-[#0056B3] px-6 py-3 rounded-lg transition-colors duration-300"
            >
              Learn From Vast Knowledge
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white text-white px-6 py-3 rounded-lg transition-colors duration-300"
            >
              Create a Online Course to Teach
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right illustration */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <motion.div 
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-[#4B88DA]/30 rounded-3xl p-8"
          >
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              src="https://res.cloudinary.com/devewerw3/image/upload/v1733813079/Frame_179_1_hcevvl.png"
              alt="Teaching illustration"
              className="w-[450px] h-auto"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Floating background elements */}
      <motion.div 
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 right-20 w-20 h-20 opacity-30"
      >
        {/* Add floating icons or elements here */}
      </motion.div>
    </div>
  );
};

export default HeroSection;
