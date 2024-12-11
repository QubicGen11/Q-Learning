import React, { useState } from 'react';

const Latestdeals = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="bg-[#ffc107] w-full py-2 px-4 text-black relative font-extrabold flex justify-between items-center">
      <span className='ml-7 text-sm'>
        Black Friday Sale! New skills mean new career opportunities. Courses from ₹399 through Nov 29. 3 days left!
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