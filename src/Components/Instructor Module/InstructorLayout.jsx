import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import useSidebarStore from '../../stores/sidebarStore';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

const InstructorLayout = () => {
  const { isCollapsed, toggleSidebar } = useSidebarStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for route changes and collapse sidebar if on course routes
  useEffect(() => {
    if (location.pathname.includes('/instructor/courses') && !isCollapsed) {
      toggleSidebar();
    }
  }, [location.pathname, isCollapsed, toggleSidebar]);

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
          navigate('/');
        }
        return;
      }

      setIsAuthenticated(true);
    };

    checkAuth();
  }, [navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen">
      <div className="fixed h-screen">
        <Sidebar />
      </div>

      <div className={`flex-1 ${isCollapsed ? 'ml-[60px]' : 'ml-64'}`}>
        <div className="sticky top-0 z-10 ">
          <Navbar />
        </div>
        <main className="p-[2px] bg-[#f2f9ff] ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default InstructorLayout;
