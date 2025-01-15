import React from 'react';
import ReactDOM from 'react-dom';
import { IoWarning, IoClose } from 'react-icons/io5';

const Toast = ({ message, type = 'info', title, onClose }) => {
  const variants = {
    info: {
      bg: 'bg-[#0056B3]',
      icon: <IoWarning className="w-8 h-8 text-white" />
    },
    error: {
      bg: 'bg-[#DC3545]',
      icon: <IoWarning className="w-8 h-8 text-white" />
    },
    success: {
      bg: 'bg-[#28A745]',
      icon: <IoWarning className="w-8 h-8 text-white" />
    }
  };

  const variant = variants[type] || variants.info;

  return (
    <div 
      className={`
        ${variant.bg} 
        fixed
        top-16
        right-6
        text-white 
        rounded
        
        w-[350px] 
        h-[50px] 
        flex 
        items-center 
        justify-between 
        animate-slideIn
        transition-all
        duration-200
        ease-in-out
      `}
      style={{
        padding: '8px 16px',
        gap: '6px'
      }}
    >
      <div className="flex items-center gap-3">
        {variant.icon}
        <span className="font-['Plus_Jakarta_Sans'] text-[14px] font-[400] leading-[20px]">
          {message}
        </span>
      </div>
      <div className="flex items-center gap-3">
        {title && (
          <span className="text-[14px] font-['Plus_Jakarta_Sans'] border border-white rounded px-4 py-1">
            {title}
          </span>
        )}
        <button 
          onClick={onClose}
          className="text-white hover:text-opacity-80 transition-colors duration-200 ml-2"
          aria-label="Close"
        >
          <IoClose className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
};

export const displayToast = (type, message, title) => {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'fixed top-6 right-6 z-50 space-y-[10px]';
    document.body.appendChild(container);
  }

  const toastElement = document.createElement('div');
  const root = ReactDOM.createRoot(toastElement);
  
  const handleClose = () => {
    if (container.contains(toastElement)) {
      container.removeChild(toastElement);
    }
  };

  // Always pass handleClose to ensure close button is functional
  root.render(
    <Toast 
      type={type} 
      message={message} 
      title={title}
      onClose={handleClose}  // Make sure this is always passed
    />
  );
  
  container.appendChild(toastElement);

  // Auto remove after 3 seconds
  setTimeout(handleClose, 3000);
};

export default Toast; 
// export default Toast; 