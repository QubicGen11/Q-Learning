import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import useSidebarStore from '../../stores/sidebarStore';

const Sidebar = () => {
  const { isCollapsed } = useSidebarStore();
  const location = useLocation();

  const menuItems = [
    { icon: "grid_view", label: "Dashboard", path: "/instructor" },
    { icon: "desktop_windows", label: "Courses", path: "/instructor/courses" },
    { icon: "psychology", label: "Skill Assessments", path: "/instructor/skill-assessments" },
    { icon: "group", label: "Enrolled Students", path: "/instructor/enrolled-students" },
    { icon: "forum", label: "Discussion Forum", path: "/instructor/discussion-forum" },
    { icon: "folder", label: "Management", path: "/instructor/management" },
    { icon: "campaign", label: "Announcements", path: "/instructor/announcements" },
    { icon: "play_circle", label: "Live Sessions", path: "/instructor/live-sessions" },
    { icon: "account_balance_wallet", label: "Earnings", path: "/instructor/earnings" },
    { icon: "notifications_active", label: "Create Notifications", path: "/instructor/create-notifications" },
    { icon: "settings", label: "Settings", path: "/instructor/settings", isBottom: true },
    { icon: "help", label: "Help", path: "/instructor/help", isBottom: true },
  ];

  const isActive = (path) => {
    if (path === '/instructor') {
      return location.pathname === '/instructor';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div 
    className={`fixed top-0 left-0 h-full bg-gradient-to-b from-[#0056B3] to-[#00254D] transition-all duration-300 ease-in-out z-50 
    ${isCollapsed ? 'w-[60px]' : 'w-[240px]'}`}
  >
      {/* Logo */}
      <div className={`h-16 flex items-center ${isCollapsed ? 'justify-center px-4' : 'px-5'}  border-white/10`}>
        <img 
          src={isCollapsed 
            ? "https://res.cloudinary.com/defsu5bfc/image/upload/v1736435279/Icon_Logo_tn7bcr.png"
            : "https://res.cloudinary.com/devewerw3/image/upload/v1734594088/Logo_7_ulr2j8.png"
          }
          alt="QubiNest" 
          className={`${isCollapsed ? 'w-8' : 'h-8'}`}
        />
      </div>

      {/* Menu Items */}
      <nav className="flex-1 flex flex-col">
        <div className="flex-1 py-2">
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
              {/* Tooltip */}
              {isCollapsed && (
                <div 
                  className="absolute left-12 top-1/2 -translate-y-1/2 
                            bg-gray-800 text-white text-sm rounded px-2 py-1
                            opacity-0 group-hover:opacity-100 pointer-events-none 
                            transition-opacity duration-200 whitespace-nowrap z-[99999]
                            shadow-lg"
                  style={{ transform: 'translateY(-50%)' }}
                >
                  {item.label}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Items */}
        <div className="py-2 border-t border-white/10">
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
              {/* Tooltip */}
              {isCollapsed && (
                <div 
                  className="absolute left-12 top-1/2 -translate-y-1/2 
                            bg-gray-800 text-white text-sm rounded px-2 py-1
                            opacity-0 group-hover:opacity-100 pointer-events-none 
                            transition-opacity duration-200 whitespace-nowrap z-[99999]
                            shadow-lg"
                  style={{ transform: 'translateY(-50%)' }}
                >
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

export default Sidebar;
