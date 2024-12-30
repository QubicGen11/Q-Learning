import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import useSidebarStore from '../../stores/sidebarStore';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

const InstructorLayout = () => {
  const { isCollapsed } = useSidebarStore();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get('accessToken');
      
      if (!token) {
        const result = await Swal.fire({
          title: 'Authentication Required',
          text: 'Please login first to access the instructor dashboard',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Go to Login',
          cancelButtonText: 'Cancel'
        });

        if (result.isConfirmed) {
          navigate('/login');
        } else {
          navigate('/'); // or any other fallback route
        }
        return;
      }

      setIsAuthenticated(true);
    };

    checkAuth();
  }, [navigate]);

  if (!isAuthenticated) {
    return null; // or return a loading spinner
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="fixed h-screen">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className={`flex-1 ${isCollapsed ? 'ml-[60px]' : 'ml-64'}`}>
        <div className="sticky top-0 z-10 bg-white">
          <Navbar />
        </div>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default InstructorLayout;
