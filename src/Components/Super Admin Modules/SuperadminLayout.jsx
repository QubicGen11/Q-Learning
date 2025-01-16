import React from 'react';
import { Outlet } from 'react-router-dom';
import SuperadminSidebar from './SuperadminSidebar';
import SuperadminNavbar from './SuperadminNavbar';
import useSidebarStore from '../../stores/sidebarStore';

const SuperadminLayout = () => {
  const { isCollapsed } = useSidebarStore();

  return (
    <div className="flex min-h-screen">
      <div className="fixed h-screen z-40">
        <SuperadminSidebar />
      </div>

      <div className={`flex-1 ${isCollapsed ? 'ml-[60px]' : 'ml-64'}`}>
        <div className="sticky top-0 z-30">
          <SuperadminNavbar />
        </div>
        <main className="p-6 bg-[#f2f9ff] min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SuperadminLayout;