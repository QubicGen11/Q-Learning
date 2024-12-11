import React, { useState } from 'react';
import { FaGraduationCap } from "react-icons/fa6";

const Latestdeals = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="bg-[#ffc107] w-full py-2 px-4 text-black relative font-extrabold flex justify-between items-center">
      <span className='ml-2 text-sm flex items-center '>
      <span className='mr-1'><FaGraduationCap size={20} /></span>  Black Friday Sale! New skills mean new career opportunities. Courses from ₹399 through Nov 29. 3 days left!
      </span>
      <button 
        className="cursor-pointer text-xl mr-7"
        onClick={handleClose}
      >
        ×
      </button>
    </div>
  );
};

export default Latestdeals;