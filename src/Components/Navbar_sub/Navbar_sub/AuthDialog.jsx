import React from 'react';
import { Dialog } from '@mui/material';
import useAuthStore from '../../../store/authStore';
import { useNavigate } from 'react-router-dom';

export const AuthDialog = ({ open, onClose }) => {
  const navigate = useNavigate();
  const { showStayLoggedIn } = useAuthStore();

  const handleStayLoggedIn = async () => {
    const { refreshSession } = useAuthStore.getState();
    await refreshSession();
    onClose(); // Close the dialog after refresh
  };

  const handleLogout = () => {
    useAuthStore.getState().logout();
    navigate('/login');
  };

  // Only show the Stay Logged In dialog
  if (showStayLoggedIn) {
    return (
      <Dialog 
        open={open} 
        onClose={onClose}
        PaperProps={{
          className: 'rounded-lg overflow-hidden',
          style: { minWidth: '400px' }
        }}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Stay Logged In?</h2>
          <p className="mb-6">Would you like to stay logged in?</p>
          <div className="flex gap-4">
            <button
              onClick={handleStayLoggedIn}
              className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Stay Logged In
            </button>
            <button
              onClick={handleLogout}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Logout
            </button>
          </div>
        </div>
      </Dialog>
    );
  }

  // Return null if not showing Stay Logged In dialog
  return null;
};
