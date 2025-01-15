import React from 'react';
import ReactDOM from 'react-dom';
import { IoWarning, IoClose, IoInformation, IoCheckmarkCircle } from 'react-icons/io5';

const Toast = ({ message, type = 'info', onClose }) => {
  const variants = {
    info: {
      bg: 'bg-[#0056B3]',
      icon: <IoInformation className="w-5 h-5 text-white" />
    },
    error: {
      bg: 'bg-[#DC3545]',
      icon: <IoWarning className="w-5 h-5 text-white" />
    },
    success: {
      bg: 'bg-[#28A745]',
      icon: <IoCheckmarkCircle className="w-5 h-5 text-white" />
    }
  };

  const variant = variants[type] || variants.info;

  return (
    <div 
      className={`
        ${variant.bg} 
        fixed
        top-20
        right-6
        text-white 
        rounded-lg
        
        p-2
        flex 
        items-center 
        justify-between 
        animate-slideIn
        transition-all
        duration-200
        ease-in-out
        gap-3
        min-w-[300px]
        max-w-[400px]
      `}
    >
      <div className="flex items-center gap-2">
        {variant.icon}
        <span className="text-sm">
          {message}
        </span>
      </div>
      <button 
        onClick={onClose}
        className="text-white/80 hover:text-white transition-colors duration-200"
      >
        <IoClose className="w-5 h-5" />
      </button>
    </div>
  );
};

export const displayToast = (type, message) => {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'fixed top-4 right-4 z-50 flex flex-col gap-3';
    document.body.appendChild(container);
  }

  const toastElement = document.createElement('div');
  const root = ReactDOM.createRoot(toastElement);
  
  const handleClose = () => {
    toastElement.classList.add('animate-fadeOut');
    setTimeout(() => {
      if (container.contains(toastElement)) {
        container.removeChild(toastElement);
      }
    }, 200);
  };

  root.render(
    <Toast 
      type={type} 
      message={message}
      onClose={handleClose}
    />
  );
  
  container.appendChild(toastElement);
  setTimeout(handleClose, 4000);
};

export default Toast; 
// export default Toast; 