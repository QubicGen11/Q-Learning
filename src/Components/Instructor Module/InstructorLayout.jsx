import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import useSidebarStore from '../../stores/sidebarStore';

const InstructorLayout = () => {
  const { isCollapsed } = useSidebarStore();

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
