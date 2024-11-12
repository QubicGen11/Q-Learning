import React, { useState, useRef, useEffect } from 'react';

export const OTPInput = ({ value, onChange, length = 6 }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    onChange(otp.join(""));
  }, [otp]);

  const handleChange = (element, index) => {
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData
      .getData("text")
      .replace(/[^A-Za-z0-9]/g, '');
    
    const newOtp = [...otp];
    
    for (let i = 0; i < Math.min(length, pasteData.length); i++) {
      newOtp[i] = pasteData[i];
      if (inputRefs.current[i]) {
        inputRefs.current[i].value = pasteData[i];
      }
    }
    
    setOtp(newOtp);
    
    const focusIndex = Math.min(length - 1, pasteData.length - 1);
    if (focusIndex >= 0) {
      inputRefs.current[focusIndex].focus();
    }
  };

  return (
    <div 
      className="flex justify-between gap-2"
      onPaste={handlePaste}
    >
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(ref) => (inputRefs.current[index] = ref)}
          type="text"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="w-12 h-12 text-center text-xl font-semibold border-2 rounded-lg
                   focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none
                   dark:bg-gray-700 dark:border-gray-600 dark:text-white
                   transition-all duration-200"
        />
      ))}
    </div>
  );
}; 