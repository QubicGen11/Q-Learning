import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import useSidebarStore from '../../stores/sidebarStore';

const SuperadminSidebar = () => {
  const { isCollapsed } = useSidebarStore();
  const location = useLocation();

  const menuItems = [
    { icon: "grid_view", label: "Dashboard", path: "/superadmin" },
    { icon: "group", label: "Users", path: "/superadmin/users" },
    { icon: "rate_review", label: "Review and Approval", path: "/superadmin/review" },
    { icon: "payments", label: "Revenue", path: "/superadmin/revenue" },
    { icon: "vpn_key", label: "License Management", path: "/superadmin/license" },
    { icon: "analytics", label: "Reports & Analytics", path: "/superadmin/reports" },
    { icon: "settings_applications", label: "Manage Platform", path: "/superadmin/platform" },
    { icon: "headset_mic", label: "Support Service", path: "/superadmin/support", isBottom: true },
    { icon: "receipt_long", label: "System Logs", path: "/superadmin/logs", isBottom: true }
  ];

  const isActive = (path) => {
    if (path === '/superadmin') {
      return location.pathname === '/superadmin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div 
      className={`fixed top-0 left-0 h-full bg-gradient-to-b from-[#0056B3] to-[#00254D] transition-all duration-300 ease-in-out z-50 
      ${isCollapsed ? 'w-[60px]' : 'w-[240px]'}`}
    >
      <div className={`h-16 flex items-center ${isCollapsed ? 'justify-center px-4' : 'px-5'} border-white/10`}>
        <img 
          src={isCollapsed 
            ? "https://res.cloudinary.com/defsu5bfc/image/upload/v1736435279/Icon_Logo_tn7bcr.png"
            : "https://res.cloudinary.com/defsu5bfc/image/upload/v1737007732/Logo_lta0fl.png"
          }
          alt="QubiNest" 
          className={`${isCollapsed ? 'w-8' : 'h-8'}`}
        />
      </div>

      <nav className="flex flex-col h-[calc(100%-4rem)] justify-between">
        <div className="py-2">
          {menuItems.filter(item => !item.isBottom).map((item, index) => (
            <div key={index} className="relative group">
              <Link
                to={item.path}
                className={`flex items-center transition-colors duration-200
                  ${isCollapsed ? 'px-4 justify-center h-[50px]' : 'px-5 h-[45px]'}
                  ${isActive(item.path) 
                    ? 'bg-white text-[#0056B3]' 
                    : 'text-white/90 hover:bg-white/10'}`}
              >
                <span className={`material-icons ${isCollapsed ? 'text-xl' : 'text-[20px] mr-3'}`}>
                  {item.icon}
                </span>
                {!isCollapsed && (
                  <span className="text-[14px] font-normal">{item.label}</span>
                )}
              </Link>
              {isCollapsed && (
                <div className="absolute left-12 top-1/2 -translate-y-1/2 bg-gray-600 text-white text-sm rounded-lg px-3 py-2
                              opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-[99999]">
                  {item.label}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="py-2 border-t border-white/10 mt-auto">
          {menuItems.filter(item => item.isBottom).map((item, index) => (
            <div key={index} className="relative group">
              <Link
                to={item.path}
                className={`flex items-center transition-colors duration-200
                  ${isCollapsed ? 'px-4 justify-center h-[50px]' : 'px-5 h-[45px]'}
                  ${isActive(item.path) 
                    ? 'bg-white text-[#0056B3]' 
                    : 'text-white/90 hover:bg-white/10'}`}
              >
                <span className={`material-icons ${isCollapsed ? 'text-xl' : 'text-[20px] mr-3'}`}>
                  {item.icon}
                </span>
                {!isCollapsed && (
                  <span className="text-[14px] font-normal">{item.label}</span>
                )}
              </Link>
              {isCollapsed && (
                <div className="absolute left-12 top-1/2 -translate-y-1/2 bg-gray-600 text-white text-sm rounded-lg px-3 py-2
                              opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-[99999]">
                  {item.label}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default SuperadminSidebar;