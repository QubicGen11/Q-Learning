import React from 'react';

const ContactSection = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Main Contact Card */}
      <div className="bg-[#FFD699] rounded-2xl p-6 sm:p-8 md:p-10 
                    relative overflow-hidden">
        {/* Background Circles - Decorative Elements */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#FFE5B4] 
                      rounded-full -translate-y-1/4 translate-x-1/4 opacity-50" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#FFE5B4] 
                      rounded-full translate-y-1/4 -translate-x-1/4 opacity-50" />
        
        {/* Content Container */}
        <div className="relative flex flex-col md:flex-row items-center 
                      justify-between gap-6">
          {/* Text Content */}
          <div className="flex-1">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-3">
              Got more questions?
            </h2>
            <p className="text-sm sm:text-base text-gray-800">
              Talk to our team, our program advisor will reach out to you.
            </p>
          </div>

          {/* Contact Button */}
          <div className="flex-shrink-0">
            <button 
              onClick={() => {/* Add your contact logic here */}}
              className="bg-black text-white px-6 py-3 rounded-lg
                       hover:bg-gray-800 transition-colors duration-200
                       flex items-center gap-2 text-sm sm:text-base"
            >
              Contact us
              <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Disclaimer Text */}
  
    </div>
  );
};

export default ContactSection;
