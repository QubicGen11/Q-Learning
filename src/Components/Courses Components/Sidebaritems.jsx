import { FiTrash2 } from 'react-icons/fi';
import React from 'react';

const SidebarItem = ({ label, isActive, isCompleted, onClick, onDelete }) => {
    return (
      <div className="flex items-center justify-between group">
        <button
          onClick={onClick}
          className={`flex-grow text-left pl-8 py-2 rounded-lg transition-colors ${
            isActive 
              ? 'bg-[#5624D0] text-white' 
              : 'hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center gap-2">
            {isCompleted && <span className="text-green-500">✓</span>}
            <span>{label}</span>
          </div>
        </button>
        {onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className={`mr-2 opacity-0 group-hover:opacity-100 transition-opacity ${
              isActive ? 'text-white hover:text-red-200' : 'text-red-600 hover:text-red-800'
            }`}
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  };

  export default SidebarItem;