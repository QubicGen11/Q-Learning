import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <div 
      className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-[#0056B3] to-[#00254D]"
    >
      {/* Background pattern - using CSS instead of image */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.2) 1px, transparent 0)`,
          backgroundSize: '30px 30px',
        }}
      />

      {/* Main content */}
      <div className="relative z-20 container mx-auto px-6 py-20 flex items-center justify-between">
        {/* Left content */}
        <div className="max-w-2xl text-white">
          <h1 className="text-[3rem] font-bold leading-tight mb-4">
            Empowering learners to<br />
            achieve their dreams.
          </h1>
          <h2 className="text-[2.5rem] leading-tight mb-10">
            Enabling educators to inspire<br />
            and Teach Online.
          </h2>
          <div className="flex gap-4">
            <button 
              className="bg-white hover:bg-gray-100 text-[#0056B3] px-6 py-3 rounded-lg transition-colors duration-300"
            >
              Learn From Vast Knowledge
            </button>
            <button 
              className="border-2 border-white text-white px-6 py-3 rounded-lg transition-colors duration-300 hover:bg-white/10"
            >
              Create a Online Course to Teach
            </button>
          </div>
        </div>

        {/* Right illustration */}
        <div className="relative">
          <div className="bg-[#4B88DA]/30 rounded-3xl p-8 transition-transform duration-300 hover:scale-[1.01]">
            <img
              src="https://res.cloudinary.com/devewerw3/image/upload/q_auto,f_auto,w_450,c_limit/v1733813079/Frame_179_1_hcevvl.png"
              alt="Teaching illustration"
              width="450"
              height="auto"
              className="w-[450px] h-auto"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;